/** 
 *@Project: okdeer-jxc-web 
 *@Author: zuowm
 *@Date: 2017年7月13日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */
package com.okdeer.jxc.controller.report.sales;

import java.util.Calendar;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.retail.facade.report.entity.PeriodSaleContrastResult;
import com.okdeer.retail.facade.report.facade.PeriodSaleContrastFacade;
import com.okdeer.retail.facade.report.qo.PeriodSaleContrastQo;

/**
 * ClassName: GoodsSaleContrastController 
 * @Description: 货类销售对比分析controller
 * @author zuowm
 * @date 2017年7月13日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/report/goodsSaleContrast")
public class GoodsSaleContrastController extends BaseController<GoodsSaleContrastController> {

	@Reference(version = "1.0.0", check = false)
	PeriodSaleContrastFacade periodSaleContrastFacade;

	/**
	 * @Description: 跳转页面
	 * @param model
	 * @return
	 * @author zuowm
	 * @date 2017年7月13日
	 */
	@RequestMapping
	public String index() {
		LOG.info("GoodsSaleContrastController start....");
		return "report/sales/goodsSaleContrast";
	}

	/**
	 * @Description: 货类销售对比分析查询
	 * @param qo 查询条件
	 * @return 查询结果
	 * @author zuowm
	 * @date 2017年7月15日
	 */
	@RequestMapping("/list")
	@ResponseBody
	public PageUtils<PeriodSaleContrastResult> list(PeriodSaleContrastQo qo) {
		LOG.info("GoodsSaleContrastController.list start....");
		try {
			handlerParam(qo);

			List<PeriodSaleContrastResult> list = periodSaleContrastFacade.queryGoodsSaleContrastList(qo);
			PageUtils<PeriodSaleContrastResult> page = new PageUtils<PeriodSaleContrastResult>(list);
			LOG.debug("货类销售对比分析查询结果：{}", page);
			return page;
		} catch (Exception e) {
			LOG.debug("货类销售对比分析查询失败：{}", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 导出时段销售对比分析查询
	 * @param qo 查询条件
	 * @return 查询结果
	 * @author zuowm
	 * @date 2017年7月15日
	 */
	@RequestMapping("/exportList")
	@ResponseBody
	public RespJson exportList(HttpServletResponse response, PeriodSaleContrastQo qo) {
		LOG.info("GoodsSaleContrastController.exportList start....");
		try {
			handlerParam(qo);

			List<PeriodSaleContrastResult> list = periodSaleContrastFacade.queryGoodsSaleContrastList(qo);
			if (CollectionUtils.isNotEmpty(list)) {
				String fileName = "货类销售对比分析" + "_" + DateUtils.getCurrSmallStr();

				String templateName = ExportExcelConstant.GOODS_SALE_CONTRAST;
				exportListForXLSX(response, list, fileName, templateName);
			} else {
				RespJson json = RespJson.error("无数据可导");
				return json;
			}
		} catch (Exception e) {
			LOG.debug("货类销售对比分析导出失败：{}", e);
			RespJson json = RespJson.error("导出失败");
			return json;
		}
		return null;
	}

	/**
	 * @Description: 获取查询参数
	 * @param qo 查询条件
	 * @author zuowm
	 * @date 2017年7月15日
	 */
	private void handlerParam(PeriodSaleContrastQo qo) {
		LOG.debug("货类销售对比分析查询条件：{}", qo);
		if (StringUtils.isEmpty(qo.getBranchCompleCode())) {
			qo.setBranchCompleCode(this.getCurrBranchCompleCode());
		}
		if (StringUtils.isEmpty(qo.getYearStr())) {
			Calendar ca = Calendar.getInstance();
			qo.setYearStr(ca.get(Calendar.YEAR) + "");
		}
	}
}
