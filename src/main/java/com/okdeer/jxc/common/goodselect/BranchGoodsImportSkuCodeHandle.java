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
import com.okdeer.jxc.goods.entity.GoodsBranchPriceVo;

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

public class BranchGoodsImportSkuCodeHandle implements BranchGoodsImportHandle{
	
	public static final String SKU_CODE_IS_BLANK = "货号为空";
	public static final String SKU_CODE_IS_REPEAT = "货号重复";
	public static final String BAR_CODE_IS_BLANK = "条码为空";
	public static final String BAR_CODE_IS_REPEAT = "条码重复";
	
	public static final String NOT_EXISTS = "找不到该商品";

	List<JSONObject> excelListFullData = null;
	List<JSONObject> excelListSuccessData = null;
	List<JSONObject> excelListErrorData = null;
	String type = "";
	
	List<String> excelSuccessSkuCode = null; 
	
	GoodsSelectImportBusinessValid businessValid;
	
	// 临时存储数据
	List<JSONObject> tempExcelListSuccessData = new ArrayList<JSONObject>();
	
	public BranchGoodsImportSkuCodeHandle(String type,List<JSONObject> excelList, String[] excelField, GoodsSelectImportBusinessValid businessValid){
		this.excelListFullData = excelList;
		this.businessValid = businessValid;
		this.type = type;
		//检验标记出SkuCode重复或者为空的数据
		checkSkuCodeIsNullAndRepeat();
		
		if(businessValid != null){
			// 深度拷贝正确的数据
			tempExcelListSuccessData.addAll(excelListSuccessData);
			//业务校验
			businessValid.businessValid(excelListSuccessData, excelField);
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
	public void checkWithDataBase(List<? extends GoodsBranchPriceVo> dblist,String type) {
		for (int i = 0; i < excelListSuccessData.size(); i++) {
			JSONObject jsonObject = excelListSuccessData.get(i);
			if (type.equals(BranchGoodsImportHandle.TYPE_SKU_CODE)) {
				String skuCode = jsonObject.getString("skuCode");
				GoodsBranchPriceVo goods = getBySkuCode(dblist, skuCode);
				if(goods == null){//数据库不存在的数据
					jsonObject.element("error", NOT_EXISTS);
				}
			}else{
				String barCode = jsonObject.getString("barCode");
				GoodsBranchPriceVo goods = getByBarCode(dblist, barCode);
				if(goods == null){//数据库不存在的数据
					jsonObject.element("error", NOT_EXISTS);
				}
			}
		}
		//刷新
		refreshSuccessData();
		
		
	}
	
	/**
	 * 根据skuCode获取集合中的数据
	 * @param list
	 * @param skuCode
	 * @return
	 * @author xiaoj02
	 * @date 2016年10月14日
	 */
	private GoodsBranchPriceVo getBySkuCode(List<? extends GoodsBranchPriceVo> list, String skuCode){
		for (GoodsBranchPriceVo goods : list) {
			String objSkuCode = goods.getSkuCode();
			if(skuCode.equals(objSkuCode)){
				return goods;
			}
		}
		return null;
	}
	
	/**
	 * 根据skuCode获取集合中的数据
	 * @param list
	 * @param skuCode
	 * @return
	 * @author xiaoj02
	 * @date 2016年10月14日
	 */
	private GoodsBranchPriceVo getByBarCode(List<? extends GoodsBranchPriceVo> list, String barCode){
		for (GoodsBranchPriceVo goods : list) {
			String objbarCode = goods.getBarCode();
			if(barCode.equals(objbarCode)){
				return goods;
			}
		}
		return null;
	}
	
	/**
	 * 根据skuCode获取集合中的数据
	 * @param list
	 * @param skuCode
	 * @return
	 * @author xiaoj02
	 * @date 2016年10月14日
	 */
	private JSONObject getSuccessDataByCode(String code,String type){
		for (JSONObject goods : excelListSuccessData) {
			if (type.equals(BranchGoodsImportHandle.TYPE_SKU_CODE)) {
				String objSkuCode = goods.getString("skuCode");
				if(code.equals(objSkuCode)){
					excelListSuccessData.remove(goods);
					return goods;
				}
			}else{
				String objBarCode = goods.getString("barCode");
				if(code.equals(objBarCode)){
					excelListSuccessData.remove(goods);
					return goods;
				}
			}
		}
		return null;
	}
	

	/**
	 * 检验标记出SkuCode重复或者为空的数据
	 * @author xiaoj02
	 * @date 2016年10月13日
	 */
	private void checkSkuCodeIsNullAndRepeat(){
		
		Map<String,Integer> skuCodeSet = new LinkedHashMap<String,Integer>();
		for (int i = 0; i < excelListFullData.size(); i++) {
			JSONObject obj = excelListFullData.get(i);
			if(BranchGoodsImportHandle.TYPE_SKU_CODE.equals(type)) {
				String objSkuCode = obj.getString("skuCode");
				//货号为空
				if(StringUtils.isBlank(objSkuCode)){
					obj.element("error", SKU_CODE_IS_BLANK);
					continue;
				}
				
				//货号是否符合规则
				if(StringUtils.isNotBlank(objSkuCode)){
					try {
						Double.parseDouble(objSkuCode);
					} catch (Exception e) {
						obj.element("error", "货号只能为数字");
						continue;
					}
				}
				//货号重复
				if(skuCodeSet.keySet().contains(objSkuCode)){
					obj.element("error", SKU_CODE_IS_REPEAT);
					Integer index = skuCodeSet.get(objSkuCode);
					JSONObject existsObj = excelListFullData.get(index);
					if(existsObj.get("error") == null){
						existsObj.element("error", SKU_CODE_IS_REPEAT);
					}
					continue;
				}
				skuCodeSet.put(objSkuCode,new Integer(i));
			}else{
				String barCode = obj.getString("barCode");
				//条码为空
				if(StringUtils.isBlank(barCode)){
					obj.element("error", BAR_CODE_IS_BLANK);
					continue;
				}
				
				//条码是否符合规则
				if(StringUtils.isNotBlank(barCode)){
					try {
						Double.parseDouble(barCode);
					} catch (Exception e) {
						obj.element("error", "货号只能为数字");
						continue;
					}
				}
				//条码重复
				if(skuCodeSet.keySet().contains(barCode)){
					obj.element("error", BAR_CODE_IS_REPEAT);
					Integer index = skuCodeSet.get(barCode);
					JSONObject existsObj = excelListFullData.get(index);
					if(existsObj.get("error") == null){
						existsObj.element("error", BAR_CODE_IS_REPEAT);
					}
					continue;
				}
				skuCodeSet.put(barCode,new Integer(i));
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
		excelSuccessSkuCode = new ArrayList<String>();
		excelListErrorData = new ArrayList<JSONObject>();
		for (JSONObject jsonObject : excelListFullData) {
			if(jsonObject.get("error") == null){
				excelListSuccessData.add(jsonObject);
				if(BranchGoodsImportHandle.TYPE_SKU_CODE.equals(type)) {
					excelSuccessSkuCode.add(jsonObject.getString("skuCode"));
				}else{
					excelSuccessSkuCode.add(jsonObject.getString("barCode"));
				}
			}else{
				excelListErrorData.add(jsonObject);
			}
		}
	}
	
	@Override
	public <T extends GoodsBranchPriceVo> List<T> getSuccessData(String type,List<T> list, String[] excelField,T entity){
		JSONArray arr = JSONArray.fromObject(list);
		
		for (int i = 0; i < arr.size(); i++) {
			JSONObject obj = arr.getJSONObject(i);	
			String code = "";
			if (type.equals(BranchGoodsImportHandle.TYPE_SKU_CODE)) {
				code = obj.getString("skuCode");
			}else{
				code = obj.getString("barCode");
			}
			JSONObject excelJson = getSuccessDataByCode(code,type);
			
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
		//businessValid.formatter(temp, tempExcelListSuccessData, excelListErrorData);
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
	 * @return the excelSuccessSkuCode
	 */
	@Override
	public List<String> getExcelSuccessCode() {
		return excelSuccessSkuCode;
	}
	
	/**
	 * @return the excelListErrorData
	 */
	@Override
	public List<JSONObject> getExcelListErrorData() {
		return excelListErrorData;
	}
	
}
