
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script src="${ctx}/static/js/views/finance/iccard/editIcCardType.js?V=4"></script>

<div class="ub ub-ver  ub-f1  uw uh  uc-black">
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			<button class="ubtns-item" onclick="saveSettingType()" id="saveBtn">保存</button>
			<button class="ubtns-item" onclick="closeCardDialog()"
				id="closeCardType">关闭</button>
		</div>
	</div>
	<div class="ub uline"></div>
	<form id="cardTypeEdit">
		<div class="ub ub-ver upad-4">
			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-90 ut-r">一卡通类型:</div>

					<input name="cardType" id="cardType"
						class="uinp uinp-no-more" type="text" readOnly="readonly" />
					<input id="settingId" name="settingId"
					class="uinp uinp-no-more" type="hidden" readOnly="readonly" />
				</div>
			</div>

			<div class="ub uline"></div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-90 ut-r">清算中心IP:</div>
					<input class="uinp easyui-validatebox"
						data-options="required:true,validType:'ip'" type="text" id="ip"
						name="ip" maxlength="50" /><i class="uc-red">*</i>
				</div>
			</div>

			<div class="ub upad-4 umar-t10">

				<div class="ub ub-ac">
					<div class="umar-r10 uw-90 ut-r">端口:</div>
					<input class="uinp easyui-validatebox"
						data-options="required:true,validType:'port'" type="text" id="port"
						name="port" /><i class="uc-red">*</i>
				</div>
			</div>

			<div class="ub upad-4 umar-t10">

				<div class="ub ub-ac">
					<div class="umar-r10 uw-90 ut-r">运营单位代码:</div>
					<input class="uinp easyui-validatebox"
						onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
						onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
						data-options="required:true" type="text" id="code" name="code" /><i
						class="uc-red">*</i>
				</div>
			</div>

		</div>
	</form>
</div>

