<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>商品查询</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<script src="${ctx}/static/js/views/integral/exchangeRecodeList.js"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub  ub-f1 umar-4 upad-4">
     <div class="ub ub-ver ub-f1 upad-4">
		<form id="queryForm" method="post">
			<div class="ub ub-ac">
				<div class="ubtns">
					<shiro:hasPermission name="jxcGiftExchangeRecod:search">
						<div class="ubtns-item" onclick="query()">查询</div>
	                </shiro:hasPermission>
					<shiro:hasPermission name="jxcGiftExchangeRecod:export">
						<div class="ubtns-item" onclick="exportData()">导出</div>
		            </shiro:hasPermission>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">退出</div>
				</div>
				    <!-- 引入时间选择控件 -->
	               <%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>
			
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<input type="hidden" name="startCount" id="startCount" class="uinp" />
					<input type="hidden" name="endCount" id="endCount" class="uinp" />
					<div class="ub ub-ac">
	                    <div class="umar-r10 uw-70 ut-r">货号/条码:</div>
	                    <input class="uinp" name="skuCode" type="text" maxlength="20">
	                </div>
	                <div class="ub ub-ac">
	                    <div class="umar-r10 uw-70 ut-r">礼品名称:</div>
	                    <input class="uinp" name="skuName" type="text" maxlength="20">
	                </div>
	                <div class="ub ub-ac">
	                    <div class="umar-r10 uw-70 ut-r">机构:</div>
	                    <input type="text" name="branchName" id="branchName" class="uinp" maxlength="50"/>
					    <div class="uinp-more" onclick="searchBranch()">...</div>
	                </div>
	                <div class="ub ub-ac">
	                    <div class="umar-r10 uw-70 ut-r">会员号:</div>
	                    <input class="uinp" name="mobile" id="mobile" type="text" maxlength="20">
	                </div>
				</div>
			</div>
		 </form>
		 <div class="ub">&nbsp;</div>
		 <div class="ub ub-f1">
		 	<table id="goodsTab"></table>
		 </div>
	 </div>
	</div>
</body>
</html>