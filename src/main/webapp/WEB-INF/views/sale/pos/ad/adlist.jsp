<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>POS客屏广告</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/sale/ad/adList.js?V=${versionNo}"></script>
<style>
.datagrid-header-row .datagrid-cell {
	text-align: center !important;
}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm">
			<div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item" onclick="queryAD()">查询</div>
					<shiro:hasPermission name="JxcPurchaseOrder:add">
						<div class="ubtns-item" onclick="adAdd()">新增</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcPurchaseOrder:delete">
						<div class="ubtns-item" onclick="adDelete()">删除</div>
					</shiro:hasPermission>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">退出</div>
				</div>

				<!-- 引入时间选择控件 -->
				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">编号:</div>
					<input class="uinp" name="formNo" id="formNo" type="text">
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">制单人员:</div>
					<input class="uinp" name="supplierId" id="supplierId" type="hidden">
					<input class="uinp" id="supplierName" name="supplierName"
						type="text" maxlength="50">
					<div class="uinp-more" onclick="selectSupplier()">...</div>
				</div>

			</div>
			<div class="ub umar-t8">

				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">广告名称:</div>
					<input class="uinp" name="formNo" id="formNo" type="text">
				</div>

				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">展示状态:</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="status" id="status_no"
							value="0" checked="checked" /><label for="status_no">未审核
						</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="status"
							id="status_yes" value="1" /><label for="status_yes">已审核
						</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="ub" type="radio" name="status" value="2" /><span>已终止
						</span>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="status"
							id="status_all" value="" /><label for="status_all">全部</label>
					</div>
				</div>
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">备注:</div>
					<input class="uinp uw-512" name="remark" id="remark" type="text">
				</div>
			</div>

		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridAdList"></table>
		</div>

	</div>
</body>
</html>