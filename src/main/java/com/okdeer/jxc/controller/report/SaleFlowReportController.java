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

import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.PrintConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.print.JasperHelper;
import com.okdeer.jxc.report.qo.SaleFlowReportQo;
import com.okdeer.jxc.report.service.SaleFlowReportService;
import com.okdeer.jxc.report.vo.SaleFlowReportVo;
import com.okdeer.jxc.utils.UserUtil;

/**
 * 
 * ClassName: SaleFlowReportController 
 * @Description: 销售流水
 * @author dongh
 * @date 2016年8月18日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("saleFlow/report")
public class SaleFlowReportController extends BaseController<SaleFlowReportController> {

	@Reference(version = "1.0.0", check = false)
	private SaleFlowReportService saleFlowReportService;

	/**
	 * 
	 * @Description: 销售流水报表跳转页面
	 * @return
	 * @author taomm
	 * @date 2016年8月25日
	 */
	@RequestMapping(value = "view")
	public String view() {
		return "report/cash/saleFlowReport";
	}

	/**
	 * 
	 * @Description: 销售流水
	 * @param qo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author dongh
	 * @date 2016年8月22日
	 */
	@RequestMapping(value = "getList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<SaleFlowReportVo> getList(SaleFlowReportQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			LOG.debug("销售流水查询参数：{}", qo);
			// 1、列表查询
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);

			// 设置默认查询条件参数
			qo = getDefultParmas(qo);
			PageUtils<SaleFlowReportVo> goodsReport = saleFlowReportService.queryList(qo);
			// 2、汇总查询
			SaleFlowReportVo saleFlowReportVo = saleFlowReportService.querySaleFlowReportSum(qo);
			// 合计加粗
			saleFlowReportVo.setBranchCode("<b>" + saleFlowReportVo.getBranchCode() + "</b>");
			List<SaleFlowReportVo> footer = new ArrayList<SaleFlowReportVo>();
			footer.add(saleFlowReportVo);
			goodsReport.setFooter(footer);
			return goodsReport;
		} catch (Exception e) {
			LOG.error("销售流水查询异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * 
	 * @Description: 收银流水导出报表
	 * @param response
	 * @param vo
	 * @return
	 * @author dongh
	 * @date 2016年8月25日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportList(HttpServletResponse response, SaleFlowReportQo qo) {

		LOG.info("UserController.exportList start ,parameter vo=" + qo);
		try {
			qo.setPageNumber(Constant.ONE);
			qo.setPageSize(Constant.MAX_EXPORT_NUM);
			// 设置默认查询条件参数
			qo = getDefultParmas(qo);
			// 1、查询列表
			List<SaleFlowReportVo> list = saleFlowReportService.querySaleList(qo);
			if(CollectionUtils.isNotEmpty(list)){
				// 2、汇总查询
				SaleFlowReportVo saleFlowReportVo = saleFlowReportService.querySaleFlowReportSum(qo);
				list.add(saleFlowReportVo);
				// 3、价格特殊处理
				list = handlePrice(list);
				String fileName = "销售流水报表" + "_" + DateUtils.getCurrSmallStr();
				String templateName = ExportExcelConstant.SALEFLOWREPORT;
				exportListForXLSX(response, list, fileName, templateName);
			}else{
				RespJson json = RespJson.error("无数据可导");
				return json;
			}
		} catch (Exception e) {
			LOG.error("UserController.exportList Exception:", e);
			RespJson json = RespJson.error("导出失败");
			return json;
		}
		return null;
	}

	// 价格特殊处理
	private List<SaleFlowReportVo> handlePrice(List<SaleFlowReportVo> exportList) {
		for (SaleFlowReportVo vo : exportList) {
			// 时间格式
			if (StringUtils.isNotBlank(vo.getTime())) {
				vo.setTime(DateUtils.formatDate(DateUtils.parse(vo.getTime(), DateUtils.DATE_FULL_STR),
						DateUtils.DATE_FULL_STR));
			}
			// 业务类型处理
//			if (StringUtils.isNotBlank(vo.getBusinessType())) {
//				vo.setBusinessType(BusinessTypeEnum.enumValueOf(vo.getBusinessType()) == null ? ""
//						: BusinessTypeEnum.enumValueOf(vo.getBusinessType()).getDesc());
//			}
			// 订单来源
//			if (StringUtils.isNotBlank(vo.getOrderType())) {
//				Integer orderType = Integer.valueOf(vo.getOrderType());
//				vo.setOrderType(OrderResourceEnum.enumValueOf(orderType) == null ? ""
//						: OrderResourceEnum.enumValueOf(orderType).getDesc());
//			}
			// 数量
			if (StringUtils.isNotBlank(vo.getNum())) {
				java.math.BigDecimal num = new java.math.BigDecimal(vo.getNum()).setScale(2,
						java.math.BigDecimal.ROUND_HALF_UP);
				vo.setNum(String.valueOf(num));
			}
			// 销售价
			if (StringUtils.isNotBlank(vo.getSalePrice())) {
				java.math.BigDecimal salePrice = new java.math.BigDecimal(vo.getSalePrice()).setScale(2,
						java.math.BigDecimal.ROUND_HALF_UP);
				vo.setSalePrice(String.valueOf(salePrice));
			}
			// 销售金额
			if (StringUtils.isNotBlank(vo.getSaleAmount())) {
				java.math.BigDecimal saleAmount = new java.math.BigDecimal(vo.getSaleAmount()).setScale(2,
						java.math.BigDecimal.ROUND_HALF_UP);
				vo.setSaleAmount(String.valueOf(saleAmount));
			}
			// 原价
			if (StringUtils.isNotBlank(vo.getOriginalPrice())) {
				java.math.BigDecimal originalPrice = new java.math.BigDecimal(vo.getOriginalPrice()).setScale(2,
						java.math.BigDecimal.ROUND_HALF_UP);
				vo.setOriginalPrice(String.valueOf(originalPrice));
			}
			// 原价金额
			if (StringUtils.isNotBlank(vo.getTotalAmount())) {
				java.math.BigDecimal totalAmount = new java.math.BigDecimal(vo.getTotalAmount()).setScale(2,
						java.math.BigDecimal.ROUND_HALF_UP);
				vo.setAmount(String.valueOf(totalAmount));
			}
			// 折扣
			if (StringUtils.isNotBlank(vo.getDiscount())) {
				java.math.BigDecimal discount = new java.math.BigDecimal(vo.getDiscount()).setScale(2,
						java.math.BigDecimal.ROUND_HALF_UP);
				vo.setDiscount(String.valueOf(discount));
			}
			// 进价
			if (StringUtils.isNotBlank(vo.getPurchasePrice())) {
				java.math.BigDecimal purchasePrice = new java.math.BigDecimal(vo.getPurchasePrice()).setScale(2,
						java.math.BigDecimal.ROUND_HALF_UP);
				vo.setPurchasePrice(String.valueOf(purchasePrice));
			}
			// 进货金额
			if (StringUtils.isNotBlank(vo.getPurchaseAmount())) {
				java.math.BigDecimal purchaseAmount = new java.math.BigDecimal(vo.getPurchaseAmount()).setScale(2,
						java.math.BigDecimal.ROUND_HALF_UP);
				vo.setPurchaseAmount(String.valueOf(purchaseAmount));
			}
		}
		return exportList;
	}

	// start by lijy02
	/**
	 * @Description: 收银对账报表打印
	 * @param qo
	 * @param response
	 * @param request
	 * @param pageNumber
	 * @author lijy02
	 * @date 2016年9月6日
	 */
	@RequestMapping(value = "printReport", method = RequestMethod.GET)
	@ResponseBody
	public String printReport(SaleFlowReportQo qo, HttpServletResponse response, HttpServletRequest request) {
		try {
			// 设置默认查询条件参数
			qo = getDefultParmas(qo);
			if(saleFlowReportService.querySaleListCount(qo)>PrintConstant.PRINT_MAX_ROW){
				return "<script>alert('打印最大行数不能超过3000行');top.closeTab();</script>";
			}
			
			List<SaleFlowReportVo> list = saleFlowReportService.querySaleList(qo);
			if(!CollectionUtils.isEmpty(list)&&list.size()>PrintConstant.PRINT_MAX_ROW){
				return "<script>alert('打印最大行数不能超过3000行');top.closeTab();</script>";
			}
			String path = PrintConstant.SALE_FLOW_REPORT;

			Map<String, Object> map = new HashMap<String, Object>();
			map.put("startDate", qo.getStartTime());
			map.put("endDate", qo.getEndTime());
			map.put("printName", UserUtil.getCurrentUser().getUserName());
			JasperHelper.exportmain(request, response, map, JasperHelper.PDF_TYPE, path, list, "");
		} catch (Exception e) {
			LOG.error(PrintConstant.SALE_FLOW_PRINT_ERROR, e);
		}
		return null;
	}
	// end by lijy02

	// 封装请求参数
	private SaleFlowReportQo getDefultParmas(SaleFlowReportQo qo) {
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

		return qo;
	}
}
