<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>库存调整-已审核</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/stockAdjust/stockCheck.js?V=${versionNo}"></script>
	<style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
            	<input type="hidden" id="close" value="${close}"/>
                <div class="ubtns-item" onClick="exportExcel()">导出</div>
                <div class="ubtns-item" id="toBackByJSButton" onclick="back()">关闭</div>
            </div>
        </div>
 <div class="ub umar-t8 uc-black">【单号】:<span id="formNo">${stockFormVo.formNo}</span></div>
  <div class="already-examine" id="already-examine"><span>已审核</span></div>

	<form action="" id="searchForm" method="post">
 			<input type="hidden"  name="id" value="${stockFormVo.id}">
 		</form>
        <div class="ub uline umar-t10"></div>
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
	            <div class="ub ub-ac uselectws umar-l20">
                    <div class="umar-r10 uw-70 ut-r">调整原因:</div>
                       <!--select-->
				        <select class="easyui-combobox uselect" name="reason" id="reason" data-options="editable:false" readonly="readonly" >
				        </select>
				        <input type="hidden" name="reason" id="reasonValue" class="uinp" value="${stockFormVo.reason }" />
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
               <div class="ub ub-ac uselectws">
                    <div class="umar-r10 uw-70 ut-r">出/入库:</div>
                       <!--select-->
				        <select class="easyui-combobox uselect" name="io" id="io" data-options="editable:false,onChange:selectTion" readonly="readonly" >
								<option value="0" <c:if test="${stockFormVo.io ==0}">selected='selected'</c:if>>入库</option> 
								<option value="1" <c:if test="${stockFormVo.io ==1}">selected='selected'</c:if>>出库</option>
				        </select>
				         <input type="hidden" name="stockcl" id="stockcl" class="uinp" />
                </div>
               <div class="ub ub-ac uw-300 umar-l335">
                   <div class="umar-r10 uw-70 ut-r">审核人员:</div>
                   <div class="utxt" id="validUserName">${stockFormVo.validUserName}</div>
               </div>
               <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-60 ut-r">审核时间:</div>
                   <div class="utxt">${stockFormVo.validTime}</div>
               </div>
           </div>
           <div class="ub umar-t8">
               <div class="ub ub-ac uw-300 ">
                   <div class="umar-r10 uw-70 ut-r">备注:</div>
                   <input class="uinp uninput" type="text" id="remark" name="remark" value="${stockFormVo.remark}" readonly="readonly">
               </div>
           </div>
           <!--datagrid-edit-->
           <div class="ub ub-f1 datagrid-edit umar-t8">
               <table id="gridEditRequireOrder" ></table>
           </div>
    </div>

      <script type="text/javascript">
     $('#reason').combobox({
         valueField:'value',
         textField:'label',
         url:'${ctx}/common/dict/ADJUST_REASON',    
         onSelect: function(record){
           
         },
         onLoadSuccess:function(data){
        	 $('#reason').combobox('setValue',$("#reasonValue").val());
         }
     });
     </script>
</body>
</html>