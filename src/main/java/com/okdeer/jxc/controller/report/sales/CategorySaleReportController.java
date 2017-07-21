package com.okdeer.jxc.controller.report.sales;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.report.ReportService;
import com.okdeer.jxc.controller.common.ReportController;
import com.okdeer.jxc.report.sale.CategorySaleCostReportServiceApi;
import com.okdeer.retail.common.price.PriceConstant;
import com.okdeer.retail.common.report.DataRecord;

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

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getPriceAccess()
	 */
	@Override
	public Map<String, String> getPriceAccess() {
		Map<String, String> map = new HashMap<String, String>();
		map.put(PriceConstant.COST_PRICE, "profitAmount,profitRate,marginrate"); //毛利，毛利率，毛利占比
		return map;
	}

}
