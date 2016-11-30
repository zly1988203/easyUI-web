<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>库存调整-编辑</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/stockAdjust/stockEdit.js"></script>
	<style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
                <div class="ubtns-item" onclick="saveOrder()">保存</div>
                <div class="ubtns-item" onclick="check()">审核</div>
				<div class="ubtns-item" onClick="exportExcel()">导出</div>
                <div class="ubtns-item" onclick="importHandel(0)">导入货号</div>
                <div class="ubtns-item" onclick="importHandel(1)">导入条码</div>
                 <div class="ubtns-item" onclick="delStockForm()">删单</div>
                <div class="ubtns-item" onclick="selectGoods()">商品选择</div>
                <div class="ubtns-item" onclick="back()">关闭</div>
            </div>
        </div>
 <div class="ub umar-t8 uc-black">【单号】:<span id="formNo">${stockFormVo.formNo}</span></div>

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
	            <div class="ub ub-ac uselectws umar-l40">
                    <div class="umar-r10 uw-70 ut-r">调整原因:</div>
                       <!--select-->
				        <select class="easyui-combobox uselect" name="reason" id="reason" data-options="editable:false" >
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
				        <select class="easyui-combobox uselect" name="io" id="io" data-options="editable:false,onChange:selectTion" >
								<option value="0" <c:if test="${stockFormVo.io ==0}">selected='selected'</c:if>>入库</option> 
								<option value="1" <c:if test="${stockFormVo.io ==1}">selected='selected'</c:if>>出库</option>
				        </select>
				         <input type="hidden" name="stockcl" id="stockcl" class="uinp" />
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
               <table id="gridEditRequireOrder" ></table>
           </div>
    </div>
     <!-- 导入弹框 -->
   <!-- <div class="uabs uatk">

     	<div class="uatit">导入文件选择</div>
         <div class="uacon"><input class="uinp ub" id="filename" type="text"><label class="ualable">选择文件<input type="file" class="uafile" value=""  name="xlfile" id="xlf" /></label></div>
         
         <div class="uabtns ">
     	 		<button class="uabtn umar-r30" onclick="importHandel('gridEditOrder')">导入</button>
     	 	<button class="uabtn" onclick="uaclose()" >取消</button>
     	 </div>
     </div> -->
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