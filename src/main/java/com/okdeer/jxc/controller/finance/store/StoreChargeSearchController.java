/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年5月22日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.finance.store;  

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.okdeer.jxc.controller.BaseController;


/**
 * ClassName: StoreChargeSearchController 
 * @Description: 门店费用查询Controller
 * @author liwb
 * @date 2017年5月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@Controller
@RequestMapping("finance/storeChargeSearch")
public class StoreChargeSearchController extends BaseController<StoreChargeSearchController> {
	
	@RequestMapping(value = "toManager")
	public String toManager() {
		return "finance/storeCharge/storeChargeSearch";
	}

}
