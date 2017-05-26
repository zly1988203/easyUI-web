/**
 * Created by zhaoly on 2017/5/24.
 */

function initShopSetting(){
    initGridShopList();
    initgridEquipmentList();
}

function addShop(){
    //初始化机构ID
    var branchId = sessionBranchId;

    publicAgencyService(function(data){
        var nowRows = gridShopHandel.getRows()
        var argWhere ={branchCode:1};  //验证重复性
        var newRows = gridShopHandel.checkDatagrid(nowRows,[data],argWhere,null);

        $("#"+gridShopName).datagrid("loadData",newRows);
    },'',branchId);
}
var gridShopName = "gridShopList";
var gridEquipment = "gridEquipmentList";
var gridShopHandel = new GridClass();
var gridEquipmentHandel = new GridClass();
function initGridShopList() {
    gridShopHandel.setGridName(gridShopName);
    $("#"+gridShopName).datagrid({
        align:'center',
        rownumbers:true,    //序号
        showFooter:true,
        singleSelect:true,  //单选  false多选
        height:'40%',
        width:'100%',
        // fit:true,
        columns:[[
        	{field: 'branchId', title: '店铺id', hidden:"true"},
            {field: 'branchCode', title: '店铺编号', width: 100, align: 'left'},
            {field: 'branchName', title: '店铺名称', width: 180, align: 'left'},
            {field: 'typeDesc', title: '店铺类型', width: 80, align: 'left'},
            {field: 'ecardRechargeAmount', title: '累计充值金额', width: 150, align: 'right'},
            {field: 'ecardWithdrawalAmount', title: '提取金额', width: 100, align: 'right'},
            {field: 'ecardUseAmount', title: '已用金额', width: 100, align: 'right'},
            {field: 'ecardBalance', title: '余额', width: 100, align: 'right'},
            {field: 'enabled', title: '启用',checkbox:true, width: 80, align: 'left',
                formatter : function(value, row,index) {
                	return value;
            }}
        ]],
        onSelect:function(rowIndex,rowData){
            $("#"+gridEquipment).datagrid('loadData', { total: 0, rows: [] });
            selectView(rowData);
        },
        onCheck:function(rowIndex,rowData){
        	rowData.enabled = '1';
        	rowData.checked = true;
        },
        onUncheck:function(rowIndex,rowData){
        	rowData.enabled = '0';
        	rowData.checked = false;
        },
        onCheckAll:function(rows){
        	$.each(rows,function(index,item){
        		item.enabled = '1';
        		item.checked = true;
        	})
        },
        onUncheckAll:function(rows){
        	$.each(rows,function(index,item){
        		item.enabled = '0';
        		item.checked = false;
        	})
        },
        loadFilter:function(data){
        	if(data.rows.length > 0){
        		
        		data.rows.forEach(function(obj,index){
        			obj.checked = obj.enabled == '1'?true:false;
        		})
        	}
        	return data;
        }
    })
}

function selectView(rowData) {
    var url = contextPath+"/iccard/setting/get";
    var param = {
        data:rowData
    }
    this.ajaxSubmit(url,param,function (result) {
        if(result['code'] == 0 && result.length > 0){
            $("#"+gridEquipment).datagrid("loadData",result);
        }else {
            gridEquipmentHandel.setLoadData([$.extend({},gridDefault)])
        }
    })
}
var gridDefault = {equipmentCode:"",key:""}
function initgridEquipmentList() {
    gridEquipmentHandel.setGridName(gridEquipment);
    $("#"+gridEquipment).datagrid({
        align:'center',
        rownumbers:true,    //序号
        showFooter:true,
        height:'40%',
        width:'100%',
        fit:true,
        columns:[[
            {field:'cz',title:'操作',width:'60px',align:'center',
                formatter : function(value, row,index) {
                     var   str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                            '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
                    return str;
                },
            },

            {field: 'equipmentCode', title: '设备代码', width: 180, align: 'left',editor:'text'},
            {field: 'key', title: '终端保护密钥', width: 250, align: 'left',editor:'text'},
            {field: 'pos', title: '关联POS', width: 100, align: 'left',
                formatter:function(value,row){
                if(row.isFooter){
                    return;
                }
                return value=='请选择';
            },
                editor:{
                    type:'combobox',
                    options:{
                        valueField: 'id',
                        textField: 'text',
                        editable:false,
                        required:true,
                        data: [],
                        onSelect:onSelectPOS
                    }
                }}
        ]],
        onClickCell:function(rowIndex,field,value){
            gridEquipmentHandel.setBeginRow(rowIndex);
            gridEquipmentHandel.setSelectFieldName(field);
            var target = gridEquipmentHandel.getFieldTarget(field);
            if(target){
                gridEquipmentHandel.setFieldFocus(target);
            }else{
                gridEquipmentHandel.setSelectFieldName("equipmentCode");
            }
        },
        onLoadSuccess : function(data) {
            gridEquipmentHandel.setDatagridHeader("center");
        }
    })

    // gridEquipmentHandel.setLoadData([$.extend({},gridDefault)])
}

//插入一行
function addLineHandel(event){
    event.stopPropagation(event);
    var index = $(event.target).attr('data-index')||0;
    gridEquipmentHandel.addRow(index,gridDefault);
}
//删除一行
function delLineHandel(event){
    event.stopPropagation();
    var index = $(event.target).attr('data-index');
    gridEquipmentHandel.delRow(index);
}

function onSelectPOS() {
    
}


function saveSetting(){
    var rows = gridShopHandel.getRows();
    var url = contextPath+"/iccard/setting/save";
    var param = {
        data:rows
    }
    this.ajaxSubmit(url,param,function (result) {
        if(result['code'] == 0){
            messager("门店设置保存成功");
        }else{
            messager(result['message']);
        }
    })
}

function saveEquipmentList() {
    var rows = gridEquipmentHandel.getRowsWhere({equipmentCode:"1"});
    var url = contextPath+"/iccard/setting/save";
    var param = {
        data:rows
    }
    this.ajaxSubmit(url,param,function (result) {
        if(result['code'] == 0){
            messager("设备数据保存成功");
        }else{
            messager(result['message']);
        }
    })
}