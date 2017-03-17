<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>盘点差异处理详情</title>
  <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/stocktaking/diffDispose/diffDispose.js"></script>
    <style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
<input type='hidden' id="disposeStatus" value="${batchVo.status}">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
				<button id="btnSave" class="ubtns-item" onclick="saveDiffDispose()">保存</button>
				<button id="btnCheck" class="ubtns-item"  onclick="auditDiffDispose()">审核</button>
				<button id="btndelete" class="ubtns-item" onclick="deleteDiffDispose()">删单</button>
				<div class="ubtns-item" onclick="printDiffDispose()">打印</div>
				<div class="ubtns-item" onclick="back()">关闭</div>
			</div>
        </div>
    <div class="already-examine" id="already-examine"><span>已审核</span></div>

	<form action="" id="searchForm" method="post">
 			<input type="hidden" id="batchId" name="id" value="${batchVo.id}">
        <div class="ub uline umar-t10"></div>
        <div class="ub umar-t10">
	            <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-70 ut-r">盘点批号:</div>
					<input type="text" name="batchNo" id="batchNo"class="uinp ub ub-f1" 
					value="${batchVo.batchNo }"
					readonly="readonly"  />
                </div>
               <div class="ub ub-ac uw-300">
	                <div class="umar-r10 uw-70 ut-r">机构:</div>
	                <input type="hidden" name="branchId" id="branchId" value="${batchVo.branchId }"/>
					<input type="text" name="branchName" id="branchName"class="uinp ub ub-f1" readonly="readonly" value="${batchVo.branchName }" />
	                             <c:if test="${batchVo.status == 0}">
                        	</c:if>
	           </div>
               <div class="ub ub-ac umar-l10">
                   <div class="umar-r10 uw-70 ut-r">制单人员:</div>
                   <input type="hidden" name="createUserName" id="createUserName" value="${batchVo.createUserName }"/>
                   <div class="utxt">${batchVo.createUserName }</div>
               </div>
               <div class="ub ub-ac umar-l10">
                   <div class="umar-r10 uw-60 ut-r">制单时间:</div>
                   <input type="hidden" name="createTime" id="createTime" value="${batchVo.createTime }"/>
                   <div class="utxt" id="createTime">${batchVo.createTime}</div>
               </div>
           </div>
         <div class="ub umar-t8">
               <div class="ub ub-ac uw-300" >
                   <input type="hidden" id="scope" name="scope" value="${batchVo.scope==1 ?'类别盘点':'全场盘点' }"/>
                   <div class="umar-r10 uw-70 ut-r">盘点范围:</div>
                   <input class="uinp ub ub-f1" type="text" id="scopeName" name="scopeName" value="${batchVo.scope==1 ?'类别盘点':'全场盘点' }" readonly="readonly">
               </div>
               
                <div class="ub ub-ac uw-300" >
                   <div class="umar-r10 uw-70 ut-r">类别:</div>
                   <input type="hidden" id="categoryShowsStr" name="categoryShowsStr" value="${batchVo.categoryShowsStr }"/>
                   <input class="uinp ub ub-f1" type="text" id="categoryShows" name="categoryShows" value="${batchVo.categoryShowsStr }" readonly="readonly">
               </div>
               
               <div class="ub ub-ac  umar-l10">
                   <input type="hidden" id="validUserName" name="validUserName" value="${batchVo.validUserName }"/>
                   <div class="umar-r10 uw-70 ut-r">审核人员:</div>
                   <div class="utxt" id="validUserName">${batchVo.validUserName}</div>
               </div>
               <div class="ub ub-ac  umar-l10">
                   <input type="hidden" id="validTime" name="validTime" value="${batchVo.validTime }"/>
                   <div class="umar-r10 uw-60 ut-r">审核时间:</div>
                   <div class="utxt">${batchVo.validTime}</div>
               </div>
           </div>
           <div class="ub umar-t8">
               <div class="ub ub-ac uw-600">
                   <div class="umar-r10 uw-70 ut-r">备注:</div>
                   <input class="uinp ub ub-f1" type="text" id="remark" name="remark"  value="${batchVo.remark}" maxlength="40">
               </div>
           </div>
           </form>
           <!--datagrid-edit-->
           <div class="ub ub-f1 datagrid-edit umar-t8">
                <input type="hidden" id="sumStocktakingNum"/>
               <table id="operateGrid" ></table>
           </div>
    </div>

</body>
</html>