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
	
});

function saveSupplier() {
	var isValid = $("#formAdd").form('validate');
	if (!isValid) {
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
			successTip("请求发送失败或服务器处理失败");
		}
	});
}