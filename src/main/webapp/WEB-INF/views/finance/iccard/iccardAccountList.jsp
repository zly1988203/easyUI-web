
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>一卡通交易查询</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script
	src="${ctx}/static/js/views/finance/iccard/iccardAccountList.js?v=5"></script>
<%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
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
					<div class="ubtns-item" onclick="query()">查询</div>
					<div class="ubtns-item" onclick="recharge()">充值</div>
					<div class="ubtns-item" onclick="extracted()">提取</div>
					<shiro:hasPermission name="JxcPurchaseOrder:print">
						<div class="ubtns-item" onclick="exportData()">导出</div>
					</shiro:hasPermission>
					<div class="ubtns-item-disabled">设置</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-60 ut-r">机&nbsp;&nbsp;构:</div>
					<input type="hidden" id="branchId" name="branchId" />
					<input type="hidden" id="branchCompleCode" name="branchCompleCode"/>
					<input type="hidden" id="oldBranchName" >
					<input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" maxlength="50"/>
					<div class="uinp-more" onclick="selectListBranches()" >...</div>
				</div>

				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-60 ut-r">店铺类型:</div>
					<select class="uselect easyui-combobox" style="width: 204px;" data-options="editable:false" name="shopType" id="shopType">
						<option value="">--请选择--</option>
						<option value="1">直营店</option>
						<option value="2">加盟店</option>
					</select>
				</div>
			</div>

		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridCardAccount"></table>

		</div>
	</div>
</body>
</html>