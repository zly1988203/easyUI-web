<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>收货单</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/purchase/receiptList.js"></script>
    <%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
    	<form id="queryForm">
	        <div class="ub ub-ac">
	            <div class="ubtns">
					<div class="ubtns-item" onclick="query()">查询</div>
				<shiro:hasPermission name="JxcPurchaseReceipt:add">
	                <div id="btnAdd" class="ubtns-item" onclick="receiptAdd()">新增</div>
	            </shiro:hasPermission>
				<shiro:hasPermission name="JxcPurchaseReceipt:delete">
	                <div id="btnDel" class="ubtns-item" onclick="receiptDelete()">删除</div>
	            </shiro:hasPermission>
	            <shiro:hasPermission name="JxcPurchaseReceipt:print">
	                <div id="btnPrint" class="ubtns-item" onclick="printPreview()">打印</div>
	            </shiro:hasPermission>
	                <div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
	            <!-- 引入时间选择控件 -->
	            <%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
	        </div>
	
	        <div class="ub umar-t8">
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">单据编号:</div>
	                <input class="uinp" name="formType" id="formType" type="hidden" value="PA">
	                <input class="uinp" name="formNo" id="formNo" type="text">
	            </div>
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">供应商:</div>
	                <input class="uinp" name="supplierId" id="supplierId" type="hidden">
	                <input class="uinp" id="supplierName" name="supplierName" type="text" maxlength="50">
	                <div class="uinp-more" onclick="selectSupplier()">...</div>
	            </div>
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">操作员:</div>
	                <input class="uinp" name="operateUserId" id="operateUserId" type="hidden">
	                <input class="uinp" id="operateUserName" name="operateUserName" type="text" maxlength="50">
	                <div class="uinp-more" onclick="selectOperator()">...</div>
	            </div>
	        </div>
	        <div class="ub umar-t8">
	        	<div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">收货机构:</div>
	                <input class="uinp" name="branchId" id="branchId" type="hidden">
	                <input class="uinp" id="branchName" name="branchName" type="text" maxlength="50">
	                <div class="uinp-more" onclick="selectBranch()">...</div>
	            </div>
	            <div class="ub ub-ac umar-r40" id="refFormNoDiv">
	                <div class="umar-r10 uw-60 ut-r">采购单号:</div>
	                <input class="uinp" name="refFormNo" id="refFormNo" type="text">
	            </div>
	            <div class="ub ub-ac umar-r40" id="radioItemDiv">
	                <div class="umar-r10 uw-60 ut-r">审核状态:</div>
	                <div class="ub ub-ac umar-r10">
	                    <input class="radioItem" type="radio" name="status" id="status_no" value="0" checked="checked"/><label for="status_no">未审核 </label>
	                </div>
	                <div class="ub ub-ac umar-r10">
	                    <input class="radioItem" type="radio" name="status" id="status_yes" value="1"/><label for="status_yes">已审核 </label>
	                </div>
	                <!-- <div class="ub ub-ac umar-r10">
	                    <input class="radioItem" type="radio" name="status" value="2"/><span>不通过 </span>
	                </div> -->
	                <div class="ub ub-ac umar-r10">
	                    <input class="radioItem" type="radio" name="status" id="status_all" value="" /><label for="status_all">全部</label>
	                </div>
	            </div>
	        </div>
        </form>
        
      <div class="ub ub-f1  umar-t8 umar-b8">
            <div id="tabs" class="easyui-tabs" data-options="fit:true,border:false,tabWidth:120,tabHeight:25" style="">
	            <div title="待处理采购订单" data-options="tabWidth:158" id="pending" style="height: auto;">
	                <table id="receiptOrderList"></table>
	            </div> 
	            <div title="采购收货单" id="processed" style="padding: 5px; height: auto;">
	                <table id="gridOrders"></table>
	            </div>
        	</div>
        </div>
        
      <!--   <div class="ub umar-t8 ub-f1">
            <table id="gridOrders"></table>
        </div> -->

    </div>
</body>
</html>