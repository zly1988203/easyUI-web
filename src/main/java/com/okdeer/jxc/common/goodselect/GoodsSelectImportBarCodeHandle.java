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

public class GoodsSelectImportBarCodeHandle implements GoodsSelectImportHandle{
	
	public static final String CODE_IS_BLANK = "条码为空";
	public static final String CODE_IS_REPEAT = "条码重复";
	public static final String NOT_EXISTS = "该店铺中无此商品或者存在多个条码重复的商品";

	List<JSONObject> excelListFullData = null;
	List<JSONObject> excelListSuccessData = null;
	List<JSONObject> excelListErrorData = null;
	
	List<String> excelSuccessBarCode = null; 
	
	GoodsSelectImportBusinessValid businessValid;
	
	
	public GoodsSelectImportBarCodeHandle(List<JSONObject> excelList, String[] excelField, GoodsSelectImportBusinessValid businessValid){
		this.excelListFullData = excelList;
		this.businessValid = businessValid;
		//检验标记出BarCode重复或者为空的数据
		checkBarCodeIsNullAndRepeat();
		
		if(businessValid != null){
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
	public void checkWithDataBase(List<? extends GoodsSelect> dblist) {
		for (int i = 0; i < excelListSuccessData.size(); i++) {
			JSONObject jsonObject = excelListSuccessData.get(i);
			String barCode = jsonObject.getString("barCode");
			GoodsSelect goods = getByBarCode(dblist, barCode);
			if(goods == null){//数据库不存在的数据
				jsonObject.element("error", NOT_EXISTS);
			}
		}
		
		//数据库重复的数据在SQL过滤掉
		
		//刷新
		refreshSuccessData();
	}
	
	/**
	 * 根据barCode获取集合中的数据
	 * @param list
	 * @param barCode
	 * @return
	 * @author xiaoj02
	 * @date 2016年10月14日
	 */
	private GoodsSelect getByBarCode(List<? extends GoodsSelect> list, String barCode){
		for (GoodsSelect goods : list) {
			String objBarCode = goods.getBarCode();
			if(barCode.equals(objBarCode)){
				return goods;
			}
		}
		return null;
	}
	
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
			if(barCode.equals(objBarCode)){
				return goods;
			}
		}
		return null;
	}
	

	/**
	 * 检验标记出BarCode重复或者为空的数据
	 * @author xiaoj02
	 * @date 2016年10月13日
	 */
	private void checkBarCodeIsNullAndRepeat(){
		
		Map<String,Integer> barCodeSet = new LinkedHashMap<String,Integer>();
		for (int i = 0; i < excelListFullData.size(); i++) {
			JSONObject obj = excelListFullData.get(i);
			String objBarCode = obj.getString("barCode");
			//条码为空
			if(StringUtils.isBlank(objBarCode)){
				obj.element("error", CODE_IS_BLANK);
				continue;
			}
			//条码重复
			if(barCodeSet.keySet().contains(objBarCode)){
				
				obj.element("error", CODE_IS_REPEAT);
				//取出原来重复的数据,标记重复
				Integer index = barCodeSet.get(objBarCode);
				JSONObject existsObj = excelListFullData.get(index);
				if(existsObj.get("error") == null){
					existsObj.element("error", CODE_IS_REPEAT);
				}
				
				continue;
			}
			barCodeSet.put(objBarCode,new Integer(i));
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
			JSONObject excelJson = getSuccessDataByBarCode(barCode);
			
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
		businessValid.formatter(temp);
		
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
