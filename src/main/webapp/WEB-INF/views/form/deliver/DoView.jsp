<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>出库单-查看</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/deliver/DoView.js"></script>
	<script src="${ctx}/static/js/views/deliver/deliverExport.js"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
            	<input type="hidden" id="close" value="${close}"/>
               	<div class="ubtns-item" id="addButton" onclick="addDeliverForm()">新增</div>
            	<div class="ubtns-item" onclick="printDesign('${form.formNo}')">打印</div>
            	<div class="ubtns-item"  onclick="exportData('DO','gridEditRequireOrder')">导出明细</div>
            	<div class="ubtns-item"  onclick="exportData('DO','gridEditRequireOrder','1')">导出货号</div>
                <div class="ubtns-item"  id="toBackByJSButton" onclick="back()">返回</div>
            </div>
        </div>
        <div class="ub umar-t8 uc-black">【单号】：${form.formNo}</div>
        <input type="hidden" id="formNo" value="${form.formNo}">
        <input type="hidden" id="type" value="${type}">
        <div class="ub uline umar-t8"></div>
        <div class="ub">
               <div class="ub ub-ac uw-300">
               	   <input type="hidden" id="formId" value="${form.deliverFormId}">
                   <div class="umar-r10 uw-70 ut-r">发货机构:</div>
                   <input type="hidden" id="sourceBranchId" name="sourceBranchId" value="${form.sourceBranchId}"  />
                   <input class="uinp ub ub-f1" type="text" id="sourceBranchName" name="sourceBranchName" value="${form.sourceBranchName}" readonly="readonly" />
                   <div class="uinp-more">...</div>
               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-70 ut-r">制单人员:</div>
                   <div class="utxt"><%=UserUtil.getCurrentUser().getUserName() %></div>
               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-60 ut-r">制单日期:</div>
                   <div class="utxt" id="createTime"><fmt:formatDate value="${form.createTime}" pattern="yyyy-MM-dd HH:mm"/></div>
               </div>
           </div>
           <div class="ub umar-t8">
               <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-70 ut-r">收货机构:</div>
                   <input type="hidden" id="targetBranchId" name="targetBranchId" />
                   <input class="uinp ub ub-f1" type="text" id="targetBranchName" name="targetBranchName" value="${form.targetBranchName}" readonly="readonly"/>
                   <div class="uinp-more">...</div>
               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-70 ut-r">审核人员:</div>
                   <div class="utxt" id="validUserName">${form.validUserName}</div>
               </div>
               <div class="already-examine" id="already-examine"><span>已审核</span></div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-60 ut-r">审核日期:</div>
                   <div class="utxt"><fmt:formatDate value="${form.validTime}" pattern="yyyy-MM-dd"/></div>
               </div>
           </div>
           <div class="ub umar-t8">
           	   <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-70 ut-r">要货单号:</div>
                   <input type="hidden" id="referenceId" name="referenceId" value="${form.referenceId}" />
                   <input class="uinp ub ub-f1" type="text" id="referenceNo" name="referenceNo" value="${form.referenceNo}" readonly="readonly"/>
                   <div class="uinp-more">...</div>
               </div>
               <div class="ub ub-ac uw-300 umar-l20">
                   <div class="umar-r10 uw-70 ut-r">备注:</div>
                   <input class="uinp" type="text" id="remark" name="remark" value="${form.remark}" readonly="readonly" />
               </div>
               <div class="ub ub-ac uw-300 umar-l20">
                   <div class="umar-r10 uw-70 ut-r">返利:</div>
                   <input class="uinp" type="text" id="addRebateMoney" name="addRebateMoney" value="${form.addRebateMoney}" readonly="readonly" />
               </div>
               <div class="ub ub-ac uw-300 umar-l20">
                   <div class="umar-r10 uw-70 ut-r">折扣:</div>
                   <input class="uinp" type="text" id="rebateMoney" name="rebateMoney" value="${form.rebateMoney}" readonly="readonly" />
               </div>
           </div>
           <!--datagrid-edit-->
           <div class="ub ub-f1 datagrid-edit umar-t8">
               <table id="gridEditRequireOrder" ></table>
           </div>
    </div>
</body>
</html>
