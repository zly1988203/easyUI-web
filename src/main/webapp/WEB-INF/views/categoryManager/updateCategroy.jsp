<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/categoryManager/updateCategory.js?V=${versionNo}"></script>
<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			<button class="ubtns-item" onclick="save()" id="saveCategory">保存</button>
			<button class="ubtns-item" onclick="closeDialogHandel()">关闭</button>
		</div>
	</div>
	<div class="ub uline"></div>
	<form id="formAdd" method="post"  style="font-size: 14px;" >
		<div class="ub ub-ver upad-4">
			<div class="ub upad-4">
				<div class="ub ub-ac uw-320">
					<div class="umar-r10 uw-80 ut-r">类别编号:</div>
					<input id="goodsCategoryId" name="goodsCategoryId" value="${goodsCategory.goodsCategoryId}" type="hidden">
					<input id="categoryCode" name="categoryCode" class="uinp uinp-no-more easyui-validatebox uw-200" data-options="required:true,validType:'intNum'" readonly="readonly"  maxlength="10" value="${goodsCategory.categoryCode }">
					<i class="uc-red">*</i>
				</div>
			</div>
			<div class="ub upad-4">
				<div class="ub ub-ac uw-320">
					<div class="umar-r10 uw-80 ut-r">类别名称:</div>
					<input id="categoryName" name="categoryName" class="uinp uw-200" class="uinp"  type="text" value="${goodsCategory.categoryName}" maxlength="20"
					onkeyup="value=value.replace(/[^\#\\\_\-\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" 
					onpaste="value=value.replace(/[^\#\\\_\-\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" 
					oncontextmenu = "value=value.replace(/[^\#\\\_\-\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')">
					<i class="uc-red">*</i>
				</div>
			</div>
			<div class="ub upad-4">
				<div class="ub ub-ac ub-f1 umar-r36">
					<div class="umar-r10 uw-80 ut-r">备注:</div>
					<input id="remark" name="remark" class="uinp" type="text" value="${goodsCategory.remark }" maxlength="60">
				</div>
			</div>
		</div>
	</form>
</div>