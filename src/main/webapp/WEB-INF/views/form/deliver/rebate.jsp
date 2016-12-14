<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>返利设置页面</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script src="${ctx}/static/js/views/deliver/rebate.js"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
            	<shiro:hasPermission name="JxcDeliverRebateSet:save">
					<div class="ubtns-item" onclick="saveRebateForm()">保存</div>
			   	</shiro:hasPermission>
            	<div class="ubtns-item" onclick="toClose()">关闭</div>
            </div>
        </div>
        <div class="ub ub-ver ub-f1">
           <%--datagrid-edit--%>
           <div class="ub ub-f1 datagrid-edit umar-t8">
               <table id="gridEditRebate" ></table>
           </div>
        </div>
    </div>
</body>
</html>