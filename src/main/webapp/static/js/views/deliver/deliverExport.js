//导出  pattern 1 表示导出货号
function exportData(type,grid,pattern){
	var length = $("#" + grid).datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("导出成功");
		return;
	}
	
	if(length > exportMaxRow){
		$_jxc.alert("当次导出数据不可超过"+exportMaxRow+"条，现已超过，请重新调整导出范围！");
		return;
	}
	var formNo=$("#formNo").val();
	//$("#searchForm").datagrid("options").queryParams = {formNo : formNo};
//	$("#searchForm").attr("action",contextPath+'/form/purchase/exportList?formId='+formId);
//	$("#searchForm").submit();	
	window.location.href=contextPath+'/form/deliverFormList/exportList?formNo='+formNo+'&type='+type+'&pattern='+pattern;
}