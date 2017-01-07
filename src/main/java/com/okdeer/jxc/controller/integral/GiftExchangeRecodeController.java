/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhongy
 *@Date: 2016年12月30日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.integral;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.integral.gift.entity.GiftExchangeRecord;
import com.okdeer.jxc.integral.gift.qo.GiftExchangeRecordQo;
import com.okdeer.jxc.integral.user.service.GiftExchangeRecordServiceApi;

/**
 * ClassName: GiftManagerController 
 * @Description: 积分礼品兑换记录Controller
 * @author zhongy
 * @date 2016年12月30日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *   进销存2.1.0	
 */
@Controller
@RequestMapping("integral/giftExchangeRecode")
public class GiftExchangeRecodeController extends BaseController<GiftExchangeRecodeController> {

	@Reference(version = "1.0.0", check = false)
	private GiftExchangeRecordServiceApi giftExchangeRecordServiceApi;

	
	/**
	 * @Description: 积分礼品管理跳转页面
	 * @return
	 * @author zhongy
	 * @date 2016年12月30日
	 */
	@RequestMapping(value = "view")
	public String view() {
		return "integral/exchangeRecodeList";
	}

	/**
	 * @Description: 积分礼品兑换记录查询
	 * @param qo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author zhongy
	 * @date 2016年12月30日
	 */
	@RequestMapping(value = "getList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GiftExchangeRecord> getList(GiftExchangeRecordQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			LOG.debug("积分礼品兑换记录类别查询参数:{}", qo);
			// 当前机构
			if (qo.getEndTime() != null) {
				qo.setEndTime(DateUtils.getNextDay(qo.getEndTime()));
			}
			qo.setBranchCompleCode(getCurrBranchCompleCode());
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			PageUtils<GiftExchangeRecord> pageList = giftExchangeRecordServiceApi.queryPageByParams(qo);
			return pageList;
		} catch (Exception e) {
			LOG.error("积分礼品兑换记录类别查询异常:", e);
		}
		return PageUtils.emptyPage();
	}

	
	/**
	 * 
	 * @Description: 积分礼品兑换记录导出报表
	 * @param response
	 * @param vo
	 * @return
	 * @author dongh
	 * @date 2016年8月25日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportList(HttpServletResponse response, GiftExchangeRecordQo qo) {

		LOG.info("UserController.exportList start ,parameter vo=" + qo);
		try {
			if (qo.getEndTime() != null) {
				qo.setEndTime(DateUtils.getNextDay(qo.getEndTime()));
			}
			qo.setBranchCompleCode(getCurrBranchCompleCode());
			List<GiftExchangeRecord> list = giftExchangeRecordServiceApi.queryListByParams(qo);
			if(CollectionUtils.isNotEmpty(list)){
				String fileName = "积分礼品兑换记录报表" + "_" + DateUtils.getCurrSmallStr();
				String templateName = ExportExcelConstant.GIFT_EXCHANGE_RECODE;
				exportListForXLSX(response, list, fileName, templateName);
			}else{
				RespJson json = RespJson.error("无数据可导");
				return json;
			}
		} catch (Exception e) {
			LOG.error("UserController.exportList Exception:", e);
			RespJson json = RespJson.error("导出失败");
			return json;
		}
		return null;
	}
}
