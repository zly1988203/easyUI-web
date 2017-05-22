
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>一卡通交易查询</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/finance/iccard/iccardTradingList.js?v=5"></script>
<%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm">
			<div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item" onclick="query()">查询</div>
					<div class="ubtns-item" onclick="orderAdd()">重置</div>
					<div class="ubtns-item" onclick="orderDelete()">导出</div>
					<shiro:hasPermission name="JxcPurchaseOrder:print">
						<div class="ubtns-item" onclick="printPreview()">打印</div>
					</shiro:hasPermission>
					<div class="ubtns-item" onclick="gFunRefresh()">设置</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>

				<!-- 引入时间选择控件 -->
				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">机构:</div>
					<input class="uinp" name="formNo" id="formNo" type="text">
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">收银员:</div>
					<input class="uinp" name="supplierId" id="supplierId" type="hidden">
					<input class="uinp" id="supplierName" name="supplierName"
						type="text" maxlength="50">
					<div class="uinp-more" onclick="selectSupplier()">...</div>
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">业务类型:</div>
					<input class="uinp" name="operateUserId" id="operateUserId"
						type="hidden"> <input class="uinp" id="operateUserName"
						name="operateUserName" type="text" maxlength="50">

				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">单号:</div>
					<input class="uinp" name="formNo" id="formNo" type="text">
				</div>

				、
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">一卡通类型:</div>
					<input class="uinp" name="formNo" id="formNo" type="text">
				</div>

				<div class="ub ub-ac umar-l20">
					<div class="umar-r10 uw-60 ut-r">查询类型:</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="queryType"
							id="queryType1" value="0" /><label for="queryType1">一卡通交易明细
						</label>
					</div>

					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="queryType"
							id="queryType2" value="2" /><label for="queryType2">一卡通交易汇总
						</label>
					</div>

				</div>
			</div>

		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridCardTrading"></table>

		</div>
	</div>
</body>
</html>