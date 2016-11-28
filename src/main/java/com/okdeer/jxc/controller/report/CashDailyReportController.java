/** 
 *@Project: okdeer-jxc-web 
 *@Author: taomm
 *@Date: 2016年8月15日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.PrintConstant;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.print.JasperHelper;
import com.okdeer.jxc.report.qo.CashDailyReportQo;
import com.okdeer.jxc.report.service.CashDailyReportService;
import com.okdeer.jxc.report.vo.CashDailyReportVo;
import com.okdeer.jxc.utils.UserUtil;

/**
 * 
 * ClassName: CashDailyReportController 
 * @Description: 收银日报
 * @author dongh
 * @date 2016年8月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     商业管理系统1.0.0	2016年8月22日                  dongh              创建收银日报Controller
 *     商业管理系统1.0.0	2016年8月31日                  zhongy             添加导出报表条件查询
 *     商业管理系统1.0.0	2016年9月2日                   lijy02			  	 打印
 */

@Controller
@RequestMapping("cashDaily/report")
public class CashDailyReportController extends BaseController<CashDailyReportController> {

	@Reference(version = "1.0.0", check = false)
	private CashDailyReportService cashDailyReportService;

	/**
	 * 
	 * @Description: 收银日报报表跳转页面
	 * @return
	 * @author taomm
	 * @date 2016年8月25日
	 */
	@RequestMapping(value = "view")
	public String view() {
		return "report/cash/cashDailyReport";
	}

	/**
	 * 
	 * @Description: 收银日报
	 * @param qo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author dongh
	 * @date 2016年8月18日
	 */
	@RequestMapping(value = "getList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<CashDailyReportVo> getList(CashDailyReportQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			LOG.debug("收银日报查询参数：{}", qo);
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);

			// 初始化默认参数
			qo = buildDefaultParams(qo);

			// 1、查询列表
			PageUtils<CashDailyReportVo> cashFlowReport = cashDailyReportService.queryPageList(qo);

			// 2、查询合计
			CashDailyReportVo vo = cashDailyReportService.queryCashDailyReportSum(qo);
			List<CashDailyReportVo> footer = new ArrayList<CashDailyReportVo>();
			footer.add(vo);
			cashFlowReport.setFooter(footer);
			return cashFlowReport;
		} catch (Exception e) {
			LOG.error("收银日报查询异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 初始化默认参数
	 * @param qo
	 * @author liwb
	 * @date 2016年9月23日
	 */
	private CashDailyReportQo buildDefaultParams(CashDailyReportQo qo) {
		if (qo.getEndTime() != null) {
			qo.setEndTime(DateUtils.getNextDay(qo.getEndTime()));
		}

		// 如果没有修改所选机构等信息，则去掉该参数
		String branchNameOrCode = qo.getBranchNameOrCode();
		if (StringUtils.isNotBlank(branchNameOrCode) && branchNameOrCode.contains("[")
				&& branchNameOrCode.contains("]")) {
			qo.setBranchNameOrCode(null);
		}

		// 如果没有修改所选收银员信息，则去掉该参数
		String cashierNameOrCode = qo.getCashierNameOrCode();
		if (StringUtils.isNotBlank(cashierNameOrCode) && cashierNameOrCode.contains("[")
				&& cashierNameOrCode.contains("]")) {
			qo.setCashierNameOrCode(null);
		}

		// 默认当前机构
		if (StringUtils.isBlank(qo.getBranchCode()) && StringUtils.isBlank(qo.getBranchNameOrCode())) {
			qo.setBranchCompleCode(getCurrBranchCompleCode());
		}
		return qo;
	}

	/**
	 * @Description: 收银日报导出
	 * @param response
	 * @param vo
	 * @author dongh
	 * @date 2016年8月25日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public String exportList(HttpServletResponse response, CashDailyReportQo qo) {
		LOG.info("收银日报导出查询参数：{}" + qo);
		try {
			// 初始化默认参数
			qo = buildDefaultParams(qo);
			// 1、列表查询
			qo.setEndCount(qo.getEndCount()-qo.getStartCount());
			List<CashDailyReportVo> list = cashDailyReportService.queryList(qo);
			// 2、查询合计
			CashDailyReportVo cashDailyReportVo = cashDailyReportService.queryCashDailyReportSum(qo);
			if (CollectionUtils.isEmpty(list)) {
				list = new ArrayList<CashDailyReportVo>();
			}
			list.add(cashDailyReportVo);
			String fileName = "收银日报" + "_" + DateUtils.getCurrSmallStr();
			String templateName = ExportExcelConstant.CASHDAILYREPORT;
			exportListForXLSX(response, list, fileName, templateName);
		} catch (Exception e) {
			LOG.error("收银日报导出异常:", e);
		}
		return null;
	}

	/**
	 * @Description: 日结报表打印
	 * @param FormNo
	 * @param request
	 * @param response
	 * @author lijy02
	 * @date 2016年9月3日
	 */
	@RequestMapping(value = "printReport", method = RequestMethod.GET)
	@ResponseBody
	public void printReport(CashDailyReportQo qo, HttpServletResponse response, HttpServletRequest request,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber) {
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(PrintConstant.PRINT_MAX_LIMIT);
			// 初始化默认参数
			qo = buildDefaultParams(qo);
			LOG.debug("日结报表打印参数：{}", qo.toString());
			PageUtils<CashDailyReportVo> cashFlowReport = cashDailyReportService.queryPageList(qo);
			List<CashDailyReportVo> list = cashFlowReport.getList();
			BigDecimal allTotal = BigDecimal.ZERO;
			for (CashDailyReportVo cashDailyReportVo : list) {
				allTotal = allTotal.add(cashDailyReportVo.getTotal());
			}
			String path = PrintConstant.CASH_DAILY_REPORT;
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("startDate", qo.getStartTime());
			map.put("endDate", qo.getEndTime());
			map.put("printName", UserUtil.getCurrentUser().getUserName());
			map.put("allTotal", allTotal);
			JasperHelper.exportmain(request, response, map, JasperHelper.PDF_TYPE, path, list, "");
		} catch (Exception e) {
			LOG.error(PrintConstant.CASH_FLOW_PRINT_ERROR, e);
		}
	}
}
