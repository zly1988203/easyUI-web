<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script  src="${ctx}/static/js/views/stocktaking/apply/applyAdd.js"></script>
<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			<button class="ubtns-item" onclick="save()" id="saveBtn">保存</button>
			<button class="ubtns-item" onclick="closeDialogHandel()">关闭</button>
		</div>
	</div>
	<div class="ub uline"></div>
	<form id="formAdd" method="post"  style="font-size: 14px;" >
		<div class="ub ub-ver upad-4">
			<div class="ub upad-4">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">机构名称:</div>
					<input type="hidden" id="addbranchId" name="branchId" />
					<input type="hidden" id="addbranchCode" name="branchCode" />
					<input class="uinp ub ub-f1" type="text" id="addbranchName" name="branchName" maxlength="50"/>
					<div class="uinp-more" onclick="selectBranches()" >...</div>
				</div>
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-60 ut-r">盘点范围:</div>
					<select class="uselect" style="width: 204px;" name="scope" id="scope">
						<option value="">--请选择--</option>
						<option value="1">全场盘点</option>
						<option value="2">类别盘点</option>
					</select>
				</div>
			</div>
			<div class="ub upad-4">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">类别:</div>
					<input class="uinp ub ub-f1" type="hidden" name="categoryId" id="categoryId" />
					<input class="uinp ub ub-f1" type="text" name="categoryShows" id="categoryShows" />
					<div class="uinp-more" onClick="searchCategory()">...</div>
				</div>
			</div>
			<div class="ub upad-4">
				<div class="ub ub-ac ub-f1 umar-r36">
					<div class="umar-r10 uw-80 ut-r">备注:</div>
					<input id="remark" name="remark" value="" class="uinp" maxlength="60">
				</div>
			</div>
		</div>
	</form>
</div>