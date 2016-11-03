/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年10月25日
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.controller.BasePrintController;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.report.qo.TradeOrderCountQo;
import com.okdeer.jxc.report.service.TradeOrderCountServiceApi;
import com.okdeer.jxc.report.vo.TradeOrderCountVo;

/**
 * ClassName: TradeOrderCountController 
 * @Description: 店铺销售排名
 * @author zhangchm
 * @date 2016年10月25日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 零售管理系统V1.0.2	  2016年10月25日                  zhangchm            配送报表Controller
 */
@Controller
@RequestMapping("bill/tradeOrderCount")
public class TradeOrderCountController extends BasePrintController<TradeOrderCountController, TradeOrderCountVo> {

	@Reference(version = "1.0.0", check = false)
	TradeOrderCountServiceApi tradeOrderCountServiceApi;

	@Reference(version = "1.0.0", check = false)
	BranchesServiceApi branchesServiceApi;

	/**
	 * @Description: 跳转店铺销售排名页面
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2016年10月25日
	 */
	@RequestMapping(value = "view")
	public String view(Model model) {
		// SysUser user = getCurrentUser();
		// Branches branchesGrow = branchesServiceApi.getBranchInfoById(user.getBranchId());
		// model.addAttribute("branchesGrow", branchesGrow);
		return "report/order/tradeOrderCount";
	}

	/**
	 * @Description: 店铺销售排名列表
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author zhangchm
	 * @date 2016年10月27日
	 */
	@RequestMapping(value = "getTradeOrderCounts", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<TradeOrderCountVo> getTradeOrderCounts(TradeOrderCountQo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		try {
			if (vo.getEndTime() != null) {
				Date time = DateUtils.getNextDay(vo.getEndTime());
				vo.setEndTime(time);
			}
			if (StringUtils.isNullOrEmpty(vo.getBranchId())) {
				vo.setBranchId(getCurrBranchId());
			}
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			PageUtils<TradeOrderCountVo> tradeOrderCountVos = tradeOrderCountServiceApi.queryLists(vo);
			LOG.info(LogConstant.PAGE, tradeOrderCountVos.toString());
			return tradeOrderCountVos;
		} catch (Exception e) {
			LOG.error("店铺销售排名列表查询出现异常:{}", e);
		}
		return null;
	}

	/**
	 * @Description: 店铺销售排名合计
	 * @param vo
	 * @return
	 * @author zhangchm
	 * @date 2016年10月27日
	 */
	@RequestMapping(value = "sum", method = RequestMethod.POST)
	@ResponseBody
	public RespJson sum(TradeOrderCountQo vo) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		RespJson respJson = RespJson.success();
		try {
			if (vo.getEndTime() != null) {
				Date time = DateUtils.getNextDay(vo.getEndTime());
				vo.setEndTime(time);
			}
			if (StringUtils.isNullOrEmpty(vo.getBranchId())) {
				vo.setBranchId(getCurrBranchId());
			}
			TradeOrderCountVo tradeOrderCountVo = tradeOrderCountServiceApi.queryTradeOrderCountSum(vo);
			if (tradeOrderCountVo != null) {
				LOG.info(LogConstant.PAGE, tradeOrderCountVo.toString());
				respJson.put("sumAmount", tradeOrderCountVo.getSumAmount());
				respJson.put("sumSaleNum", tradeOrderCountVo.getSumSaleNum());
				respJson.put("sumNum", tradeOrderCountVo.getSumNum());
				respJson.put("sumLineAmount", tradeOrderCountVo.getSumLineAmount());
				respJson.put("sumLineSaleNum", tradeOrderCountVo.getSumLineSaleNum());
			}
		} catch (Exception e) {
			LOG.error("店铺销售排名合计出现异常:{}", e);
			respJson = RespJson.error("店铺销售排名合计失败！");
		}

		return respJson;
	}

	/**
	 * @Description: 导出店铺销售排名列表
	 * @param formId 单号
	 * @return
	 * @author zhangchm
	 * @date 2016年10月25日
	 */
	@RequestMapping(value = "exportList")
	public void exportList(HttpServletResponse response, TradeOrderCountQo vo) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		try {
			if (vo.getEndTime() != null) {
				Date time = DateUtils.getNextDay(vo.getEndTime());
				vo.setEndTime(time);
			}
			if (StringUtils.isNullOrEmpty(vo.getBranchId())) {
				vo.setBranchId(getCurrBranchId());
			}
			List<TradeOrderCountVo> exportList = tradeOrderCountServiceApi.queryTradeOrderCount(vo);

			TradeOrderCountVo tradeOrderCountVo = tradeOrderCountServiceApi.queryTradeOrderCountSum(vo);
			tradeOrderCountVo.setBranchName("合计：");
			tradeOrderCountVo.setTotalAmount(tradeOrderCountVo.getSumAmount());
			tradeOrderCountVo.setTotalSaleNum(tradeOrderCountVo.getSumSaleNum());
			tradeOrderCountVo.setTotalNum(tradeOrderCountVo.getSumNum());
			tradeOrderCountVo.setTotalLineAmount(tradeOrderCountVo.getSumLineAmount());
			tradeOrderCountVo.setTotalLineSaleNum(tradeOrderCountVo.getSumLineSaleNum());

			exportList.add(tradeOrderCountVo);

			String fileName = "店铺销售排名";
			String templateName = ExportExcelConstant.TRADE_ORDER_COUNT_REPORT;
			// 导出Excel
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("TradeOrderCountController:exportList:", e);
		}
	}
	@Override
	protected Map<String, Object> getPrintReplace(String formNo) {
		return null;
	}

	@Override
	protected List<TradeOrderCountVo> getPrintDetail(String formNo) {
		return null;
	}

}
