<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/categoryManager/addCategory.js?V=${versionNo}"></script>
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
					<div class="umar-r10 uw-80 ut-r">类别信息:</div>
					<input id="parentCategoryId" name="parentCategoryId" value="${goodsCategory.parentCategoryId}" type="hidden">
					<div>${goodsCategory.categoryName}</div>
				</div>
			</div>
			<c:if test="${goodsCategory.categoryLevel==1}">
				<div class="ub upad-4">
					<div class="ub ub-ac uw-320">
						<div class="umar-r10 uw-80 ut-r">类别编号:</div>
						<input id="categoryCode" name="categoryCode" value="" maxlength="3" class="uinp easyui-validatebox" onkeyup="checkInteger(this)">
					</div>
				</div>
			</c:if>
			<div class="ub upad-4">
				<div class="ub ub-ac uw-320">
					<div class="umar-r10 uw-80 ut-r">类别名称:</div>
					<input id="categoryName" name="categoryName" value="" class="uinp" maxlength="20"
					onkeyup="value=value.replace(/[^\#\\\_\-\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" 
					onpaste="value=value.replace(/[^\#\\\_\-\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" 
					oncontextmenu = "value=value.replace(/[^\#\\\_\-\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')">
					<i class="uc-red">*</i>
				</div>
			</div>
			<div class="ub upad-4">
				<div class="ub ub-ac ub-f1 umar-r36">
					<div class="umar-r10 uw-80 ut-r">备注:</div>
					<input type="hidden" id="categoryLevel" name="categoryLevel" value="${goodsCategory.categoryLevel}" class="uinp">
					<input id="remark" name="remark" value="" class="uinp" maxlength="60">
				</div>
			</div>
		<div class="ub ub-ac umar-r10 uw-320">
			<label>
			<input type="checkbox" name="flag" checked="checked" /><span>保存后自动新增</span>
			</label>

        </div>
		</div>
	</form>
</div>