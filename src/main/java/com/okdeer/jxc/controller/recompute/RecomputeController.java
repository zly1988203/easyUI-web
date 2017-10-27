/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhengwj
 *@Date: 2017年10月26日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.recompute;

import java.util.List;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.common.utils.UuidUtils;
import com.okdeer.retail.common.exception.BizException;
import com.okdeer.retail.facade.stock.facade.StockRcFacade;
import com.okdeer.retail.facade.stock.vo.StockRcMainVo;

/**
 * ClassName: RecomputeController 
 * @Description: 日结数据修复controller
 * @author zhengwj
 * @date 2017年10月26日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@RestController
@RequestMapping("/recompute")
public class RecomputeController {

	/**
	 * LOG
	 */
	private final Logger logger = LoggerFactory.getLogger(RecomputeController.class);

	/**
	 * @Fields stockRcFacade : 库存重算接口
	 */
	@Reference(version = "1.0.0", check = false)
	private StockRcFacade stockRcFacade;

	/**
	 * @Description: 重算页面
	 * @author zhengwj
	 * @date 2017年10月26日
	 */
	@RequiresPermissions("JxcRecompute:handler")
	@RequestMapping(value = "/list")
	public ModelAndView list() {
		return new ModelAndView("/recompute/list");
	}

	/**
	 * @Description: 库存重算
	 * @author zhengwj
	 * @date 2017年10月26日
	 */
	@RequiresPermissions("JxcRecompute:handler")
	@RequestMapping(value = "/handler", method = RequestMethod.POST)
	@ResponseBody
	public RespJson handler(String data) {
		RespJson respJson = RespJson.success();
		try {
			StockRcMainVo mainVo = JSON.parseObject(data, StockRcMainVo.class);
			mainVo.setLogId(UuidUtils.getUuid());
			new Thread() {

				@Override
				public void run() {
					try {
						stockRcFacade.recalculateStock(mainVo);
					} catch (BizException e) {
						logger.error("异步调用库存重算异常:", e);
					}
				}
			}.start();
			respJson.setData(mainVo.getLogId());
		} catch (Exception e) {
			logger.error("库存重算异常:", e);
			respJson = RespJson.error("库存重算失败！");
		}
		return respJson;
	}

	/**
	 * @Description: 获取日志列表
	 * @author zhengwj
	 * @date 2017年10月26日
	 */
	@RequestMapping(value = "getLogList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson getLogList(String logId, int pageIndex, int pageSize) {
		RespJson respJson = RespJson.success();
		try {
			if (StringUtils.isBlank(logId)) {
				return RespJson.error("logId不能为空");
			}
			List<String> list = stockRcFacade.findRcLogByPage(logId, pageIndex, pageSize);

			if (CollectionUtils.isEmpty(list)) {
				return RespJson.error("查询数据为空");
			}
			respJson.setData(list);
		} catch (Exception e) {
			logger.error("获取日志列表异常:", e);
			respJson = RespJson.error("获取日志列表失败！");
		}
		return respJson;
	}

}
