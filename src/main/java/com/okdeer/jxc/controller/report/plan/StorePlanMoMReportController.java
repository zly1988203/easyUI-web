/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年7月13日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.report.plan;  

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.okdeer.jxc.controller.BaseController;


/**
 * ClassName: StorePlanMoMReportController 
 * @Description: 门店目标计划环比
 * @author liwb
 * @date 2017年7月13日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@Controller
@RequestMapping("target/storePlan/report/mom")
public class StorePlanMoMReportController extends BaseController<StorePlanMoMReportController> {
	
	@RequestMapping(value = "toManager")
	public String toManager() {
		return "report/plan/storePlanMoMReport";
	}


}
