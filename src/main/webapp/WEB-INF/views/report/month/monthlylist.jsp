<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>月进销存报表</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/report/month/monthList.js?1=461333"></script>
    <style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
   <div class="ub ub-ver ub-f1 umar-4 upad-4">
	<form id="queryForm" action="" method="post">
		<div class="ub ub-ac">
            <div class="ubtns">
                <div class="ubtns-item" onclick="queryForm()">查询</div>
                <div class="ubtns-item" onclick="updateMore()">导出</div>
                <div class="ubtns-item" >打印</div>
                <div class="ubtns-item" id="set" onclick="gFunRefresh()" >重置</div>
                <div class="ubtns-item" onclick="toClose()">退出</div>
            </div>
            <div class="ub ub-ac umar-l20">
				<div class="umar-r10 uw-70 ut-r">分析月份:</div>
		   		<input class="Wdate"  readonly="readonly" name="startTime" id="txtStartDate" onfocus="updateWdatePicker(0)"/>
			</div>
		</div>
		<div class="ub uline umar-t8"></div>
		<div class="ub umar-t8">
			<div class="ub ub-ac">
				<div class="umar-r10 uw-70 ut-r">机构名称:</div>
				<input type="hidden" id="createBranchId" name="branchId" />
				<input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" readonly="readonly" maxlength="50"/>
				<div class="uinp-more" onclick="selectBranches()" >...</div>
			</div>
			<div class="ub ub-ac umar-l40">
				<div class="umar-r10 uw-70 ut-r">商品类别:</div>
				<input class="uinp ub ub-f1" type="hidden" name="categoryCode" id="categoryCode" />
				<input class="uinp ub ub-f1" type="text" name="categoryNameCode" id="categoryNameCode" readonly="readonly" />
				<div class="uinp-more" onClick="searchCategory()">...</div>
			</div>
		</div>
		<div class="ub umar-t8">
			<div class="ub ub-ac uw-300">
				<div class="umar-r10 uw-70 ut-r">商品名称:</div>
				<input class="uinp" type="text" name="skuName" id="skuName"/>
			</div>
			<div class="ub ub-ac uw-300 umar-l20">
				<div class="umar-r10 uw-70 ut-r">条码/货号:</div>
				<input class="uinp" type="text" name="skuCode" id="skuCode"/>
			</div>
		</div>

      	</form>
	    <div class="ub ub-f1  umar-t8 umar-b8">
			<table id="yueJXCList"></table>
		</div>
   </div>

</body>
</html>