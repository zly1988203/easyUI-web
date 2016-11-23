/** 
 *@Project: okdeer-jxc-web 
 *@Author: yangyq02
 *@Date: 2016年8月30日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.pos;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.poi.ss.formula.functions.T;
import org.apache.shiro.session.Session;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSONObject;
import com.okdeer.ca.api.sysuser.entity.SysUserItemDto;
import com.okdeer.ca.common.enums.DisabledType;
import com.okdeer.jxc.common.constant.SysConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.util.ServletUtil;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.system.service.SysUserCategoryGrantServiceApi;
import com.okdeer.jxc.system.service.SysUserServiceApi;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: SacleLogin 
 * @Description: 电子秤登录
 * @author yangyq02
 * @date 2016年8月30日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *		进销存2.0	  2016年8月18日			   yangyq02			     电子秤登录
 */
@Controller
@RequestMapping("pos/user")
public class PosUserController extends BaseController<T> {

	@Reference(version = "1.0.0", check = false)
	com.okdeer.ca.api.sysuser.service.ISysUserApi userApi;

	@Reference(version = "1.0.0", check = false)
	private SysUserServiceApi sysUserService;

	@Reference(version = "1.0.0", check = false)
	private SysUserCategoryGrantServiceApi sysUserCategoryGrantServiceApi;

	/**
	 * @Description: 电子秤登录
	 * @param userName
	 * @param password
	 * @param response
	 * @param request
	 * @return   
	 * @return String  
	 * @throws
	 * @author yangyq02
	 * @date 2016年9月1日
	 */
	@RequestMapping(value = "login", method = RequestMethod.POST)
	@ResponseBody
	public RespJson login(HttpServletRequest request) {

		try {
			String reqJsonStr = ServletUtil.getRequestContent(request);
			LOG.info("入参：{}", reqJsonStr);
			JSONObject reqJson = JSONObject.parseObject(reqJsonStr);
			String userName=reqJson.getString("userName");
			String password=reqJson.getString("userName");
//			String userName=reqJson.getString("userName");
			
			
			SysUserItemDto caUser = userApi.login(userName, password);
  			if (null == caUser) {
				return RespJson.error("账号或密码错误！请确认后重新输入");
			}
			// 判断
			if (DisabledType.Delete.getKey().equals(caUser.getStatus())) {
				return RespJson.error("账号被禁用！");
			}

			LOG.info("ca userId:" + caUser.getId());
			//判断机器是否合法
			
			
			//是否已经登录过
			
			
			//是否是管理员和店长，能强制剔出当前登录的用户
			
			//店铺有其他
			
			
			// 获取本地用户信息
			SysUser sysUser = sysUserService.getUserById(caUser.getId());

			Session session = UserUtil.getSession();

			if (null == sysUser) {
				sysUser = new SysUser();
				PropertyUtils.copyProperties(sysUser, caUser);
				sysUser.setUserCode(caUser.getLoginName());
				sysUser.setPassword(caUser.getLoginPassword());
				sysUser.setMobile(caUser.getPhone());

				sysUser.setRemark(caUser.getDescription());
				sysUser.setLastLoginTime(caUser.getLastVisit());
				sysUser.setLastLoginIp(session.getHost());

				sysUser.setBranchId(SysConstant.MANAGER_BRANCH_ID); // 设置默认机构ID
				// 设置默认机构类型
				sysUser.setDisabled(SysConstant.DISABLED_NORMAL); // 默认为正常
			}

			// 获取用户类别权限，并保存到session
			List<String> codes = sysUserCategoryGrantServiceApi
					.getAllCategoryCodeByUserId(sysUser.getId());
			sysUser.setCategoryCodes(codes);

			LOG.info("Current User:" + sysUser);
			
			//记录日志
			return RespJson.success(sysUser);
		} catch (Exception e) {
			return RespJson.error("用户登录异常！：");
		}
	}
	/**
	 * @Description: 验证设备   
	 * @return void  
	 * @throws
	 * @author yangyq02
	 * @date 2016年11月16日
	 */
	private boolean checkTerminal(){
		return false;
	}
	
}
