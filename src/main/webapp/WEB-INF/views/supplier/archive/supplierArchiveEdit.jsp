<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script  src="${ctx}/static/js/views/supplier/archive/supplierArchiveEdit.js"></script>
<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			<button class="ubtns-item" onclick="saveHandel()">保存</button>
			<button class="ubtns-item" onclick="saveHandel()">复制</button>
			<button class="ubtns-item" onclick="closeDialogHandel()">返回</button>
		</div>
	</div>
	<div class="ub uline"></div>
	<form id="formAdd" method="post">
		<div class="ub ub-ver upad-4">
			<div class="ub upad-4">
				<div class="ub ub-ac umar-r60">
					<div class="umar-r10 uw-60 ut-r">供应商编号:</div>
					<input id="skuCode" name="skuCode" class="uinp uw-200" readonly="readonly" type="text" value="${data.skuCode}">
				</div>
				<div class="ub ub-ac umar-r50">
					<div class="umar-r10 uw-60 ut-r">供应商名称:</div>
					<input id="skuName" name="skuName" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
					<i class="uc-red">*</i>
				</div>
			</div>
			<div class="ub upad-4">
				<div class="ub ub-ac umar-r48">
					<div class="umar-r10 uw-60 ut-r">所属机构:</div>
					<input id="purchaseSpec" name="purchaseSpec" class="uinp easyui-numberbox easyui-validatebox " data-options="min:0.01,precision:2"  type="text" value="1"  onkeyup="checkInteger(this)" onafterpaste="checkInteger(this)" data-options="required:true" >
					<i class="uc-red">*</i>
				</div>
				<div class="ub ub-ac umar-r60">
					<div class="umar-r10 uw-60 ut-r">经营方式:</div>
					<select class="uselect easyui-combobox" name="unit" id="unit" data-options="onChange:onChangeUnit">
						<option value="1">购销</option>
						<option value="2">联营</option>
						<option value="3">代销</option>
						<option value="4">扣率代销</option>
					</select>
				</div>
			</div>

			<div class="ub upad-4">
				<div class="ub ub-ac umar-r60">
					<div class="umar-r10 uw-60 ut-r">营业执照号:</div>
					<input id="" name="skuCode" class="uinp uw-200" readonly="readonly" type="text" value="${data.skuCode}">
				</div>
				<div class="ub ub-ac umar-r50">
					<div class="umar-r10 uw-60 ut-r">组织机构代码:</div>
					<input id="" name="skuName" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
					<i class="uc-red">*</i>
				</div>
			</div>

			<div class="ub upad-4">
				<div class="ub ub-ac umar-r60">
					<div class="umar-r10 uw-60 ut-r">地税登记号:</div>
					<input id="" name="skuCode" class="uinp uw-200" readonly="readonly" type="text" value="${data.skuCode}">
				</div>
				<div class="ub ub-ac umar-r50">
					<div class="umar-r10 uw-60 ut-r">国税登记号:</div>
					<input id="" name="skuName" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
					<i class="uc-red">*</i>
				</div>
			</div>

			<div class="ub upad-4">
				<div class="ub ub-ac umar-r60">
					<div class="umar-r10 uw-60 ut-r">办公地址:</div>
					<input id="" name="skuCode" class="uinp uw-200" readonly="readonly" type="text" value="${data.skuCode}">
				</div>
				<div class="ub ub-ac umar-r50">
					<div class="umar-r10 uw-60 ut-r">纳税人识别号:</div>
					<input id="" name="skuName" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
					<i class="uc-red">*</i>
				</div>
			</div>

			<div class="ub upad-4">
				<div class="ub ub-ac umar-r60">
					<div class="umar-r10 uw-60 ut-r">税票类型:</div>
					<select class="uselect easyui-combobox" name="unit" id="unit" data-options="onChange:onChangeUnit">
						<option selected="" value="增值税普通发票17%">增值税普通发票17%</option>
						<option value="增值税普通发票13%">增值税普通发票13%</option>
						<option value="增值税普通发票3%">增值税普通发票3%</option>
						<option value="增值税普通发票0%">增值税普通发票0%</option>
						<option value="增值税专用发票17%">增值税专用发票17%</option>
						<option value="增值税专用发票13%">增值税专用发票13%</option>
						<option value="增值税专用发票3%">增值税专用发票3%</option>
						<option value="通用机打发票">通用机打发票</option>
						<option value="收据">收据</option>
						<option value="其他">其他</option>
					</select>
				</div>
				<div class="ub ub-ac umar-r50">
					<div class="umar-r10 uw-60 ut-r">银行账户名称:</div>
					<input id="" name="skuName" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
					<i class="uc-red">*</i>
				</div>
			</div>

			<div class="ub upad-4">
				<div class="ub ub-ac umar-r60">
					<div class="umar-r10 uw-60 ut-r">开户银行:</div>
					<input id="" name="skuCode" class="uinp uw-200" readonly="readonly" type="text" value="${data.skuCode}">
				</div>
				<div class="ub ub-ac umar-r50">
					<div class="umar-r10 uw-60 ut-r">银行账号:</div>
					<input id="" name="skuName" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
					<i class="uc-red">*</i>
				</div>
			</div>

			<div class="ub upad-4">
				<div class="ub ub-ac umar-r60">
					<div class="umar-r10 uw-60 ut-r">联系人:</div>
					<input id="" name="skuCode" class="uinp uw-200" readonly="readonly" type="text" value="${data.skuCode}">
				</div>
				<div class="ub ub-ac umar-r50">
					<div class="umar-r10 uw-60 ut-r">电话号码:</div>
					<input id="" name="skuName" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
					<i class="uc-red">*</i>
				</div>
			</div>

			<div class="ub upad-4">
				<div class="ub ub-ac umar-r60">
					<div class="umar-r10 uw-60 ut-r">手机号码:</div>
					<input id="" name="skuCode" class="uinp uw-200" readonly="readonly" type="text" value="${data.skuCode}">
				</div>
				<div class="ub ub-ac umar-r50">
					<div class="umar-r10 uw-60 ut-r">E-mail地址:</div>
					<input id="" name="skuName" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
					<i class="uc-red">*</i>
				</div>
			</div>

			<div class="ub upad-4">
				<div class="ub ub-ac umar-r60">
					<div class="umar-r10 uw-60 ut-r">合同时间:</div>
					<input id="" name="skuCode" class="uinp uw-200" readonly="readonly" type="text" value="${data.skuCode}">
				</div>
				<div class="ub ub-ac umar-r50">
					<div class="umar-r10 uw-60 ut-r">送货周期:</div>
					<input id="" name="skuName" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
					<i class="uc-red">*</i>
				</div>
			</div>

			<div class="ub upad-4">
				<div class="ub ub-ac umar-r60">
					<div class="umar-r10 uw-60 ut-r">品牌:</div>
					<input id="" name="skuCode" class="uinp uw-200" readonly="readonly" type="text" value="${data.skuCode}">
				</div>
				<div class="ub ub-ac umar-r50">
					<div class="umar-r10 uw-60 ut-r">送货时间:</div>
					<select class="uselect easyui-combobox" name="unit" id="unit" data-options="onChange:onChangeUnit">
						<option value="上午">上午</option>
						<option value="下午">下午</option>
						<option value="晚上">晚上</option>
						<option value="凌晨">凌晨</option>
					</select>
				</div>
			</div>

			<div class="ub upad-4">
				<div class="ub ub-ac umar-r60">
					<div class="umar-r10 uw-60 ut-r">结算方式:</div>
					<select class="uselect easyui-combobox" name="unit" id="unit" data-options="onChange:onChangeUnit">
						<option selected="" value="货到付款">货到付款</option>
						<option value="临时指定">临时指定</option>
						<option value="指定日期">指定日期</option>
						<option value="指定账期">指定账期</option>
					</select>
				</div>
				<div class="ub ub-ac umar-r50">
					<div class="umar-r10 uw-60 ut-r">起订限制:</div>
					<input id="" name="skuName" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
					<i class="uc-red">*</i>
				</div>
			</div>


			<div class="ub upad-4">
				<div class="ub ub-ac umar-r60">
					<div class="umar-r10 uw-60 ut-r">SKU数:</div>
					<input id="" name="skuCode" class="uinp uw-200" readonly="readonly" type="text" value="${data.skuCode}">
				</div>
				<div class="ub ub-ac umar-r50">
					<div class="umar-r10 uw-60 ut-r">采购人员:</div>
					<input id="" name="skuName" class="uinp easyui-validatebox" data-options="required:true" maxlength="20">
					<i class="uc-red">*</i>
				</div>
			</div>

			<div class="ub upad-4">
				<div class="ub ub-ac umar-r60">
					<div class="umar-r10 uw-60 ut-r">备注:</div>
					<input id="" name="skuCode" class="uinp " readonly="readonly" type="text" value="${data.skuCode}">
				</div>
			</div>


		</div>
	</form>
</div>