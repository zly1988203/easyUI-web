<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil"%>

<title>开通店铺列表</title>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script src="${ctx}/static/js/views/finance/iccard/iccardShopSetting.js?V=4"></script>

<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-20">
		<div class="ubtns">
			<button class="ubtns-item" onclick="saveSetting()" id="saveBtn">保存</button>
			<button class="ubtns-item" onclick="addShop()" id="addShop">添加店铺</button>
			<button class="ubtns-item" onclick="closeShopSettingDialog()">关闭</button>
		</div>
	</div>
	<div class="ub uline"></div>
	<input type="hidden" id="settingId" name="settingId" value=""></input>
	<table id="gridShopList" class="umar-t10 upad-8"> </table>

	<div class="ub uline"></div>
	<div class="ub umar-t8">
		<div class="ub ub-ac umar-r20 upad-10">
		<div class="umar-r10 uw-60 ut-r">设备信息:</div>
			<div class="ubtns">
			<button class="ubtns-item" onclick="saveEquipmentList()" id="saveBtn">保存</button>
			</div>
		</div>
	</div>

	<div class="ub uline"></div>
	<input type="hidden" id="branchId" name="branchId" value=""></input>
	<table id="gridEquipmentList" class="umar-t10 upad-8"></table>

</div>

