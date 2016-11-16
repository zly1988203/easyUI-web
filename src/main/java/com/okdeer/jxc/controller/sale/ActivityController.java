/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年11月10日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.sale;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.OrderNoUtils;
import com.okdeer.jxc.common.utils.UUIDHexGenerator;
import com.okdeer.jxc.form.enums.FormType;
import com.okdeer.jxc.sale.activity.service.ActivityServiceApi;
import com.okdeer.jxc.sale.activity.vo.ActivityDetailVo;
import com.okdeer.jxc.sale.activity.vo.ActivityVo;
import com.okdeer.jxc.sale.entity.ActivityBranch;
import com.okdeer.jxc.sale.entity.ActivityDetail;
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
	
	protected final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Reference(version = "1.0.0", check = false)
	private ActivityServiceApi mainServiceApi;
	
	@Autowired
	private OrderNoUtils orderNoUtils;

	@RequestMapping(value = "list")
	public String viewList() {
		return "sale/activity/list";
	}
	
	@RequestMapping(value = "add")
	public String viewAdd() {
		return "sale/activity/add";
	}
	
	@RequestMapping(value = "edit")
	public String viewEdit(String activityId, HttpServletRequest request) {
		request.setAttribute("activityId", activityId);
		return "sale/activity/edit";
	}
	
	@RequestMapping(value = "save", method = RequestMethod.POST)
	@ResponseBody
	public RespJson save(@RequestBody String jsonText) {
		try {
			logger.debug("json:{}",jsonText);
			//转换Json数据
			ActivityVo activityVo = JSON.parseObject(jsonText, ActivityVo.class);
			
			//构建活动ActivityMain
			ActivityMain main = new ActivityMain();
			BeanUtils.copyProperties(activityVo, main);
			SysUser user = (SysUser)UserUtil.getHttpSession().getAttribute(Constant.SESSION_USER);
			Date now = new Date();
			
			main.setId(UUIDHexGenerator.generate());
			main.setActivityStatus(0);
			main.setCreateUserId(user.getId());
			main.setCreateTime(now);
			main.setUpdateUserId(user.getId());
			main.setUpdateTime(now);
			main.setDisabled(0);
			String activityCode = orderNoUtils.getOrderNo(FormType.PX + user.getBranchCode());
			main.setActivityCode(activityCode);
			
			//构建活动详情列表ActivityDetail
			List<ActivityDetail> detailList = new ArrayList<ActivityDetail>();
			List<ActivityDetailVo> listVo = activityVo.getDetailList();
			for (ActivityDetailVo activityDetailVo : listVo) {
				
				ActivityDetail activityDetail = new ActivityDetail();
				BeanUtils.copyProperties(activityDetailVo, activityDetail);

				activityDetail.setId(UUIDHexGenerator.generate());
				activityDetail.setActivityId(main.getId());
				
				detailList.add(activityDetail);
			}
			
			//构建活动店铺列表ActivityBranch
			List<ActivityBranch> branchList = new ArrayList<ActivityBranch>();
			String[] branchArray = activityVo.getBranchIds().split(",");
			for (int i = 0; i < branchArray.length; i++) {
				String branchId = branchArray[i];
				ActivityBranch activityBranch = new ActivityBranch();
				activityBranch.setId(UUIDHexGenerator.generate());
				activityBranch.setActivityId(main.getId());
				activityBranch.setBranchId(branchId);
				branchList.add(activityBranch);
			}
			
			//保存活动
			mainServiceApi.save(main, detailList, branchList);
			
		} catch (Exception e) {
			logger.error("保存活动出现异常：",e);
			return RespJson.error("保存活动出现异常");
		}
		return RespJson.success();
	}
	
	@RequestMapping(value = "update", method = RequestMethod.POST)
	@ResponseBody
	public RespJson update(@RequestBody String jsonText) {
		try {
			logger.debug("json:{}",jsonText);
			//转换Json数据
			ActivityVo activityVo = JSON.parseObject(jsonText, ActivityVo.class);
			
			//构建活动ActivityMain
			ActivityMain main = new ActivityMain();
			BeanUtils.copyProperties(activityVo, main);
			SysUser user = (SysUser)UserUtil.getHttpSession().getAttribute(Constant.SESSION_USER);
			Date now = new Date();
			
			main.setUpdateUserId(user.getId());
			main.setUpdateTime(now);
			
			//构建活动详情列表ActivityDetail
			List<ActivityDetail> detailList = new ArrayList<ActivityDetail>();
			List<ActivityDetailVo> listVo = activityVo.getDetailList();
			for (ActivityDetailVo activityDetailVo : listVo) {
				
				ActivityDetail activityDetail = new ActivityDetail();
				BeanUtils.copyProperties(activityDetailVo, activityDetail);

				activityDetail.setId(UUIDHexGenerator.generate());
				activityDetail.setActivityId(main.getId());
				
				detailList.add(activityDetail);
			}
			
			//构建活动店铺列表ActivityBranch
			List<ActivityBranch> branchList = new ArrayList<ActivityBranch>();
			String[] branchArray = activityVo.getBranchIds().split(",");
			for (int i = 0; i < branchArray.length; i++) {
				String branchId = branchArray[i];
				ActivityBranch activityBranch = new ActivityBranch();
				activityBranch.setId(UUIDHexGenerator.generate());
				activityBranch.setActivityId(main.getId());
				activityBranch.setBranchId(branchId);
				branchList.add(activityBranch);
			}
			
			//保存活动
			mainServiceApi.update(main, detailList, branchList);
			
		} catch (Exception e) {
			logger.error("保存活动出现异常：",e);
			return RespJson.error("保存活动出现异常");
		}
		return RespJson.success();
	}
	
	@RequestMapping(value = "check", method = RequestMethod.POST)
	@ResponseBody
	public RespJson check(String activityId) {
		try {
			logger.debug("审核：activityId：{}",activityId);
			SysUser user = (SysUser)UserUtil.getHttpSession().getAttribute(Constant.SESSION_USER);
			mainServiceApi.check(activityId, user.getId());
		} catch (Exception e) {
			logger.error("审核活动出现异常：",e);
			return RespJson.error("审核活动出现异常");
		}
		return RespJson.success();
	}
	
	@RequestMapping(value = "stop", method = RequestMethod.POST)
	@ResponseBody
	public RespJson stop(String activityId) {
		try {
			logger.debug("终止：activityId：{}",activityId);
			SysUser user = (SysUser)UserUtil.getHttpSession().getAttribute(Constant.SESSION_USER);
			mainServiceApi.stop(activityId, user.getId());
		} catch (Exception e) {
			logger.error("终止活动出现异常：",e);
			return RespJson.error("终止活动出现异常");
		}
		return RespJson.success();
	}
	
	@RequestMapping(value = "get", method = RequestMethod.GET)
	@ResponseBody
	public RespJson get(String activityId){
		RespJson resp = RespJson.success();
		try {
			logger.debug("查询单个活动：get：{}",activityId);
			Map<String, Object> activityMain = mainServiceApi.get(activityId);
			List<Map<String, Object>> activityBranch = mainServiceApi.getBranch(activityId);
			resp.put("obj", activityMain);
			resp.put("branch", activityBranch);
		} catch (Exception e) {
			logger.error("查询单个活动出现异常：",e);
			return RespJson.error("查询单个活动出现异常");
		}
		return resp;
	}
	
	@RequestMapping(value = "getDetail", method = RequestMethod.GET)
	@ResponseBody
	public RespJson getDetail(String activityId){
		RespJson resp = RespJson.success();
		try {
			logger.debug("查询活动详情：getDetail：{}",activityId);
			List<Map<String, Object>> activityDetail = mainServiceApi.getDetail(activityId);
			resp.put("list", activityDetail);
		} catch (Exception e) {
			logger.error("查询活动详情出现异常：",e);
			return RespJson.error("查询活动详情出现异常");
		}
		return resp;
	}
	
}
