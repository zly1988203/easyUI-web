<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>存货盘点单详情</title>
  <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/stocktaking/operate/operate.js?V=1.2"></script>
    <style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
<input type='hidden' id="operateStatus" value="${stocktakingFormVo.status}">
<input type='hidden' id="formId" name="id" value="${stocktakingFormVo.id}">
<input type="hidden" name="formNo" id="formNo" value="${stocktakingFormVo.formNo }"/>
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
             	<div class="ubtns-item" onclick="toAdd()">新增</div>
                <div class="ubtns-item" onclick="saveStocktakingForm(2)">保存</div>
                <div class="ubtns-item" onclick="selectGoods()">商品选择</div>
                <div class="ubtns-item" onclick="importHandel()">导入</div>
                 <div class="ubtns-item" onclick="deleteStocktakingForm()">删单</div>
                <div class="ubtns-item" onclick="back()">关闭</div>
            </div>
        </div>
 <div class="ub umar-t8 uc-black">【盘点号】:<span id="formNo">${stocktakingFormVo.formNo}</span></div>
   <div class="already-examine" id="already-examine"><span>已审核</span></div>

	<form action="" id="searchForm" method="post">
 			<input type="hidden"  name="id" value="${stocktakingFormVo.id}">
 		</form>
        <div class="ub uline umar-t10"></div>
        <div class="ub umar-t10">
               <div class="ub ub-ac uw-300">
	                <div class="umar-r10 uw-70 ut-r">机构名称:</div>
	                <input type="hidden" name="branchId" id="branchId" value="${stocktakingFormVo.branchId }"/>
					<input type="text" name="branchName" id="branchName"class="uinp ub ub-f1" readonly="readonly" value="${stocktakingFormVo.branchName }" />
	                <c:if test="${stocktakingFormVo.status == 0}">
                    </c:if>
	           </div>
	            <div class="ub ub-ac umar-l10">
                    <div class="umar-r10 uw-70 ut-r">盘点批号:</div>
                    <input type='hidden' id="batchId" name="batchId" value="${stocktakingFormVo.batchId}">
					<input type="text" name="batchNo" id="batchNo"class="uinp ub ub-f1" value="${stocktakingFormVo.batchNo }" readonly="readonly"  />
                </div>
               <div class="ub ub-ac umar-l10">
                   <div class="umar-r10 uw-70 ut-r">制单人员:</div>
                   <div class="utxt">${stocktakingFormVo.createUserName }</div>
               </div>
               <div class="ub ub-ac umar-l10">
                   <div class="umar-r10 uw-60 ut-r">制单时间:</div>
                   <div class="utxt" id="createTime">${stocktakingFormVo.createTime}</div>
               </div>
           </div>
         <div class="ub umar-t8">
               <div class="ub ub-ac uw-300" >
                   <div class="umar-r10 uw-70 ut-r">盘点范围:</div>
                   <input class="uinp ub ub-f1" type="text" id="scope" name="scope" value="${stocktakingFormVo.scope==1 ?'类别盘点':'全场盘点'}" readonly="readonly">
               </div>
               
                <div class="ub ub-ac umar-l10" >
                   <div class="umar-r10 uw-70 ut-r">类别:</div>
                   <input class="uinp ub ub-f1" type="text" id="categoryShows" name="categoryShows" value="${stocktakingFormVo.categoryShowsStr }" readonly="readonly">
               </div>
               <c:if test="${stocktakingFormVo.status == 1}">
               <div class="ub ub-ac uw-300 umar-l300">
                   <div class="umar-r10 uw-70 ut-r">审核人员:</div>
                   <div class="utxt" id="validUserName">${stocktakingFormVo.validUserName}</div>
               </div>
               <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-60 ut-r">审核时间:</div>
                   <div class="utxt"><fmt:formatDate value="${stocktakingFormVo.validTime}" pattern="yyyy-MM-dd HH:mm"/></div>
               </div>
               </c:if>
           </div>
           <div class="ub umar-t8">
               <div class="ub ub-ac uw-300 ">
                   <div class="umar-r10 uw-70 ut-r">备注:</div>
                   <input class="uinp uninput" type="text" id="remark" name="remark" value="${stocktakingFormVo.remark}" readonly="readonly">
               </div>
           </div>
           <!--datagrid-edit-->
           <div class="ub ub-f1 datagrid-edit umar-t8">
               <table id="operateGrid" ></table>
           </div>
    </div>

</body>
</html>