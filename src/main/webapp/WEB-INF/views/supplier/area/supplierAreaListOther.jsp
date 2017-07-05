<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>供应商档案列表(机构)</title>
	<%@ include file="/WEB-INF/views/include/header.jsp"%>
	<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
	<script  src="${ctx}/static/js/views/supplier/area/supplierAreaListOther.js?V=${versionNo}"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
<div class="ub ub-f1 umar-4 upad-4">
	<div class="ub ub-ver ub-f1 upad-4">
		<div class="ub ub-ac">
			<div class="ubtns">
			<shiro:hasPermission name="JxcSupplierArea:add">
				<button class="ubtns-item" onclick="addHandel()">新增</button>
			</shiro:hasPermission>
			<shiro:hasPermission name="JxcSupplierArea:delete">
				<button class="ubtns-item" onclick="delHandel()">删除</button>
			</shiro:hasPermission>
				<button class="ubtns-item" onclick="toClose()">退出</button>
			</div>
		</div>
		<form action="" id="formList" method="post">
			<div class="ub umar-t4">
				<div class="ub ub-ac umar-r10">
					<div class="umar-r10  ut-r">关键字:</div>
					<input class="uinp uw-400" type="text"  name="codeOrName" id="codeOrName" placeholder="输入编号、名称进行查询">
				</div>
				<input type="button" class="ubtn  umar-r10" value="查询" onclick="searchHandel()">
			</div>
		</form>
		<div class="ub umar-t10 ub-f1">
			<table id="gridSupplierAreaList" ></table>
		</div>
	</div>
</div>
</body>
</html>
