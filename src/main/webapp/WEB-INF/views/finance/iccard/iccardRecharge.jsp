
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<title>一卡通充值</title>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<script src="${ctx}/static/js/views/finance/iccard/icCardRecharge.js?V=1"></script>

<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			<button class="ubtns-item" onclick="save()" id="saveBtn">保存</button>
			<button class="ubtns-item" onclick="closeRechargeDialog()">关闭</button>
		</div>
	</div>
	<div class="ub uline"></div>
	<form id="cardRecharge">
		<div class="ub ub-ver upad-4">
			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">充值店铺:</div>
					<input class="uinp ub ub-f1" type="text" id="financeCode"
						name="financeCode" value="${financeFormVo.financeCode}"
						maxlength="50" />
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">当前余额:</div>
					<input class="uinp ub ub-f1" type="text" id="financeName"
						name="financeName" value="${financeFormVo.financeName}"
						maxlength="50" />
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">充值金额:</div>
					<input class="uinp ub ub-f1" type="text" id="description"
						name="description" value="${financeFormVo.description}"
						maxlength="50" />
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">充值方式:</div>
					<select class="uselect easyui-combobox" style="width: 204px;"
						data-options="editable:false" name="rechargeType"
						id="rechargeType">
						<option value="1">银行转账</option>
						<option value="2">微信转账</option>
						<option value="3">支付宝转账</option>
						<option value="4">现金</option>
						<option value="5">其他</option>
					</select>
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">充值后金额:</div>
					<input class="uinp ub ub-f1" type="text" id="description"
						name="description" value="${financeFormVo.description}"
						maxlength="50" readOnly />
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">备注:</div>
					<input class="uinp ub ub-f1" type="text" id="description"
						name="description" value="${financeFormVo.description}"
						maxlength="50" readOnly />
				</div>
			</div>

		</div>
	</form>
</div>

