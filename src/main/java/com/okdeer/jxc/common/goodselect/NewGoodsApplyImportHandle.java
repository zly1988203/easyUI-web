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
			boolean barCodeFlag = goods.containsKey("barCode");
			if(barCodeFlag){
				String objBarCode = goods.getString("barCode");
				if(objBarCode.equals(barCode)){
					excelListSuccessData.remove(goods);
					return goods;
				}
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
			boolean skuNameFlag = obj.containsKey("skuName");
			String skuName = "";
			if(!skuNameFlag){
				obj.element("error", "商品名称为空");
				continue;
			}else{
				skuName = obj.getString("skuName");
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
			}
			
			//计价方式：0普通，1计重、2计件
			boolean pricingTypeFlag = obj.containsKey("pricingType");
			String pricingType = "";
			if(pricingTypeFlag){
				pricingType = obj.getString("pricingType");
				if(StringUtils.isNotBlank(pricingType)){
					PricingTypeEnum pricingTypeEnum = PricingTypeEnum.enumValueOf(pricingType);
					if(pricingTypeEnum == null) {
						obj.element("error", "计价方式错误");
						continue;
					}
				}else{
					obj.element("error", "计价方式为空");
					continue;
				}
			}else{
				obj.element("error", "计价方式为空");
				continue;
			}
			
			//普通商品:条码（必填项）：条码不能重复,如果商品为计件、计重的商品，则条码可为空。
			String barCode = "";
			boolean barCodeFlag = obj.containsKey("barCode");
			if(StringUtils.isBlank(pricingType)) {
				if(!barCodeFlag){
					obj.element("error", "商品条码为空");
					obj.put("pricingType",pricingType);
					continue;
				}
				barCode = obj.getString("barCode");
				obj.put("barCode", barCode.trim());
			}else{
				if(barCodeFlag){
					barCode = obj.getString("barCode");
					obj.put("barCode", barCode.trim());
				}
			}
			
			//商品条码重复
			if(StringUtils.isNotBlank(barCode)){
				if(barCodeSet.keySet().contains(barCode)){
					obj.element("error", "商品条码重复");
					continue;
				}
			}
			
			//零售价非空校验
			boolean salePriceFlag = checkRequiredCommonPrice(obj, "salePrice", "零售价只能为数字", "零售价为空");
			if(!salePriceFlag){
				continue;
			}
			
			//进货价非空校验
			boolean purchasePriceFlag = checkRequiredCommonPrice(obj, "purchasePrice", "进货价只能为数字", "进货价为空");
			if(!purchasePriceFlag){
				continue;
			}
			
			//商品类型（0普通商品，1制单组合，2制单拆分，3捆绑商品，4自动转货
			boolean typeFlag = obj.containsKey("type");
			if(typeFlag){
				String type = obj.getString("type");
				if(StringUtils.isNotBlank(type)){
					GoodsTypeEnum goodsTypeEnum = GoodsTypeEnum.enumValueOf(type);
					if(goodsTypeEnum==null){
						obj.element("error", "商品类型不存在");
						continue;
					}
				}
			}
			
			//进货规格
			boolean purchaseSpecFlag = checkCommonSpec(obj, "purchaseSpec", "进货规格只能为数字");
			if(!purchaseSpecFlag ){
				continue;
			}
			
			//配送规格
			boolean distributionSpecFlag = checkCommonSpec(obj, "distributionSpec", "配送规格只能为数字");
			if(!distributionSpecFlag ){
				continue;
			}
			
			
			//批发价
			boolean wholesalePriceFlag = checkNotRequiredCommonPrice(obj, "wholesalePrice", "批发价只能为数字");
			if(!wholesalePriceFlag){
				continue;
			}
			
			//配送价
			boolean distributionPriceFlag = checkNotRequiredCommonPrice(obj, "distributionPrice", "配送价只能为数字");
			if(!distributionPriceFlag){
				continue;
			}
			//会员价
			boolean vipPriceFlag = checkVipPrice(obj, "vipPrice", "会员价只能为数字");
			if(!vipPriceFlag){
				continue;
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
	 * @Description: 价格非必填校验
	 * @param obj 对象
	 * @param colkey 字段key
	 * @param msg 提示信息
	 * @return   
	 * @return boolean  
	 * @throws
	 * @author zhongy
	 * @date 2017年2月24日
	 */
	private boolean checkVipPrice(JSONObject obj,String colkey,String msg) {
		String salePrice = obj.getString("salePrice");
		boolean colFlag = obj.containsKey(colkey);
		if(colFlag){
			String price = obj.getString(colkey);
			if(StringUtils.isBlank(price)){
				obj.put(colkey, salePrice);
			}else{
				try {
					Double.parseDouble(price);
				} catch (Exception e) {
					obj.element("error", msg);
					return false;
				}
			}
		}else{
			obj.put(colkey, salePrice);
		}
		return true;
	}
	/**
	 * @Description: 价格非必填校验
	 * @param obj 对象
	 * @param colkey 字段key
	 * @param msg 提示信息
	 * @return   
	 * @return boolean  
	 * @throws
	 * @author zhongy
	 * @date 2017年2月24日
	 */
	private boolean checkNotRequiredCommonPrice(JSONObject obj,String colkey,String msg) {
		boolean colFlag = obj.containsKey(colkey);
		if(colFlag){
			String price = obj.getString(colkey);
			if(StringUtils.isNotBlank(price)){
			try {
				Double.parseDouble(price);
			} catch (Exception e) {
				obj.element("error", msg);
				return false;
			}
		  }
		}
		return true;
	}
	
	/**
	 * @Description: 价格必填校验
	 * @param obj 对象
	 * @param colkey 字段key
	 * @param msg 提示信息
	 * @return   
	 * @return boolean  
	 * @throws
	 * @author zhongy
	 * @date 2017年2月24日
	 */
	private boolean checkRequiredCommonPrice(JSONObject obj,String colkey,String msg1,String msg2) {
		boolean colFlag = obj.containsKey(colkey);
		if(colFlag){
			String price = obj.getString(colkey);
			if(StringUtils.isBlank(price)){
				obj.element("error", msg2);
				return false;
			}else{
				try {
					Double.parseDouble(price);
				} catch (Exception e) {
					obj.element("error", msg1);
					return false;
				}
			}
		}else{
			obj.element("error", msg2);
			return false;
		}
		return true;
	}
	
	/**
	 * @Description: 规格校验
	 * @param obj 对象
	 * @param colkey 字段key
	 * @param msg 提示信息
	 * @return   
	 * @return boolean  
	 * @throws
	 * @author zhongy
	 * @date 2017年2月24日
	 */
	private boolean checkCommonSpec(JSONObject obj,String colkey,String msg) {
		boolean flag = obj.containsKey(colkey);
		if(flag){
			String spec = obj.getString(colkey);
			if(StringUtils.isNotBlank(spec)){
				try {
					Double.parseDouble(spec);
				} catch (Exception e) {
					obj.element("error", msg);
					return false;
				}
			}
		}
		return true;
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
				boolean barCodeFlag = jsonObject.containsKey("barCode");
				if(barCodeFlag){
					excelSuccessBarCode.add(jsonObject.getString("barCode"));
				}
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
			
			boolean flagBarCode = obj.containsKey("barCode");
			JSONObject excelJson = new JSONObject();
			if(flagBarCode){
				String barCode = obj.getString("barCode");
				excelJson = getSuccessDataByBarCode(barCode);
			}
			
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
