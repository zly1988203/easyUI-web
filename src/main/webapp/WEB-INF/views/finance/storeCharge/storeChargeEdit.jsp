
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>机构费用-编辑查看</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script
	src="${ctx}/static/js/views/finance/storeCharge/storeChargeMain.js?V=1"></script>
<style>
.datagrid-header .datagrid-cell {
	text-align: center !important;
	font-weight: bold;
}
</style>
</head>
<body class="ub ub-ver uw uh ufs-14 uc-black">
	<input type='hidden' id="chargeStatus" name="chargeStatus" value="${chargeStatus }">
	<div class="ub ub-ver ub-f1 umar-4 ubor">
		<div class="ub ub-ac upad-4">
			<div class="ubtns">
				<div class="ubtns-item" onclick="storeChargeAdd()">新增</div>
				<c:if test="${ 'edit' eq chargeStatus }">
					<shiro:hasPermission name="JxcPurchaseOrder:add">
						<div class="ubtns-item" onclick="saveStoreCharge()">保存</div>
					</shiro:hasPermission>
					<div class="ubtns-item" onclick="chargeCheck()">审核</div>
					<div class="ubtns-item" onclick="selectCharge()">费用选择</div>
					<div class="ubtns-item" onclick="toImportStoreCharge()">费用导入</div>
					<div class="ubtns-item" onclick="chargeDelete()">删除</div>
				</c:if>
				<c:if test="${ 'check' eq chargeStatus }">
					<shiro:hasPermission name="JxcPurchaseOrder:add">
						<div class="ubtns-item-disabled" >保存</div>
					</shiro:hasPermission>
					<div class="ubtns-item-disabled" >审核</div>
					<div class="ubtns-item-disabled" >费用选择</div>
					<div class="ubtns-item-disabled" >费用导入</div>
					<div class="ubtns-item-disabled" >删除</div>
				</c:if>
				
				<div class="ubtns-item" onclick="toClose()">关闭</div>
			</div>
		</div>
		【单号】:<span>${form.formNo}</span>
	
		<div class="ub uline umar-t8"></div>
		<input type="hidden" id="formId" value="${form.id}">
		<input type="hidden" id="formNo" value="${form.formNo}">
			
		<div class="already-examine" id="already-examine"><span>已审核</span></div>
		<form id="formAdd">
			<div class="ub ub-ver upad-8">
				<div class="ub umar-t8">
					<div class="ub ub-ac umar-r80">
						<div class="umar-r10 uw-60 ut-r">机构名称:</div>
						<input name="branchId" id="branchId" type="hidden" value="${form.branchId }">
						<input name="branchCode" id="branchCode" type="hidden" value="${form.branchCode }">
						<input class="uinp" id="branchName" name="branchName" disabled="disabled" type="text" value="${form.branchName}">
					</div>
					<div class="ub ub-ac umar-r80">
						<div class="umar-r10 uw-60 ut-r">月份:</div>
						<input class="Wdate uw-300 uinp-no-more"
							name="month" id="chargeMonth"  value="${form.month}" disabled="disabled"/>
					</div>
					<div class="ub ub-ac umar-r80">
						<div class="umar-r10 uw-60 ut-r">制单人员:</div>
						<div class="utxt">${form.createUserName }</div>
					</div>
					<div class="ub ub-ac">
						<div class="umar-r10 uw-60 ut-r">制单时间:</div>
						<div class="utxt" id="createTime"><fmt:formatDate value="${form.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></div>
					</div>
				</div>
				<div class="ub umar-t8">
					<div class="ub ub-ac uw-624 umar-r80">
						<div class="umar-r10 uw-60 ut-r">备注:</div>
						<input class="uinp ub ub-f1" name="remark" id="remark" type="text"
							onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
							onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
							oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
							maxlength="100"  value="${form.remark}">
					</div>
		
					<div class="ub ub-ac umar-r80">
						<div class="umar-r10 uw-60 ut-r">审核人员:</div>
						<div class="utxt">${form.auditUserName }</div>
					</div>
					<div class="ub ub-ac">
						<div class="umar-r10 uw-60 ut-r">审核时间:</div>
						<div class="utxt"><fmt:formatDate value="${form.auditTime}" pattern="yyyy-MM-dd HH:mm:ss"/></div>
					</div>
				</div>
		
			</div>
		</form>
	</div>
	
	<div class="ub uw umar-t8 ub-f1">
		<table id="gridStoreCharge"></table>
	</div>

</body>
</html>