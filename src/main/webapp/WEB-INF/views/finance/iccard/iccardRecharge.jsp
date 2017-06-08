
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<title>一卡通充值</title>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<script src="${ctx}/static/js/views/finance/iccard/icCardRecharge.js?V=22"></script>

<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			<button class="ubtns-item" onclick="save()" id="saveBtn">保存</button>
			<button class="ubtns-item" id="closeRecharge" onclick="closeRechargeDialog()">关闭</button>
		</div>
	</div>
	<div class="ub uline"></div>
	<form id="cardRecharge">
		<div class="ub ub-ver upad-4">
			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
				<input id="branchId" name="branchId" type="hidden">
					<div class="umar-r10 uw-74 ut-r">&nbsp;&nbsp;&nbsp;充值店铺:</div>
					<input class="uinp uinp-no-more ub ub-f1" type="text" id="branchName"
						name="branchName" readOnly/>
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-74 ut-r">&nbsp;&nbsp;&nbsp;当前余额:</div>
					<input class="uinp easyui-validatebox uinp-no-more"
					data-options="validType:'intOrFloat'" type="text"
					id="oldBalance" name="oldBalance" readOnly/>
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-74 ut-r">&nbsp;&nbsp;&nbsp;充值金额:</div>
					<input id="addBalance" name="addBalance" class="uinp  easyui-numberbox easyui-validatebox"
					data-options="min:0.01,max:999999.00,precision:2,onChange:changeBalance"/>
				</div>
				<i class="uc-red">*</i>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-74 ut-r">&nbsp;&nbsp;&nbsp;充值方式:</div>
					<input name="rechargeType"
						id="rechargeType" class="uselect easyui-combobox" style="width: 204px;" 
						data-options="valueField:'id',textField:'text',url:'management/dict/RECHARGE_WAY_TYPE',editable:false,required:true"/>
					<!-- <select class="uselect easyui-combobox" style="width: 204px;"
						data-options="editable:false" name="rechargeType"
						id="rechargeType">
						<option value="1">银行转账</option>
						<option value="2">微信转账</option>
						<option value="3">支付宝转账</option>
						<option value="4">现金</option>
						<option value="5">其他</option>
					</select> -->
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-74 ut-r">充值后金额:</div>
					<input class="uinp easyui-numberbox uinp-no-more"
					data-options="min:0.00,precision:2"
					type="text" id="newBalance"
						name="newBalance" readOnly/>
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-74 ut-r">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:</div>
					<input class="uinp ub ub-f1 " type="text" id="remark"
						name="remark" maxlength="20"/>
				</div>
			</div>

		</div>
	</form>
</div>

