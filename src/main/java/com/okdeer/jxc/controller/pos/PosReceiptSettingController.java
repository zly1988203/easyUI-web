/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2017年5月19日 
 *@Copyright: ©2014-2020 www.yschome.com Inc. All rights reserved. 
 */
package com.okdeer.jxc.controller.pos;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.enums.DisabledEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.UuidUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.pos.entity.PosReceiptSetting;
import com.okdeer.jxc.pos.service.PosReceiptSettingApi;
import com.okdeer.jxc.pos.vo.PosReceiptSettingVo;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: PosReceiptSettingController 
 * @Description: 小票设置controller
 * @author zhangchm
 * @date 2017年5月19日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("pos/posReceiptSetting")
public class PosReceiptSettingController extends BaseController<PosReceiptSettingController> {
	
	@Reference(version = "1.0.0", check = false)
	private PosReceiptSettingApi posReceiptSettingApi;

	/**
	 * @Description: 添加修改小票设置
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author zhangchm
	 * @date 2017年5月19日
	 */
	@RequestMapping(value = "saveOrUpdatePosReceiptSetting", method = RequestMethod.POST)
	@ResponseBody
	public RespJson saveOrUpdatePosReceiptSetting(PosReceiptSettingVo vo) {
		RespJson respJson = null;
		try {
			PosReceiptSetting posReceiptSetting = posReceiptSettingApi.queryPosReceiptSettingByBranchId(vo.getBranchId());
			// 为空添加
			if (posReceiptSetting == null) {
				vo.setId(UuidUtils.getUuid());
				vo.setCreateUserId(UserUtil.getCurrUserId());
				vo.setCreateTime(DateUtils.getCurrDate());
				vo.setDisabled(DisabledEnum.NO.getIndex());
				respJson = posReceiptSettingApi.insertPosReceiptSetting(vo);
			} else {
				vo.setUpdateUserId(UserUtil.getCurrUserId());
				vo.setUpdateTime(DateUtils.getCurrDate());
				respJson = posReceiptSettingApi.updatePosReceiptSetting(vo);
			}
			
		} catch (Exception e) {
			LOG.error("添加小票设置异常:{}", e);
			respJson = RespJson.error("添加小票设置异常!");
		}
		return respJson;
	}
	
	/**
	 * @Description: 查询小票设置
	 * @param vo
	 * @return   
	 * @return PosReceiptSetting  
	 * @throws
	 * @author zhangchm
	 * @date 2017年5月19日
	 */
	@RequestMapping(value = "queryPosReceiptSettingByBranchId", method = RequestMethod.POST)
	@ResponseBody
	public PosReceiptSetting queryPosReceiptSettingByBranchId(PosReceiptSettingVo vo){
		PosReceiptSetting posReceiptSetting = new PosReceiptSetting();
		try {
			posReceiptSetting = posReceiptSettingApi.queryPosReceiptSettingByBranchId(vo.getBranchId());
		} catch (Exception e) {
			LOG.error("查询小票设置异常:{}", e);
		}
		return posReceiptSetting;
	}
}
