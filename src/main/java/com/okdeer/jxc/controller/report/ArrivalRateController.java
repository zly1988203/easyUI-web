/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhongy
 *@Date: 2016年10月25日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.entity.PurchaseForm;
import com.okdeer.jxc.report.qo.ArrivalRateQo;
import com.okdeer.jxc.report.service.ArrivalRateServiceApi;
import com.okdeer.jxc.report.vo.ArrivalRateVo;

/**
 * ClassName: ArrivalRateAnalysisController 
 * @author zhongy
 * @date 2016年10月25日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *		重构2.0			2016-10-25			zhongy			  到货率分析controller
 */

@Controller
@RequestMapping("report/purchase")
public class ArrivalRateController extends BaseController<PurchaseForm>{
	
	
	@Reference(version = "1.0.0", check = false)
	private ArrivalRateServiceApi arrivalRateService;
	
	/**
	 * 跳转到货率分析页面
	 * @return
	 * @author zhongy
	 * @date 2016年10月25日
	 */
	@RequestMapping(value = "arrivalRate")
	public String arrivalRate() {
		return "report/purchase/arrivalRateList";
	}
	
	
	/**
	 * @Description: 到货率分析
	 * @param qo 请求参数
	 * @param pageNumber
	 * @param pageSize
	 * @return 返回查询结果
	 * @author zhongy
	 * @date 2016年10月25日
	 */
	@RequestMapping(value = "getList")
	@ResponseBody
	public PageUtils<ArrivalRateVo> getList(ArrivalRateQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		    LOG.debug("到货率分析查询参数{}", qo);
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			qo = buildDefaultParams(qo);
			//1、列表查询
			PageUtils<ArrivalRateVo> arrivalRateReport = arrivalRateService.findArrivalRate(qo);
			
			//2、汇总查询
			List<ArrivalRateVo> footer = arrivalRateService.findArrivalRateSum(qo);
			arrivalRateReport.setFooter(footer);
			return arrivalRateReport;
		} catch (Exception e) {
			LOG.error("到货率分析查询异常:", e);
		}
		return PageUtils.emptyPage();
	}
	
	
	/**
	 * 
	 * @Description: 采购收获率
	 * @param response
	 * @param vo
	 * @return
	 * @author zhongy
	 * @date 2016年10月26日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public String exportList(HttpServletResponse response, ArrivalRateQo qo) {

		LOG.info("UserController.exportList start ,parameter vo=" + qo);
		try {
			qo.setPageNumber(Constant.ONE);
			qo.setPageSize(Constant.MAX_EXPORT_NUM);
			qo = buildDefaultParams(qo);
			//1、列表查询
			List<ArrivalRateVo> list = new ArrayList<ArrivalRateVo>();
			PageUtils<ArrivalRateVo> exportList = arrivalRateService.findArrivalRate(qo);
			
			//2、汇总查询
			List<ArrivalRateVo> footer = arrivalRateService.findArrivalRateSum(qo);
			list = exportList.getList();
			list.addAll(footer);
			list = handlePrice(list);
			String fileName = "采购到货率" + "_" + DateUtils.getCurrSmallStr();
			String templateName = ExportExcelConstant.ARRIVAL_RATE_FORMNO_REPORT;
			if(qo.getType()==Constant.ZERO){
				templateName = ExportExcelConstant.ARRIVAL_RATE_FORMNO_REPORT;
			}else if(qo.getType()==Constant.ONE){
				templateName = ExportExcelConstant.ARRIVAL_RATE_SUPPLIER_REPORT;
			}else if(qo.getType()==Constant.TWO){
				templateName = ExportExcelConstant.ARRIVAL_RATE_CATEGORY_REPORT;
			}else if(qo.getType()==Constant.THREE){
				templateName = ExportExcelConstant.ARRIVAL_RATE_GOODS_REPORT;
			}
			exportListForXLSX(response, list, fileName, templateName);
		} catch (Exception e) {
			LOG.error("UserController.exportList Exception:", e);
		}
		return null;
	}
	
	// 数量特殊处理
	private List<ArrivalRateVo> handlePrice(List<ArrivalRateVo> exportList) {
		for (ArrivalRateVo vo : exportList) {
			// 采购数量
			if (vo.getPurchaseNum() !=null) {
				BigDecimal purchaseNum = vo.getPurchaseNum().setScale(4,BigDecimal.ROUND_HALF_UP);
				vo.setPurchaseNum(purchaseNum);
			}
			// 采购金额
			if (vo.getPurchaseAmount() !=null) {
				BigDecimal purchaseAmount = vo.getPurchaseAmount().setScale(4,BigDecimal.ROUND_HALF_UP);
				vo.setPurchaseAmount(purchaseAmount);
			}
			// 收货数量
			if (vo.getReceiptNum() !=null) {
				BigDecimal receiptNum = vo.getReceiptNum().setScale(4,BigDecimal.ROUND_HALF_UP);
				vo.setReceiptNum(receiptNum);
			}
			// 收货金额
			if (vo.getReceiptAmount() !=null) {
				BigDecimal receiptAmount = vo.getReceiptAmount().setScale(4,BigDecimal.ROUND_HALF_UP);
				vo.setReceiptAmount(receiptAmount);
			}
			// 未收货数量
			if (vo.getNotQuantity() !=null) {
				BigDecimal notQuantity = vo.getNotQuantity().setScale(4,BigDecimal.ROUND_HALF_UP);
				vo.setNotQuantity(notQuantity);
			}
			// 未收货金额
			if (vo.getNotAmount() !=null) {
				BigDecimal notAmount =vo.getNotAmount().setScale(4,BigDecimal.ROUND_HALF_UP);
				vo.setNotAmount(notAmount);
			}
		}
		return exportList;
	}
	
	/**
	 * @Description: 初始化默认参数
	 * @param qo
	 * @author liwb
	 * @date 2016年9月23日
	 */
	private ArrivalRateQo buildDefaultParams(ArrivalRateQo qo) {
		// 如果没有修改所选机构等信息，则去掉该参数
		String branchNameOrCode = qo.getBranchNameOrCode();
		if (StringUtils.isNotBlank(branchNameOrCode) && branchNameOrCode.contains("[")
				&& branchNameOrCode.contains("]")) {
			qo.setBranchNameOrCode(null);
		}

		if (qo.getEndTime() != null) {
			qo.setEndTime(DateUtils.getNextDay(qo.getEndTime()));
		}

		// 默认当前机构
		if (StringUtils.isBlank(qo.getBranchCode()) && StringUtils.isBlank(qo.getBranchNameOrCode())) {
			qo.setBranchCompleCode(getCurrBranchCompleCode());
		}
		if(qo.getArrivalRate()!=null){
			qo.setArrivalRate(qo.getArrivalRate().multiply(new BigDecimal(100)));
		}
		return qo;
	}
	
}
