package com.okdeer.jxc.controller.report.sales;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.okdeer.jxc.common.report.DataRecord;
import com.okdeer.jxc.common.report.ReportService;
import com.okdeer.jxc.controller.common.ReportController;

@Controller
@RequestMapping("report/sale/categorySaleReport")
public class CategorySaleReportController extends ReportController {

	@RequestMapping(value = "view")
	public String view() {
		return "report/sale/categorySaleReport";
	}

	@Override
	public ReportService getReportService() {
		return null;
	}

	@Override
	public Map<String, Object> getParam(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return null;
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
