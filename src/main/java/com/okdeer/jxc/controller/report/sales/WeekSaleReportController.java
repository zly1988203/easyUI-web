package com.okdeer.jxc.controller.report.sales;  

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.controller.BaseReportController;
import com.okdeer.retail.facade.report.facade.BaseReportFacade;
import com.okdeer.retail.facade.report.sales.facade.WeekSaleReportFacade;
import com.okdeer.retail.facade.report.sales.qo.WeekSaleReportQo;
import com.okdeer.retail.facade.report.sales.vo.WeekSaleReportVo;

@Controller
@RequestMapping("report/sales/weekSaleReport")
public class WeekSaleReportController extends BaseReportController<WeekSaleReportQo,WeekSaleReportVo>{
	@Reference(version = "1.0.0", check = false)
	WeekSaleReportFacade weekSaleReportFacade;
	@Override
	protected String getViewName() {
		return "report/sales/weekSaleReport";
	}

	@Override
	protected Model getModel(Model model) {
		return model;
	}

	@Override
	protected WeekSaleReportQo getQueryObject(WeekSaleReportQo qo) {
		return qo;
	}

	@Override
	protected Class<WeekSaleReportVo> getViewObjectClass() {
		return WeekSaleReportVo.class;
	}

	@Override
	protected BaseReportFacade<WeekSaleReportQo, WeekSaleReportVo> getReportFade() {
		return weekSaleReportFacade;
	}

}
