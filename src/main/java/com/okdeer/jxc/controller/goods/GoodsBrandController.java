/** 
 *@Project: okdeer-jxc-web 
 *@Author: taomm
 *@Date: 2016年8月15日 
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
import com.okdeer.jxc.goods.entity.GoodsBrand;
import com.okdeer.jxc.goods.service.GoodsBrandServiceApi;
import com.okdeer.jxc.goods.vo.GoodsBrandVo;

/**
 * ClassName: GoodsBrandController 
 * @Description: TODO
 * @author taomm
 * @date 2016年8月15日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("common/brand")
public class GoodsBrandController extends BaseController<GoodsBrandController> {

	@Reference(version = "1.0.0", check = false)
	private GoodsBrandServiceApi goodsBrandService;

	/**
	 * 
	 * @Description: 获取品牌树
	 * @return
	 * @author taomm
	 * @date 2016年8月15日
	 */
	@RequestMapping(value = "getBrandToTree")
	@ResponseBody
	public String getBrandToTree() {
		try {
			String brandTree = goodsBrandService.queryBrandToTree();
			LOG.info("brandTree:" + brandTree);
			return brandTree;
		} catch (Exception e) {
			LOG.error("查询品牌树结构异常:", e);
		}
		return null;
	}

	/**
	 * @Description: 公共选择品牌
	 * @return   
	 * @author zhangchm
	 * @date 2016年8月16日
	 */
	@RequestMapping(value = "views")
	public String views() {
		return "component/publicBrand";
	}

	/**
	 * @Description 查询品牌
	 * @param vo
	 * @param response
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @author zhangchm
	 * @date 2016年8月16日
	 */
	@RequestMapping(value = "getComponentList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsBrand> getComponentList(
			GoodsBrandVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			LOG.info("vo:" + vo.toString());
			PageUtils<GoodsBrand> goodsBrand = goodsBrandService.queryLists(vo);
			LOG.info("page:" + goodsBrand.toString());
			return goodsBrand;
		} catch (Exception e) {
			LOG.error("查询查询品牌异常:", e);
		}
		return null;
	}

}
