<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script  src="${ctx}/static/js/views/supplier/area/supplierAreaEdit.js"></script>
<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			<button class="ubtns-item" onclick="saveHandel()">保存</button>
			<button class="ubtns-item" onclick="closeDialogHandel()">关闭</button>
		</div>
	</div>
	<div class="ub uline"></div>
	<form id="formEdit" method="post">
		<input id="areaId" name="areaId" type="hidden">
		<div class="ub ub-ver ub-ac upad-4">
			<div class="ub ub-ac umar-t20">
				<div class="umar-r10 uw-60 ut-r">编号:</div>
				<input id="areaCode" name="areaCode" class="uinp easyui-validatebox" data-options="required:true"  readonly="readonly" maxlength="2">
			</div>
			<div class="ub ub-ac umar-t20">
				<div class="umar-r10 uw-60 ut-r">名称:</div>
				<input id="areaName" name="areaName" class="uinp"  maxlength="30">
			</div>
		</div>
	</form>
</div>