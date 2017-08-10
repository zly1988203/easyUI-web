/** 
 *@Project: okdeer-jxc-web 
 *@Author: yangyq02
 *@Date: 2016年8月8日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report.logistics;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.entity.BranchesGrow;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.constant.SysConstant;
import com.okdeer.jxc.common.enums.DeliverStatusEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.deliver.entity.DeliverForm;
import com.okdeer.jxc.form.deliver.service.QueryDeliverFormServiceApi;
import com.okdeer.jxc.form.deliver.vo.QueryDeliverFormVo;
import com.okdeer.jxc.form.enums.FormType;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: LogisticsDeliverFormController 
 * @Description: 物流销售单导出
 * @author zhangchm
 * @date 2017年8月9日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("LogisticsDeliverForm")
public class LogisticsDeliverFormController extends BaseController<LogisticsDeliverFormController> {

	@Reference(version = "1.0.0", check = false)
	private QueryDeliverFormServiceApi queryDeliverFormServiceApi;

	@Reference(version = "1.0.0", check = false)
	BranchesServiceApi branchesServiceApi;
	
	/**
	 * @Description: 跳转要货单页面
	 * @param model
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月9日
	 */
	@RequestMapping(value = "viewDa")
	public String viewDa(Model model) {
		model.addAttribute("targetBranchId", getCurrBranchId());
		return "logistics/deliverList";
	}
	
	/**
	 * @Description: 跳转要货单页面
	 * @param model
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月9日
	 */
	@RequestMapping(value = "viewDr")
	public String viewDr(Model model) {
		model.addAttribute("targetBranchId", getCurrBranchId());
		return "logistics/DrList";
	}
	
	/**
	 * @Description: 根据要货单跳转页面
	 * @param vo
	 * @param report
	 * @param model
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月9日
	 */
	@RequestMapping(value = "deliverList")
	public String deliverEdit(QueryDeliverFormVo vo, String report, Model model) {
		model.addAttribute("type", vo.getFormSources());
		vo.setFormSources("");
		DeliverForm form = queryDeliverFormServiceApi.queryEntity(vo);
		model.addAttribute("form", form);
		// 返回状态
		if (DeliverStatusEnum.STOPPED.getName().equals(form.getDealStatus())) {
			model.addAttribute("status", Constant.DEAL_STATUS);
		} else {
			model.addAttribute("status", Constant.STATUS);
		}
		// 已审核，不能修改
		if (FormType.DA.toString().equals(form.getFormType())) {
			Branches branches = branchesServiceApi.getBranchInfoById(getCurrBranchId());
			model.addAttribute("minAmount", branches.getMinAmount());
			model.addAttribute("salesman", branches.getSalesman() == null ? "" : branches.getSalesman());
			model.addAttribute("close", report);
			return "logistics/DaView";
		} else if (FormType.DR.toString().equals(form.getFormType())) {
			model.addAttribute("close", report);
			return "logistics/DrView";
		} else {
			return "logistics/DaView";
		}
	}

	/**
	 * @Description: 要货单查询
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @return PageUtils<DeliverForm>  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月9日
	 */
	@RequestMapping(value = "getDeliverForms", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<DeliverForm> getDeliverForms(QueryDeliverFormVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.debug(LogConstant.OUT_PARAM, vo);
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			if (StringUtils.isEmpty(vo.getTargetBranchId())) {
				vo.setTargetBranchCompleteCode(UserUtil.getCurrBranchCompleCode());
			}
			String sourceBranchName = vo.getSourceBranchName();
			String targetBranchName = vo.getTargetBranchName();
			if (StringUtils.isNotEmpty(sourceBranchName)) {
				if (sourceBranchName.contains("[") && sourceBranchName.contains("]")) {
					vo.setSourceBranchName(null);
				} else {
					vo.setSourceBranchId(null);
				}
			}

			if (StringUtils.isNotEmpty(targetBranchName)) {
				if (targetBranchName.contains("[") && targetBranchName.contains("]")) {
					vo.setTargetBranchName(null);
				} else {
					vo.setTargetBranchId(null);
				}
			}
			PageUtils<DeliverForm> deliverForms = queryDeliverFormServiceApi.queryFormLists(vo);
			return deliverForms;
		} catch (Exception e) {
			LOG.error("要货单查询数据出现异常:{}", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 查询要货机构的发货机构信息,要货机构为店铺
	 * @param branchesId
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月9日
	 */
	@RequestMapping(value = "getSourceBranch", method = RequestMethod.POST)
	@ResponseBody
	public RespJson getSourceBranch(String branchesId) {
		RespJson respJson = RespJson.success();
		BranchesGrow branchesGrow = branchesServiceApi.queryBranchesById(branchesId);
		respJson.put("sourceBranchId", branchesGrow.getSourceBranchId());
		respJson.put("sourceBranchName", branchesGrow.getSourceBranchName());
		respJson.put("sourceBranchCode", branchesGrow.getSourceBranchCode());
		respJson.put("validityTime", DateUtils.getDaysAfter(
				DateUtils.getCurrDate(),
				branchesGrow.getSourceBranchValidityNumDays() == 0 ? SysConstant.VALIDITY_DAY : branchesGrow
						.getSourceBranchValidityNumDays()));
		respJson.put("salesman", branchesGrow.getSalesman());
		respJson.put("minAmount", branchesGrow.getMinAmount());
		return respJson;
	}
	
	/**
	 * @Description: 导出销售明细
	 * @param deliverFormId
	 * @param deliverType
	 * @param response
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月10日
	 */
	@RequestMapping(value = "exportList")
	public RespJson exportList(String deliverFormId,String deliverType, HttpServletResponse response) {
		try {
			if (StringUtils.isEmpty(deliverFormId)) {
				LOG.warn("未选择导出的行数据!");
				return RespJson.error("未选择导出的行数据!");
			}
			// 导出文件名称，不包括后缀名
			String fileName = null;
			String templateName = null;
			if ("DA".equals(deliverType)) {
				fileName = "XS" + "_" + DateUtils.formatDate(DateUtils.getCurrDate(), DateUtils.DATE_KEY_STR);
				templateName = ExportExcelConstant.DELIVER_FORM_LISTLOGISTICS;
			} else {
				fileName = "PSDTH" + "_" + DateUtils.formatDate(DateUtils.getCurrDate(), DateUtils.DATE_KEY_STR);
				templateName = ExportExcelConstant.DELIVER_FORM_RETURN_LISTLOGISTICS;
			}
			
			List<Map<String,Object>> list = queryDeliverFormServiceApi.queryFormsList(deliverFormId);
			// 导出Excel
			exportListForXLSX(response, list, fileName, templateName);
			return null;
		} catch (Exception e) {
			LOG.error("导出销售明细失败", e);
		}
		return RespJson.error();
	}
	
	/**
	 * @Description: 要货单查询明细
	 * @param deliverFormId
	 * @return   
	 * @return List<Map<String,Object>>  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月9日
	 */
	@RequestMapping(value = "getDeliverFormListsById", method = RequestMethod.POST)
	@ResponseBody
	public List<Map<String,Object>> getDeliverFormListsById(String deliverFormId) {
		try {
			return queryDeliverFormServiceApi.queryFormsList(deliverFormId);
		} catch (Exception e) {
			LOG.error("要货单查询明细数据出现异常", e);
		}
		return new ArrayList<Map<String,Object>>();
	}
	
}
