package com.okdeer.jxc.controller.report.sales;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.report.DataRecord;
import com.okdeer.jxc.common.report.ReportService;
import com.okdeer.jxc.controller.common.ReportController;
import com.okdeer.jxc.report.sale.CategorySaleCostReportServiceApi;

@Controller
@RequestMapping("report/sale/categorySaleReport")
public class CategorySaleReportController extends ReportController {
	@Reference(version = "1.0.0", check = false)
	CategorySaleCostReportServiceApi categorySaleCostReportServiceApi;
	@RequestMapping(value = "view")
	public String view() {
		return "report/sale/categorySaleReport";
	}

	@Override
	public ReportService getReportService() {
		return categorySaleCostReportServiceApi;
	}

	@Override
	public Map<String, Object> getParam(HttpServletRequest request) {
		Map<String, Object> map= this.builderParams(request, null);
		if(!map.containsKey("branchCompleCode")){
			map.put("branchCompleCode", this.getCurrBranchCompleCode());
		}
		return map;
	}
	

	@Override
	public String getFileName() {
		return null;
	}

	@Override
	public String[] getHeaders() {
		return null;
	}

	@Override
	public String[] getColumns() {
		return null;
	}

	@Override
	public void formatter(DataRecord dataRecord) {

	}

}
