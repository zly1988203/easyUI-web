<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>采购成本调价单-新增</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/purchase/cost/costMain.js?V=${versionNo}"></script>
	<style>
	.datagrid-header-row .datagrid-cell {
	text-align: center !important;
	}
	</style>
</head>
<body class="ub ub-ver uw uh ufs-14 uc-black">
    <input type='hidden' id="pageStatus" value="add">
	<div class="ub ub-ver ub-f1 umar-4  ubor">
		<div class="ub ub-ac upad-4">
			<div class="ubtns">
				<div class="ubtns-item" onclick="saveCost()">保存</div>
				<div class="ubtns-item-disabled">删除</div>
				<div class="ubtns-item-disabled">审核</div>
				<div class="ubtns-item-disabled">打印</div>
				<div class="ubtns-item-disabled">导出明细</div>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
			</div>
		</div>
		<form id="formAdd">
			<div class="ub ub-ver ">
				<div class="ub umar-t8">
					<div class="ub ub-ac umar-r80">
						<div class="umar-r10 uw-60 ut-r">收货单号:</div>
						<input name="refFormId" id="refFormId" type="hidden" value="${form.id}">
						<input class="uinp" readonly="readonly" id="refFormNo" type="text" onclick="selectSupplier()" value="${form.formNo}">
						<div class="uinp-more" onclick="selectSupplier()">...</div>
					</div>


					<div class="ub ub-ac umar-r80">
					<div class="umar-r10 uw-60 ut-r">收货机构:</div>
					<input class="uinp" name="branchId" id="branchId" type="hidden" value="${form.branchId}">
					<input id="branchName" class="uinp uinp-no-more" readonly="readonly" type="text" value="${form.branchName}" disabled>

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
				<div class="umar-r10 uw-60 ut-r">供应商:</div>
				<input class="uinp" name="supplierId" id="supplierId"type="hidden" value="${form.supplierId}">
				<input class="uinp uinp-no-more" readonly="readonly" id="supplierName" type="text" value="${form.supplierName}" disabled>
				</div>

					<div class="ub ub-ac umar-r80">
						<div class="umar-r10 uw-60 ut-r">经营方式:</div>
						<input class="uinp" name="saleWay" id="saleWay" type="hidden" value="${form.saleWay}">
						<input class="uinp uinp-no-more" id="saleWayName" name="saleWayName" value="${form.saleWayStr}"
							type="text" readonly="readonly" disabled>
					</div>
					<div class="ub ub-ac umar-r80">
						<div class="umar-r10 uw-60 ut-r">修改人员:</div>
						<div class="utxt"></div>
					</div>
					<div class="ub ub-ac">
						<div class="umar-r10 uw-60 ut-r">修改时间:</div>
						<div class="utxt"></div>
					</div>
				</div>
				<div class="ub umar-t8">
					<div class="ub ub-ac uw-624 umar-r80">
						<div class="umar-r10 uw-60 ut-r">备注:</div>
						<input class="uinp ub ub-f1" name="remark" id="remark" type="text"
							onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
							onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
							oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
							maxlength="100">
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
			</div>
		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridCost"></table>
		</div>
	</div>

</body>
</html>