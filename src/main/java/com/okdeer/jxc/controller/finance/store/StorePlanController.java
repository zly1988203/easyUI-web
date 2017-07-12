/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年7月12日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.finance.store;  

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;


/**
 * ClassName: StorePlanController 
 * @Description: 门店计划Controller
 * @author liwb
 * @date 2017年7月12日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@RestController
@RequestMapping("finance/storePlan")
public class StorePlanController extends BaseController<StorePlanController> {
	
	@RequestMapping(value = "toManager")
	public ModelAndView toManager() {
		return new ModelAndView("finance/storePlan/storePlanList");
	}

	@RequestMapping(value = "toAdd")
	public ModelAndView toAdd() {
		return new ModelAndView("finance/storePlan/storePlanAdd");
	}

	@RequestMapping(value = "toEdit")
	public ModelAndView toEdit(String formId) {

		if (StringUtils.isBlank(formId)) {
			return super.toErrorPage("单据ID为空");
		}

//		StoreChargePo po = storeChargeService.getStoreChargeById(formId);
//
		ModelAndView mv = new ModelAndView("finance/storePlan/storePlanEdit");
//		mv.addObject("form", po);
//
//		// 待审核
//		if (FormStatus.WAIT_CHECK.getValue().equals(po.getAuditStatus())) {
//			mv.addObject("chargeStatus", "edit");
//		}
//		// 已审核
//		else if (FormStatus.CHECK_SUCCESS.getValue().equals(po.getAuditStatus())) {
//			mv.addObject("chargeStatus", "check");
//		}

		return mv;
	}

}
