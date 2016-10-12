/** 
 *@Project: okdeer-jxc-web 
 *@Author: taomm
 *@Date: 2016年8月15日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report;

import java.util.ArrayList;
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
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.PrintConstant;
import com.okdeer.jxc.common.enums.BusinessTypeEnum;
import com.okdeer.jxc.common.enums.OrderResourceEnum;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.print.JasperHelper;
import com.okdeer.jxc.report.qo.CashFlowReportQo;
import com.okdeer.jxc.report.service.CashFlowReportService;
import com.okdeer.jxc.report.vo.CashFlowReportVo;
import com.okdeer.jxc.utils.UserUtil;

/**
 * 	
 * ClassName: CashFlowReportController 
 * @Description: 收银流水查询
 * @author dongh
 * @date 2016年8月17日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * *   商业管理系统1.0.0	2016年8月22日                  dongh              创建收银Controller
 *     商业管理系统1.0.0	2016年8月31日                  zhongy             添加导出报表条件查询
 *      商业管理系统1.0.0	2016年9月05日                  lijy02                                       打印报表
 */
@Controller
@RequestMapping("cashFlow/report")
public class CashFlowReportController extends BaseController<CashFlowReportController> {

	@Reference(version = "1.0.0", check = false)
	private CashFlowReportService cashFlowReportService;

	/**
	 * @Description: 收银流水报表跳转页面
	 * @return
	 * @author taomm
	 * @date 2016年8月25日
	 */
	@RequestMapping(value = "view")
	public String view() {
		return "report/cash/cashFlowReport";
	}

	/**
	 * 
	 * @Description: 收银流水查询
	 * @param qo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author dongh
	 * @date 2016年8月18日
	 */
	@RequestMapping(value = "getList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<CashFlowReportVo> getList(CashFlowReportQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			LOG.debug("收银流水查询参数：{}", qo);
			// 1、查询列表数据
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			// 2、封装请求参数
			qo = getParmas(qo);

			// 3、价格保留两位小数特殊处理
			PageUtils<CashFlowReportVo> page = cashFlowReportService.queryList(qo);
			page.setList(handlePrice(page.getList()));

			// 4、查询汇总
			CashFlowReportVo cashFlowReportVo = cashFlowReportService.queryCashFlowReportSum(qo);
			cashFlowReportVo.setBranchCode("<b>" + cashFlowReportVo.getBranchCode() + "</b>");
			List<CashFlowReportVo> footer = new ArrayList<CashFlowReportVo>();
			footer.add(cashFlowReportVo);
			// 5、合计价格保留两位小数特殊处理
			footer = handlePrice(footer);
			page.setFooter(footer);
			return page;
		} catch (Exception e) {
			LOG.error("收银流水查询异常:", e);
		}
		return PageUtils.emptyPage();
	}

	// 封装请求参数
	private CashFlowReportQo getParmas(CashFlowReportQo qo) {
		
		if (qo.getEndTime() != null) {
			qo.setEndTime(DateUtils.getNextDay(qo.getEndTime()));
		}

		// 如果没有修改所选机构等信息，则去掉该参数
		String branchNameOrCode = qo.getBranchNameOrCode();
		if (StringUtils.isNotBlank(branchNameOrCode) && branchNameOrCode.contains("[")
				&& branchNameOrCode.contains("]")) {
			qo.setBranchNameOrCode(null);
		}
		// 默认当前机构
		if (StringUtils.isBlank(qo.getBranchCode()) && StringUtils.isBlank(qo.getBranchNameOrCode())) {
			qo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
		}
		// 如果没有修改所选收银员信息，则去掉该参数
		String cashierNameOrCode = qo.getCashierNameOrCode();
		if (StringUtils.isNotBlank(cashierNameOrCode) && cashierNameOrCode.contains("[")
				&& cashierNameOrCode.contains("]")) {
			qo.setCashierNameOrCode(null);
		}

		return qo;
	}

	/**
	 * 
	 * @Description: 收银流水导出
	 * @param response
	 * @param vo
	 * @return
	 * @author dongh
	 * @date 2016年8月25日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public String exportList(HttpServletResponse response, CashFlowReportQo qo) {

		LOG.info("UserController.exportList start ,parameter vo=" + qo);
		try {
			qo.setPageNumber(Constant.ONE);
			qo.setPageSize(Constant.MAX_EXPORT_NUM);
			// 2、封装请求参数
			qo = getParmas(qo);

			PageUtils<CashFlowReportVo> exportList = cashFlowReportService.queryList(qo);

			// 3、查询汇总
			CashFlowReportVo cashFlowReportVo = cashFlowReportService.queryCashFlowReportSum(qo);
			exportList.getList().add(cashFlowReportVo);
			// 4、导出数据特殊处理
			List<CashFlowReportVo> list = handleCashFlowReport(exportList.getList());

			String fileName = "收银流水报表" + "_" + DateUtils.getCurrSmallStr();
			String templateName = ExportExcelConstant.CASHFLOWREPORT;
			exportListForXLSX(response, list, fileName, templateName);
		} catch (Exception e) {
			LOG.error("UserController.exportList Exception:", e);
		}
		return null;
	}

	/**
	 * @Description: 收银流水打印
	 * @param qo
	 * @param response
	 * @param request
	 * @param pageNumber
	 * @param pageSize
	 * @author lijy02
	 * @date 2016年9月5日
	 */
	@RequestMapping(value = "printReport", method = RequestMethod.GET)
	@ResponseBody
	public void printReport(CashFlowReportQo qo, HttpServletResponse response, HttpServletRequest request,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			// 2、封装请求参数
			qo = getParmas(qo);
			LOG.debug("收银流水打印参数：{}", qo.toString());
			PageUtils<CashFlowReportVo> cashFlowReport = cashFlowReportService.queryList(qo);
			List<CashFlowReportVo> list = cashFlowReport.getList();
			String path = PrintConstant.CASH_FLOW_REPORT;
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("startDate", qo.getStartTime());
			map.put("endDate", qo.getEndTime());
			map.put("printName", UserUtil.getCurrentUser().getUserName());
			JasperHelper.exportmain(request, response, map, JasperHelper.PDF_TYPE, path, list, "");

		} catch (Exception e) {
			LOG.error(PrintConstant.CASH_DAILY_PRINT_ERROR, e);
		}
	}

	// 价格保留两位特殊处理
	private List<CashFlowReportVo> handlePrice(List<CashFlowReportVo> exportList) {
		for (CashFlowReportVo vo : exportList) {
			/*if (StringUtils.isBlank(vo.getSaleAmount())) {
				vo.setSaleAmount("0.00");
			}*/
			if (StringUtils.isBlank(vo.getPayAmount())) {
				vo.setPayAmount("0.00");
			}
			// 销售金额
			/*if (StringUtils.isNotBlank(vo.getSaleAmount())) {
				java.math.BigDecimal saleAmount = new java.math.BigDecimal(vo.getSaleAmount()).setScale(2,
						java.math.BigDecimal.ROUND_HALF_UP);
				vo.setSaleAmount(String.valueOf(saleAmount));
			}*/
			// 付款金额
			if (StringUtils.isNotBlank(vo.getPayAmount())) {
				java.math.BigDecimal payAmount = new java.math.BigDecimal(vo.getPayAmount()).setScale(2,
						java.math.BigDecimal.ROUND_HALF_UP);
				vo.setPayAmount(String.valueOf(payAmount));
			}
		}
		return exportList;
	}

	// 导出数据特殊处理
	private List<CashFlowReportVo> handleCashFlowReport(List<CashFlowReportVo> exportList) {
		for (CashFlowReportVo vo : exportList) {
			if (StringUtils.isBlank(vo.getSaleAmount())) {
				vo.setSaleAmount("0.00");
			}
			if (StringUtils.isBlank(vo.getPayAmount())) {
				vo.setPayAmount("0.00");
			}
			// 销售金额
			if (StringUtils.isNotBlank(vo.getSaleAmount())) {
				java.math.BigDecimal saleAmount = new java.math.BigDecimal(vo.getSaleAmount()).setScale(2,
						java.math.BigDecimal.ROUND_HALF_UP);
				vo.setSaleAmount(String.valueOf(saleAmount));
			}
			// 付款金额
			if (StringUtils.isNotBlank(vo.getPayAmount())) {
				java.math.BigDecimal payAmount = new java.math.BigDecimal(vo.getPayAmount()).setScale(2,
						java.math.BigDecimal.ROUND_HALF_UP);
				vo.setPayAmount(String.valueOf(payAmount));
			}
			// 销售时间
			if (StringUtils.isNotBlank(vo.getSaleTime())) {
				String saleTime = DateUtils.formatDate(DateUtils.parse(vo.getSaleTime(), DateUtils.DATE_FULL_STR),
						DateUtils.DATE_FULL_STR);
				vo.setSaleTime(saleTime);
			}
			// 业务类型
			if (StringUtils.isNotBlank(vo.getBusinessType())) {
				String code = vo.getBusinessType();
				String businessType = BusinessTypeEnum.enumValueOf(code) == null ? ""
						: BusinessTypeEnum.enumValueOf(code).getName();
				vo.setBusinessType(businessType);
			}
			// 订单类型
			if (StringUtils.isNotBlank(vo.getOrderType())) {
				String code = vo.getOrderType();
				String orderType = OrderResourceEnum.enumValueOf(Integer.valueOf(code)) == null ? ""
						: OrderResourceEnum.enumValueOf(Integer.valueOf(code)).getName();
				vo.setOrderType(orderType);
			}
		}
		return exportList;
	}
}
