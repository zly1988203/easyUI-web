/** 
 *@Project: okdeer-jxc-web 
 *@Author: chenchm
 *@Date: 2016年11月9日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.report.ReportService;
import com.okdeer.jxc.controller.common.ReportController;
import com.okdeer.jxc.report.service.OutOfStockServiceApi;
import com.okdeer.jxc.utils.UserUtil;
import com.okdeer.retail.common.price.PriceConstant;
import com.okdeer.retail.common.report.DataRecord;

/**
 * ClassName: OutOfStockController 
 * @Description: 配送缺货率分析
 * @author chenchm
 * @date 2016年11月9日 
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("report/outOfStock")
public class OutOfStockController extends ReportController {

	/**
	 * @Fields PricingQueryService : tiaojdservice
	 */
	@Reference(version = "1.0.0", check = false)
	private OutOfStockServiceApi outOfStockServiceApi;

	@RequestMapping("/view")
	public String view(Model model) {
		model.addAttribute("branchId", getCurrBranchId());
		return "report/pricing/outOfStock";
	}

	@Override
	public ReportService getReportService() {
		return outOfStockServiceApi;
	}

	@Override
	public Map<String, Object> getParam(HttpServletRequest request) {
		Map<String, Object> map = this.builderParams(request, null);
		map.put("sourceBranchCompleteCode", UserUtil.getCurrBranchCompleCode());
		return map;
	}

	/**
	 * 
	 * @Description: 导出
	 * @param request
	 * @param response
	 * @return
	 * @author chenchm
	 * @date 2016年11月11日
	 */
	@RequestMapping(value = "/exportList")
	@ResponseBody
	public String exportList(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> map = getParam(request);
		map.put("startCount", Integer.parseInt(map.get("startCount").toString()));
		map.put("endCount", Integer.parseInt(map.get("endCount").toString()));
		String fileName = null;
		String templateName = null;
		// 判断是否是汇总查询/明细
		try {
			String branchName = getCurrBranchName();
			List<DataRecord> reportList = outOfStockServiceApi.getList(map);
			DataRecord dataRecord = outOfStockServiceApi.getTotal(map);
			if ("0".equals(map.get("type"))) {
				LOG.debug("导出配送缺货率分析商品明细导出查询参数:{}" + map.toString());
				fileName = branchName + "配送缺货率商品明细表" + map.get("startTime").toString().replaceAll("-", "") + '-'
						+ map.get("endTime").toString().replaceAll("-", "");
				templateName = ExportExcelConstant.DELIVERY_DETAIL;
				dataRecord.put("inFormNo", "合计");
			} else if ("1".equals(map.get("type"))) {
				LOG.debug("导出配送缺货率分析商品汇总导出查询参数:{}" + map.toString());
				fileName = branchName + "配送缺货率商品汇总表" + map.get("startTime").toString().replaceAll("-", "") + '-'
						+ map.get("endTime").toString().replaceAll("-", "");
				templateName = ExportExcelConstant.DELIVERY_SUM_GOODS;
				dataRecord.put("skuCode", "合计");
			} else if ("2".equals(map.get("type"))) {
				LOG.debug("导出配送缺货率分析单据汇总导出查询参数:{}" + map.toString());
				fileName = branchName + "配送缺货率单据汇总表" + map.get("startTime").toString().replaceAll("-", "") + '-'
						+ map.get("endTime").toString().replaceAll("-", "");
				templateName = ExportExcelConstant.DELIVERY_SUM_FORM;
				dataRecord.put("targetBranchName", "合计");
			} else if ("3".equals(map.get("type"))) {
				LOG.debug("导出配送缺货率分析店铺汇总导出查询参数:{}" + map.toString());
				fileName = branchName + "配送缺货率店铺汇总表" + map.get("startTime").toString().replaceAll("-", "") + '-'
						+ map.get("endTime").toString().replaceAll("-", "");
				templateName = ExportExcelConstant.DELIVERY_SUM_BRANCH;
				dataRecord.put("targetBranchName", "合计");
			}

			reportList.add(dataRecord);
			cleanDataMaps(getPriceAccess(), reportList);

			// 导出Excel
			Map<String, Object> param = new HashMap<>();
			param.put("branchName", branchName);
			exportParamListForXLSX(response, reportList, param, fileName, templateName);

		} catch (Exception e) {
			LOG.error("调价单导出查询异常:", e);
		}
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

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getPriceAccess()
	 */
	@Override
	public Map<String, String> getPriceAccess() {
		Map<String, String> map = new HashMap<String, String>();
		map.put(PriceConstant.DISTRIBUTION_PRICE, "inAmount,outAmount,DIAmount");
		return map;
	}
}
