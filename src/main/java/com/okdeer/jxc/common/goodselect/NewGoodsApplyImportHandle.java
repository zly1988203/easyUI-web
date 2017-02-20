/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年10月13日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.common.goodselect;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.okdeer.jxc.common.enums.GoodsTypeEnum;
import com.okdeer.jxc.common.enums.PricingTypeEnum;
import com.okdeer.jxc.common.enums.SaleWayEnum;
import com.okdeer.jxc.goods.entity.GoodsSelect;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.EnumMorpher;
import net.sf.json.util.JSONUtils;

/**
 * ClassName: GoodsSelectImport 
 * @author xiaoj02
 * @date 2016年10月13日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

public class NewGoodsApplyImportHandle implements GoodsSelectImportHandle {
	
	public static final String CODE_IS_BLANK = "条码为空";
	public static final String CODE_IS_REPEAT = "条码重复";
	public static final String NOT_EXISTS = "找不到该商品或者存在多个条码重复的商品";

	List<JSONObject> excelListFullData = null;
	List<JSONObject> excelListSuccessData = null;
	List<JSONObject> excelListErrorData = null;
	
	List<String> excelSuccessBarCode = null; 
	
	GoodsSelectImportBusinessValid businessValid;
	
	// 临时存储数据
	List<JSONObject> tempExcelListSuccessData = new ArrayList<JSONObject>();
	
	public NewGoodsApplyImportHandle(List<JSONObject> excelList, String[] excelField, GoodsSelectImportBusinessValid businessValid){
		this.excelListFullData = excelList;
		this.businessValid = businessValid;
		
		checkBarCodeIsNullAndRepeat();
		
		if(businessValid != null){

			// 深度拷贝正确的数据
//			tempExcelListSuccessData.addAll(excelListSuccessData);
			//业务校验
//			businessValid.businessValid(excelListSuccessData, excelField);
			
			//刷新
			refreshSuccessData();
		}
	}
	
	/**
	 * 与数据库对比，查出不存在的数据
	 * @author xiaoj02
	 * @date 2016年10月13日
	 */
	@Override
	public void checkWithDataBase(List<? extends GoodsSelect> dblist) {
//		for (int i = 0; i < excelListSuccessData.size(); i++) {
//			JSONObject jsonObject = excelListSuccessData.get(i);
//			String barCode = jsonObject.getString("barCode");
//			GoodsSelect goods = getByBarCode(dblist, barCode);
//			if(goods == null){//数据库不存在的数据
//				jsonObject.element("error", NOT_EXISTS);
//			}
//		}

		//刷新
		refreshSuccessData();
	}
	
//	/**
//	 * 根据barCode获取集合中的数据
//	 * @param list
//	 * @param barCode
//	 * @return
//	 * @author xiaoj02
//	 * @date 2016年10月14日
//	 */
//	private GoodsSelect getByBarCode(List<? extends GoodsSelect> list, String barCode){
//		for (GoodsSelect goods : list) {
//			String objBarCode = goods.getBarCode();
//			if(barCode.equals(objBarCode)){
//				return goods;
//			}
//		}
//		return null;
//	}
	
	/**
	 * 根据barCode获取集合中的数据
	 * @param list
	 * @param barCode
	 * @return
	 * @author xiaoj02
	 * @date 2016年10月14日
	 */
	private JSONObject getSuccessDataByBarCode(String barCode){
		for (JSONObject goods : excelListSuccessData) {
			String objBarCode = goods.getString("barCode");
			if(objBarCode.equals(barCode)){
				excelListSuccessData.remove(goods);
				return goods;
			}
		}
		return null;
	}
	

	/**
	 * 检验标记出商品信息异常过滤
	 * @author zhongy
	 * @date 2017年02月16日
	 */
	private void checkBarCodeIsNullAndRepeat(){
		
		Map<String,Integer> barCodeSet = new LinkedHashMap<String,Integer>();
		for (int i = 0; i < excelListFullData.size(); i++) {
			JSONObject obj = excelListFullData.get(i);
			//商品名称为空
			String skuName = obj.getString("skuName");
			if(StringUtils.isBlank(skuName)){
				obj.element("error", "商品名称为空");
				continue;
			}else{
				obj.put("skuName", skuName.trim());
			}
			
			//商品名称重复
			if(barCodeSet.keySet().contains(skuName)){
				//取出原来重复的数据,标记重复
				Integer index = barCodeSet.get(skuName);
				JSONObject existsObj = excelListFullData.get(index);
				obj.element("error", "商品名称重复");
				if(existsObj.get("error") == null){
					existsObj.element("error", "商品名称重复");
				}
				continue;
			}
			
			//计价方式：0普通，1计重、2计件
			String pricingType = obj.getString("pricingType");
			if(StringUtils.isBlank(pricingType)){
				obj.element("error", "计价方式为空");
				continue;
			}
			
			//计价方式错误
			PricingTypeEnum pricingTypeEnum = PricingTypeEnum.enumValueOf(pricingType);
			if(pricingTypeEnum == null) {
				obj.element("error", "计价方式错误");
				continue;
			}
			
			//计价方式：0普通，1计重、2计件
			String saleWay = obj.getString("saleWay");
			if(StringUtils.isBlank(saleWay)){
				obj.element("error", "经营方式为空");
				continue;
			}
			
			//计价方式错误
			SaleWayEnum saleWayEnum = SaleWayEnum.enumValueOf(saleWay);
			if(saleWayEnum == null) {
				obj.element("error", "经营方式错误");
				continue;
			}
			
			//商品条码:条码（必填项）：条码不能重复,如果商品为计件、计重的商品，则条码可为空。
			String barCode = obj.getString("barCode");
			if(String.valueOf(PricingTypeEnum.ORDINARY.ordinal()).equals(pricingType)) {
				if(StringUtils.isBlank(barCode)){
					obj.element("error", "商品条码为空");
					continue;
				}else{
					obj.put("barCode", barCode.trim());
				}
			}
			
			//商品条码重复
			if(barCodeSet.keySet().contains(barCode)){
				obj.element("error", "商品条码重复");
				continue;
			}
			
			//商品类型（0普通商品，1制单组合，2制单拆分，3捆绑商品，4自动转货
			String type = obj.getString("type");
			if(StringUtils.isBlank(type)){
				obj.element("error", "商品类型为空");
				continue;
			}
			
			//商品类型是否存在
			GoodsTypeEnum goodsTypeEnum = GoodsTypeEnum.enumValueOf(type);
			if(goodsTypeEnum==null){
				obj.element("error", "商品类型不存在");
				continue;
			}
			
			//进货规格
			String purchaseSpec = obj.getString("purchaseSpec");
			if(StringUtils.isNotBlank(purchaseSpec)){
				try {
					Double.parseDouble(purchaseSpec);
				} catch (Exception e) {
					obj.element("error", "进货规格只能为数字");
					continue;
				}
			}
			
			//配送规格
			String distributionSpec = obj.getString("distributionSpec");
			if(StringUtils.isNotBlank(distributionSpec)){
				try {
					Double.parseDouble(distributionSpec);
				} catch (Exception e) {
					obj.element("error", "配送规格只能为数字");
					continue;
				}
			}
			
			//零售价非空校验
			String salePrice = obj.getString("salePrice");
			if(StringUtils.isBlank(salePrice)){
			    obj.element("error", "零售价为空");
				continue;
			}
			
			//零售价数字校验
			if(StringUtils.isNotBlank(salePrice)){
				try {
					Double.parseDouble(salePrice);
				} catch (Exception e) {
					obj.element("error", "零售价只能为数字");
					continue;
				}
			}
			
			//批发价 特殊处理
			String wholesalePrice = obj.getString("wholesalePrice");
			if(StringUtils.isBlank(wholesalePrice)){
				obj.put("wholesalePrice", "0.00");
			}else{
				try {
					Double.parseDouble(wholesalePrice);
				} catch (Exception e) {
					obj.put("wholesalePrice", "0.00");
				}
			}
			
			//配送价 特殊处理
			String distributionPrice = obj.getString("distributionPrice");
			if(StringUtils.isBlank(distributionPrice)){
				obj.put("distributionPrice", "0.00");
			}else{
				try {
					Double.parseDouble(distributionPrice);
				} catch (Exception e) {
					obj.put("distributionPrice", "0.00");
				}
			}
			
			//最低售价 特殊处理
			String lowestPrice = obj.getString("lowestPrice");
			if(StringUtils.isBlank(lowestPrice)){
				obj.put("lowestPrice", "0.00");
			}else{
				try {
					Double.parseDouble(lowestPrice);
				} catch (Exception e) {
					obj.put("lowestPrice", "0.00");
				}
			}
			
			//会员价 特殊处理
			String vipPrice = obj.getString("vipPrice");
			if(StringUtils.isBlank(vipPrice)){
				obj.put("vipPrice", salePrice);
			}else{
				try {
					Double.parseDouble(vipPrice);
				} catch (Exception e) {
					obj.put("vipPrice", salePrice);
				}
			}
			
			//销项税率 特殊处理
			String outputTax = obj.getString("outputTax");
			if(StringUtils.isNotBlank(outputTax)){
				try {
					Double.parseDouble(outputTax);
				} catch (Exception e) {
					obj.put("outputTax", "");
				}
			}
			
			//进项税率 特殊处理
			String inputTax = obj.getString("inputTax");
			if(StringUtils.isNotBlank(inputTax)){
				try {
					Double.parseDouble(inputTax);
				} catch (Exception e) {
					obj.put("inputTax", "");
				}
			}
			
			//放入map
			if(StringUtils.isNotBlank(barCode)){
				barCodeSet.put(skuName+barCode,new Integer(i));
			}else{
				barCodeSet.put(skuName,new Integer(i));
			}
		}
		//刷新
		refreshSuccessData();
	}
	
	/**
	 * 更新有效的数据列表
	 * @author xiaoj02
	 * @date 2016年10月13日
	 */
	private void refreshSuccessData(){
		excelListSuccessData = new ArrayList<JSONObject>();
		excelSuccessBarCode = new ArrayList<String>();
		excelListErrorData = new ArrayList<JSONObject>();
		for (JSONObject jsonObject : excelListFullData) {
			if(jsonObject.get("error") == null){
				excelListSuccessData.add(jsonObject);
				excelSuccessBarCode.add(jsonObject.getString("barCode"));
			}else{
				excelListErrorData.add(jsonObject);
			}
		}
	}
	
	@Override
	public <T extends GoodsSelect> List<T> getSuccessData(List<T> list, String[] excelField,T entity){
		JSONArray arr = JSONArray.fromObject(list);
		
		for (int i = 0; i < arr.size(); i++) {
			JSONObject obj = arr.getJSONObject(i);	
			
			String barCode = obj.getString("barCode");
			JSONObject excelJson = new JSONObject();
			excelJson = getSuccessDataByBarCode(barCode);
			
			//忽略第一列,合并属性
			for (int j = 1; j < excelField.length; j++) {
				obj.element(excelField[j], excelJson.get(excelField[j]));
			}
		}
		JSONUtils.getMorpherRegistry().registerMorpher(new EnumMorpher(GoodsTypeEnum.class));
		
		JsonConfig jsonConfig = new JsonConfig();
		@SuppressWarnings("unchecked")
		List<T> temp = JSONArray.toList(arr, entity, jsonConfig);
		
		//处理数据
//		businessValid.formatter(temp, tempExcelListSuccessData, excelListErrorData);
		// 刷新
		refreshSuccessData();
		return temp;
		
	}
	
	/**
	 * @return the excelListSuccessData
	 */
	@Override
	public List<JSONObject> getExcelListSuccessData() {
		return excelListSuccessData;
	}
	
	/**
	 * @return the excelSuccessBarCode
	 */
	@Override
	public List<String> getExcelSuccessCode() {
		return excelSuccessBarCode;
	}
	
	/**
	 * @return the excelListErrorData
	 */
	@Override
	public List<JSONObject> getExcelListErrorData() {
		return excelListErrorData;
	}
	
}
