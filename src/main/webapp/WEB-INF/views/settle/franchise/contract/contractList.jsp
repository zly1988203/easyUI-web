<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>加盟店合同列表</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script  src="${ctx}/static/js/views/settle/franchise/contract/contractList.js?V=${versionNo}"></script>
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
					<!-- 记得加权限  -->
					<div class="ubtns-item" onclick="queryForm()">查询</div>
					<div class="ubtns-item" onclick="addContact()">新增</div>
					<div class="ubtns-item" onclick="endContact()">终止</div>
					<div class="ubtns-item" onclick="delContact()">删除</div>
					<div class="ubtns-item" id="set" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>
				<!-- 引入时间选择控件 -->
				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>
			<div class="ub uline umar-t8"></div>
			<div class="ub umar-t8">
				<div class="ub ub-ac" id="branchSelect">
					<div class="umar-r10 uw-70 ut-r">机构名称:</div>
					<input type="hidden" id="branchId" name="branchId" />
					<input class="uinp ub ub-f1" type="text" id="branchName" maxlength="50" />
					<div class="uinp-more">...</div>
				</div>
				<div class="ub ub-ac umar-l40">
					<div class="umar-r10 uw-70 ut-r">合同编号:</div>
					<input class="uinp ub ub-f1" id="contractNo" name="contractNo" type="text" maxlength="50">
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-70 ut-r">经办人:</div>
					<input class="uinp" type="text" id="operateUserName" name="operateUserName">
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-70 ut-r">合同名称:</div>
					<input class="uinp" type="text" id="contractName" name="contractName">
				</div>
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">审核状态:</div>
					<div class="ub ub-ac umar-r10">
						<label>
							<input class="radioItem" type="radio" name="status" value="0" checked="checked" /><span>未审核</span>
						</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<label>
							<input class="radioItem" type="radio" name="status" value="1" /><span>已审核</span>
						</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<label>
							<input class="radioItem" type="radio" name="status" value="2" /><span>终止</span>
						</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<label>
							<input class="radioItem" type="radio" name="status" value="" /><span>全部</span>
						</label>
					</div>
				</div>
			</div>
		</form>
		<div class="ub ub-f1  umar-t8 umar-b8">
			<table id="contractList"></table>
		</div>
	</div>
</body>
</html>
