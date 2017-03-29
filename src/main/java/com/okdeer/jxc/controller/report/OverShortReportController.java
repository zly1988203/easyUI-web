/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhengwj
 *@Date: 2017年3月28日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.base.common.utils.DateUtils;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.report.service.OverShortReportApi;
import com.okdeer.jxc.report.vo.OverShortReportVo;

/**
 * ClassName: OverShortReportController 
 * @Description: 长短款报表controller
 * @author zhengwj
 * @date 2017年3月28日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("report/overShort")
public class OverShortReportController extends BaseController<OverShortReportController> {

	/**
	 * @Fields overShortReportApi : 长短款报表service
	 */
	@Reference(version = "1.0.0", check = false)
	private OverShortReportApi overShortReportApi;

	/**
	 * @Description: 长短款列表
	 * @author zhengwj
	 * @date 2017年3月28日
	 */
	@RequestMapping(value = "list")
	public String list() {
		return "report/overShort/list";
	}

	/**
	 * @Description: 查询长短款报表列表数据
	 * @author zhengwj
	 * @date 2017年3月28日
	 */
	@RequestMapping(value = "getReportList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<OverShortReportVo> getReportList(OverShortReportVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			PageUtils<OverShortReportVo> reportList = overShortReportApi.getReportList(vo);
			LOG.info(LogConstant.PAGE, reportList.toString());
			return reportList;
		} catch (Exception e) {
			LOG.error("长短款报表列表信息异常:{}", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 导出长短款报表
	 * @author zhengwj
	 * @date 2017年3月28日
	 */
	@RequestMapping(value = "/exportReportList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportReportList(HttpServletResponse response, OverShortReportVo vo) {
		RespJson resp = RespJson.success();
		try {
			List<OverShortReportVo> exportList = overShortReportApi.exportReportList(vo);
			String fileName = "现金长短款报表" + DateUtils.getDate("yyyyMMdd");
			String templateName = null;
			switch (vo.getReportType()) {
				case 1:
					// 长短款日报表
					templateName = ExportExcelConstant.OVER_SHORT_REPORT1;
					break;
				case 2:
					// 长短款日报表（日汇总）
					templateName = ExportExcelConstant.OVER_SHORT_REPORT2;
					break;
				case 3:
					// 入袋记录报表
					templateName = ExportExcelConstant.OVER_SHORT_REPORT3;
					break;
				default:
					break;
			}
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("导出长短款报表异常：{}", e);
			resp = RespJson.error("导出长短款报表异常");
		}
		return resp;
	}
}
