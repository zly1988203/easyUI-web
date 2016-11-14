/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年11月10日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.sale;

import java.util.Date;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.UUIDHexGenerator;
import com.okdeer.jxc.form.purchase.service.PurchaseFormServiceApi;
import com.okdeer.jxc.sale.activity.service.ActivityMainServiceApi;
import com.okdeer.jxc.sale.activity.vo.ActivityVo;
import com.okdeer.jxc.sale.entity.ActivityMain;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: ActivityController 
 * @author xiaoj02
 * @date 2016年11月10日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */ 
@Controller
@RequestMapping("sale/activity")
public class ActivityController {
	
	@Reference(version = "1.0.0", check = false)
	private ActivityMainServiceApi mainServiceApi;
	
	@Reference(version = "1.0.0", check = false)
	private PurchaseFormServiceApi formServiceApi;

	@RequestMapping(value = "list")
	public String viewList() {
		return "sale/activity/list";
	}
	
	@RequestMapping(value = "add")
	public String viewAdd() {
		return "sale/activity/add";
	}
	
	@RequestMapping(value = "save", method = RequestMethod.POST)
	@ResponseBody
	public RespJson save(@RequestBody String jsonText) {
		ActivityVo activityVo = JSON.parseObject(jsonText, ActivityVo.class);
		ActivityMain main = new ActivityMain();

		BeanUtils.copyProperties(activityVo, main);
		SysUser user = UserUtil.getCurrentUser();
		Date now = new Date();
		
		main.setId(UUIDHexGenerator.generate());
		main.setActivityStatus(0);
		main.setActivityType(0);
		main.setCreateUserId(user.getId());
		main.setCreateTime(now);
		main.setUpdateUserId(user.getId());
		main.setUpdateTime(now);
		main.setDisabled(0);
		//TODO 活动编号
		main.setActivityCode("");
		
		mainServiceApi.save(main);
		
		return RespJson.success();
	}
	
}
