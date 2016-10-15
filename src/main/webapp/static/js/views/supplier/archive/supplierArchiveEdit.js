/**
 * Created by huangj02 on 2016/10/12.
 */
function saveSupplier() {
	var formObj = $('#formEdit').serializeObject();
	var isValid = $("#formEdit").form('validate');
	if (!isValid) {
		return;
	}

	$.ajax({
		url : contextPath + "/supplier/updateSupplier",
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