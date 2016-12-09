<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>出库单-编辑</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/deliver/DoEdit.js"></script>
    <script src="${ctx}/static/js/views/deliver/deliverExport.js"></script>
    <%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
            	<shiro:hasPermission name="JxcDeliverDO:add">
            		<div class="ubtns-item" onclick="addDeliverForm()">新增</div>
            	</shiro:hasPermission>
            	<shiro:hasPermission name="JxcDeliverDO:add">
                	<div class="ubtns-item" onclick="saveOrder()">保存</div>
                </shiro:hasPermission>
                <shiro:hasPermission name="JxcDeliverDO:audit">
                	<div class="ubtns-item" onclick="check()">审核</div>
                </shiro:hasPermission>
                <div class="ubtns-item" onclick="selectGoods()">商品选择</div>
                <shiro:hasPermission name="JxcDeliverDO:delete">
					<div class="ubtns-item" onclick="delDeliverForm()">删单</div>
			   	</shiro:hasPermission>
                <shiro:hasPermission name="JxcDeliverDO:print">
                    <div class="ubtns-item" onclick="printChoose('DO','/form/deliverForm/')">打印</div>
                </shiro:hasPermission>
                <div class="ubtns-item"  onclick="exportDetail()">导出明细</div>
                <div class="ubtns-item" onclick="toImportproduct(0)">导入货号</div>
            	<div class="ubtns-item" onclick="toImportproduct(1)">导入条码</div>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
            </div>
        </div>
        <div class="ub umar-t8 uc-black">【单号】:<span>${form.formNo}</span></div>
        <div class="ub uline umar-t8"></div>
        <div class="ub">
               <div class="ub ub-ac uw-300">
               	   <input type="hidden" id="formId" value="${form.deliverFormId}">
               	   <input type="hidden" id="formNo" value="${form.formNo}">
                   <div class="umar-r10 uw-70 ut-r">发货机构:</div>
                   <div class="ub">
                       <input type="hidden" id="sourceBranchId" name="sourceBranchId" value="${form.sourceBranchId}"  />
                       <input type="hidden" id="sourceBranchType" name="sourceBranchType" value="${form.sourceBranchType}" />
                       <input class="uinp ub ub-f1" type="text" id="sourceBranchName" name="sourceBranchName" value="${form.sourceBranchName}" readonly="readonly" />
                       <div class="uinp-more"></div>
                   </div>

               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-70 ut-r">制单人员:</div>
                   <div class="utxt">${form.createUserName}</div>
               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-60 ut-r">制单时间:</div>
                   <div class="utxt" id="createTime"><fmt:formatDate value="${form.createTime}" pattern="yyyy-MM-dd HH:mm"/></div>
               </div>
           </div>
           <div class="ub umar-t8">
               <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-70 ut-r">收货机构:</div>
                   <div class="ub">
                       <input type="hidden" id="targetBranchId" name="targetBranchId" value="${form.targetBranchId}" />
                       <input class="uinp ub ub-f1" type="text" id="targetBranchName" name="targetBranchName" value="${form.targetBranchName}" onclick="selectBranches()" readonly="readonly" />
                       <div class="uinp-more" onclick="selectBranches()">...</div>
                   </div>
               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-70 ut-r">审核人员:</div>
                   <div class="utxt" id="validUserName">${form.validUserName}</div>
               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-60 ut-r">审核时间:</div>
                   <div class="utxt"><fmt:formatDate value="${form.validTime}" pattern="yyyy-MM-dd HH:mm"/></div>
               </div>
           </div>
           <div class="ub umar-t8">
           	   <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-70 ut-r">要货单号:</div>
                   <div class="ub">
                       <input type="hidden" id="referenceId" name="referenceId" value="${form.referenceId}" />
                       <input class="uinp ub ub-f1" type="text" id="referenceNo" name="referenceNo" onclick="selectDeliver()" value="${form.referenceNo}" readonly="readonly"/>
                       <input type="hidden" id="oldReferenceNo" name="oldReferenceNo" value="${form.referenceNo}" />
                       <div class="uinp-more" onclick="selectDeliver()">...</div>
                   </div>

               </div>
               <div class="ub ub-ac uw-300 umar-l20">
                   <div class="umar-r10 uw-70 ut-r">备注:</div>
                   <input class="uinp" type="text" id="remark" name="remark" value="${form.remark}" >
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