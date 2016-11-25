<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>店铺销售排行</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
    <script  src="${ctx}/static/js/views/report/order/tradeOrderCount.js"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">

    <div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
				<div class="ub ub-ac">
		            <div class="ubtns">
		            	<shiro:hasPermission name="JxcTradeOrderCount:search">
							<div class="ubtns-item" onclick="queryForm()">查询</div>
						</shiro:hasPermission>
						<shiro:hasPermission name="JxcTradeOrderCount:export">
							<input type="hidden" id="startCount" name="startCount" />
							<input type="hidden" id="endCount" name="endCount" />
							<div class="ubtns-item"  onclick="exportData()">导出</div>
						</shiro:hasPermission>
						<div class="ubtns-item" id="set" onclick="gFunRefresh()">重置</div>
		                <div class="ubtns-item" onclick="toClose()">退出</div>
		            </div>
		        	<div class="ub ub-ac umar-l20">
		              	 <%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
		            </div>
				</div>
	            <div class="ub umar-t8">
	                <div class="ub ub-ac uw-300">
	                    <div class="umar-r10 uw-70 ut-r">机构名称:</div>
	                    <input type="hidden" id="branchId" name="branchId" value="${branchesGrow.branchesId}"/>
	                    <input type="hidden" id="brancheType" name="brancheType" value="${branchesGrow.type}"/>
	                    <input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" value="${branchesGrow.branchName}" onclick="selectBranches()" readonly="readonly"/>
	                    <div class="uinp-more" onclick="selectBranches()" >...</div>
	                </div>
	            </div>
	            <!-- <div class="ub umar-t8">
	                <div class="ub ub-ac uw-300 umar-l40">
	                    <div class="umar-r10 uw-70 ut-r">所在区域:</div>
	                    <input class="uinp ub ub-f1"   type="text" name="branchAreaName" id="areaName" onclick="selectBranchArea();" readonly="readonly">
	                    <input class="uinp ub ub-f1" name="branchAreaId" type="hidden" id="areaInput" >
	                    <div class="uinp-more" onclick="selectBranchArea();">...</div>
	                </div>
	            </div> -->
       	</form>
        <div class="ub ub-f1  umar-t8 umar-b8">
			<table id="gridOrders"></table>
		</div>
    </div>

</body>
</html>
