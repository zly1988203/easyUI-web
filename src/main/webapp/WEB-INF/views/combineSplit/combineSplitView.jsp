<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>组合拆分单-已审核</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script  src="${ctx}/static/js/views/combineSplit/combineSplitView.js"></script>
	<style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
            	<input type="hidden" id="close" value="${close}"/>
                <div class="ubtns-item" id="toBackByJSButton" onclick="back()">关闭</div>
            </div>
        </div>
	<div class="already-examine" id="already-examine"><span>已审核</span></div>

	<form action="" id="searchForm" method="post">
 			<input type="hidden"  name="id" value="${stockFormVo.id}">
 		</form>
        <div class="ub uline umar-t10"></div>
        <div class="ub umar-t10">
	           <div class="ub umar-t8">
	               <div class="ub ub-ac uw-300 ">
	                   <div class="umar-r10 uw-70 ut-r">商品名称:</div>
	                   <input class="uinp uninput" type="text" id="remark" name="remark" value="${stockFormVo.skuName}" readonly="readonly">
	               </div>
	               <div class="ub ub-ac uw-300 ">
	                   <div class="umar-r10 uw-70 ut-r">单价:</div>
	                   <input class="uinp uninput" type="text" id="remark" name="remark" value="${stockFormVo.salePrice}" readonly="readonly">
	               </div>
	           </div>
               <div class="ub ub-ac umar-l10">
                   <div class="umar-r10 uw-70 ut-r">制单人员:</div>
                   <div class="utxt">${stockFormVo.createUserName }</div>
               </div>
               <div class="ub ub-ac umar-l10">
                   <div class="umar-r10 uw-60 ut-r">制单时间:</div>
                   <div class="utxt" id="createTime"><fmt:formatDate value="${stockFormVo.createTime}" pattern="yyyy-MM-dd HH:mm"/></div>
               </div>
         </div>
         <div class="ub umar-t8">
	           <div class="ub umar-t8">
	               <div class="ub ub-ac uw-300 ">
	                   <div class="umar-r10 uw-70 ut-r">金额:</div>
	                   <input class="uinp uninput" type="text" id="amount" name="amount" value="${stockFormVo.amount}" readonly="readonly">
	               </div>
	               <div class="ub ub-ac uw-300 ">
	                   <div class="umar-r10 uw-70 ut-r">数量:</div>
	                   <input class="uinp uninput" type="text" id="totalNum" name="totalNum" value="${stockFormVo.totalNum}" readonly="readonly">
	               </div>
	           </div>
               <div class="ub ub-ac umar-l10">
                   <div class="umar-r10 uw-70 ut-r">审核人员:</div>
                   <div class="utxt" id="validUserName">${stockFormVo.validUserName}</div>
               </div>
               <div class="ub ub-ac umar-l10">
                   <div class="umar-r10 uw-60 ut-r">审核时间:</div>
                   <div class="utxt">${stockFormVo.validTime}</div>
               </div>
           </div>
        <div class="ub umar-t10">
               <div class="ub ub-ac uw-300">
	                <div class="umar-r10 uw-70 ut-r">机构名称:</div>
	                <input type="hidden" name="branchId" id="branchId" class="uinp" value="${stockFormVo.branchId }"/>
			 		<input type="hidden" id="formId" name="formId" value="${stockFormVo.id}">
					<input type="text" name="branchName" id="branchName"class="uinp ub ub-f1" readonly="readonly" value="${stockFormVo.branchName }" />
					<c:if test="${stockFormVo.status == 0}">
					<div class="uinp-more" onclick="searchBranch()">...</div>
					</c:if>
	           </div>
               <div class="ub ub-ac uw-300 ">
                   <div class="umar-r10 uw-70 ut-r">方式:</div>
                   <input type="hidden" id="formType" name="formType" value="${stockFormVo.formType}" >
                   <input class="uinp uninput" type="text" id="formType_text" name="formType_text" value="${stockFormVo.formType==1?'组合':'拆分'}" readonly="readonly">
               </div>
         </div>
         <div class="ub umar-t10">
               <div class="ub ub-ac uw-300 ">
                   <div class="umar-r10 uw-70 ut-r">备注:</div>
                   <input class="uinp uninput" type="text" id="remark" name="remark" value="${stockFormVo.remark}" readonly="readonly">
               </div>
         </div>
           <!--datagrid-edit-->
           <div class="ub ub-f1 datagrid-edit umar-t8">
               <table id="combineSplitView" ></table>
           </div>
    </div>
</body>
</html>