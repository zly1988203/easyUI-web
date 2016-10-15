/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年10月13日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.common.goodselect;

import java.io.InputStream;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSONArray;
import com.okdeer.jxc.goods.entity.GoodsSelect;
import com.okdeer.jxc.goods.service.GoodsSelectServiceApi;
import com.okdeer.jxc.utils.poi.ExcelExportUtil;
import com.okdeer.jxc.utils.poi.ExcelReaderUtil;

import net.sf.json.JSONObject;


/**
 * ClassName: GoodsSelectCompent 
 * @author xiaoj02
 * @date 2016年10月13日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Component
public class GoodsSelectImportComponent {
	
	private static final Logger LOG = LoggerFactory.getLogger(GoodsSelectImportComponent.class);
	
	@Reference(version = "1.0.0", check = false)
	private GoodsSelectServiceApi goodsSelectServiceApi;
	
	@Resource 
	private StringRedisTemplate redisTemplateTmp;
	
	/**
	 * 导入excel，查询商品(单个机构)
	 * @Description: TODO
	 * @param fileName
	 * @param is
	 * @param fields
	 * @param entity
	 * @param branchId
	 * @param userId
	 * @param type
	 * @param errorFileDownloadUrlPrefix
	 * @param businessValid
	 * @return
	 * @author xiaoj02
	 * @date 2016年10月15日
	 */
	public <T extends GoodsSelect> GoodsSelectImportVo<T> importSelectGoods(String fileName, InputStream is, String[] fields, T entity, String branchId, String userId, String type, String errorFileDownloadUrlPrefix ,GoodsSelectImportBusinessValid businessValid) {
		String[] branchIds = {branchId};
		return importSelectGoodsMultiBranch(fileName, is, fields, entity, branchIds, userId, type, false, errorFileDownloadUrlPrefix, businessValid);
	}
	
	/**
	 *  导入excel，查询商品(多个机构)
	 * @Description: TODO
	 * @param fileName
	 * @param is
	 * @param fields
	 * @param entity
	 * @param branchId
	 * @param userId
	 * @param type
	 * @param errorFileDownloadUrlPrefix
	 * @param businessValid
	 * @return
	 * @author xiaoj02
	 * @date 2016年10月15日
	 */
	public <T extends GoodsSelect> GoodsSelectImportVo<T> importSelectGoodsMultiBranch(String fileName, InputStream is, String[] fields, T entity, String[] branchId, String userId, String type, String errorFileDownloadUrlPrefix ,GoodsSelectImportBusinessValid businessValid) {
		return importSelectGoodsMultiBranch(fileName, is, fields, entity, branchId, userId, type, false, errorFileDownloadUrlPrefix, businessValid);
	}
	
	/**
	 * 导入excel，查询商品和库存(单个机构)
	 * @Description: TODO
	 * @param fileName
	 * @param is
	 * @param fields
	 * @param entity
	 * @param branchId
	 * @param userId
	 * @param type
	 * @param errorFileDownloadUrlPrefix
	 * @param businessValid
	 * @return
	 * @author xiaoj02
	 * @date 2016年10月15日
	 */
	public <T extends GoodsSelect> GoodsSelectImportVo<T> importSelectGoodsWithStock(String fileName, InputStream is, String[] fields, T entity, String branchId, String userId, String type, String errorFileDownloadUrlPrefix ,GoodsSelectImportBusinessValid businessValid) {
		String[] branchIds = {branchId};
		return importSelectGoodsMultiBranch(fileName, is, fields, entity, branchIds, userId, type, true, errorFileDownloadUrlPrefix, businessValid);
	}
	
	/**
	 * 导入excel，查询商品和库存(多个机构)
	 * @Description: TODO
	 * @param fileName
	 * @param is
	 * @param fields
	 * @param entity
	 * @param branchId
	 * @param userId
	 * @param type
	 * @param errorFileDownloadUrlPrefix
	 * @param businessValid
	 * @return
	 * @author xiaoj02
	 * @date 2016年10月15日
	 */
	public <T extends GoodsSelect> GoodsSelectImportVo<T> importSelectGoodsMultiBranchWithStock(String fileName, InputStream is, String[] fields, T entity, String[] branchId, String userId, String type, String errorFileDownloadUrlPrefix ,GoodsSelectImportBusinessValid businessValid) {
		return importSelectGoodsMultiBranch(fileName, is, fields, entity, branchId, userId, type, true, errorFileDownloadUrlPrefix, businessValid);
	}
	

	/**
	 * @author xiaoj02
	 * @date 2016年10月13日
	 */
	private <T extends GoodsSelect> GoodsSelectImportVo<T> importSelectGoodsMultiBranch(String fileName, InputStream is, String[] fields, T entity, String[] branchId, String userId, String type, Boolean withStock, String errorFileDownloadUrlPrefix ,GoodsSelectImportBusinessValid businessValid) {
		//读取excel
		List<JSONObject> excelList = ExcelReaderUtil.readExcel(fileName, is, fields);
		
		if(StringUtils.isBlank(type)){
			LOG.error("导入类型为空");
			throw new RuntimeException("导入类型为空");
		}
		
		GoodsSelectImportHandle goodsSelectImportHandle = null;
		List<GoodsSelect> dbList = null;
		
		if(type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)){//货号
			//构建数据过滤对象
			goodsSelectImportHandle = new GoodsSelectImportSkuCodeHandle(excelList, fields, businessValid);
			
			//获取已验证成功的数据的货号
			List<String> list = goodsSelectImportHandle.getExcelSuccessCode();
			
			//根据货号查询商品
			dbList = goodsSelectServiceApi.queryListBySkuCode(list.toArray(new String[list.size()]), branchId, withStock);
			
		}else if(type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)){//条码
			
			//构建数据过滤对象
			goodsSelectImportHandle = new GoodsSelectImportBarCodeHandle(excelList, fields, businessValid);
			
			//获取已验证成功的数据的条码
			List<String> list = goodsSelectImportHandle.getExcelSuccessCode();
			
			//根据条码查询商品，过滤掉条码重复的商品
			dbList = goodsSelectServiceApi.queryListByBarCode(list.toArray(new String[list.size()]), branchId, withStock);
			
		}else{
			throw new RuntimeException("导入类型不合法:\t"+type);
		}
		
		//与数据库对比,标记处该店铺中未查询到的数据
		goodsSelectImportHandle.checkWithDataBase(dbList);
		
		Integer successNum = goodsSelectImportHandle.getExcelListSuccessData().size();
		
		Integer errorNum = goodsSelectImportHandle.getExcelListErrorData().size();
		
		StringBuffer message = new StringBuffer();
		message.append("成功：");
		message.append(successNum);
		message.append("条，");
		message.append("失败：");
		message.append(errorNum);
		message.append("条。");
		
		GoodsSelectImportVo<T> goodsSelectImportVo = new GoodsSelectImportVo<T>();
		
		@SuppressWarnings("unchecked")
		List<T> successList = (List<T>) goodsSelectImportHandle.getSuccessData(dbList, fields, entity);
		
		goodsSelectImportVo.setList(successList);
		
		goodsSelectImportVo.setMessage(message.toString());
		
		List<JSONObject> errorList = goodsSelectImportHandle.getExcelListErrorData();
		
		if(errorList != null && errorList.size() > 0){//有错误数据
			//错误excel内容
			String jsonText = JSONArray.toJSON(errorList).toString();
			//文件key
			String code = "jxc_goodsSelectImport_" + userId;
			// 保存10分钟，单用户同时只能保存一个错误文件
			redisTemplateTmp.opsForValue().set(code, jsonText, 10, TimeUnit.MINUTES);
			
			goodsSelectImportVo.setErrorFileUrl(errorFileDownloadUrlPrefix + "?code="+code+"&type="+type);
		}else{//无错误数据
			String code = "goodsSelectImport_" + userId;
			redisTemplateTmp.delete(code);
		}
		
		return goodsSelectImportVo;
	}
	
	/**
	 * 
	 * @Description: 下载错误文件
	 * @param code 下载的key
	 * @param reportFileName 导出文件名称
	 * @param headers 表格头名称
	 * @param columns 表格头对应的属性名称
	 * @param response 输出对象
	 * @author xiaoj02
	 * @date 2016年10月15日
	 */
	public void downloadErrorFile(String code, String reportFileName, String[] headers, String[] columns, HttpServletResponse response){
		String jsonText = redisTemplateTmp.opsForValue().get(code);
		
		headers = ArrayUtils.add(headers, "错误原因");
		columns = ArrayUtils.add(columns, "error");
		
		List<JSONObject> dataList = JSONArray.parseArray(jsonText, JSONObject.class);
		
		ExcelExportUtil.exportExcel(reportFileName, headers, columns, dataList, response);
	}
	
	

}
