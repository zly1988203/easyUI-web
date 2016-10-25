<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>

<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/goods/goodsArchivesEdit.js"></script>

<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
			<div class="ubtns">
			<shiro:hasPermission name="JxcGoodsArchive:save">
				<button class="ubtns-item" onclick="saveGoodsArchives()" id="updateGoodsArchives">保存</button>
		    </shiro:hasPermission>
		    <shiro:hasPermission name="JxcGoodsArchive:add">
				<button class="ubtns-item" onclick="goodsAddView()">新增</button>
			</shiro:hasPermission>
			<shiro:hasPermission name="JxcGoodsArchive:add">
				<button class="ubtns-item" onclick="copyAddGoodsView()">复制新增</button>
			</shiro:hasPermission>
				<button class="ubtns-item" onclick="closeDialog()">返回</button>
			</div>
	</div>
	<div class="ub uline "></div>
		<form id="formGoodsArchivesAdd" method="post">
			<div class="ub ub-ver upad-4">
				<div class="ub upad-4">
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">货号:</div>
						<input id="id" name="id" type="hidden"> <input
							id="skuCode" name="skuCode" class="uinp" readonly="readonly"
							type="text">
					</div>
					<div class="ub ub-ac umar-r50">
						<div class="umar-r10 uw-60 ut-r">商品名称:</div>
						<input id="skuName" name="skuName" class="uinp easyui-validatebox"
							data-options="required:true" maxlength="20"> <i
							class="uc-red">*</i>
					</div>
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">商品条码:</div>
					    <input id="barCode" name="barCode" class="uinp  easyui-validatebox" data-options="validType:'int'">
						<!-- <i class="uc-red">*</i> -->
					</div>
				</div>
				<div class="ub upad-4">
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">助记码:</div>
						<input id="memoryCode" name="memoryCode" class="uinp">
					</div>
					<div class="ub ub-ac umar-r48">
						<div class="umar-r10 uw-60 ut-r">商品类别:</div>
						<input id="categoryId" name="categoryId" class="uinp"
							   type="hidden"> <input id="categoryCode"
													 name="categoryCode" class="uinp" type="hidden"> <input
							id="categoryName" name="categoryName" class="uinp" type="text"
							readonly="readonly" data-options="required:true">
						<div class="uinp-more new-right" onclick="getGoodsType()">...</div>
						<i class="uc-red">*</i>
					</div>
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">品牌:</div>
						<input id="brandId" name="brandId" class="uinp" type="hidden">
						<input id="brandCode" name="brandCode" class="uinp" type="hidden">
						<input id="brandName" name="brandName" class="uinp" type="text"
							   readonly="readonly">
						<div class="uinp-more" onclick="getGoodsBrand()">...</div>
					</div>
				</div>
				<div class="ub upad-4">
					<div class="ub ub-ac umar-r50">
						<div class="umar-r10 uw-60 ut-r">进货规格:</div>
						<input id="purchaseSpec" name="purchaseSpec"
							   class="uinp easyui-numberbox easyui-validatebox"
							   data-options="min:0,precision:2" type="text"
							   data-options="required:true"> <i class="uc-red">*</i>
					</div>
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">规格:</div>
						<input id="spec" name="spec" class="uinp easyui-validatebox" type="text" >
                        <!-- <i class="uc-red">*</i> -->
					</div>
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">库存单位:</div>
						<select class="uselect easyui-combobox" name="unit" id="unit" data-options="onChange:onChangeUnit">
							<option value="箱">箱</option>
							<option value="套">套</option>
							<option value="包">包</option>
							<option value="个">个</option>
							<option value="瓶">瓶</option>
							<option value="克">克</option>
						</select>
					</div>
				</div>
				<div class="ub upad-4">
					<div class="ub ub-ac umar-r50">
						<div class="umar-r10 uw-60 ut-r">配送规格:</div>
						<input id="distributionSpec" name="distributionSpec"
							   class="uinp easyui-numberbox easyui-validatebox"
							   data-options="min:0,precision:2" type="text"
							   data-options="required:true"> <i class="uc-red">*</i>
					</div>
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">商品状态:</div>
						<select class="uselect" name="status" id="status">
							<c:forEach items="${goodsStatus}" var="goodsStatus">
								<option value="${goodsStatus.name}">${goodsStatus.value}</option>
							</c:forEach>
						</select>
					</div>
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">产地:</div>
						<input id="originPlace" name="originPlace" class="uinp"
							   type="text">
					</div>
				</div>
				<div class="ub upad-4">
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">计价方式:</div>
						<c:if test="${goodpPicingType!=0 }">
							<select class="uselect easyui-combobox" name="pricingType" id="pricingType" data-options="readonly:true">
								<c:forEach items="${pricingType}" var="pricingType">
									<c:if test="${pricingType.ordinal == goodpPicingType}">
										<option value="${pricingType.name}">${pricingType.value}</option>
									</c:if>
								</c:forEach>
							</select>
						</c:if>
						<c:if test="${goodpPicingType==0 }">
							<select class="uselect  easyui-combobox" name="pricingType" id="pricingType" data-options="readonly:true">
								<c:forEach items="${pricingType}" var="pricingType">
									<c:if test="${pricingType.ordinal == 0}">
										<option value="${pricingType.name}">${pricingType.value}</option>
									</c:if>
								</c:forEach>
							</select>
						</c:if>
					</div>
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">质保天数:</div>
						<input id="vaildity" name="vaildity"
							   class="uinp easyui-numberbox easyui-validatebox"
							   data-options="min:0,precision:0" type="text"
							   onkeyup="checkInteger(this)" onafterpaste="checkInteger(this)">
					</div>
					<div class="ub ub-ac umar-r48">
						<div class="umar-r10 uw-60 ut-r">主供应商:</div>
						<input id="supplierId" name="supplierId" class="uinp"
							   type="hidden"> <input id="supplierName"
													 name="supplierName" class="uinp" type="text" readonly="readonly"
													 data-options="required:true">
						<div class="uinp-more new-right" onclick="getGoodsPupplier()">...</div>
						<i class="uc-red">*</i>
					</div>
				</div>
				<div class="ub upad-4">
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">经营方式:</div>
						<input id="saleWayName" name="saleWayName" class="uinp"
							   type="text" readonly="readonly">
					</div>
					<div class="ub ub-ac umar-r48">
						<div class="umar-r10 uw-60 ut-r">联营/代销扣率:</div>
						<input id="supplierRate" name="supplierRate"
							   class="uinp easyui-numberbox easyui-validatebox"
							   data-options="min:0,precision:2" type="text"
							   onkeyup="checkSupplierRate(this);"
							   onafterpaste="checkSupplierRate(this);">%
					</div>
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">商品类型:</div>
						<select class="uselect" name="type" id="type">
							<c:forEach items="${goodsType}" var="type">
								<option value="${type.name}">${type.value}</option>
							</c:forEach>
						</select>
					</div>
				</div>
				<div class="ub upad-4">
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">零售价:</div>
						<input id="salePrice" name="salePrice"
							   class="uinp easyui-numberbox easyui-validatebox"
							   data-options="min:0,precision:2,readonly:true" type="text"
							   align="right" maxlength="10" onkeyup="checkPrice(this);"
							   onafterpaste="checkPrice(this);">
					</div>
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">进货价:</div>
						<input id="purchasePrice" name="purchasePrice"
							   class="uinp easyui-numberbox easyui-validatebox"
							   data-options="min:0,precision:2,readonly:true" type="text"
							   maxlength="10" onkeyup="checkPrice(this);"
							   onafterpaste="checkPrice(this);">
					</div>
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">批发价:</div>
						<input id="wholesalePrice" name="wholesalePrice"
							   class="uinp easyui-numberbox easyui-validatebox"
							   data-options="min:0,precision:2,readonly:true" type="text"
							   maxlength="10" onkeyup="checkPrice(this);"
							   onafterpaste="checkPrice(this);">
					</div>
				</div>
				<div class="ub upad-4">
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">配送价:</div>
						<input id="distributionPrice" name="distributionPrice"
							   class="uinp easyui-numberbox easyui-validatebox"
							   data-options="min:0,precision:2,readonly:true" type="text"
							   maxlength="10" onkeyup="checkPrice(this);"
							   onafterpaste="checkPrice(this);">
					</div>
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">最低售价:</div>

						<input id="lowestPrice" name="lowestPrice"
							   class="uinp easyui-numberbox easyui-validatebox"
							   data-options="min:0,precision:2" type="text" maxlength="10"
							   onkeyup="checkPrice(this);" onafterpaste="checkPrice(this);">
					</div>
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">会员价:</div>
						<input id="vipPrice" name="vipPrice"
							   class="uinp easyui-numberbox easyui-validatebox"
							   data-options="min:0,precision:2,readonly:true" type="text"
							   maxlength="10" onkeyup="checkPrice(this);"
							   onafterpaste="checkPrice(this);">
					</div>
				</div>
				<div class="ub upad-4">
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">毛利值:</div>
						<input id="grossProfit" name="grossProfitPercent"
							   class="uinp easyui-numberbox easyui-validatebox"
							   data-options="min:0,precision:2" type="text" readonly="readonly">
					</div>
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">毛利率:</div>
						<input id="grossProfitPercent" name="grossProfitPercent"
							   class="uinp easyui-numberbox easyui-validatebox"
							   data-options="min:0,precision:2" type="text"
							   style="text-align: right" readonly="readonly">
					</div>
					<div class="ub ub-ac umar-r48">
						<div class="umar-r10 uw-60 ut-r">销项税率:</div>
						<input id="outputTax" name="outputTax"
							   class="uinp easyui-numberbox easyui-validatebox"
							   data-options="min:0,precision:2" type="text" maxlength="4"
							   onkeyup="checkPositiveInteger(this);"
							   onafterpaste="checkPositiveInteger(this)">%
					</div>
				</div>
				<div class="ub upad-4">
					<div class="ub ub-ac umar-r48">
						<div class="umar-r10 uw-60 ut-r">进项税率:</div>
						<input id="inputTax" name="inputTax" value='0.00'
							    class="uinp easyui-numberbox easyui-validatebox"
							   data-options="min:0,precision:2" type="text" maxlength="4"
							   onkeyup="checkPositiveInteger(this);"
							   onafterpaste="checkPositiveInteger(this)">%
					</div>
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">修改时间:</div>
						<input id="createTimeUpdate" name="createTimeUpdate" class="uinp"
							   type="text" readonly="readonly">
					</div>
					<div class="ub ub-ac umar-r60">
						<div class="umar-r10 uw-60 ut-r">修改人:</div>
						<input id="updateUserName" name="updateUserName" class="uinp" type="text"
							   readonly="readonly" value="${updateUserName }">
					</div>
				</div>
				<div class="ub upad-4">
                <div class="ub ub-ac umar-r60">
                    <div class="umar-r10 uw-60 ut-r">建档时间:</div>
                    <input id="createTime" name="createTime"   class="uinp" type="text" readonly="readonly">
                </div>
                <div class="ub ub-ac umar-r60">
                    <div class="umar-r10 uw-60 ut-r">建档人:</div>
                    <input id="createUserName" name="createUserName"   class="uinp" type="text" readonly="readonly">
                </div>
            </div>
				
				
				<div class="ub upad-4">
					<div class="umar-r10 uw-60 ut-r">备注:</div>
					<textarea id="remark" name="remark" class="uh-40  " maxlength="100" style="width: 860px;"></textarea>
				</div>
				<div class="ub umar-l32">
					<div class="ub ub-ac umar-r20">
						<input id="managerStock" name="managerStock" id="managerStock"
							class="ub" type="checkbox" name="checkbox" /><span>是否管理库存</span>
					</div>
					<div class="ub ub-ac umar-r20">
						<input id="highValue" name="highValue" id="highValue" class="ub"
							type="checkbox" name="checkbox" /><span>是否高值商品</span>
					</div>
					<div class="ub ub-ac umar-r20">
						<input id="attention" name="attention" id="attention" class="ub"
							type="checkbox" name="checkbox" /><span>是否关注商品</span>
					</div>
					<div class="ub ub-ac umar-r20">
						<input id="fastDeliver" name="fastDeliver" id="fastDeliver"
							class="ub" type="checkbox" name="checkbox" /><span>是否速送商品</span>
					</div>
				</div>

			</div>
		</form>

	</div>
