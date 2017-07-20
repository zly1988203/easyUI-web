/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年4月1日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report.goods;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.report.DataRecord;
import com.okdeer.jxc.common.report.ReportService;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.common.ReportController;
import com.okdeer.jxc.report.goods.service.NewGoodsSaleAnalysisService;
import com.okdeer.jxc.utils.UserUtil;
import com.okdeer.retail.common.constant.PriceConstant;

/**
 * ClassName: NewGoodsSaleAnalysisController 
 * @Description: 新品销售分析Controller
 * @author liwb
 * @date 2017年4月1日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@Controller
@RequestMapping("report/newGoodsSaleAnalysis")
public class NewGoodsSaleAnalysisController extends ReportController {

	@Reference(version = "1.0.0", check = false)
	private NewGoodsSaleAnalysisService newGoodsSaleAnalysisService;

	@RequestMapping("/toManager")
	public String toManager(Model model) {
		return "report/goods/newGoodsSaleAnalysis";
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#exportExcel(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@RequestMapping(value = "exportExcelList")
	public void exportExcelList(HttpServletRequest request, HttpServletResponse response) {
		try {
			LOG.debug("新品销售分析导出");
			Map<String, Object> map = getParam(request);

			String timeStr = StringUtils.replace((String) map.get("startTime"), "-", "") + "-"
					+ StringUtils.replace((String) map.get("endTime"), "-", "") + "-";

			String reportFileName = "新品销售分析" + timeStr;
			String templateName = ExportExcelConstant.NEW_GOODS_SALE_ANALYSIS_REPORT;
			// 模板名称，包括后缀名
			List<DataRecord> dataList = newGoodsSaleAnalysisService.getList(map);

			cleanDataMaps(getPriceAccess(), dataList);
			exportListForXLSX(response, dataList, reportFileName, templateName);
		} catch (Exception e) {
			LOG.error("新品销售分析导出失败", e);
		}

	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getReportService()
	 */
	@Override
	public ReportService getReportService() {
		return newGoodsSaleAnalysisService;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getParam(javax.servlet.http.HttpServletRequest)
	 */
	@Override
	public Map<String, Object> getParam(HttpServletRequest request) {
		Map<String, Object> map = this.builderParams(request, null);
		if (!map.containsKey("branchCompleCode")) {
			map.put("branchCompleCode", UserUtil.getCurrBranchCompleCode());
		}
		return map;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getFileName()
	 */
	@Override
	public String getFileName() {
		return null;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getHeaders()
	 */
	@Override
	public String[] getHeaders() {
		return null;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getColumns()
	 */
	@Override
	public String[] getColumns() {
		return null;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#formatter(com.okdeer.jxc.common.report.DataRecord)
	 */
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
		map.put(PriceConstant.SALE_PRICE, "salePrice,saleAmount"); //销售价，销售额
		map.put(PriceConstant.COST_PRICE, "costPrice,costAmount,grossProfit,grossProfitRate"); //成本价，成本额，毛利，毛利率
		return map;
	}

}
