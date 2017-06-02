
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
						id="financeCode" name="financeCode" value="<%=UserUtil.getCurrentUser().getUserName()%>" readOnly/>
				</div>
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">收件门店:</div>
					<input class="uinp" name="receiveBranchIds" id="receiveBranchIds" type="hidden">
					<input class="uinp" id="branchName" name="receiveBranchName"
						placeholder="收件门店和人必选一种"
						type="text"  readOnly="readonly">
					<div class="uinp-more" onclick="selectBranch()">...</div>
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">收件人:</div>
					<input class="uinp" name="receiveUserIds" id="receiveUserIds" type="hidden">
					<input class="uinp" id="userName" name="receiveUserName"
						placeholder="收件门店和人必选一种"
						type="text"  readOnly="readonly">
					<div class="uinp-more" onclick="selectUser()">...</div>
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac uw-570">
					<div class="umar-r10 uw-70 ut-r">公告标题:</div>
					<input class="uinp ub ub-f1" placeholder="公告标题必填" type="text" id="title" name="title"
						maxlength="150" />
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac uw-600">
					<div class="umar-r10 uw-70 ut-r">公告内容:</div>
					<textarea id="content" name="content" placeholder="公告内容必填"
						class="uh-300 umar-r30 ubor ub ub-f1" maxlength="1000"></textarea>
				</div>
			</div>

		</div>
	</form>



</div>

