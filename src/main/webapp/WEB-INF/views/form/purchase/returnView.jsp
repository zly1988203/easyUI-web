<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>收货单-修改</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/purchase/returnView.js"></script>
    <script src="${ctx}/static/js/views/purchase/purchaseExport.js"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
            	<input type="hidden" id="close" value="${close}"/>
            	<shiro:hasPermission name="JxcPurchaseRefund:add">
            	<div class="ubtns-item" id="addButton" onclick="returnAdd()">新增</div>
            	</shiro:hasPermission>
            	<shiro:hasPermission name="JxcPurchaseRefund:print">
                <div class="ubtns-item" onclick="printDesign()">打印</div>
                </shiro:hasPermission>
                <div class="ubtns-item" onclick="exportData('PR');">导出明细</div>
                <div class="ubtns-item" id="toBackByJSButton"  onclick="toBackByJS()">返回</div>
            </div>
        </div>
        <div class="ub umar-t8 uc-black">【单号】：<span >${form.formNo}</span></div>
        <div class="ub uline umar-t8"></div>
        <input type="hidden" id="formId" value="${form.id}">
        <input type="hidden" id="formNo" value="${form.formNo}">
        <div class="ub umar-t8">
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">供应商:</div>
                <div class="utxt" >${form.supplierName}</div>
            </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">付款期限:</div>
                <div class="utxt"><fmt:formatDate value="${form.paymentTime}" pattern="yyyy-MM-dd"/></div>
            </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">制单人员:</div>
                <div class="utxt">${form.updateUserName}</div>
            </div>
            <div class="ub ub-ac">
                <div class="umar-r10 uw-60 ut-r">制单日期:</div>
                <div class="utxt"><fmt:formatDate value="${form.updateTime}" pattern="yyyy-MM-dd"/></div>
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
                <div class="umar-r10 uw-60 ut-r">审核日期:</div>
                <div class="utxt"><fmt:formatDate value="${form.validTime}" pattern="yyyy-MM-dd"/></div>
            </div>
        </div>
        <div class="ub umar-t8">
        	<div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">原单类型:</div>
               <div class="utxt" id="refFormNoType"></div>
            </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">原单号:</div>
                <div class="utxt" id="refFormNo">${form.refFormNo}</div>
            </div>
        </div>
        <div class="ub umar-t8">
        	<div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">备注:</div>
                <div class="utxt">${form.remark}</div>
            </div>
        </div>
        <div class="already-examine" id="already-examine"><span>${status}</span></div>
        
        <div class="ub ub-f1 datagrid-edit umar-t8">
            <table id="gridEditOrder" ></table>
        </div>
    </div>

</body>
</html>