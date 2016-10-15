/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年8月1日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.purchase;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.controller.BasePrintController;
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
import com.okdeer.jxc.common.utils.UUIDHexGenerator;
import com.okdeer.jxc.form.entity.PurchaseForm;
import com.okdeer.jxc.form.entity.PurchaseFormDetail;
import com.okdeer.jxc.form.enums.FormDealStatus;
import com.okdeer.jxc.form.enums.FormStatus;
import com.okdeer.jxc.form.enums.FormType;
import com.okdeer.jxc.form.purchase.qo.FormQueryQo;
import com.okdeer.jxc.form.purchase.qo.PurchaseFormDetailPO;
import com.okdeer.jxc.form.purchase.qo.PurchaseFormPO;
import com.okdeer.jxc.form.purchase.service.PurchaseFormServiceApi;
import com.okdeer.jxc.form.purchase.vo.PurchaseFormDetailVo;
import com.okdeer.jxc.form.purchase.vo.PurchaseFormVo;
import com.okdeer.jxc.form.purchase.vo.ReceiptFormVo;
import com.okdeer.jxc.form.purchase.vo.ReturnFormVo;
import com.okdeer.jxc.goods.entity.GoodsSelect;
import com.okdeer.jxc.goods.entity.GoodsSelectByPurchase;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

import net.sf.json.JSONObject;

/**
 * ClassName: PurchaseFormController 
 * @author xiaoj02
 * @date 2016年8月1日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *		重构2.0			2016-8-5			xiaoj02			 采购controller
 */
@Controller
@RequestMapping("form/purchase")
public class PurchaseFormController extends
		BasePrintController<PurchaseForm, PurchaseFormDetailPO> {

	@Reference(version = "1.0.0", check = false)
	private PurchaseFormServiceApi purchaseFormServiceApi;
	
	@Autowired
	private GoodsSelectImportComponent goodsSelectImportComponent;

	@Autowired
	private OrderNoUtils orderNoUtils;

	/**
	 * 跳转到新增采购单页面
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月12日
	 */
	@RequestMapping(value = "orderAdd")
	public String viewAdd() {
		return "form/purchase/orderAdd";
	}

	/**
	 * 跳转到新增收货单页面
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月12日
	 */
	@RequestMapping(value = "receiptAdd")
	public String viewAddReceiving() {
		return "form/purchase/receiptAdd";
	}

	/**
	 * 跳转到新增退货单页面
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月12日
	 */
	@RequestMapping(value = "returnAdd")
	public String viewAddReturn() {
		return "form/purchase/returnAdd";
	}

	/**
	 * 收货单列表数据
	 * @param qo
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月18日
	 */
	@RequestMapping(value = "receiptListData", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<PurchaseFormPO> receiptListData(FormQueryQo qo) {
		if (qo.getEndTime() != null) {
			// 结束日期加一天
			Calendar cal = Calendar.getInstance();
			cal.setTime(qo.getEndTime());
			cal.add(Calendar.DATE, 1);
			qo.setEndTime(cal.getTime());
		}
		// 采购单
		qo.setFormType(FormType.PI.toString());
		qo.setBranchCompleCode(getCurrBranchCompleCode());

		PageUtils<PurchaseFormPO> page = purchaseFormServiceApi.selectPage(qo);
		return page;
	}

	@RequestMapping(value = "returnListData", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<PurchaseFormPO> returnListData(FormQueryQo qo) {
		if (qo.getEndTime() != null) {
			// 结束日期加一天
			Calendar cal = Calendar.getInstance();
			cal.setTime(qo.getEndTime());
			cal.add(Calendar.DATE, 1);
			qo.setEndTime(cal.getTime());
		}
		// 采购单
		qo.setFormType(FormType.PR.name());
		qo.setBranchCompleCode(getCurrBranchCompleCode());

		PageUtils<PurchaseFormPO> page = purchaseFormServiceApi.selectPage(qo);
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
	@RequestMapping(value = "orderEdit")
	public String orderEdit(String formId, HttpServletRequest request) {
		PurchaseFormPO form = purchaseFormServiceApi.selectPOById(formId);
		request.setAttribute("form", form);
		if (FormStatus.CHECK_SUCCESS.getValue().equals(form.getStatus())) {// 已审核，不能修改
			request.setAttribute("status", FormStatus.CHECK_SUCCESS.getLabel());
			return "form/purchase/orderView";
		}

		if (FormDealStatus.FINISH.getValue().equals(form.getDealStatus())) {// 处理完成，不能修改
			request.setAttribute("status", FormDealStatus.FINISH.getLabel());
			return "form/purchase/orderView";
		}

		if (FormDealStatus.STOP.getValue().equals(form.getDealStatus())) {// 已终止，不能修改
			request.setAttribute("status", FormDealStatus.STOP.getLabel());
			return "form/purchase/orderView";
		}

		return "form/purchase/orderEdit";

	}

	/**
	 * 跳转到退货单修改界面
	 * @param formId
	 * @param request
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月18日
	 */
	@RequestMapping(value = "returnEdit")
	public String returnEdit(String formId, HttpServletRequest request) {
		PurchaseFormPO form = purchaseFormServiceApi.selectPOById(formId);
		request.setAttribute("form", form);
		if (FormStatus.CHECK_SUCCESS.getValue().equals(form.getStatus())) {// 已审核，不能修改
			request.setAttribute("status", FormStatus.CHECK_SUCCESS.getLabel());
			return "form/purchase/returnView";
		}

		if (FormDealStatus.FINISH.getValue().equals(form.getDealStatus())) {// 处理完成，不能修改
			request.setAttribute("status", FormDealStatus.FINISH.getLabel());
			return "form/purchase/returnView";
		}

		if (FormDealStatus.STOP.getValue().equals(form.getDealStatus())) {// 已终止，不能修改
			request.setAttribute("status", FormDealStatus.STOP.getLabel());
			return "form/purchase/returnView";
		}

		return "form/purchase/returnEdit";

	}

	/**
	 * 跳转到收货单修改页面
	 * @param formId
	 * @param model
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月12日
	 */
	@RequestMapping(value = "receiptEdit")
	public String receiptEdit(String formId, HttpServletRequest request) {
		PurchaseFormPO form = purchaseFormServiceApi.selectPOById(formId);
		request.setAttribute("form", form);
		if (FormStatus.CHECK_SUCCESS.getValue().equals(form.getStatus())) {// 已审核，不能修改
			request.setAttribute("status", FormStatus.CHECK_SUCCESS.getLabel());
			return "form/purchase/receiptView";
		}

		if (FormDealStatus.FINISH.getValue().equals(form.getDealStatus())) {// 处理完成，不能修改
			request.setAttribute("status", FormDealStatus.FINISH.getLabel());
			return "form/purchase/receiptView";
		}

		if (FormDealStatus.STOP.getValue().equals(form.getDealStatus())) {// 已终止，不能修改
			request.setAttribute("status", FormDealStatus.STOP.getLabel());
			return "form/purchase/receiptView";
		}

		return "form/purchase/receiptEdit";
	}

	/**
	 * 跳转到退货单界面
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月18日
	 */
	@RequestMapping(value = "returnList")
	public String viewReturnList() {
		return "form/purchase/returnList";
	}

	/**
	 * 跳转到收货单列表
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月15日
	 */
	@RequestMapping(value = "receiptList")
	public String viewReceiptList() {
		return "form/purchase/receiptList";
	}

	/**
	 * 跳转到采购单列表
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月15日
	 */
	@RequestMapping(value = "orderList")
	public String viewList() {
		return "form/purchase/orderList";
	}

	/**
	 * 根据id，查询单据
	 * @param formId
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月4日
	 */
	@RequestMapping(value = "get", method = RequestMethod.POST)
	@ResponseBody
	public RespJson get(String formId) {
		PurchaseForm form = purchaseFormServiceApi.get(formId);
		if (form == null) {
			return RespJson.error("无法通过此id查询到数据，数据可能已被删除");
		}
		RespJson resp = RespJson.success();
		resp.put("obj", form);
		return resp;
	}

	/**
	 * 删除
	 * @param formId
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月22日
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public RespJson delete(String formId) {
		SysUser user = UserUtil.getCurrentUser();
		RespJson resp = purchaseFormServiceApi.delete(formId, user.getId());
		return resp;
	}

	/**
	 * 获取单据列表json
	 * @param qo 通用查询对象
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月4日
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
		// 采购单
		qo.setFormType(FormType.PA.toString());
		qo.setBranchCompleCode(getCurrBranchCompleCode());
		PageUtils<PurchaseFormPO> page = purchaseFormServiceApi.selectPage(qo);
		return page;
	}

	/**
	 * 查询商品详情
	 * @param formId
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月5日
	 */
	@RequestMapping(value = "detailList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<PurchaseFormDetailPO> getDetailJson(String formId) {
		PageUtils<PurchaseFormDetailPO> list = purchaseFormServiceApi
				.selectDetail(formId);
		return list;
	}

	/**
	 * 保存单据和单据商品详情
	 * @param validate
	 * @param form
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月4日
	 */
	@RequestMapping(value = "saveOrder", method = RequestMethod.POST)
	@ResponseBody
	public RespJson save(@Valid PurchaseFormVo formVo, BindingResult validate, String detailList) {
		if (validate.hasErrors()) {
			String errorMessage = validate.getFieldError().getDefaultMessage();
			LOG.warn("validate errorMessage:" + errorMessage);
			return RespJson.error(errorMessage);
		}
		
		PurchaseForm form = new PurchaseForm();

		BeanUtils.copyProperties(formVo, form);

		String formId = UUIDHexGenerator.generate();

		SysUser user = UserUtil.getCurrentUser();

		String formNo = orderNoUtils.getOrderNo(FormType.PA.name()
				+ user.getBranchCode());

		Date now = new Date();

		form.setId(formId);
		form.setFormType(FormType.PA);
		form.setFormNo(formNo);
		form.setIo(1);
		// 前端设置
		// branchId、supplierId、totalNum、amount、salesmanId、remark

		form.setCreaterBranchId(user.getBranchId());
		form.setStatus(FormStatus.WAIT_CHECK.getValue());
		form.setDealStatus(0);
		form.setDisabled(0);

		form.setCreateUserId(user.getId());
		form.setCreateTime(now);
		form.setUpdateUserId(user.getId());
		form.setUpdateTime(now);

		List<PurchaseFormDetail> list = new ArrayList<PurchaseFormDetail>();
		
		List<PurchaseFormDetailVo> listVo = JSON.parseArray(detailList, PurchaseFormDetailVo.class);

		for (PurchaseFormDetailVo purchaseFormDetailVo : listVo) {
			PurchaseFormDetail formDetail = new PurchaseFormDetail();
			BeanUtils.copyProperties(purchaseFormDetailVo, formDetail);

			formDetail.setId(UUIDHexGenerator.generate());
			formDetail.setFormId(formId);
			formDetail.setCreateTime(now);
			formDetail.setCreateUserId(user.getId());
			formDetail.setUpdateTime(now);
			formDetail.setUpdateUserId(user.getId());
			formDetail.setDisabled(0);
			list.add(formDetail);
		}

		// 保存采购订单
		RespJson respJson = purchaseFormServiceApi.save(form, list);
		if (respJson.isSuccess()) {
			respJson.put("formId", formId);
		}
		return respJson;
	}

	@RequestMapping(value = "saveReturn", method = RequestMethod.POST)
	@ResponseBody
	public RespJson saveReturn(@Valid ReturnFormVo formVo,
			BindingResult validate, String detailList) {
		if (validate.hasErrors()) {
			String errorMessage = validate.getFieldError().getDefaultMessage();
			LOG.warn("validate errorMessage:" + errorMessage);
			return RespJson.error(errorMessage);
		}
		PurchaseForm form = new PurchaseForm();
		BeanUtils.copyProperties(formVo, form);

		String formId = UUIDHexGenerator.generate();

		SysUser user = UserUtil.getCurrentUser();
		String formNo = orderNoUtils.getOrderNo(FormType.PR.name()
				+ user.getBranchCode());

		Date now = new Date();

		form.setId(formId);
		form.setFormType(FormType.PR);
		form.setFormNo(formNo);
		form.setIo(1);
		// 前端设置
		// branchId、supplierId、totalNum、amount、salesmanId、remark

		form.setCreaterBranchId(user.getBranchId());
		form.setStatus(FormStatus.WAIT_CHECK.getValue());
		form.setDealStatus(0);
		form.setDisabled(0);

		form.setCreateUserId(user.getId());
		form.setCreateTime(now);
		form.setUpdateUserId(user.getId());
		form.setUpdateTime(now);

		String refFormNo = formVo.getRefFormNo();
		if (StringUtils.isNotBlank(refFormNo)) {// 设置引用单据类型
			form.setRefFormNoType(refFormNo.substring(0, 2));
		}

		List<PurchaseFormDetail> list = new ArrayList<PurchaseFormDetail>();
		
		List<PurchaseFormDetailVo> listVo = JSON.parseArray(detailList, PurchaseFormDetailVo.class);

		for (PurchaseFormDetailVo purchaseFormDetailVo : listVo) {
			PurchaseFormDetail formDetail = new PurchaseFormDetail();
			BeanUtils.copyProperties(purchaseFormDetailVo, formDetail);

			formDetail.setId(UUIDHexGenerator.generate());
			formDetail.setFormId(formId);
			formDetail.setCreateTime(now);
			formDetail.setCreateUserId(user.getId());
			formDetail.setUpdateTime(now);
			formDetail.setUpdateUserId(user.getId());
			formDetail.setDisabled(0);
			list.add(formDetail);
		}

		// 保存采购订单
		RespJson respJson = purchaseFormServiceApi.save(form, list);
		if (respJson.isSuccess()) {
			respJson.put("formId", formId);
		}
		return respJson;
	}

	@RequestMapping(value = "saveReceipt", method = RequestMethod.POST)
	@ResponseBody
	public RespJson saveReceipt(@Valid ReceiptFormVo formVo,
			BindingResult validate,String detailList) {
		if (validate.hasErrors()) {
			String errorMessage = validate.getFieldError().getDefaultMessage();
			LOG.warn("validate errorMessage:" + errorMessage);
			return RespJson.error(errorMessage);
		}
		PurchaseForm form = new PurchaseForm();
		BeanUtils.copyProperties(formVo, form);

		String formId = UUIDHexGenerator.generate();
		SysUser user = UserUtil.getCurrentUser();
		String formNo = orderNoUtils.getOrderNo(FormType.PI.name()
				+ user.getBranchCode());

		Date now = new Date();

		form.setId(formId);
		form.setFormType(FormType.PI);
		form.setFormNo(formNo);
		form.setIo(1);
		// 前端设置
		// branchId、supplierId、totalNum、amount、salesmanId、remark

		form.setCreaterBranchId(user.getBranchId());
		form.setStatus(FormStatus.WAIT_CHECK.getValue());
		form.setDealStatus(0);
		form.setDisabled(0);

		form.setCreateUserId(user.getId());
		form.setCreateTime(now);
		form.setUpdateUserId(user.getId());
		form.setUpdateTime(now);

		List<PurchaseFormDetail> list = new ArrayList<PurchaseFormDetail>();

		List<PurchaseFormDetailVo> listVo = JSON.parseArray(detailList, PurchaseFormDetailVo.class);

		for (PurchaseFormDetailVo purchaseFormDetailVo : listVo) {
			PurchaseFormDetail formDetail = new PurchaseFormDetail();
			BeanUtils.copyProperties(purchaseFormDetailVo, formDetail);

			formDetail.setId(UUIDHexGenerator.generate());
			formDetail.setFormId(formId);
			formDetail.setCreateTime(now);
			formDetail.setCreateUserId(user.getId());
			formDetail.setUpdateTime(now);
			formDetail.setUpdateUserId(user.getId());
			formDetail.setDisabled(0);
			list.add(formDetail);
		}

		// 保存采购订单
		RespJson respJson = purchaseFormServiceApi.save(form, list);
		if (respJson.isSuccess()) {
			respJson.put("formId", formId);
		}
		return respJson;
	}

	/**
	 * 修改单据
	 * @param validate
	 * @param form
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月4日
	 */
	@RequestMapping(value = "updateOrder", method = RequestMethod.POST)
	@ResponseBody
	public RespJson updateOrder(@Valid PurchaseFormVo formVo,
			BindingResult validate, HttpServletRequest request) {
		if (validate.hasErrors()) {
			String errorMessage = validate.getFieldError().getDefaultMessage();
			LOG.warn("validate errorMessage:" + errorMessage);

			RespJson respJson = RespJson.error(errorMessage);

			return respJson;
		}

		PurchaseForm form = new PurchaseForm();
		BeanUtils.copyProperties(formVo, form);

		List<PurchaseFormDetail> list = new ArrayList<PurchaseFormDetail>();

		String formId = form.getId();
		SysUser user = UserUtil.getCurrentUser();
		Date now = new Date();

		String detailList = request.getParameter("detailList");
		List<PurchaseFormDetailVo> listVo = JSON.parseArray(detailList, PurchaseFormDetailVo.class);
		
		for (PurchaseFormDetailVo purchaseFormDetailVo : listVo) {
			PurchaseFormDetail formDetail = new PurchaseFormDetail();
			BeanUtils.copyProperties(purchaseFormDetailVo, formDetail);

			formDetail.setId(UUIDHexGenerator.generate());
			formDetail.setFormId(formId);
			formDetail.setCreateTime(now);
			formDetail.setCreateUserId(user.getId());
			formDetail.setUpdateTime(now);
			formDetail.setUpdateUserId(user.getId());
			formDetail.setDisabled(0);
			list.add(formDetail);
		}

		RespJson respJson = purchaseFormServiceApi.update(form, list);
		return respJson;
	}

	/**
	 * 修改单据
	 * @param validate
	 * @param form
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月4日
	 */
	@RequestMapping(value = "updateReceipt", method = RequestMethod.POST)
	@ResponseBody
	public RespJson updateReceipt(@Valid ReceiptFormVo formVo,
			BindingResult validate,String detailList) {
		if (validate.hasErrors()) {
			String errorMessage = validate.getFieldError().getDefaultMessage();
			LOG.warn("validate errorMessage:" + errorMessage);

			RespJson respJson = RespJson.error(errorMessage);

			return respJson;
		}

		PurchaseForm form = new PurchaseForm();
		BeanUtils.copyProperties(formVo, form);

		List<PurchaseFormDetail> list = new ArrayList<PurchaseFormDetail>();

		String formId = form.getId();
		SysUser user = UserUtil.getCurrentUser();
		Date now = new Date();

		List<PurchaseFormDetailVo> listVo = JSON.parseArray(detailList, PurchaseFormDetailVo.class);

		for (PurchaseFormDetailVo purchaseFormDetailVo : listVo) {
			PurchaseFormDetail purchaseFormDetail = new PurchaseFormDetail();
			BeanUtils.copyProperties(purchaseFormDetailVo, purchaseFormDetail);
			purchaseFormDetail.setId(UUIDHexGenerator.generate());
			purchaseFormDetail.setFormId(formId);
			purchaseFormDetail.setCreateTime(now);
			purchaseFormDetail.setCreateUserId(user.getId());
			purchaseFormDetail.setUpdateTime(now);
			purchaseFormDetail.setUpdateUserId(user.getId());
			purchaseFormDetail.setDisabled(0);

			list.add(purchaseFormDetail);
		}

		RespJson respJson = purchaseFormServiceApi.update(form, list);
		return respJson;
	}

	/**
	 * 修改单据
	 * @param validate
	 * @param form
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月4日
	 */
	@RequestMapping(value = "updateReturn", method = RequestMethod.POST)
	@ResponseBody
	public RespJson updateReturn(@Valid ReceiptFormVo formVo,
			BindingResult validate, String detailList) {
		if (validate.hasErrors()) {
			String errorMessage = validate.getFieldError().getDefaultMessage();
			LOG.warn("validate errorMessage:" + errorMessage);

			RespJson respJson = RespJson.error(errorMessage);

			return respJson;
		}

		PurchaseForm form = new PurchaseForm();
		BeanUtils.copyProperties(formVo, form);

		String refFormNo = formVo.getRefFormNo();
		if (StringUtils.isNotBlank(refFormNo)) {// 设置引用单据类型
			form.setRefFormNoType(refFormNo.substring(0, 2));
		}

		List<PurchaseFormDetail> list = new ArrayList<PurchaseFormDetail>();

		String formId = form.getId();
		SysUser user = UserUtil.getCurrentUser();
		Date now = new Date();

		List<PurchaseFormDetailVo> listVo = JSON.parseArray(detailList, PurchaseFormDetailVo.class);

		for (PurchaseFormDetailVo purchaseFormDetailVo : listVo) {
			PurchaseFormDetail purchaseFormDetail = new PurchaseFormDetail();
			BeanUtils.copyProperties(purchaseFormDetailVo, purchaseFormDetail);
			purchaseFormDetail.setId(UUIDHexGenerator.generate());
			purchaseFormDetail.setFormId(formId);
			purchaseFormDetail.setCreateTime(now);
			purchaseFormDetail.setCreateUserId(user.getId());
			purchaseFormDetail.setUpdateTime(now);
			purchaseFormDetail.setUpdateUserId(user.getId());
			purchaseFormDetail.setDisabled(0);

			list.add(purchaseFormDetail);
		}

		RespJson respJson = purchaseFormServiceApi.update(form, list);
		return respJson;
	}

	/**
	 * 审核
	 * @param formId
	 * @param status
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月4日
	 */
	@RequestMapping(value = "check", method = RequestMethod.POST)
	@ResponseBody
	public RespJson check(String formId, Integer status) {
		SysUser user = UserUtil.getCurrentUser();
		RespJson respJson = RespJson.success();
		try {
			respJson = purchaseFormServiceApi.check(formId,
					FormStatus.enumValueOf(status), user.getId());
		} catch (RuntimeException e) {
			LOG.error("审核出现异常，单据id：" + formId, e);
			respJson = RespJson.error("审核出现异常，原因：" + e.getMessage());
		}
		return respJson;
	}

	/**
	 * 终止
	 * @param formId
	 * @param status
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月4日
	 */
	@RequestMapping(value = "stop", method = RequestMethod.POST)
	@ResponseBody
	public RespJson stop(String formId) {
		SysUser user = UserUtil.getCurrentUser();
		return purchaseFormServiceApi.stop(formId, user.getId());
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.common.controller.BasePrintController#getPrintReplace(java.lang.String)
	 */
	@Override
	protected Map<String, Object> getPrintReplace(String formNo) {
		PurchaseFormPO form = purchaseFormServiceApi.selectPOById(formNo);
		Map<String, Object> replaceMap = new HashMap<String, Object>();
		if (null != form) {
			// 表头
			switch (form.getStatus().intValue()) {
				case 0:
					replaceMap.put("_审核状态", "待审核");
					break;
				case 1:
					replaceMap.put("_审核状态", "审核通过");
					break;
				case 2:
					replaceMap.put("_审核状态", "审核不通过");
					break;
				default:
					replaceMap.put("_审核状态", "");
					break;
			}
			replaceMap.put("_订单编号", form.getFormNo() != null ? form.getFormNo()
					: "");
			replaceMap.put("_供应商",
					form.getSupplierName() != null ? form.getSupplierName()
							: "");
			replaceMap.put("_制单人员",
					form.getSalesmanName() != null ? form.getSalesmanName()
							: "");

			replaceMap.put("_机构名称",
					form.getBranchName() != null ? form.getBranchName() : "");

			// replaceMap.put("_仓库编码", "");
			// replaceMap.put("_仓库名称", "");
			if (form.getCreateTime() != null) {
				replaceMap.put("_下单日期", DateUtils.formatDate(
						form.getCreateTime(), "yyyy-MM-dd"));
			} else {
				replaceMap.put("_下单日期", "");
			}
			replaceMap.put("_采购人员",
					form.getSalesmanName() != null ? form.getSalesmanName()
							: "");

			if (form.getDeliverTime() != null) {
				replaceMap.put("_交货日期", DateUtils.formatDate(
						form.getDeliverTime(), "yyyy-MM-dd"));
			} else {
				replaceMap.put("_交货日期", "");
			}

			replaceMap.put("_审核人员",
					form.getValidUserName() != null ? form.getValidUserName()
							: "");
			replaceMap.put("_备注", form.getRemark());

			if (form.getValidTime() != null) {
				replaceMap
						.put("_审核日期", DateUtils.formatDate(form.getValidTime(),
								"yyyy-MM-dd"));
			} else {
				replaceMap.put("_审核日期", "");
			}

			replaceMap.put("_人民币总金额大写",
					NumberToCN.number2CNMontrayUnit(form.getAmount()));
			replaceMap.put("_总金额",
					BigDecimalUtils.formatTwoDecimal(form.getAmount())
							.toString());

			// 表尾
			replaceMap.put("_合计金额",
					NumberToCN.number2CNMontrayUnit(form.getAmount()));
			// replaceMap.put("_打印次数", "");
			// replaceMap.put("_公司名称", "");
			// replaceMap.put("_公司地址", "");
			// replaceMap.put("_页码", "");
			replaceMap.put("_打印人", getCurrentUser().getUserName());
			replaceMap.put("_打印时间",
					DateUtils.formatDate(new Date(), "yyyy-MM-dd"));
		}
		return replaceMap;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.common.controller.BasePrintController#getPrintDetail(java.lang.String)
	 */
	@Override
	protected List<PurchaseFormDetailPO> getPrintDetail(String formNo) {
		List<PurchaseFormDetailPO> list = purchaseFormServiceApi.selectDetail(
				formNo).getList();
		return list;
	}
	
	
	/**
	 * 商品导入
	 * @param file
	 * @param type 0货号、1条码
	 * @param branchId
	 * @return
	 * @author xiaoj02
	 * @date 2016年10月14日
	 */
	@RequestMapping(value = "importList")
	@ResponseBody
	public RespJson importList(@RequestParam("file") MultipartFile file,String type, String branchId){
		RespJson respJson = RespJson.success();
		try {
			if(file.isEmpty()){
				return RespJson.error("文件为空");
			}
			
			if(StringUtils.isBlank(type)){
				return RespJson.error("导入类型为空");
			}
			
			// 文件流
			InputStream is = file.getInputStream();
			// 获取文件名
			String fileName = file.getOriginalFilename();
			
			SysUser user = UserUtil.getCurrentUser();
			
			String[] field = null; 
			
			if(type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)){//货号
				field = new String[]{"skuCode","realNum","price","amount","isGift"};
			}else if(type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)){//条码
				field = new String[]{"barCode","realNum","price","amount","isGift"};
			}
			
			GoodsSelectImportVo<GoodsSelect> vo = goodsSelectImportComponent.importSelectGoods(fileName, is,
					field, 
					new GoodsSelectByPurchase(), 
					branchId, user.getId(), 
					type,
					"/form/purchase/downloadErrorFile",
					new GoodsSelectImportBusinessValid() {
				
				@Override
				public List<JSONObject> businessValid(List<JSONObject> list, String[] excelField) {
					for (JSONObject obj : list) {
						String realNum = obj.getString("realNum");
						try {
							Double.parseDouble(realNum);
						} catch (Exception e) {
							realNum = "0";
						}
						
						String isGift = obj.getString("isGift");
						if("是".equals(isGift)){//如果是赠品，单价设置为0
							isGift = "1";
							obj.accumulate("price", 0);
						}else if("否".equals(isGift)){
							isGift = "0";
						}else{
							obj.accumulate("error", "是否赠品字段填写有误");
						}
					}
					return list;
				}
				
				/**
				 * (non-Javadoc)
				 * @see com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid#formatter(java.util.List)
				 */
				@Override
				public void formatter(List<? extends GoodsSelect> list) {
					for (GoodsSelect objGoods : list) {
						GoodsSelectByPurchase obj = (GoodsSelectByPurchase) objGoods;
						
						BigDecimal price = obj.getPrice();
						if(price == null){
							obj.setPrice(obj.getPurchasePrice());
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
	 * @author xiaoj02
	 * @date 2016年10月15日
	 */
	@RequestMapping(value = "downloadErrorFile")
	public void downloadErrorFile(String code, String type, HttpServletResponse response) {
		String reportFileName = "错误数据";
		
		String[] headers = null;
		String[] columns = null;
		
		if(type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)){//货号
			columns = new String[]{"skuCode","realNum","price","amount","isGift"};
			headers = new String[]{"货号","数量","单价","金额","是否赠品"};
		}else if(type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)){//条码
			columns = new String[]{"barCode","realNum","price","amount","isGift"};
			headers = new String[]{"条码","数量","单价","金额","是否赠品"};
		}

		goodsSelectImportComponent.downloadErrorFile(code, reportFileName, headers, columns , response);
	}
	
	

	/**
	 * @Description: 导出明细
	 * @param formId 单号
	 * @return
	 * @author lijy02
	 * @date 2016年8月29日
	 */
	@RequestMapping(value = "exportList")
	public void exportList(HttpServletResponse response, String formId,
			String type) {
		LOG.info("PurchaseFormController.export:" + formId);
		try {
			List<PurchaseFormDetailPO> exportList = purchaseFormServiceApi
					.selectDetailById(formId);
			String fileName = "";
			String templateName = "";
			if (FormType.PA.toString().equals(type)) {
				// 导出文件名称，不包括后缀名
				fileName = "采购单" + "_" + DateUtils.getCurrSmallStr();
				// 模板名称，包括后缀名
				templateName = ExportExcelConstant.PURCHASEFORM;
			} else if (FormType.PI.toString().equals(type)) {
				// 导出文件名称，不包括后缀名
				fileName = "收货单" + "_" + DateUtils.getCurrSmallStr();
				templateName = ExportExcelConstant.DADOFORM;
			} else {
				// 导出文件名称，不包括后缀名
				fileName = "退货单" + "_" + DateUtils.getCurrSmallStr();
				templateName = ExportExcelConstant.DADOFORM;
			}
			// 导出Excel
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("GoodsPriceAdjustController:exportList:", e);
		}
	}
	
	/**
	 * @Description: 采购导入模板
	 * @param response
	 * @param type
	 * @author zhongy
	 * @date 2016年10月12日
	 */
	@RequestMapping(value = "exportTemp")
	public void exportTemp(HttpServletResponse response, Integer type) {
		LOG.info("导出采购导入模板请求参数,type={}",type);
		try {
			String fileName = "";
			String templateName = "";
			if(Constant.ZERO == type) {
				//商品货号
				templateName = ExportExcelConstant.PURCHASE_GOODS_SKUCODE_TEMPLE;
				fileName = "商品货号导入模板";
			}else if(Constant.ONE == type){
				templateName = ExportExcelConstant.PURCHASE_GOODS_BARCODE_TEMPLE;
				fileName = "商品条码导入模板";
			}
			if(StringUtils.isNotBlank(fileName) && StringUtils.isNotBlank(templateName)){
				exportListForXLSX(response, null, fileName, templateName);
			}
		} catch (Exception e) {
			LOG.error("导出采购导入模板异常", e);
		}
	}
}
