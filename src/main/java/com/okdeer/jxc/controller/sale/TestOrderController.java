/** 
 *@Project: okdeer-jxc-pos 
 *@Author: xiaoj02
 *@Date: 2016年11月18日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.sale;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.exception.BusinessException;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.FastJsonUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.common.RequestJson;
import com.okdeer.jxc.pos.service.PosOrderServiceApi;
import com.okdeer.jxc.pos.vo.PosPayVo;
import com.okdeer.jxc.pos.vo.PosPrepayVo;

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
public class TestOrderController extends BaseController<TestOrderController>{
	
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
			
			PosPrepayVo posPerpayVo = requestJson.getDataObject(PosPrepayVo.class);
			
			//参数验证
			String validMsg = posPerpayVo.validate();
			if(validMsg != null){
				return RespJson.argumentError(validMsg);
			}
			
			RespJson respJson = posOrderServiceApi.prepay(posPerpayVo, requestJson.getBranchId(), requestJson.getUserId());
			logger.debug("预支付结果：",respJson);
			
			return respJson;
		} catch (Exception e) {
			logger.error("预支付出现异常：",e);
			return RespJson.error("预支付出现异常");
		}
	}
		
	/**
	 * 支付
	 * @param jsonText
	 * @author xiaoj02
	 * @date 2016年11月29日
	 */
	@RequestMapping(value = "pay", method = RequestMethod.POST)
	@ResponseBody
	public RespJson pay(@RequestBody String jsonText) {
		//校验数据
		try {
			logger.debug("json:{}",jsonText);
			//转换Json数据
			RequestJson requestJson = buildRequestParam(jsonText);
			
			PosPayVo posPayVo = requestJson.getDataObject(PosPayVo.class);
			
			//参数验证
			String validMsg = posPayVo.validate();
			if(validMsg != null){
				return RespJson.argumentError(validMsg);
			}
			
			posPayVo.setBranchId(requestJson.getBranchId());
			posPayVo.setUserId(requestJson.getUserId());
			
			ServletRequestAttributes requestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
			HttpServletRequest request = requestAttributes.getRequest();
			
			posPayVo.setIp(getIpAddress(request));
			posPayVo.setBranchCode(requestJson.getBranchCode());
			posPayVo.setMachineCode(requestJson.getMachinecode());
			posPayVo.setPosNo(requestJson.getPosNo());
			
			RespJson respJson = posOrderServiceApi.pay(posPayVo);
			logger.debug("支付结果：",respJson);
			
			return respJson;
		} catch (BusinessException e) {
			logger.error("支付出现业务异常：",e);
			return RespJson.businessError(e.getMessage());
		} catch (InterruptedException e) {
			logger.error("支付出现线程异常：",e);
			return RespJson.error(e.getMessage());
		} catch (Exception e) {
			logger.error("支付出现异常：",e);
			return RespJson.error(e.getMessage());
		}
	}
	
	/**
	 * 获取用户真实IP地址，不使用request.getRemoteAddr();的原因是有可能用户使用了代理软件方式避免真实IP地址,
	 * 
	 * 可是，如果通过了多级反向代理的话，X-Forwarded-For的值并不止一个，而是一串IP值，究竟哪个才是真正的用户端的真实IP呢？
	 * 答案是取X-Forwarded-For中第一个非unknown的有效IP字符串。
	 * 
	 * 如：X-Forwarded-For：192.168.1.110, 192.168.1.120, 192.168.1.130,
	 * 192.168.1.100
	 * 
	 * 用户真实IP为： 192.168.1.110
	 * 
	 * @param request
	 * @return
	 */
	public static String getIpAddress(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_CLIENT_IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		if (ip.indexOf(",") > -1) {
			ip = ip.substring(0, ip.indexOf(","));
		}
		return ip;
	}
	
}
