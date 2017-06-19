<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>

<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>成本调整单-列表</title>
	<%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script  src="${ctx}/static/js/views/cost/costAdjustList.js?V=${versionNo}"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	                <div class="ubtns-item" onclick="queryForm()">查询</div>
	                <shiro:hasPermission name="JxcCostAdjust:add">
	                	<div class="ubtns-item" onclick="addStockForm()">新增</div>
	                </shiro:hasPermission>
	                <!-- <div class="ubtns-item" onclick="delStockForm()">删单</div> -->
	               <%--  <shiro:hasPermission name="JxcCostAdjust:export">
	                	<div class="ubtns-item" onClick="exportExcel()">导出</div>
	                </shiro:hasPermission>
	                <shiro:hasPermission name="JxcCostAdjust:print">
	                	<div class="ubtns-item" onClick="printDesign()">打印</div>
	                </shiro:hasPermission> --%>
	                <div class="ubtns-item" id="set" onclick="gFunRefresh()" >重置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
			<!-- 引入时间选择控件 -->
			<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
	</div>
	            <div class="ub umar-t8">
	                <div class="ub ub-ac">
	                    <div class="umar-r10 uw-70 ut-r">单号:</div>
	                    <!-- <input type="hidden" id="adjustNo" name="adjustNo"  /> -->
	                    <input class="uinp" type="text" id="adjustNo" name="adjustNo">
	                </div>
	              
	                <div class="ub ub-ac uw-300 umar-l40">
	                    <div class="umar-r10 uw-70 ut-r">机构名称:</div>
	                    <input type="hidden" id="branchId" name="branchId" />
	                    <input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" onclick="selectBranches()" readonly="readonly" />
	                    <div class="uinp-more" onclick="selectBranches()" >...</div>
	                </div>
	            </div>
	            <div class="ub umar-t8">
	                <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-70 ut-r">操作员:</div>
	                <input class="uinp" name="operateUserId" id="operateUserId" type="hidden">
	                <input class="uinp" id="operateUserName" type="text" readonly="readonly" onclick="selectOperator()" >
	                <div class="uinp-more" onclick="selectOperator()">...</div>
	            </div>
	                <!--input-checkbox-->
	                <div class="ub ub-ac umar-l40 uw-300">
	                    <div class="umar-r10 uw-70 ut-r">审核状态:</div>
	                    <div class="ub ub-ac umar-r10">
							<label>
							<input type="radio" name="status"  value="1"/><span>已审核</span>
							</label>

	                    </div>
	                    <div class="ub ub-ac umar-r10">
							<label>
							<input type="radio" name="status" value="0" checked="checked"/><span>未审核</span>
							</label>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
							<label>
							<input type="radio" name="status" value=""  /><span>全部</span>
							</label>
	                    </div>
	                </div>
	            </div>
	        
       	</form>
        <div class="ub ub-f1  umar-t8 umar-b8">
			<table id="costFromList"></table>
		</div>
    </div>
</body>
</html>