/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月20日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report.logistics;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.goods.entity.GoodsCategory;
import com.okdeer.jxc.goods.qo.GoodsCategoryQo;
import com.okdeer.jxc.goods.service.GoodsCategoryServiceApi;

/**
 * 
 * ClassName: LogisticsGoodsCategoryController 
 * @Description: 类别Controller
 * @author zhangchm
 * @date 2017年8月8日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@Controller
@RequestMapping("commonLogistics/category")
public class LogisticsGoodsCategoryController extends
		BaseController<LogisticsGoodsCategoryController> {

	@Reference(version = "1.0.0", check = false)
	private GoodsCategoryServiceApi goodsCategoryService;

	/**
	 * @Description: 公共选择类别
	 * @return   
	 * @author zhangchm
	 * @date 2016年7月21日
	 */
	@RequestMapping(value = "views")
	public String views() {
		return "component/publicCategory";
	}

	/**
	 * @Description 类别树结构
	 * @param vo
	 * @param response
	 * @return   
	 * @author zhangchm
	 * @date 2016年7月20日
	 */
	@RequestMapping(value = "getGoodsCategoryToTree")
	@ResponseBody
	public String getGoodsCategoryToTree(GoodsCategoryQo qo) {
		try {
			String categoryTree = goodsCategoryService.queryGoodsCategoryToTree(qo);
			return categoryTree;
		} catch (Exception e) {
			LOG.error("查询类别树结构异常:", e);
		}
		return null;
	}

	/**
	 * @Description 查询类别
	 * @param vo
	 * @param response
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @author zhangchm
	 * @date 2016年7月20日
	 */
	@RequestMapping(value = "getComponentList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsCategory> getComponentList(
			GoodsCategoryQo qo,String categoryType,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			if("goodsTotal".equals(categoryType)) {
				qo.setCategoryLevelList(Arrays.asList("3","4"));
			}
			if("categoryTotal".equals(categoryType)) {
				qo.setCategoryLevel("1");
			}
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			PageUtils<GoodsCategory> suppliers = goodsCategoryService.queryLists(qo);
			return suppliers;
		} catch (Exception e) {
			LOG.error("查询类别异常:", e);
		}
		return null;
	}
	
	
	/**
	 * @Description: 跳转到商品类别管理
	 * @return   
	 * @author zhongy
	 * @date 2017年02月10日
	 */
	@RequestMapping(value = "goCategroyList")
	public String goCategroyList() {
		return "logistics/categoryList";
	}
	
	/**
	 * @Description 根据上级类别Id查询子级类别列表
	 * @param qo
	 * @param response
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @author zhongy
	 * @date 2017年02月10日
	 */
	@RequestMapping(value = "queryChildrenCategryList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsCategory> queryChildrenCategryList(
			GoodsCategoryQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			LOG.debug("查询类别参数:vo={}",qo.toString());
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			if(StringUtils.isNotBlank(qo.getCategoryNameOrCode())){
				qo.setCategoryNameOrCode(qo.getCategoryNameOrCode().trim());
			}else{
				qo.setCategoryNameOrCode("");
			}
			PageUtils<GoodsCategory> goodsCategorys = goodsCategoryService.queryLists(qo);
			return goodsCategorys;
		} catch (Exception e) {
			LOG.error("查询类别异常:", e);
		}
		return null;
	}
	
	/**
	 * @Description: 商品类别导出
	 * @param request
	 * @param response
	 * @param vo
	 * @author zhongy
	 * @date 2017年02月13日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public String exportList(GoodsCategoryQo qo, HttpServletResponse response) {
		LOG.debug("商品类别查询，报表导出参数：{}", qo);
		try {
			if(StringUtils.isNotBlank(qo.getCategoryNameOrCode())){
				qo.setCategoryNameOrCode(qo.getCategoryNameOrCode().trim());
			}else{
				qo.setCategoryNameOrCode("");
			}
			List<GoodsCategory> exportList = goodsCategoryService.queryExportCategory(qo);
			String fileName = "商品类别_" + DateUtils.formatDate(DateUtils.getCurrDate(), DateUtils.DATE_KEY_STR);
			String templateName = ExportExcelConstant.GOODS_CATEGORY_LOGISTICS_REPORT;
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("商品类别报表导出异常:", e);
		}
		return null;
	}
	
}
