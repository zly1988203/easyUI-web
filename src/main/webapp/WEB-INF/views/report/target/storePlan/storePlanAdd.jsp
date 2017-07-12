<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>新增门店计划</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/report/target/storePlan/storePlanMain.js?V=${versionNo}"></script>
<style>
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
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
                   <input type="hidden" id="branchId" name="branchId">
                   <input class="uinp"  type="text" id="branchName"  name="branchName" readonly="readonly">
                   <div class="uinp-more">...</div>
                </div>
                <div class="ub ub-ac uc-red">*</div>
                <div class="ub  ub-ac umar-l120">
                	<div class="umar-r10 uw-80 ut-r">年度:</div>
                    <div class="ub ub-ac umar-l20">
		              	<input class="Wdate"  readonly="readonly" name="planTime" id="planTime" onclick="selectMonth()"  />
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