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
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

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
import com.okdeer.jxc.utils.poi.ExcelReaderUtil;

/**
 * ClassName: DeliverDDFormController 
 * @Description: TODO
 * @author yangyq02
 * @date 2017年3月8日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
 
@Controller
@RequestMapping("form/deliverDDForm")
public class DeliverDDFormController extends BasePrintController<DeliverDDFormController, DeliverFormList> {
	@Reference(version = "1.0.0", check = false)
	private DeliverFormServiceApi deliverFormServiceApi;
	
	@RequestMapping(value = "view")
	public String viewDA(Model model) {
		model.addAttribute("targetBranchId", getCurrBranchId());
		return "form/deliver/deliverDDList";
	}
	@Override
	protected Map<String, Object> getPrintReplace(String formNo) {
		return null;
	}

	@Override
	protected List<DeliverFormList> getPrintDetail(String formNo) {
		return null;
	}
	@RequestMapping(value = "addView")
	public String addView(QueryDeliverFormVo vo, Model model) {
			return "form/deliver/DDAdd";
	}
	@RequestMapping(value = "editView")
	public String editView(QueryDeliverFormVo vo, Model model) {
			return "form/deliver/DDEdit";
	}
	@RequestMapping(value = "toEnd", method = RequestMethod.POST)
	@ResponseBody
	public RespJson toEnd(QueryDeliverFormVo vo) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		SysUser user = UserUtil.getCurrentUser();
		vo.setUpdateUserId(user.getId());
		return deliverFormServiceApi.check(vo);
	}
	
//	@RequestMapping(value = "insertDeliverForm", method = RequestMethod.POST)
//	@ResponseBody
//	public RespJson insertDeliverForm(@RequestBody String formVo) {
//		RespJson respJson = RespJson.success();
//		LOG.info(LogConstant.OUT_PARAM, formVo);
//		try {
//			DeliverFormVo vo = new ObjectMapper().readValue(formVo, DeliverFormVo.class);
//
//			String getId = UuidUtils.getUuid();
//			String formNo = "";
//			if (StringUtils.isEmpty(vo.getBranchCode())) {
//				formNo = orderNoUtils.getOrderNo(new StringBuilder(vo.getFormType()).append(
//						UserUtil.getCurrBranchCode()).toString());
//			} else {
//				formNo = orderNoUtils.getOrderNo(new StringBuilder(vo.getFormType()).append(vo.getBranchCode())
//						.toString());
//			}
//			// 获取单号
//			// 获取登录人
//			SysUser user = UserUtil.getCurrentUser();
//			// 设置值
//			vo.setDeliverFormId(getId);
//			vo.setFormNo(formNo);
//			vo.setStatus(DeliverAuditStatusEnum.WAIT_CHECK.getIndex());
//			vo.setDealStatus(DeliverStatusEnum.PENDING.getIndex());
//			vo.setIsReference(IsReference.NO.getIndex());
//			vo.setCreaterBranchId(UserUtil.getCurrBranchId());
//			vo.setValue(user.getId(), user.getId(), null, null);
//			vo.setFormSources(FormSourcesEnum.SYSTEM.getKey());
//			for (DeliverFormListVo deliverFormListVo : vo.getDeliverFormListVo()) {
//				deliverFormListVo.setDeliverFormListId(UuidUtils.getUuid());
//				deliverFormListVo.setFormNo(formNo);
//				deliverFormListVo.setFormId(getId);
//			}
//			respJson = deliverFormServiceApi.insertForm(vo);
//			if (respJson.getStatus() != 0) {
//				return respJson;
//			}
//			respJson.put("formId", getId);
//		} catch (Exception e) {
//			LOG.error("保存要货申请单出现异常:{}", e);
//			respJson = RespJson.error("添加要货申请单失败！");
//		}
//		return respJson;
//	}
}
