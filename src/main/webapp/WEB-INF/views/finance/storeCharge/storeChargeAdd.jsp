
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>机构费用-新增</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
	<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script src="${ctx}/static/js/views/finance/storeCharge/storeChargeMain.js?V=3"></script>
	<style>
	.datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
	</style>
</head>
<body class="ub ub-ver uw uh ufs-14 uc-black">
	<input type='hidden' id="cascadeGoods" name="cascadeGoods" value="">
	<div class="ub ub-ver ub-f1 umar-4  ubor">
		<div class="ub ub-ac upad-4">
			<div class="ubtns">
				<div class="ubtns-item" onclick="storeChargeAdd()">新增</div>
				<shiro:hasPermission name="JxcPurchaseOrder:add">
					<div class="ubtns-item" onclick="saveStoreCharge()">保存</div>
				</shiro:hasPermission>
				<div class="ubtns-item" onclick="checkStoreCharge()">审核</div>
				<div class="ubtns-item" onclick="selectFinanceCode()">费用选择</div>
				<div class="ubtns-item" onclick="toImportStoreCharge()">费用导入</div>
				<div class="ubtns-item uinp-no-more">删除</div>
				<div class="ubtns-item" onclick="toClose()">关闭</div>
			</div>
		</div>
		<form id="formAdd">
			<div class="ub ub-ver ">
				<div class="ub umar-t8">
					<div class="ub ub-ac umar-r80">
						<div class="umar-r10 uw-60 ut-r">供应商:</div>
						<input class="uinp" name="supplierId" id="supplierId"
							type="hidden"> <input class="uinp" readonly="readonly"
							id="supplierName" type="text" onclick="selectSupplier()">
						<div class="uinp-more" onclick="selectSupplier()">...</div>
					</div>
					<div class="ub ub-ac umar-r80">
						<div class="umar-r10 uw-60 ut-r">交货期限:</div>
						<input id="deliverTime" class="Wdate easyui-validatebox"
							data-options="required:true" type="text"
							onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})" />
					</div>
					<div class="ub ub-ac umar-r80">
						<div class="umar-r10 uw-60 ut-r">制单人员:</div>
						<div class="utxt"><%=UserUtil.getCurrentUser().getUserName()%></div>
					</div>
					<div class="ub ub-ac">
						<div class="umar-r10 uw-60 ut-r">制单时间:</div>
						<div class="utxt" id="createTime"></div>
					</div>
				</div>
				<div class="ub umar-t8">
					<div class="ub ub-ac umar-r80">
						<div class="umar-r10 uw-60 ut-r">收货机构:</div>
						<input class="uinp" name="branchId" id="branchId" type="hidden">
						<input id="branchName" class="uinp" readonly="readonly"
							type="text" onclick="selectBranch()">
						<div class="uinp-more" onclick="selectBranch()">...</div>
					</div>
					<div class="ub ub-ac umar-r80">
						<div class="umar-r10 uw-60 ut-r">采购员:</div>
						<input class="uinp" name="salesmanId" id="salesmanId"
							type="hidden"> <input class="uinp" id="operateUserName"
							type="text" readonly="readonly" onclick="selectOperator()">
						<div class="uinp-more" onclick="selectOperator()">...</div>

					</div>
					<div class="ub ub-ac umar-r80">
						<div class="umar-r10 uw-60 ut-r">审核人员:</div>
						<div class="utxt"></div>
					</div>
					<div class="ub ub-ac">
						<div class="umar-r10 uw-60 ut-r">审核时间:</div>
						<div class="utxt"></div>
					</div>
				</div>
				<div class="ub umar-t8">
					<div class="ub ub-ac uw-610" style="width: 624px;">
						<div class="umar-r10 uw-60 ut-r">备注:</div>
						<input class="uinp ub ub-f1" name="remark" id="remark" type="text"
							onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
							onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
							oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
							maxlength="100">
					</div>
				</div>
			</div>
		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridStoreCharge"></table>
		</div>
	</div>

	<!-- 是否有改价权限 -->
	<shiro:hasPermission name="JxcPurchaseOrder:updatePrice">
		<input type="hidden" id="allowUpdatePrice" />
	</shiro:hasPermission>

</body>
</html>