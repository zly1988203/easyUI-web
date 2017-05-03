<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>退货单-新增</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/purchase/returnAdd.js?1=3"></script>

</head>
<body class=" uw uh ufs-14 uc-black upad-4 box-border">
	<input type='hidden' id="cascadeGoods" name="cascadeGoods" value="${cascadeGoods}">
	<div class="ub uh ub-ver ub-f1  ubor">
		<div class="ub  ub-ac upad-4">
			<div class="ubtns">
				<shiro:hasPermission name="JxcPurchaseRefund:add">
					<div class="ubtns-item" onclick="saveItemHandel()">保存</div>
				</shiro:hasPermission>
				<div class="ubtns-item" onclick="selectGoods()">商品选择</div>
				<div class="ubtns-item" onclick="toImportproduct(0)">导入货号</div>
				<div class="ubtns-item" onclick="toImportproduct(1)">导入条码</div>
				<div class="ubtns-item" onclick="toClose()">关闭</div>
			</div>
		</div>
		<form id="formAdd">
			<div class="ub umar-t8">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-60 ut-r">供应商:</div>
					<input class="uinp" name="supplierId" id="supplierId" type="hidden">
					<input id="supplierName" class="uinp  easyui-validatebox"  type="text"
						onclick="selectSupplier()">
					<div class="uinp-more" onclick="selectSupplier()">...</div>
				</div>
				<i class="ub ub-ac uc-red">*</i>
				<div class="ub ub-ac umar-l80">
					<div class="umar-r10 uw-60 ut-r">付款期限:</div>
					<input id="paymentTime" class="Wdate easyui-validatebox"  type="text"
						onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})"
						value="${form.paymentTime}" />
				</div>
				<div class="ub ub-ac umar-l80">
					<div class="umar-r10 uw-60 ut-r">制单人员:</div>
					<div class="utxt"><%=UserUtil.getCurrentUser().getUserName()%></div>
				</div>
				<div class="ub ub-ac">
					<div class="umar-r10 uw-60 ut-r">制单时间:</div>
					<div class="utxt" id="createTime"></div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-60 ut-r">退货机构:</div>
					<input class="uinp" name="branchId" id="branchId" type="hidden">
					<input name="branchType" id="branchType" type="hidden">
					<input id="branchName" class="uinp  easyui-validatebox" type="text" onclick="selectBranch()">
					<div class="uinp-more" onclick="selectBranch()">...</div>
				</div>
				<i class="ub ub-ac uc-red">*</i>
				<div class="ub ub-ac umar-l80">
					<div class="umar-r10 uw-60 ut-r">采购员:</div>
					<input class="uinp" name="salesmanId" id="salesmanId" type="hidden">
					<input class="uinp" id="operateUserName" type="text"
						readonly="readonly" onclick="selectOperator()">
					<div class="uinp-more" onclick="selectOperator()">...</div>
				</div>
				<div class="ub ub-ac umar-l80">
					<div class="umar-r10 uw-60 ut-r">审核人员:</div>
					<div class="utxt"></div>
				</div>
				<div class="ub ub-ac">
					<div class="umar-r10 uw-60 ut-r">审核时间:</div>
					<div class="utxt"></div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-60 ut-r">原单类型:</div>
					<div class="ub uw-200">
						<div class="ub ub-ac umar-r10">
							<label>
							<input type="radio" name="refFormNoType" value="PI"
							checked="checked" /><span>收货单 </span>
							</label>

						</div>
						<div class="ub ub-ac umar-r10">
							<label>
							<input  type="radio" name="refFormNoType" value="DI" /><span>直调入库单
							</span>
							</label>

						</div>
					</div>

				</div>
				<div class="ub ub-ac umar-l88">
					<div class="umar-r10 uw-60 ut-r">原单号:</div>
					<input type="hidden" id="refFormId" name="refFormId" /> <input
						id="refFormNo" class="uinp" type="text" readonly="readonly"
						onclick="selectForm()">
					<div class="uinp-more" onclick="selectForm()">...</div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r80">
					<div class="umar-r10 uw-60 ut-r">备注:</div>
					<input id="remark" class="uinp" type="text" style="width: 800px">
				</div>
			</div>
		</form>
		<div class="ub ub-f1 datagrid-edit umar-t8">
			<table id="gridEditOrder"></table>
		</div>

	</div>
	
	<!-- 是否有改价权限 -->
	<shiro:hasPermission name="JxcPurchaseRefund:updatePrice">
		<input type="hidden" id="allowUpdatePrice" />
	</shiro:hasPermission>
</body>
</html>