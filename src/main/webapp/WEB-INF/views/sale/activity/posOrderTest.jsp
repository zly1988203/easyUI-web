<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>采购订单-新增</title>

    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script src="${ctx}/static/js/views/sale/activity/posOrderTest.js"></script>

</head>
<body class="ub ub-ver uw uh ufs-14 uc-black">
<div class="ub ub-ver ub-f1 umar-4  ubor">
    <div class="ub ub-ac upad-4">
        <div class="ubtns">
        <shiro:hasPermission name="JxcPurchaseOrder:add">
            <div class="ubtns-item" onclick="saveItemHandel()">结算</div>
        </shiro:hasPermission>
            <div class="ubtns-item" onclick="selectGoods()">商品选择</div>
        </div>
    </div>
    <form id="formAdd">
        <div class="ub ub-ver ">
            <div class="ub umar-t8">
                <div class="ub ub-ac umar-r80">
                    <div class="umar-r10 uw-60 ut-r">结算机构:</div>
                    <input class="uinp" name="branchId" id="branchId" type="hidden">
                    <input id="branchName" class="uinp easyui-validatebox" data-options="required:true"  type="text" onclick="selectBranch()" >
                    <div class="uinp-more" onclick="selectBranch()">...</div>
                </div>
                <div class="ub ub-ac umar-r80">
                    <div class="umar-r10 uw-60 ut-r">收银员:</div>
                    <input class="uinp" name="salesmanId" id="salesmanId" type="hidden">
                    <input class="uinp" id="operateUserName" type="text" readonly="readonly" onclick="selectOperator()" >
                    <div class="uinp-more" onclick="selectOperator()">...</div>
                </div>
            </div>
        </div>
    </form>
    <div class="ub uw umar-t8 ub-f1">
        <table id="gridEditOrder" ></table>
    </div>
</div>

</body>
</html>