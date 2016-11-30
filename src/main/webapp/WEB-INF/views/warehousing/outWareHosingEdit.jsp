<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>采购订单-修改</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/warehousing/outWareHosingEdit.js"></script>
    
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
                <div class="ubtns-item" onclick="saveItemHandel()">保存</div>
                <div class="ubtns-item" onclick="check()">审核</div>
                <div class="ubtns-item" onclick="selectGoods()">商品选择</div>
                <div class="ubtns-item">删单</div>
                <div class="ubtns-item">终止</div>
                <div class="ubtns-item">设置</div>
                <div class="ubtns-item">打印</div>
                <div class="ubtns-item" onclick="toBack()">关闭</div>
            </div>
        </div>
        <input type="hidden" id="formId" value="${form.id}">
        <div class="ub umar-t8">
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">收货分店:</div>
                <input class="uinp" name="supplierId" id="supplierId" type="hidden">
                <input class="uinp" id="supplierName" type="text" readonly="readonly" onclick="selectSupplier()">
                <div class="uinp-more" onclick="selectSupplier()">...</div>
            </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">发货人:</div>
                <input class="uinp" name="salesmanId" id="salesmanId" type="hidden">
                <input class="uinp" id="operateUserName" type="text" readonly="readonly" onclick="selectOperator()">
                <div class="uinp-more" onclick="selectOperator()">...</div>
            </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">制单人员:</div>
                <div class="utxt"><%=UserUtil.getCurrentUser().getUserName() %></div>
            </div>
            <div class="ub ub-ac">
                <div class="umar-r10 uw-60 ut-r">制单日期:</div>
                <div class="utxt" id="createTime"></div>
            </div>
        </div>
        <div class="ub umar-t8">
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">调出仓库:</div>
                <input class="uinp" name="branchId" id="branchId" type="hidden">
                <input class="uinp" id="branchName" type="text" readonly="readonly" onclick="selectBranch()" >
                <div class="uinp-more" onclick="selectBranch()">...</div>
            </div>
            <div class="ub ub-ac umar-r80">
	            <div class="umar-r10 uw-60 ut-r">备注:</div>
	            <input class="uinp" type="text" name="remarkMsg" id="remarkMsg" >
	        </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">审核人员:</div>
                <div class="utxt"></div>
            </div>
            <div class="ub ub-ac">
                <div class="umar-r10 uw-60 ut-r">审核日期:</div>
                <div class="utxt"></div>
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
                <input class="uinp" id="applyOrderIdNum" type="text" readonly="readonly" onclick="selectPurchaseFormService()" >
                <div class="uinp-more" onclick="selectPurchaseFormService()">...</div>
            </div>
        </div>
        <div class="ub ub-f1 datagrid-edit umar-t8">
            <table id="gridEditOutWareHosing" ></table>
        </div>
    </div>

</body>
</html>