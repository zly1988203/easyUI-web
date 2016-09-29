/** 
 *@Project: okdeer-jxc-web 
 *@Author: yangyq02
 *@Date: 2016年8月30日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.scale;

import java.util.List;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.poi.ss.formula.functions.T;
import org.apache.shiro.session.Session;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.SysConstant;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.system.service.SysUserCategoryGrantServiceApi;
import com.okdeer.jxc.system.service.SysUserServiceApi;
import com.okdeer.jxc.utils.PriceGrantUtil;
import com.okdeer.jxc.utils.UserUtil;
import com.okdeer.ca.api.sysuser.entity.SysUserItemDto;
import com.okdeer.ca.common.enums.DisabledType;

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
@RequestMapping("scale/scaleLogin")
public class ScaleLogin extends BaseController<T> {

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
	public String login(String userName, String password) {

		Message msg = new Message();
		try {
			SysUserItemDto caUser = userApi.login(userName, password);
			if (null == caUser) {
				msg.setSuccess(Message.FAIT);
				msg.setMessage("账号或密码错误！请确认后重新输入");
				return msg.toString();
			}

			// 判断
			if (DisabledType.Delete.getKey().equals(caUser.getStatus())) {
				// 登录账号被禁用
				msg.setSuccess(Message.FAIT);
				msg.setMessage("账号被禁用！");
				return msg.toString();
			}

			LOG.info("ca userId:" + caUser.getId());

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
				// sysUser.setBranchType(BranchTypeEnum.HEAD_QUARTERS); //
				// 设置默认机构类型
				sysUser.setDisabled(SysConstant.DISABLED_NORMAL); // 默认为正常
			}

			// 获取用户类别权限，并保存到session
			List<String> codes = sysUserCategoryGrantServiceApi
					.getAllCategoryCodeByUserId(sysUser.getId());
			sysUser.setCategoryCodes(codes);

			LOG.info("Current User:" + sysUser);

			// 设置用户session
			UserUtil.setCurrentUser(sysUser);

			// 设置用户价格权限，必须在设置用户session以后
			PriceGrantUtil.setPriceGrant(sysUser.getPriceGrant());

			// AuthenticationToken xx=user.;
			// 调用登录的接口！
			msg.setData(sysUser);
			return msg.toString();
		} catch (Exception e) {
			LOG.error("用户登录失败：", e);
			msg.setMessage(e.getMessage());
			msg.setSuccess(Message.FAIT);
		}
		return msg.toString();
	}
}
