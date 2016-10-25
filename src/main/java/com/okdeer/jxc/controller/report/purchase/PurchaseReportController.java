/** 
 *@Project: okdeer-jxc-web 
 *@Author: lijy02
 *@Date: 2016年10月25日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report.purchase;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.purchase.po.PurchaseReportPo;
import com.okdeer.jxc.form.purchase.qo.FormQueryQo;
import com.okdeer.jxc.form.purchase.service.PurchaseReportService;


@Controller
@RequestMapping("report/purchase")
public class PurchaseReportController extends
		BaseController<PurchaseReportController> {

	/**
	 * @Fields purchaseReportService : 采购报表service
	 */
	@Reference(version = "1.0.0", check = false)
	private PurchaseReportService purchaseReportService;

	/**
	 * @Description: 采购报表明细
	 * @return
	 * @author lijy02
	 * @date 2016年10月25日
	 */
	@RequestMapping("/detail")
	public String view() {
		return "report/purchase/details";
	}

	/**
	 * @Description: 采购明细查询
	 * @param qo 采购报名查询字段类
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author lijy02
	 * @date 2016年10月25日
	 */
	@RequestMapping(value = "getPurReportDetail", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<PurchaseReportPo> getList(
			FormQueryQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			LOG.debug("采购明细查询：{}", qo);
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);

			PageUtils<PurchaseReportPo> list = purchaseReportService
					.getPurReportDetail(qo);

			// 2、查询合计
			PurchaseReportPo vo = purchaseReportService
					.getPurReportDetailSum(qo);
			List<PurchaseReportPo> footer = new ArrayList<PurchaseReportPo>();
			footer.add(vo);
			list.setFooter(footer);
			return list;

		} catch (Exception e) {
			LOG.error("采购明细查询:", e);
		}
		return PageUtils.emptyPage();
	}
	
	
	/**
	 * @Description: 采购单明细导出
	 * @param response
	 * @param qo
	 * @author lijy02
	 * @date 2016年10月25日
	 */
	@RequestMapping(value = "exportData")
	public void exportData(HttpServletResponse response,FormQueryQo qo) {
		LOG.info("采购单明细导出:{}" + qo);
		try {
			PageUtils<PurchaseReportPo> result = purchaseReportService
					.getPurReportDetail(qo);
			List<PurchaseReportPo> exportList =result.getList();
			// 导出文件名称，不包括后缀名
			String fileName = "采购明细表" + "_" + DateUtils.getCurrSmallStr();
			// 模板名称，包括后缀名
			String templateName = ExportExcelConstant.PURCHASE_DETAIL_REPORT;
			// 导出Excel
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("GoodsPriceAdjustController:exportList:", e);
		}
	}
}
