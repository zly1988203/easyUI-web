<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil"%>

<title>新增编辑财务代码</title>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script src="${ctx}/static/js/views/purchase/orderAdd.js?V="></script>

<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			<button class="ubtns-item" onclick="saveSetting()" id="saveBtn">保存</button>
			<button class="ubtns-item" onclick="addShop()" id="addShop">添加店铺</button>
			<button class="ubtns-item" onclick="closeDialog()">关闭</button>
		</div>
	</div>
	<div class="ub uline"></div>

		<div class="ub ub-ver upad-4">
			<table id="gridShopList"></table>
		</div>

		<div class="ub ub-ver upad-4">
			<table id="gridEquipmentList"></table>
		</div>

</div>

