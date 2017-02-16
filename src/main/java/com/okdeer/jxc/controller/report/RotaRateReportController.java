package com.okdeer.jxc.controller.report;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.formula.functions.T;
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
import com.okdeer.jxc.report.service.RotaRateReportServiceApi;
import com.okdeer.jxc.report.vo.RotaRateReportVo;

/***
 * 
 * ClassName: RotaRateReportController 
 * @Description: 库存周转率报表
 * @author xuyq
 * @date 2017年2月14日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/report/rotation")
public class RotaRateReportController extends BaseController<T> {

	/**
	 * RotaRateReportServiceApi
	 */
	@Reference(version = "1.0.0", check = false)
	private RotaRateReportServiceApi rotaRateReportServiceApi;

	/**
	 * 
	 * @Description: 跳转列表页面
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/list")
	public String list() {
		return "report/rotation/rotationReport";
	}

	@RequestMapping(value = "getRotaRateReportList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<RotaRateReportVo> getRotaRateReportList(RotaRateReportVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		try {
			vo.setRotationDay(DateUtils.pastDays(DateUtils.parse(vo.getEndTime(), DateUtils.DATE_SMALL_STR_R),
					DateUtils.parse(vo.getStartTime(), DateUtils.DATE_SMALL_STR_R)) + "");
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			PageUtils<RotaRateReportVo> rotaRateReportList = rotaRateReportServiceApi.getRotaRateReportList(vo);
			LOG.info(LogConstant.PAGE, rotaRateReportList.toString());
			return rotaRateReportList;
		} catch (Exception e) {
			LOG.error("库存周转率报表列表信息异常:{}", e);
		}
		return null;
	}

	/***
	 * 
	 * @Description: 导出列表
	 * @param response
	 * @param vo
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/exportRotaRateReportList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportList(HttpServletResponse response, RotaRateReportVo vo) {
		RespJson resp = RespJson.success();
		try {
			vo.setRotationDay(DateUtils.pastDays(DateUtils.parse(vo.getEndTime(), DateUtils.DATE_SMALL_STR_R),
					DateUtils.parse(vo.getStartTime(), DateUtils.DATE_SMALL_STR_R)) + "");
			List<RotaRateReportVo> exportList = rotaRateReportServiceApi.exportRotaRateReportList(vo);
			String fileName = "库存周转率报表";
			String templateName = ExportExcelConstant.SALEROTARATEREPORT;
			if ("2".equals(vo.getRotationType())) {
				templateName = ExportExcelConstant.COSTROTARATEREPORT;
			}
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("导出 库存周转率报表异常：{}", e);
			resp = RespJson.error("导出 库存周转率报表");
		}
		return resp;
	}
}
