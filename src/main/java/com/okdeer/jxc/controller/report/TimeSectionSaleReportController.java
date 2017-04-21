package com.okdeer.jxc.controller.report;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.report.service.TimeSectionSaleReportService;
import com.okdeer.jxc.report.vo.TimeSectionSaleReportVo;

/***
 * 
 *<p></p>
 * ClassName: TimeSectionSellReportController 
 * @Description: 时段客单报表
 * @author xuyq
 * @date 2017年3月30日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@Controller
@RequestMapping("report/sectionSell")
public class TimeSectionSaleReportController extends BaseController<TimeSectionSaleReportController> {

	@Reference(version = "1.0.0", check = false)
	private TimeSectionSaleReportService timeSectionSaleReportService;

	@RequestMapping(value = "/list")
	public String list() {
		return "report/timeSection/timeSectionSaleReport";
	}

	/**
	 * @Description: 查询分页列表
	 * @param vo 参数VO
	 * @param pageNumber 页数
	 * @param pageSize 条数
	 * @return PageUtils
	 * @author xuyq
	 * @date 2017年4月1日
	 */
	@RequestMapping(value = "getTimeSectionSellReportList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<TimeSectionSaleReportVo> getTimeSectionSellReportList(TimeSectionSaleReportVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.debug(LogConstant.OUT_PARAM, vo.toString());
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			// 结束日期延后一天
			if (vo.getEndTime() != null) {
				vo.setEndTime(DateUtils.getDayAfter(vo.getEndTime()));
			}
			if(StringUtils.isNotBlank(vo.getBranchCompleCode())){
				vo.setBranchName(null);
			}
			PageUtils<TimeSectionSaleReportVo> rotaRateReportList = timeSectionSaleReportService
					.getTimeSectionSellReportList(vo);
			LOG.debug(LogConstant.PAGE, rotaRateReportList.toString());
			return rotaRateReportList;
		} catch (Exception e) {
			LOG.error("时段客单报表列表信息异常:{}", e);
		}
		return null;
	}

	/**
	 * @Description: 导出列表
	 * @param response response
	 * @param vo 参数VO
	 * @return RespJson
	 * @author xuyq
	 * @date 2017年4月1日
	 */
	@RequestMapping(value = "/exportTimeSectionSellReportList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportList(HttpServletResponse response, TimeSectionSaleReportVo vo) {
		RespJson resp = RespJson.success();
		try {
			// 结束日期延后一天
			if (vo.getEndTime() != null) {
				vo.setEndTime(DateUtils.getDayAfter(vo.getEndTime()));
			}
			if(StringUtils.isNotBlank(vo.getBranchCompleCode())){
				vo.setBranchName(null);
			}
			List<TimeSectionSaleReportVo> exportList = timeSectionSaleReportService.exportTimeSectionSellReportList(vo);
			String fileName = "时段客单报表" + DateUtils.getCurrStr("yyyyMMdd");
			String templateName = ExportExcelConstant.TIMESECTIONSALEREPORT;
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("导出 时段客单报表异常：{}", e);
			resp = RespJson.error("导出 时段客单报表异常");
		}
		return resp;
	}
}
