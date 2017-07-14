/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年7月13日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.report.plan;  

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.settle.store.po.StorePlanDayTrackPo;
import com.okdeer.jxc.settle.store.qo.StorePlanQo;
import com.okdeer.jxc.settle.store.service.StorePlanReportService;


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

			String timeStr = DateUtils.getSmallStr(qo.getStartTime()) + "-" + DateUtils.getSmallStr(qo.getEndTime());

			// 导出文件名称，不包括后缀名
			String reportFileName = "门店计划日跟踪表" + timeStr;

			// 模板名称，包括后缀名
			String templateName = ExportExcelConstant.BEY_DAY_ANALYSIS_EXPORT_TEMPLATE;

			// 模板名称，包括后缀名
			List<StorePlanDayTrackPo> dataList = storePlanReportService.getStorePlanDayTrackForExport(qo);

			exportListForXLSX(response, dataList, reportFileName, templateName);

		} catch (Exception e) {
			LOG.error("门店计划日跟踪表导出失败", e);
		}

	}
	

}
