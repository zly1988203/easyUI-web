/** 
 *@Project: okdeer-jxc-web 
 *@Author: yangyq02
 *@Date: 2016年8月8日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.deliver;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.druid.util.StringUtils;
import com.alibaba.dubbo.config.annotation.Reference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.entity.BranchesGrow;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.constant.SysConstant;
import com.okdeer.jxc.common.controller.BasePrintController;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.enums.DeliverAuditStatusEnum;
import com.okdeer.jxc.common.enums.DeliverStatusEnum;
import com.okdeer.jxc.common.enums.DisabledEnum;
import com.okdeer.jxc.common.enums.FormSourcesEnum;
import com.okdeer.jxc.common.enums.IsReference;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.BigDecimalUtils;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.NumberToCN;
import com.okdeer.jxc.common.utils.OrderNoUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.UuidUtils;
import com.okdeer.jxc.form.deliver.entity.DeliverForm;
import com.okdeer.jxc.form.deliver.entity.DeliverFormList;
import com.okdeer.jxc.form.deliver.service.DeliverConfigServiceApi;
import com.okdeer.jxc.form.deliver.service.DeliverFormServiceApi;
import com.okdeer.jxc.form.deliver.service.QueryDeliverFormListServiceApi;
import com.okdeer.jxc.form.deliver.service.QueryDeliverFormServiceApi;
import com.okdeer.jxc.form.deliver.vo.DeliverFormListVo;
import com.okdeer.jxc.form.deliver.vo.DeliverFormVo;
import com.okdeer.jxc.form.deliver.vo.QueryDeliverFormVo;
import com.okdeer.jxc.form.enums.FormType;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: DeliverFormController 
 * @Description: 配送单（调拨单）
 * @author yangyq02
 * @date 2016年8月17日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    进销存2.0.0		   2016年8月17日                  zhangchm            配送单（调拨单）Controller
 *    商业管理系统 		   2016.9.1			lijy02				修改继承controller 完善打印功能
 */
@Controller
@RequestMapping("form/deliverForm")
public class DeliverFormController extends
		BasePrintController<DeliverFormController, DeliverFormList> {

	@Reference(version = "1.0.0", check = false)
	private QueryDeliverFormServiceApi queryDeliverFormServiceApi;

	@Reference(version = "1.0.0", check = false)
	private DeliverFormServiceApi deliverFormServiceApi;

	@Reference(version = "1.0.0", check = false)
	private QueryDeliverFormListServiceApi queryDeliverFormListServiceApi;

	@Reference(version = "1.0.0", check = false)
	private DeliverConfigServiceApi deliverConfigServiceApi;

	@Autowired
	private OrderNoUtils orderNoUtils;

	@Reference(version = "1.0.0", check = false)
	BranchesServiceApi branchesServiceApi;

	/**
	 * @Description: 跳转要货单页面
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2016年8月17日
	 */
	@RequestMapping(value = "viewsDA")
	public String viewDA() {
		return "form/deliver/deliverList";
	}

	/**
	 * @Description: 跳转出库单
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2016年8月17日
	 */
	@RequestMapping(value = "viewsDO")
	public String viewsDO() {
		return "form/deliver/DoList";
	}

	/**
	 * @Description: 跳转入库单
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2016年8月17日
	 */
	@RequestMapping(value = "viewsDI")
	public String viewsDI() {
		return "form/deliver/DiList";
	}

	/**
	 * @Description: 返利设置页面
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2016年9月6日
	 */
	@RequestMapping(value = "rebate")
	public String rebate() {
		return "form/deliver/rebate";
	}

	/**
	 * @Description: 有效天数设置页面
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2016年9月6日
	 */
	@RequestMapping(value = "validityDays")
	public String validityDays(Model model) {
		// 在页面显示有效天数
		int validityDay = deliverConfigServiceApi.getValidityDay(UserUtil
				.getCurrBranchId());
		model.addAttribute("validityDay", validityDay);
		return "form/deliver/validityDays";
	}

	/**
	 * @Description: 新增页面
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2016年8月29日
	 */
	@RequestMapping(value = "addDeliverForm")
	public String addDeliverForm(String deliverType, Model model) {
		LOG.info(LogConstant.OUT_PARAM, deliverType);
		SysUser user = getCurrentUser();
		model.addAttribute("user", user);
		BranchesGrow branchesGrow = branchesServiceApi.queryBranchesById(user
				.getBranchId());
		branchesGrow.setMinAmount(branchesGrow.getTargetBranchMinAmount());
		Integer type = branchesGrow.getTargetBranchType();
		if (FormType.DA.toString().equals(deliverType)) {
			if (BranchTypeEnum.HEAD_QUARTERS.getCode().intValue() == type
					.intValue()) {
				// 如果是总店，则不让进行任何业务操作，只能查询
				// return "form/deliver/deliverList";
			} else if (BranchTypeEnum.BRANCH_OFFICE.getCode().intValue() == type
					.intValue()) {
				// 判断要货机构是否是分店，如果是分店，要货机构可以选择该分店下的所有机构，有效时间为该分店的，起订金额为目标机构的
				branchesGrow
						.setValidityTime(branchesGrow
								.getTargetBranchValidityNumDays() == 0 ? SysConstant.VALIDITY_DAY
								: branchesGrow.getTargetBranchValidityNumDays());
				branchesGrow.setSourceBranchId("");
				branchesGrow.setSourceBranchName("");
			} else {
				// 如果为店铺，则只能是该机构本身，不能选择，有效时间为该店铺对应的分店的，起订金额为该店铺对应分店的
				branchesGrow
						.setValidityTime(branchesGrow
								.getSourceBranchValidityNumDays() == 0 ? SysConstant.VALIDITY_DAY
								: branchesGrow.getSourceBranchValidityNumDays());
			}

			model.addAttribute("branchesGrow", branchesGrow);
			return "form/deliver/deliverAdd";
		} else if (FormType.DO.toString().equals(deliverType)) {
			if (BranchTypeEnum.HEAD_QUARTERS.getCode().intValue() == type
					.intValue()
					|| BranchTypeEnum.BRANCH_OFFICE.getCode().intValue() == type
							.intValue()) {
				branchesGrow.setSourceBranchId("");
				branchesGrow.setSourceBranchName("");
			}
			model.addAttribute("branchesGrow", branchesGrow);
			return "form/deliver/DoAdd";
		} else {
			return "form/deliver/DiAdd";
		}
	}

	/**
	 * @Description: 根据要货单跳转页面
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2016年8月29日
	 */
	@RequestMapping(value = "deliverEdit")
	public String deliverEdit(QueryDeliverFormVo vo, Model model) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		DeliverForm form = queryDeliverFormServiceApi.queryEntity(vo);
		model.addAttribute("form", form);
		LOG.info(LogConstant.PAGE, form.toString());
		// 待审核，可修改
		if (DeliverAuditStatusEnum.WAIT_CHECK.getName()
				.equals(form.getStatus())) {
			if (FormType.DA.toString().equals(form.getFormType())) {
				Branches branches = branchesServiceApi.getBranchInfoById(form
						.getTargetBranchId());
				model.addAttribute("minAmount", branches.getMinAmount());
				model.addAttribute("targetBranchType", branches.getType());
				model.addAttribute(
						"salesman",
						branches.getSalesman() == null ? "" : branches
								.getSalesman());
				return "form/deliver/deliverEdit";
			} else if (FormType.DO.toString().equals(form.getFormType())) {
				return "form/deliver/DoEdit";
			} else {
				return "form/deliver/DiEdit";
			}
		} else {
			// 已审核，不能修改
			if (FormType.DA.toString().equals(form.getFormType())) {
				Branches branches = branchesServiceApi
						.getBranchInfoById(getCurrBranchId());
				model.addAttribute("minAmount", branches.getMinAmount());
				model.addAttribute(
						"salesman",
						branches.getSalesman() == null ? "" : branches
								.getSalesman());
				return "form/deliver/deliverView";
			} else if (FormType.DO.toString().equals(form.getFormType())) {
				form.setRebateMoney(BigDecimalUtils.formatDecimal(
						form.getRebateMoney(), 2));
				form.setAddRebateMoney(BigDecimalUtils.formatDecimal(
						form.getAddRebateMoney(), 2));
				return "form/deliver/DoView";
			} else {
				return "form/deliver/DiView";
			}
		}
	}

	/**
	 * @Description: 要货单查询
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return PageUtils<PurchaseSelect>  
	 * @throws
	 * @author zhangchm
	 * @date 2016年8月18日
	 */
	@RequestMapping(value = "getDeliverForms", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<DeliverForm> getDeliverForms(
			QueryDeliverFormVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			if (FormType.DO.toString().equals(vo.getDeliverType())) {
				vo.setSourceBranchId(UserUtil.getCurrBranchId());
			} else {
				// 获取机构ID
				vo.setTargetBranchId(UserUtil.getCurrBranchId());
			}
			PageUtils<DeliverForm> deliverForms = queryDeliverFormServiceApi
					.queryLists(vo);
			LOG.info(LogConstant.PAGE, deliverForms.toString());
			return deliverForms;
		} catch (Exception e) {
			LOG.error("要货单查询数据出现异常:{}", e);
		}
		return null;
	}

	/**
	 * @Description: 保存要货申请单
	 * @param vo
	 * @param branchCode
	 * @param validate
	 * @return
	 * @author zhangchm
	 * @date 2016年8月20日
	 */
	@RequestMapping(value = "insertDeliverForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson insertDeliverForm(String formVo) {
		RespJson respJson = RespJson.success();
		LOG.info(LogConstant.OUT_PARAM, formVo);
		try {
			DeliverFormVo vo = new ObjectMapper().readValue(formVo, DeliverFormVo.class);

			String getId = UuidUtils.getUuid();
			String formNo = "";
			if (StringUtils.isEmpty(vo.getBranchCode())) {
				formNo = orderNoUtils.getOrderNo(new StringBuilder(vo
						.getFormType()).append(UserUtil.getCurrBranchCode())
						.toString());
			} else {
				formNo = orderNoUtils.getOrderNo(new StringBuilder(vo
						.getFormType()).append(vo.getBranchCode()).toString());
			}
			// 获取单号
			// 获取登录人
			SysUser user = UserUtil.getCurrentUser();
			// 设置值
			vo.setDeliverFormId(getId);
			vo.setFormNo(formNo);
			vo.setStatus(DeliverAuditStatusEnum.WAIT_CHECK.getIndex());
			vo.setDealStatus(DeliverStatusEnum.PENDING.getIndex());
			vo.setIsReference(IsReference.NO.getIndex());
			vo.setCreaterBranchId(UserUtil.getCurrBranchId());
			vo.setValue(user.getId(), user.getId(), null, null);
			vo.setFormSources(FormSourcesEnum.SYSTEM.getKey());
			for (DeliverFormListVo deliverFormListVo : vo
					.getDeliverFormListVo()) {
				deliverFormListVo.setDeliverFormListId(UuidUtils.getUuid());
				deliverFormListVo.setFormNo(formNo);
				deliverFormListVo.setFormId(getId);
			}
			respJson = deliverFormServiceApi.insertForm(vo);
			if (respJson.getStatus() != 0) {
				return respJson;
			}
			respJson.put("formId", getId);
		} catch (Exception e) {
			LOG.error("保存要货申请单出现异常:{}", e);
			respJson = RespJson.error("添加要货申请单失败！");
		}
		return respJson;
	}

	/**
	 * @Description: 修改要货单
	 * @param vo
	 * @param validate
	 * @return
	 * @author zhangchm
	 * @date 2016年8月20日
	 */
	@RequestMapping(value = "updateDeliverForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson updateDeliverForm(String formVo) {
		RespJson respJson = RespJson.success();
		LOG.info(LogConstant.OUT_PARAM, formVo.toString());
		try {
			DeliverFormVo vo = new ObjectMapper().readValue(formVo, DeliverFormVo.class);
			// 获取登录人
			SysUser user = UserUtil.getCurrentUser();
			// 设置值
			vo.setUpdateUserId(user.getId());
			vo.setUpdateTime(DateUtils.getCurrDate());
			vo.setCreaterBranchId(user.getBranchId());
			vo.setIsReference(IsReference.NO.getIndex());
			vo.setFormSources(FormSourcesEnum.SYSTEM.getKey());
			vo.setDealStatus(DeliverStatusEnum.PENDING.getIndex());
			vo.setStatus(DeliverAuditStatusEnum.WAIT_CHECK.getIndex());
			vo.setDisabled(DisabledEnum.NO.getIndex());
			for (DeliverFormListVo deliverFormListVo : vo
					.getDeliverFormListVo()) {
				deliverFormListVo.setDeliverFormListId(UuidUtils.getUuid());
				deliverFormListVo.setFormId(vo.getDeliverFormId());
				deliverFormListVo.setFormNo(vo.getFormNo());
			}

			respJson = deliverFormServiceApi.updateForm(vo);
			if (respJson.getStatus() != 0) {
				return respJson;
			}
			respJson.put("formId", vo.getDeliverFormId());
		} catch (Exception e) {
			LOG.error("保存要货申请单出现异常:{}", e);
			respJson = RespJson.error("添加要货申请单失败！");
		}
		return respJson;
	}

	/**
	 * @Description: 删除要货单(假删除)
	 * @param vo
	 * @param validate
	 * @return
	 * @author zhangchm
	 * @date 2016年8月20日
	 */
	@RequestMapping(value = "deleteDeliverForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson deleteDeliverForm(String formId) {
		RespJson respJson = RespJson.success();
		LOG.info(LogConstant.OUT_PARAM, formId);
		try {
			// 获取登录人
			SysUser user = UserUtil.getCurrentUser();
			DeliverFormVo vo = new DeliverFormVo();
			vo.setDeliverFormId(formId);
			// 设置值
			vo.setValue("", user.getId(), vo.getCreateTime(), null);
			vo.setDisabled(DisabledEnum.YES.getIndex());

			return deliverFormServiceApi.updateToRemove(vo);
		} catch (Exception e) {
			LOG.error("保存要货申请单出现异常:{}", e);
			respJson = RespJson.error("添加要货申请单失败！");
		}
		return respJson;
	}

	/**
	 * @Description: 审核
	 * @param vo  deliverType( DA:要货单, DD:店间要货, DO:出库单, DI: 入库单 ,DR:退货申请),status=1
	 * @return
	 * @author zhangchm
	 * @date 2016年8月29日
	 */
	@RequestMapping(value = "check", method = RequestMethod.POST)
	@ResponseBody
	public RespJson check(QueryDeliverFormVo vo) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		SysUser user = UserUtil.getCurrentUser();
		vo.setUpdateUserId(user.getId());
		return deliverFormServiceApi.check(vo);
	}

	/**
	 * @Description: 查询要货机构的发货机构信息,要货机构为店铺
	 * @param branchesId  
	 * @return
	 * @author zhangchm
	 * @date 2016年9月18日
	 */
	@RequestMapping(value = "getSourceBranch", method = RequestMethod.POST)
	@ResponseBody
	public RespJson getSourceBranch(String branchesId) {
		RespJson respJson = RespJson.success();
		BranchesGrow branchesGrow = branchesServiceApi
				.queryBranchesById(branchesId);
		respJson.put("sourceBranchId", branchesGrow.getSourceBranchId());
		respJson.put("sourceBranchName", branchesGrow.getSourceBranchName());
		respJson.put(
				"validityTime",
				DateUtils.getDaysAfter(
						DateUtils.getCurrDate(),
						branchesGrow.getSourceBranchValidityNumDays() == 0 ? SysConstant.VALIDITY_DAY
								: branchesGrow.getSourceBranchValidityNumDays()));
		respJson.put("salesman", branchesGrow.getSalesman());
		respJson.put("minAmount", branchesGrow.getTargetBranchMinAmount());
		return respJson;
	}

	/**
	 * @Description: 终止
	 * @param vo  
	 * @return
	 * @author zhangchm
	 * @date 2016年8月29日
	 */
	@RequestMapping(value = "stopped", method = RequestMethod.POST)
	@ResponseBody
	public RespJson stopped(QueryDeliverFormVo vo) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		return deliverFormServiceApi.stoppedDeliverForm(vo);
	}

	// begin by lijy02 2016.9.12 :添加打印
	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.common.controller.BasePrintController#getPrintReplace(java.lang.String)
	 */
	@Override
	protected Map<String, Object> getPrintReplace(String formNo) {
		Map<String, Object> replaceMap = new HashMap<String, Object>();
		DeliverForm deliverForm = deliverFormServiceApi
				.queryDeliverFormByFormNo(formNo);
		replaceMap.put("_单号",
				deliverForm.getFormNo() != null ? deliverForm.getFormNo() : "");
		replaceMap.put(
				"_要货机构",
				deliverForm.getTargetBranchName() != null ? deliverForm
						.getTargetBranchName() : "");
		replaceMap.put(
				"_发货机构",
				deliverForm.getSourceBranchName() != null ? deliverForm
						.getSourceBranchName() : "");
		replaceMap.put(
				"_收货机构",
				deliverForm.getSourceBranchName() != null ? deliverForm
						.getSourceBranchName() : "");
		replaceMap.put(
				"_有效期限",
				deliverForm.getValidityTime() != null ? deliverForm
						.getValidityTime() : "");
		replaceMap.put(
				"_备注",
				deliverForm.getTargetBranchRemark() != null ? deliverForm
						.getTargetBranchRemark() : "");
		replaceMap.put(
				"_制单人员",
				deliverForm.getCreateUserName() != null ? deliverForm
						.getCreateUserName() : "");
		replaceMap.put(
				"_制单日期",
				deliverForm.getCreateTime() != null ? deliverForm
						.getCreateTime() : "");
		replaceMap.put(
				"_审核日期",
				deliverForm.getValidityTime() != null ? deliverForm
						.getValidityTime() : "");
		replaceMap.put(
				"_审核人员",
				deliverForm.getValidUserName() != null ? deliverForm
						.getValidUserName() : "");
		replaceMap.put(
				"_配送单号",
				deliverForm.getReferenceNo() != null ? deliverForm
						.getReferenceNo() : "");
		replaceMap.put(
				"_要货单号",
				deliverForm.getReferenceNo() != null ? deliverForm
						.getReferenceNo() : "");
		// 业务人员
		replaceMap.put("_业务人员",
				deliverForm.getSalesman() != null ? deliverForm.getSalesman()
						: "");
		replaceMap.put(
				"_申请人",
				deliverForm.getTargetBranchName() != null ? deliverForm
						.getTargetBranchName() : "");
		replaceMap.put("_联系人",
				deliverForm.getContacts() != null ? deliverForm.getContacts()
						: "");
		replaceMap.put("_联系电话",
				deliverForm.getMobile() != null ? deliverForm.getMobile() : "");

		replaceMap.put("_返利", BigDecimalUtils.formatTwoDecimal(deliverForm
				.getAddRebateMoney()));
		replaceMap.put("_折扣",
				BigDecimalUtils.formatTwoDecimal(deliverForm.getRebateMoney()));
		// _人民币总金额大写
		replaceMap.put("_人民币总金额大写",
				NumberToCN.number2CNMontrayUnit(deliverForm.getAmount()));
		replaceMap.put("_总金额",
				BigDecimalUtils.formatTwoDecimal(deliverForm.getAmount()));
		return replaceMap;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.common.controller.BasePrintController#getPrintDetail(java.lang.String)
	 */
	@Override
	protected List<DeliverFormList> getPrintDetail(String formNo) {
		return queryDeliverFormListServiceApi.getDeliverList(formNo);
	}
	// end by lijy02
}
