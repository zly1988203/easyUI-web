<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script  src="${ctx}/static/js/views/goods/goodsArchivesAdd.js"></script>

<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
    <div class="ub ub-ac upad-4">
        <div class="ubtns">
            <button class="ubtns-item" onclick="saveGoodsArchives()" id="saveGoodsArchives">保存</button>
            <button class="ubtns-item" onclick="closeDialog()">关闭</button>
        </div>
    </div>
    <div class="ub uline "></div>
    <form id="formGoodsArchivesAdd" style="font-size: 14px;" method="post">
        <div class="ub ub-ver ub-ac upad-4">
            <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">货号:</div>
                    <input id="skuCode" name="skuCode" class="uinp uinp-no-more uw-200 "  readonly="readonly" type="text" value="${data.skuCode}">
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">商品名称:</div>
                    <div class="ub">
                        <input id="skuName" name="skuName" class="uinp easyui-validatebox uw-200 " data-options="required:true" maxlength="20">
                    </div>
                    <i class="uc-red">*</i>
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">商品条码:</div>
                  <input id="barCode" name="barCode"  class="uinp  easyui-validatebox uw-200 " data-options="validType:'int'">
                   <!--  <i class="ub uc-red">*</i> -->
                </div>
            </div>
            <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">助记码:</div>
                    <input id="memoryCode" name="memoryCode" class="uinp uw-200">
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">商品类别:</div>
                    <input id="categoryId" name="categoryId"   class="uinp" type="hidden">
                    <input id="categoryCode" name="categoryCode"   class="uinp" type="hidden">
                    <div class="ub">
                        <input id="categoryName" name="categoryName"   class="uinp uw-200 easyui-validatebox" type="text" readonly="readonly"  data-options="required:true">
                        <div class="uinp-more " onclick="getGoodsType()">...</div>
                    </div>
                    <i class="uc-red">*</i>
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">品牌:</div>
                    <input id="brandId" name="brandId" class="uinp" type="hidden" value="${goodsBrand.id}">
                    <input id="brandCode" name="brandCode"   class="uinp" type="hidden">
                    <div class="ub">
                        <input id="brandName" name="brandName"   class="uinp" type="text" readonly="readonly" value="${goodsBrand.brandName}">
                        <div class="uinp-more" onclick="getGoodsBrand()">...</div>
                    </div>
                </div>
            </div>
            <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">进货规格:</div>
                    <div class="ub">
                    <input id="purchaseSpec" name="purchaseSpec" class="uinp   easyui-numberbox easyui-validatebox " style="width: 204px;" data-options="min:0.01,precision:2"  type="text" value="1"  onkeyup="checkInteger(this)" onafterpaste="checkInteger(this)" data-options="required:true" >
                    </div>
                    <i class="uc-red">*</i>
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">规格:</div>
                    <input id="spec" name="spec"   class="uinp easyui-validatebox" type="text" >
                    <!-- <i class="uc-red">*</i> -->
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">库存单位:</div>
                    <select class="uselect easyui-combobox" style="width: 204px;" name="unit" id="unit" data-options="onChange:onChangeUnit">
                        <option value="箱">箱</option>
                        <option value="套">套</option>
                        <option value="包">包</option>
                        <option value="个" selected="selected">个</option>
                        <option value="瓶">瓶</option>
                        <option value="千克">千克</option>
                        <option value="克">克</option>
                    </select>
                </div>
            </div>
            <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">配送规格:</div>
                     <div class="ub">
                     <input id="distributionSpec" name="distributionSpec" value='1'  class="uinp easyui-numberbox easyui-validatebox " style="width: 204px;" data-options="min:0.01,precision:2" type="text" data-options="required:true">
                     </div>
                    <i class="uc-red">*</i>
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">商品状态:</div>
                    <select class="uselect easyui-combobox" style="width: 204px;" name="status" id="status" data-options="editable:false,onChange:typeChange">
                        <c:forEach items="${goodsStatus}" var="goodsStatus">
                            <option value="${goodsStatus.name}">${goodsStatus.value}</option>
                        </c:forEach>
                    </select>
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">产地:</div>
                    <input id="originPlace" name="originPlace"   class="uinp" type="text">
                </div>
            </div>
            <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">计价方式:</div>
                    <select class="uselect easyui-combobox" style="width: 204px;" name="pricingType" id="pricingType"  data-options="editable:false,onChange:pricingTypeChange">
                        <c:forEach items="${pricingType}" var="pricingType">
                            <option value="${pricingType.name}">${pricingType.value}</option>
                        </c:forEach>
                    </select>
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">质保天数:</div>
                    <input id="vaildity" name="vaildity"   class="uinp easyui-numberbox easyui-validatebox" style="width: 204px;"
                           data-options="min:0,precision:0" type="text" onkeyup="checkInteger(this)" onafterpaste="checkInteger(this)">
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">主供应商:</div>
                    <input id="supplierId" name="supplierId"   class="uinp" type="hidden" value="${supplier.id}">
                    <div class="ub">
                        <input id="supplierName" name="supplierName"   class="uinp  easyui-validatebox" value="${supplier.supplierName}" type="text" readonly="readonly" data-options="required:true">
                        <div class="uinp-more " onclick="getGoodsPupplier()">...</div>
                    </div>
                    <i class="uc-red">*</i>
                </div>
            </div>
            <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">经营方式:</div>
                    <input id="saleWay" name="saleWay"   class="uinp" type="hidden" readonly="readonly">
                    <input id="saleWayName" name="saleWayName"   class="uinp uinp-no-more" type="text" readonly="readonly">
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">联营/代销扣率:</div>
                    <input id="supplierRate" name="supplierRate"   class="uinp easyui-numberbox easyui-validatebox" style="width: 204px;" data-options="min:0,precision:2" type="text" onkeyup="checkSupplierRate(this);" onafterpaste="checkSupplierRate(this);">%
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">商品类型:</div>
                    <select class="uselect easyui-combobox input-form" style="width: 204px;" name="type" id="type" data-options="editable:false,onChange:typeChange">
                        <c:forEach items="${goodsType}" var="type">
                            <option value="${type.name}">${type.value}</option>
                        </c:forEach>
                    </select>
                </div>
            </div>
            <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">零售价:</div>
                    <input id="salePrice" name="salePrice" value="0" class="uinp easyui-numberbox easyui-validatebox" style="width: 204px;" data-options="min:0,precision:4" type="text" maxlength="10" onkeyup="checkPrice(this);" onafterpaste="checkPrice(this);" >
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">进货价:</div>
                    <input id="purchasePrice" name="purchasePrice" value="0" class="uinp easyui-numberbox easyui-validatebox" style="width: 204px;" data-options="min:0,precision:4" type="text" maxlength="10" onkeyup="checkPrice(this);" onafterpaste="checkPrice(this);">
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">批发价:</div>
                    <input id="wholesalePrice" name="wholesalePrice" value="0" class="uinp easyui-numberbox easyui-validatebox" style="width: 204px;" data-options="min:0,precision:4" type="text" maxlength="10" onkeyup="checkPrice(this);" onafterpaste="checkPrice(this);">
                </div>
            </div>
            <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">配送价:</div>
                    <input id="distributionPrice" name="distributionPrice" value="0" class="uinp easyui-numberbox easyui-validatebox" style="width: 204px;" data-options="min:0,precision:4" type="text" maxlength="10" onkeyup="checkPrice(this);" onafterpaste="checkPrice(this);">
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">最低售价:</div>
                    <input id="lowestPrice" name="lowestPrice" value="0" class="uinp easyui-numberbox easyui-validatebox" style="width: 204px;" data-options="min:0,precision:4" type="text" maxlength="10" onkeyup="checkPrice(this);" onafterpaste="checkPrice(this);">
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">会员价:</div>
                    <input id="vipPrice" name="vipPrice" value="0" class="uinp easyui-numberbox easyui-validatebox" style="width: 204px;" data-options="min:0,precision:4" type="text" maxlength="10" onkeyup="checkPrice(this);" onafterpaste="checkPrice(this);">
                </div>
            </div>
            <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">毛利值:</div>
                    <input id="grossProfit" name="" value="0" class="uinp uinp-no-more easyui-numberbox easyui-validatebox" style="width: 204px;" data-options="min:0,precision:2" type="text" readonly="readonly">
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">毛利率:</div>
                    <input id="grossProfitPercent" name="" value="0" class="uinp uinp-no-more easyui-numberbox easyui-validatebox" style="width: 204px;" data-options="min:0,precision:2" type="text" readonly="readonly">
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">销项税率:</div>
                   <!--  <input id="outputTax" name="outputTax" value="0" class="uinp easyui-numberbox easyui-validatebox" data-options="min:0,precision:2" type="text"  maxlength="4" onkeyup="checkPositiveInteger(this);" onafterpaste="checkPositiveInteger(this)">% -->
                <input id="outputTax" name="outputTax"
							   class="uinp easyui-numberbox easyui-validatebox" style="width: 204px;"
							   data-options="min:0,precision:2,validType:['length[0,18]']" type="text" maxlength="4"
							   onkeyup="checkPositiveInteger(this);"
							   onafterpaste="checkPositiveInteger(this)">%
                </div>
            </div>
            <div class="ub upad-4">
            	<div class="ub ub-ac uw-300">
						<div class="umar-r10 uw-60 ut-r">进项税率:</div>
						<!-- <input id="inputTax" name="inputTax" value="0"
							   class="uinp easyui-numberbox easyui-validatebox"
							   data-options="min:0,precision:2" type="text" maxlength="4"
							   onkeyup="checkPositiveInteger(this);"
							   onafterpaste="checkPositiveInteger(this)">% -->
					    <input id="inputTax" name="inputTax" value='0.00'
							    class="uinp easyui-numberbox easyui-validatebox" style="width: 204px;"
							   data-options="min:0,precision:2,validType:['length[0,18]']" type="text" maxlength="4"
							   onkeyup="checkPositiveInteger(this);"
							   onafterpaste="checkPositiveInteger(this)">%
					</div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">建档时间:</div>
                    <input id="createDate" name="createDate"   class="uinp uinp-no-more" type="text" readonly="readonly">
                </div>
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-60 ut-r">建档人:</div>
                    <input id="createUserName" name="createUserName"   class="uinp uinp-no-more" type="text" readonly="readonly" >
                </div>
            </div>
            <div class="ub upad-4">
                <div class="umar-r10 uw-60 ut-r">备注:</div>
                <textarea id="remark" name="remark" class="uh-40 umar-r30 ubor" style="width: 800px;"maxlength="100" type="text"></textarea>
            </div>
            <div class="ub umar-l32" style="position: absolute;left: 0px;">
                <div class="ub ub-ac umar-r40">
                    <input id="managerStock" name="managerStock"  class="ub" type="checkbox" name="checkbox" checked="checked" readonly="readonly" /><span>是否管理库存</span>
                </div>
                <div class="ub ub-ac umar-r40">
                    <input id="highValue" name="highValue"   class="ub" type="checkbox" name="checkbox"  /><span>是否高值商品</span>
                </div>
                <div class="ub ub-ac umar-r40">
                    <input id="attention" name="attention"   class="ub" type="checkbox" name="checkbox" /><span>是否关注商品</span>
                </div>
                <div class="ub ub-ac umar-r40">
                    <input id="fastDeliver" name="fastDeliver"   class="ub" type="checkbox" name="checkbox" /><span>是否速送商品</span>
                </div>
            </div>

        </div>
    </form>

</div>
