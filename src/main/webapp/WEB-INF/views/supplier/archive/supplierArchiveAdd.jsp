<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script  src="${ctx}/static/js/views/supplier/archive/supplierArchiveAdd.js"></script>
<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			<button class="ubtns-item" onclick="saveSupplier()">保存</button>
			<button class="ubtns-item" onclick="closeDialogHandel()">返回</button>
		</div>
	</div>
	<div class="ub uline"></div>
	<form id="formAdd" method="post">
		<div class="ub ub-ver upad-4">
			<div class="ub upad-4">
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">供应商编号:</div>
					<input id="skuCode" name="skuCode" class="uinp uw-200"  type="text" value="${data.skuCode}">
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">供应商名称<i class="uc-red">*</i>:</div>
					<input id="supplierName" name="supplierName" class="uinp easyui-validatebox" data-options="required:true" maxlength="50">
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">所属机构<i class="uc-red">*</i>:</div>
					<input id="purchaseSpec" name="branchId" class="uinp easyui-validatebox " type="text"  data-options="required:true" >
				</div>
			</div>
			<div class="ub upad-4">
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">经营方式<i class="uc-red">*</i>:</div>
					<select class="uselect easyui-combobox" name="saleWay" id="saleWay">
						<c:forEach var="i" items="${saleWayEnums }">
							<option value="${i.name }">${i.value }</option>
						</c:forEach>
					</select>
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">所在区域<i class="uc-red">*</i>:</div>
					<select class="uselect easyui-combobox" name="saleWay" id="saleWay2">
						<c:forEach var="i" items="${saleWayEnums }">
							<option value="${i.name }">${i.value }</option>
						</c:forEach>
					</select>
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">办公地址<i class="uc-red">*</i>:</div>
					<input id="officeAddress" name="officeAddress" class="uinp uw-200"  type="text" value="${data.skuCode}">
				</div>


			</div>
			<div class="ub upad-4">
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">营业执照号<i class="uc-red">*</i>:</div>
					<input id="businessLicenseNum" name="businessLicenseNum" class="uinp uw-200"  type="text" value="${data.skuCode}">
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">组织机构代码<i class="uc-red">*</i>:</div>
					<input id="organizationCode" name="organizationCode" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">国税登记号<i class="uc-red">*</i>:</div>
					<input id="nationalTaxRegNum" name="nationalTaxRegNum" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
				</div>

			</div>

			<div class="ub upad-4">
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">地税登记号<i class="uc-red">*</i>:</div>
					<input id="localTaxRegNum" name="localTaxRegNum" class="uinp uw-200"  type="text" value="${data.skuCode}">
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">纳税人识别号<i class="uc-red">*</i>:</div>
					<input id="taxIdentificationNum" name="taxIdentificationNum" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">税票类型<i class="uc-red">*</i>:</div>
					<select class="uselect easyui-combobox" name="stampsType" id="stampsType" data-options="onChange:onChangeUnit">
						<option value="1">增值税普通发票17%</option>
						<option value="2">增值税普通发票13%</option>
						<option value="3">增值税普通发票3%</option>
						<option value="4">增值税普通发票0%</option>
						<option value="5">增值税专用发票17%</option>
						<option value="6">增值税专用发票13%</option>
						<option value="7">增值税专用发票3%</option>
						<option value="8">通用机打发票</option>
						<option value="9">收据</option>
						<option value="10">其他</option>
					</select>
				</div>
			</div>

			<div class="ub upad-4">
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">银行账户名称<i class="uc-red">*</i>:</div>
					<input id="bankAccountName" name="bankAccountName" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">开户银行<i class="uc-red">*</i>:</div>
					<input id="openAccountBank" name="openAccountBank" class="uinp uw-200"  type="text" value="${data.skuCode}">
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">银行账号<i class="uc-red">*</i>:</div>
					<input id="bankAccount" name="bankAccount" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">

				</div>

			</div>

			<div class="ub upad-4">
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">联系人<i class="uc-red">*</i>:</div>
					<input id="contcat" name="contcat" class="uinp uw-200"  type="text" value="${data.skuCode}">
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">电话号码<i class="uc-red">*</i>:</div>
					<input id="phone" name="phone" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">手机号码<i class="uc-red">*</i>:</div>
					<input id="mobile" name="mobile" class="uinp uw-200"  type="text" value="${data.skuCode}">
				</div>

			</div>

			<div class="ub upad-4">
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">E-mail地址<i class="uc-red">*</i>:</div>
					<input id="email" name="email" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">合同时间:</div>
					<input id="contractDate" name="contractDate" class="uinp uw-200"  type="text" value="${data.skuCode}">
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">采购人员:</div>
					<input id="purchaseStaffName" name="purchaseStaffName" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
				</div>


			</div>

			<div class="ub upad-4">
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">送货周期<i class="uc-red">*</i>:</div>
					<input id="diliveCycle" name="diliveCycle" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">送货时间:</div>
					<select class="uselect easyui-combobox" name="deliverTime" id="deliverTime" data-options="onChange:onChangeUnit">
						<option value="上午">上午</option>
						<option value="下午">下午</option>
						<option value="晚上">晚上</option>
						<option value="凌晨">凌晨</option>
					</select>
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">起订限制:</div>
					<input id="orderNumLimit" name="orderNumLimit" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
				</div>
			</div>
			<div class="ub upad-4">
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">结算方式<i class="uc-red">*</i>:</div>
					<select class="uselect easyui-combobox" name="balanceWay" id="balanceWay" data-options="onChange:onChangeUnit">
						<c:forEach var="i" items="${balanceWayEnums }">
							<option value="${i.value }">${i.name }</option>
						</c:forEach>
					</select>
				</div>

				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">结算周期<i class="uc-red">*</i>:</div>
					<input id="skuNum" name="skuNum" class="uinp uw-200"  type="text" value="${data.skuCode}">
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">月结账日期<i class="uc-red">*</i>:</div>
					<input id="skuNum" name="skuNum" class="uinp uw-200"  type="text" value="${data.skuCode}">
				</div>
			</div>

			<div class="ub upad-4">
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">冻结账款<i class="uc-red">*</i>:</div>
					<select class="uselect easyui-combobox" name="balanceWay" id="balanceWay" data-options="onChange:onChangeUnit">
						<option value="正常">正常</option>
						<option value="冻结">冻结</option>
					</select>
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">冻结业务<i class="uc-red">*</i>:</div>
					<select class="uselect easyui-combobox" name="balanceWay" id="balanceWay" data-options="onChange:onChangeUnit">
						<option value="正常">正常</option>
						<option value="冻结">冻结</option>
					</select>
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-100 ut-r">SKU数:</div>
					<input id="skuNum" name="skuNum" class="uinp uw-200"  type="text" value="${data.skuCode}">
				</div>
			</div>
			<div class="ub upad-4">
				<div class="ub ub-ac ub-f1">
					<div class="umar-r10 uw-100 ut-r">品牌:</div>
					<input id="brandName" name="brandName" class="uinp ub ub-f1"  type="text" value="${data.skuCode}">
				</div>
			</div>
			<div class="ub upad-4">
				<div class="ub ub-ac ub-f1">
					<div class="umar-r10 uw-100 ut-r">备注:</div>
					<input id="remark" name="remark" class="uinp ub ub-f1" type="text" value="${data.skuCode}">
				</div>
			</div>
			
		</div>
	</form>
</div>