/** 
 *@Project: okdeer-jxc-web 
 *@Author: zuowm
 *@Date: 2017年7月13日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */
package com.okdeer.jxc.controller.report.sales;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.utils.poi.ExcelExportUtil;
import com.okdeer.retail.facade.report.entity.PeriodSaleContrastResult;
import com.okdeer.retail.facade.report.facade.PeriodSaleContrastFacade;
import com.okdeer.retail.facade.report.qo.PeriodSaleContrastQo;

import net.sf.json.JSONObject;

/**
 * ClassName: PeriodSaleContrastController 
 * @Description: 时段销售对比分析controller
 * @author zuowm
 * @date 2017年7月13日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/report/periodSaleContrast")
public class PeriodSaleContrastController extends BaseController<PeriodSaleContrastController> {

	@Reference(version = "1.0.0", check = false)
	PeriodSaleContrastFacade periodSaleContrastFacade;

	/**
	 * @Description: 跳转页面
	 * @param model
	 * @return
	 * @author zuowm
	 * @date 2017年7月13日
	 */
	@RequestMapping()
	public String index() {
		LOG.info("PeriodSaleContrastController start....");
		return "report/sales/periodSaleContrast";
	}

	/**
	 * @Description: 时段销售对比分析查询
	 * @param qo 查询条件
	 * @return 查询结果
	 * @author zuowm
	 * @date 2017年7月15日
	 */
	@RequestMapping("/list")
	@ResponseBody
	public PageUtils<PeriodSaleContrastResult> list(PeriodSaleContrastQo qo) {
		LOG.info("PeriodSaleContrastController.list start....");

		try {
			handlerParam(qo);

			List<PeriodSaleContrastResult> list = periodSaleContrastFacade.queryPeriodSaleContrastResultPage(qo);
			PageUtils<PeriodSaleContrastResult> page = new PageUtils<PeriodSaleContrastResult>(list);
			LOG.debug("时段销售对比分析查询结果：{}", page);
			return page;
		} catch (Exception e) {
			LOG.debug("时段销售对比分析查询失败：{}", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 导出时段销售对比分析查询
	 * @param qo 查询条件
	 * @return 查询结果
	 * @author zuowm
	 * @date 2017年7月15日
	 */
	@RequestMapping("/exportList")
	public void export(HttpServletResponse response, PeriodSaleContrastQo qo) {

		try {
			handlerParam(qo);
			List<PeriodSaleContrastResult> list = periodSaleContrastFacade.queryPeriodSaleContrastResultPage(qo);

			String fileName = "时段销售对比分析" + "_" + DateUtils.getCurrSmallStr();

			String[] headers = { "项目/时段", "", "月均销售", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月",
					"11月", "12月", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月" };

			String[] columns = new String[] { "bizType", "classesStr", "avgSale", "thisOne", "thisTwo", "thisThree",
					"thisFour", "thisFive", "thisSix", "thisSeven", "thisEight", "thisNine", "thisTen", "thisEleven",
					"thisTwelve", "lastOne", "lastTwo", "lastThree", "lastFour", "lastFive", "lastSix", "lastSeven",
					"lastEight", "lastNine", "lastTen", "lastEleven", "lastTwelve" };

			List<JSONObject> jsonList = new ArrayList<JSONObject>();
			for (PeriodSaleContrastResult data : list) {
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("bizType", data.getBizType());
				jsonObject.put("classesStr", data.getClassesStr());
				jsonObject.put("avgSale", data.getAvgSale());
				jsonObject.put("thisOne", data.getThisOne());
				jsonObject.put("thisTwo", data.getThisTwo());
				jsonObject.put("thisThree", data.getThisThree());
				jsonObject.put("thisFour", data.getThisFour());
				jsonObject.put("thisFive", data.getThisFive());
				jsonObject.put("thisSix", data.getThisSix());
				jsonObject.put("thisSeven", data.getThisSeven());
				jsonObject.put("thisEight", data.getThisEight());
				jsonObject.put("thisNine", data.getThisNine());
				jsonObject.put("thisTen", data.getThisTen());
				jsonObject.put("thisEleven", data.getThisEleven());
				jsonObject.put("thisTwelve", data.getThisTwelve());
				jsonObject.put("lastOne", data.getLastOne());
				jsonObject.put("lastTwo", data.getLastTwo());
				jsonObject.put("lastThree", data.getLastThree());
				jsonObject.put("lastFour", data.getLastFour());
				jsonObject.put("lastFive", data.getLastFive());
				jsonObject.put("lastSix", data.getLastSix());
				jsonObject.put("lastSeven", data.getLastSeven());
				jsonObject.put("lastEight", data.getLastEight());
				jsonObject.put("lastNine", data.getLastNine());
				jsonObject.put("lastTen", data.getLastTen());
				jsonObject.put("lastEleven", data.getLastEleven());
				jsonObject.put("lastTwelve", data.getLastTwelve());
				jsonList.add(jsonObject);
			}

			List<String> mergeColumn = new ArrayList<>();
			mergeColumn.add("bizType");
			ExcelExportUtil.exportPeriodSaleExcel(fileName, headers, columns, mergeColumn, jsonList, response, null);
		} catch (Exception e) {
			LOG.error("时段销售对比分析报表导出失败", e);
		}
	}

	/**
	 * @Description: 获取查询参数
	 * @param qo 查询条件
	 * @author zuowm
	 * @date 2017年7月15日
	 */
	private void handlerParam(PeriodSaleContrastQo qo) {
		LOG.debug("时段销售对比分析查询条件：{}", qo);
		if (StringUtils.isEmpty(qo.getBranchCompleCode())) {
			qo.setBranchCompleCode(this.getCurrBranchCompleCode());
		}
		if (StringUtils.isEmpty(qo.getYearStr())) {
			Calendar ca = Calendar.getInstance();
			qo.setYearStr(ca.get(Calendar.YEAR) + "");
		}
	}
}
