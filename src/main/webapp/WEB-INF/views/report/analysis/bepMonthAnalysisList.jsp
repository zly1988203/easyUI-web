
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>月盈亏平衡点</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script
	src="${ctx}/static/js/views/report/analysis/bepMonthAnalysisList.js?V=1"></script>
<style>
.datagrid-header .datagrid-cell {
	text-align: center !important;
	font-weight: bold;
}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" method="post">
			<div class="ub ub-ac">
				<div class="ubtns umar-r20">
					<div class="ubtns-item" onclick="queryMonthAnalysis()">查询</div>
					<div class="ubtns-item" onclick="exportData()">导出</div>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>
				
				<input class="Wdate uw-300 uinp-no-more"
					name="txtStartDate" id="txtStartDate"
					onclick="WdatePicker({dateFmt:'yyyy-MM',maxDate:'%y-%M'})" />
				<input class="Wdate uw-300 uinp-no-more"
					name="txtEndDate" id="txtEndDate"
					onclick="WdatePicker({dateFmt:'yyyy-MM',maxDate:'%y-%M'})" />
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">机构名称:</div>
					<input name="branchId" id="branchId" type="hidden">
					<input name="branchCompleCode" id="branchCompleCode" type="hidden">
					<input class="uinp" id="branchCodeName" name="branchCodeName" type="text" 
						readonly="readonly" onclick="selectListBranches()">
					<div class="uinp-more" onclick="selectListBranches()">...</div>
					
					<input type="hidden" id="startCount" name="startCount" >
					<input type="hidden" id="endCount" name="endCount" >
					
				</div>

				<div class="ub ub-ac umar-r40">
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="costType" id="status_no"
							value="0" checked="checked" /><label for="status_no">含折旧费用
						</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="costType"
							id="status_yes" value="1" /><label for="status_yes">不含折旧费用
						</label>
					</div>
				</div>

			</div>

		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridMonthAnalysis"></table>
		</div>

	</div>
</body>
</html>