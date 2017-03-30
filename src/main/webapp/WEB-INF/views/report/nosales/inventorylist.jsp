<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>无销售库存查询</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/report/nosales/nosalesList.js?1=4"></script>
    <style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
   <div class="ub ub-ver ub-f1 umar-4 upad-4">
	<form id="queryForm" action="" method="post">
		<div class="ub ub-ac">
            <div class="ubtns">
				<shiro:hasPermission name="JxcRotaRateReport:search">
					<div class="ubtns-item" onclick="queryForm()">查询</div>
				</shiro:hasPermission>
				<shiro:hasPermission name="JxcRotaRateReport:export">
					<div class="ubtns-item" onclick="exportData()">导出</div>
				</shiro:hasPermission>
	             <shiro:hasPermission name="JxcRotaRateReport:print">
                	<div class="ubtns-item" onclick="printReport()">打印</div>
                 </shiro:hasPermission>
				<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
				<div class="ubtns-item" onclick="toClose()">退出</div>
			</div>
			<div class="ub ub-ac umar-l20">
				<%-- 引入时间选择控件 --%>
				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>
		</div>
		<div class="ub uline umar-t8"></div>
		<div class="ub umar-t8">
			<div class="ub ub-ac">
				<div class="umar-r10 uw-70 ut-r">店铺名称:</div>
				<input type="hidden" id="createBranchId" name="branchId" />
				<!-- uinp-no-more disabled="disabled"-->
				<input class="uinp ub ub-f1 "  type="text" id="branchName" name="branchName" maxlength="50"/>
				<div class="uinp-more" onclick="selectBranches()" >...</div>
			</div>
			<div class="ub ub-ac umar-l40">
				<div class="umar-r10 uw-70 ut-r">商品类别:</div>
				<input type="hidden" name="categoryId" id="categoryId" class="uinp">
				<!-- disabled="disabled" -->
				<input type="text" name="categoryName"  id="categoryName" class="uinp ub ub-f1"  maxlength="50">
				<div class="uinp-more" id="categorySelect" onclick="searchCategory(this)">...</div>
			</div>
		</div>
		<div class="ub umar-t8">
			<div class="ub ub-ac uw-300">
				<div class="umar-r10 uw-70 ut-r">商品名称:</div>
				<input class="uinp" type="text" name="skuName"  id="skuName"/>
			</div>
			<div class="ub ub-ac uw-300 umar-l20">
				<div class="umar-r10 uw-70 ut-r">货号/条码:</div>
				<input class="uinp" type="text" name="skuCode"  id="skuCode"/>
			</div>
		</div>

      	</form>
	    <div class="ub ub-f1  umar-t8 umar-b8">
			<table id="wxKCList"></table>
		</div>
   </div>

</body>
</html>
