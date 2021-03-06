<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>物流采购订单明细</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/logistics/PaView.js?V=${versionNo}"></script>
    <%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
    	<input type="hidden" id="close" value="${close}"/>
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
                <shiro:hasPermission name="JxcPurchasePaLogis:exportDetail">
                    <div class="ubtns-item" onclick="exportListData()">导出明细</div>
                </shiro:hasPermission>
                <div class="ubtns-item" id="toBackByJSButton" onclick="toClose()">关闭</div>
            </div>
        </div>
        <div class="ub umar-t8 uc-black">【单号】:<span >${form.formNo}</span></div>
        <div class="ub uline umar-t8"></div>
        <input type="hidden" id="formId" value="${form.id}">
        <input type="hidden" id="formNo" value="${form.formNo}">
        <input type="hidden" id="branchId" value="${form.branchId}">
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
        <div class="ub umar-t8">
               <div class="ub ub-ac uw-610" style="width: 624px;">
	                    <div class="umar-r10 uw-60 ut-r">备注:</div>
	                    <input class="uinp ub ub-f1" name="remark" id="remark" type="text" onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" oncontextmenu = "value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" maxlength="100" value="${form.remark}" readonly="readonly">
	           </div>
        </div>
        <div class="ub ub-f1 datagrid-edit umar-t8">
            <table id="gridEditOrder" ></table>
        </div>
    </div>
</body>
</html>