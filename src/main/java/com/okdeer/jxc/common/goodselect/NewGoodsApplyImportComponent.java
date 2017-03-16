/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年10月13日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */
package com.okdeer.jxc.common.goodselect;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;

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
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.enums.GoodsTypeEnum;
import com.okdeer.jxc.common.enums.PricingTypeEnum;
import com.okdeer.jxc.common.enums.SaleWayEnum;
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
	private BranchesServiceApi branchesServiceApi;

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
		String[] branchIds = { branchId };
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
	public <T extends GoodsSelect> GoodsSelectImportVo<T> importSelectGoodsMultiBranch(String fileName, InputStream is,
			String[] fields, T entity, String[] branchId, String userId, String type, String errorFileDownloadUrlPrefix,
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
	public <T extends GoodsSelect> GoodsSelectImportVo<T> importSelectGoodsWithStock(String fileName, InputStream is,
			String[] fields, T entity, String branchId, String userId, String type, String errorFileDownloadUrlPrefix,
			GoodsSelectImportBusinessValid businessValid) throws ServiceException {
		String[] branchIds = { branchId };
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
	private <T extends GoodsSelect> GoodsSelectImportVo<T> importSelectGoodsMultiBranch(String fileName, InputStream is,
			String[] fields, T entity, String[] branchIds, String userId, String type, Boolean withStock,
			String errorFileDownloadUrlPrefix, GoodsSelectImportBusinessValid businessValid,
			Map<String, String> map_branchid) throws ServiceException {
		// 1、读取excel
		List<JSONObject> excelList = ExcelReaderUtil.readExcel(fileName, is, fields);
		List<GoodsSelect> dbList1 = new ArrayList<GoodsSelect>();

		// 2、校验导入数据
		NewGoodsApplyImportHandle goodsSelectImportHandle = new NewGoodsApplyImportHandle(excelList, fields,
				businessValid);

		// 3 获取到excel导入成功数据
		handelExcelSuccessData(goodsSelectImportHandle);

		// 4 刷新数据
		goodsSelectImportHandle.checkWithDataBase(null);

		// 5 将成功校验通过的数据保存在数据库中
		List<JSONObject> list = goodsSelectImportHandle.getExcelListSuccessData();

		initDefaultData(list);

		// 6 将数据保存到数据库中
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

		if (errorList != null && errorList.size() > 0) {// 有错误数据
			// 列转换处理
			businessValid.errorDataFormatter(errorList);

			// 错误excel内容
			String jsonText = JSONArray.toJSON(errorList).toString();
			// 文件key
			String code = "jxc_goodsSelectImport_" + userId;
			// 保存10分钟，单用户同时只能保存一个错误文件
			redisTemplateTmp.opsForValue().set(code, jsonText, 10, TimeUnit.MINUTES);

			goodsSelectImportVo.setErrorFileUrl(errorFileDownloadUrlPrefix + "?code=" + code + "&type=" + type);
		} else {// 无错误数据
			String code = "goodsSelectImport_" + userId;
			redisTemplateTmp.delete(code);
		}

		return goodsSelectImportVo;
	}

	// 处理excel校验成功的数据
	private void handelExcelSuccessData(NewGoodsApplyImportHandle goodsSelectImportHandle) {
		List<JSONObject> successDatas = goodsSelectImportHandle.getExcelListSuccessData();
		String currBranchId = UserUtil.getCurrBranchId();

		// 验证整数正则
		Pattern pattern = Pattern.compile("[0-9]*");
		for (JSONObject obj : successDatas) {
			String skuName = obj.getString("skuName");
			if (StringUtils.isNotBlank(skuName)) {
				// 1 检查商品名称在新品申请库中重复
				Integer skuNameSum = newGoodsApplyServiceApi.queryCountBySkuName(skuName.trim(), "", currBranchId);
				if (skuNameSum > 0) {
					obj.element("error", "商品名称在新品申请库中重复");
					continue;
				}

				// 2 检查标准库中商品名称在标准库重复
				boolean isExistsSkuName = goodsSkuService.isExistsBySkuName(skuName.trim(), "");
				if (isExistsSkuName) {
					obj.element("error", "商品名称在标准库重复");
					continue;
				}
			}

			boolean barCodeFlag = obj.containsKey("barCode");
			if (barCodeFlag) {
				String barCode = obj.getString("barCode");
				if (StringUtils.isNotBlank(barCode)) {
					// 3 查询新品申请库商品条码是否存在
					Integer barCodeSum = newGoodsApplyServiceApi.queryCountByBarCode(barCode.trim(), "", currBranchId);
					if (barCodeSum > 0) {
						obj.element("error", "商品条码在新品申请库中重复");
						continue;
					}

					// 4 查询标准库商品条码是否存在
					boolean isExistsBarCode = goodsSkuService.isExistsBarCodeByOrdinary(barCode.trim(), "");
					if (isExistsBarCode) {
						obj.element("error", "商品条码在标准库中重复");
						continue;
					}
				}
			}

			// 类别校验
			boolean categoryCodeFlag = obj.containsKey("categoryCode");
			if (categoryCodeFlag) {
				String categoryCode = obj.getString("categoryCode");
				if (StringUtils.isNotBlank(categoryCode)) {
					List<GoodsCategory> goodsCategory = goodsCategoryService.queryByCategoryCode(categoryCode);
					if (CollectionUtils.isEmpty(goodsCategory)) {
						obj.element("error", "商品类别不存在");
						continue;
					}
				} else {
					obj.element("error", "商品类别为空");
					continue;
				}
			} else {
				obj.element("error", "商品类别为空");
				continue;
			}

			// 保质期
			String vaildity = obj.getString("vaildity");
			if (StringUtils.isNotEmpty(vaildity)) {
				if (!pattern.matcher(vaildity).matches()) {
					obj.element("error", "保质期只能填写数字");
					continue;
				}
			}

			// 采购规格
			String purchaseSpec = obj.getString("purchaseSpec");
			if (StringUtils.isNotEmpty(purchaseSpec)) {
				if (!pattern.matcher(purchaseSpec).matches()) {
					obj.element("error", "采购规格只能填写数字");
					continue;
				}
			} else {
				obj.put("purchaseSpec", 1);
			}

			// 配送规格
			String distributionSpec = obj.getString("distributionSpec");
			if (StringUtils.isNotEmpty(distributionSpec)) {
				if (!pattern.matcher(distributionSpec).matches()) {
					obj.element("error", "配送规格只能填写数字");
					continue;
				}
			} else {
				obj.put("distributionSpec", 1);
			}
		}
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
	public void downloadErrorFile(String code, String reportFileName, String[] headers, String[] columns,
			HttpServletResponse response) {
		String jsonText = redisTemplateTmp.opsForValue().get(code);

		if (jsonText != null) {
			headers = ArrayUtils.add(headers, "错误原因");
			columns = ArrayUtils.add(columns, "error");

			List<JSONObject> dataList = JSONArray.parseArray(jsonText, JSONObject.class);

			ExcelExportUtil.exportExcel(reportFileName, headers, columns, dataList, response);
		} else {
			response.reset();// 清空输出流
			response.setContentType("text/html");// 定义输出类型
			response.setCharacterEncoding("UTF-8");
			try {
				response.getWriter().println("文件不存在或者文件已过期");
			} catch (IOException e) {
				LOG.error("获取response.getWriter失败", e);
			}
		}
	}

	// 处理数据枚举类型
	private void initDefaultData(List<JSONObject> list) {
		for (JSONObject obj : list) {

			// 计价方式：0普通，1计重、2计件
			boolean pricingTypeFlag = obj.containsKey("pricingType");
			String pricingType = "";
			if (pricingTypeFlag) {
				pricingType = obj.getString("pricingType");
				if (StringUtils.isBlank(pricingType)) {
					pricingType = PricingTypeEnum.ORDINARY.getValue();
					obj.put("pricingType", PricingTypeEnum.enumValueOf(pricingType).getOrdinal());
				} else {
					obj.put("pricingType", PricingTypeEnum.enumValueOf(pricingType).getOrdinal());
				}
			} else {
				pricingType = PricingTypeEnum.ORDINARY.getValue();
				obj.put("pricingType", PricingTypeEnum.enumValueOf(pricingType).getOrdinal());
			}

			// 经营方式：A:购销，B:代销、C:联营、D:扣率代销
			boolean saleWayFlag = obj.containsKey("saleWay");
			if (saleWayFlag) {
				String saleWay = obj.getString("saleWay");
				if (StringUtils.isBlank(saleWay)) {
					obj.put("saleWay", SaleWayEnum.PURCHASENSALE.getKey());
				} else {
					obj.put("saleWay", SaleWayEnum.enumValueOf(saleWay).getKey());
				}
			} else {
				obj.put("saleWay", SaleWayEnum.PURCHASENSALE.getKey());
			}

			// 商品类型（0普通商品，1制单组合，2制单拆分，3捆绑商品，4自动转货
			boolean typeFlag = obj.containsKey("type");
			if (typeFlag) {
				String type = obj.getString("type");
				if (StringUtils.isBlank(type)) {
					obj.put("type", GoodsTypeEnum.ORDINARY.getOrdinal());
				} else {
					obj.put("type", GoodsTypeEnum.enumValueOf(type).getOrdinal());
				}
			} else {
				obj.put("type", GoodsTypeEnum.ORDINARY.getOrdinal());
			}

			// 设置进货规格、配送规格
			setSpec(obj, "purchaseSpec");
			setSpec(obj, "distributionSpec");

			// 批发价
			initNotRequiredCommonPrice(obj, "wholesalePrice");

			// 配送价
			initNotRequiredCommonPrice(obj, "distributionPrice");

			// 最低售价
			initNotRequiredCommonPrice(obj, "lowestPrice");

			// 会员价
			initNotRequiredCommonPrice(obj, "vipPrice");

			// 销项税率
			initNotRequiredCommonPrice(obj, "outputTax");

			// 进项税率
			initNotRequiredCommonPrice(obj, "inputTax");

			// 设置毛利率、毛利值
			setGrossProfit(obj);

			// 初始化类别
			initCategory(obj);

			// 初始化品牌
			initBrand(obj);

			// 初始化供应商
			initSupplier(obj);
		}
	}

	// 设置配送规格、进货规格
	private void setSpec(JSONObject obj, String key) {
		boolean specFlag = obj.containsKey(key);
		if (specFlag) {
			String purchaseSpec = obj.getString(key);
			if (StringUtils.isNotBlank(purchaseSpec)) {
				try {
					Double.parseDouble(purchaseSpec);
				} catch (Exception e) {
					obj.put(key, "1");
				}
			} else {
				obj.put(key, "1");
			}
		} else {
			obj.put(key, "1");
		}
	}

	// 设置毛利率、毛利值
	private void setGrossProfit(JSONObject obj) {
		BigDecimal salePrice = BigDecimal.valueOf(Double.valueOf(obj.getString("salePrice")));
		BigDecimal purchasePrice = BigDecimal.valueOf(Double.valueOf(obj.getString("purchasePrice")));
		BigDecimal grossProfit = salePrice.subtract(purchasePrice);
		BigDecimal parcent = new BigDecimal("100");
		BigDecimal marginTax = new BigDecimal(0.00);
		if (salePrice.compareTo(new BigDecimal(0)) == 0) {
			obj.put("marginTax", marginTax);
		} else {
			marginTax = grossProfit.divide(salePrice, Constant.TWO);
			obj.put("marginTax", marginTax.multiply(parcent));
		}

		obj.put("grossProfit", String.valueOf(grossProfit));

	}

	// 初始化类别
	private void initCategory(JSONObject obj) {
		boolean categoryCodeFlag = obj.containsKey("categoryCode");
		if (categoryCodeFlag) {
			String categoryCode = obj.getString("categoryCode");
			if (StringUtils.isNotBlank(categoryCode)) {
				List<GoodsCategory> goodsCategory = goodsCategoryService.queryByCategoryCode(categoryCode);
				if (CollectionUtils.isNotEmpty(goodsCategory)) {
					obj.put("categoryId", goodsCategory.get(0).getGoodsCategoryId());
					obj.put("categoryName", goodsCategory.get(0).getCategoryName());
				} else {
					setCategory(obj);
				}
			} else {
				setCategory(obj);
			}
		} else {
			setCategory(obj);
		}
	}

	// 初始化品牌
	private void initBrand(JSONObject obj) {
		boolean brandCodeFlag = obj.containsKey("brandCode");
		GoodsBrand goodsBrand = new GoodsBrand();
		String brandCode = null;
		if (brandCodeFlag) {
			brandCode = obj.getString("brandCode");
			if (StringUtils.isNotBlank(brandCode)) {
				goodsBrand = goodsBrandService.queryByNameOrCode("", brandCode.trim());
				if (goodsBrand == null) {
					goodsBrand = goodsBrandService.queryByNameOrCode("其他", null);
				}
				setBrand(obj, goodsBrand);
			} else {
				goodsBrand = goodsBrandService.queryByNameOrCode("其他", null);
				setBrand(obj, goodsBrand);
			}
		} else {
			goodsBrand = goodsBrandService.queryByNameOrCode("其他", null);
			setBrand(obj, goodsBrand);
		}
	}

	// 设置默认品牌
	private void setBrand(JSONObject obj, GoodsBrand goodsBrand) {
		obj.put("brandCode", goodsBrand.getBrandCode());
		obj.put("brandName", goodsBrand.getBrandName());
		obj.put("brandId", goodsBrand.getId());
	}

	// 设置默认类别
	private void setCategory(JSONObject obj) {
		List<GoodsCategory> goodsCategory = goodsCategoryService.queryByCategoryCode("990101");
		obj.put("categoryId", goodsCategory.get(0).getGoodsCategoryId());
		obj.put("categoryName", goodsCategory.get(0).getCategoryName());
	}

	// 初始化供应商
	private void initSupplier(JSONObject obj) {
		String branchId = "";
		Supplier supplier = null;
		Integer branchType = UserUtil.getCurrBranchType();
		if (branchType.compareTo(BranchTypeEnum.SELF_STORE.getCode()) == 0
				|| branchType.compareTo(BranchTypeEnum.FRANCHISE_STORE_B.getCode()) == 0
				|| branchType.compareTo(BranchTypeEnum.FRANCHISE_STORE_C.getCode()) == 0) {
			branchId = UserUtil.getCurrBranchId();
			supplier = findSupplier(branchId);
			if (supplier == null) {
				Branches branches = branchesServiceApi.getBranchInfoById(UserUtil.getCurrBranchId());
				supplier = findSupplier(branches.getParentId());
			}
		} else {
			supplier = findSupplier(UserUtil.getCurrBranchId());
		}
		obj.put("supplierId", supplier.getId());
		obj.put("supplierCode", supplier.getSupplierCode());
		obj.put("supplierName", supplier.getSupplierName());
		obj.put("branchId", UserUtil.getCurrBranchId());
		obj.put("createUserId", UserUtil.getCurrUserId());
		// 设置默认经营方式
		obj.put("saleWay", supplier.getSaleWay());
	}

	private Supplier findSupplier(String branchId) {
		return supplierService.getDefaultSupplierByBranchId(branchId);
	}

	/**
	 * @Description: 初始化非必填价格
	 * @param obj 对象
	 * @param colkey 字段key
	 * @throws
	 * @author zhongy
	 * @date 2017年2月24日
	 */
	private void initNotRequiredCommonPrice(JSONObject obj, String colkey) {
		boolean colFlag = obj.containsKey(colkey);
		if (colFlag) {
			String price = obj.getString(colkey);
			if (StringUtils.isBlank(price)) {
				obj.put(colkey, "0.00");
			}
		} else {
			obj.put(colkey, "0.00");
		}
	}
}