<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>配送出库</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%-- <script  src="${ctx}/static/js/fun/publicComponent.js"></script> --%>
<script src="${ctx}/static/js/views/deliver/DoList.js?V=${versionNo}"></script>


</head>
<body class="ub uw uh ufs-14 uc-black">

	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
				<div class="ubtns">
					<shiro:hasPermission name="JxcDeliverDO:search">
						<div class="ubtns-item" onclick="queryForm()">查询</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcDeliverDO:add">
						<div class="ubtns-item" id="btnAdd" onclick="addDeliverForm()">新增</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcDeliverDO:delete">
						<div class="ubtns-item" id="btnDel" onclick="delDeliverForm()">删单</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcDeliverDO:setting">
						<div class="ubtns-item-disabled">设置</div>
					</shiro:hasPermission>
					<div id="updatePermission" class="none">
						<shiro:hasPermission name="JxcDeliverDO:update">修改</shiro:hasPermission>
					</div>
					<div class="ubtns-item" id="set" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">退出</div>
				</div>
				<div class="ub ub-ac umar-l20">
					<!-- 引入时间选择控件 -->
					<%@ include file="/WEB-INF/views/component/dateSelectHour.jsp"%>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r10" id="sourceBranch">

					<div class="umar-r10 uw-72 ut-r">发货机构:</div>
					<input type="hidden" id="sourceBranchId" name="sourceBranchId" />
					<%--<input type="hidden" id="sourceBranchName" name="sourceBranchName"/>--%>
					<input class="uinp ub ub-f1" type="text" id="sourceBranchName"
						name="sourceBranchName" />
					<div class="uinp-more">...</div>

				</div>

				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">单据编号:</div>
					<input type="hidden" id="formType" name="formType" value="DA" /> <input
						type="hidden" id="deliverType" name="deliverType" value="DO" /> <input
						class="uinp ub ub-f1" type="text" id="formNo" name="formNo">
				</div>
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r10" id="targetBranch">

					<div class="umar-r10 uw-72 ut-r">收货机构:</div>
					<input type="hidden" id="targetBranchId" name="targetBranchId" />
					<%--<input type="hidden" id="targetBranchType" name="targetBranchType"/>--%>
					<input class="uinp ub ub-f1" type="text" id="targetBranchName"
						name="targetBranchName" />
					<div class="uinp-more">...</div>

				</div>

				<div class="ub ub-ac uw-300" id="operateorSelect">
					<div class="umar-r10 uw-70 ut-r">制单人员:</div>
					<input class="uinp ub ub-f1" type="hidden" id="operateUserId"
					name="operateUserId"  />
					<input class="uinp ub ub-f1" type="text" id="operateUserName"
						name="operateUserName"/>
					<div class="uinp-more">...</div>
				</div>

				<div class='ub ub-ac umar-l20 uw-300 uhide' id='auditStatus'>
					<div class='umar-r10 uw-70 ut-r'>审核状态:</div>
					<div class='ub ub-ac umar-r10'>
						<input class='ub' type='radio' id='deliverAuditStatus0'
							name='deliverAuditStatus' value='0' checked='checked'
							onclick='queryForm()' /><label for='deliverAuditStatus0'>未审核</label>
					</div>
					<div class='ub ub-ac umar-r10'>
						<input class='ub' type='radio' id='deliverAuditStatus1'
							name='deliverAuditStatus' value='1' onclick='queryForm()' /><label
							for='deliverAuditStatus1'>已审核</label>
					</div>
					<div class='ub ub-ac umar-r10'>
						<input class='ub' type='radio' id='deliverAuditStatus2'
							name='deliverAuditStatus' value='' onclick='queryForm()' /><label
							for='deliverAuditStatus2'>全部</label>
					</div>
				</div>

			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac uw-596" id="remarkDiv">
					<div class="umar-r10 uw-70 ut-r">备注:</div>
					<input class="uinp ub ub-f1" type="text" id="remark" name="remark">
				</div>

				<div class='umar-l20 uhide' id='checkDiv'>
					<input type='checkbox' id='checkboxTime' name='checkboxTime' /><span
						class='umar-l15  umar-r10'>结束时间:</span><input class='Wdate'
						style='width: 212px' readonly='readonly' name='tempEndTime'
						id='popupSearchDateTime' onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'})" />
				</div>

				<div class='ub ub-ac umar-l20 uw-300 uhide' id='orderStatus'>
					<div class='umar-r10 uw-68 ut-r'>单据状态:</div>
					<div class='ub ub-ac umar-r10'>
						<input class='ub' type='radio' id='deliverOrderStatus'
							name='deliverStatus' value='' checked='checked'
							onclick='queryForm()' /><label for='deliverOrderStatus'>全部</label>
					</div>
					<div class='ub ub-ac umar-r10'>
						<input class='ub' type='radio' id='deliverOrderStatus0'
							name='deliverStatus' value='0' onclick='queryForm()' /><label
							for='deliverOrderStatus0'>待处理</label>
					</div>
					<div class='ub ub-ac umar-r10'>
						<input class='ub' type='radio' id='deliverOrderStatus1'
							name='deliverStatus' value='1' onclick='queryForm()' /><label
							for='deliverOrderStatus1'>部分收货</label>
					</div>
                    <div class='ub ub-ac umar-r10'>
                    <input class='ub' type='radio' id='deliverOrderStatus2'
                    name='deliverStatus' value='2' onclick='queryForm()' /><label
                    for='deliverOrderStatus2'>全部收货</label>
                    </div>
					<div class='ub ub-ac umar-r10'>
						<input class='ub' type='radio' id='deliverOrderStatus3'
							name='deliverStatus' value='4' onclick='queryForm()' /><label
							for='deliverOrderStatus3'>已拒收</label>
					</div>
				</div>

			</div>
		</form>
		<div class="ub ub-f1  umar-t8 umar-b8">
			<div id="tabs" class="easyui-tabs"
				data-options="fit:true,border:false,tabWidth:120,tabHeight:25"
				style="">
				<div title="待处理要货单" id="pending" style="padding: 5px; height: auto;">
					<table id="deliverFormList"></table>
				</div>
				<div title="配送出库单" id="processed" style="height: auto;">
					<table id="processedFormList"></table>
				</div>
			</div>
		</div>

	</div>
</body>
</html>
