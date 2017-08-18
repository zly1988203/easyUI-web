
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>采购订单</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/purchase/orderList.js"></script>
<%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm">
			<div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item" onclick="queryRecord()">查询</div>

					<div class="ubtns-item" onclick="exprotData()">导出</div>

					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>

				<!-- 引入时间选择控件 -->
				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">奖品名称:</div>
					<input class="uinp" name="formNo" id="formNo" type="text">
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">会员号:</div>
                    <input class="uinp" name="formNo" id="formNo" type="text">
				</div>

			</div>
			<div class="ub umar-t8">

				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">活动机构:</div>
					<input class="uinp" name="formNo" id="formNo" type="text">
				</div>

                <div class="ub ub-ac umar-r40">
                <div class="umar-r10 uw-70 ut-r">活动类型:</div>
                <select class="uselect easyui-combobox" name="activityType"
                data-options="editable:false">
                <option value="">全部</option>
                <option value="1">抽奖</option>
                </select>

                </div>
			</div>

		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridOrders"></table>
		</div>

	</div>
</body>
</html>