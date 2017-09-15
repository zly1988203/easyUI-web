
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>门店月盈亏平衡明细分析</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script
	src="${ctx}/static/js/views/report/analysis/bepMonthDetailList.js?V=${versionNo}"></script>


	<style>
	.tb-class {
		width:60%;
		min-width:60%;
		border: 1px solid;
	}
	.tb-class td {
	<%--border: 1px solid #ccc;--%>
	/*height: 32px;*/
	padding: 8px;
	}

	.header-tr{
		font-size: 16px;
		font-weight: 600;
		text-align: center;
	}

	.head-tr-bg{
		background: #cccccc;
	}

	.tr-bg{
		background: #f3f3f3;
	}

	.td-amount{
		text-align:right;
	}

	tb-class .tr{
	border: 1px solid #ccc;
	font-size: 16px;
	font-weight: 600;
	}
	</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" method="post">
			<div class="ub ub-ac">
				<div class="ubtns umar-r20">
					<div class="ubtns-item" onclick="queryMonthDetail()">查询</div>
					<shiro:hasPermission name="JxcBepMonthDetail:export">
						<div class="ubtns-item" onclick="exportExcel()">导出</div>
					</shiro:hasPermission>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40" id="branchSelect">
					<div class="umar-r10 uw-60 ut-r">机构名称:</div>
					<input name="branchId" id="branchId" type="hidden"> 
					<input class="uinp" id="branchCodeName" name="branchCodeName" type="text">
					<div class="uinp-more">...</div>
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">月份:</div>
					<input class="Wdate uw-300 uinp-no-more" name="monthStr" id="month"
						onclick="WdatePicker({dateFmt:'yyyy-MM',maxDate:'%y-%M'})" />
				</div>
			</div>
		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="tb">

			</table>
		</div>

	</div>
</body>
</html>