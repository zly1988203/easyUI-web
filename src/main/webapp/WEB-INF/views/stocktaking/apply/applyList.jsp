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
	<input type="hidden" value="0" id ="status" name="status"/>
		<div class="ub ub-ac">
            <div class="ubtns">
                <div class="ubtns-item" onclick="queryForm()">查询</div>
                <div class="ubtns-item" onclick="toAdd()">新增</div>
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
			<div class="ub ub-ac">
				<div class="umar-r10 uw-70 ut-r">机构名称:</div>
				<input type="hidden" id="branchId" name="branchId" value="${stocktakingFormVo.branchId}"/>
				<input type="hidden" id="branchCompleCode" name="branchCompleCode" value="${stocktakingFormVo.branchCompleCode}"/>
				<input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" value="${stocktakingFormVo.branchName}" maxlength="50"/>
				<div class="uinp-more" onclick="selectListBranches()" >...</div>
			</div>
			<div class="ub ub-ac uw-300 umar-l40">
				<div class="umar-r10 uw-70 ut-r">盘点批号:</div>
				<input class="uinp" type="text" id="batchNo" name="batchNo">
			</div>
		</div>
		<div class="ub umar-t8">
		<div class="ub ub-ac">
		<div class="umar-r10 uw-70 ut-r">盘点范围:</div>
			<select class="uselect easyui-combobox" style="width: 204px;" name="scope" id="scope">
				<option value="">--请选择--</option>
				<option value="0">全场盘点</option>
				<option value="1">类别盘点</option>
			</select>
		</div>
		</div>
		<div class="ub umar-t8">
			<div class="ub ub-ac uw-602">
				<div class="umar-r10 uw-70 ut-r">备注:</div>
				<input class="uinp ub ub-f1" type="text" id="remark" name="remark" maxlength="40">
			</div>
		</div>
      	</form>
       <div class="ub ub-f1  umar-t8 umar-b8">
		<table id="applyList"></table>
	</div>
   </div>
</body>
</html>
