
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>线上订单详情</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script
	src="${ctx}/static/js/views/report/online/onlineOrderSearchView.js?V=${versionNo}"></script>
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
					<shiro:hasPermission name="JxcOnlineOrderSearch:print">
						<div class="ubtns-item-disabled">打印</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcOnlineOrderSearch:export">
						<div class="ubtns-item" onclick="exportList()">导出</div>
					</shiro:hasPermission>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>
			</div>
			<div class="ub umar-t8 uc-black">
				【单号】:<span>${po.orderNo}</span>
			</div>
			<div class="ub uline umar-t8"></div>

			<input type="hidden" name="orderId" id="orderId"
				value="${po.orderId }" />

			<div class="ub umar-t8">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">机构名称:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly"
						id="branchName" name="branchName" type="text"
						value="[${po.branchCode}]${po.branchName}">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">订单号:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo"
						id="orderNo" type="text" value="${po.orderNo}">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-100 ut-r">下单时间:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly"
						name="orderTime" id="orderTime" type="text"
						value="${po.onlineCreateTimeStr}">
				</div>



			</div>
			<div class="ub umar-t8">

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">收货人:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo"
						id="orderNo" type="text" value="${po.userName}">
					<input class="uinp uinp-no-more" readOnly="readOnly" name="userName" id="userName" type="text" value="${po.userName}">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">单据来源:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo"
						id="orderNo" type="text" value="${po.orderResourceStr}">
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderResource" id="orderResource" type="text" value="${po.orderResourceStr}">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-100 ut-r">线上订单编号:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly"
						name="onlineCode" id="onlineCode" type="text"
						value="${po.onlineOrderNo}">
				</div>

			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">联系电话:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="phone"
						id="phone" type="text" value="${po.phone}">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">配送方式:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo"
						id="orderNo" type="text" value="${po.pickUpTypeStr}">
					<input class="uinp uinp-no-more" readOnly="readOnly" name="pickUpType" id="pickUpType" type="text" value="${po.pickUpTypeStr}">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-100 ut-r">单据状态:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly"
						name="orderStatus" id="orderStatus" type="text"
						value="${po.orderStatusStr}">
				</div>
			</div>


			<div class="ub umar-t8">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">送货人:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo"
						id="orderNo" type="text" value="">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">送货电话:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="phone"
						id="phone" type="text" value="">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-100 ut-r">付款方式:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo"
						id="orderNo" type="text" value="${po.payWayStr}">
					<input class="uinp uinp-no-more" readOnly="readOnly" name="payWay" id="payWay" type="text" value="${po.payWayStr}">
				</div>
			</div>


			<div class="ub umar-t8">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">收货地址:</div>
					<input class="uinp uinp-no-more uw-484" readOnly="readOnly"
						name="address" id="address" type="text" value="${po.address}">
				</div>


				<div class="ub ub-ac">
					<div class="umar-r10 uw-100 ut-r">支付方式:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="payType"
						id="payType" type="text" value="${po.payTypeStr}">
				</div>
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac uw-880">
					<div class="umar-r10 uw-70 ut-r">用户留言:</div>
					<input class="ub ub-f1 uinp uinp-no-more" readOnly="readOnly"
						name="feedback" id="feedback" type="text" value="${po.remark}">
					<input class="ub ub-f1 uinp uinp-no-more" readOnly="readOnly" name="remark" id="remark" type="text" value="${po.remark}">
				</div>

			</div>


		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridOnlineOrderDetail"></table>
		</div>

	</div>
</body>
</html>