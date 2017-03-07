<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>盘点申请</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/stocktaking/apply/applyList.js"></script>
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
                <div class="ubtns-item" onclick="toAdd()">新增</div>
                <div class="ubtns-item" id="set" onclick="gFunRefresh()" >重置</div>
                <div class="ubtns-item" onclick="toClose()">退出</div>
            </div>
			<div class="ub">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">日期:</div>
					<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
				</div>
			</div>
		</div>
		<div class="ub uline umar-t8"></div>
		<div class="ub umar-t8">
			<div class="ub ub-ac">
				<div class="umar-r10 uw-70 ut-r">机构名称:</div>
				<input type="hidden" id="branchId" name="branchId" />
				<input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" maxlength="50"/>
				<div class="uinp-more" onclick="selectBranches()" >...</div>
			</div>
			<div class="ub ub-ac uw-300 umar-l40">
				<div class="umar-r10 uw-70 ut-r">单据编号:</div>
				<input class="uinp" type="text" id="takeStockNO" name="takeStockNO">
			</div>
		</div>
		<div class="ub umar-t8">
			<div class="ub ub-ac uw-300">
				<div class="umar-r10 uw-70 ut-r">盘点范围:</div>
				<input class="uinp" type="text" id="takeStockScope" name="takeStockScope">
			</div>
			<div class="ub ub-ac">
				<div class="umar-r10 uw-70 ut-r">类别:</div>
				<input class="uinp ub ub-f1" type="hidden" name="categoryCode" id="categoryCode" />
				<input class="uinp ub ub-f1" type="text" name="categoryNameCode" id="categoryNameCode" />
				<div class="uinp-more" onClick="searchCategory()">...</div>
			</div>
		</div>
		<div class="ub umar-t8">
			<div class="ub ub-ac uw-300">
				<div class="umar-r10 uw-70 ut-r">备注:</div>
				<input class="uinp" type="text" id="remark" name="remark">
			</div>
		</div>
      	</form>
       <div class="ub ub-f1  umar-t8 umar-b8">
		<table id="applyList"></table>
	</div>
   </div>
</body>
</html>
