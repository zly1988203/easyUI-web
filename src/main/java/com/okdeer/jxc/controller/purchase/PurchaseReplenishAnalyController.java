/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年3月17日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.purchase;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.purchase.po.PurchaseGuideGoodsPo;
import com.okdeer.jxc.form.purchase.qo.PurchaseReplenishAnalyQo;
import com.okdeer.jxc.form.purchase.service.PurchaseReplenishAnalyService;

/**
 * ClassName: PurchaseReplenishAnalyController 
 * @Description: 门店补货分析报表Controller
 * @author liwb
 * @date 2017年3月17日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("purchaseReplenishAnaly")
public class PurchaseReplenishAnalyController extends BaseController<PurchaseReplenishAnalyController> {

	@Reference(version = "1.0.0", check = false)
	private PurchaseReplenishAnalyService purchaseReplenishAnalyService;

	/**
	 * @Description: 跳转门店补货分析报表页面
	 * @return
	 * @author liwb
	 * @date 2017年3月18日
	 */
	@RequestMapping(value = "toReportList")
	public String toReportList() {
		return "form/purchase/report/purchaseReplenishAnaly";
	}

	/**
	 * @Description: 根据条件获取分页数据
	 * @param qo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author liwb
	 * @date 2017年3月18日
	 */
	@RequestMapping(value = "getReportList")
	@ResponseBody
	public PageUtils<PurchaseGuideGoodsPo> getReportList(PurchaseReplenishAnalyQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {

		qo.setPageNumber(pageNumber);
		qo.setPageSize(pageSize);

		LOG.info("门店补货分析报表查询条件：{}", qo);

		try {

			// 必填参数
			if (StringUtils.isBlank(qo.getBranchId()) || qo.getBranchType() == null) {
				LOG.error("机构信息为空，前端查询条件参数错误！");
				return PageUtils.emptyPage();
			}

			if (!BranchTypeEnum.isStore(qo.getBranchType())) {
				LOG.error("所选机构不是店铺，请重新选择！");
				return PageUtils.emptyPage();
			}

			// 构建查询条件信息
			buldSearchParams(qo);

			return purchaseReplenishAnalyService.getReplenishAnalyReportPage(qo);
		} catch (Exception e) {
			LOG.error("门店补货分析报表分页获取数据异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 导出报表数据 
	 * @param response
	 * @param qo
	 * @return
	 * @author liwb
	 * @date 2017年3月18日
	 */
	@RequestMapping(value = "/exportReportList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportReportList(HttpServletResponse response, PurchaseReplenishAnalyQo qo) {
		LOG.info("门店补货分析报表导出参数：{}", qo);
		RespJson resp = RespJson.success();
		try {
			// 必填参数
			if (StringUtils.isBlank(qo.getBranchId()) || qo.getBranchType() == null) {
				LOG.error("机构信息为空，前端查询条件参数错误！");
				return RespJson.businessError("机构信息为空，前端查询条件参数错误！");
			}

			if (!BranchTypeEnum.isStore(qo.getBranchType())) {
				LOG.error("所选机构不是店铺，请重新选择！");
				return RespJson.businessError("所选机构不是店铺，请重新选择！");
			}

			// 构建查询条件信息
			buldSearchParams(qo);

			List<PurchaseGuideGoodsPo> exportList = purchaseReplenishAnalyService.getReplenishAnalyReportList(qo);

			String fileName = "门店补货分析报表" + DateUtils.getCurrSmallStr();
			String templateName = ExportExcelConstant.PURCHASE_REPLENISH_ANALY_REPORT;
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("门店补货分析报表导出异常：{}", e);
			resp = RespJson.error("门店补货分析报表导出异常");
		}
		return resp;
	}

	/**
	 * @Description: 构建查询条件信息
	 * @param qo
	 * @author liwb
	 * @date 2017年3月20日
	 */
	private void buldSearchParams(PurchaseReplenishAnalyQo qo) {

		String supplierCodeName = qo.getSupplierCodeName();
		if (StringUtils.isNotBlank(supplierCodeName)) {

			// 如果是选择的供应商信息，清空供应商名称
			if (supplierCodeName.contains("[") && supplierCodeName.contains("]")) {
				qo.setSupplierCodeName(null);
			} else {

				// 如果是自己填写的供应商信息，则清空供应商Id
				qo.setSupplierId(null);
			}
		}
	}

}
