package com.okdeer.jxc.controller.report.month;  

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.controller.BaseReportController;
import com.okdeer.retail.facade.report.facade.BaseReportFacade;
import com.okdeer.retail.facade.report.month.facade.FinanceMonthReportFacade;
import com.okdeer.retail.facade.report.month.qo.FinanceMonthReportQo;
import com.okdeer.retail.facade.report.month.vo.FinanceMonthReportVo;

@Controller
@RequestMapping("report/month/financeMonthReport")
public class FinanceMonthReportController extends BaseReportController<FinanceMonthReportQo,FinanceMonthReportVo>{
	@Reference(version = "1.0.0", check = false)
	FinanceMonthReportFacade financeMonthReportFacade;
	@Override
	protected String getViewName() {
		return "report/month/financeMonthReport";
	}

	@Override
	protected Model getModel(Model model) {
		return model;
	}

	@Override
	protected FinanceMonthReportQo getQueryObject(FinanceMonthReportQo qo) {
		return qo;
	}

	@Override
	protected Class<FinanceMonthReportVo> getViewObjectClass() {
		return FinanceMonthReportVo.class;
	}

	@Override
	protected BaseReportFacade<FinanceMonthReportQo, FinanceMonthReportVo> getReportFade() {
		return financeMonthReportFacade;
	}

}
