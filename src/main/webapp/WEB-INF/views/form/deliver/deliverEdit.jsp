<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>要货单-编辑</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/deliver/deliverEdit.js"></script>
    
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
                <div class="ubtns-item" onclick="saveOrder()">保存</div>
                <div class="ubtns-item" onclick="check()">审核</div>
                <div class="ubtns-item" onclick="selectGoods()">商品选择</div>
                <div class="ubtns-item" onclick="toImportproduct(0)">导入货号</div>
            	<div class="ubtns-item" onclick="toImportproduct(1)">导入条码</div>
                <div class="ubtns-item" onclick="back()">返回</div>
            </div>
        </div>
        <div class="ub umar-t8 uc-black">【单号】：<span id="formNo">${form.formNo}</span></div>
        <div class="ub uline umar-t8"></div>
        <input type="hidden" id="formId" value="${form.deliverFormId}">
        <div class="ub umar-t8">
            <div class="ub ub-ac uw-300">
                <div class="umar-r10 uw-60 ut-r">要货机构:</div>
                <div class="ub">
                    <input class="uinp" name="targetBranchId" id="targetBranchId" type="hidden" value="${form.targetBranchId}">
                    <input type="hidden" id="minAmount" name="minAmount" value="${minAmount}"  />
                    <input type="hidden" id="targetBranchType" name="targetBranchType" value="${targetBranchType}"  />
                    <input class="uinp" id="targetBranchName" name="targetBranchName" type="text" readonly="readonly" value="${form.targetBranchName}" />
                    <div class="uinp-more" >...</div>
                </div>
            </div>
            <div class="ub ub-ac uw-300 umar-l20">
                <div class="umar-r10 uw-60 ut-r">业务人员:</div>
                <div class="ub">
                    <input class="uinp ub ub-f1" type="text" id="salesman" name="salesman" value="${salesman}" readonly="readonly">
                    <div class="uinp-more"></div>
                </div>
            </div>
            <div class="ub ub-ac umar-l20">
                <div class="umar-r10 uw-60 ut-r">制单人员:</div>
                <div class="utxt"><%=UserUtil.getCurrentUser().getUserName() %></div>
            </div>
            <div class="ub ub-ac umar-l20">
                <div class="umar-r10 uw-60 ut-r">制单日期:</div>
                <div class="utxt" id="createTime"><fmt:formatDate value="${form.createTime}" pattern="yyyy-MM-dd hh:mm"/></div>
            </div>
        </div>
        <div class="ub umar-t8">
            <div class="ub ub-ac uw-300">
                <div class="umar-r10 uw-60 ut-r">发货机构:</div>
                <div class="ub">
                    <input class="uinp" name="sourceBranchId" id="sourceBranchId" type="hidden" value="${form.sourceBranchId}" />
                    <input class="uinp" id="sourceBranchName" name="sourceBranchName" type="text" readonly="readonly" value="${form.sourceBranchName}" onclick="selectSourceBranch()"/>
                    <div class="uinp-more" onclick="selectSourceBranch()">...</div>
                </div>
            </div>
            <div class="ub ub-ac uw-300 umar-l20">
                <div class="umar-r10 uw-60 ut-r">有效期限:</div>
                <input id="validityTime" class="Wdate" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})" value="<fmt:formatDate value="${form.validityTime}" pattern="yyyy-MM-dd"/>"/>
            </div>
            <div class="ub ub-ac umar-l20">
                <div class="umar-r10 uw-60 ut-r">审核人员:</div>
                <div class="utxt" id="validUserName">${form.validUserName}</div>
            </div>
            <div class="ub ub-ac umar-l20">
                <div class="umar-r10 uw-60 ut-r">审核日期:</div>
                <div class="utxt"><fmt:formatDate value="${form.validTime}" pattern="yyyy-MM-dd"/></div>
            </div>
        </div>
        <div class="ub umar-t8">
        	<div class="ub ub-ac">
                <div class="umar-r10 uw-60 ut-r">备注:</div>
                <input class="uinp" type="text" id="remark" name="remark" value="${form.remark}">
            </div>
        </div>
        <div class="ub ub-f1 datagrid-edit umar-t8">
            <table id="gridEditRequireOrder" ></table>
        </div>
    </div>
	 <!-- 导入弹框 -->
    <div class="uabs uatk">
     	<div class="uatit">导入文件选择</div>
         <div class="uacon">
	         <input class="uinp ub" id="filename" type="text">
	         <label class="ualable">选择文件
	         	<input type="file" class="uafile" value=""  name="xlfile" id="xlf" />
	         </label>
         </div>
         
         <div class="uabtns ">
     	 		<button class="uabtn umar-r30" onclick="importHandel('gridEditOrder')">导入</button>
     	 	<button class="uabtn" onclick="uaclose()" >取消</button>
     	 </div>

     </div>
</body>
</html>