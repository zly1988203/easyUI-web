<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>促销活动选择</title>
<%-- <%@ include file="/WEB-INF/views/include/header.jsp"%> --%>
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
			url : '${ctx}/sale/activitySelect/activityList',
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
				title : '促销单id',
				width : 150,
				align : "center"
			}, {
				field : 'activityCode',
				title : '活动编号',
				width : 120,
				align : "center"
			},{
				field : 'activityName',
				title : '活动名称',
				width : 120,
				align : "center"
			},{
				field : 'startTime',
				title : '活动开始日期',
				width : 120,
				align : "center",
				formatter: function (value, row, index) {
					if (value) {
						return new Date(value).format('yyyy-MM-dd');
					}
					return "";
				}
			}, {
				field : 'endTime',
				title : '活动开始日期',
				width : 100,
				align : "center",
				formatter: function (value, row, index) {
					if (value) {
						return new Date(value).format('yyyy-MM-dd');
					}
					return "";
				}
			}, 
			{field:'dailyStartTime',title:'活动时段',width:'150px',align:'left', formatter: function (value, row, index) {
				//debugger;
				if (row) {
					return row.dailyStartTime+"-"+row.dailyEndTime;
				}
				return "";
			}},
			] ],
			toolbar : '#tb',
			showFooter : true,
			enableHeaderClickMenu : false,
			enableHeaderContextMenu : false,
			enableRowContextMenu : false,
		});
	</script>

</body>
</html>
