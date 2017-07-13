/** 
 *@Project: okdeer-jxc-web 
 *@Author: zuowm
 *@Date: 2017年7月13日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */
package com.okdeer.jxc.controller.report.goods;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.retail.common.page.PageUtils;
import com.okdeer.retail.facade.report.entity.GoodsGrossProfitRate;
import com.okdeer.retail.facade.report.facade.GoodsGrossProfitRateFacade;
import com.okdeer.retail.facade.report.qo.GoodsGrossProfitRateQo;

/**
 * ClassName: goodsGrossProfitRateController 
 * @Description: 商品毛利率controller
 * @author zuowm
 * @date 2017年7月13日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/report/goodsGrossProfitRate")
public class GoodsGrossProfitRateController extends BaseController<GoodsGrossProfitRateController> {

	/**
	 * 商品毛利率
	 */
	@Reference(version = "1.0.0", check = false)
	GoodsGrossProfitRateFacade goodsGrossProfitRateFacade;

	/**
	 * @Description: 跳转页面
	 * @param model
	 * @return
	 * @author zuowm
	 * @date 2017年7月13日
	 */
	@RequestMapping
	public String index() {
		LOG.info("GoodsGrossProfitRateController start....");
		return "report/goods/goodsGrossProfitRate";
	}

	@RequestMapping("/list")
	@ResponseBody
	public PageUtils<GoodsGrossProfitRate> list(GoodsGrossProfitRateQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			qo.setPageNum(pageNumber);
			qo.setPageSize(pageSize);

			PageUtils<GoodsGrossProfitRate> page = goodsGrossProfitRateFacade.queryGoodsGrossProfitRateList(qo);
			return page;
		} catch (Exception e) {
			LOG.error("统计商品毛利数据错误：{}", e);
		}
		return PageUtils.emptyPage();
	}
}
