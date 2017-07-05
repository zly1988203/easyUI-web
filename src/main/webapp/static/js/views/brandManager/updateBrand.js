
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
		data : formObj
	},function(result){
		if(result.code == 0){
			alertTip(result.message, initDataGrid);
			closeDialogHandel();
		}else{
			$('#saveBrand').removeAttr("disabled");
            $_jxc.alert(result.message);
		}
	});
}

//关闭属性编辑窗口
function closeDialogHandel(){
    if(editDalogTemp){
        $(editDalogTemp).panel('destroy');
    }
}