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
			url : '${ctx}/common/dict/getDictType?type=${type}',
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
				title : '字典id',
				width : 150,
				align : "center"
			}, {
				field : 'label',
				title : '标签名称',
				width : 120,
				align : "center"
			}, {
				field : 'skuId',
				title : '值',
				width : 100,
				align : "center"
			}, {
				field : 'description',
				title : '描述',
				width : 80,
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
