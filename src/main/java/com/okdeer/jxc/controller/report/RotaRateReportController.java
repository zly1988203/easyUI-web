package com.okdeer.jxc.controller.report;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
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
import com.okdeer.jxc.common.constant.PrintConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.print.JasperHelper;
import com.okdeer.jxc.report.service.RotaRateReportServiceApi;
import com.okdeer.jxc.report.vo.RotaRateReportVo;
import com.okdeer.jxc.utils.UserUtil;

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
public class RotaRateReportController extends BaseController<RotaRateReportController> {

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
			List<RotaRateReportVo> exportList = rotaRateReportServiceApi.exportRotaRateReportList(vo);
			String fileName = "库存周转率报表" + DateUtils.getDate("yyyyMMdd");
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

	/**
	 * 
	 * @Description: 打印
	 * @param qo
	 * @param response
	 * @param request
	 * @param pageNumber
	 * @return
	 * @author xuyq
	 * @date 2017年2月17日
	 */
	@RequestMapping(value = "/printRotaRateReport", method = RequestMethod.GET)
	@ResponseBody
	public String printRotaRateReport(RotaRateReportVo vo, HttpServletResponse response, HttpServletRequest request) {
		try {
			LOG.debug("库存周转率报表打印参数：{}", vo.toString());
			List<RotaRateReportVo> printList = rotaRateReportServiceApi.exportRotaRateReportList(vo);

			if (printList.size() > PrintConstant.PRINT_MAX_ROW) {
				return "<script>alert('打印最大行数不能超过300行');top.closeTab();</script>";
			}
			String path = PrintConstant.SALE_ROTARATE_REPORT;
			if ("2".equals(vo.getRotationType())) {
				path = PrintConstant.COST_ROTARATE_REPORT;
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("startDate", vo.getStartTime());
			map.put("endDate", vo.getEndTime());
			map.put("printName", UserUtil.getCurrentUser().getUserName());
			JasperHelper.exportmain(request, response, map, JasperHelper.PDF_TYPE, path, printList, "");
		} catch (Exception e) {
			LOG.error(PrintConstant.ROTARATE_PRINT_ERROR, e);
		}
		return null;
	}
}
