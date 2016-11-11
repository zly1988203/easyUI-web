/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年11月10日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.sale;

import java.sql.Time;
import java.util.Date;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.UUIDHexGenerator;
import com.okdeer.jxc.form.purchase.service.PurchaseFormServiceApi;
import com.okdeer.jxc.sale.activity.service.ActivityMainServiceApi;
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
	
	@RequestMapping(value = "save")
	@ResponseBody
	public RespJson save() {
		formServiceApi.selectDetail("123");
		
		SysUser user = UserUtil.getCurrentUser();
		Date now = new Date();
		
		ActivityMain main = new ActivityMain();
		main.setId(UUIDHexGenerator.generate());
		main.setActivityName("自动生成-测试活动");
		main.setActivityCode("test");
		main.setActivityStatus(0);
		main.setActivityType(0);
		
		main.setDailyStartTime(Time.valueOf("00:00:00"));
		main.setDailyEndTime(Time.valueOf("23:59:59"));
		main.setDisabled(0);
		main.setStartTime(new Date());
		main.setEndTime(new Date());
		main.setWeeklyActivityDay("1234567");
		
		main.setCreateUserId(user.getId());
		main.setCreateTime(now);
		main.setUpdateUserId(user.getId());
		main.setUpdateTime(now);
		
		mainServiceApi.save(main);
		
		return RespJson.success();
	}
	
}
