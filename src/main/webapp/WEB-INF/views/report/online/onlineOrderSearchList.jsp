
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>线上订单查询</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script
	src="${ctx}/static/js/views/report/online/onlineOrderSearchList.js"></script>
<%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm">
			<div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item" onclick="queryOnlineOrder()">查询</div>
					<shiro:hasPermission name="JxcPurchaseOrder:print">
						<div class="ubtns-item" onclick="printPreview()">打印</div>
					</shiro:hasPermission>
					<div class="ubtns-item" onclick="exportData()">导出</div>
					<input type="hidden" id="startCount" name="startCount" /> <input
						type="hidden" id="endCount" name="endCount" />
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>

				<!-- 引入时间选择控件 -->
				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>

			<div class="ub umar-t8">

				<div class="ub ub-ac">
					<div class="umar-r10 uw-80 ut-r">机构名称:</div>
					<input class="uinp" name="branchId" id="branchId" type="hidden">
					<input class="uinp" id="oldBranchName" name="oldBranchName"
						type="hidden"> <input class="uinp" id="branchName"
						name="branchName" type="text" maxlength="50">

					<div class="uinp-more" onclick="selectListBranches()">...</div>
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">订单号:</div>
					<input class="uinp" name="formNo" id="formNo" type="text">
				</div>

				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-90 ut-r">线上订单号:</div>
					<input class="uinp" name="onlineNO" id="onlineNO" type="text">
				</div>

			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac uw-290">
					<div class="umar-r10 uw-80 ut-r">付款方式:</div>
					<!--select-->
					<select class="easyui-combobox uselect" name="payType" id="payType"
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
						<option value="online">在线支付</option>
						<option value="offline">货到付款</option>
					</select>
				</div>

				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-64 ut-r">单据来源:</div>
					<!--select-->
					<select class="easyui-combobox uselect" name="sourceType"
						id="sourceType" data-options="editable:false">
						<option value="" selected="selected">全部</option>
						<option value="jd">京东到家</option>
						<option value="okdeer">友门鹿商城</option>
					</select>
				</div>
			</div>

			<div class="ub umar-t8">

				<div class="ub ub-ac">
					<div class="umar-r10 uw-80 ut-r">联系电话:</div>
					<input class="uinp" name="formNo" id="formNo" type="text">
				</div>

				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">配送方式:</div>
					<!--select-->
					<select class="easyui-combobox uselect" name="payType" id="payType"
						data-options="editable:false">
						<option value="" selected="selected">全部</option>
						<option value="zt">到店自提</option>
						<option value="sh">送货上门</option>
					</select>
				</div>

				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">订单状态:</div>
					<!--select-->
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="orderStatus"
							id="status0" value="0" checked="checked" /><label for="status0">全部
						</label>
					</div>

					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="orderStatus"
							id="status1" value="1" /><label for="status1">待发货 </label>
					</div>

					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="orderStatus"
							id="status2" value="2" /><label for="status2">待配送</label>
					</div>

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
							id="status6" value="6" /><label for="status6">已取消 </label>
					</div>

					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="orderStatus"
							id="status7" value="7" /><label for="status7">已完成 </label>
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