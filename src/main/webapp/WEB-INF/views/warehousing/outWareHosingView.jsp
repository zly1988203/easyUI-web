<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>采购订单-查看</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/warehousing/outWareHosingView.js"></script>
    
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
                <div class="ubtns-item">保存</div>
                <div class="ubtns-item">审核</div>
                <div class="ubtns-item">商品选择</div>
                <div class="ubtns-item">扫描</div>
                <div class="ubtns-item">删单</div>
                <div class="ubtns-item">终止</div>
                <div class="ubtns-item">设置</div>
                <div class="ubtns-item">打印</div>
                <div class="ubtns-item">明细菜单</div>
                <div class="ubtns-item" onclick="toBack()">返回</div>
            </div>
        </div>
        <input type="hidden" id="formId" value="${form.id}">
        <div class="ub umar-t8">
	        <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">收货分店:</div>
                <input class="uinp" name="supplierId" id="supplierId" type="hidden">
                <input class="uinp" id="supplierName" type="text" readonly="readonly" value="${form.supplierName}">
                <div class="uinp-more">...</div>
            </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">发货人:</div>
                <input class="uinp" name="salesmanId" id="salesmanId" type="hidden">
                <input class="uinp" id="operateUserName" type="text" readonly="readonly" value="${form.supplierName}">
                <div class="uinp-more">...</div>
            </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">制单人员:</div>
                <<div class="utxt">${form.updateUserName}</div>
            </div>
            <div class="ub ub-ac">
                <div class="umar-r10 uw-60 ut-r">制单日期:</div>
                <div class="utxt" id="createDate"><fmt:formatDate value="${form.updateTime}" pattern="yyyy-MM-dd"/></div>
            </div>
            
        </div>
        <div class="ub umar-t8">
        	<div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">调出仓库:</div>
                <input class="uinp" name="branchId" id="branchId" type="hidden">
                <input class="uinp" id="branchName" type="text" readonly="readonly" value="${form.branchName}" >
                <div class="uinp-more">...</div>
            </div>
            <div class="ub ub-ac umar-r80">
	            <div class="umar-r10 uw-60 ut-r">备注:</div>
	            <input class="uinp" type="text" name="remarkMsg" id="remarkMsg" value="dd" >
	        </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">审核人员:</div>
                <div class="utxt">${form.validUserName}</div>
            </div>
            <div class="ub ub-ac">
                <div class="umar-r10 uw-60 ut-r">审核日期:</div>
                <div class="utxt"><fmt:formatDate value="${form.validTime}" pattern="yyyy-MM-dd"/></div>
            </div>            
        </div>
       <div class="ub umar-t8">
            <div class="ub ub-ac umar-r100">
                <div class="umar-r10 uw-60 ut-r">原单类型:</div>
                <div class="ub ub-ac umar-r10">
                    <input class="ub" type="radio" name="oldType" value="1"/><span>要货申请 </span>
                </div>
                <div class="ub ub-ac umar-r10">
                    <input class="ub" type="radio" name="oldType" value="0" checked="checked"/><span>采购收货 </span>
                </div>
            </div>
            <div class="ub ub-ac umar-l24">
                <div class="umar-r10 uw-60 ut-r">申请单号:</div>
                <input class="uinp" name="applyOrderId" id="applyOrderId" type="hidden">
                <input class="uinp" id="applyOrderIdNum" type="text" readonly="readonly" value="dddd4444"  >
                <div class="uinp-more" >...</div>
            </div>
        </div>
        <div class="already-examine" id="already-examine"><span>审核通过</span></div>
        
        <div class="ub ub-f1 datagrid-edit umar-t8">
            <table id="outWareHosingView" ></table>
        </div>
    </div>
	
</body>
</html>