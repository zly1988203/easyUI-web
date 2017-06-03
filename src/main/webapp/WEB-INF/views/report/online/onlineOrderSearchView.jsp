
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>采购订单</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="/static/js/views/purchase/orderList.js"></script>
<%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm">
			<div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item-disabled">查询</div>
					<div class="ubtns-item-disabled">重置</div>
					<div class="ubtns-item" onclick="exportData()">导出</div>
					<shiro:hasPermission name="JxcPurchaseOrder:print">
						<div class="ubtns-item" onclick="printPreview()">打印</div>
					</shiro:hasPermission>
					<div class="ubtns-item-disabled">设置</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>

				<!-- 引入时间选择控件 -->
				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>
			<div class="ub umar-t8 uc-black">【单号】:<span>${form.formNo}</span></div>
			<div class="ub uline umar-t8"></div>

			<div class="ub umar-t8">

				<div class="umar-r10 uw-80 ut-r">机构名称:</div>
				<input class="uinp" name="branchId" id="branchId" type="hidden" value="${form.branchId}">
				<input class="uinp uinp-no-more" readOnly="readOnly" id="branchName"
					name="branchName" type="text" value="${form.branchName}">

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">订单号:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text" value="${form.orderNo}">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">下单时间:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderTime" id="orderTime" type="text" value="${form.orderTime}">
				</div>



			</div>
			<div class="ub umar-t8">

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">收货人:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text" value="${form.orderNo}">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">单据来源:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text" value="${form.orderNo}">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">线上订单编号:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="onlineCode" id="onlineCode" type="text" value="${form.onlineCode}">
				</div>

			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">联系电话:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="phone" id="phone" type="text" value="${form.phone}">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">配送方式:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text" value="${form.orderNo}">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">单据状态:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderStatus" id="orderStatus" type="text" value="${form.orderStatus}">
				</div>
			</div>


			<div class="ub umar-t8">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">送货人:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text" value="${form.orderNo}">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">送货电话:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="phone" id="phone" type="text" value="${form.phone}">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">付款方式:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text" value="${form.orderNo}">
				</div>
			</div>


			<div class="ub umar-t8">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">收货地址:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="address" id="address" type="text" value="${form.address}">
				</div>


				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">支付方式:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="payType" id="payType" type="text" value="${form.payType}">
				</div>
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">用户留言:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="feedback" id="feedback" type="text" value="${form.feedback}">
				</div>

			</div>


		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridOnlineOrderDetail"></table>
		</div>

	</div>
</body>
</html>