<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>字典</title>
 <%@ include file="/WEB-INF/views/include/header.jsp"%>
</head>
<body>
	<!--end tab-header-form -->
	<table id="dg"></table>
	<a id="addForm">新增调价单</a>
	<script type="text/javascript">
		//列表
		var dg;
		dg = $('#dg').datagrid({
			method : 'post',
			url : '${ctx}/form/deliverSelect/getDeliverFormList',
			fit : true,
			fitColumns : false,
			border : false,
			idField : 'id',
			striped : true,
			pagination : true,
			rownumbers : true,
			pageNumber : 1,
			pageSize : 20,
			pageList : [ 5, 10, 20, 50, 100 ],
			singleSelect : true,
			remotesort : false,
			showFooter : true,
			extEditing : false,
			columns : [ [{
				field : 'id',
				hidden:true,
				title : '调拨单id',
				width : 150,
				align : "center"
			}, {
				field : 'status',
				hidden:true,
				title : '订单状态',
				width : 120,
				align : "center"
			},{
				field : 'formNo',
				title : '订单号',
				width : 120,
				align : "center"
			},{
				field : 'statusName',
				title : '订单状态',
				width : 120,
				align : "center"
			}, {
				field : 'sourceBranchId',
				title : '调出门店id',
				hidden:true,
				width : 100,
				align : "center"
			}, {
				field : 'sourceBranchName',
				title : '出库门店',
				width : 120,
				align : "center"
			}] ],
			toolbar : '#tb',
			showFooter : true,
			enableHeaderClickMenu : false,
			enableHeaderContextMenu : false,
			enableRowContextMenu : false,
		});
	</script>

</body>
</html>
