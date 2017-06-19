<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>门店补货分析</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
	<script src="${ctx}/static/js/views/purchase/report/purchaseReplenishAnaly.js?V=${versionNo}"></script>
    
</head>
<body class="uw uh ufs-14 uc-black ">
    <div class="ub ub-ver uw ub-f1 uh upad-8 box-border">
    	<form id="queryForm" action="" method="post">
	        <div class="ub ub-ac">
	            <div class="ubtns"> 
	            <shiro:hasPermission name="JxcPurchaseReplenish:search">
					<div class="ubtns-item" onclick="searchForm()">查询</div>
				</shiro:hasPermission>
	            <shiro:hasPermission name="JxcPurchaseReplenish:export">
	                <div class="ubtns-item" onclick="exportData()">导出</div>
				</shiro:hasPermission>
	                <div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
	            
	            <div class="ub ub-ac umar-l20">
	           	 	<div class="umar-r10 uw-70 ut-r">补货时间:</div>
					<input id="replenishEndDate" name="replenishEndDate" type="hidden">
	            	<input class="Wdate" readonly="readonly" name="replenishDate" id="replenishDate" 
	            		onclick="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'replenishEndDate\');}'})"/>
	            </div>
	        </div>
	
	        <div class="ub umar-t8">
	             <div class="ub  ub-ac umar-r40">
                   <div class="umar-r10 uw-70 ut-r">店&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;铺:</div>
                   		<input type="hidden" id="branchId" name="branchId" />
						<input type="hidden" id="branchCode" name="branchCode" />
						<input type="hidden" id="branchCompleCode" name="branchCompleCode" />
						<input type="hidden" id="branchType" name="branchType" />
						<input type="hidden" id="branchParentId" name="branchParentId" />
						<input class="uinp ub ub-f1 easyui-validatebox" type="text" id="branchCodeName" name="branchCodeName" 
							maxlength="50" readOnly data-options="required:true" onclick="selectBranches()" />
						<div class="uinp-more" onclick="selectBranches()" id="selectBranchMore">...</div>
					
                        <input type="hidden" name="startCount" id="startCount" value="">
						<input type="hidden" name="endCount" id="endCount" value="">
                </div>
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">供&nbsp;应&nbsp;商:</div>
					<input type="hidden" id="supplierId" name="supplierId" />
					<input class="uinp" type="text" id="supplierCodeName" name="supplierCodeName" maxlength="50" 
						onblur="supplierAutoComple()" onkeyup="supplierAutoComple()" />
					<div class="uinp-more" onclick="selectSupplier()" >...</div>
	            </div>
	            
	            <div class="ub ub-ac">
	                <div class="umar-r10 uw-70 ut-r">商品类型:</div>
	                <div class="ub ub-ac umar-r10">
	                	<label><input class="radioItem" type="radio" name="isFastDeliver" value="-1" checked="checked"/>全部</label>
	                </div>
	                <div class="ub ub-ac umar-r10">
	                    <label><input class="radioItem" type="radio" name="isFastDeliver" value="0"/>普通商品 </label>
	                </div>
					<div class="ub ub-ac umar-r10">
						<label><input class="radioItem" type="radio" name="isFastDeliver" value="1" />直送商品</label>
					</div>
	            </div>
	        </div>
        </form>
        <div class="ub uw umar-t8 ub-f1">
            <table id="gridPurchaseReplenishAnaly"></table>
        </div>

    </div>
</body>
</html>