
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil"%>

<title>新增公告</title>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<script src="${ctx}/static/js/views/system/notice/addNotice.js?V=4"></script>

<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">

	<div class="ub ub-ac upad-8">
		<div class="ubtns">
			<button class="ubtns-item" onclick="saveNotice()" id="saveBtn">发布</button>
			<button class="ubtns-item" onclick="closeDialogHandel()">关闭</button>
		</div>
	</div>
	<div class="ub uline"></div>
	<form id="formNoticeAdd">
		<div class="ub ub-ver upad-4">
			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">发布人:</div>
					<input class="uinp ub ub-f1 uinp-no-more" type="text"
						id="financeCode" name="financeCode" readOnly maxlength="50" />
				</div>
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">收件门店:</div>
					<input class="uinp" name="supplierId" id="supplierId" type="hidden">
					<input class="uinp" id="supplierName" name="supplierName"
						type="text" maxlength="50">
					<div class="uinp-more" onclick="selectSupplier()">...</div>
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">收件人:</div>
					<input class="uinp" name="supplierId" id="supplierId" type="hidden">
					<input class="uinp" id="supplierName" name="supplierName"
						type="text" maxlength="50">
					<div class="uinp-more" onclick="selectSupplier()">...</div>
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac uw-570">
					<div class="umar-r10 uw-70 ut-r">公告标题:</div>
					<input class="uinp ub ub-f1" type="text" id="title" name="title"
						maxlength="50" />
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac uw-600">
					<div class="umar-r10 uw-70 ut-r">公告内容:</div>
					<textarea id="remark" name="remark"
						class="uh-300 umar-r30 ubor ub ub-f1" maxlength="1000"></textarea>
				</div>
			</div>

		</div>
	</form>



</div>

