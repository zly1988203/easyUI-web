<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>采购订单-查看</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/purchase/orderView.js"></script>
	<script src="${ctx}/static/js/views/purchase/purchaseExport.js"></script>
    <%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
    	<input type="hidden" id="close" value="${close}"/>
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
            <shiro:hasPermission name="JxcPurchaseOrder:add">
            	<div class="ubtns-item" id="addButton" onclick="orderAdd()" >新增</div>
            </shiro:hasPermission>
            <shiro:hasPermission name="JxcPurchaseOrder:terminate">
            	<div class="ubtns-item" onclick="stop()">终止</div>
            </shiro:hasPermission>
            <shiro:hasPermission name="JxcPurchaseOrder:print">
            	<div class="ubtns-item" onclick="printChoose('PA','/form/purchase/')">打印</div>
            </shiro:hasPermission>
            	<div class="ubtns-item" onclick="exportData('PA');">导出明细</div>
                <div class="ubtns-item" id="toBackByJSButton" onclick="toClose()">关闭</div>
            </div>
        </div>
        <div class="ub umar-t8 uc-black">【单号】:<span >${form.formNo}</span></div>
        <div class="ub uline umar-t8"></div>
        <input type="hidden" id="formId" value="${form.id}">
        <input type="hidden" id="formNo" value="${form.formNo}">
        <div class="ub umar-t8">
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">供应商:</div>
                <div class="utxt" >${form.supplierName}</div>
            </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">交货期限:</div>
                <div class="utxt" ><fmt:formatDate value="${form.deliverTime}" pattern="yyyy-MM-dd"/></div>
            </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">制单人员:</div>
                <div class="utxt">${form.updateUserName}</div>
            </div>
            <div class="ub ub-ac">
                <div class="umar-r10 uw-60 ut-r">制单时间:</div>
                <div class="utxt" id="createDate"><fmt:formatDate value="${form.updateTime}" pattern="yyyy-MM-dd HH:mm"/></div>
            </div>
        </div>
        <div class="ub umar-t8">
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">收货机构:</div>
                <div class="utxt">${form.branchName}</div>
            </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">采购员:</div>
                <div class="utxt">${form.salesmanName}</div>
            </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">审核人员:</div>
                <div class="utxt">${form.validUserName}</div>
            </div>
            <div class="ub ub-ac">
                <div class="umar-r10 uw-60 ut-r">审核时间:</div>
                <div class="utxt"><fmt:formatDate value="${form.validTime}" pattern="yyyy-MM-dd HH:mm"/></div>
            </div>
        </div>
        <div class="already-examine" id="already-examine"><span>${status}</span></div>
        
        <div class="ub ub-f1 datagrid-edit umar-t8">
            <table id="gridEditOrder" ></table>
        </div>
    </div>
</body>
</html>