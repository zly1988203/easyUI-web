
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
					<div class="ubtns-item" onclick="query()">查询</div>
					<shiro:hasPermission name="JxcPurchaseOrder:add">
						<div class="ubtns-item" onclick="orderAdd()">新增</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcPurchaseOrder:delete">
						<div class="ubtns-item" onclick="orderDelete()">删除</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcPurchaseOrder:print">
						<div class="ubtns-item" onclick="printPreview()">打印</div>
					</shiro:hasPermission>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">退出</div>
				</div>

				<!-- 引入时间选择控件 -->
				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>

			<div class="ub umar-t8">

				<div class="umar-r10 uw-80 ut-r">机构名称:</div>
				<input class="uinp" name="branchId" id="branchId" type="hidden">
				<input class="uinp" id="oldBranchName" name="oldBranchName"
					type="hidden">
				<input class="uinp uinp-no-more" readOnly="readOnly" id="branchName"
					name="branchName" type="text" maxlength="50">

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">订单号:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">下单时间:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text">
				</div>



			</div>
			<div class="ub umar-t8">

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">收货人:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">单据来源:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">线上订单编号:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text">
				</div>

			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">联系电话:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">配送方式:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">单据状态:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text">
				</div>
			</div>


			<div class="ub umar-t8">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">送货人:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">送货电话:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text">
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">付款方式:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text">
				</div>
			</div>


			<div class="ub umar-t8">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">收货地址:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text">
				</div>


				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">支付方式:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text">
				</div>
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">用户留言:</div>
					<input class="uinp uinp-no-more" readOnly="readOnly" name="orderNo" id="orderNo" type="text">
				</div>

			</div>


		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridOnlineOrderDetail"></table>
		</div>

	</div>
</body>
</html>