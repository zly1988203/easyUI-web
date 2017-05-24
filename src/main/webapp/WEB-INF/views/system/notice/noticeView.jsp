
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil"%>

<title>查看公告</title>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="/static/js/views/purchase/addNotice.js?V="></script>

<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">

	<form id="financeAdd">
		<div class="ub ub-ver upad-4">
			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">发布人:</div>
					<input class="uinp ub ub-f1" type="text" id="financeCode"
						name="financeCode" value="${financeFormVo.financeCode}"
						maxlength="50" />
				</div>
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">收件门店:</div>
					<input class="uinp ub ub-f1" type="text" id="financeCode"
						name="financeCode" value="${financeFormVo.financeCode}"
						maxlength="50" />
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">收件人:</div>
					<input class="uinp ub ub-f1" type="text" id="financeName"
						name="financeName" value="${financeFormVo.financeName}"
						maxlength="50" />
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">公告标题:</div>
					<input class="uinp ub ub-f1" type="text" id="description"
						name="description" value="${financeFormVo.description}"
						maxlength="50" />
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">公告内容:</div>
					<input class="uinp ub ub-f1" type="text" id="description"
						name="description" value="${financeFormVo.description}"
						maxlength="50" />
				</div>
			</div>

		</div>
	</form>

	<div class="ub uline"></div>
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			<button class="ubtns-item" onclick="save()" id="saveBtn">发布</button>
			<button class="ubtns-item" onclick="closeDialog()">关闭</button>
		</div>
	</div>

</div>

