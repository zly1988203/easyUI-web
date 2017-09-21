<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>物流回单明细</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/logistics/DbView.js?V=${versionNo}"></script>
	<%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
                <shiro:hasPermission name="JxcDeliverDbLogistic:exportDetail">
                    <div class="ubtns-item"  onclick="exportListData()">导出明细</div>
                </shiro:hasPermission>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
            </div>
        </div>
        <div class="ub umar-t8 uc-black">【出库回单单号】:${form.formNoDB}</div>
        <div class="already-examine" id="already-examine"><span>已审核</span></div>
        <div class="ub uline umar-t8"></div>
        <div class="ub">
               <div class="ub ub-ac uw-300">
               	   <input type="hidden" id="formId" value="${form.formNoIdDB}">
                   <div class="umar-r10 uw-70 ut-r">发货机构:</div>
                    <div class="ub">
                        <input class="uinp ub ub-f1" type="text" id="sourceBranchName" name="sourceBranchName" value="${form.sourceBranchName}" readonly="readonly" />
                        <div class="uinp-more">...</div>
                    </div>

               </div>

               <div class="ub ub-ac  uw-300 umar-l20">
                    <div class="umar-r10 uw-70 ut-r">要货单号:</div>
                    <div class="ub">
                        <input class="uinp ub " type="text" id="formNoDA" name="formNoDA" value="${form.formNoDA}" readonly="readonly"/>
                    </div>
               </div>
               <div class="ub ub-ac  uw-300 umar-l20">
                    <div class="umar-r10 uw-100 ut-r">回单入库单号:</div>
                    <div class="ub">
                        <input class="uinp ub " type="text" id="formNoDI" name="formNoDI" value="${form.formNoDI}" readonly="readonly"/>
                    </div>
               </div>
           </div>
           <div class="ub umar-t8">
               <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-70 ut-r">收货机构:</div>
                    <div class="ub">
                    <input class="uinp ub ub-f1" type="text" id="targetBranchName" name="targetBranchName" value="${form.targetBranchName}" readonly="readonly"/>
                    <div class="uinp-more">...</div>
                    </div>

               </div>

               <div class="ub ub-ac  uw-300 umar-l20">
                    <div class="umar-r10 uw-70 ut-r">出货单号:</div>
                    <div class="ub">
                        <input class="uinp ub " type="text" id="formNoDO" name="formNoDO" value="${form.formNoDO}" readonly="readonly"/>
                    </div>
               </div>
               <div class="ub ub-ac  uw-300 umar-l50">
                   <div class="umar-r10 uw-70 ut-r">审核时间:</div>
                   <div class="utxt"><fmt:formatDate value="${form.validTime}" pattern="yyyy-MM-dd HH:mm"/></div>
               </div>
           </div>
           <%--datagrid-edit--%>
           <div class="ub ub-f1 datagrid-edit umar-t8">
               <table id="gridEditRequireOrder" ></table>
           </div>
    </div>
</body>
</html>
