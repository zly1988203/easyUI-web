/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年5月22日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.archive;  

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.okdeer.jxc.controller.BaseController;


/**
 * ClassName: FinancialCodeController 
 * @Description: 财务代码Controller
 * @author liwb
 * @date 2017年5月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@Controller
@RequestMapping("archive/financeCode")
public class FinanceCodeController extends BaseController<FinanceCodeController> {
	
	
	@RequestMapping(value = "toManager")
	public String toManager() {
		return "archive/financeCode/financeList";
	}
	
	@RequestMapping(value = "toAdd")
	public String toAdd() {
		return "archive/financeCode/editFinance";
	}
	
	@RequestMapping(value = "toEdit")
	public String toEdit() {
		return "archive/financeCode/editFinance";
	}

}
