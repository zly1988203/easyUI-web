<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>

<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>交班历史</title>
	<%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script  src="${ctx}/static/js/views/pos/shiftHistoryList.js"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	                <div class="ubtns-item" onclick="queryForm()">查询</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
			</div>
	           <div class="ub umar-t8">
	                <div class="ub ub-ac">
	                    <div class="umar-r10 uw-80 ut-r">用户姓名:</div>
	                    <input class="uinp" type="text" id="userName" name="userName"  placeholder="用户姓名">
	                </div>
	                 <div class="ub ub-ac">
	                    <div class="umar-r10 uw-80 ut-r">用户编码:</div>
	                    <input class="uinp" type="text" id="userCode" name="userCode"  placeholder="用户编码:">
	                </div>
	           </div>
       	</form>
        <div class="ub ub-f1  umar-t8 umar-b8">
			<table id="registerList"></table>
		</div>
    </div>
</body>
</html>