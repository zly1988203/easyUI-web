
function save() {
	$('#saveCategory').attr("disabled","disabled");
	var isValid = $("#formAdd").form('validate');
	if (!isValid) {
		$('#saveCategory').removeAttr("disabled");
		return;
	}
    if($('#categoryName').val().trim()===""){
        $('#saveCategory').removeAttr("disabled");
        $_jxc.alert("请输入类别名称");
        return;
    }

	var formObj = $('#formAdd').serializeObject();
	$.ajax({
		url : contextPath + "/common/category/updateCategory",
		type : "POST",
		data : formObj,
		success : function(result) {
			if(result.code == 0){
				alertTip(result.message, reloadList);
				closeDialogHandel();
			}else{
				$('#saveCategory').removeAttr("disabled");
                $_jxc.alert(result.message);
			}
		},
		error : function(result) {
            $_jxc.alert("请求发送失败或服务器处理失败");
		}
	});
}

//关闭属性编辑窗口
function closeDialogHandel(){
    if(editDalogTemp){
        $(editDalogTemp).panel('destroy');
    }
}