/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年3月7日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.purchase;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.gson.GsonUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.purchase.po.PurchaseGuideGoodsPo;
import com.okdeer.jxc.form.purchase.po.PurchaseGuideOrderPo;
import com.okdeer.jxc.form.purchase.qo.PurchaseGuideQo;
import com.okdeer.jxc.form.purchase.service.PurchaseGuideService;
import com.okdeer.jxc.form.purchase.vo.PurchaseGuideGoodsVo;

/**
 * ClassName: PurchaseGuideController 
 * @Description: 采购向导Controller
 * @author liwb
 * @date 2017年3月7日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@Controller
@RequestMapping("form/purchaseGuide")
public class PurchaseGuideController extends BaseController<PurchaseGuideController> {

	@Reference(version = "1.0.0", check = false)
	private PurchaseGuideService purchaseGuideService;

	/**
	 * @Description: 第一步，条件筛选页面
	 * @return
	 * @author liwb
	 * @date 2017年3月8日
	 */
	@RequestMapping(value = "toGuideForm")
	public String guideForm(PurchaseGuideQo qo, Model model) {
		LOG.info("第一步默认条件筛选信息：{}", qo);
		String formData = GsonUtils.toJson(qo);

		model.addAttribute("formData", formData);
		return "form/purchase/guide/guideForm";
	}

	/**
	 * @Description: 第二步，商品清单确认页面
	 * @param qo
	 * @param model
	 * @return
	 * @author liwb
	 * @date 2017年3月8日
	 */
	@RequestMapping(value = "toGuideGoodsList", method = RequestMethod.POST)
	public String guideGoodsList(PurchaseGuideQo qo, Model model) {
		LOG.info("第一步条件筛选信息：{}", qo);

		String formData = GsonUtils.toJson(qo);

		model.addAttribute("formData", formData);

		return "form/purchase/guide/guideGoodsList";
	}

	/**
	 * @Description: 第三步，采购订单管理页面
	 * @return
	 * @author liwb
	 * @date 2017年3月8日
	 */
	@RequestMapping(value = "toGuideOrderList")
	public String toGuideOrderList(String guideNo, Model model) {
		LOG.info("跳转到第三步采购订单列表页，采购向导批次号：{}", guideNo);
		model.addAttribute("guideNo", guideNo);
		return "form/purchase/guide/guideOrderList";
	}
	
	/**
	 * @Description: 生成采购订单数据
	 * @param dataList
	 * @return
	 * @author liwb
	 * @date 2017年3月9日
	 */
	@RequestMapping(value = "generFormList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson generFormList(@RequestBody String dataList) {
		
		RespJson respJson = RespJson.error();
		
		LOG.info("采购向导生成采购订单数据参数：{}", dataList);
		
		try {
			List<PurchaseGuideGoodsVo> goodsVoList = GsonUtils.fromJsonList(dataList, PurchaseGuideGoodsVo.class);
			
			respJson = purchaseGuideService.generPurchaseFormList(goodsVoList, getCurrentUser());
			if(!respJson.isSuccess()){
				LOG.error(respJson.getMessage());
			}else{
				LOG.info("采购向导批次号为：{}", respJson.getData().toString());
			}
		} catch (Exception e) {
			LOG.error("生成采购订单失败：", e);
		}
		
		return respJson;
	}

	/**
	 * @Description: 第二部，获取商品清单列表
	 * @param qo
	 * @return
	 * @author liwb
	 * @date 2017年3月8日
	 */
	@RequestMapping(value = "getGoodsList")
	@ResponseBody
	public PageUtils<PurchaseGuideGoodsPo> getGoodsList(PurchaseGuideQo qo) {
		LOG.info("获取采购向导商品清单条件信息：{}", qo);
		try {
			// 必填参数
			if(StringUtils.isBlank(qo.getBranchId()) || qo.getBranchType()==null){
				LOG.error("机构信息为空，系统异常！");
			}
			return purchaseGuideService.getGoodsList(qo);
		} catch (Exception e) {
			LOG.error("获取采购向导商品清单异常:", e);
		}
		return PageUtils.emptyPage();
	}
	
	/**
	 * @Description: 第三步，获取采购向导生成的订单数据
	 * @param guideNo
	 * @return
	 * @author liwb
	 * @date 2017年3月10日
	 */
	@RequestMapping(value = "getOrderList")
	@ResponseBody
	public PageUtils<PurchaseGuideOrderPo> getOrderList(String guideNo) {
		LOG.info("获取采购向导订单列表向导批次号：{}", guideNo);
		try {
			return purchaseGuideService.getGuideOrderList(guideNo);
		} catch (Exception e) {
			LOG.error("获取采购向导商品清单异常:", e);
		}
		return PageUtils.emptyPage();
	}
	

}
