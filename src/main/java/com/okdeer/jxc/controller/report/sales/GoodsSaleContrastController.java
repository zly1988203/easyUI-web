/** 
 *@Project: okdeer-jxc-web 
 *@Author: zuowm
 *@Date: 2017年7月13日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */
package com.okdeer.jxc.controller.report.sales;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.okdeer.jxc.controller.BaseController;

/**
 * ClassName: GoodsSaleContrastController 
 * @Description: 货类销售对比分析controller
 * @author zuowm
 * @date 2017年7月13日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/report/goodsSaleContrast")
public class GoodsSaleContrastController extends BaseController<GoodsSaleContrastController> {

	/**
	 * @Description: 跳转页面
	 * @param model
	 * @return
	 * @author zuowm
	 * @date 2017年7月13日
	 */
	@RequestMapping
	public String index() {
		LOG.info("GoodsSaleContrastController start....");
		return "report/sales/goodsSaleContrast";
	}
}
