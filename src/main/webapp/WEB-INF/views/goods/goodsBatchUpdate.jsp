<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>商品属性批量修改</title>
	
	<%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/goods/goodsBatchUpdate.js"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 ubor">
		<!-- 操作/筛选 区域 begin -->
		<div class="umar-4 upad-4">
			<form id="queryForm">
				<div class="ub ub-ac">
					<div class="ubtns">
						<div class="ubtns-item" onclick="query()">查询</div>
						<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
						<shiro:hasPermission name="JxcGoodsBatchUpdate:save">
							<div class="ubtns-item" onclick="importExcel(0)">导入货号</div>
							<div class="ubtns-item" onclick="importExcel(1)">导入条码</div>
							<div class="ubtns-item" onclick="save()">修改</div>
						</shiro:hasPermission>
						<div class="ubtns-item" onclick="toClose()">关闭</div>
					</div>
				</div>
				<div class="ub umar-t8">
					<div class="ub ub-ac umar-r40">
						<div class="umar-r10 uw-60 ut-r">机构:</div>
						<input class="uinp" name="branchId" id="branchId" type="hidden">
						<input class="uinp" id="branchName" name="branchName" type="text" maxlength="50" onblur="branchAutoComple()" onkeyup="branchAutoComple()">
						<div class="uinp-more" onclick="chooseBranch('queryForm')">...</div>
					</div>
					<div class="ub ub-ac umar-r40">
						<div class="umar-r10 uw-60 ut-r" style="width: 70px !important;">货号/条码:</div>
						<input class="uinp" id="skuCode" name ="skuCode" type="text"  maxlength="50">
					</div>
				</div>
				<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">类别:</div>
						<input class="uinp" id="categoryCode" name="categoryCode" type="hidden">
						<input class="uinp" id="categoryName" name="categoryName" type="text" maxlength="50" onblur="categoryAutoComple()" onkeyup="categoryAutoComple()">
						<div class="uinp-more" onclick="chooseGoodsCategoryForQueryForm()">...</div>
					</div>
					<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r" style="width: 70px !important;">供应商:</div>
						<input class="uinp" name="supplierId" id="supplierId" type="hidden">
						<input class="uinp" id="supplierName" name="supplierName" type="text" maxlength="50" onblur="supplierAutoComple()" onkeyup="supplierAutoComple()">
						<div class="uinp-more" onclick="chooseSupplier('queryForm')">...</div>
					</div>
				</div>
			</form>
		</div>
		<!-- 操作/筛选 区域 end -->
		
		<!-- 商品展示区域 -->
		<div class="ub uw umar-t8 ub-f1">
			<table id="goodsGrid"></table>
		</div>
		
		<!-- 批量设置区域 -->
		<div class="ub ub-ver umar-t5">
			<form id="batchUpdateForm">
				<div class="ub ub-ac upad-8">
					<div class="ub uw-120 ub-ac umar-r10">
						<b>选择修改的属性</b>
					</div>
					<div class="ub uw-160 ub-ac umar-r10">
						<b>属性值</b>
					</div>
					<div class="ub uw-220 ub-ac umar-r10">
						
					</div>
					
					<div class="ub uw-120 ub-ac umar-r10">
						<b>选择修改的属性</b>
					</div>
					<div class="ub uw-160 ub-ac umar-r10">
						<b>属性值</b>
					</div>
					<div class="ub uw-220 ub-ac umar-r10">
						
					</div>
				</div>
				<div class="ub ub-ac upad-8">
					<!-- 是否管理库存 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="managerStockChecked" name="managerStockChecked" class="ub" type="checkbox" name="checkbox" />
						&nbsp;
						是否管理库存
					</div>
					<div class="ub uw-80 ub-ac umar-r10">
						<input class="ub" type="radio" id="managerStock1" name="managerStock" value="1" checked="checked" /><span>启用</span>
					</div>
					<div class="ub uw-300 ub-ac umar-r10">
						<input class="ub" type="radio" id="managerStock0" name="managerStock" value="0" /><span>不启用</span>
					</div>
					
					<!-- 安全库存系数 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="safetyCoefficientChecked" name="safetyCoefficientChecked" class="ub" type="checkbox" name="checkbox" />
						&nbsp;
						安全库存系数
					</div>
					<div class="ub uw-200 ub-ac umar-r10">
						<input id="safetyCoefficient" name="safetyCoefficient" value='1' style="width: 204px;" 
							class="uinp uinp-no-more easyui-numberbox easyui-validatebox"
							data-options="min:0.1,max:999.9,precision:2,validType:['length[0,18]']" type="text" maxlength="4">
					</div>
					<div class="ub uw-160 ub-ac umar-r10">
						<input id="safetyCoefficientCascadeChecked" name="safetyCoefficientCascadeChecked" class="ub" type="checkbox" checked="checked" value="true" />
						&nbsp;
						同时更新门店安全系数
					</div>
				</div>
				
				<div class="ub ub-ac upad-8">
					<!-- 是否参与促销 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="allowActivityChecked" name="allowActivityChecked" class="ub" type="checkbox" name="checkbox" />
						&nbsp;
						是否参与促销
					</div>
					<div class="ub uw-80 ub-ac umar-r10">
						<input class="ub" type="radio" id="allowActivity1" name="allowActivity" value="1" checked="checked" /><span>启用</span>
					</div>
					<div class="ub uw-300 ub-ac umar-r10">
						<input class="ub" type="radio" id="allowActivity0" name="allowActivity" value="0" /><span>不启用</span>
					</div>
					
					<!-- 修改主供应商 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="supplierChecked" name="supplierChecked" class="ub" type="checkbox" name="checkbox"  />
						&nbsp;
						修改主供应商
					</div>
					<div class="ub uw-200 ub-ac umar-r10">
						<input id="supplierId" name="supplierId" class="uinp" type="hidden">
						<input id="saleWay" name="saleWay" class="uinp" type="hidden" value="">
						<div class="ub">
							<input id="supplierName" name="supplierName" class="uinp easyui-validatebox" type="text" readonly="readonly" data-options="required:true">
							<div id="openSupplierMore" class="uinp-more " onclick="chooseSupplier('batchUpdateForm')">...</div>
						</div>
					</div>
					<div class="ub uw-160 ub-ac umar-r10">
						<input id="supplierCascadeChecked" name="supplierCascadeChecked" class="ub" type="checkbox" checked="checked" value="true" />
						&nbsp;
						同时更新门店主供应商
					</div>
				</div>
				
				<div class="ub ub-ac upad-8">
					<!-- 是否直送商品 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="fastDeliverChecked" name="fastDeliverChecked" class="ub" type="checkbox" name="checkbox" />
						&nbsp;
						是否直送商品
					</div>
					<div class="ub uw-80 ub-ac umar-r10">
						<input class="ub" type="radio" id="fastDeliver1" name="fastDeliver" value="1" /><span>启用</span>
					</div>
					<div class="ub uw-300 ub-ac umar-r10">
						<input class="ub" type="radio" id="fastDeliver0" name="fastDeliver" value="0" checked="checked" /><span>不启用</span>
					</div>
					
					<!-- 修改联营扣率 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="supplierRateChecked" name="supplierRateChecked" class="ub" type="checkbox" name="checkbox" />
						&nbsp;
						修改联营扣率
					</div>
					<div class="ub uw-200 ub-ac umar-r10">
						<input id="supplierRate" name="supplierRate" value="0" style="width: 182px;" 
							class="uinp uinp-no-more easyui-numberbox easyui-validatebox"
							data-options="min:0,max:100,precision:2,validType:['length[0,18]']" type="text" maxlength="4">
							%
					</div>
					<div class="ub uw-160 ub-ac umar-r10">
						<input id="supplierRateCascadeChecked" name="supplierRateCascadeChecked" class="ub" type="checkbox" checked="checked" value="true" />
						&nbsp;
						同时更新门店联营扣率
					</div>
				</div>
				
				<div class="ub ub-ac upad-8">
					<!-- 是否高值商品 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="highValueChecked" name="highValueChecked" class="ub" type="checkbox" name="checkbox" />
						&nbsp;
						是否高值商品
					</div>
					<div class="ub uw-80 ub-ac umar-r10">
						<input class="ub" type="radio" id="highValue1" name="highValue" value="1" /><span>启用</span>
					</div>
					<div class="ub uw-300 ub-ac umar-r10">
						<input class="ub" type="radio" id="highValue0" name="highValue" value="0" checked="checked" /><span>不启用</span>
					</div>
					
					<!-- 修改商品类别 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="categoryChecked" name="categoryChecked" class="ub" type="checkbox" name="checkbox" />
						&nbsp;
						修改商品类别
					</div>
					<div class="ub uw-200 ub-ac umar-r10">
						<input id="categoryId" name="categoryId" class="uinp" type="hidden">
						<input id="categoryCode" name="categoryCode" class="uinp" type="hidden">
						<div class="ub">
							<input id="categoryName" name="categoryName" class="uinp uw-200 easyui-validatebox" type="text" readonly="readonly"  data-options="required:true">
							<div id="openCategoryMore" class="uinp-more " onclick="chooseGoodsCategoryForUpdateForm()">...</div>
						</div>
					</div>
				</div>
				
				<div class="ub ub-ac upad-8">
					<!-- 是否关注商品 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="attentionChecked" name="attentionChecked" class="ub" type="checkbox" name="checkbox"  />
						&nbsp;
						是否关注商品
					</div>
					<div class="ub uw-80 ub-ac umar-r10">
						<input class="ub" type="radio" id="attention1" name="attention" value="1" /><span>启用</span>
					</div>
					<div class="ub uw-300 ub-ac umar-r10">
						<input class="ub" type="radio" id="attention0" name="attention" value="0" checked="checked" /><span>不启用</span>
					</div>
					
					<!-- 修改商品品牌 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="brandChecked" name="brandChecked" class="ub" type="checkbox" name="checkbox"  />
						&nbsp;
						修改商品品牌
					</div>
					<div class="ub uw-200 ub-ac umar-r10">
						<input id="brandId" name="brandId" class="uinp" type="hidden">
						<input id="brandCode" name="brandCode"   class="uinp" type="hidden">
						<div class="ub">
							<input id="brandName" name="brandName" class="uinp" type="text" readonly="readonly">
							<div id="openBrandMore" class="uinp-more" onclick="chooseGoodsBrand('batchUpdateForm')">...</div>
						</div>
					</div>
				</div>
				
				
				<div class="ub ub-ac upad-8">
					<!-- 分店调价 -->
					<div class="ub uw-120 ub-ac umar-r10">
						<input id="allowAdjustChecked" name="allowAdjustChecked" class="ub" type="checkbox" name="checkbox" />
						&nbsp;
						分店调价
					</div>
					<div class="ub uw-80 ub-ac umar-r10">
						<input class="ub" type="radio" id="allowAdjust1" name="allowAdjust" value="1" /><span>启用</span>
					</div>
					<div class="ub uw-300 ub-ac umar-r10">
						<input class="ub" type="radio" id="allowAdjust0" name="allowAdjust" value="0" checked="checked" /><span>不启用</span>
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
</html>