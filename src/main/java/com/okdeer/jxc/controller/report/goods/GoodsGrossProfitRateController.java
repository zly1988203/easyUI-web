/** 
 *@Project: okdeer-jxc-web 
 *@Author: zuowm
 *@Date: 2017年7月13日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */
package com.okdeer.jxc.controller.report.goods;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.okdeer.jxc.controller.BaseController;

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
	 * @Description: 跳转页面
	 * @param model
	 * @return
	 * @author zuowm
	 * @date 2017年7月13日
	 */
	@RequestMapping(value = "/list")
	public String list() {
		LOG.info("GoodsGrossProfitRateController start....");
		return "report/goods/goodsGrossProfitRate";
	}
}
