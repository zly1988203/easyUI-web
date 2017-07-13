package com.okdeer.jxc.controller.report.sales;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.report.DataRecord;
import com.okdeer.jxc.common.report.ReportService;
import com.okdeer.jxc.controller.common.ReportController;
import com.okdeer.jxc.report.sale.GoodSaleDetailServiceApi;

@Controller
@RequestMapping("report/sale/goodSaleDetailReport")
public class GoodSaleDetailController extends ReportController {
	@Reference(version = "1.0.0", check = false)
	GoodSaleDetailServiceApi goodSaleDetailServiceApi;
	@RequestMapping(value = "view")
	public String view() {
		return "report/sale/goodSaleDetailReport";
	}

	@Override
	public ReportService getReportService() {
		return goodSaleDetailServiceApi;
	}

	@Override
	public Map<String, Object> getParam(HttpServletRequest request) {
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
