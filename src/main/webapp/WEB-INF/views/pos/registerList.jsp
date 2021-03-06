<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>

<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>POS机登记</title>
	<%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script  src="${ctx}/static/js/views/pos/registerList.js?V=${versionNo}"></script>
</head>
<body class=" uw uh ufs-14 upad-8 uc-black box-border">
    <div class="ub uh ub-ver ub-f1">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	                <div class="ubtns-item" onclick="queryForm()">查询</div>
	                <div class="ubtns-item" onclick="regadd()">新增</div>
	                <div class="ubtns-item" onclick="bindPosForm()">解绑</div>
	                <div class="ubtns-item" onClick="delPosForm()">删除</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
			</div>
	           <div class="ub umar-t8">
	                <div class="ub ub-ac" id="regBranch">
	                    <div class="umar-r10 uw-50 ut-r">店铺:</div>
	                    <input class="uinp ub ub-f1" type="hidden" id="regBranchId" name="branchId">
	                    <input class="uinp" type="text" id="branchInfo" name="branchInfo"  placeholder="编号/名称">
	                    <div class="uinp-more">...</div>
	                </div>
	           </div>
       	</form>
        <div class="ub ub-f1  umar-t8 umar-b8">
			<table id="registerList"></table>
		</div>
    </div>
</body>
</html>