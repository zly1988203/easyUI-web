
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>机构信息</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script src="${ctx}/static/js/views/branchManager/branchList.js?V=2"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-f1 umar-4 upad-4">
		<!--left-->
		<div class="ub ub-ver ubor uw-240">
			<div class="ubor-b "></div>
			<div class="ub upad-4 ub-f1 uscroll ">
				<div class="zTreeDemoBackground left">
					<ul id="treeBranchList" class="ztree"></ul>
				</div>
			</div>
		</div>
		<!--left end-->

		<div class="ub ub-ver ub-f1 umar-l4">
			<div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item" onclick="queryBranch()">查询</div>
					<div class="ubtns-item" onclick="editBranch()">编辑</div>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="exportData()">导出</div>
					<div class="ubtns-item-disabled">打印</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>
			</div>
			<form action="" id="formList" method="post">
				<div class="ub umar-t12">
					<div class="ub ub-ac umar-r10">
						<div class="umar-r10 uw-80 ut-r">机构名称:</div>
						<input class="uinp" type="text" name="codeOrName" id="codeOrName"
							placeholder="输入编号、名称进行查询">
					</div>

					<div class="ub ub-ac umar-r10">
						<div class="umar-r10 uw-80 ut-r">机构类型:</div>
						<select class="uselect easyui-combobox" style="width: 204px;"
							data-options="editable:false" name="branchType" id="branchType">
							<option value="">--全部--</option>
							<option value="1">直营店</option>
							<option value="2">加盟店</option>
						</select>
					</div>
				</div>

				<div class="ub umar-t8">
					<div class="ub ub-ac umar-r10">
						<div class="umar-r10 uw-80 ut-r">机构状态:</div>
						<select class="uselect easyui-combobox" style="width: 204px;"
							data-options="editable:false" name="status" id="status">
							<option value="">--全部--</option>
							<option value="1">运营中</option>
							<option value="2">已关闭</option>
						</select>
					</div>
				</div>

			</form>
			<div class="ub umar-t10 ub-f1">
				<table id="gridBranchList"></table>
			</div>
		</div>


	</div>
</body>
</html>