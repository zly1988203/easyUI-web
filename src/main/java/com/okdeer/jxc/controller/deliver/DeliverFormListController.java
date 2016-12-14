/** 
 *@Project: okdeer-jxc-web 
 *@Author: yangyq02
 *@Date: 2016年8月8日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.deliver;

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
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.deliver.entity.DeliverFormList;
import com.okdeer.jxc.form.deliver.service.QueryDeliverFormListServiceApi;
import com.okdeer.jxc.form.deliver.vo.QueryDeliverFormVo;
import com.okdeer.jxc.form.enums.FormType;

/**
 * ClassName: DeliverFormListController 
 * @Description: 配送单（调拨单）明细
 * @author yangyq02
 * @date 2016年8月17日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    进销存2.0.0		   2016年8月23日                  zhangchm            配送单（调拨单）明细Controller
 */
@Controller
@RequestMapping("form/deliverFormList")
public class DeliverFormListController extends BaseController<DeliverFormListController> {

	@Reference(version = "1.0.0", check = false)
	private QueryDeliverFormListServiceApi queryDeliverFormListServiceApi;

	/**
	 * @Description: 引入单据明细查询，单价查询
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return PageUtils<PurchaseSelect>  
	 * @throws
	 * @author zhangchm
	 * @date 2016年8月18日
	 */
	@RequestMapping(value = "getDeliverFormLists", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<DeliverFormList> getDeliverFormLists(QueryDeliverFormVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(1);
			vo.setPageSize(99999);
			LOG.info("vo:" + vo.toString());
			PageUtils<DeliverFormList> deliverFormLists = queryDeliverFormListServiceApi.queryLists(vo);
			LOG.info("page:" + deliverFormLists.toString());
			return deliverFormLists;
		} catch (Exception e) {
			LOG.error("要货单查询明细数据出现异常:{}", e);
		}
		return null;
	}

	/**
	 * @Description: 要货单查询明细
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return PageUtils<PurchaseSelect>  
	 * @throws
	 * @author zhangchm
	 * @date 2016年8月18日
	 */
	@RequestMapping(value = "getDeliverFormListsById", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<DeliverFormList> getDeliverFormListsById(QueryDeliverFormVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(99999);
			LOG.info("vo:" + vo.toString());
			PageUtils<DeliverFormList> deliverFormLists = queryDeliverFormListServiceApi
					.getDeliverFormListsAndStockByIdOrFormNo(vo);
			LOG.info("page:" + deliverFormLists.toString());
			return deliverFormLists;
		} catch (Exception e) {
			LOG.error("要货单查询明细数据出现异常:{}", e);
		}
		return null;
	}

	/**
	 * @Description: 导出明细  导出货号 pattern 1 表示货号
	 * @param formId 单号
	 * @return
	 * @author lijy02
	 * @date 2016年8月29日
	 */
	@RequestMapping(value = "exportList")
	public void exportList(HttpServletResponse response, String formNo, String type, String pattern) {
		LOG.info("DeliverFormListController.export:" + formNo);
		try {
			List<DeliverFormList> exportList = queryDeliverFormListServiceApi.getDeliverList(formNo);
			String fileName = "";
			String templateName = "";

			if (FormType.DA.toString().equals(type)) {
				// 导出文件名称，不包括后缀名
				fileName = "要货单" + "_" + DateUtils.getCurrSmallStr();
			} else if (FormType.DO.toString().equals(type)) {
				// 导出文件名称，不包括后缀名
				fileName = "出库单" + "_" + DateUtils.getCurrSmallStr();
			} else {
				// 导出文件名称，不包括后缀名
				fileName = "入库单" + "_" + DateUtils.getCurrSmallStr();
			}
			if (Constant.STRING_ONE.equals(pattern)) {
				// 模板名称，包括后缀名
				templateName = ExportExcelConstant.PURCHASEFORMCODE;
				fileName = fileName + "_" + "货号";
			} else {
				if (FormType.DA.toString().equals(type)) {
					// 模板名称，包括后缀名
					templateName = ExportExcelConstant.DELIVERFORM;
				}else if (FormType.DO.toString().equals(type)) {
					// 模板名称，包括后缀名
					templateName = ExportExcelConstant.DELIVERFORM_DO;
				}
				else{
					templateName = ExportExcelConstant.DELIVERFORM_DI;
				}
			}
			// 导出Excel
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("GoodsPriceAdjustController:exportList:", e);
		}
	}
}
