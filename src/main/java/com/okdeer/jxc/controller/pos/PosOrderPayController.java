/** 
 *@Project: okdeer-jxc-web 
 *@Author: liux01
 *@Date: 2017年1月4日 
 *@Copyright: ©2014-2020 www.yschome.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.pos;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.pos.service.PosOrderServiceApi;


/**
 * ClassName: PosOrderPayController 
 * @Description: TODO
 * @author liux01
 * @date 2017年1月4日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("pos/orderPay")
public class PosOrderPayController extends BaseController<PosOrderPayController> {
	
	@Reference(version = "1.0.0", check = false)
	private PosOrderServiceApi posOrderServiceApi;
	/**
	 * 
	 * @Description: pos订单处理页面
	 * @param model
	 * @return
	 * @author liux01
	 * @date 2017年1月4日
	 */
	@RequestMapping(value = "view")
	public String view(Model model) {
		return "pos/orderPay";
	}
	/**
	 * 
	 * @Description: 更新pos财务系统支付成功，但是零售系统回滚的订单信息
	 * @param orderNo  订单号
	 * @return
	 * @author liux01
	 * @date 2017年1月4日
	 */
	@RequestMapping(value = "updateTradeOrderInfo", method = RequestMethod.POST)
	@ResponseBody
	public RespJson updateTradeOrderInfo(String orderNo){
		RespJson resp;
		try {
			resp = posOrderServiceApi.updateTradeOrderInfo(orderNo);
		} catch (Exception e) {
			LOG.error("更新pos订单信息异常:{}", e);
			resp = RespJson.error("更新pos订单信息失败");
		}
		return resp;
	}

}
