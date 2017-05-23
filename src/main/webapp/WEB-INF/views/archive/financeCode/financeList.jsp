<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>机构信息</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
	<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/financeCode/financeList.js?V=2"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-f1 umar-4 upad-4">
		<!--left-->
		<div class="ub ub-ver ubor uw-240" >
			<div class="ub upad-4 ub-f1 uscroll">
				<div class="zTreeDemoBackground left">
					<ul id="treefinances" class="ztree"></ul>
				</div>
			</div>
		</div>
		<!--left end-->

		<div class="ub ub-ver ub-f1 upad-4">
			<div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item" onclick="query()">查询</div>
					<div class="ubtns-item" onclick="addFinance()">新增</div>
					<div class="ubtns-item" onclick="delFinance()">删除</div>
					<div class="ubtns-item" onclick="exportList()">导出</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>
			</div>
			<form action="" id="formFinanceList" method="post">
				<div class="ub umar-t4">
					<div class="ub ub-ac umar-r10">
						<div class="umar-r10 ut-r">关键字:</div>
						<input class="uinp uw-400" type="text" name="codeOrName"
							id="codeOrName" placeholder="输入编号、名称进行查询">
					</div>
				</div>
			</form>
			<div class="ub umar-t10 ub-f1">
				<table id="gridfinanceList"></table>
			</div>
		</div>


	</div>
</body>
</html>