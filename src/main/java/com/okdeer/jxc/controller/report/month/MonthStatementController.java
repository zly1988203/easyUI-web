package com.okdeer.jxc.controller.report.month;

import javax.validation.Valid;

import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.report.TimeSectionSaleReportController;
import com.okdeer.jxc.report.service.MonthStatementService;
import com.okdeer.jxc.report.vo.MonthlyReport;
import com.okdeer.jxc.system.entity.SysUser;

/**
 *<p></p>
 * ClassName: MonthStatementController 
 * @Description: 月结处理
 * @author xuyq
 * @date 2017年3月30日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@RestController
@RequestMapping("report/monthStatement")
public class MonthStatementController extends BaseController<TimeSectionSaleReportController> {

	@Reference(version = "1.0.0", check = false)
	private MonthStatementService monthStatementService;
	
	@RequestMapping(value = "list")
	public ModelAndView monthStatement(Model model) {
		return new ModelAndView("report/month/monthStatement");
	}

	@RequestMapping(value = "/executeMonthStatement", method = RequestMethod.POST)
	public RespJson executeMonthStatement(@Valid MonthlyReport mr, BindingResult validate) {
		SysUser user = getCurrentUser();
		RespJson respJson = RespJson.success();
		try {
			mr.setCreateUserId(user.getId());
			mr.setUpdateUserId(user.getId());
			
			respJson = monthStatementService.executeMonthStatement(mr);
		} catch (Exception e) {
			LOG.error("月结处理异常：", e);
			respJson = RespJson.error("月结处理异常!");
		}
		return respJson;
	}
}
