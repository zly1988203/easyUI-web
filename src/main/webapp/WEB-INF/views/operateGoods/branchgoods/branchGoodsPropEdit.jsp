<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/operateGoods/branchgoods/branchGoodsPropEdit.js?V=${versionNo}"></script>
<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			<button class="ubtns-item" id="btnSave" onclick="saveProp()">保存</button>
			<button class="ubtns-item" id="btnCancel" onclick="closeDialogHandel()">关闭</button>
		</div>
	</div>
	<div class="ub uline"></div>
	<form id="formEdit" method="post"  style="font-size: 14px;" >
		<input type="hidden" id="skuId" name="skuId" value="${vo.skuId }">
		<input type="hidden" id="goodsBranchPriceId" name="goodsBranchPriceId" value="${vo.goodsBranchPriceId }">
		<input type="hidden" id="branchId" name="branchId" value="${vo.branchId }">
		<div class="ub ub-ver upad-4">
			<div class="ub upad-4">
				<div class="ub ub-ac uw-320">
					<div class="umar-r10 uw-100 ut-r">商品名称:</div>
					${vo.skuName }
				</div>
				<div class="ub ub-ac uw-320">
					<div class="umar-r10 uw-100 ut-r">条码:</div>
					${vo.barCode }
				</div>
				<div class="ub ub-ac uw-320">
					<div class="umar-r10 uw-100 ut-r">货号:</div>
					${vo.skuCode }
				</div>
			</div>
			<div class="ub upad-4">
				<div class="ub ub-ac uw-320">
					<div class="umar-r10 uw-100 ut-r">进货规格:</div>
					<input id="purchaseSpec" name="purchaseSpec" style="width: 204px;"
						class="uinp easyui-numberbox easyui-validatebox"
						data-options="min:0,precision:2" type="text"
						data-options="required:true" value="${vo.purchaseSpec }">
					<i class="uc-red">*</i>
				</div>
				<div class="ub ub-ac uw-320">
					<div class="umar-r10 uw-100 ut-r">配送规格:</div>
					<input id="distributionSpec" name="distributionSpec"
						style="width: 204px;"
						class="uinp easyui-numberbox easyui-validatebox"
						data-options="min:0,precision:2" type="text"
						data-options="required:true" value="${vo.distributionSpec }">
					<i class="uc-red">*</i>
				</div>
				<div class="ub ub-ac uw-320">
					<div class="umar-r10 uw-100 ut-r">是否直送商品:</div>
					<input id="fastDeliver" name="fastDeliver" id="fastDeliver" class="ub" type="checkbox" ${vo.fastDeliver?"checked='checked'":"" } />
				</div>
			</div>
		</div>
	</form>
</div>