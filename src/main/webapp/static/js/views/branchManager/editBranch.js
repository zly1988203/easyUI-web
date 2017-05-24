/**
 * Created by zhaoly on 2017/5/18.
 */

$(function () {

})

function initBranchInfo() {
    initGridBranchCost();
}

function getBranchInfo(branchId){
    var httpUrl = contextPath+"/common/goods/getGoodsSkuById?id="+id;
    $.get(httpUrl,{},function (data) {
        $.each(data["_data"],function(key,value){

            //普通的input
            if($("#"+key).prop("tagName") == "INPUT"){
                if($("#"+key).attr('type')=="checkbox"){
                    if(value){ //传到前端checkbox选中的值是true
                        $("#"+key).attr("checked","checked");
                    }
                }else{
                    //进项税、销项税、联营扣率要乘以100
                    if($("#"+key).attr("id") == "outputTax" || $("#"+key).attr("id") == "inputTax" || $("#"+key).attr("id") == "supplierRate"){
                        if(value){
                            $("#"+key).textbox("setValue",parseFloat((value*100).toFixed(2)));
                        }else{
                            $("#"+key).textbox("setValue",0.00);
                        }
                    }else{
                        if($("#"+key).hasClass('easyui-numberbox')){
                            $("#"+key).numberbox('setValue', value);
                        }else{
                            $("#"+key).val(value);
                        }

                    }
                }
            }
            else if($("#"+key).prop("tagName") =="TEXTAREA"){ //普通的textarea
                $("#"+key).html(value);
            }
            else if($("#"+key).prop("tagName") == "SELECT"){
                if(value){
                    $("#"+key+" option").each(function(i,n){
                        if($(n).val() == value || $(n).val()==value.name){
                            $(n).attr("selected",true);
                        }
                    });
                    if(key=="unit"){
                        $("#"+key).combobox("setValue",value);
                    }
                }

            }
        });
    });
}



var gridDefault = {
    costName:"",
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
        height:'40%',
        width:'100%',
        columns:[[
            {field:'cz',title:'操作',width:'60px',align:'center',
                formatter : function(value, row,index) {
                    var str =  '<a name="add" class="add-line" data-gridName="gridFitmentCost" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                        '&nbsp;&nbsp;<a name="del" class="del-line" data-gridName="gridFitmentCost" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';

                    return str;
                },
            },
            {field: 'costName', title: '装修费用', width: 180, align: 'left',editor:'text'},
            {field: 'price', title: '金额', width: 100, align: 'right',
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
            {field: 'person', title: '操作人', width: 120, align: 'left'},
            {field: 'date', title: '操作日期', width: 180, align: 'left'},
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

    gridFitmentCostHandel.setLoadData([$.extend({},gridDefault)]);
}
function initGridEquipmentCost() {
    gridEquipmentCostHandel.setGridName("gridEquipmentCost");
    $("#gridEquipmentCost").datagrid({
        align:'center',
        rownumbers:true,    //序号
        height:'40%',
        width:'100%',
        columns:[[
            {field:'cz',title:'操作',width:'60px',align:'center',
                formatter : function(value, row,index) {
                    var str =  '<a name="add" class="add-line" data-gridName="gridEquipmentCost" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                        '&nbsp;&nbsp;<a name="del" class="del-line" data-gridName="gridEquipmentCost" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';

                    return str;
                },
            },
            {field: 'costName', title: '设备费用', width: 180, align: 'left',editor:'text'},
            {field: 'price', title: '金额', width: 100, align: 'right',
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
            {field: 'person', title: '操作人', width: 120, align: 'left'},
            {field: 'date', title: '操作日期', width: 180, align: 'left'},
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
        height:'40%',
        width:'100%',
        columns:[[
            {field:'cz',title:'操作',width:'60px',align:'center',
                formatter : function(value, row,index) {
                    var str =  '<a name="add" class="add-line" data-gridName="gridAmortizeCost" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                        '&nbsp;&nbsp;<a name="del" class="del-line" data-gridName="gridAmortizeCost" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';

                    return str;
                },
            },
            {field: 'costName', title: '摊销费用', width: 180, align: 'left',editor:'text'},
            {field: 'price', title: '金额', width: 100, align: 'right',
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
            {field: 'person', title: '操作人', width: 120, align: 'left'},
            {field: 'date', title: '操作日期', width: 180, align: 'left'},
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
    var data = {};
    var dataJson = JSON.stringify(data);

    $.ajax({
        url:contextPath+"/form/purchase/saveOrder",
        type:"POST",
        contentType:'application/json',
        data:dataJson,
        success:function(result){
            gFunEndLoading();
            if(result['code'] == 0){
                $.messager.alert("操作提示", "保存成功！", "info",function(){

                });
            }else{
                new publicErrorDialog({
                    "title":"保存失败",
                    "error":result['message']
                });
            }
        },
        error:function(result){
            gFunEndLoading();
            messager("请求发送失败或服务器处理失败");
        }
    });
}

function saveBranchCost() {
    gFunStartLoading();
    var data = {
        fitmentCost:gridFitmentCostHandel.getRowsWhere({costName:"1"}),
        equipmentCost:gridEquipmentCostHandel.getRowsWhere({costName:"1"}),
        amortizeCost:gridAmortizeCostHandel.getRowsWhere({costName:"1"})
    }
    var dataJson = JSON.stringify(data);

    $.ajax({
        url:contextPath+"/form/purchase/saveOrder",
        type:"POST",
        contentType:'application/json',
        data:dataJson,
        success:function(result){
            gFunEndLoading();
            if(result['code'] == 0){
                $.messager.alert("操作提示", "保存成功！", "info",function(){

                });
            }else{
                new publicErrorDialog({
                    "title":"保存失败",
                    "error":result['message']
                });
            }
        },
        error:function(result){
            gFunEndLoading();
            messager("请求发送失败或服务器处理失败");
        }
    });
}