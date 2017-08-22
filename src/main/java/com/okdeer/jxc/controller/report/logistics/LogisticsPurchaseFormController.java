/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年8月1日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */
package com.okdeer.jxc.controller.report.logistics;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.utils.Disabled;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.enums.FormDealStatus;
import com.okdeer.jxc.form.enums.FormStatus;
import com.okdeer.jxc.form.enums.FormType;
import com.okdeer.jxc.form.purchase.qo.FormQueryQo;
import com.okdeer.jxc.form.purchase.qo.PurchaseFormPO;
import com.okdeer.jxc.form.purchase.service.PurchaseFormServiceApi;

/**
 * ClassName: LogisticsPurchaseFormController 
 * @Description: 物流采购单
 * @author zhangchm
 * @date 2017年8月10日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("LogisticsPurchaseForm")
public class LogisticsPurchaseFormController extends BaseController<LogisticsPurchaseFormController> {
	
	@Reference(version = "1.0.0", check = false)
	PurchaseFormServiceApi purchaseFormServiceApi;

	/**
	 * @Description: 物流跳转到采购页面
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月10日
	 */
	@RequestMapping(value = "viewPa")
	public String viewPa() {
		return "logistics/PaList";
	}

	/**
	 * @Description: 物流跳转到退货单页面
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月10日
	 */
	@RequestMapping(value = "viewPr")
	public String viewPr() {
		return "logistics/PrList";
	}


	/**
	 * @Description: 获取单据
	 * @param qo
	 * @return   
	 * @return PageUtils<PurchaseFormPO>  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月10日
	 */
	@RequestMapping(value = "listData", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<PurchaseFormPO> listData(FormQueryQo qo) {
		if (qo.getEndTime() != null) {
			// 结束日期加一天
			Calendar cal = Calendar.getInstance();
			cal.setTime(qo.getEndTime());
			cal.add(Calendar.DATE, 1);
			qo.setEndTime(cal.getTime());
		}
		String branchName = qo.getBranchName();
		if(StringUtils.isNotBlank(branchName)){
			branchName = branchName.substring(branchName.lastIndexOf("]")+1,branchName.length());
			qo.setBranchName(branchName);
		}
		
		String supplierName = qo.getSupplierName();
		if (StringUtils.isNotBlank(supplierName)) {
			supplierName = supplierName.substring(supplierName.lastIndexOf("]") + 1, supplierName.length());
			qo.setSupplierName(supplierName);
		}
		qo.setBranchCompleCode(getCurrBranchCompleCode());
		PageUtils<PurchaseFormPO> page = purchaseFormServiceApi.queryPurchaseFormList(qo);
		return page;
	}
	
	/**
	 * 跳转到修改页面
	 * @param formId
	 * @param model
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月12日
	 */
	@RequestMapping(value = "purchaseList")
	public String purchaseList(String formId, String report, HttpServletRequest request) {
		PurchaseFormPO form = purchaseFormServiceApi.selectPOById(formId);
		
		if(form == null){
			String errorMsg = String.format("采购订单不存在或已删除！单据Id：%s", formId);
			LOG.error(errorMsg);
			request.setAttribute(ERROR_MSG, errorMsg);
			return PAGE_500;
		}
		
		//如果已删除
		if(Disabled.INVALID.ordinal() == form.getDisabled().intValue() ){
			String errorMsg = String.format("采购订单已删除！单据Id：%s", formId);
			LOG.error(errorMsg);
			request.setAttribute(ERROR_MSG, errorMsg);
			return PAGE_500;
		}
		
		request.setAttribute("form", form);
		if (FormType.PA.toString().equals(form.getFormType().toString())) {
			request.setAttribute("status", FormStatus.CHECK_SUCCESS.getLabel());
			request.setAttribute("close", report);
			return "logistics/PaView";
		} else if (FormType.PR.toString().equals(form.getFormType().toString())){
			request.setAttribute("status", FormStatus.CHECK_SUCCESS.getLabel());
			request.setAttribute("close", report);
			return "logistics/PrView";
		} else {
			request.setAttribute("status", FormStatus.CHECK_SUCCESS.getLabel());
			request.setAttribute("close", report);
			return "logistics/PaView";
		}
	}

	/**
	 * @Description: 导出明细
	 * @param response
	 * @param formId
	 * @param type   
	 * @return void  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月10日
	 */
	@RequestMapping(value = "exportList")
	public void exportList(HttpServletResponse response, String formId, String type) {
		try {
			List<Map<String,Object>> exportList = purchaseFormServiceApi.queryFormsList(formId);
			String formNo = "";
			if (CollectionUtils.isNotEmpty(exportList)) {
				formNo = String.valueOf(exportList.get(0).get("formNo"));
			}
			String fileName = "";
			String templateName = "";
			if (FormType.PA.toString().equals(type)) {
				fileName = "CG" + "_" + formNo;
				templateName = ExportExcelConstant.PURCHASE_FORM_LOGISTICS;
			} else {
				fileName = "GYSTH" + "_" + formNo;
				templateName = ExportExcelConstant.RETURN_FORM_LOGISTICS;
			}
			// 导出Excel
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("GoodsPriceAdjustController:exportList:", e);
		}
	}
	
	/**
	 * @Description: 采购单查询明细
	 * @param deliverFormId
	 * @return   
	 * @return List<Map<String,Object>>  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月9日
	 */
	@RequestMapping(value = "getPurchaseFormListsById", method = RequestMethod.POST)
	@ResponseBody
	public List<Map<String,Object>> getPurchaseFormListsById(String formId) {
		try {
			List<Map<String,Object>> list = purchaseFormServiceApi.queryFormsList(formId);
			return list;
		} catch (Exception e) {
			LOG.error("要货单查询明细数据出现异常", e);
		}
		return new ArrayList<Map<String,Object>>();
	}
}