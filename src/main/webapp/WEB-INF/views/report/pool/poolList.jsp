<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>联营销售查询</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<script src="${ctx}/static/js/views/report/pool/poolSaleReport.js"></script>
<style>
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	            <shiro:hasPermission name="JxcPoolSale:search">
	                <div class="ubtns-item" onclick="queryForm()">查询</div>
	            </shiro:hasPermission>
	            <shiro:hasPermission name="JxcPoolSale:export">
	            <input type="hidden" id="startCount" name="startCount" />
				<input type="hidden" id="endCount" name="endCount" />
	                <div class="ubtns-item" onclick="exportData()">导出</div>
	            </shiro:hasPermission>
	              	<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
	            
	           	<!-- 引入时间选择控件 -->
	            <%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
            </div>

	        <div class="ub uline umar-t8"></div>
	        <div class="ub umar-t8">
                <div class="ub ub-ac umar-r20 ">
	                    <div class="umar-r10 uw-70 ut-r">机构名称:</div>
	                    <input type="hidden" id="branchId" name="branchId" />
	                    <input class="uinp ub ub-f1" type="text" id="branchName" name="branchName"/>
	                    <div class="uinp-more" onclick="selectBranches()" >...</div>
	                </div>
	                <div class="ub ub-ac umar-r20">
	                <div class="umar-r10 uw-60 ut-r">供应商:</div>
	                <input class="uinp" name="supplierId" id="supplierId" type="hidden">
	                <input class="uinp" id="supplierName" name="supplierName" type="text" maxlength="50">
	                <div class="uinp-more" onclick="selectSupplier()">...</div>
	            </div>
	                <div class="ub ub-ac  umar-l20">
                    <div class="umar-r10 uw-40 ut-r">货号:</div>
                    <input class="uinp ub ub-f1" type="text" name="skuCode" id="skuCode">
                </div> 
                 <div class="ub ub-ac  umar-l20">
                 <div class="umar-r10 uw-60 ut-r">商品选择:</div>
                 <input class="uinp" name="skuId" id="skuId" type="hidden">
	                <input class="uinp" id="skuName" name="skuName" type="text" maxlength="50">
	                <div class="uinp-more" onclick="selectGoods()">...</div>
                 </div>
                 <div class="ub ub-ac">
			        <div class="umar-r10 uw-80 ut-r">查询模式:</div>
			        <div class="ub ub-ac umar-r10 ">
			            <label>
			                <input class="radioItem" id="goodsTotal" type="radio" name="searchType" value="goodsTotal" checked="checked" /> 商品汇总</label>
			        </div>
			        <div class="ub ub-ac  uh-36">
			            <label class="umar-r10">
			                <input class="radioItem" id="goodsDetail" type="radio" name="searchType" value="goodsDetail" />商品明细</label>
			        </div>
			    </div>
            </div>
	
       	</form>
           
      
      <div class="ub ub-f1 umar-t20">
			 <table id="poolSaleReport"></table>
		</div>
    </div>

</body>
</html>