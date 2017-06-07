
function save() {
	$('#saveBrand').attr("disabled","disabled");
	var isValid = $("#formAdd").form('validate');
	if (!isValid) {
		$('#saveBrand').removeAttr("disabled");
		return;
	}

    if($('#brandName').val().trim()===""){
        $('#saveBrand').removeAttr("disabled");
        $_jxc.alert("请输入品牌名称");
        return;
    }

	var formObj = $('#formAdd').serializeObject();
	$.ajax({
		url : contextPath + "/common/brand/updateBrand",
		type : "POST",
		data : formObj,
		success : function(result) {
			if(result.code == 0){
				alertTip(result.message, initDataGrid);
				closeDialogHandel();
			}else{
				$('#saveBrand').removeAttr("disabled");
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