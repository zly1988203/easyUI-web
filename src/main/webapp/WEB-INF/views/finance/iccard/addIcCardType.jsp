<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil"%>

<title>添加一卡通</title>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script src="${ctx}/static/js/views/finance/iccard/addIcCardType.js?V=4"></script>

<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			<button class="ubtns-item" onclick="saveSetting()" id="saveBtn">保存</button>
			<button class="ubtns-item" onclick="closeCardDialog()">关闭</button>
		</div>
	</div>
	<div class="ub uline"></div>
	<form id="cardTypeAdd">
		<div class="ub ub-ver upad-4">
			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-90 ut-r">一卡通类型:</div>
					<select class="uselect easyui-combobox uw-204"
						data-options="editable:false"  name="cardType" id="cardType">
						<%--<option value="">--请选择--</option>--%>
						<option value="1">东莞通</option>
						<option value="2">深圳通</option>
						<option value="2">合肥通</option>
					</select>
				</div>
			</div>

			<div class="ub uline"></div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-90 ut-r">清算中心IP:</div>
					<input class="uinp ub ub-f1" type="text" id="ip"
						name="ip"
						maxlength="50" />
				</div>
			</div>

			<div class="ub upad-4 umar-t10">

				<div class="ub ub-ac">
					<div class="umar-r10 uw-90 ut-r">端口:</div>
					<input class="uinp ub ub-f1" type="text" id="port"
						name="port" />
				</div>
			</div>

			<div class="ub upad-4 umar-t10">

				<div class="ub ub-ac">
					<div class="umar-r10 uw-90 ut-r">运营单位代码:</div>
					<input class="uinp ub ub-f1" type="text" id="code"
						name="code"/>
				</div>
			</div>

		</div>
	</form>
</div>

