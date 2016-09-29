/** 
 *@Project: okdeer-jxc-web 
 *@Author: lijy02
 *@Date: 2016年8月1日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.goods;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.controller.BasePrintController;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.ListUtils;
import com.okdeer.jxc.common.utils.OrderNoUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.UUIDHexGenerator;
import com.okdeer.jxc.form.enums.FormType;
import com.okdeer.jxc.goods.entity.GoodsPriceForm;
import com.okdeer.jxc.goods.entity.GoodsPriceFormBranch;
import com.okdeer.jxc.goods.entity.GoodsPriceFormDetail;
import com.okdeer.jxc.goods.service.GoodsPriceAdustServiceApi;
import com.okdeer.jxc.goods.vo.GoodsPriceFormConst;
import com.okdeer.jxc.goods.vo.GoodsPriceFormVo;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: GoodsPriceAdjustController 
 * @Description: 商品调价单控制类
 * @author lijy02
 * @date 2016年8月1日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *	       商业管理系统		2016年8月1日			李俊义				商品调价单控制类
 */

@Controller
@RequestMapping("goods/priceAdjust")
public class GoodsPriceAdjustController extends
		BasePrintController<GoodsPriceAdjustController, GoodsPriceFormDetail> {

	// 商品调整服务类
	@Reference(version = "1.0.0", check = false)
	private GoodsPriceAdustServiceApi goodsPriceAdustService;

	// 单据生成
	@Autowired
	private OrderNoUtils orderNoUtils;

	/**
	 * @Description: 调价单页面展示
	 * @return
	 * @author lijy02
	 * @date 2016年8月1日
	 */
	@RequestMapping(value = "/view", method = RequestMethod.GET)
	public String view() {
		return "goods/modifyPriceOrder";
	}

	/**
	 * @Description: 新增页面
	 * @return first 表示打开新增页面  权限的控制(区分是新增页面还是修改页面)
	 * @author lijy02
	 * @date 2016年8月1日
	 */
	@RequestMapping(value = "/addFormView", method = RequestMethod.GET)
	public String addForm(Model model) {
		// 获得价格权限 逗号隔开
		SysUser user = UserUtil.getCurrentUser();
		UserUtil.setPriceGrantMap(user);
		model.addAttribute("first", Constant.ONE);
		return "goods/addModifyPriceOrder";
	}

	/**
	 * @Description: 调价公式页面
	 * @return
	 * @author lijy02
	 * @date 2016年8月15日
	 */
	@RequestMapping(value = "/modifyPriceDialog", method = RequestMethod.GET)
	public String modifyPriceDialog() {
		return "goods/modifyPriceDialog";
	}

	/**
	 * @Description: 根据条件获取调价单分页列表
	 * @param pageNumber 页码
	 * @param pageSize 每页最大显示数
	 * @param goodsPriceFormVo 调价单搜索实体类
	 * @return
	 * @author lijy02
	 * @date 2016年8月3日
	 */
	@RequestMapping(value = "/queryByCondition", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsPriceForm> queryByCondition(
			GoodsPriceFormVo goodsPriceFormVo) {
		try {
			if (goodsPriceFormVo.getEndTime() != null) {
				Date time = DateUtils.getNextDay(goodsPriceFormVo.getEndTime());
				goodsPriceFormVo.setEndTime(time);
			}
			goodsPriceFormVo.setCreateBranchCode(UserUtil.getCurrBranchCode());
			LOG.debug("调价单搜索 ：goodsPriceFormVo=" + goodsPriceFormVo);
			return goodsPriceAdustService.queryLists(goodsPriceFormVo);
		} catch (Exception e) {
			LOG.error(GoodsPriceFormConst.SEARCH_GOODS_PRICE_FOMR_ERRO, e);
		}
		return null;
	}

	/**
	 * @Description: 根据formNo获得单据详情列表
	 * @param formNo
	 * @return
	 * @author lijy02
	 * @date 2016年8月15日
	 */
	@RequestMapping(value = "/queryDetailsByformNo")
	@ResponseBody
	public List<GoodsPriceFormDetail> queryDetailsByformNo(String formNo) {
		LOG.debug("调价单搜索 ：formNo=" + formNo);
		return goodsPriceAdustService.queryDetailsByFormNo(formNo);
	}

	/**
	 * @Description: 根据formNo删除单据
	 * @param formNo 主键formNo
	 * @return
	 * @author lijy02
	 * @date 2016年8月3日
	 */
	@RequestMapping(value = "/removeForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson removeForm(String formNo) {
		// 获取当前用户
		SysUser user = UserUtil.getCurrentUser();
		// 修改人
		String updateUserId = user.getId();
		try {
			goodsPriceAdustService.removeFormByFormNo(formNo, updateUserId);
		} catch (Exception e) {
			LOG.error(GoodsPriceFormConst.DELETE_GOODS_PRICE_FOMR_ERRO, e);
			RespJson respJson = RespJson
					.error(GoodsPriceFormConst.DELETE_GOODS_PRICE_FOMR_ERRO);
			return respJson;
		}
		return RespJson.success();
	}

	/**
	 * @Description: 新增调价单
	 * @param goodsPriceForm
	 * @param GoodsPriceDetailList
	 * @param goodsPriceFormBranch
	 * @return
	 * @author lijy02
	 * @date 2016年8月4日
	 */
	@RequestMapping(value = "/saveForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson saveForm(@Valid GoodsPriceForm goodsPriceForm,
			BindingResult validate, String branchIds) {
		String formNo = "";
		String createTime = "";
		String createUserName = "";
		try {
			LOG.debug("新增调价单 ：goodsPriceForm=" + goodsPriceForm);
			// 验证
			if (validate.hasErrors()) {
				String errorMessage = validate.getFieldError()
						.getDefaultMessage();
				LOG.warn("validate errorMessage:" + errorMessage);
				return RespJson.error(errorMessage);
			}
			// 生成uuid主键
			String formId = UUIDHexGenerator.generate();
			// 货号
			formNo = orderNoUtils.getOrderNo(FormType.PC.name(),
					getCurrBranchCode());
			goodsPriceForm.setId(formId);
			// 单据数据设置
			goodsPriceForm.setFormType(FormType.PC.name());
			goodsPriceForm.setFormNo(formNo);
			// 判断是否生效
			goodsPriceForm.setIsEffected(Constant.ZERO_STR);
			// 用户数据
			SysUser user = UserUtil.getCurrentUser();
			if (user != null) {
				goodsPriceForm.setCreateUserId(user.getId());
				createUserName = user.getUserName();
				goodsPriceForm.setCreateUserName(createUserName);
				goodsPriceForm.setCreateBranchId(user.getBranchId());
				goodsPriceForm.setCreateBranchCode(user.getBranchCode());
			}
			goodsPriceForm.setCreateTime(new Date());
			// 设置商品价格单据信息
			goodsPriceForm = setFormData(goodsPriceForm);
			// 需要返回到页面上的数据
			if (goodsPriceForm != null) {
				formNo = goodsPriceForm.getFormNo();
				createTime = DateUtils.getCurrSmallRStr();
			}
			// 得到单据商品集合信息
			List<GoodsPriceFormDetail> goodsPriceDetailList = goodsPriceForm
					.getGoodsPriceFormDetail();
			// 生成商品机构关联表单数据
			List<GoodsPriceFormBranch> goodsPriceFormBranchList = setGoodsPriceFormBranch(
					branchIds, formNo);
			// 新增单据
			goodsPriceAdustService.addForm(goodsPriceForm,
					goodsPriceDetailList, goodsPriceFormBranchList);
		} catch (Exception e) {
			LOG.error(GoodsPriceFormConst.ADD_GOODS_PRICE_FOMR_ERRO, e);
			return RespJson
					.error(GoodsPriceFormConst.ADD_GOODS_PRICE_FOMR_ERRO);
		}
		RespJson rep = RespJson.success();
		rep.put("goodsPriceForm", goodsPriceForm);
		rep.put("createUserName", createUserName);
		rep.put("createUserDate", createTime);
		return rep;
	}

	/**
	 * @Description: 设置单据详情数据
	 * @param goodsPriceForm
	 * @param branchIds
	 * @return
	 * @author lijy02
	 * @date 2016年9月7日
	 */
	private GoodsPriceForm setFormData(GoodsPriceForm goodsPriceForm) {
		// 详情列表数据
		// 得到传来的详情集合
		List<GoodsPriceFormDetail> goodsPriceDetailList = goodsPriceForm
				.getGoodsPriceFormDetail();
		for (GoodsPriceFormDetail goodsPriceFormDetail : goodsPriceDetailList) {
			goodsPriceFormDetail.setId(UUIDHexGenerator.generate());
			goodsPriceFormDetail.setFormId(goodsPriceForm.getId());
			goodsPriceFormDetail.setFormNo(goodsPriceForm.getFormNo());
		}
		goodsPriceForm.setGoodsPriceFormDetail(goodsPriceDetailList);
		return goodsPriceForm;
	}

	/**
	 * @Description: 生成商品机构关联表单数据
	 * @param branchIds
	 * @param formNo
	 * @return
	 * @author lijy02
	 * @date 2016年9月6日
	 */
	private List<GoodsPriceFormBranch> setGoodsPriceFormBranch(
			String branchIds, String formNo) {
		// 关联表数据
		// 机构是逗号隔开
		String[] branchId = branchIds.split(",");
		List<String> listId = new ArrayList<String>();
		for (String string : branchId) {
			listId.add(string);
		}
		List<GoodsPriceFormBranch> goodsPriceFormBranchList = new ArrayList<GoodsPriceFormBranch>();
		for (String id : listId) {
			GoodsPriceFormBranch goodsPriceFormBranch = new GoodsPriceFormBranch();
			goodsPriceFormBranch.setId(UUIDHexGenerator.generate());
			goodsPriceFormBranch.setFormNo(formNo);
			goodsPriceFormBranch.setBranchId(id);
			goodsPriceFormBranchList.add(goodsPriceFormBranch);
		}
		return goodsPriceFormBranchList;
	}

	/**
	 * @Description: 修改调价单据详情信息
	 * @param goodsPriceForm
	 * @param validate
	 * @param goodsPriceFormBranch
	 * @return
	 * @author lijy02
	 * @date 2016年8月6日
	 */
	@RequestMapping(value = "/updateForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson updateForm(@Valid GoodsPriceForm goodsPriceForm,
			BindingResult validate, String branchIds) {
		try {
			LOG.debug("新增调价单 ：goodsPriceForm=" + goodsPriceForm);
			// 验证
			if (validate.hasErrors()) {
				String errorMessage = validate.getFieldError()
						.getDefaultMessage();
				LOG.warn("validate errorMessage:" + errorMessage);
				return RespJson.error(errorMessage);
			}
			// 得到单据商品集合信息
			List<GoodsPriceFormDetail> goodsPriceDetailList = goodsPriceForm
					.getGoodsPriceFormDetail();
			// 用户数据
			SysUser user = UserUtil.getCurrentUser();
			if (user != null) {
				goodsPriceForm.setUpdateUserId(user.getId());
				goodsPriceForm.setUpdateTime(new Date());
			}
			// 设置商品价格单据信息
			goodsPriceForm = setFormData(goodsPriceForm);
			// 生成商品机构关联表单数据
			List<GoodsPriceFormBranch> goodsPriceFormBranchList = setGoodsPriceFormBranch(
					branchIds, goodsPriceForm.getFormNo());
			// 修改单据
			goodsPriceAdustService.updateForm(goodsPriceForm,
					goodsPriceDetailList, goodsPriceFormBranchList);
		} catch (Exception e) {
			LOG.error(GoodsPriceFormConst.UPDATE_GOODS_PRICE_FOMR_ERRO, e);
			RespJson respJson = RespJson
					.error(GoodsPriceFormConst.UPDATE_GOODS_PRICE_FOMR_ERRO);
			return respJson;
		}
		RespJson rep = RespJson.success();
		rep.put("goodsPriceForm", goodsPriceForm);
		return rep;
	}

	/**
	 * @Description: 详情跟修改调价单据
	 * @param formNo 单号
	 * @param model
	 * @return
	 * @author lijy02
	 * @date 2016年8月8日
	 */
	@RequestMapping(value = "/getForm", method = RequestMethod.GET)
	public String getForm(String formNo, Model model) {
		// 根据formNo查询单据
		GoodsPriceForm goodsPriceForm = goodsPriceAdustService
				.queryFormInCheck(formNo);
		List<GoodsPriceFormBranch> goodsPriceFormBranch = goodsPriceAdustService
				.queryPriceFormBranch(formNo);
		StringBuilder branchId = new StringBuilder();
		StringBuilder branchName = new StringBuilder();
		if (!ListUtils.isEmptyList(goodsPriceFormBranch)) {
			for (int i = 0; i < goodsPriceFormBranch.size(); i++) {
				if (i != goodsPriceFormBranch.size() - 1) {
					branchId.append(goodsPriceFormBranch.get(i).getBranchId()
							+ ",");
					branchName.append(goodsPriceFormBranch.get(i)
							.getBranchName() + ",");
				} else {
					branchId.append(goodsPriceFormBranch.get(i).getBranchId());
					branchName.append(goodsPriceFormBranch.get(i)
							.getBranchName());
				}
			}
		}
		model.addAttribute("goodsPriceForm", goodsPriceForm);
		model.addAttribute("branchId", branchId);
		model.addAttribute("branchName", branchName);
		return "goods/addModifyPriceOrder";
	}

	/**
	 * @Description: 根据单号进入详情页面
	 * @param formNo 单号
	 * @param model
	 * @return
	 * @author lijy02
	 * @date 2016年8月8日
	 */
	@RequestMapping(value = "/showDetail", method = RequestMethod.GET)
	public String showDetail(String formNo, Model model) {
		// 根据formNo查询单据
		GoodsPriceForm goodsPriceForm = goodsPriceAdustService
				.queryFormInCheck(formNo);
		// 根据formNo查询调价单详情
		List<GoodsPriceFormBranch> goodsPriceFormBranch = goodsPriceAdustService
				.queryPriceFormBranch(formNo);
		StringBuffer branchId = new StringBuffer();
		// 显示code+name组合
		StringBuffer branchName = new StringBuffer();
		String branchAreaCode = goodsPriceForm.getBranchAreaCode();
		String branchAreaCodeName = Constant.CUSTOM;
		if (StringUtils.isNotEmpty(branchAreaCode)) {
			branchAreaCodeName = "[" + branchAreaCode + "]"
					+ goodsPriceForm.getBranchAreaName();
		}
		if (!ListUtils.isEmptyList(goodsPriceFormBranch)) {
			for (int i = 0; i < goodsPriceFormBranch.size(); i++) {
				if (i != goodsPriceFormBranch.size() - 1) {
					branchId.append(goodsPriceFormBranch.get(i).getBranchId()
							+ ",");
					branchName
							.append("["
									+ goodsPriceFormBranch.get(i)
											.getBranchCode()
									+ "]"
									+ goodsPriceFormBranch.get(i)
											.getBranchName() + ",");
				} else {
					branchId.append(goodsPriceFormBranch.get(i).getBranchId());
					branchName.append("["
							+ goodsPriceFormBranch.get(i).getBranchCode() + "]"
							+ goodsPriceFormBranch.get(i).getBranchName());
				}
			}
		}
		model.addAttribute("goodsPriceForm", goodsPriceForm);
		model.addAttribute("branchId", branchId);
		model.addAttribute("branchAreaCodeName", branchAreaCodeName);
		model.addAttribute("branchName", branchName);
		return "goods/addModifyPriceOrder";
	}

	/**
	 * @Description: 单据审核 1.修改调价单据状态值 2.修改店铺商品价格
	 * @param formNo
	 * @param status
	 * @return
	 * @author lijy02
	 * @date 2016年8月22日
	 */
	@RequestMapping(value = "/checkForm")
	@ResponseBody
	public RespJson checkForm(String formNo, Integer status, String effectDate) {
		try {
			// 判断获得的生效时间是否为null 生效时间是空说明生效时间小于所填时间 要返回给用户错误信息
			if (StringUtils.isEmpty(effectDate)) {
				return RespJson.error(GoodsPriceFormConst.EFFECTDATE_NOT_NULL);
			}
			Date date = DateUtils.parse(effectDate, DateUtils.DATE_SMALL_STR_R);
			// 根据单号获取订单信息
			GoodsPriceForm goodsPriceForm = goodsPriceAdustService
					.queryFormByFormNo(formNo, date);
			if (goodsPriceForm == null) {
				LOG.error(GoodsPriceFormConst.FORM_NOT_SAVE);
				return RespJson.error(GoodsPriceFormConst.FORM_NOT_SAVE);
			}
			goodsPriceForm.setStatus(status);
			// 获取当前用户
			SysUser user = UserUtil.getCurrentUser();
			String updateUserId = "";
			if (user != null) {
				updateUserId = user.getId();
				goodsPriceForm.setValidUserId(user.getId());
				goodsPriceForm.setUpdateUserId(updateUserId);
			} else {
				return RespJson.error("获取用户信息失败");
			}
			goodsPriceAdustService.checkForm(goodsPriceForm);
		} catch (Exception e) {
			LOG.error(GoodsPriceFormConst.UPDATE_GOODS_PRICE_ERRO, e);
			return RespJson.error(GoodsPriceFormConst.UPDATE_GOODS_PRICE_ERRO);
		}
		RespJson resp = RespJson.success();
		resp.put("formNo", formNo);
		resp.put("status", Constant.CHECK_STATUS);
		return resp;
	}

	/**
	 * @Description: 打开导入页面
	 * @return
	 * @author lijy02
	 * @date 2016年8月30日
	 */
	@RequestMapping("/importView")
	public String importView() {
		return "/component/importdetail";
	}

	/**
	 * @Description: 导出明细
	 * @param formNo 单号
	 * @return
	 * @author lijy02
	 * @date 2016年8月29日
	 */
	@RequestMapping(value = "exportList")
	public void exportList(HttpServletResponse response, String formNo) {
		LOG.info("GoodsPriceAdjustController:exportList:" + formNo);
		try {
			List<GoodsPriceFormDetail> exportList = goodsPriceAdustService
					.queryDetailsByFormNo(formNo);
			// 导出文件名称，不包括后缀名
			String fileName = "调价单" + "_" + DateUtils.getCurrSmallStr();
			// 模板名称，包括后缀名
			String templateName = ExportExcelConstant.GOODS_PRICE_ADJUST_FORM;
			// 导出Excel
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("GoodsPriceAdjustController:exportList:", e);
		}
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.common.controller.BasePrintController#getPrintReplace(java.lang.String)
	 */
	@Override
	protected Map<String, Object> getPrintReplace(String formNo) {
		Map<String, Object> replaceMap = new HashMap<String, Object>();
		GoodsPriceForm goodsPriceForm = goodsPriceAdustService
				.queryFormByFormNo(formNo);
		List<GoodsPriceFormBranch> goodsPriceFormBranch = goodsPriceAdustService
				.queryPriceFormBranch(formNo);
		// 调价单机构名显示
		StringBuffer branchName = new StringBuffer();
		if (!ListUtils.isEmptyList(goodsPriceFormBranch)) {
			for (int i = 0; i < goodsPriceFormBranch.size(); i++) {
				if (i != goodsPriceFormBranch.size() - 1) {
					branchName.append(goodsPriceFormBranch.get(i)
							.getBranchName() + ",");
				} else {
					branchName.append(goodsPriceFormBranch.get(i)
							.getBranchName());
				}
			}
		}
		if (goodsPriceForm != null) {
			// 调价设置显示
			StringBuffer priceSet = new StringBuffer();
			// if (goodsPriceForm.getIsModifyDcPrice() == 1) {
			// priceSet.append("	配送价	");
			// }
			// if (goodsPriceForm.getIsModifyPurPrice() == 1) {
			// priceSet.append("	采购价	");
			// }
			// if (goodsPriceForm.getIsModifySalePrice() == 1) {
			// priceSet.append("	销售价	");
			// }
			// if (goodsPriceForm.getIsModifyVipPrice() == 1) {
			// priceSet.append("	会员价	");
			// }
			// if (goodsPriceForm.getIsModifyWsPrice() == 1) {
			// priceSet.append("	配送价	");
			// }
			replaceMap.put("_单号", goodsPriceForm.getFormNo());
			replaceMap.put("_区域", goodsPriceForm.getBranchAreaName());
			replaceMap.put("_生效日期", goodsPriceForm.getEffectDate());
			replaceMap.put("_分店列表", branchName != null ? branchName : "");
			replaceMap.put(
					"_备注",
					goodsPriceForm.getRemark() != null ? goodsPriceForm
							.getRemark() : "");
			replaceMap.put(
					"_制单人员",
					goodsPriceForm.getCreateUserName() != null ? goodsPriceForm
							.getCreateUserName() : "");
			replaceMap.put("_制单日期", goodsPriceForm.getCreateTime());
			replaceMap.put(
					"_审核人员",
					goodsPriceForm.getValidUserName() != null ? goodsPriceForm
							.getValidUserName() : "");
			replaceMap.put(
					"_审核日期",
					goodsPriceForm.getValidTime() != null ? goodsPriceForm
							.getValidTime() : "");
			replaceMap.put("_调价设置", priceSet);
		}
		return replaceMap;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.common.controller.BasePrintController#getPrintDetail(java.lang.String)
	 */
	@Override
	protected List<GoodsPriceFormDetail> getPrintDetail(String formNo) {
		// 根据formNo得到详情数据
		List<GoodsPriceFormDetail> goodsPriceFormDetailList = goodsPriceAdustService
				.queryDetailsByFormNo(formNo);
		return goodsPriceFormDetailList;
	}
}
