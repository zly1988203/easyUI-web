/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年7月13日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report.plan;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.settle.store.po.StorePlanDayTrackPo;
import com.okdeer.jxc.settle.store.qo.StorePlanQo;
import com.okdeer.jxc.settle.store.service.StorePlanReportService;
import com.okdeer.jxc.utils.poi.ExcelExportUtil;

import net.sf.json.JSONObject;

/**
 * ClassName: StorePlanDayTrackReportController 
 * @Description: 门店计划日跟踪表
 * @author liwb
 * @date 2017年7月13日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@RestController
@RequestMapping("target/storePlan/report/dayTrack")
public class StorePlanDayTrackReportController extends BaseController<StorePlanDayTrackReportController> {

	@Reference(version = "1.0.0", check = false)
	private StorePlanReportService storePlanReportService;

	@RequestMapping(value = "toManager")
	public ModelAndView toManager() {
		return new ModelAndView("report/plan/storePlanDayTrackReport");
	}

	@RequestMapping(value = "getList", method = RequestMethod.POST)
	public PageUtils<StorePlanDayTrackPo> getList(StorePlanQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {

		qo.setPageNumber(pageNumber);
		qo.setPageSize(pageSize);

		// 构建查询参数
		buildParams(qo);

		LOG.debug("查询门店计划日跟踪表条件：{}", qo);

		try {

			return storePlanReportService.getStorePlanDayTrackForPage(qo);
		} catch (Exception e) {
			LOG.error("分页查询门店计划日跟踪表异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 构建查询参数
	 * @param qo
	 * @author liwb
	 * @date 2017年5月27日
	 */
	private void buildParams(StorePlanQo qo) {
		// 默认当前机构
		if (StringUtils.isBlank(qo.getBranchCompleCode())) {
			qo.setBranchCompleCode(super.getCurrBranchCompleCode());
		}
	}

	@RequestMapping(value = "exportExcelList", method = RequestMethod.POST)
	public void exportExcelList(StorePlanQo qo, HttpServletResponse response) {
		try {
			// 构建查询参数
			buildParams(qo);

			LOG.debug("查询门店计划日跟踪表条件：{}", qo);

			String timeStr = DateUtils.getSmallStr(qo.getRptDate());

			// 导出文件名称，不包括后缀名
			String reportFileName = "门店计划日跟踪表_" + timeStr;

			// 导出数据
			List<StorePlanDayTrackPo> dataList = storePlanReportService.getStorePlanDayTrackForExport(qo);

			String[] headers = new String[] { "序号", "机构编码", "机构名称", "类型", "当月销售目标", "日均销售目标", "当天销额", "当天订单数", "当天客单价",
					"当月累计销额", "累计销额差异", "实际达成进度", "时间进度" };
			String[] columns = new String[] { "no", "branchCode", "branchName", "dataType", "monthPlanAmount",
					"dayPlanAmount", "daySaleAmount", "daySaleNum", "daySalePrice", "monthSaleAmount",
					"monthSaleDisparity", "monthComplePercentStr", "timeSchedulePercentStr" };

			List<JSONObject> jsonList = new ArrayList<JSONObject>();
			for (StorePlanDayTrackPo dataRecord : dataList) {
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("no", dataRecord.getNo());
				jsonObject.put("branchCode", dataRecord.getBranchCode());
				jsonObject.put("branchName", dataRecord.getBranchName());
				jsonObject.put("dataType", dataRecord.getDataType());
				jsonObject.put("monthPlanAmount", dataRecord.getMonthPlanAmount());
				jsonObject.put("dayPlanAmount", dataRecord.getDayPlanAmount());
				jsonObject.put("daySaleAmount", dataRecord.getDaySaleAmount());
				jsonObject.put("daySaleNum", dataRecord.getDaySaleNum());
				jsonObject.put("daySalePrice", dataRecord.getDaySalePrice());
				jsonObject.put("monthSaleAmount", dataRecord.getMonthSaleAmount());
				jsonObject.put("monthSaleDisparity", dataRecord.getMonthSaleDisparity());
				jsonObject.put("monthComplePercentStr", dataRecord.getMonthComplePercentStr());
				jsonObject.put("timeSchedulePercentStr", dataRecord.getTimeSchedulePercentStr());
				jsonList.add(jsonObject);
			}

			List<String> mergeColumn = new ArrayList<>();
			mergeColumn.add("no");
			mergeColumn.add("branchCode");
			mergeColumn.add("branchName");
			ExcelExportUtil.exportMergeExcel(reportFileName, headers, columns, mergeColumn, jsonList, response);
		} catch (Exception e) {
			LOG.error("门店计划日跟踪表导出失败", e);
		}

	}

}
