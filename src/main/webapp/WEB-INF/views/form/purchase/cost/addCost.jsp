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
<script src="/static/js/views/purchase/orderAdd.js?V="></script>

</head>
<body class="ub ub-ver uw uh ufs-14 uc-black">
    <input type='hidden' id="pageStatus" value="add">
	<div class="ub ub-ver ub-f1 umar-4  ubor">
		<div class="ub ub-ac upad-4">
			<div class="ubtns">
				<shiro:hasPermission name="JxcPurchaseOrder:add">
					<div class="ubtns-item" onclick="saveCost()">保存</div>
				</shiro:hasPermission>
				<div class="ubtns-item-disabled">删单</div>
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
						<input class="uinp" name="supplierId" id="supplierId"type="hidden">
						<input class="uinp" readonly="readonly" id="supplierName" type="text" onclick="selectSupplier()">
						<div class="uinp-more" onclick="selectSupplier()">...</div>
					</div>


					<div class="ub ub-ac umar-r80">
					<div class="umar-r10 uw-60 ut-r">收货机构:</div>
					<input class="uinp" name="branchId" id="branchId" type="hidden">
					<input id="branchName" class="uinp" readonly="readonly" type="text">

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
				<input class="uinp" name="supplierId" id="supplierId"type="hidden">
				<input class="uinp" readonly="readonly" id="supplierName" type="text">
				</div>

					<div class="ub ub-ac umar-r80">
						<div class="umar-r10 uw-60 ut-r">经营方式:</div>
						 <input class="uinp" id="operateUserName"
							type="text" readonly="readonly">
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
					<div class="ub ub-ac uw-610" style="width: 624px;">
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
			<table id="gridEditOrder"></table>
		</div>
	</div>

</body>
</html>