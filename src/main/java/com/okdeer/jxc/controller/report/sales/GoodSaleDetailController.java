package com.okdeer.jxc.controller.report.sales;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.enums.BusinessTypeEnum;
import com.okdeer.jxc.common.enums.OrderResourceEnum;
import com.okdeer.jxc.common.report.ReportService;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.common.ReportController;
import com.okdeer.jxc.report.sale.GoodSaleDetailServiceApi;
import com.okdeer.retail.common.price.PriceConstant;
import com.okdeer.retail.common.report.DataRecord;

/**
 * ClassName: GoodSaleDetailController 
 * @Description: 商品销售明细分析
 * @author yangyq02
 * @date 2017年7月21日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
 
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
		Map<String, Object> map = this.builderParams(request, null);
		/*
		 * if(!map.containsKey("branchCompleCode")){ map.put("branchCompleCode",
		 * UserUtil.getCurrBranchCompleCode()); }
		 */
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
		for (DataRecord dataRecord : list) {
			formatter(dataRecord);
		}
		return list;
	}

	@Override
	public void formatter(DataRecord dataRecord) {
		if (dataRecord.get("businessType") != null && StringUtils.isNotBlank(dataRecord.get("businessType").toString())) {
			dataRecord.put("businessTypeStr", BusinessTypeEnum.getName(dataRecord.get("businessType").toString()));
		}
		if (dataRecord.get("orderType") != null && StringUtils.isNotBlank(dataRecord.get("orderType").toString())) {
			dataRecord.put("orderTypeStr",
					OrderResourceEnum.getName(Integer.parseInt(dataRecord.get("orderType").toString())));
		}
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#exportExcel(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@RequestMapping(value = "exportExcel")
	@Override
	public void exportExcel(HttpServletRequest request, HttpServletResponse response) {
		try {
			LOG.debug("新品销售分析导出");
			Map<String, Object> map = getParam(request);

			String timeStr = StringUtils.replace((String) map.get("startTime"), "-", "") + "-"
					+ StringUtils.replace((String) map.get("endTime"), "-", "") + "-";

			String reportFileName = "商品销售明细分析" + timeStr;
			String templateName = "GoodSaleDetail.xlsx";
			// 模板名称，包括后缀名
			List<DataRecord> dataList = getReportService().getList(map);
			for (DataRecord dataRecord : dataList) {
				formatter(dataRecord);
			}
			
			DataRecord data = goodSaleDetailServiceApi.getTotal(map);
			dataList.add(data);
			cleanDataMaps(getPriceAccess(), dataList);
			exportListForXLSX(response, dataList, reportFileName, templateName);
		} catch (Exception e) {
			LOG.error("新品销售分析导出失败", e);
		}

	}
	/**
	 * @see com.okdeer.jxc.controller.common.ReportController#getPriceAccess()
	 */
	@Override
	public Map<String, String> getPriceAccess() {
		Map<String, String> map = new HashMap<String, String>();
		map.put(PriceConstant.COST_PRICE, "costPrice,costAmount"); //成本价，成本金额
		return map;
	}
}
