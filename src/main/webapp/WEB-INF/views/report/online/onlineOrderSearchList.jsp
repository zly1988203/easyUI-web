
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>线上订单查询</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<script
	src="${ctx}/static/js/views/report/online/onlineOrderSearchList.js?V=${versionNo}"></script>
<style>
.datagrid-header .datagrid-cell {
	text-align: center !important;
	font-weight: bold;
}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" method="post">
			<div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item" onclick="queryOnlineOrder()">查询</div>
					<shiro:hasPermission name="JxcOnlineOrderSearch:print">
						<div class="ubtns-item-disabled">打印</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcOnlineOrderSearch:export">
						<div class="ubtns-item" onclick="exportData()">导出</div>
					</shiro:hasPermission>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>

				<div id="updatePermission" class="none">
					<shiro:hasPermission name="JxcUserManage:update">修改</shiro:hasPermission>
				</div>

				<!-- 引入时间选择控件 -->
				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>

			<div class="ub umar-t8">

				<div class="ub ub-ac">
					<div class="umar-r10 uw-80 ut-r">机构名称:</div>
					<input type="hidden" id="startCount" name="startCount"> <input
						type="hidden" id="endCount" name="endCount"> <input
						type="hidden" name="branchCompleCode" id="branchCompleCode">
					<input class="uinp" id="branchName" name="branchName" type="text"
						readonly="readonly" onclick="selectListBranches()">

					<div class="uinp-more" onclick="selectListBranches()">...</div>
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-80 ut-r">订单号:</div>
					<input class="uinp" name="orderNo" id="orderNo" type="text">
				</div>

				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-96 ut-r">线上订单号:</div>
					<input class="uinp" name="onlineOrderNo" id="onlineOrderNo"
						type="text">
				</div>

			</div>

			<div class="ub umar-t8">

				<div class="ub ub-ac uw-310">
					<div class="umar-r10 uw-80 ut-r">订单类型:</div>
					<!--select-->
					<select class="easyui-combobox uselect" name="saleType"
						id="saleType" data-options="editable:false">
						<option value="" selected="selected">全部</option>
						<option value="A">销售</option>
						<option value="B">退货</option>
					</select>
				</div>


				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-60 ut-r">付款方式:</div>
					<!--select-->
					<select class="easyui-combobox uselect" name="payWay" id="payWay"
						data-options="editable:false">
						<option value="" selected="selected">全部</option>
						<option value="RMB">现金</option>
						<option value="ZFB">支付宝</option>
						<option value="WZF">微支付</option>
						<option value="YQB">云钱包</option>
						<option value="DXR">店小二</option>
					</select>
				</div>

				<div class="ub ub-ac uw-310">
					<div class="umar-r10 uw-70 ut-r">支付方式:</div>
					<!--select-->
					<select class="easyui-combobox uselect" name="payType" id="payType"
						data-options="editable:false">
						<option value="" selected="selected">全部</option>
						<option value="0">在线支付</option>
						<option value="1">货到付款</option>
					</select>
				</div>


			</div>

			<div class="ub umar-t8">

				<div class="ub ub-ac uw-300">
				<div class="umar-r10 uw-80 ut-r">单据来源:</div>
				<!--select-->
				<select class="easyui-combobox uselect" name="orderResource"
				id="orderResource" data-options="editable:false">
				<option value="" selected="selected">全部</option>
				<option value="0">友门鹿商城</option>
				<option value="1">京东到家</option>
				</select>
				</div>


				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">联系电话:</div>
					<input class="uinp" name="phone" id="phone" type="text">
				</div>

				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-80 ut-r">配送方式:</div>
					<!--select-->
					<select class="easyui-combobox uselect" name="pickUpType"
						id="pickUpType" data-options="editable:false">
						<option value="" selected="selected">全部</option>
						<option value="0">送货上门</option>
						<option value="1">到店自提</option>
					</select>
				</div>


			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-80 ut-r">订单状态:</div>
					<!-- 订单状态  1：待发货、2：待配送、3：已发货、4：待退货、5：同意退货、6：拒绝退货、8：已取消、9：已完成-->
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="orderStatus"
							id="status0" value="" checked="checked" /><label for="status0">全部</label>
					</div>

					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="orderStatus"
							id="status1" value="1" /><label for="status1">待发货 </label>
					</div>

					<!-- <div class="ub ub-ac umar-r10">
	<input class="radioItem" type="radio" name="orderStatus"
	id="status2" value="2" /><label for="status2">待配送</label>
	</div> -->

					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="orderStatus"
							id="status3" value="3" /><label for="status3">已发货 </label>
					</div>

					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="orderStatus"
							id="status4" value="4" /><label for="status4">待退货 </label>
					</div>

					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="orderStatus"
							id="status5" value="5" /><label for="status5">同意退货 </label>
					</div>

					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="orderStatus"
							id="status6" value="6" /><label for="status6">拒绝退货 </label>
					</div>

					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="orderStatus"
							id="status8" value="8" /><label for="status8">已取消 </label>
					</div>

					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="orderStatus"
							id="status9" value="9" /><label for="status9">已完成 </label>
					</div>



				</div>

			</div>

		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridOnlineOrder"></table>
		</div>

	</div>
</body>
</html>