/**
 * Created by huangj02 on 2016/10/12.
 */
$(function(){
	
	//供应商区域选择事件
	bindSupplierAreaSelect();
	
	var supplierIdVal = $("#supplierIdVal").val();
	if(supplierIdVal){
		//初始化下拉框选中值
		selectParamInit();
	}
    $("#minAmountDiv").addClass("unhide");
});

function onChangeSaleWay() {
    var saleWay = 	$('#saleWay').combobox("getValue");
    if(saleWay != "C"){
		$("#minAmountDiv").addClass("unhide");
	}else{
        $("#minAmountDiv").removeClass("unhide");
	}
}

function saveSupplier() {
	var isValid = $("#formAdd").form('validate');
	if (!isValid) {
		return;
	}
    if($('#supplierName').val().trim()===""){
        $_jxc.alert("请输入供应商名称");
        return;
    }

	var formObj = $('#formAdd').serializeObject();
	$.ajax({
		url : contextPath + "/supplier/addSupplier",
		type : "POST",
		data : formObj,
		success : function(result) {
			if(result){
				alertTip(result.message, reloadListHandel);
			}
		},
		error : function(result) {
			$_jxc.alert("请求发送失败或服务器处理失败");
		}
	});
}