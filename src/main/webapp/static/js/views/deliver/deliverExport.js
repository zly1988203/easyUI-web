//导出  pattern 1 表示导出货号
function exportData(type,grid,pattern){
	var length = $("#" + grid).datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"导出成功");
		return;
	}
	if(length>10000){
		$.messager.alert("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	var formNo=$("#formNo").val();
	//$("#searchForm").datagrid("options").queryParams = {formNo : formNo};
//	$("#searchForm").attr("action",contextPath+'/form/purchase/exportList?formId='+formId);
//	$("#searchForm").submit();	
	window.location.href=contextPath+'/form/deliverFormList/exportList?formNo='+formNo+'&type='+type+'&pattern='+pattern;
}