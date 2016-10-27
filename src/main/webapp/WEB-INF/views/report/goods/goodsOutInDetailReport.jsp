<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>商品出入库明细查询</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/report/retail/storeDaySaleReport.js"></script>
<style>
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	            <shiro:hasPermission name="JxcSaleFlow:search">
	                <div class="ubtns-item" onclick="queryForm()">查询</div>
	            </shiro:hasPermission>
	            <shiro:hasPermission name="JxcSaleFlow:export">
	                <div class="ubtns-item" onclick="exportExcel()">导出</div>
	            </shiro:hasPermission>
	              	<div class="ubtns-item" onclick="resetForm()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
	          <!-- 引入时间选择控件 -->
	            <%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
            </div>
	           
	        <div class="ub uline umar-t8"></div>
	        <div class="ub umar-t8">
                <div class="ub  ub-ac">
                   <div class="umar-r10 uw-70 ut-r">店铺名称:</div>
	                    <input class="uinp ub ub-f1" type="hidden" id="branchId" name="branchId">
                        <input class="uinp ub ub-f1" type="text" id="branchName" readonly="readonly" name="branchName">
                   <div class="uinp-more" onclick="searchBranch()">...</div>
                </div>
                <div class="ub ub-ac  umar-l20">
                    <div class="umar-r10 uw-70 ut-r">货号/条码:</div>
                    <input class="uinp ub ub-f1" type="text" name="skuBarCode" id="skuBarCode">
                </div>  
            </div>
	      <div class="ub umar-t8">
                <div class="ub  ub-ac">
                    <div class="umar-r10 uw-70 ut-r">单号:</div>
                    <input class="uinp ub ub-f1" type="text" name="formNo" id="formNo">
                </div>
                <div class="ub ub-ac  umar-l20">
                    <div class="umar-r10 uw-70 ut-r">计价方式:</div>
                    <input class="uinp ub ub-f1" type="text" name="skuBarCode" id="skuBarCode">
                </div>  
            </div>
	      <div class="ub umar-t8">
                <div class="ub  ub-ac">
                    <div class="umar-r10 uw-70 ut-r">出入库类型:</div>
                    <input class="uinp ub ub-f1" type="text" name="formType" id="formType">
                </div>
                <div class="ub ub-ac  umar-l20">
                    <div class="umar-r10 uw-70 ut-r">供应商:</div>
                    <input class="uinp ub ub-f1" type="text" name="supplierId" id="supplierId">
                </div>  
            </div>
       	</form>
           
       	<div class="ub umar-t8 umar-b8">【查询结果】</div>
        <div class="ub ub-f1">
			 <table id="goodsOutInDetail"></table>
		</div>
    </div>

</body>
</html>