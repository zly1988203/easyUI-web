/**
 *@Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 *@Project: okdeer-jxc-web
 *@Package: com.okdeer.jxc.controller.report.sales
 *@Author: songwj
 *@Date: 2017年3月30日 下午2:35:16
 *注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.controller.report.sales;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * @ClassName: NoSalesInventoryReportController
 * @Description: TODO
 * @project okdeer-jxc-web
 * @author songwj
 * @date 2017年3月30日 下午2:35:16
 * =================================================================================================
 *     Task ID	         Date		  Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *              	2017年3月30日		  songwj		 
 */
@RestController
@RequestMapping("report/nosales/inventory")
public class NoSalesInventoryReportController {

    @RequestMapping(value = "/list")
    public ModelAndView add() {
	return new ModelAndView("report/nosales/inventorylist");
    }
    
}
