/** 
 *@Project: okdeer-jxc-web 
 *@Author: lijy02
 *@Date: 2016年10月25日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report.purchase;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
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

/**
 * ClassName: PurchaseReportController 
 * @Description: 采购报表控制类
 * @author lijy02
 * @date 2016年10月27日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *	零售系统V1.02	2016.10.25			lijy02		  采购报表控制类
 */
 
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
	public String detail() {
		return "report/purchase/details";
	}

	/**
	 * @Description: 采购汇总页面
	 * @return
	 * @author lijy02
	 * @date 2016年10月25日
	 */
	@RequestMapping("/total")
	public String total() {
		return "report/purchase/total";
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
	public PageUtils<PurchaseReportPo> getPurReportDetail(
			FormQueryQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			LOG.debug("采购明细查询：{}", qo);
			/*if(BranchTypeEnum.HEAD_QUARTERS.getCode().toString().equals(qo.getBranchId())) {
				qo.setBranchId(null);
				qo.setBranchCompleCode(getCurrBranchCompleCode());
			}*/
			if(StringUtils.isEmpty(qo.getBranchName())) {
				qo.setBranchCompleCode(getCurrBranchCompleCode());
			}
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			if (qo.getEndTime() != null) {
				Date time = DateUtils.getNextDay(qo.getEndTime());
				qo.setEndTime(time);
			}
			//处理供应商
			String supplierName = qo.getSupplierName();
			if(StringUtils.isNotBlank(supplierName)){
				supplierName = supplierName.substring(supplierName.lastIndexOf("]")+1,supplierName.length());
				qo.setSupplierName(supplierName);
			}
			
			//处理机构
			String branchName = qo.getBranchName();
			if(StringUtils.isNotBlank(branchName)){
				branchName = branchName.substring(branchName.lastIndexOf("]")+1,branchName.length());
				qo.setBranchName(branchName);
			}
			
			PageUtils<PurchaseReportPo> list = purchaseReportService.getPurReportDetail(qo);
			// 2、查询合计
			PurchaseReportPo vo = purchaseReportService.getPurReportDetailSum(qo);
			List<PurchaseReportPo> footer = new ArrayList<PurchaseReportPo>();
			cleanAccessData(vo);
			footer.add(vo);
			list.setFooter(footer);
			cleanAccessData(list.getList());
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
	@RequestMapping(value = "exportDetails")
	public void exportDetails(
			HttpServletResponse response,
			FormQueryQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.debug("采购单明细导出:{}" + qo);
		try {
			if(StringUtils.isEmpty(qo.getBranchId())) {
				qo.setBranchCompleCode(getCurrBranchCompleCode());
			}
			if (qo.getEndTime() != null) {
				Date time = DateUtils.getNextDay(qo.getEndTime());
				qo.setEndTime(time);
			}
			
			//处理供应商
			String supplierName = qo.getSupplierName();
			if(StringUtils.isNotBlank(supplierName)){
				supplierName = supplierName.substring(supplierName.lastIndexOf("]")+1,supplierName.length());
				qo.setSupplierName(supplierName);
			}
			
			//处理机构
			String branchName = qo.getBranchName();
			if(StringUtils.isNotBlank(branchName)){
				branchName = branchName.substring(branchName.lastIndexOf("]")+1,branchName.length());
				qo.setBranchName(branchName);
			}
			
			List<PurchaseReportPo> exportList = purchaseReportService.getPurReportDetailList(qo);
			// 2、查询合计
			PurchaseReportPo vo = purchaseReportService.getPurReportDetailSum(qo);
			exportList.add(vo);
			// 导出文件名称，不包括后缀名
			String fileName = "采购明细表" + "_" + DateUtils.getCurrSmallStr();
			// 模板名称，包括后缀名
			String templateName = ExportExcelConstant.PURCHASE_DETAIL_REPORT;
			// 导出Excel
			cleanAccessData(exportList);
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("采购单明细导出:{}", e);
		}
	}

	/**
	 * @Description: 采购汇总表
	 * @param qo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author lijy02
	 * @date 2016年10月26日
	 */
	@RequestMapping(value = "getPurReportTotal", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<PurchaseReportPo> getPurReportTotal(
			FormQueryQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			LOG.debug("采购汇总表查询：{}", qo);
			/*if(BranchTypeEnum.HEAD_QUARTERS.getCode().toString().equals(qo.getBranchId())) {
				qo.setBranchId(null);
				qo.setBranchCompleCode(getCurrBranchCompleCode());
			}*/
			if(StringUtils.isEmpty(qo.getBranchName())) {
				qo.setBranchCompleCode(getCurrBranchCompleCode());
			}
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			if (qo.getEndTime() != null) {
				Date time = DateUtils.getNextDay(qo.getEndTime());
				qo.setEndTime(time);
			}
			
			//处理供应商
			String supplierName = qo.getSupplierName();
			if(StringUtils.isNotBlank(supplierName)){
				supplierName = supplierName.substring(supplierName.lastIndexOf("]")+1,supplierName.length());
				qo.setSupplierName(supplierName);
			}
			
			//处理机构
			String branchName = qo.getBranchName();
			if(StringUtils.isNotBlank(branchName)){
				branchName = branchName.substring(branchName.lastIndexOf("]")+1,branchName.length());
				qo.setBranchName(branchName);
			}
			
			PageUtils<PurchaseReportPo> list = null;
			switch (qo.getSearchType()) {
				case "supplierTotal":
					list = getPurReportTotalBySupplier(qo);
					break;
				case "formNoTotal":
					list = getPurReportTotalByFormNo(qo);
					break;
				case "categoryTotal":
					list = getPurReportTotalByCategory(qo);
					break;
				case "goodsTotal":
					list = getPurReportTotalByGoods(qo);
					break;
				default:
					list = getPurReportTotalByGoods(qo);
					break;
			}
			cleanAccessData(list.getList());
			cleanAccessData(list.getFooter());
			return list;
		} catch (Exception e) {
			LOG.error("采购汇总表查询:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 采购报表总计（类别）
	 * @param qo
	 * @return
	 * @author lijy02
	 * @date 2016年10月26日
	 */
	private PageUtils<PurchaseReportPo> getPurReportTotalByCategory(
			FormQueryQo qo) {
		PageUtils<PurchaseReportPo> list = purchaseReportService
				.getPurReportTotalByCategory(qo);
		// 2、查询合计
		PurchaseReportPo vo = purchaseReportService
				.getPurReportTotalByCategorySum(qo);
		List<PurchaseReportPo> footer = new ArrayList<PurchaseReportPo>();
		footer.add(vo);
		list.setFooter(footer);
		return list;
	}

	/**
	 * @Description: 获得采购报表汇总（按单据）
	 * @param qo
	 * @return
	 * @author lijy02
	 * @date 2016年10月26日
	 */
	private PageUtils<PurchaseReportPo> getPurReportTotalByFormNo(FormQueryQo qo) {
		PageUtils<PurchaseReportPo> list = purchaseReportService
				.getPurReportTotalByFormNo(qo);
		// 2、查询合计
		PurchaseReportPo vo = purchaseReportService
				.getPurReportTotalByFormNoSum(qo);
		List<PurchaseReportPo> footer = new ArrayList<PurchaseReportPo>();
		footer.add(vo);
		list.setFooter(footer);
		return list;
	}

	/**
	 * @Description: 获得采购报表汇总（按供应商）
	 * @param qo
	 * @return
	 * @author lijy02
	 * @date 2016年10月26日
	 */
	private PageUtils<PurchaseReportPo> getPurReportTotalBySupplier(
			FormQueryQo qo) {
		PageUtils<PurchaseReportPo> list = purchaseReportService
				.getPurReportTotalBySupplier(qo);
		// 2、查询合计
		PurchaseReportPo vo = purchaseReportService
				.getPurReportTotalBySupplierSum(qo);
		List<PurchaseReportPo> footer = new ArrayList<PurchaseReportPo>();
		footer.add(vo);
		list.setFooter(footer);
		return list;
	}

	/**
	 * @Description: 获得采购报表汇总（按商品）
	 * @author lijy02
	 * @date 2016年10月26日
	 */
	private PageUtils<PurchaseReportPo> getPurReportTotalByGoods(FormQueryQo qo) {
		PageUtils<PurchaseReportPo> list = purchaseReportService
				.getPurReportTotalByGoods(qo);
		// 2、查询合计
		PurchaseReportPo vo = purchaseReportService
				.getPurReportTotalByGoodsSum(qo);
		List<PurchaseReportPo> footer = new ArrayList<PurchaseReportPo>();
		footer.add(vo);
		list.setFooter(footer);
		return list;
	}

	/**
	 * @Description: 汇总导出
	 * @param response
	 * @param qo
	 * @author lijy02
	 * @date 2016年10月27日
	 */
	@RequestMapping(value = "exportTotal")
	public void exportTotal(
			HttpServletResponse response,
			FormQueryQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.debug("采购汇总导出:{}" + qo);
		try {
			/*if(BranchTypeEnum.HEAD_QUARTERS.getCode().toString().equals(qo.getBranchId())) {
				qo.setBranchId(null);
				qo.setBranchCompleCode(getCurrBranchCompleCode());
			}*/
			if(StringUtils.isEmpty(qo.getBranchName())) {
				qo.setBranchCompleCode(getCurrBranchCompleCode());
			}
			if (qo.getEndTime() != null) {
				Date time = DateUtils.getNextDay(qo.getEndTime());
				qo.setEndTime(time);
			}
			
			//处理供应商
			String supplierName = qo.getSupplierName();
			if(StringUtils.isNotBlank(supplierName)){
				supplierName = supplierName.substring(supplierName.lastIndexOf("]")+1,supplierName.length());
				qo.setSupplierName(supplierName);
			}
			
			//处理机构
			String branchName = qo.getBranchName();
			if(StringUtils.isNotBlank(branchName)){
				branchName = branchName.substring(branchName.lastIndexOf("]")+1,branchName.length());
				qo.setBranchName(branchName);
			}
			
			List<PurchaseReportPo> list = new ArrayList<PurchaseReportPo>();
			// 2、查询合计
			PurchaseReportPo vo =null;
			// 导出文件名称，不包括后缀名
			String fileName = "采购汇总表" + "_" + DateUtils.getCurrSmallStr();
			// 模板名称，包括后缀名
			String templateName ="";
			switch (qo.getSearchType()) {
				case "supplierTotal":
					list = purchaseReportService.getPurReportTotalBySupplierList(qo);
					// 2、查询合计
					vo = purchaseReportService.getPurReportTotalBySupplierSum(qo);
					fileName += "-供应商汇总";
					templateName = ExportExcelConstant.PUR_REPORT_TOTAL_SUPPLIER;
					break;
				case "formNoTotal":
					list = purchaseReportService.getPurReportTotalByFormNoList(qo);
					// 2、查询合计
					vo = purchaseReportService.getPurReportTotalByFormNoSum(qo);
					fileName += "-单据汇总";
					templateName = ExportExcelConstant.PUR_REPORT_TOTAL_FORMNO;
					break;
				case "categoryTotal":
					list = purchaseReportService.getPurReportTotalByCategoryList(qo);
					// 2、查询合计
					vo = purchaseReportService.getPurReportTotalByCategorySum(qo);
					fileName += "-类别汇总";
					templateName = ExportExcelConstant.PUR_REPORT_TOTAL_CATEGORY;
					break;
				case "goodsTotal":
					list = purchaseReportService.getPurReportTotalByGoodsList(qo);
					// 2、查询合计
					vo = purchaseReportService.getPurReportTotalByGoodsSum(qo);
					fileName += "-商品汇总";
					templateName = ExportExcelConstant.PUR_REPORT_TOTAL_GOODS;
					break;
				default:
					break;
			}
			list.add(vo);
			// 导出Excel
			cleanAccessData(list);
			exportListForXLSX(response, list, fileName, templateName);
		} catch (Exception e) {
			LOG.error("采购汇总导出:{}", e);
		}
	}
}
