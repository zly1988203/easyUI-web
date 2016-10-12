<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>用户管理</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/system/userList.js"></script>
    
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
    	<form id="queryForm">
	        <div class="ub ub-ac">
	            <div class="ubtns">
	                <div class="ubtns-item" onclick="query();">查询</div>
	                <div class="ubtns-item" onclick="toAdd();">新增</div>
	                <div class="ubtns-item" onclick="toUpdate();">修改</div>
	                <div class="ubtns-item" onclick="toAdd();">删除</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
	        </div>
	
	        <div class="ub umar-t8">
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">关键字:</div>
	                <input class="uinp" name="nameOrCode" id="nameOrCode" type="text">
	            </div>
                <div class="ub ub-ac uw-300 umar-r40">
                    <div class="umar-r10 uw-70 ut-r">机构:</div>
                   	<input class="uinp" type="hidden" id="branchCode" name="branchCode">
                   	<input class="uinp" type="text" id="branchNameOrCode" name="branchNameOrCode" onblur="clearBranchCode()">
                   	<div class="uinp-more" onclick="searchBranch()">...</div>
                </div>
	        </div>
        </form>
        <div class="ub umar-t8 ub-f1">
            <table id="dg"></table>
        </div>

    </div>
</body>
</html>