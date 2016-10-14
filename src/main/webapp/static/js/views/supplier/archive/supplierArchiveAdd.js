/**
 * Created by huangj02 on 2016/10/12.
 */
function saveSupplier() {
	var formObj = $('#formAdd').serializeObject();
	var isValid = $("#formAdd").form('validate');
	if (!isValid) {
		return;
	}

	$.ajax({
		url : contextPath + "/supplier/addSupplier",
		type : "POST",
		data : formObj,
		success : function(result) {
			if (result.code==0) {
				$.messager.alert("操作提示", "操作成功！");
				closeDialog();
			} else {
				successTip(result['message']);
			}
		},
		error : function(result) {
			successTip("请求发送失败或服务器处理失败");
		}
	});
}