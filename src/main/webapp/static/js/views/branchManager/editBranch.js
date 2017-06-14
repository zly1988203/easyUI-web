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
    		$_jxc.alert("请求发送失败或服务器处理失败");
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
                            if(key === "status"){
                                if(value == 1){
                                    $("#statusStr").val("运营中");
                                }else {
                                    $("#statusStr").val("已关闭");
                                }
                            }

                            $("#"+key).val(value);
                        }
                }
            }
            else if($("#"+key).prop("tagName") =="TEXTAREA"){ //普通的textarea
                $("#"+key).html(value);
            }
            else if($("#"+key).prop("tagName") == "SELECT"){
                if(value != undefined && typeof (value) != "undefined"){



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
    costAmount:0.00,
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
            {field: 'costName', title: '装修费用', width: 180, align: 'left',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return;
                    }
                    if(undefined != value && value.trim().length > 20){
                        value = value.substr(0,20);
                    }
                    return value;
                },
                editor:{
                    type:'textbox',
                    options:{
                        prompt:"最多输入20个字符",
                        onChange:costNameChange1
                    }
                }
            },
            {field: 'costAmount', title: '金额', width: 180, align: 'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0.00,
                        max:999999.99,
                        prompt:"最大金额999999.99",
                        precision:2,
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

function costNameChange1(newVal,oldVal){
    // if($_jxc.isStringNull(newVal)){
    //     $_jxc.alert('装修费用名称不能为空')
    //     gridFitmentCostHandel.setFieldTextValue('costName',oldVal);
    //     return;
    // }

    if(undefined != newVal && newVal.trim().length > 20){
        $_jxc.alert('装修费用最多输入20个字符')
        newVal = newVal.substr(0,20);
    }
    gridFitmentCostHandel.setFieldTextValue('costName',newVal);
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
            {field: 'costName', title: '设备费用', width: 180, align: 'left',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return;
                    }
                    if(undefined != value && value.trim().length > 20){
                        value = value.substr(0,20);
                    }
                    return value;
                },
                editor:{
                    type:'textbox',
                    options:{
                        prompt:"最多输入20个字符",
                        onChange:costNameChange2
                    }
                }
            },
            {field: 'costAmount', title: '金额', width: 180, align: 'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0.00,
                        max:999999.99,
                        prompt:"最大金额999999.99",
                        precision:2,
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

function costNameChange2(newVal,oldVal){
    // if($_jxc.isStringNull(newVal)){
    //     $_jxc.alert('设备费用名称不能为空')
    //     gridEquipmentCostHandel.setFieldTextValue('costName',oldVal);
    //     return;
    // }

    if(undefined != newVal && newVal.trim().length > 20){
        $_jxc.alert('设备费用最多输入20个字符')
        newVal = newVal.substr(0,20);
    }
    gridEquipmentCostHandel.setFieldTextValue('costName',newVal);
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
            {field: 'costName', title: '摊销费用', width: 180, align: 'left',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return;
                    }
                    if(undefined != value && value.trim().length > 20){
                        value = value.substr(0,20);
                    }
                    return value;
                },
                editor:{
                    type:'textbox',
                    options:{
                        prompt:"最多输入20个字符",
                        onChange:costNameChange3
                    }
                }
            },
            {field: 'costAmount', title: '金额', width: 180, align: 'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0.00,
                        max:999999.99,
                        prompt:"最大金额999999.99",
                        precision:2,
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

function costNameChange3(newVal,oldVal){
    // if($_jxc.isStringNull(newVal)){
    //     $_jxc.alert('摊销费用名称不能为空');
    //     gridAmortizeCostHandel.setFieldTextValue('costName',oldVal);
    //     return;
    // }

    if(undefined != newVal && newVal.trim().length > 20){
        $_jxc.alert('摊销费用最多输入20个字符')
        newVal = newVal.substr(0,20);
    }
    gridAmortizeCostHandel.setFieldTextValue('costName',newVal);
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
    if(index === "0"){
        $("#"+gridName).datagrid("endEdit", index);
        $("#"+gridName).datagrid("deleteRow",index);
        $("#"+gridName).datagrid("loadData",[gridDefault]);
        return;
    }
    if(gridName === "gridFitmentCost"){
        gridFitmentCostHandel.delRow(index);
    }else if(gridName === "gridEquipmentCost"){
        gridEquipmentCostHandel.delRow(index);
    }else if(gridName === "gridAmortizeCost"){
        gridAmortizeCostHandel.delRow(index);
    }

}

function saveBranchCost() {
    $("#gridFitmentCost").datagrid("endEdit", gridFitmentCostHandel.getSelectRowIndex());
    $("#gridEquipmentCost").datagrid("endEdit", gridEquipmentCostHandel.getSelectRowIndex());
    $("#gridAmortizeCost").datagrid("endEdit", gridAmortizeCostHandel.getSelectRowIndex());

    var formData = {};
    var isCheckResult = true;
    var decorateCostList = gridFitmentCostHandel.getRows();
    $.each(decorateCostList,function (index,item) {
        if(typeof (item.id) !="undefined"){
            if($_jxc.isStringNull(item.costName)){
                $_jxc.alert('第'+(index+1)+'行装修费用名称不能为空')
                isCheckResult = false;
                return false;
            }

            if(item.costAmount === ""){
                $_jxc.alert('第'+(index+1)+'行装修费用金额不能为空')
                isCheckResult = false;
                return false;
            }

            if(parseFloat(item.costAmount).toFixed(2) <= 0){
                $_jxc.alert('第'+(index+1)+'行装修费用金额不能为0')
                isCheckResult = false;
                return false;
            }

        }
        else{

            if(parseFloat(item.costAmount).toFixed(2) > 0 && $_jxc.isStringNull(item.costName)){
                $_jxc.alert('第'+(index+1)+'行金额大于0，装修费用名称不能为空')
                isCheckResult = false;
                return false;
            }

            if(item.costAmount === ""){
                $_jxc.alert('第'+(index+1)+'行装修费用金额不能为空')
                isCheckResult = false;
                return false;
            }

            if(parseFloat(item.costAmount).toFixed(2) <= 0 && !$_jxc.isStringNull(item.costName)){
                $_jxc.alert('第'+(index+1)+'行装修费用金额不能为0')
                isCheckResult = false;
                return false;
            }
        }

    })

    if(!isCheckResult) return;
    formData.decorateCostList = gridFitmentCostHandel.getRowsWhere({costName:1});

    var deviceCostList = gridEquipmentCostHandel.getRows();
    $.each(deviceCostList,function (index,item) {
        if(typeof (item.id) !="undefined"){
            if($_jxc.isStringNull(item.costName)){
                $_jxc.alert('第'+(index+1)+'行设备费用名称不能为空')
                isCheckResult = false;
                return false;
            }

            if(item.costAmount === ""){
                $_jxc.alert('第'+(index+1)+'行设备费用金额不能为空')
                isCheckResult = false;
                return false;
            }

            if(parseFloat(item.costAmount).toFixed(2) <= 0){
                $_jxc.alert('第'+(index+1)+'行设备费用金额不能为0')
                isCheckResult = false;
                return false;
            }
        }
        else {
            if(parseFloat(item.costAmount).toFixed(2) > 0 && $_jxc.isStringNull(item.costName)){
                $_jxc.alert('第'+(index+1)+'行金额大于0，设备费用名称不能为空')
                isCheckResult = false;
                return false;
            }

            if(item.costAmount === ""){
                $_jxc.alert('第'+(index+1)+'行设备费用金额不能为空')
                isCheckResult = false;
                return false;
            }

            if(parseFloat(item.costAmount).toFixed(2) <= 0 && !$_jxc.isStringNull(item.costName)){
                $_jxc.alert('第'+(index+1)+'行设备费用金额不能为0')
                isCheckResult = false;
                return false;
            }
        }

    })

    if(!isCheckResult) return;
    formData.deviceCostList = gridEquipmentCostHandel.getRowsWhere({costName:1});

        var amortizeCostList = gridAmortizeCostHandel.getRows();
    $.each(amortizeCostList,function (index,item) {
        if(typeof (item.id) !="undefined"){
            if($_jxc.isStringNull(item.costName)){
                $_jxc.alert('第'+(index+1)+'行摊销费用名称不能为空')
                isCheckResult = false;
                return false;
            }

            if(item.costAmount === ""){
                $_jxc.alert('第'+(index+1)+'行摊销费用金额不能为空')
                isCheckResult = false;
                return false;
            }

            if(parseFloat(item.costAmount).toFixed(2) <= 0){
                $_jxc.alert('第'+(index+1)+'行摊销费用金额不能为0')
                isCheckResult = false;
                return false;
            }
        }
        else {
            if(parseFloat(item.costAmount).toFixed(2) > 0 && $_jxc.isStringNull(item.costName)){
                $_jxc.alert('第'+(index+1)+'行金额大于0，摊销费用名称不能为空')
                isCheckResult = false;
                return false;
            }
            if(item.costAmount === ""){
                $_jxc.alert('第'+(index+1)+'行摊销费用金额不能为空')
                isCheckResult = false;
                return false;
            }
            if(parseFloat(item.costAmount).toFixed(2) <= 0 && !$_jxc.isStringNull(item.costName)){
                $_jxc.alert('第'+(index+1)+'行摊销费用金额不能为0')
                isCheckResult = false;
                return false;
            }

        }
    })

    if(!isCheckResult) return;
    formData.amortizeCostList = gridAmortizeCostHandel.getRowsWhere({costName:1});

    if(formData.decorateCostList.length <= 0 && formData.deviceCostList.length <= 0 && formData.amortizeCostList.length <= 0){
        $_jxc.alert('请添加费用');
        return;
    }
    
    var branchId = $("#branchId").val(); 
    formData.branchId = branchId;

    var dataJson = JSON.stringify(formData);

    $_jxc.ajax({
        url:contextPath+"/archive/branch/updateBranchCost",
        data:dataJson,
        contentType:'application/json',
    },function(result){
        if(result['code'] == 0){
            $_jxc.alert("保存成功！");
        }else{
            $_jxc.alert(result['message']);
        }
    });
}

function saveBranch() {
    var formData = $('#formEdit').serializeObject();

    if(formData.costAvgYear <= 0 || formData.costAvgYear > 999999){
        $_jxc.alert("费用均摊年数不能小于0或者大于999999");
        return;
    }


    if(!formData.costAvgYear){
        formData.costAvgYear = null;
    }

    if(!formData.distriPriceType){
        formData.distriPriceType = null;
    }

    $_jxc.ajax({
        url:contextPath+"/archive/branch/updateBranch",
        data:formData
    },function(result){
        if(result['code'] == 0){
            $_jxc.alert("保存成功！");
        }else{
            $_jxc.alert(result['message']);
        }
    });
}