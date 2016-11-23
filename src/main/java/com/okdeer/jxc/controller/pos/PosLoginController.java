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
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
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
import com.okdeer.jxc.pos.entity.PosLoginInfo;
import com.okdeer.jxc.pos.service.PosLoginInfoServiceApi;
import com.okdeer.jxc.pos.service.PosRegisterServiceApi;
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
public class PosLoginController extends BaseController<T> {

	@Reference(version = "1.0.0", check = false)
	com.okdeer.ca.api.sysuser.service.ISysUserApi userApi;

	@Reference(version = "1.0.0", check = false)
	private SysUserServiceApi sysUserService;

	@Reference(version = "1.0.0", check = false)
	private SysUserCategoryGrantServiceApi sysUserCategoryGrantServiceApi;

	@Reference(version = "1.0.0", check = false)
	PosRegisterServiceApi posRegisterServiceApi;
	
	@Reference(version = "1.0.0", check = false)
	PosLoginInfoServiceApi posLoginInfoServiceApi;
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
			String password=reqJson.getString("password");
			String terminalId=reqJson.getString("terminalId");
			if(StringUtils.isEmpty("userName")){
				return RespJson.error("用户名不允许为空");
			}
			if(StringUtils.isEmpty(password)){
				return RespJson.error("密码不允许为空");
			}
			if(StringUtils.isEmpty(terminalId)){
				return RespJson.error("设备ID不允许为空");
			}

			SysUserItemDto caUser = userApi.login(userName, password);
			if (null == caUser) {
				return RespJson.error("账号或密码错误！请确认后重新输入");
			}
			// 判断
			if (DisabledType.Delete.getKey().equals(caUser.getStatus())) {
				return RespJson.error("账号被禁用！");
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
				// 设置默认机构类型
				sysUser.setDisabled(SysConstant.DISABLED_NORMAL); // 默认为正常
			}
			//验证是否登录
			RespJson respJson=	userIsLogin(sysUser.getId(),sysUser.getBranchId());
			if(!respJson.isSuccess()){
				return respJson;
			}
			//生成一个token存放到redis，用于后面验证是否登录
			
			
			//验证通过，将当前的用户信息记录到数据库
			
			LOG.info("Current User:" + sysUser);

			//记录日志
			return RespJson.success(sysUser);
		} catch (Exception e) {
			return RespJson.error("用户登录异常！：");
		}
	}

//	/**
//	 * @Description: 检查数据
//	 * @return void  
//	 * @throws
//	 * @author yangyq02
//	 * @date 2016年11月16日
//	 */
//	private RespJson check(SysUser sysUser ){
//		//同一个机构只允许一个账户登录
//		PosRegisterVo vo=new PosRegisterVo();
//		vo.setBranchId(sysUser.getBranchId());
//		List<PosRegister> posRegisterList = posRegisterServiceApi.getList(vo);
//		//当前机构已经被登录，如果当前用户是管理员和店长，强制把其他用户踢下线，交班
////		if(Collectionutils)
//		if(posRegisterList!=null&&posRegisterList.size()>0){
//			//是否是管理员或者店长
////			管理员类型，1:系统管理员,2:普通用户
//			if(Constant.INTEGER_ONE.equals(  sysUser.getType())){
//				//强制当前登录的用户下线
//			}else{
//				return  RespJson.businessError( "其他用户已经登录改店铺，不允许登录");
//			}
//		}
//		return RespJson.success();
//	}

	/**
	 * @Description: 判断当前用户是否已经在其他机器登录
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author yangyq02
	 * @date 2016年11月18日
	 */
	private RespJson userIsLogin(String userId,String terminalId){
		List<PosLoginInfo> userList= posLoginInfoServiceApi.getListByUserId(userId);
		if(CollectionUtils.isNotEmpty(userList)){
			RespJson.businessError("该用户已在其他设备登录！");
		}
		List<PosLoginInfo> terminalList= posLoginInfoServiceApi.getListByTerminalId(terminalId);
		if(CollectionUtils.isNotEmpty(terminalList)){
			RespJson.businessError("该设备已经有用户登录，请选择其他设备");
		}
		return RespJson.success();
	}

}
