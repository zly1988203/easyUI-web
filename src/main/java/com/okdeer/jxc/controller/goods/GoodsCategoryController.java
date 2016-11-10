/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月20日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.goods;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.goods.entity.GoodsCategory;
import com.okdeer.jxc.goods.service.GoodsCategoryServiceApi;
import com.okdeer.jxc.goods.vo.GoodsCategoryVo;

/**
 * ClassName: SupplierAreaController 
 * @Description: 类别Controller
 * @author zhangchm
 * @date 2016年7月20日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    进销存2.0.0		   2016年7月20日                  zhangchm            创建类别Controller， 查询公共选择类别、类别树结构、类别
 */

@Controller
@RequestMapping("common/category")
public class GoodsCategoryController extends
		BaseController<GoodsCategoryController> {

	@Reference(version = "1.0.0", check = false)
	private GoodsCategoryServiceApi goodsCategoryService;

	/**
	 * @Description: 公共选择类别
	 * @return   
	 * @author zhangchm lijunyi
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
	public String getGoodsCategoryToTree(GoodsCategoryVo vo) {
		try {
			LOG.info("类别树结构参数:" + vo.toString());
			String categoryTree = goodsCategoryService
					.queryGoodsCategoryToTree(vo);
			LOG.info("categoryTree:" + categoryTree);
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
			GoodsCategoryVo vo,String categoryType,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			//判断类别类型1.goodsTotal 商品汇总 2.categoryTotal 类别汇总
			if("goodsTotal".equals(categoryType)) {
				vo.setCategoryLevel("3");
			}
			if("categoryTotal".equals(categoryType)) {
				vo.setCategoryLevel("1");
			}
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			LOG.info("查询类别参数:" + vo.toString());
			PageUtils<GoodsCategory> suppliers = goodsCategoryService
					.queryLists(vo);
			LOG.info("查询列表数据" + suppliers.toString());
			return suppliers;
		} catch (Exception e) {
			LOG.error("查询查询类别异常:", e);
		}
		return null;
	}

}
