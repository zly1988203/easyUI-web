/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhengwj
 *@Date: 2017年9月8日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.cost;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.controller.BaseReportController;
import com.okdeer.jxc.utils.UserUtil;
import com.okdeer.retail.facade.report.facade.BaseReportFacade;
import com.okdeer.retail.facade.report.facade.CostAdjustSearchFacade;
import com.okdeer.retail.facade.report.qo.CostAdjustSearchQo;
import com.okdeer.retail.facade.report.vo.CostAdjustSearchVo;

/**
 * ClassName: CostAdjustSearchController 
 * @Description: 成本调价查询
 * @author zhengwj
 * @date 2017年9月8日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("cost/costAdjustSearch")
public class CostAdjustSearchController extends BaseReportController<CostAdjustSearchQo, CostAdjustSearchVo> {

	/**
	 * 成本调价报表Dubbo接口
	 */
	@Reference(version = "1.0.0", check = false)
	private CostAdjustSearchFacade costAdjustSearchFacade;

	@Override
	protected String getViewName() {
		return "/cost/costAdjustSearchList";
	}

	@Override
	protected Model getModel(Model model) {
		model.addAttribute("maxReportType", 2);
		return model;
	}

	@Override
	protected CostAdjustSearchQo getQueryObject(CostAdjustSearchQo qo) {
		// 如果机构为空
		if (StringUtils.isEmpty(qo.getBranchId())) {
			qo.setBranchCode(UserUtil.getCurrBranchCompleCode());
		}
		return qo;
	}

	@Override
	protected Class<CostAdjustSearchVo> getViewObjectClass() {
		return CostAdjustSearchVo.class;
	}

	@Override
	protected BaseReportFacade<CostAdjustSearchQo, CostAdjustSearchVo> getReportFade() {
		return costAdjustSearchFacade;
	}

}
