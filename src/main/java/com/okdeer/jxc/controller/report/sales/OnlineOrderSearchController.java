/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年6月2日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.report.sales;  

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


/**
 * ClassName: OnlineOrderSearchController 
 * @Description: 线上订单查询报表Controller
 * @author liwb
 * @date 2017年6月2日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@RestController
@RequestMapping("report/onlineOrder")
public class OnlineOrderSearchController {
	
	@RequestMapping(value = "toManager")
	public ModelAndView toManager() {
		return new ModelAndView("report/online/onlineOrderSearchList");
	}

}
