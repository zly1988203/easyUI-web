<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>直送收货单</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/purchase/directReceipt/directReceiptList.js"></script>
    <%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
    	<form id="queryForm">
	        <div class="ub ub-ac">
	            <div class="ubtns">
					<div class="ubtns-item" onclick="query()">查询</div>
				<shiro:hasPermission name="JxcPurchaseOrder:add">
	                <div class="ubtns-item" onclick="directAdd()">新增</div>
	            </shiro:hasPermission>
	            <shiro:hasPermission name="JxcPurchaseOrder:delete">
	                <div class="ubtns-item" onclick="directDelete()">删除</div>
	            </shiro:hasPermission>
	            <shiro:hasPermission name="JxcPurchaseOrder:print">
	                <div class="ubtns-item" onclick="toPrintPreview('PA','/form/purchase/')">打印</div>
	            </shiro:hasPermission>
	                <div class="ubtns-item" >设置</div>
	                <div class="ubtns-item" onclick="toClose()">关闭</div>
	            </div>
	            
	            <!-- 引入时间选择控件 -->
	            <%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
	        </div>
	
	        <div class="ub umar-t8">
	            <div class="ub ub-ac umar-r40">
	               <div class="umar-r10 uw-60 ut-r">收货机构:</div>
						<input class="uinp" name="branchId" id="branchId" type="hidden">
						<input type="hidden" id="oldBranchName" >
						<input id="branchName" class="uinp ub ub-f1" type="text">
						<div class="uinp-more" onclick="selectBranch()">...</div>
	            </div>
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">制单人:</div>
	               <input class="uinp" name="salesmanId" id="salesmanId" type="hidden">
	                <input type="hidden" id="oldUserName" >
					<input id="operateUserName" class="uinp ub ub-f1" type="text">
						<div class="uinp-more" onclick="selectOperator()">...</div>
	            </div>
	        </div>
	        
	       <div class="ub umar-t8">
	             <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">单号:</div>
	                <input class="uinp" name="formNo" id="formNo" type="text">
	            </div>
	            <div class="ub ub-ac umar-r40">
	               <div class="umar-r10 uw-60 ut-r">供应商:</div>
						<input class="uinp" name="supplierId" id="supplierId" type="hidden">
						<input type="hidden" id="oldsupplierName"/>
						<input class="uinp ub ub-f1" type="text" id="supplierName">
						<div class="uinp-more" onclick="selectSupplier()">...</div>
	            </div>
	        </div>
	        
	        <div class="ub umar-t8">
               <div class="ub ub-ac uw-610" style="width: 624px;">
	                    <div class="umar-r10 uw-60 ut-r">备注:</div>
	                    <input class="uinp ub ub-f1" name="remark" id="remark" type="text" onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" oncontextmenu = "value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" maxlength="40">
	           </div>
	           
	          <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">审核状态:</div>
	                <div class="ub ub-ac umar-r10">
	                    <input class="radioItem" type="radio" name="status" id="status_no" value="0" checked="checked"/><label for="status_no">未审核 </label>
	                </div>
	                <div class="ub ub-ac umar-r10">
	                    <input class="radioItem" type="radio" name="status" id="status_yes" value="1"/><label for="status_yes">已审核 </label>
	                </div>
	                <div class="ub ub-ac umar-r10">
	                    <input class="radioItem" type="radio" name="status" id="status_all" value=""/><label for="status_all">全部</label>
	                </div>
	            </div>
	           
            </div>


        </form>
        <div class="ub uw umar-t8 ub-f1">
            <table id="gridDirectList"></table>
        </div>

    </div>
</body>
</html>