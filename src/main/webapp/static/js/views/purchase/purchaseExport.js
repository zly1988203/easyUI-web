//导出
function exportData(type){
	var length = $("#gridEditOrder").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"导出成功");
		return;
	}
	if(length>10000){
		$.messager.alert("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	var formId=$("#formId").val();
	//$("#searchForm").datagrid("options").queryParams = {formNo : formNo};
//	$("#searchForm").attr("action",contextPath+'/form/purchase/exportList?formId='+formId);
//	$("#searchForm").submit();	
	window.location.href=contextPath+'/form/purchase/exportList?formId='+formId+'&type='+type;
}