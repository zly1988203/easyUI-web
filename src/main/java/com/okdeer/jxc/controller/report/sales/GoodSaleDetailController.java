package com.okdeer.jxc.controller.report.sales;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.enums.BusinessTypeEnum;
import com.okdeer.jxc.common.enums.OrderResourceEnum;
import com.okdeer.jxc.common.report.DataRecord;
import com.okdeer.jxc.common.report.ReportService;
import com.okdeer.jxc.common.utils.StringUtils;
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
		Map<String, Object> map= this.builderParams(request, null);
		/*if(!map.containsKey("branchCompleCode")){
			map.put("branchCompleCode", UserUtil.getCurrBranchCompleCode());
		}*/
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

	@RequestMapping("reportList")
	@ResponseBody
	public List<DataRecord> reportList(HttpServletRequest request) {
		List<DataRecord> list = getReportService().getList(getParam(request));
		for(DataRecord dataRecord:list){
			formatter(dataRecord);
		}
		return list;
	}
	@Override
	public void formatter(DataRecord dataRecord) {
		if (dataRecord.get("businessType")!=null&&StringUtils.isNotBlank(dataRecord.get("businessType").toString())) {
			dataRecord.put("businessTypeStr", BusinessTypeEnum.getName(dataRecord.get("businessType").toString()));
		}
		if (dataRecord.get("orderType")!=null&&StringUtils.isNotBlank(dataRecord.get("orderType").toString())) {
			dataRecord.put("orderTypeStr", OrderResourceEnum.getName(Integer.parseInt(dataRecord.get("orderType").toString())));
		}
	}
}
