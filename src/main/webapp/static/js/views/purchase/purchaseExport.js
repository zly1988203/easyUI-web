//导出
function exportData(type){
	var length = $("#gridEditOrder").datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("导出成功");
		return;
	}
	if(length>10000){
		$_jxc.alert("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	var formId=$("#formId").val();
	//$("#searchForm").datagrid("options").queryParams = {formNo : formNo};
//	$("#searchForm").attr("action",contextPath+'/form/purchase/exportList?formId='+formId);
//	$("#searchForm").submit();	
	window.location.href=contextPath+'/form/purchase/exportList?formId='+formId+'&type='+type;
}

//function exportDetail(param){
//	var formId = $("#formId").val();
//	window.location.href = contextPath + '/form/purchase/exportSheet?page=PAForm&sheetNo='+formId;
//}