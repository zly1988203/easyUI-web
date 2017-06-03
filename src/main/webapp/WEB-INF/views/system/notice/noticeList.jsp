
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>系统公告</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script src="${ctx}/static/js/views/system/notice/noticeList.js?V=5"></script>
	<style>
	.datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
	</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm">
			<div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item" onclick="queryNoticeList()">查询</div>
					<shiro:hasPermission name="JxcPurchaseOrder:add">
						<div class="ubtns-item" onclick="addNotice()">新增</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcPurchaseOrder:delete">
						<div class="ubtns-item" onclick="delNotice()">删除</div>
					</shiro:hasPermission>
					<%--<div class="ubtns-item" onclick="gFunRefresh()">重置</div>--%>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>

				<!-- 引入时间选择控件 -->
				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">发布门店:</div>
					<input class="uinp" name="branchId" id="branchId" type="hidden">
					<input class="uinp" id="publishBranchName" name="publishBranchName"
						type="text" maxlength="50">
					<div class="uinp-more" onclick="publishShop()">...</div>
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">发布人:</div>
					<input class="uinp" name="userId" id="userId" type="hidden">
					<input class="uinp" id="publishUserName" name="publishUserName"
						type="text" maxlength="50">
				</div>

			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">接收门店:</div>
					<input class="uinp" name="receiveBranchId" id="receiveBranchId" type="hidden">
					<input class="uinp" id="receiveBranchName" name="receiveBranchName"
						type="text" maxlength="50">
					<div class="uinp-more" onclick="receiveShop()">...</div>
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">接收人:</div>
					<input class="uinp" name="receiveUserId" id="receiveUserId" type="hidden">
					<input class="uinp" id="receiveUserName" name="receiveUserName"
						type="text" maxlength="50">

				</div>

				<div class="ub ub-ac umar-l20">
					<div class="umar-r10 uw-60 ut-r">查阅状态:</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="isRead" id="deal0"
							value="0" checked="checked"/><label for="deal0">未查阅 </label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="isRead" id="deal2"
							value="1" /><label for="deal2">已查阅 </label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="isRead" id="deal4"
							value=""/><label for="deal4">全部 </label>
					</div>
				</div>
			</div>

		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridNoticeList"></table>
		</div>

	</div>
</body>
</html>