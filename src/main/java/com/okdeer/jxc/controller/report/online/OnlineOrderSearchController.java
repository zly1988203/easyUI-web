/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年6月2日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report.online;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.BigDecimalUtils;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.report.online.po.OnlineOrderGoodsPo;
import com.okdeer.jxc.report.online.po.OnlineOrderSearchListPo;
import com.okdeer.jxc.report.online.qo.OnlineOrderSearchQo;
import com.okdeer.jxc.report.online.service.OnlineOrderSearchService;

/**
 * ClassName: OnlineOrderSearchController 
 * @Description: 线上订单查询报表Controller
 * @author liwb
 * @date 2017年6月2日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@RestController
@RequestMapping("report/onlineOrder")
public class OnlineOrderSearchController extends BaseController<OnlineOrderSearchController> {

	@Reference(version = "1.0.0", check = false)
	private OnlineOrderSearchService onlineOrderSearchService;

	@RequestMapping(value = "toManager")
	public ModelAndView toManager() {
		return new ModelAndView("report/online/onlineOrderSearchList");
	}

	@RequestMapping(value = "getOnlineOrderList", method = RequestMethod.POST)
	public PageUtils<OnlineOrderSearchListPo> getOnlineOrderList(OnlineOrderSearchQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		qo.setPageNumber(pageNumber);
		qo.setPageSize(pageSize);

		// 组装查询参数
		buildSearchParams(qo);

		LOG.debug("线上订单查询条件：{}", qo);

		try {

			return onlineOrderSearchService.getOnlineOrderListForPage(qo);
		} catch (Exception e) {
			LOG.error("线上订单查询异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 组装查询参数
	 * @param qo
	 * @author liwb
	 * @date 2017年6月2日
	 */
	private void buildSearchParams(OnlineOrderSearchQo qo) {

		// 默认当前机构
		if (StringUtils.isBlank(qo.getBranchCompleCode())) {
			qo.setBranchCompleCode(super.getCurrBranchCompleCode());
		}

		// 日期+1
		qo.setEndTime(DateUtils.getDayAfter(qo.getEndTime()));
	}

	@RequestMapping(value = "exportHandel", method = RequestMethod.POST)
	public RespJson exportHandel(OnlineOrderSearchQo qo, HttpServletResponse response) {
		try {

			buildSearchParams(qo);

			LOG.debug("线上订单查询导出条件：{}", qo);

			List<OnlineOrderSearchListPo> list = onlineOrderSearchService.getOnlineOrderListForExcel(qo);

			RespJson respJson = super.validateExportList(list);
			if (!respJson.isSuccess()) {
				LOG.info(respJson.getMessage());
				return respJson;
			}

			// 导出文件名称，不包括后缀名
			String fileName = "线上订单查询列表_" + DateUtils.getSmallStr(qo.getStartTime()) + "_"
					+ DateUtils.getSmallStr(qo.getEndTime());

			// 模板名称，包括后缀名
			String templateName = ExportExcelConstant.ONLINE_ORDER_SEARCH_LIST_EXPORT_TEMPLATE;

			// 导出Excel
			exportListForXLSX(response, list, fileName, templateName);
			return null;

		} catch (Exception e) {
			LOG.error("导出线上订单查询失败", e);
		}
		return RespJson.error();
	}

	@RequestMapping(value = "view")
	public ModelAndView view(String orderId) {

		if (StringUtils.isBlank(orderId)) {
			return super.toErrorPage("订单ID为空");
		}

		ModelAndView mv = new ModelAndView("report/online/onlineOrderSearchView");

		try {
			OnlineOrderSearchListPo po = onlineOrderSearchService.getOnlineOrderDetailByOrderId(orderId);
			mv.addObject("po", po);
		} catch (Exception e) {
			LOG.error("查看线上订单详情错误：", e);
		}

		return mv;
	}

	@RequestMapping(value = "getGoodsListByOrderId", method = RequestMethod.POST)
	public PageUtils<OnlineOrderGoodsPo> getGoodsListByOrderId(String orderId) {

		LOG.debug("查询线上订单商品列表，订单Id：{}", orderId);

		try {

			return onlineOrderSearchService.getGoodsListForPage(orderId);
		} catch (Exception e) {
			LOG.error("查询线上订单商品列表异常:", e);
		}
		return PageUtils.emptyPage();
	}

	@RequestMapping(value = "exportGoodsList")
	public RespJson exportGoodsList(String orderId, HttpServletResponse response) {
		try {

			LOG.debug("导出线上订单商品列表，订单Id：{}", orderId);

			List<OnlineOrderGoodsPo> list = onlineOrderSearchService.getGoodsListByOrderId(orderId);

			RespJson respJson = super.validateExportList(list);
			if (!respJson.isSuccess()) {
				LOG.info(respJson.getMessage());
				return respJson;
			}

			BigDecimalUtils.toFormatBigDecimal(list, 4);

			// 导出文件名称，不包括后缀名
			String fileName = "线上订单商品信息_" + DateUtils.getCurrSmallStr();

			// 模板名称，包括后缀名
			String templateName = ExportExcelConstant.ONLINE_ORDER_GOODS_DETAIL_EXPORT_TEMPLATE;

			// 导出Excel
			exportListForXLSX(response, list, fileName, templateName);
			return null;

		} catch (Exception e) {
			LOG.error("导出线上订单商品信息失败", e);
		}
		return RespJson.error();
	}

}
