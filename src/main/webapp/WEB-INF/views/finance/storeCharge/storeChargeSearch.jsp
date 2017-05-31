
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>门店费用查询</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script
	src="${ctx}/static/js/views/finance/storeCharge/storeChargeSearch.js?V=4"></script>
<style>
.datagrid-header .datagrid-cell {
	text-align: center !important;
	font-weight: bold;
}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm">
			<div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item" onclick="queryCharge()">查询</div>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="exportData()">导出</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>
			</div>

			<div class="ub umar-t8">

				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">机构:</div>
					<input class="uinp" name="branchId" id="branchId" type="hidden">
					<input class="uinp" id="oldBranchName" name="oldBranchName"
						type="hidden"> <input class="uinp" id="branchName"
						name="branchName" type="text" maxlength="50">

					<div class="uinp-more" onclick="selectListBranches()">...</div>
				</div>

				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">月份:</div>
					<input class="Wdate uw-300 uinp-no-more"
						name="startTime" id="startTime"
						onclick="WdatePicker({dateFmt:'yyyy-MM',maxDate:'%y-%M'})" />
				</div>

				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">查询类型:</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="status" id="status0"
							value="0" checked="checked" /><label for="status0">费用汇总 </label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="status" id="status1"
							value="1" /><label for="status1">费用明细 </label>
					</div>

				</div>

			</div>

		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridStoreChargeSearch"></table>
		</div>

	</div>
</body>
</html>