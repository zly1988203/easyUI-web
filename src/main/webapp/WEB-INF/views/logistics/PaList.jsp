<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>物流采购订单导出</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/logistics/PaList.js?V=${versionNo}"></script>
<%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm">
			<div class="ub ub-ac">
				<div class="ubtns">
					<shiro:hasPermission name="JxcPurchasePaLogis:search">
						<div class="ubtns-item" onclick="query()">查询</div>
					</shiro:hasPermission>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">退出</div>
				</div>

				<!-- 引入时间选择控件 -->
				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">单据编号:</div>
					<input class="uinp" name="formNo" id="formNo" type="text">
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">供应商:</div>
					<input class="uinp" name="formType" id="formType" type="hidden" value = "PA">
					<input class="uinp" name="supplierId" id="supplierId" type="hidden">
					<input class="uinp" id="supplierName" name="supplierName"
						type="text" maxlength="50">
					<div class="uinp-more" onclick="selectSupplier()">...</div>
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">操作员:</div>
					<input class="uinp" name="operateUserId" id="operateUserId"
						type="hidden"> <input class="uinp" id="operateUserName"
						name="operateUserName" type="text" maxlength="50">
					<div class="uinp-more" onclick="selectOperator()">...</div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40" id="branchSelect">
					<div class="umar-r10 uw-60 ut-r">收货机构:</div>
						<input class="uinp" name="branchId" id="branchId" type="hidden">
						<input class="uinp" id="branchName" name="branchName" type="text" maxlength="50">
					<div class="uinp-more" onclick="selectBranch()">...</div>
				</div>
			</div>
		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridOrders"></table>
		</div>
	</div>
</body>
</html>