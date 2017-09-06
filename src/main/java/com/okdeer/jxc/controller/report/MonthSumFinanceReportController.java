
package com.okdeer.jxc.controller.report;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.controller.BaseReportController;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.utils.UserUtil;
import com.okdeer.retail.facade.report.facade.BaseReportFacade;
import com.okdeer.retail.facade.report.facade.MonthSumFinanceReportFacade;
import com.okdeer.retail.facade.report.qo.MonthSumFinanceReportQo;
import com.okdeer.retail.facade.report.vo.MonthSumFinanceReportVo;

/**
 * ClassName: MonthSumFinanceReportController 
 * @Description: 财务月进销存报表
 * @author zhengwj
 * @date 2017年9月4日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@Controller
@RequestMapping("report/month/finance")
public class MonthSumFinanceReportController
		extends BaseReportController<MonthSumFinanceReportQo, MonthSumFinanceReportVo> {

	/**
	 * 日进销存报表Dubbo接口
	 */
	@Reference(version = "1.0.0", check = false)
	private MonthSumFinanceReportFacade monthSumFinanceReportFacade;

	@Override
	protected String getViewName() {
		return "/report/month/monthSumFinanceReport";
	}

	@Override
	protected Model getModel(Model model) {
		model.addAttribute("startTime",
				LocalDate.now().minusMonths(1).format(DateTimeFormatter.ofPattern(DateUtils.DATE_JFP_STR_R)));
		model.addAttribute("reportType", 1);
		return model;
	}

	@Override
	protected MonthSumFinanceReportQo getQueryObject(MonthSumFinanceReportQo qo) {
		// 如果机构为空
		if (StringUtils.isEmpty(qo.getBranchId())) {
			qo.setBranchId(UserUtil.getCurrBranchId());
		}
		// 月结日期
		if (StringUtils.isEmpty(qo.getSumDate())) {
			qo.setSumDate(LocalDate.now().format(DateTimeFormatter.ofPattern(DateUtils.DATE_JFP_STR_R)));
		}
		return null;
	}

	@Override
	protected Class<MonthSumFinanceReportVo> getViewObjectClass() {
		return MonthSumFinanceReportVo.class;
	}

	@Override
	protected BaseReportFacade<MonthSumFinanceReportQo, MonthSumFinanceReportVo> getReportFade() {
		return monthSumFinanceReportFacade;
	}

}
