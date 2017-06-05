/**
 * Created by zhaoly on 2017/5/18.
 */

$(function () {
	
})

function initBranchInfo() {
    initGridBranchCost();
    getBranchInfo();
}

function getBranchInfo(){
	var branchId = $("#branchId").val(); 
    var httpUrl = contextPath+"/archive/branch/getBranchInfoById?branchId="+branchId;
    $.get(httpUrl,{},function (data) {
    	if(data.code != '0'){
    		messager("请求发送失败或服务器处理失败");
    		return;
    	}
    	
    	var rec = data.data;
        $.each(rec.branch,function(key,value){
            //普通的input
            if($("#"+key).prop("tagName") == "INPUT"){
                if($("#"+key).attr('type')=="checkbox"){
                    if(value){ //传到前端checkbox选中的值是true
                        $("#"+key).attr("checked","checked");
                    }
                }else{
                        if($("#"+key).hasClass('easyui-numberbox')){
                            $("#"+key).numberbox('setValue', value);
                        }else{
                            $("#"+key).val(value);
                        }
                }
            }
            else if($("#"+key).prop("tagName") =="TEXTAREA"){ //普通的textarea
                $("#"+key).html(value);
            }
            else if($("#"+key).prop("tagName") == "SELECT"){
                if(value != undefined && typeof (value) != "undefined"){

                    if(key=="type"){
                        var option = "<option value="+value+">"+rec.branch['branchTypeStr']+"</option>"
                        $("#"+key).append(option);
                    }

                    if(key=="offlineStatus"){
                        var data = $('#formEdit #offlineStatus').combobox('getData');
                        if (data.length > 0) {
                            $('#formEdit #offlineStatus').combobox('select', value.toString());
                        }
                    }

                    $("#"+key+" option").each(function(i,n){
                        if($(n).val() == value || $(n).val()==value.name){
                            $(n).attr("selected",true);
                        }
                    });
                }

            }
        });

        $("#gridFitmentCost").datagrid("loadData", rec.decorateCostList.length>0?rec.decorateCostList:[$.extend({},gridDefault)]);
        $("#gridEquipmentCost").datagrid("loadData", rec.deviceCostList.length>0?rec.deviceCostList:[$.extend({},gridDefault)]);
        $("#gridAmortizeCost").datagrid("loadData", rec.amortizeCostList.length>0?rec.amortizeCostList:[$.extend({},gridDefault)]);
    });
}



var gridDefault = {
    price:0.0000,
}

var gridFitmentCostHandel = new GridClass();
var gridEquipmentCostHandel = new GridClass();
var gridAmortizeCostHandel = new GridClass();


function initGridFitmentCost() {
    gridFitmentCostHandel.setGridName("gridFitmentCost");
    $("#gridFitmentCost").datagrid({
        align:'center',
        rownumbers:true,    //序号
        height:'30%',
        width:'99%',
        columns:[[
            {field:'cz',title:'操作',width:'60px',align:'center',
                formatter : function(value, row,index) {
                    var str =  '<a name="add" class="add-line" data-gridName="gridFitmentCost" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                        '&nbsp;&nbsp;<a name="del" class="del-line" data-gridName="gridFitmentCost" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';

                    return str;
                },
            },
            {field: 'costName', title: '装修费用', width: 180, align: 'left',editor:'text'},
            {field: 'costAmount', title: '金额', width: 100, align: 'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:4,
                    }
                },
            },
            {field: 'createUserName', title: '操作人', width: 120, align: 'left'},
            {field: 'createTime', title: '操作日期', width: 180, align: 'left',
                formatter : function(value, row, index) {
                    return formatDate(value);
                },
            }
        ]],
        onClickCell:function(rowIndex,field,value){
            gridFitmentCostHandel.setBeginRow(rowIndex);
            gridFitmentCostHandel.setSelectFieldName(field);
            var target = gridFitmentCostHandel.getFieldTarget(field);
            if(target){
                gridFitmentCostHandel.setFieldFocus(target);
            }else{
                gridFitmentCostHandel.setSelectFieldName("costName");
            }
        },
        onLoadSuccess : function(data) {

            gridFitmentCostHandel.setDatagridHeader("center");

        }
    })


}
function initGridEquipmentCost() {
    gridEquipmentCostHandel.setGridName("gridEquipmentCost");
    $("#gridEquipmentCost").datagrid({
        align:'center',
        rownumbers:true,    //序号
        height:'30%',
        width:'99%',
        columns:[[
            {field:'cz',title:'操作',width:'60px',align:'center',
                formatter : function(value, row,index) {
                    var str =  '<a name="add" class="add-line" data-gridName="gridEquipmentCost" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                        '&nbsp;&nbsp;<a name="del" class="del-line" data-gridName="gridEquipmentCost" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';

                    return str;
                },
            },
            {field: 'costName', title: '设备费用', width: 180, align: 'left',editor:'text'},
            {field: 'costAmount', title: '金额', width: 100, align: 'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:4,
                    }
                },
            },
            {field: 'createUserName', title: '操作人', width: 120, align: 'left'},
            {field: 'createTime', title: '操作日期', width: 180, align: 'left',
                formatter : function(value, row, index) {
                    return formatDate(value);
                },
            }
        ]],
        onClickCell:function(rowIndex,field,value){
            gridEquipmentCostHandel.setBeginRow(rowIndex);
            gridEquipmentCostHandel.setSelectFieldName(field);
            var target = gridEquipmentCostHandel.getFieldTarget(field);
            if(target){
                gridEquipmentCostHandel.setFieldFocus(target);
            }else{
                gridEquipmentCostHandel.setSelectFieldName("costName");
            }
        },
        onLoadSuccess : function(data) {
            gridEquipmentCostHandel.setDatagridHeader("center");
        }
    })

    gridEquipmentCostHandel.setLoadData([$.extend({},gridDefault)]);
}
function initGridAmortizeCost() {
    gridAmortizeCostHandel.setGridName("gridAmortizeCost");
    $("#gridAmortizeCost").datagrid({
        align:'center',
        rownumbers:true,    //序号
        height:'30%',
        width:'99%',
        columns:[[
            {field:'cz',title:'操作',width:'60px',align:'center',
                formatter : function(value, row,index) {
                    var str =  '<a name="add" class="add-line" data-gridName="gridAmortizeCost" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                        '&nbsp;&nbsp;<a name="del" class="del-line" data-gridName="gridAmortizeCost" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';

                    return str;
                },
            },
            {field: 'costName', title: '摊销费用', width: 180, align: 'left',editor:'text'},
            {field: 'costAmount', title: '金额', width: 100, align: 'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:4,
                    }
                },
            },
            {field: 'createUserName', title: '操作人', width: 120, align: 'left'},
            {field: 'createTime', title: '操作日期', width: 180, align: 'left',                formatter : function(value, row, index) {
                return formatDate(value);
            },
            }
        ]],
        onClickCell:function(rowIndex,field,value){
            gridAmortizeCostHandel.setBeginRow(rowIndex);
            gridAmortizeCostHandel.setSelectFieldName(field);
            var target = gridAmortizeCostHandel.getFieldTarget(field);
            if(target){
                gridAmortizeCostHandel.setFieldFocus(target);
            }else{
                gridAmortizeCostHandel.setSelectFieldName("costName");
            }
        },
        onLoadSuccess : function(data) {
            gridAmortizeCostHandel.setDatagridHeader("center");
        }
    })

    gridAmortizeCostHandel.setLoadData([$.extend({},gridDefault)]);
}

function initGridBranchCost() {
    initGridFitmentCost();
    initGridEquipmentCost();
    initGridAmortizeCost();
}

//插入一行
function addLineHandel(event){
    event.stopPropagation(event);
    var index = $(event.target).attr('data-index')||0;
    var gridName = $(event.target).attr('data-gridName');
    if(gridName === "gridFitmentCost"){
        gridFitmentCostHandel.addRow(index,gridDefault);
    }else if(gridName === "gridEquipmentCost"){
        gridEquipmentCostHandel.addRow(index,gridDefault);
    }else if(gridName === "gridAmortizeCost"){
        gridAmortizeCostHandel.addRow(index,gridDefault);
    }

}
//删除一行
function delLineHandel(event){
    event.stopPropagation();
    var index = $(event.target).attr('data-index');
    var gridName = $(event.target).attr('data-gridName');
    if(gridName === "gridFitmentCost"){
        gridFitmentCostHandel.delRow(index);
    }else if(gridName === "gridEquipmentCost"){
        gridEquipmentCostHandel.delRow(index);
    }else if(gridName === "gridAmortizeCost"){
        gridAmortizeCostHandel.delRow(index);
    }

}

function saveBranch() {
    gFunStartLoading();
    
    var formData = $('#formEdit').serializeObject();
    
    formData.decorateCostList = gridFitmentCostHandel.getRowsWhere({costName:"1"});
    formData.deviceCostList = gridEquipmentCostHandel.getRowsWhere({costName:"1"});
    formData.amortizeCostList = gridAmortizeCostHandel.getRowsWhere({costName:"1"});
    
    var dataJson = JSON.stringify(formData);

    $.ajax({
        url:contextPath+"/archive/branch/updateBranch",
        type:"POST",
        contentType:'application/json',
        data:dataJson,
        success:function(result){
            gFunEndLoading();
            if(result['code'] == 0){
                messager("保存成功！");
                // $.messager.alert("操作提示", "保存成功！", "info",function(){
                //
                // });
            }else{
                messager(result['message']);
            }
        },
        error:function(result){
            gFunEndLoading();
            messager("请求发送失败或服务器处理失败");
        }
    });
}

