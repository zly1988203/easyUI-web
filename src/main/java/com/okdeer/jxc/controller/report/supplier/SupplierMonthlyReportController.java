/**
 *@Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 *@Project: okdeer-jxc-web
 *@Package: com.okdeer.jxc.controller.report.supplier
 *@Author: songwj
 *@Date: 2017年3月30日 下午2:32:11
 *注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */

package com.okdeer.jxc.controller.report.supplier;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.google.common.collect.Maps;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.PrintConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.print.JasperHelper;
import com.okdeer.jxc.controller.report.DayReportController;
import com.okdeer.jxc.report.qo.DayReportQo;
import com.okdeer.jxc.report.service.DayReportService;
import com.okdeer.jxc.report.vo.SupplierMonthReportVo;

/**
 * @ClassName: SupplierMonthlyReportController
 * @Description: 供应商月结报表
 * @project okdeer-jxc-web
 * @author songwj
 * @date 2017年3月30日 下午2:32:11
 * =================================================================================================
 *     Task ID	         Date		  Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     V2.5         	2017年3月30日	 songwj				供应商月结报表 
 */
@RestController
@RequestMapping("report/supplier/month")
public class SupplierMonthlyReportController extends BaseController<DayReportController> {

	@Reference(version = "1.0.0", check = false)
	private DayReportService dayReportService;

	@RequestMapping(value = "/list")
	public ModelAndView add() {
		Map<String, String> model = Maps.newHashMap();
		// model.put("branchId", UserUtil.getCurrentUser().getBranchId());
		// model.put("branchName", UserUtil.getCurrentUser().getBranchName());
		model.put("startTime",
				LocalDate.now().minusMonths(1).format(DateTimeFormatter.ofPattern(DateUtils.DATE_JFP_STR_R)));
		return new ModelAndView("report/supplier/monthlylist", model);
	}

	@RequestMapping(value = "details/list", method = RequestMethod.POST)
	public PageUtils<SupplierMonthReportVo> getReportList(DayReportQo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		Optional<DayReportQo> optional = Optional.ofNullable(vo);
		vo = optional.orElse(new DayReportQo());
		vo.setPageNumber(pageNumber);
		vo.setPageSize(pageSize);
		if (StringUtils.isNotBlank(vo.getStartTime())) {
			// 月的第一天
			LocalDate firstDayOfMonth = LocalDate.parse(vo.getStartTime() + "-01").with(
					TemporalAdjusters.firstDayOfMonth());
			// 月的最后一天
			LocalDate lastDayOfMonth = LocalDate.parse(vo.getStartTime() + "-01").with(
					TemporalAdjusters.lastDayOfMonth());

			vo.setFirstDayOfMonth(firstDayOfMonth.format(DateTimeFormatter.ofPattern(DateUtils.DATE_SMALL_STR_R)));
			vo.setLastDayOfMonth(lastDayOfMonth.format(DateTimeFormatter.ofPattern(DateUtils.DATE_SMALL_STR_R)));
			PageUtils<SupplierMonthReportVo> pageUtils = dayReportService.getSupplierMonthReportList(vo);
			
			if(pageUtils==null){
				return PageUtils.emptyPage();
			}
			
			// 汇总合计
			List<SupplierMonthReportVo> vos = pageUtils.getRows();
			BigDecimal beginStock = BigDecimal.ZERO;
			BigDecimal beginCostAmount = BigDecimal.ZERO;
			BigDecimal beginSaleAmount = BigDecimal.ZERO;
			BigDecimal endStock = BigDecimal.ZERO;
			BigDecimal endCostAmount = BigDecimal.ZERO;
			BigDecimal endSaleAmount = BigDecimal.ZERO;
			BigDecimal posNum = BigDecimal.ZERO;
			BigDecimal costAmount = BigDecimal.ZERO;
			BigDecimal posAmount = BigDecimal.ZERO;
			BigDecimal profitAmount = BigDecimal.ZERO;
			for (SupplierMonthReportVo reportVo : vos) {
				beginStock = beginStock.add(reportVo.getBeginStock()==null?BigDecimal.ZERO:reportVo.getBeginStock());
				beginCostAmount = beginCostAmount.add(reportVo.getBeginCostAmount()==null?BigDecimal.ZERO:reportVo.getBeginCostAmount());
				beginSaleAmount = beginSaleAmount.add(reportVo.getBeginSaleAmount()==null?BigDecimal.ZERO:reportVo.getBeginSaleAmount());
				endStock = endStock.add(reportVo.getEndStock()==null?BigDecimal.ZERO:reportVo.getEndStock());
				endCostAmount = endCostAmount.add(reportVo.getEndCostAmount()==null?BigDecimal.ZERO:reportVo.getEndCostAmount());
				endSaleAmount = endSaleAmount.add(reportVo.getEndSaleAmount()==null?BigDecimal.ZERO:reportVo.getEndSaleAmount());
				posNum = posNum.add(reportVo.getPosNum()==null?BigDecimal.ZERO:reportVo.getPosNum());
				costAmount = costAmount.add(reportVo.getCostAmount()==null?BigDecimal.ZERO:reportVo.getCostAmount());
				posAmount = posAmount.add(reportVo.getPosAmount()==null?BigDecimal.ZERO:reportVo.getPosAmount());
				profitAmount = profitAmount.add(reportVo.getProfitAmount()==null?BigDecimal.ZERO:reportVo.getProfitAmount());
			}
			List<SupplierMonthReportVo> footer = new ArrayList<SupplierMonthReportVo>();
			if (pageUtils != null) {
				SupplierMonthReportVo reportVo = new SupplierMonthReportVo();
				reportVo.setBranchCode("SUM");
				reportVo.setBeginCostAmount(beginCostAmount);
				reportVo.setBeginSaleAmount(beginSaleAmount);
				reportVo.setBeginStock(beginStock);
				reportVo.setCostAmount(costAmount);
				reportVo.setEndCostAmount(endCostAmount);
				reportVo.setEndSaleAmount(endSaleAmount);
				reportVo.setEndStock(endStock);
				reportVo.setPosAmount(posAmount);
				reportVo.setPosNum(posNum);
				reportVo.setProfitAmount(profitAmount);
				footer.add(reportVo);
			}
			pageUtils.setFooter(footer);

			return pageUtils;
		}
		return PageUtils.emptyPage();
	}

	@RequestMapping(value = "/export/list", method = RequestMethod.POST)
	public RespJson exportList(HttpServletResponse response, DayReportQo vo) {
		RespJson resp = RespJson.success();
		Optional<DayReportQo> optional = Optional.ofNullable(vo);
		vo = optional.orElse(new DayReportQo());
		if (StringUtils.isNotBlank(vo.getStartTime())) {
			// 月的第一天
			LocalDate firstDayOfMonth = LocalDate.parse(vo.getStartTime() + "-01").with(
					TemporalAdjusters.firstDayOfMonth());
			// 月的最后一天
			LocalDate lastDayOfMonth = LocalDate.parse(vo.getStartTime() + "-01").with(
					TemporalAdjusters.lastDayOfMonth());

			vo.setFirstDayOfMonth(firstDayOfMonth.format(DateTimeFormatter.ofPattern(DateUtils.DATE_SMALL_STR_R)));
			vo.setLastDayOfMonth(lastDayOfMonth.format(DateTimeFormatter.ofPattern(DateUtils.DATE_SMALL_STR_R)));
			List<SupplierMonthReportVo> exportList = dayReportService.exportSupplierMonthList(vo);
			String fileName = "供应商进销存月报表_" + DateUtils.getCurrSmallStr();
			String templateName = ExportExcelConstant.SUPPLIER_MONTHLY_REPORT;
			exportListForXLSX(response, exportList, fileName, templateName);
		}
		resp = RespJson.error();
		return resp;
	}

	@RequestMapping(value = "/print", method = RequestMethod.GET)
	public String printReport(DayReportQo vo, HttpServletResponse response, HttpServletRequest request) {
		Optional<DayReportQo> optional = Optional.ofNullable(vo);
		vo = optional.orElse(new DayReportQo());
		vo.setPageNumber(Integer.valueOf(PAGE_NO));
		vo.setPageSize(PrintConstant.PRINT_MAX_LIMIT);
		// 默认当前机构
		if (StringUtils.isBlank(vo.getBranchId()) && StringUtils.isBlank(vo.getBranchName())) {
			vo.setBranchId(getCurrBranchId());
		}
		if (StringUtils.isNotBlank(vo.getStartTime())) {
			// 月的第一天
			LocalDate firstDayOfMonth = LocalDate.parse(vo.getStartTime() + "-01").with(
					TemporalAdjusters.firstDayOfMonth());
			// 月的最后一天
			LocalDate lastDayOfMonth = LocalDate.parse(vo.getStartTime() + "-01").with(
					TemporalAdjusters.lastDayOfMonth());

			vo.setFirstDayOfMonth(firstDayOfMonth.format(DateTimeFormatter.ofPattern(DateUtils.DATE_SMALL_STR_R)));
			vo.setLastDayOfMonth(lastDayOfMonth.format(DateTimeFormatter.ofPattern(DateUtils.DATE_SMALL_STR_R)));
			List<SupplierMonthReportVo> exportList = dayReportService.exportSupplierMonthList(vo);
			if (exportList.size() > PrintConstant.PRINT_MAX_ROW) {
				return "<script>alert('打印最大行数不能超过3000行');top.closeTab();</script>";
			}
			String path = PrintConstant.SUPPLIER_MONTHLY_REPORT;
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("startDate", firstDayOfMonth.getMonthValue() + "月");
			map.put("printName", getCurrentUser().getUserName());
			JasperHelper.exportmain(request, response, map, JasperHelper.PDF_TYPE, path, exportList, "");
		}
		return null;
	}
}
