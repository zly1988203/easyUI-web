<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>商品销售汇总表</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<script src="${ctx}/static/js/views/report/retail/goodsSaleReport.js?V=${versionNo}"></script>
<style>
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	            <shiro:hasPermission name="goodsSaleReport:search">
	                <div class="ubtns-item" onclick="queryForm()">查询</div>
	            </shiro:hasPermission>
	            <shiro:hasPermission name="goodsSaleReport:export">
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
                <div class="ub  ub-ac">
                   <div class="umar-r10 uw-70 ut-r">店铺名称:</div>
	                    <input class="uinp ub ub-f1" type="hidden" id="branchId" name="branchId">
                        <input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" maxlength="50" >
                   <div class="uinp-more" onclick="searchBranch()">...</div>
                </div>
                <div class="ub ub-ac  umar-l20">
                    <div class="umar-r10 uw-70 ut-r">商品名称:</div>
                    <input class="uinp ub ub-f1" type="text" name="skuName" id="skuName">
                </div>  
            </div>
	        <div class="ub umar-t8">
                <div class="ub ub-ac">
				<div class="umar-r10 uw-70 ut-r">商品类别:</div>
				<input type="hidden" name="categoryId" id="categoryId" class="uinp" />
				<input type="text" name="categoryName" id="categoryName" class="uinp" maxlength="50"/>
				<div class="uinp-more" id="categorySelect" onclick="searchCategory()">...</div>
			  </div>
                <div class="ub ub-ac  umar-l20">
                    <div class="umar-r10 uw-70 ut-r">货号/条码:</div>
                    <input class="uinp ub ub-f1" type="text" name="skuBarCode" id="skuBarCode">
                </div>  
            </div>
       	</form>
        <div class="ub ub-f1 umar-t20">
			 <table id="storeSale"></table>
		</div>
    </div>

</body>
</html>