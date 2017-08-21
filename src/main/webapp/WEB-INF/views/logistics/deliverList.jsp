<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>物流销售单导出</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/logistics/deliverList.js?V=${versionNo}"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	            	<shiro:hasPermission name="JxcDeliverDaLogistic:search">
						<div class="ubtns-item" onclick="queryForm()">查询</div>
				   	</shiro:hasPermission>
	<!-- <shiro:hasPermission name="JxcDeliverDaLogistic:export">
						<div class="ubtns-item" onclick="exportDataList()">导出</div>
					</shiro:hasPermission> -->
	                <div class="ubtns-item" id="set" onclick="gFunRefresh()" >重置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
	        	<div class="ub ub-ac umar-l20">
	        	 <!-- 引入时间选择控件 -->
	            <%@ include file="/WEB-INF/views/component/dateSelectHour.jsp"%>
	            </div>
			</div>
	            <div class="ub umar-t8">
	                <div class="ub ub-ac">
	                    <div class="umar-r10 uw-70 ut-r">要货机构:</div>
	                    <input type="hidden" id="targetBranchId" name="targetBranchId"/>
	                    <input type="hidden" id="targetBranchType" name="targetBranchType" />
	                    <input class="uinp ub ub-f1" type="text" id="targetBranchName" name="targetBranchName" onblur="clearBranchCode(this,'targetBranchId')"/>
	                    <div class="uinp-more" onclick="selectTargetBranch()" >...</div>
	                </div>
	                <div class="ub ub-ac umar-l64">
	                    <div class="umar-r10 uw-70 ut-r">制单人员:</div>
	                    <input type="hidden" id="operateUserId" name="operateUserId" />
	                    <input class="uinp ub ub-f1" type="text" id="operateUserName" name="operateUserName" type="text" />
	                    <div class="uinp-more" onclick="selectOperator()">...</div>
	                </div>
	            </div>
	            <div class="ub umar-t8">
	                <div class="ub ub-ac">
	                    <div class="umar-r10 uw-70 ut-r">发货机构:</div>
	                    <input type="hidden" id="sourceBranchId" name="sourceBranchId"/>
	                    <input class="uinp ub ub-f1" type="text" id="sourceBranchName" name="sourceBranchName" onblur="clearBranchCode(this,'sourceBranchId')"/>
	                    <div class="uinp-more" onclick="selectSourceBranch()" >...</div>
	                </div>
	                <div class="ub ub-ac umar-l64">
	                    <div class="umar-r10 uw-70 ut-r">单据编号:</div>
	                    <input type="hidden" id="deliverType" name="deliverType" value="DA" />
	                    <input class="uinp" type="text" id="formNo" name="formNo">
	                </div>
	                <div class="ub ub-ac umar-l40">
						<input type='checkbox' id='checkboxTime' name='checkboxTime' />
	                    <div class="umar-r10 uw-70 ut-r">结束时间:</div>
						<input class='Wdate' style='width: 212px' readonly='readonly' name='tempEndTime' id='popupSearchDateTime' onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'})" />
	                </div>
	            </div>
       	</form>
        <div class="ub ub-f1  umar-t8 umar-b8">
			<table id="deliverFormList"></table>
		</div>
    </div>

</body>
</html>
