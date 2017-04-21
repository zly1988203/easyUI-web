
package com.okdeer.jxc.controller.system;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.google.common.collect.Lists;
import com.okdeer.base.common.utils.EncryptionUtils;
import com.okdeer.ca.api.common.ApiException;
import com.okdeer.ca.api.common.SysModuleMenuDto;
import com.okdeer.ca.api.common.SystemUserDto;
import com.okdeer.ca.api.common.enums.SystemCodeEnum;
import com.okdeer.ca.api.sysuser.entity.SysUserDto;
import com.okdeer.ca.api.sysuser.service.ISysUserApi;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.system.service.SysUserServiceApi;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: SSOMainController 
 * @Description: 系统权限Controller
 * @author liwb
 * @date 2016年8月18日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *		进销存2.0	  2016年8月18日			 liwb			    系统权限Controller
 */

@Controller
@RequestMapping(value = "/system")
public class SSOMainController extends BaseController<SSOMainController> {

	@Value("${casServerUrlPrefix}")
	private String casServerUrlPrefix;

	@Value("${serviceUrl}")
	private String serviceUrl;

	@Reference(version = "1.0.0", check = false)
	private SysUserServiceApi sysUserService;

	@Reference(version = "1.0.0", check = false)
	private ISysUserApi sysUserApi;

	/**
	 * 默认页面
	 * 
	 * @return String
	 */
	@RequestMapping(method = RequestMethod.GET)
	public String login() {
		Subject subject = SecurityUtils.getSubject();
		if (subject.isAuthenticated() || subject.isRemembered()) {
			return "redirect:/";
		}
		return "system/login";
	}

	/**
	 * @Description: 登出，注销
	 * @param response
	 * @author liwb
	 * @date 2016年9月17日
	 */
	@RequestMapping(value = "logout")
	public void logout(HttpServletResponse response) {

		try {
			Subject subject = SecurityUtils.getSubject();
			subject.logout();
			response.sendRedirect(casServerUrlPrefix + "/logout?service=" + serviceUrl);
		} catch (IOException e) {
			LOG.error("logout error:", e);
		}
		return;
	}

	/**
	 * @Description: 带修改密码页面
	 * @return
	 * @author liwb
	 * @date 2016年9月17日
	 */
	@RequestMapping(value = "toUpdatePwd")
	public String toUpdatePwd() {
		return "system/updatePwd";
	}

	/**
	 * @Description: 修改密码
	 * @param oldPass
	 * @param newPass
	 * @return
	 * @author liwb
	 * @date 2016年8月30日
	 */
	@RequestMapping(value = "updatePwd", method = RequestMethod.POST)
	@ResponseBody
	public String updatePwd(String oldPass, String newPass) {
		LOG.info("修改密码，oldPass={},newPass={}", oldPass, newPass);
		SysUser user = UserUtil.getCurrentUser();
		SystemUserDto sysUserDto = null;
		try {
			// 获取当前用户的信息,拿到旧密码
			sysUserDto = sysUserApi.loadSysUser(user.getId());
			if (sysUserDto == null) {
				return "获取用户中心数据失败,请稍后再试,或联系管理员";
			}

			String md5OldPass = EncryptionUtils.md5(oldPass);
			String loginPassword = sysUserDto.getLoginPassword();

			// 校验旧密码
			if (!loginPassword.equals(md5OldPass)) {
				return "旧密码输入错误";
			}
			SysUserDto sysDto = new SysUserDto();

			sysDto.setId(sysUserDto.getId());
			sysDto.setUpdateUserId(sysUserDto.getId());
			// 修改密码,传入明文,用户中心会进行md5加密
			sysDto.setLoginPassword(newPass);
			sysUserApi.edit(sysDto);

			// 获取用户中心修改密码后的数据
			sysUserDto = sysUserApi.loadSysUser(user.getId());
			loginPassword = sysUserDto.getLoginPassword();

			// 更新本地用户密码
			sysUserService.updatePwd(sysUserDto.getId(), loginPassword);
			return SUCCESS;
		} catch (ApiException e) {
			LOG.error("调用dubboAPi失败", e);
			return "与用户中心通信失败,请稍后再试,或联系管理员";
		} catch (Exception e) {
			LOG.error("修改密码失败：", e);
			return "修改密码失败";
		}
	}

	/**
	 * 当前登录用户的权限集合
	 */
	@RequestMapping("permission/i/json")
	@ResponseBody
	public List<SysModuleMenuDto> myPermissionDate() {
		List<SysModuleMenuDto> sysModuleMenuDtosList = null;
		try {
			sysModuleMenuDtosList = sysUserApi.findMenuBySysUserId(UserUtil.getCurrentUser().getId(),
					SystemCodeEnum.JXC);

			if (sysModuleMenuDtosList == null) {
				sysModuleMenuDtosList = Lists.newArrayList();
			}
			LOG.debug("当前用户权限记录数:{}", sysModuleMenuDtosList.size());
		} catch (ApiException e) {
			LOG.error("获取权限菜单出错", e);
		}
		return sysModuleMenuDtosList;
	}

}
