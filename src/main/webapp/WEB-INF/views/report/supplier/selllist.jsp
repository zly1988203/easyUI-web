<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>供应商销售报表</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<script src="${ctx}/static/js/views/report/supplier/selllist.js?V=${versionNo}"></script>
<style>
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
					<shiro:hasPermission name="JxcSupplierSellRp:search">
					<div class="ubtns-item" onclick="query()">查询</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcSupplierSellRp:export">
					<div class="ubtns-item" onclick="exportData()">导出</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcSupplierSellRp:print">
					<div class="ubtns-item" onclick="printReport()">打印</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcSupplierSellRp:reset">
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					</shiro:hasPermission>
	                <div class="ubtns-item" onclick="toClose()">关闭</div>
					<input type="hidden" id="startCount" name="startCount" />
					<input type="hidden" id="endCount" name="endCount" />
	            </div>
	             <!-- 引入时间选择控件 -->
	           <div class="ub ub-ac">
	            	<div class="umar-r4 uw-80 ut-r">日期:</div>
	       			<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
	           </div>
            </div>
	        <div class="ub uline umar-t8"></div>
	        <div class="ub umar-t8">
			    <div class="ub ub-ac umar-r40" id="branchSelects">
			        <div class="umar-r10 uw-70 ut-r">机构名称:</div>
			        <input class="uinp" type="hidden" id="branchId" name="branchId">
			        <input class="uinp" type="text" id="branchName" name="branchName">
					<input type="hidden" id="branchCompleCode" name="branchCompleCode" value="">
			        <div class="uinp-more">...</div>
			    </div>
			    <div class="ub ub-ac umar-r40" id="supplierComponent">
			        <div class="umar-r10 uw-70 ut-r">供应商:</div>
                	<input class="uinp" name="supplierId" id="supplierId"type="hidden">
					<input class="uinp ub ub-f1" id="supplierName" type="text">
					<div class="uinp-more">...</div>
			    </div>
			</div>
       	</form>
        <div class="ub ub-f1 umar-t20">
			 <table id="goodsSellistList"></table>
		</div>
    </div>
</body>
</html>