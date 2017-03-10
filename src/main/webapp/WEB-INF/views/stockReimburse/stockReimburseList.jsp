<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>报损单</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%-- <script  src="${ctx}/static/js/fun/publicComponent.js"></script> --%>
<script src="${ctx}/static/js/views/stockReimburse/stockReimburseList.js"></script>
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
						<div class="ubtns-item" onclick="addStockReimburse()">新增</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcStockReimburse:delete">
						<div class="ubtns-item" onclick="deleteStockReimburse()">删除</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcStockReimburse:print">
						<div class="ubtns-item-disabled">打印</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcStockReimburse:setting">
						<div class="ubtns-item-disabled">设置</div>
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
					<div class="umar-r10 uw-70 ut-r">报损机构:</div>
					<input type="hidden" id="createBranchId" name="createBranchId" />
					<input class="uinp ub ub-f1" type="text" id="branchName"
						name="branchName" maxlength="50" />
					<div class="uinp-more" onclick="selectBranches()">...</div>
				</div>
				<div class="ub ub-ac uw-300 umar-l40">
					<div class="umar-r10 uw-70 ut-r">制单人:</div>
					<input class="uinp" name="salesmanId" id="salesmanId" type="hidden">
					<input class="uinp ub ub-f1" id="createUserName"
						name="createUserName" type="text" maxlength="50">
					<div class="uinp-more" onclick="selectOperator()">...</div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-70 ut-r">单号:</div>
					<input class="uinp" type="text" id="formNo" name="formNo">
				</div>
				<!--input-checkbox-->
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">审核状态:</div>
					<div class="ub ub-ac umar-r10">
						<input class="ub radioItem" type="radio" name="status" value="0" checked="checked" /><span>未审核</span>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="ub radioItem" type="radio" name="status" value="1" /><span>已审核</span>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="ub radioItem" type="radio" name="status" value="" /><span>全部</span>
					</div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">备注:</div>
					<input class="uinp" type="text" id="remark" name="remark">
				</div>
			</div>

		</form>
		<div class="ub ub-f1  umar-t8 umar-b8">
			<table id="stockReimburseList"></table>
		</div>
	</div>

</body>
</html>
