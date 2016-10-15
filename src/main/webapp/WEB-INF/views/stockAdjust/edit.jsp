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
                <div class="ubtns-item" onclick="importproductAll()">导入</div>
                <div class="ubtns-item" onclick="selectGoods()">商品选择</div>
                <div class="ubtns-item" onclick="toBack()">返回</div>
            </div>
        </div>
 <div class="ub umar-t8 uc-black">【单号】：<span id="formNo">${stockFormVo.formNo}</span></div>
        <input type="hidden" id="formId" name="formId" value="${stockFormVo.id}">  
        <input type="hidden" id="formNo" value="${stockFormVo.formNo}">
        <div class="ub uline umar-t10"></div>
        <div class="ub umar-t10">
               <div class="ub ub-ac uw-300">
	                <div class="umar-r10 uw-70 ut-r">机构名称:</div>
	                <input type="hidden" name="branchId" id="branchId" class="uinp" value="${stockFormVo.branchId }"/>
			 
					<input type="text" name="branchName" id="branchName"class="uinp ub ub-f1" readonly="readonly" value="${stockFormVo.branchName }" />
					<div class="uinp-more" onclick="searchBranch()">...</div>
	           </div>
	            <div class="ub ub-ac uselectws umar-l40">
                    <div class="umar-r10 uw-70 ut-r">调整原因:</div>
                       <!--select-->
				        <select class="easyui-combobox uselect" name="reason" id="reason" data-options="editable:false">
								<option value="">全部</option> 
								<option value="">[01]其他</option> 
								<option value="">[02]领用</option> 
								<option value="">[03]报损</option> 
								<option value="">[04]丢失</option> 
								<option value="">[05]赠送</option>
								<option value="">[06]借用</option>
								<option value="">[07]退赠品</option>
				        </select>
				        <input type="hidden" name="reason" id="reason" class="uinp" />
                </div>
               <div class="ub ub-ac umar-l10">
                   <div class="umar-r10 uw-70 ut-r">制单人员:</div>
                   <div class="utxt">${stockFormVo.createUserName }</div>
               </div>
               <div class="ub ub-ac umar-l10">
                   <div class="umar-r10 uw-60 ut-r">制单日期:</div>
                   <div class="utxt" id="createTime"><fmt:formatDate value="${stockFormVo.createTime}" pattern="yyyy-MM-dd"/></div>
               </div>
           </div>
         <div class="ub umar-t8">
               <div class="ub ub-ac uselectws">
                    <div class="umar-r10 uw-70 ut-r">出/入库:</div>
                       <!--select-->
				        <select class="easyui-combobox uselect" name="io" id="io" data-options="editable:false" >
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
                   <div class="umar-r10 uw-60 ut-r">审核日期:</div>
                   <div class="utxt">${stockFormVo.validTime}</div>
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
    <div class="uabs uatk">

     	<div class="uatit">导入文件选择</div>
         <div class="uacon"><input class="uinp ub" id="filename" type="text"><label class="ualable">选择文件<input type="file" class="uafile" value=""  name="xlfile" id="xlf" /></label></div>
         
         <div class="uabtns ">
     	 		<button class="uabtn umar-r30" onclick="importHandel('gridEditOrder')">导入</button>
     	 	<button class="uabtn" onclick="uaclose()" >取消</button>
     	 </div>
     </div>
</body>
</html>