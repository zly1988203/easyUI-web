<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>成本调价查询</title>
	<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/cost/costAdjustSearchList.js?V=${versionNo}"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<input type="hidden" id="columnsArr" value="<c:out value="${columnsArr}"/>">
			<div class="ub ub-ac">
	            <div class="ubtns">
	                <div class="ubtns-item" onclick="queryForm()">查询</div>
					<shiro:hasPermission name="JxcCostSearch:export">
	                	<div class="ubtns-item" onclick="exportData()">导出</div>
	                </shiro:hasPermission>
	                <div class="ubtns-item" id="set" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">关闭</div>
	            </div>
	            <!-- 引入时间选择控件 -->
	            <%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>
			<div class="ub uline umar-t8"></div>
			<div class="ub umar-t8">
				<div class="ub ub-ac" id="branchSelect">
					<div class="umar-r10 uw-70 ut-r">机构:</div>
					<input type="hidden" id="createBranchId" name="branchId"/>
					<input class="uinp ub ub-f1" type="text" id="branchName" maxlength="50"/>
					<div class="uinp-more">...</div>
				</div>
				<div class="ub ub-ac uw-300 umar-l20">
					<div class="umar-r10 uw-70 ut-r">单据编号:</div>
					<input class="uinp" type="text" name="formNo" id="formNo"/>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">货号:</div>
					<input class="uinp" type="text" name="skuCode" id="skuCode"/>
				</div>
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">商品名称:</div>
					<input class="uinp" type="text" name="skuName" id="skuName"/>
				</div>
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">审核人:</div>
					<input class="uinp" type="text" name="auditUserName" id="auditUserName" maxlength="50"/>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">查询类型:</div>
					<div class="ub ub-ac umar-r10">
						<label>
						<input class="radioItem" type="radio" name="reportType" onclick="initDatagrid()" value="1" checked="checked" /><span>商品汇总</span>
						</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<label>
						<input class="radioItem" type="radio" name="reportType" onclick="initDatagrid()" value="2" /><span>商品明细</span>
						</label>
					</div>
				</div>
			</div>
	    </form>
	    <div class="ub ub-f1  umar-t8 umar-b8">
			<table id="costAdjustSearchList"></table>
		</div>
	</div>
</body>
</html>