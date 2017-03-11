<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>临期商品订单列表</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/overdue/overdueList.js"></script>
    <%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
    	<form id="queryForm">
	        <div class="ub ub-ac">
	            <div class="ubtns">
					<div class="ubtns-item" onclick="query()">查询</div>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
		            <shiro:hasPermission name="JxcOverdueOrder:print">
		                <div class="ubtns-item" onclick="printReport()">打印</div>
		            </shiro:hasPermission>
	                <%-- <shiro:hasPermission name="JxcPurchaseOrder:add">
		                <div class="ubtns-item">设置</div>
		            </shiro:hasPermission> --%>
	                <div class="ubtns-item" onclick="toClose()">关闭</div>
	            </div>
	            
	            <!-- 引入时间选择控件 -->
	            <%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
	        </div>
	
	        <div class="ub umar-t8">
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">申请机构:</div>
	                <input class="uinp" name="branchId" id="branchId" type="hidden">
	                <input class="uinp" id="branchName" name="branchName" type="text" maxlength="50">
	                <div class="uinp-more" onclick="searchBranch()">...</div>
	            </div>
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r" style="width: 70px !important;">制单人:</div>
	                <input class="uinp" name="createUserId" id="createUserId" type="hidden">
	                <input class="uinp" id="createUserName" name ="createUserName" type="text"  maxlength="50">
	                <div class="uinp-more" onclick="selectOperator()">...</div>
	            </div>
	        </div>
	        <div class="ub umar-t8">
	        	<div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">单据编号:</div>
	                <input class="uinp" name="formNo" id="formNo" type="text">
	            </div>
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r" style="width: 70px !important;">条码/货号:</div>
	                <input class="uinp" name="skuCode" id="skuCode" type="text">
	            </div>
	        </div>
	       <div class="ub umar-t8">
	       	   <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r" >商品名称:</div>
	                <input class="uinp" name="skuName" id="skuName" type="text">
	            </div>
               <div class="ub ub-ac uw-610" style="width: 624px;">
	                    <div class="umar-r10 uw-60 ut-r" style="width: 70px !important;">备注:</div>
	                    <input class="uinp ub ub-f1" name="remark" id="remark" type="text" onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" oncontextmenu = "value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" maxlength="100">
	           </div>
            </div>
        </form>
        <div class="ub uw umar-t8 ub-f1">
            <table id="gridOrders"></table>
        </div>

    </div>
</body>
</html>