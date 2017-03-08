/** 
 *@Project: okdeer-jxc-web 
 *@Author: liux01
 *@Date: 2017年3月6日 
 *@Copyright: ©2014-2020 www.yschome.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.goods;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.goods.entity.GoodsPriceFormAll;
import com.okdeer.jxc.goods.qo.GoodsBranchPriceAdjustQo;
import com.okdeer.jxc.goods.service.GoodsBranchPriceAdjustService;
import com.okdeer.jxc.goods.vo.GoodsBranchPriceAdjustVo;
import com.okdeer.jxc.goods.vo.GoodsPriceFormConst;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;


/**
 * ClassName: GoodsBranchPriceAdjustController 
 * @Description: TODO
 * @author liux01
 * @date 2017年3月6日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("goods/branchPriceAdjust")
public class GoodsBranchPriceAdjustController extends BaseController<GoodsBranchPriceAdjustController> {

	@Reference(version="1.0.0",check=false)
	private GoodsBranchPriceAdjustService goodsBranchPriceAdjustService;
	/**
	 * 
	 * @Description: TODO
	 * @return
	 * @author liux01
	 * @date 2017年3月6日
	 */
	@RequestMapping(value = "list")
	public String list() {
		return "goods/branchPriceAdjust/list";
	}
	/**
	 * 
	 * @Description: 获取店铺商品调价单列表信息
	 * @param vo 入参
	 * @param pageNumber 页数
	 * @param pageSize 每页显示数
	 * @return
	 * @author liux01
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "getGoodsBranchPriceAdjustList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsBranchPriceAdjustVo> getGoodsBranchPriceAdjustList(
			GoodsBranchPriceAdjustQo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
			PageUtils<GoodsBranchPriceAdjustVo> list = goodsBranchPriceAdjustService.getGoodsBranchPriceAdjustList(vo);
			return list;
		} catch (Exception e) {
			LOG.error("获取滞销信息列表信息异常:{}", e);
		}
		return null;
	}
	/**
	 * 
	 * @Description: 跳转到新增页面
	 * @param model
	 * @param request
	 * @return
	 * @author liux01
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "/addFormView", method = RequestMethod.GET)
	public String addFormView(Model model, HttpServletRequest request) {
		model.addAttribute("branchId", UserUtil.getCurrentUser().getBranchId());
		model.addAttribute("branchName", UserUtil.getCurrentUser().getBranchName());
		return "goods/branchPriceAdjust/addModifyBranchPrice";
	}
	
	@RequestMapping(value = "/saveForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson saveForm(@RequestBody String data) {
		try {
			if (StringUtils.isNotEmpty(data)) {
				SysUser user = UserUtil.getCurrentUser();
				GoodsPriceFormAll  goodsPriceFormAll = JSON.parseObject(data, GoodsPriceFormAll.class);
				if (goodsPriceFormAll != null) {
					return goodsBranchPriceAdjustService.saveForm(goodsPriceFormAll,user);
				} else {
					RespJson rep = RespJson.error("保存数据不能为空！");
					return rep;
				}
			} else {
				RespJson rep = RespJson.error("保存数据不能为空！");
				return rep;
			}
			/*SysUser user = UserUtil.getCurrentUser();
			if (user == null) {
				RespJson rep = RespJson.error("用户不能为空！");
				return rep;
			}
			// 生成uuid主键
			String formId = UUIDHexGenerator.generate();
			// 货号
			formNo = orderNoUtils.getOrderNo(FormType.PC.name(), getCurrBranchCode());
			goodsPriceForm.setId(formId);
			// 单据数据设置
			goodsPriceForm.setFormType(FormType.PC.name());
			goodsPriceForm.setFormNo(formNo);
			// 判断是否生效
			goodsPriceForm.setIsEffected(Constant.ZERO_STR);
			// 用户数据
			goodsPriceForm.setCreateUserId(user.getId());
			createUserName = user.getUserName();
			goodsPriceForm.setCreateUserName(createUserName);
			goodsPriceForm.setCreateBranchId(user.getBranchId());
			goodsPriceForm.setCreateBranchCode(user.getBranchCode());
			goodsPriceForm.setCreateTime(new Date());
			goodsPriceForm.setStatus(Constant.ZERO);
			// 设置商品价格单据信息
			goodsPriceFormDetailList = setFormData(goodsPriceForm, goodsPriceFormDetailList);
			// 生成商品机构关联表单数据
			List<GoodsPriceFormBranch> goodsPriceFormBranchList = setGoodsPriceFormBranch(branchIds, formNo);
			// 新增单据
			goodsPriceAdustService.addForm(goodsPriceForm, goodsPriceFormDetailList, goodsPriceFormBranchList);*/
		} catch (Exception e) {
			LOG.error(GoodsPriceFormConst.ADD_GOODS_PRICE_FOMR_ERRO, e);
			return RespJson.error(GoodsPriceFormConst.ADD_GOODS_PRICE_FOMR_ERRO);
		}
		/*RespJson rep = RespJson.success();
		// 需要返回到页面上的数据
		formNo = goodsPriceForm.getFormNo();
		createTime = DateUtils.getCurrSmallRStr();
		rep.put("goodsPriceForm", goodsPriceForm);
		rep.put("createUserName", createUserName);
		rep.put("createUserDate", createTime);*/
	}
}
