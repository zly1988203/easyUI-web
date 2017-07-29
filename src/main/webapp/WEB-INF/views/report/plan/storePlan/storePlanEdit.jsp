<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>新增门店计划</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/report/plan/storePlan/storePlanMain.js?V=${versionNo}1"></script>
<style>
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<input type='hidden' id="currMonth" value="<fmt:formatDate value='${now}' pattern='yyyy-MM' />">
			<input type='hidden' id="chargeStatus" value="edit">
			<div class="ub ub-ac">
	            <div class="ubtns">
	                <div class="ubtns-item" onclick="addPlan()">新增</div>
	                <div class="ubtns-item" onclick="savePlan()">保存</div>
	              	<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">关闭</div>
	            </div>
            </div>
	        <div class="ub uline umar-t8"></div>
	        <div class="ub umar-t8">
                <div class="ub ub-ac" id="branchSelect">
                   <div class="umar-r10 uw-80 ut-r">机构:</div>
                   <input type="hidden" id="branchId" name="branchId" value="${branch.branchId}">
                   <input class="uinp uinp-no-more"  type="text" id="branchName"  name="branchName" value="[${branch.branchCode}]${branch.branchName}" readonly="readonly">
                   <div class="uinp-more">...</div>
                </div>
                <div class="ub ub-ac uc-red">*</div>
                <div class="ub  ub-ac umar-l120">
                	<div class="umar-r10 uw-80 ut-r">年度:</div>
                    <div class="ub ub-ac umar-l20">
		              	<input class="Wdate uinp-no-more"  readonly="readonly" name="year" id="year" value="${year}"/>
		            </div>
		            <div class="ub ub-ac uc-red">*</div>
                </div>
            </div>
       	</form>
        <div class="ub ub-f1 umar-t20">
			 <table id="storePlanList"></table>
		</div>
    </div>

</body>
</html>