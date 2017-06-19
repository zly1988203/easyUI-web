<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>

<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/integral/edit.js?V=${versionNo}"></script>
<style>
.newWdate {
  width: 196px !important;
}
</style>
<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
			<div class="ubtns">
			<shiro:hasPermission name="giftManager:save">
				<button class="ubtns-item" onclick="saveArchives()" id="updateArchives">保存</button>
		    </shiro:hasPermission>
				<button class="ubtns-item" onclick="closeDialog();">关闭</button>
			</div>
	</div>
	<div class="ub uline "></div>
		<form id="formGoodsArchivesAdd" method="post" style="font-size: 14px;">
			<div class="ub ub-ver ub-ac upad-4">
				<div class="ub upad-4">
					<div class="ub ub-ac uw-300">
						<div class="umar-r10 uw-60 ut-r">货号:</div>
						<input id="id" name="id" type="hidden" value="${data.id}"> 
						<input id="skuId" name="skuId" type="hidden" value="${data.skuId}"> 
						<input id="branchId" name="branchId" type="hidden" value="${data.branchId}"> 
						<input id="skuCode" name="skuCode" value="${data.skuCode}" class="uinp uinp-no-more" readonly="readonly" type="text">
					</div>
				</div>
				<div class="ub upad-4">
					<div class="ub ub-ac uw-300">
						<div class="umar-r10 uw-60 ut-r">礼品名称:</div>
						<div class="ub">
							<input id="skuName" name="skuName" value="${data.skuName}" class="uinp uinp-no-more"  readonly="readonly">
						</div>
					</div>
				</div>
				<div class="ub upad-4">
				    <div class="ub ub-ac uw-300">
						<div class="umar-r10 uw-60 ut-r">商品条码:</div>
					    <input id="barCode" name="barCode" value="${data.barCode}" class="uinp uinp-no-more" readonly="readonly">
					</div>
				</div>
				<div class="ub upad-4">
					<div class="ub ub-ac uw-300">
						<div class="umar-r10 uw-60 ut-r">兑换机构:</div>
						<input id="branchName" name="branchName" value="${data.branchName}"  class="uinp uinp-no-more" readonly="readonly">
					</div>
				</div>
				<div class="ub upad-4">
				    <div class="ub ub-ac uw-300">
						<div class="umar-r10 uw-60 ut-r">兑换数量:</div>
						<div class="ub">
							<input id="num" name="num" value="${data.num}" class="uinp" type="text" maxlength="6"
							data-options="min:1" onkeyup="checkInteger(this)" onafterpaste="checkInteger(this)" data-options="required:true"/>
						</div>
					</div>
				</div>
				<div class="ub upad-4">
					<div class="ub ub-ac uw-300">
						<div class="umar-r10 uw-60 ut-r">对应积分:</div>
						<input id="integral" name="integral" value="${data.integral}" class="uinp" type="text" maxlength="6"
						data-options="min:20" onkeyup="checkInteger(this)" onafterpaste="checkInteger(this)" data-options="required:true"/>
					</div>
				</div>
				<div class="ub upad-4">
				    <div class="ub ub-ac uw-300">
						<div class="umar-r10 uw-60 ut-r">开始时间:</div>
						<div class="ub">
						<input class="Wdate newWdate" readonly="readonly" name="startTime" id="startTime" value="${startTime}"
                        	onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'endTime\');}'})" />
						</div>
					</div>
				</div>
				<div class="ub upad-4">
					<div class="ub ub-ac uw-300">
						<div class="umar-r10 uw-60 ut-r">结束时间:</div>
						<div class="ub">
						 <input class="Wdate newWdate" readonly="readonly" name="endTime" id="endTime" value="${endTime}"
                           onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'startTime\');}'})" />
						</div>
					</div>
				</div>

			</div>
		</form>

	</div>
