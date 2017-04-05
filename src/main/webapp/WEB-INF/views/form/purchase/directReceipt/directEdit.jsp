<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>编辑直送收货单</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/purchase/directReceipt/directReceipt.js"></script>
<%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<input type='hidden' id="directStatus" value="${form.status}">
	<input type='hidden' id="cascadeGoods" name="cascadeGoods" value="cascadeGoods">
	  <div class="ub ub-ver ub-f1 umar-4  ubor">
		<div class="ub ub-ac upad-4">
			<div class="ubtns">
				<shiro:hasPermission name="JxcDirectReceipt:add">
					<div class="ubtns-item" onclick="addDirect()">新增</div>
				</shiro:hasPermission>
				<shiro:hasPermission name="JxcDirectReceipt:edit">
					<button id="btnSave" class="ubtns-item" onclick="updateDirectForm()">保存</button>
				</shiro:hasPermission>
				<shiro:hasPermission name="JxcDirectReceipt:audit">
					<button id="btnCheck" class="ubtns-item" onclick="checkDirectForm()">审核</button>
				</shiro:hasPermission>
				<button id="btnSelect" class="ubtns-item" onclick="selectGoods()">商品选择</button>
				<shiro:hasPermission name="JxcDirectReceipt:import">
					<button id="btnImpSkuCode" class="ubtns-item" onclick="importDirectForm(1)">导入货号</button>
					<button id="btnImpBarCode" class="ubtns-item" onclick="importDirectForm(1)">导入条码</button>
				</shiro:hasPermission>				
				<shiro:hasPermission name="JxcDirectReceipt:export">
					<div class="ubtns-item" id="exportdetail" onclick="exportDirectForm()">导出</div>
				</shiro:hasPermission>
				<shiro:hasPermission name="JxcDirectReceipt:print">
					<div class="ubtns-item" onclick="printChoose('PM','/directReceipt/')">打印</div>
				</shiro:hasPermission>
				<shiro:hasPermission name="JxcDirectReceipt:setting">
					<div class="ubtns-item-disabled">设置</div>
				</shiro:hasPermission>
				<div class="ubtns-item" onclick="toClose()">关闭</div>
			</div>
		</div>
		<div class="ub umar-t8 uc-black umar-l16">【单号】:<span>${form.formNo}</span></div>
		<c:if test="${form.status != 0}">
			<div class="already-examine" id="already-examine">
				<span>已审核</span>
			</div>
		</c:if>
		<form id="addqueryForm" action="" method="post">
			<input type="hidden" id="formId" value="${form.id}">
			<input type="hidden" id="formNo" value="${form.formNo}">
			<div class="ub umar-t10">
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">供应商:</div>
					<input class="uinp" name="supplierId" id="supplierId" type="hidden" value="${form.supplierId}"> <input
						class="uinp ub ub-f1"  id="supplierName" type="text" onclick="selectSupplier()"
						value="${form.supplierName}" readonly="readonly">
					<div class="uinp-more" onclick="selectSupplier()">...</div>

				</div>
				<div class="ub ub-ac uselectw uw-300 umar-l10">
					<div class="umar-r10 uw-70 ut-r">经营方式:</div>
					<input id="saleWay" class="uinp ub ub-f1" type="hidden" value="${form.saleWay}">
					<input id="saleWayName" class="uinp" type="text" readonly="readonly">
				</div>
				<div class="ub ub-ac umar-l10 uw-300 ">
					<div class="umar-r10 uw-70 ut-r">制单人员:</div>
					<div class="utxt">${form.createUserName}</div>
				</div>
				<div class="ub ub-ac umar-l10">
					<div class="umar-r10 uw-60 ut-r">制单时间:</div>
					<div class="utxt">
						<fmt:formatDate value="${form.createTime}" pattern="yyyy-MM-dd HH:mm" />
					</div>
				</div>
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">收货机构:</div>
					<input class="uinp " name="branchId" id="branchId" type="hidden" value="${form.branchId}">
					<input class="uinp ub ub-f1" id="branchName" type="text" readonly="readonly" value="[${form.branchCode}]${form.branchName}">
				</div>

				<div class="ub ub-ac umar-l10 uw-300"></div>

				<div class="ub ub-ac  uw-310">
					<div class="umar-r10 uw-80 ut-r">最后修改人:</div>
					<div class="utxt">${form.updateUserName}</div>
				</div>
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">修改时间:</div>
					<div class="utxt">
						<fmt:formatDate value="${form.updateTime}" pattern="yyyy-MM-dd HH:mm" />
					</div>
				</div>

			</div>

			<div class="ub umar-t8">

				<div class="ub ub-ac uw-592">
					<div class="umar-r10 uw-70 ut-r">备注:</div>
					<input class="uinp ub ub-f1" type="text" id="remark" name="remark" value="${form.remark}" maxlength="40">
				</div>

				<div class="ub ub-ac umar-l30 uw-300">
					<div class="umar-r10 uw-70 ut-r">审核人员:</div>
					<div class="utxt">${form.validUserName}</div>
				</div>
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">审核时间:</div>
					<div class="utxt">
						<fmt:formatDate value="${form.validTime}" pattern="yyyy-MM-dd HH:mm" />
					</div>
				</div>
			</div>

		</form>
		<!--datagrid-edit-->
		 <div class="ub ub-f1 datagrid-edit umar-t8">
			<table id="gridDirectDetail"></table>
		</div>
	</div>

</body>
</html>