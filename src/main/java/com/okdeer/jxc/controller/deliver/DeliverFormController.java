/** 
 *@Project: okdeer-jxc-web 
 *@Author: yangyq02
 *@Date: 2016年8月8日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.deliver;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.druid.util.StringUtils;
import com.alibaba.dubbo.config.annotation.Reference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.okdeer.jxc.branch.entity.BranchSpec;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.entity.BranchesGrow;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.ImportExcelConstant;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.constant.SysConstant;
import com.okdeer.jxc.common.controller.BasePrintController;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.enums.DeliverAuditStatusEnum;
import com.okdeer.jxc.common.enums.DeliverStatusEnum;
import com.okdeer.jxc.common.enums.DisabledEnum;
import com.okdeer.jxc.common.enums.FormSourcesEnum;
import com.okdeer.jxc.common.enums.IsReference;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportComponent;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportHandle;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportVo;
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
import com.okdeer.jxc.goods.entity.GoodsSelect;
import com.okdeer.jxc.goods.entity.GoodsSelectDeliver;
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

	@Autowired
	private GoodsSelectImportComponent goodsSelectImportComponent;

	/**
	 * @Description: 跳转要货单页面
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2016年8月17日
	 */
	@RequestMapping(value = "viewsDA")
	public String viewDA(Model model) {
		model.addAttribute("targetBranchId", getCurrBranchId());
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
	public String viewsDO(Model model) {
		model.addAttribute("sourceBranchId", getCurrBranchId());
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
	public String viewsDI(Model model) {
		model.addAttribute("sourceBranchId", getCurrBranchId());
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
		int validityDay = deliverConfigServiceApi.getValidityDay(UserUtil.getCurrBranchId());
		model.addAttribute("validityDay", validityDay);
		BranchSpec branchSpec = deliverConfigServiceApi.querySpecByBranchId(UserUtil.getCurrBranchId());
		model.addAttribute("branchSpec", branchSpec);
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
	 * @param vo
	 * @param model
	 * @param type
	 * @return
	 * @author zhangchm
	 * @date 2016年8月29日
	 */
	@RequestMapping(value = "deliverEdit")
	public String deliverEdit(QueryDeliverFormVo vo,String report, Model model,HttpServletRequest request) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		model.addAttribute("type", vo.getFormSources());
		vo.setFormSources("");
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
				model.addAttribute("close", report);
				return "form/deliver/deliverView";
			} else if (FormType.DO.toString().equals(form.getFormType())) {
				form.setRebateMoney(BigDecimalUtils.formatDecimal(
						form.getRebateMoney(), 2));
				form.setAddRebateMoney(BigDecimalUtils.formatDecimal(
						form.getAddRebateMoney(), 2));
				model.addAttribute("close", report);
				return "form/deliver/DoView";
			} else {
				model.addAttribute("close", report);
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
			if (FormType.DO.toString().equals(vo.getDeliverType())
					|| FormType.DI.toString().equals(vo.getDeliverType())) {
				if (StringUtils.isEmpty(vo.getSourceBranchId())) {
					vo.setSourceBranchId(UserUtil.getCurrBranchId());
				}
			} else {
				// 获取机构ID
				if (StringUtils.isEmpty(vo.getTargetBranchId())) {
					vo.setTargetBranchId(UserUtil.getCurrBranchId());
				}
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
	public RespJson insertDeliverForm(@RequestBody String formVo) {
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
	public RespJson updateDeliverForm(@RequestBody String formVo) {
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
	 * @param formIds  
	 * @return
	 * @author zhangchm
	 * @date 2016年8月20日
	 */
	@RequestMapping(value = "deleteDeliverForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson deleteDeliverForm(@RequestBody String formIds) {
		RespJson respJson = RespJson.success();
		LOG.info(LogConstant.OUT_PARAM, formIds);
		try {
			if (StringUtils.isEmpty(formIds)) {
				LOG.error("未选择删除的配送单！");
				return RespJson.error("未选择删除的配送单！");
			}
			List<String> formIdsList = new ObjectMapper().readValue(formIds, List.class);
			// 获取登录人
			SysUser user = UserUtil.getCurrentUser();
			DeliverFormVo vo = new DeliverFormVo();
			vo.setDeliverFormIds(formIdsList);
			// 设置值
			vo.setUpdateUserId(user.getId());
			vo.setUpdateTime(DateUtils.getCurrDate());
			return deliverFormServiceApi.updateToRemove(vo);
		} catch (Exception e) {
			LOG.error("删除配送单出现异常:{}", e);
			respJson = RespJson.error("删除配送单失败！");
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
				.queryDeliverFormById(formNo);
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
		return queryDeliverFormListServiceApi.getDeliverListById(formNo);
	}
	// end by lijy02

	/**
	 * @Description: 导入功能
	 * @param file
	 * @param type 0货号、1条码
	 * @param branchId
	 * @return
	 * @author zhangchm
	 * @date 2016年10月15日
	 */
	@RequestMapping(value = "importList")
	@ResponseBody
	public RespJson importList(@RequestParam("file") MultipartFile file, String type, String branchId) {
		RespJson respJson = RespJson.success();
		try {
			if (file.isEmpty()) {
				return RespJson.error("文件为空");
			}
			if (StringUtils.isEmpty(type)) {
				return RespJson.error("导入类型为空");
			}
			SysUser user = UserUtil.getCurrentUser();
			// 文件流
			InputStream is = file.getInputStream();
			// 获取文件名
			String fileName = file.getOriginalFilename();
			String[] fields = null;
			if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {
				fields = ImportExcelConstant.DELIVER_GOODS_SKUCODE;

			} else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {
				fields = ImportExcelConstant.DELIVER_GOODS_BARCODE;
			}
			GoodsSelectImportVo<GoodsSelectDeliver> vo = goodsSelectImportComponent.importSelectGoods(fileName, is,
					fields, new GoodsSelectDeliver(), branchId, user.getId(), type,
					"/form/deliverForm/downloadErrorFile", new GoodsSelectImportBusinessValid() {
				@Override
				public void formatter(List<? extends GoodsSelect> list) {
					for (GoodsSelect objGoods : list) {
						GoodsSelectDeliver obj = (GoodsSelectDeliver) objGoods;
						if(!StringUtils.isEmpty(obj.getLargeNum())&&obj.getDistributionSpec()!=null){
									obj.setNum(new BigDecimal(obj.getLargeNum()).multiply(obj.getDistributionSpec())
											.toEngineeringString());
						}
					}
				}

				@Override
				public void businessValid(List<JSONObject> list, String[] excelField) {
				}

				@Override
				public void errorDataFormatter(List<JSONObject> list) {
				}

			});
			respJson.put("importInfo", vo);
		} catch (IOException e) {
			respJson = RespJson.error("读取Excel流异常");
			LOG.error("读取Excel流异常:", e);
		} catch (Exception e) {
			respJson = RespJson.error("导入发生异常");
			LOG.error("用户导入异常:", e);
		}
		return respJson;

	}

	/**
	 * @Description: 错误信息下载
	 * @param code
	 * @param type
	 * @param response
	 * @author zhangchm
	 * @date 2016年10月15日
	 */
	@RequestMapping(value = "downloadErrorFile")
	public void downloadErrorFile(String code, String type, HttpServletResponse response) {
		String reportFileName = "错误数据";

		String[] headers = null;
		String[] columns = null;

		if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {
			// 货号
			columns = ImportExcelConstant.DELIVER_GOODS_SKUCODE;
			headers = ImportExcelConstant.DELIVER_GOODS_SKUCODE_HEADERS;
		} else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {
			// 条码
			columns = ImportExcelConstant.DELIVER_GOODS_BARCODE;
			headers = ImportExcelConstant.DELIVER_GOODS_BARCODE_HEADERS;
		}
		goodsSelectImportComponent.downloadErrorFile(code, reportFileName, headers, columns, response);
	}

	/**
	 * @Description: 配送要货导入模板
	 * @param response
	 * @param type
	 * @author zhangchm
	 * @date 2016年10月15日
	 */
	@RequestMapping(value = "exportTemp")
	public void exportTemp(HttpServletResponse response, Integer type) {
		LOG.info("导出配送要货导入模板请求参数,type={}", type);
		try {
			String fileName = "";
			String templateName = "";
			if (Constant.ZERO == type) {
				// 商品货号
				templateName = ExportExcelConstant.DELIVER_GOODS_SKUCODE_TEMPLE;
				fileName = "要货申请单货号导入模板";
			} else if (Constant.ONE == type) {
				templateName = ExportExcelConstant.DELIVER_GOODS_BARCODE_TEMPLE;
				fileName = "要货申请单条码导入模板";
			}
			if (!StringUtils.isEmpty(fileName) && !StringUtils.isEmpty(templateName)) {
				exportListForXLSX(response, null, fileName, templateName);
			}
		} catch (Exception e) {
			LOG.error("导出要货申请单导入模板异常", e);
		}
	}

	/**
	 * @Description: 配送出库导入模板
	 * @param response
	 * @param type
	 * @author zhangchm
	 * @date 2016年10月15日
	 */
	@RequestMapping(value = "exportReport")
	public void exportReport(HttpServletResponse response, Integer type) {
		LOG.info("导出配送出库导入模板请求参数,type={}", type);
		try {
			String fileName = "";
			String templateName = "";
			if (Constant.ZERO == type) {
				// 商品货号
				templateName = ExportExcelConstant.DELIVER_GOODS_SKUCODE_REPORT;
				fileName = "配送出库单货号导入模板";
			} else if (Constant.ONE == type) {
				templateName = ExportExcelConstant.DELIVER_GOODS_BARCODE_REPORT;
				fileName = "配送出库单条码导入模板";
			}
			if (!StringUtils.isEmpty(fileName) && !StringUtils.isEmpty(templateName)) {
				exportListForXLSX(response, null, fileName, templateName);
			}
		} catch (Exception e) {
			LOG.error("导出配送出库单导入模板异常", e);
		}
	}

	/**
	 * @Description: 导入功能
	 * @param file
	 * @param type 0货号、1条码
	 * @param branchId
	 * @return
	 * @author zhangchm
	 * @date 2016年10月15日
	 */
	@RequestMapping(value = "reportList")
	@ResponseBody
	public RespJson reportList(@RequestParam("file") MultipartFile file, String type, String branchId) {
		RespJson respJson = RespJson.success();
		try {
			if (file.isEmpty()) {
				return RespJson.error("文件为空");
			}
			if (StringUtils.isEmpty(type)) {
				return RespJson.error("导入类型为空");
			}
			SysUser user = UserUtil.getCurrentUser();
			// 文件流
			InputStream is = file.getInputStream();
			// 获取文件名
			String fileName = file.getOriginalFilename();
			String[] fields = null;
			if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {
				fields = ImportExcelConstant.DELIVER_GOODS_SKUCODE_REPORT;
			} else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {
				fields = ImportExcelConstant.DELIVER_GOODS_BARCODE_REPORT;
			}
			GoodsSelectImportVo<GoodsSelectDeliver> vo = goodsSelectImportComponent.importSelectGoods(fileName, is,
					fields, new GoodsSelectDeliver(), branchId, user.getId(), type, "/form/deliverForm/downloadError",
					new GoodsSelectImportBusinessValid() {
				@Override
				public void formatter(List<? extends GoodsSelect> list) {
				}

				@Override
				public void businessValid(List<JSONObject> list, String[] excelField) {
					for (JSONObject obj : list) {
						String num = obj.getString("largeNum");
						try {
							Double.parseDouble(num);
						} catch (Exception e) {
							obj.element("largeNum", 0);
						}

						try {
							String isGift = obj.getString("isGift");
							if ("是".equals(isGift)) {// 如果是赠品，单价设置为0
								obj.element("isGift", "1");
								obj.element("price", 0);
							} else if ("否".equals(isGift)) {
								obj.element("isGift", "0");
							} else {
								obj.element("error", "是否赠品字段填写有误");
							}
						} catch (Exception e) {
							obj.element("error", "是否赠品字段填写有误");
						}
					}
				}

				@Override
				public void errorDataFormatter(List<JSONObject> list) {
					for (JSONObject obj : list) {
						if (obj.containsKey("isGift")) {
							String isGift = obj.getString("isGift");
							if ("1".equals(isGift)) {
								obj.element("isGift", "是");
							} else if ("0".equals(isGift)) {
								obj.element("isGift", "否");
							}
						}
					}
				}
			});
			respJson.put("importInfo", vo);
		} catch (IOException e) {
			respJson = RespJson.error("读取Excel流异常");
			LOG.error("读取Excel流异常:", e);
		} catch (Exception e) {
			respJson = RespJson.error("导入发生异常");
			LOG.error("用户导入异常:", e);
		}
		return respJson;
	}

	/**
	 * @Description: 错误信息下载
	 * @param code
	 * @param type
	 * @param response
	 * @author zhangchm
	 * @date 2016年10月15日
	 */
	@RequestMapping(value = "downloadError")
	public void downloadError(String code, String type, HttpServletResponse response) {
		String reportFileName = "错误数据";

		String[] headers = null;
		String[] columns = null;

		if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {
			// 货号
			columns = ImportExcelConstant.DELIVER_GOODS_SKUCODE_REPORT;
			headers = ImportExcelConstant.DELIVER_GOODS_SKUCODE_HEADERS_REPORT;
		} else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {
			// 条码
			columns = ImportExcelConstant.DELIVER_GOODS_BARCODE_REPORT;
			headers = ImportExcelConstant.DELIVER_GOODS_BARCODE_HEADERS_REPORT;
		}
		goodsSelectImportComponent.downloadErrorFile(code, reportFileName, headers, columns, response);
	}
}
