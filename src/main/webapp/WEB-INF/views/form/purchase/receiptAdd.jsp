<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>收货单-新增</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/purchase/receiptAdd.js"></script>
    
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
            <shiro:hasPermission name="JxcPurchaseReceipt:add">
                <div class="ubtns-item" onclick="saveItemHandel()">保存</div>
            </shiro:hasPermission>
                <!--<div class="ubtns-item" onclick="selectGoods()">商品选择</div>-->
                <div class="ubtns-item"  onclick="toBackByJS()">返回</div>
            </div>
        </div>
        <form id="formAdd">
            <div class="ub umar-t8">
            	<div class="ub ub-ac umar-r80">
                    <div class="umar-r10 uw-60 ut-r">采购订单:</div>
                    <input id="refFormNo" class="uinp  easyui-validatebox" data-options="required:true" type="text"  onclick="selectPurchaseForm()" >
                    <div class="uinp-more" onclick="selectPurchaseForm()">...</div>
                </div>
                <div class="ub ub-ac umar-r80">
                    <div class="umar-r10 uw-60 ut-r">付款期限:</div>
                    <input id="paymentTime" class="Wdate easyui-validatebox" data-options="required:true" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})"/>
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
                    <div class="umar-r10 uw-60 ut-r">收货机构:</div>
                    <input class="uinp" name="branchId" id="branchId" type="hidden">
                    <input id="branchName" class="uinp  easyui-validatebox" data-options="required:true,novalidate:true" readonly="readonly" type="text"  ><!-- onclick="selectBranch()"-->
                    <!--<div class="uinp-more" onclick="selectBranch()">...</div>-->
                </div>
                <div class="ub ub-ac umar-r80">
                    <div class="umar-r10 uw-60 ut-r">采购员:</div>
                    <input class="uinp" name="salesmanId" id="salesmanId" type="hidden">
                    <input class="uinp easyui-validatebox" id="operateUserName" type="text" data-options="required:true,novalidate:true" readonly="readonly"  ><!--onclick="selectOperator()"-->
                    <!--<div class="uinp-more" onclick="selectOperator()">...</div>-->
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
                <div class="ub ub-ac umar-r80">
                    <div class="umar-r10 uw-60 ut-r">供应商:</div>
                    <input class="uinp" name="supplierId" id="supplierId" type="hidden">
                    <input class="uinp easyui-validatebox" data-options="required:true,novalidate:true" id="supplierName" type="text" readonly="readonly">
                </div>
                <div class="ub ub-ac umar-r80">
                    <div class="umar-r10 uw-60 ut-r">经营方式:</div>
                    <input id="saleWay" class="uinp" type="hidden">
                    <input id="saleWayName" class="uinp  easyui-validatebox" data-options="required:true,novalidate:true" readonly="readonly"  type="text"  >
                </div>
            </div>
            <div class="ub umar-t8">
                <div class="ub ub-ac umar-r80">
                    <div class="umar-r10 uw-60 ut-r">备注:</div>
                    <input id="remark" class="uinp" type="text" style="width:800px">
                </div>
            </div>
        </form>

        <div class="ub ub-f1 datagrid-edit umar-t8">
            <table id="gridEditOrder" ></table>
        </div>
    </div>

</body>
</html>