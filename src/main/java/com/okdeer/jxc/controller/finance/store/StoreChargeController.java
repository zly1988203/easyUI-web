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
 * ClassName: StoreChargeController 
 * @Description: 门店费用登记Controller
 * @author liwb
 * @date 2017年5月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@Controller
@RequestMapping("finance/storeCharge")
public class StoreChargeController extends BaseController<StoreChargeController> {
	
	@RequestMapping(value = "toManager")
	public String toManager() {
		return "finance/storeCharge/storeChargeList";
	}
	
	@RequestMapping(value = "toAdd")
	public String toAdd() {
		return "finance/storeCharge/storeChargeAdd";
	}
	
	@RequestMapping(value = "toEdit")
	public String toEdit() {
		return "finance/storeCharge/storeChargeEdit";
	}

}
