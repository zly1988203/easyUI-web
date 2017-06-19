<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>退货申请-详情</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script  src="${ctx}/static/js/views/deliver/refund/DrView.js?V=${versionNo}"></script>
<script src="${ctx}/static/js/views/deliver/deliverExport.js?V=${versionNo}"></script>
<%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4  ubor">
		<input type='hidden' id="pageStatus" value="edit">
		<form action="" id="queryForm" method="post">
			<div class="ub ub-ac upad-4">
				<div class="ubtns">
					<shiro:hasPermission name="JxcDeliverDR:add">
						<div class="ubtns-item" onclick="addDeliverDR()">新增</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcDeliverDR:save">
						<div class="ubtns-item-disabled">保存</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcDeliverDR:audit">
						<div class="ubtns-item-disabled">审核</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcDeliverDR:delete">
						<div class="ubtns-item-disabled">删除</div>
					</shiro:hasPermission>
					<div class="ubtns-item-disabled">商品选择</div>
					<div class="ubtns-item-disabled">导入货号</div>
					<div class="ubtns-item-disabled">导入条码</div>
					<shiro:hasPermission name="JxcDeliverDR:export">
						<div class="ubtns-item" onclick="exportData('DR','saleReturnAddForm')">导出</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcDeliverDR:print">
						<div class="ubtns-item" onclick="printChoose('DR','/form/deliverForm/')">打印</div>
					</shiro:hasPermission>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>
			</div>
			<div class="already-examine" id="already-examine"><span>${status}</span></div>
			<div class="ub umar-t8 uc-black">【单号】:<span>${form.formNo}</span></div>
			<div class="ub umar-t8 uline"></div>
			<div class="ub umar-t10">
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">制单机构:</div>
					<input type="hidden" id="formId" value="${form.deliverFormId}">
               	   	<input type="hidden" id="formNo" value="${form.formNo}">
					<input type="hidden" name="sourceBranchId" id="sourceBranchId" class="uinp" value="${form.sourceBranchId}" />
					<input type="hidden" id="sourceBranchType" name="sourceBranchType" value="${form.sourceBranchType}" />
					<input type="text" name="sourceBranchName" id="sourceBranchName" class="uinp  ub ub-f1" readonly="readonly" 
						value="[${form.sourceBranchCode}]${form.sourceBranchName}"/>
				</div>
				<div class="ub ub-ac uw-300  umar-l80">
					<div class="umar-r10 uw-80 ut-r">制单人员:</div>
					<div class="utxt">${form.createUserName}</div>
				</div>
				<div class="ub ub-ac umar-l10">
					<div class="umar-r10 uw-60 ut-r">制单时间:</div>
					<div class="utxt" id="createTime"><fmt:formatDate value="${form.createTime}" pattern="yyyy-MM-dd HH:mm"/></div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">收货机构:</div>
					<!--注意修改收货机构的name id-->
					<input type="hidden" name="targetBranchId" id="targetBranchId" class="uinp" value="${form.targetBranchId}" />
					<input type="hidden" id="targetBranchType" name="targetBranchType" value="${form.targetBranchType}" />
					<input type="text" name="targetBranchName" id="targetBranchName"class="uinp  ub ub-f1" readonly="readonly" 
						value="[${form.targetBranchCode}]${form.targetBranchName}" />
				</div>
				<div class="ub ub-ac uw-300 umar-l80">
					<div class="umar-r10 uw-80 ut-r">修改人员:</div>
					<div class="utxt">${form.updateUserName}</div>
				</div>
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">修改时间:</div>
					<div class="utxt"><fmt:formatDate value="${form.updateTime}" pattern="yyyy-MM-dd HH:mm"/></div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:</div>
					<input class="uinp ub ub-f1" type="text" id="remark" name="remark" value="${form.remark}" readonly="readonly">
				</div>
				<div class="ub ub-ac uw-300 umar-l80">
					<div class="umar-r10 uw-80 ut-r">审核人员:</div>
					<div class="utxt">${form.validUserName}</div>
				</div>
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">审核时间:</div>
					<div class="utxt"><fmt:formatDate value="${form.validTime}" pattern="yyyy-MM-dd HH:mm"/></div>
				</div>
			</div>
		</form>
		<!--datagrid-edit-->
		<div class="ub ub-f1 datagrid-edit umar-t8">
			<table id="saleReturnAddForm"></table>
		</div>
	</div>
</body>
</html>
