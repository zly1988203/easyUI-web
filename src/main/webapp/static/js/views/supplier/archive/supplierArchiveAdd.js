/**
 * Created by huangj02 on 2016/10/12.
 */
$(function(){
	debugger;
	//供应商区域选择事件
	bindSupplierAreaSelect();
	
	// var supplierIdVal = $("#supplierIdVal").val();
	// if(supplierIdVal){
	// 	//初始化下拉框选中值
	// 	selectParamInit();
	// }
    $("#minAmountDiv").addClass("unhide");
});

function onChangeSaleWay() {
    var saleWay = 	$('#saleWay').combobox("getValue");
    if(saleWay != "C"){
		$("#minAmountDiv").addClass("unhide");
	}else{
        $("#minAmountDiv").removeClass("unhide");
	}
    $("#minAmount").numberbox("setValue",0.00);
}

function saveSupplier() {
	debugger;
	var isValid = $("#formAdd").form('validate');
	if (!isValid) {
		return;
	}
    if($('#supplierName').val().trim()===""){
        $_jxc.alert("请输入供应商名称");
        return;
    }

	var formObj = $('#formAdd').serializeObject();
    var saleWay = 	$('#formAdd #saleWay').combobox("getValue");
    if(saleWay === "C"){
    	if($_jxc.isStringNull(formObj.minAmount)){
            $_jxc.alert("保底金额在0到999999.99之间");
			return;
		}
        if(parseFloat(formObj.minAmount).toFixed(2) <= 0.00 || parseFloat(formObj.minAmount).toFixed(2) > 999999.99){
            $_jxc.alert("保底金额在0到999999.99之间");
            return;
		}
    }

	$_jxc.ajax({
		url : contextPath + "/supplier/addSupplier",
		data : formObj
	},function(result){
		if(result){
			$_jxc.alert(result.message);
            closeDialogHandel();
            reloadListHandel();
		}
	});
}