<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>POS下单模拟测试</title>

    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script src="${ctx}/static/js/views/sale/activity/posOrderTest.js"></script>

</head>
<body class="ub ub-ver uw uh ufs-14 uc-black">
<div class="ub ub-ver ub-f1 umar-4  ubor">
    <div class="ub ub-ac upad-4">
        <div class="ubtns">
        <shiro:hasPermission name="JxcPurchaseOrder:add">
            <div class="ubtns-item" onclick="saveItemHandel()">结算</div>
        </shiro:hasPermission>
            <div class="ubtns-item" onclick="selectGoods()">商品选择</div>
        </div>
    </div>
    <form id="formAdd">
        <div class="ub ub-ver ">
            <div class="ub umar-t8">
                <div class="ub ub-ac umar-r80">
                    <div class="umar-r10 uw-60 ut-r">结算机构:</div>
                    <input class="uinp" name="branchId" id="branchId" type="hidden">
                    <input class="uinp" name="branchCode" id="branchCode" type="hidden">
                    <input id="branchName" class="uinp easyui-validatebox" data-options="required:true"  type="text" onclick="selectBranch()" >
                    <div class="uinp-more" onclick="selectBranch()">...</div>
                </div>
                <div class="ub ub-ac umar-r80">
                    <div class="umar-r10 uw-60 ut-r">收银员:</div>
                    <input class="uinp" name="salesmanId" id="salesmanId" type="hidden">
                    <input class="uinp" id="operateUserName" type="text" readonly="readonly" onclick="selectOperator()" >
                    <div class="uinp-more" onclick="selectOperator()">...</div>
                </div>
                
                <div class="ub ub-ac umar-r80">
                    <div class="umar-r10 uw-60 ut-r">合计金额:</div>
                    <input class="uinp" id="totalAmount" name="totalAmount" type="text" disabled="disabled">
                </div>
            </div>
        </div>
    </form>
    <div class="ub uw umar-t8 ub-f1">
        <table id="gridEditOrder" ></table>
    </div>
    
    
    
    <div id="textDialog" class="easyui-dialog" title="My Dialog" style="width:600px;height:600px;"
        data-options="iconCls:'icon-save',resizable:true,modal:true,closed:true">
        <p>orderId：<span id="orderId"></span></p>
	    <p>prepayId：<span id="prepayId"></span></p>
	    <hr>
	    <p>原价金额：<span id="orderTotalAmount"></span></p>
	    <p>订单金额：<span id="saleAmount"></span></p>
	    <p>优惠金额：<span id="discountAmount"></span></p>
	    <p>抹零金额：<span id="subZeroAmount"></span></p>
	    <p>应付金额：<span id="paymentAmount"></span></p>
	    <hr>
	    <p>
	    	现金<input type="radio" value="RMB" name="payWay" checked="checked"/>,
	    	银行卡<input type="radio" value="YHK" name="payWay"/>,
	    	店小二<input type="radio" value="DXR" name="payWay"/>,
	    	微信扫码<input type="radio" value="WZF" name="payWay"/>,
	    	支付宝扫码<input type="radio" value="ZFB" name="payWay"/>,
	    </p>
	    <p>实收金额：<input type="text" id="receiveAmount"></p>
	    <p>支付条码：<input type="text" id="paymentCode"></p>
	    <p><button onclick="pay()">付款</button></p>
	    
	   	<table id="goodsList" border="1" style="border-style: solid; border-width: 1px;"></table>
	</div>
    
    
</div>

</body>
</html>