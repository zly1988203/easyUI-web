var combineSplitEditDg;
var datagridId = "combineSplitEditGrid";
$(function(){
    //开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    //初始化列表
    initCombineSplieEditGrid();
    
});

function selectTion(){
	
}

function changeAmount(newV,oldV){
	console.log(newV);
	
}

var gridHandel = new GridClass();

var gridDefault = {
	applyNum:0,
}

function initCombineSplieEditGrid() {
	
	gridHandel.setGridName(datagridId);
    gridHandel.initKey({
        firstName:'applyNum',
        enterName:'applyNum',
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
                gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefault);
                setTimeout(function(){
                    gridHandel.setBeginRow(gridHandel.getSelectRowIndex()+1);
                    gridHandel.setSelectFieldName("applyNum");
                    gridHandel.setFieldFocus(gridHandel.getFieldTarget('applyNum'));
                },100)
            }else{
            	branchId = $("#createBranchId").val();
                selectGoods(arg);
            }
        },
    })
     combineSplitEditDg=$("#"+datagridId).datagrid({
        method: 'post',
        align: 'center',
        url: '',
        singleSelect: true,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        //fitColumns:true,    //占满
        height:'100%',
        pageSize:20,
        showFooter:true,
        columns: [[
			{
				field : 'ck',
				checkbox : true
			},
            {field: 'skuCode', title: '货号', width: '135px', align: 'left',
            	formatter : function(value, row,index) {
                    var str = "";
                    if(row.isFooter){
                    	str ='<div class="ub ub-pc">合计</div> '
                    }
                    return str;
                }
            },
            {field: 'skuName', title: '商品名称', width:'180px', align: 'left'},
            {field: 'unit', title: '单位', width:'90px', align: 'left'},
            {field: 'applyNum', title: '数量', width:'100px', align: 'left',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value||value==""){
                        row["applyNum"] = parseFloat(value||0).toFixed(2);
                    }
                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    value:'0',
                    options:{
                        min:0,
                        precision:4,
                        onChange: onChangeRealNum,
                    }
                },
            },
            {field: 'remark', title: '备注', width: '250px', align: 'left'}
        ]],
        onClickCell : function(rowIndex, field, value) {
			gridHandel.setBeginRow(rowIndex);
			gridHandel.setSelectFieldName(field);
			var target = gridHandel.getFieldTarget(field);
			if(target){
				gridHandel.setFieldFocus(target);
			}else{
				gridHandel.setSelectFieldName("applyNum");
			}
		},
         onLoadSuccess:function(data){
            gridHandel.setDatagridHeader("center");
            updateFooter();
         }
    });
    gridHandel.setLoadData([$.extend({},gridDefault)]);
}

//监听商品数量
function onChangeRealNum(newV,oldV) {
	if("" == newV){
	  messager("商品数量输入有误");
	  gridHandel.setFieldValue('applyNum',oldV);
      return;
	}
    updateFooter();
}

function updateFooter(){
    var fields = {applyNum:0};
    var argWhere = {}
    gridHandel.updateFooter(fields,argWhere);
}

//选择商品
function selectGoods(searchKey){
	selectGoodsDialog(searchKey);
}

/**
 * 商品选择
 */
function selectGoodsDialog(searchKey) {
	var branchId=null;
	//判定供应商是否存在
    if($("#createBranchId").val()==""){
        messager("请先选择机构");
        return;
    }
    branchId=$("#createBranchId").val();
	gFunGoodsSelect(searchKey,branchId);
}

//商品选择 公共使用
function gFunGoodsSelect(searchKey,branchId){
	new publicGoodsService("PA",function(data){
    	if(data.length==0){
            return;
        }
    	if(data.length > 1){
    		messager('只能选择一个组合商品');
    		return;
    	}
    	
    	$("#skuId").val(data[0].skuId);
    	$("#skuCode").val(data[0].skuCode);
    	$("#skuName").val(data[0].skuName);
    	$("#salePrice").val(data[0].salePrice);
    	$("#applyNum").numberbox('setValue',1);
    	$("#amount").val(data[0].salePrice);
        
    },searchKey,0,"","",branchId,"","0");
}

/**
 * 导出
 */
/*function exportData(){
	var isValid = $("#searchForm").form('validate');
	if(!isValid){
		return isValid;
	}
	var length = $("#modifyPriceGrid").datagrid('getData').total;
	console.info($("#searchForm").serializeObject());
	if(length == 0){
		$.messager.alert("无数据可导");
		return;
	}
	if(length>10000){
		$.messager.alert("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#searchForm").attr("action",contextPath+'/goods/priceAdjust/exportList');
	$("#searchForm").submit();	
}*/
/**
 * 机构列表下拉选
 */
function selectBranch (){
	new publicAgencyService(function(data){
		$("#createBranchId").val(data.branchesId);
		$("#createBranchName").val("["+data.branchCode+"]"+data.branchName);
	},"","");
}

