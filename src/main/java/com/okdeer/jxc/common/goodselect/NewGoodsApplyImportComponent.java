/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年10月13日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.common.goodselect;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.okdeer.base.common.exception.ServiceException;
import com.okdeer.jxc.common.enums.GoodsStatusEnum;
import com.okdeer.jxc.common.enums.GoodsTypeEnum;
import com.okdeer.jxc.common.enums.PricingTypeEnum;
import com.okdeer.jxc.common.enums.SaleWayEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.goods.entity.GoodsBrand;
import com.okdeer.jxc.goods.entity.GoodsCategory;
import com.okdeer.jxc.goods.entity.GoodsSelect;
import com.okdeer.jxc.goods.entity.NewGoodsApply;
import com.okdeer.jxc.goods.service.GoodsBrandServiceApi;
import com.okdeer.jxc.goods.service.GoodsCategoryServiceApi;
import com.okdeer.jxc.goods.service.GoodsSelectServiceApi;
import com.okdeer.jxc.goods.service.GoodsSkuServiceApi;
import com.okdeer.jxc.goods.service.NewGoodsApplyServiceApi;
import com.okdeer.jxc.supplier.entity.Supplier;
import com.okdeer.jxc.supplier.service.SupplierServiceApi;
import com.okdeer.jxc.utils.UserUtil;
import com.okdeer.jxc.utils.poi.ExcelExportUtil;
import com.okdeer.jxc.utils.poi.ExcelReaderUtil;

import net.sf.json.JSONObject;


/**
 * 商品选择，通用excel导入组件
 * ClassName: GoodsSelectCompent 
 * @author xiaoj02
 * @date 2016年10月13日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *		v1.1			2016-10-17		xiaoj02				商品选择，通用excel导入组件
 */
@Component
public class NewGoodsApplyImportComponent {
	
	private static final Logger LOG = LoggerFactory.getLogger(NewGoodsApplyImportComponent.class);
	
	@Reference(version = "1.0.0", check = false)
	private GoodsSelectServiceApi goodsSelectServiceApi;
	
	@Reference(version = "1.0.0", check = false)
	private NewGoodsApplyServiceApi newGoodsApplyServiceApi;
	
	@Reference(version = "1.0.0", check = false)
	private GoodsCategoryServiceApi goodsCategoryService;
	
	@Reference(version = "1.0.0", check = false)
	private GoodsBrandServiceApi goodsBrandService;
	
	@Reference(version = "1.0.0", check = false)
	private SupplierServiceApi supplierService;
	
	@Reference(version = "1.0.0", check = false)
	private NewGoodsApplyServiceApi newGoodsApplyService;
	
	@Reference(version = "1.0.0", check = false)
	private GoodsSkuServiceApi goodsSkuService;
	
	@Resource 
	private StringRedisTemplate redisTemplateTmp;
	
	/**
	 * 导入excel，通过导入的数据查询商品(单个机构)
	 * @param fileName 文件名，用于识别excel文件版本
	 * @param is	文件流
	 * @param fields	属性数组，excel数据列所对应实体类属性
	 * @param entity	业务实体类
	 * @param branchId 机构
	 * @param userId 用户
	 * @param type 导入类型，（0货号、1条码）
	 * @param errorFileDownloadUrlPrefix  失败文件下载地址前缀
	 * @param businessValid 业务验证回调
	 * @param map_branchid 要货机构和发货机构id map
	 * @return
	 * @author zhongy
	 * @date 2016年10月15日
	 */
	public <T extends GoodsSelect> GoodsSelectImportVo<T> importSelectGoods(String fileName, InputStream is,
			String[] fields, T entity, String branchId, String userId, String type, String errorFileDownloadUrlPrefix,
			GoodsSelectImportBusinessValid businessValid, Map<String, String> map_branchid) throws ServiceException {
		String[] branchIds = {branchId};
		return importSelectGoodsMultiBranch(fileName, is, fields, entity, branchIds, userId, type, false,
				errorFileDownloadUrlPrefix, businessValid, map_branchid);
	}
	
	/**
	 *  导入excel，查询商品(多个机构)
	 * @param fileName 文件名，用于识别excel文件版本
	 * @param is	文件流
	 * @param fields	属性数组，excel数据列所对应实体类属性
	 * @param entity	业务实体类
	 * @param branchId 机构
	 * @param userId 用户
	 * @param type 导入类型，（0货号、1条码）
	 * @param errorFileDownloadUrlPrefix  失败文件下载地址前缀
	 * @param businessValid 业务验证回调
	 * @return
	 * @author xiaoj02
	 * @date 2016年10月15日
	 */
	public <T extends GoodsSelect> GoodsSelectImportVo<T> importSelectGoodsMultiBranch(String fileName, InputStream is, String[] fields, 
			T entity, String[] branchId, String userId, String type, String errorFileDownloadUrlPrefix ,
			GoodsSelectImportBusinessValid businessValid) throws ServiceException {
		return importSelectGoodsMultiBranch(fileName, is, fields, entity, branchId, userId, type, false,
				errorFileDownloadUrlPrefix, businessValid, null);
	}
	
	/**
	 * 导入excel，查询商品和库存(单个机构)
	 * @param fileName 文件名，用于识别excel文件版本
	 * @param is	文件流
	 * @param fields	属性数组，excel数据列所对应实体类属性
	 * @param entity	业务实体类
	 * @param branchId 机构
	 * @param userId 用户
	 * @param type 导入类型，（0货号、1条码）
	 * @param errorFileDownloadUrlPrefix  失败文件下载地址前缀
	 * @param businessValid 业务验证回调
	 * @return
	 * @author xiaoj02
	 * @date 2016年10月15日
	 */
	public <T extends GoodsSelect> GoodsSelectImportVo<T> importSelectGoodsWithStock(String fileName, InputStream is, String[] fields, T entity, String branchId, String userId, String type, 
			String errorFileDownloadUrlPrefix ,GoodsSelectImportBusinessValid businessValid) throws ServiceException {
		String[] branchIds = {branchId};
		return importSelectGoodsMultiBranch(fileName, is, fields, entity, branchIds, userId, type, true,
				errorFileDownloadUrlPrefix, businessValid, null);
	}
	
	/**
	 * 导入excel，查询商品和库存(多个机构)
	 * @param fileName 文件名，用于识别excel文件版本
	 * @param is	文件流
	 * @param fields	属性数组，excel数据列所对应实体类属性
	 * @param entity	业务实体类
	 * @param branchId 机构
	 * @param userId 用户
	 * @param type 导入类型，（0货号、1条码）
	 * @param errorFileDownloadUrlPrefix  失败文件下载地址前缀
	 * @param businessValid 业务验证回调
	 * @return
	 * @author xiaoj02
	 * @date 2016年10月15日
	 */
	public <T extends GoodsSelect> GoodsSelectImportVo<T> importSelectGoodsMultiBranchWithStock(String fileName,
			InputStream is, String[] fields, T entity, String[] branchId, String userId, String type,
			String errorFileDownloadUrlPrefix, GoodsSelectImportBusinessValid businessValid) throws ServiceException {
		return importSelectGoodsMultiBranch(fileName, is, fields, entity, branchId, userId, type, true,
				errorFileDownloadUrlPrefix, businessValid, null);
	}
	

	/**
	 * 导入excel，查询商品
	 * @author xiaoj02
	 * @throws ServiceException 
	 * @date 2016年10月13日
	 */
	private <T extends GoodsSelect> GoodsSelectImportVo<T> importSelectGoodsMultiBranch(String fileName,
			InputStream is, String[] fields, T entity, String[] branchIds, String userId, String type,
			Boolean withStock, String errorFileDownloadUrlPrefix, GoodsSelectImportBusinessValid businessValid,
			Map<String, String> map_branchid) throws ServiceException {
		//1、读取excel
		List<JSONObject> excelList = ExcelReaderUtil.readExcel(fileName, is, fields);
		List<GoodsSelect> dbList1 = new ArrayList<GoodsSelect>(); 
		
		//2、校验导入数据
		NewGoodsApplyImportHandle goodsSelectImportHandle = new NewGoodsApplyImportHandle(excelList, fields, businessValid);
		
		//3 获取到excel导入成功数据
		handelExcelSuccessData(goodsSelectImportHandle);
		
		//4 刷新数据
		goodsSelectImportHandle.checkWithDataBase(null);
		
		//5 将成功校验通过的数据保存在数据库中
		List<JSONObject> list = goodsSelectImportHandle.getExcelListSuccessData();
		handelEnumData(list);
		
		//6 将数据保存到数据库中
		String jsonStr = JSON.toJSONString(list);
		List<NewGoodsApply> newGoodsApplys = JSON.parseArray(jsonStr, NewGoodsApply.class);
		newGoodsApplyService.batchSaveNewGoodsApply(newGoodsApplys);
		
		@SuppressWarnings("unchecked")
		List<T> successList = (List<T>) goodsSelectImportHandle.getSuccessData(dbList1, fields, entity);

		GoodsSelectImportVo<T> goodsSelectImportVo = new GoodsSelectImportVo<T>();
		goodsSelectImportVo.setList(successList);

		Integer successNum = goodsSelectImportHandle.getExcelListSuccessData().size();

		Integer errorNum = goodsSelectImportHandle.getExcelListErrorData().size();

		StringBuffer message = new StringBuffer();
		message.append("成功：");
		message.append(successNum);
		message.append("条，");
		message.append("失败：");
		message.append(errorNum);
		message.append("条。");
		
		goodsSelectImportVo.setMessage(message.toString());
		
		List<JSONObject> errorList = goodsSelectImportHandle.getExcelListErrorData();
		
		if(errorList != null && errorList.size() > 0){//有错误数据
			//列转换处理
			businessValid.errorDataFormatter(errorList);
			
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
	
	//处理excel校验成功的数据
	private void handelExcelSuccessData( NewGoodsApplyImportHandle goodsSelectImportHandle) {
		List<JSONObject> successDatas =  goodsSelectImportHandle.getExcelListSuccessData();
		for(JSONObject obj : successDatas) {
			//类别校验
			boolean categoryCodeFlag = obj.containsKey("categoryCode");
			if(categoryCodeFlag){
				String categoryCode = obj.getString("categoryCode");
				if(StringUtils.isNotBlank(categoryCode)){
					List<GoodsCategory> goodsCategory = goodsCategoryService.queryByCategoryCode(categoryCode);
					if(CollectionUtils.isNotEmpty(goodsCategory)){
						obj.put("categoryId", goodsCategory.get(0).getGoodsCategoryId());
						obj.put("categoryName", goodsCategory.get(0).getCategoryName());
					}else{
						setCategory(obj);
					}
				}else{
					setCategory(obj);
				}
			}else{
				setCategory(obj);
			}
			
			//品牌校验
			boolean brandNameFlag = obj.containsKey("brandName");
			GoodsBrand goodsBrand = new GoodsBrand();
			String brandCode = null;
			if(brandNameFlag){
				String brandName = obj.getString("brandName");
				if(StringUtils.isNotBlank(brandName)){
					goodsBrand = goodsBrandService.queryByNameOrCode(brandName, brandCode);
					if(goodsBrand==null){
						goodsBrand = goodsBrandService.queryByNameOrCode("其他",brandCode);
					}
					setBrand(obj, goodsBrand);
				}else{
					goodsBrand = goodsBrandService.queryByNameOrCode("其他",brandCode);
					setBrand(obj, goodsBrand);
				}
			}else{
				goodsBrand = goodsBrandService.queryByNameOrCode("其他",brandCode);
				setBrand(obj, goodsBrand);
			}
			
			//供应商校验
			Supplier supplier = supplierService.getDefaultSupplierByBranchId(UserUtil.getCurrBranchId());
			obj.put("supplierId", supplier.getId());
			obj.put("supplierCode", supplier.getSupplierCode());
			obj.put("supplierName", supplier.getSupplierName());
			obj.put("branchId", UserUtil.getCurrBranchId());
			obj.put("createUserId", UserUtil.getCurrUserId());
			
			//商品名称、条码校验
			String skuName = obj.getString("skuName");
			if(StringUtils.isNotBlank(skuName)) {
				//1 检查商品名称在新品申请库中重复
				Integer skuNameSum = newGoodsApplyServiceApi.queryCountBySkuName(skuName.trim(), "");
				if(skuNameSum>0) {
					obj.element("error", "商品名称在新品申请库中重复");
					continue;
				}
				
				//2 检查标准库中商品名称在标准库重复
				boolean isExistsSkuName = goodsSkuService.isExistsBySkuName(skuName.trim(), "");
				if (isExistsSkuName) {
					obj.element("error", "商品名称在标准库重复");
					continue;
				} 
			}
			
			boolean barCodeFlag = obj.containsKey("barCode");
			if(barCodeFlag){
				String barCode = obj.getString("barCode");
				if(StringUtils.isNotBlank(barCode)) {
					//3  查询新品申请库商品条码是否存在
					Integer barCodeSum = newGoodsApplyServiceApi.queryCountBySkuName(barCode.trim(), "");
					if(barCodeSum>0) {
						obj.element("error", "商品条码在新品申请库中重复");
						continue;
					}
					
					//4  查询标准库商品条码是否存在
					boolean isExistsBarCode = goodsSkuService.isExistsBarCodeByOrdinary(barCode.trim(),"");
					if(isExistsBarCode) {
						obj.element("error", "商品条码在标准库中重复");
						continue;
					}
				}
			}
		}
	}
	
	
	private void setBrand(JSONObject obj,GoodsBrand goodsBrand) {
		obj.put("brandCode", goodsBrand.getBrandCode());
		obj.put("brandName", goodsBrand.getBrandName());
		obj.put("brandId", goodsBrand.getId());
	}
	
	//设置默认类别
	private void setCategory(JSONObject obj){
		List<GoodsCategory> goodsCategory = goodsCategoryService.queryByCategoryCode("990101");
		obj.put("categoryId", goodsCategory.get(0).getGoodsCategoryId());
		obj.put("categoryName", goodsCategory.get(0).getCategoryName());
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
		
		if(jsonText != null){
			headers = ArrayUtils.add(headers, "错误原因");
			columns = ArrayUtils.add(columns, "error");
			
			List<JSONObject> dataList = JSONArray.parseArray(jsonText, JSONObject.class);
			
			ExcelExportUtil.exportExcel(reportFileName, headers, columns, dataList, response);
		}else{
			response.reset();// 清空输出流
			response.setContentType("text/html");// 定义输出类型
			response.setCharacterEncoding("UTF-8");
			try {
				response.getWriter().println("文件不存在或者文件已过期");
			} catch (IOException e) {
				LOG.error("获取response.getWriter失败",e);
			}
		}
	}

	//处理数据枚举类型
	private void handelEnumData(List<JSONObject> list){
		for(JSONObject obj : list) {
			String saleWay = (String)obj.get("saleWay");
			obj.put("saleWay", SaleWayEnum.enumValueOf(saleWay).getKey());
			
			String pricingType = (String)obj.get("pricingType");
			obj.put("pricingType", PricingTypeEnum.enumValueOf(pricingType).getOrdinal());
			
			String type = (String)obj.get("type");
			obj.put("type", GoodsTypeEnum.enumValueOf(type).getOrdinal());
		}
	}
}
