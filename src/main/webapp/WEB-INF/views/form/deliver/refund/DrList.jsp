<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>退货申请</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/deliver/refund/DrList.js?1=1"></script>
<style>
.datagrid-header .datagrid-cell {
	text-align: center !important;
	font-weight: bold;
}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item" onclick="queryForm()">查询</div>
					<shiro:hasPermission name="JxcStockReimburse:add">
						<div class="ubtns-item" onclick="addSaleReturn()">新增</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcStockReimburse:delete">
						<div class="ubtns-item" onclick="deleteSaleReturn()">删除</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcStockReimburse:print">
						<div class="ubtns-item-disabled">打印</div>
					</shiro:hasPermission>
					<div class="ubtns-item" id="set" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>
				<!-- 引入时间选择控件 -->
				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>
			<div class="ub uline umar-t8"></div>
			<div class="ub umar-t8">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">发货机构:</div>
					<input type="hidden" id="createBranchId" name="createBranchId" />
					<input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" maxlength="50" />
					<div class="uinp-more" onclick="selectBranches(1)">...</div>
				</div>
				<div class="ub ub-ac umar-l40">
					<div class="umar-r10 uw-70 ut-r">退货机构:</div>
					<input type="hidden" id="createBranchId01" name="createBranchId01" />
					<input class="uinp ub ub-f1" type="text" id="branchName01" name="branchName01" maxlength="50" />
					<div class="uinp-more" onclick="selectBranches(2)">...</div>
				</div>
				<div class="ub ub-ac umar-l40">
					<div class="umar-r10 uw-70 ut-r">制单人:</div>
					<input class="uinp" name="salesmanId" id="salesmanId" type="hidden">
					<input class="uinp ub ub-f1" id="createUserName" name="createUserName" type="text" maxlength="50">
					<div class="uinp-more" onclick="selectOperator()">...</div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-70 ut-r">单据编号:</div>
					<input class="uinp" type="text" id="formNo" name="formNo">
				</div>
				<!--input-checkbox-->
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">审核状态:</div>
					<div class="ub ub-ac umar-r10">
						<input class="ub radioItem" type="radio" name="status" value="0" id="status_1" checked="checked" /><label for="status_1">未审核</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="ub radioItem" type="radio" name="status" value="1" id="status_2" /><label for="status_2">已审核</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="ub radioItem" type="radio" name="status" value="" id="status_3" /><label for="status_3">全部</label>
					</div>
				</div>
			</div>
		</form>
		<div class="ub ub-f1  umar-t8 umar-b8">
			<table id="saleReturnList"></table>
		</div>
	</div>

</body>
</html>
