package com.okdeer.jxc.controller.report.sales;  

import org.apache.commons.lang3.StringUtils;
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
		model.addAttribute(MAX_REPORT_TYPE,6);
		return model;
	}

	@Override
	protected WeekSaleReportQo getQueryObject(WeekSaleReportQo qo) {
		if(StringUtils.isEmpty(qo.getBranchCompleCode())){
			qo.setBranchCompleCode(getCurrBranchCompleCode());
		}
		//如果类别被选择，报表类型设置为类别所选中的值
		if(qo.getCategoryType()!=null&&WeekSaleReportFacade.REPORT_TYPE_LEVEL_1.equals(qo.getReportType())  ){
			qo.setReportType(qo.getCategoryType());
		}
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
