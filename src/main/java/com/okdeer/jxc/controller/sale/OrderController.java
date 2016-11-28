/** 
 *@Project: okdeer-jxc-pos 
 *@Author: xiaoj02
 *@Date: 2016年11月18日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.sale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.FastJsonUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.common.RequestJson;
import com.okdeer.jxc.pos.service.PosOrderServiceApi;
import com.okdeer.jxc.pos.vo.PosPerpayVo;

/**
 * POS订单controller
 * ClassName: OrderController 
 * @author xiaoj02
 * @date 2016年11月18日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@RequestMapping("order/order")
@Controller
public class OrderController extends BaseController<OrderController>{
	
	protected final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Reference(version = "1.0.0", check = false)
	private PosOrderServiceApi posOrderServiceApi;
	
	/**
	 * 跳转 到结算测试页面
	 */
	@RequestMapping(value = "posOrderTest")
	public String viewPosOrderTest() {
		return "sale/activity/posOrderTest";
	}
	
	/**
	 * @Description: 生成请求参数
	 * @param param
	 * @return
	 * @author liwb
	 * @date 2016年11月21日
	 */
	protected RequestJson buildRequestParam(String param) {
//		JSONObject jObj = JSONObject.fromObject(param);
//		JSONObject data = jObj.getJSONObject("data");
//		RequestJson requestJson = new RequestJson();
//		requestJson = JSONUtils.parseJSONObject(jObj, requestJson);
//		requestJson.setData(data);
		RequestJson requestJson = FastJsonUtils.parseObject(param, RequestJson.class);
		LOG.info("请求参数：{}", requestJson);
		return requestJson;
	}
	
	/**
	 * 预支付（结算）
	 * @param jsonText
	 * @return
	 * @author xiaoj02
	 * @date 2016年11月21日
	 */
	@RequestMapping(value = "perpay", method = RequestMethod.POST)
	@ResponseBody
	public RespJson perpay(@RequestBody String jsonText) {
		try {
			logger.debug("json:{}",jsonText);
			//转换Json数据
			RequestJson requestJson = buildRequestParam(jsonText);
			
			PosPerpayVo posPerpayVo = requestJson.getDataObject(PosPerpayVo.class);
			
			//参数验证
			String validMsg = posPerpayVo.validate();
			if(validMsg != null){
				return RespJson.argumentError(validMsg);
			}
			
			RespJson respJson = posOrderServiceApi.perpay(posPerpayVo, requestJson.getBranchId(), requestJson.getUserId());
			logger.debug("预支付结果：",respJson);
			
			return respJson;
		} catch (Exception e) {
			logger.error("预支付出现异常：",e);
			return RespJson.error("预支付出现异常");
		}
	}
		
	//支付信息
	public void pay() {
		//校验数据
		
	}
	
}
