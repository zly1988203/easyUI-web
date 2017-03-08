<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
、<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>存货盘点单详情</title>
  <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/stocktaking/operate/operate.js"></script>
    <style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
<input type='hidden' id="operateStatus" value="${stockFormVo.status}">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
             	<div class="ubtns-item" onclick="toAdd()">新增</div>
                <div class="ubtns-item" onclick="saveOrder()">保存</div>
                <div class="ubtns-item" onclick="selectGoods()">商品选择</div>
               
                <div class="ubtns-item" id="btnCheck" onclick="check()">审核</div>

<!-- 				<div class="ubtns-item" onClick="exportExcel()">导出</div> -->
                <div class="ubtns-item" onclick="importHandel()">导入货号</div>
                 <div class="ubtns-item" onclick="delStockForm()">删单</div>

                <div class="ubtns-item" onclick="back()">关闭</div>
            </div>
        </div>
 <div class="ub umar-t8 uc-black">【盘点号】:<span id="formNo">${stockFormVo.formNo}</span></div>
   <div class="already-examine" id="already-examine"><span>已审核</span></div>

	<form action="" id="searchForm" method="post">
 			<input type="hidden"  name="id" value="${stockFormVo.id}">
 		</form>
        <div class="ub uline umar-t10"></div>
        <div class="ub umar-t10">
               <div class="ub ub-ac uw-300">
	                <div class="umar-r10 uw-70 ut-r">机构名称:</div>
	                <input type="hidden" name="branchId" id="branchId" class="uinp" value="${stockFormVo.branchId }"/>
					<input type="text" name="branchName" id="branchName"class="uinp ub ub-f1" readonly="readonly" value="${stockFormVo.branchName }" />
	                             <c:if test="${stockFormVo.status == 0}">
                        	</c:if>
	           </div>
	            <div class="ub ub-ac uselectws umar-l40">
                    <div class="umar-r10 uw-70 ut-r">盘点批号:</div>
     				<input type="hidden" name=takeStockId id="takeStockId" class="uinp" value="${stockFormVo.takeStockId }"/>
					<input type="text" name="takeStockName" id="takeStockName"class="uinp ub ub-f1" 
					value="${stockFormVo.takeStockName }"
					readonly="readonly"  />
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
               <div class="ub ub-ac" >
                   <div class="umar-r10 uw-70 ut-r">盘点范围:</div>
                    <input class="uinp ub ub-f1" type="hidden" name="scopeId" id="scopeId" value="${stockFormVo.scopeId }"/>
                   <input class="uinp ub ub-f1" type="text" id="scopeName" name="scopeName" value="${stockFormVo.scopeName }" readonly="readonly">
               </div>
               
                <div class="ub ub-ac" >
                   <div class="umar-r10 uw-70 ut-r">类别:</div>
                   <input class="uinp ub ub-f1" type="hidden" name="categoryIds" id="categoryIds" value="${stockFormVo.categoryIds }"/>
                   <input class="uinp ub ub-f1" type="text" id="categoryShows" name="categoryShows" value="${stockFormVo.categoryShows }" readonly="readonly">
               </div>
               
               <div class="ub ub-ac uw-300 umar-l300">
                   <div class="umar-r10 uw-70 ut-r">审核人员:</div>
                   <div class="utxt" id="validUserName">${stockFormVo.validUserName}</div>
               </div>
               <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-60 ut-r">审核时间:</div>
                   <div class="utxt"><fmt:formatDate value="${stockFormVo.validTime}" pattern="yyyy-MM-dd HH:mm"/></div>
               </div>
           </div>
           <div class="ub umar-t8">
               <div class="ub ub-ac uw-300 ">
                   <div class="umar-r10 uw-70 ut-r">备注:</div>
                   <input class="uinp uninput" type="text" id="remark" name="remark" value="${stockFormVo.remark}" >
               </div>
           </div>
           <!--datagrid-edit-->
           <div class="ub ub-f1 datagrid-edit umar-t8">
               <table id="operateGrid" ></table>
           </div>
    </div>

</body>
</html>