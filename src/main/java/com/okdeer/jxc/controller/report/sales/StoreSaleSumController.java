package com.okdeer.jxc.controller.report.sales;  

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.controller.BaseReportController;
import com.okdeer.retail.facade.report.facade.BaseReportFacade;
import com.okdeer.retail.facade.report.sales.facade.StoreSaleReportFacade;
import com.okdeer.retail.facade.report.sales.qo.StoreSaleReportQo;
import com.okdeer.retail.facade.report.sales.vo.StoreSaleReportVo;

@Controller
@RequestMapping("report/sales/storeSaleReport")
public class StoreSaleSumController extends BaseReportController<StoreSaleReportQo,StoreSaleReportVo>{
	@Reference(version = "1.0.0", check = false)
	StoreSaleReportFacade storeSaleReportFacade;
	@Override
	protected String getViewName() {
		return "report/sales/storeSaleReport";
	}

	@Override
	protected Model getModel(Model model) {
		model.addAttribute("maxReportType", 2);
		return model;
	}

	@Override
	protected StoreSaleReportQo getQueryObject(StoreSaleReportQo qo) {
		if(StringUtils.isEmpty(qo.getBranchCompleCode())){
			qo.setBranchCompleCode(getCurrBranchCompleCode());
		}
		if(qo.getCategoryType()!=null&&qo.getCategoryType()>3){
			qo.setReportType(qo.getCategoryType());
		}
		return qo;
	}

	@Override
	protected Class<StoreSaleReportVo> getViewObjectClass() {
		return StoreSaleReportVo.class;
	}

	@Override
	protected BaseReportFacade<StoreSaleReportQo, StoreSaleReportVo> getReportFade() {
		return storeSaleReportFacade;
	}

}
