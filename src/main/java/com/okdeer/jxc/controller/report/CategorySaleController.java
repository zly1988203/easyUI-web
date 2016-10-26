/** 
 *@Project: okdeer-jxc-web 
 *@Author: liux01
 *@Date: 2016年10月25日 
 *@Copyright: ©2014-2020 www.yschome.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.report;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.okdeer.jxc.controller.BaseController;


/**
 * ClassName: CategorySaleController 
 * @Description: TODO
 * @author liux01
 * @date 2016年10月25日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    
 */
@Controller
@RequestMapping("categorySale/report")
public class CategorySaleController extends BaseController<CategorySaleController> {
	
	@RequestMapping(value = "/list")
	public String list(){
		return "/report/retail/categorySaleReport";
	}
}
