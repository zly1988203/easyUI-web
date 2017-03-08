/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年3月7日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.purchase;  

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.gson.GsonUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.purchase.po.PurchaseGuideGoodsPo;
import com.okdeer.jxc.form.purchase.qo.PurchaseGuideQo;
import com.okdeer.jxc.form.purchase.service.PurchaseGuideService;


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
	public String guideForm() {
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
	@RequestMapping(value = "toGuideGoodsList")
	public String guideGoodsList(PurchaseGuideQo qo, Model model) {
		LOG.info("第一步条件筛选信息：{}", qo);
		
		qo.setBranchId("080b1000156211e689240050569e21f2");
		qo.setGuideType(1);
		
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
	public String guideOrderList() {
		return "form/purchase/guide/guideOrderList";
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
			return purchaseGuideService.getGoodsList(qo);
		} catch (Exception e) {
			LOG.error("获取采购向导商品清单异常:", e);
		}
		return PageUtils.emptyPage();
	}
	
	

}
