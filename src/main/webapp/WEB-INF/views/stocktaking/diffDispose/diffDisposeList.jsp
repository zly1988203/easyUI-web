<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>盘点差异处理</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/stocktaking/diffDispose/diffDisposeList.js?V=${versionNo}"></script>
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
                <div class="ubtns-item" onclick="deleteStocktakingBatch()">删单</div>
                <div class="ubtns-item" id="set" onclick="gFunRefresh()" >重置</div>
                <div class="ubtns-item" onclick="toClose()">退出</div>
            </div>
			<div class="ub">
				<div class="ub ub-ac">
					<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
				</div>
			</div>
		</div>
		<div class="ub uline umar-t8"></div>
		<div class="ub umar-t8">
			<div class="ub ub-ac uw-300">
				<div class="umar-r10 uw-70 ut-r">盘点批号:</div>
				<input class="uinp ub ub-f1" type="text" id="batchNo" name="batchNo">
			</div>
			<div class="ub ub-ac uw-300 umar-l10">
				<div class="umar-r10 uw-70 ut-r">机构:</div>
				<input type="hidden" id="branchId" name="branchId" />
				<input type="hidden" id="branchCompleCode" name="branchCompleCode"/>
				<input type="hidden" id="oldBranchName" >
				<input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" maxlength="50"/>
				<div class="uinp-more" onclick="selectListBranches()" >...</div>
			</div>
		</div>
		<div class="ub umar-t8">
			<div class="ub ub-ac uw-300">
				<div class="umar-r10 uw-70 ut-r">制单人员:</div>
				<input type="hidden" id="createUserId" name="createUserId" />
				<input type="hidden" id="oldCreateUserName" name="oldCreateUserName" />
				<input class="uinp ub ub-f1" type="text" id="createUserName" name="createUserName">
				<div class="uinp-more" onclick="selectOperator()" >...</div>
			</div>
            <div class="ub ub-ac uw-300 umar-l10">
                <div class="umar-r10 uw-70 ut-r">审核状态:</div>
                <div class="ub ub-ac umar-r10">
                     <label><input class="radioItem" type="radio" value="0" name="status" checked="checked" onclick="queryForm()"/><span>未审核</span></label>
                </div>
                <div class="ub ub-ac umar-r10">
                     <label><input class="radioItem" type="radio" value="1" name="status" onclick="queryForm()"/><span>已审核</span></label>
                </div>
                <div class="ub ub-ac umar-r10">
                     <label><input class="radioItem"  type="radio" value="" name="status" onclick="queryForm()"/><span>全部</span></label>
                </div>
            </div>
		</div>
		<div class="ub umar-t8">
			<div class="ub ub-ac uw-610">
				<div class="umar-r10 uw-70 ut-r">备注:</div>
				<input class="uinp ub ub-f1" type="text" id="remark" name="remark" maxlength="40">
			</div>
		</div>
      	</form>
       <div class="ub ub-f1  umar-t8 umar-b8">
		<table id="diffDisposeList"></table>
	</div>
   </div>
</body>
</html>
