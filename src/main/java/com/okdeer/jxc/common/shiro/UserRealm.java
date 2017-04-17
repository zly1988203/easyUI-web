/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangq
 *@Date: 2016年9月8日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.common.shiro;

import java.util.List;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cas.CasRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.okdeer.ca.api.common.SysMenuPermissionDto;
import com.okdeer.ca.api.common.SystemUserDto;
import com.okdeer.ca.api.common.enums.SystemCodeEnum;
import com.okdeer.ca.api.sysuser.service.ISysUserApi;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.enums.StatusEnum;
import com.okdeer.jxc.common.exception.BusinessException;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.supplier.entity.Supplier;
import com.okdeer.jxc.supplier.service.SupplierServiceApi;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.system.service.SysUserCategoryGrantServiceApi;
import com.okdeer.jxc.system.service.SysUserServiceApi;
import com.okdeer.jxc.utils.PriceGrantUtil;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: UserRealm 
 * @Description: 用户登录授权(UserRealm)
 * 
 * 该文件使用注解的形式会导致dubbo无法注入，请在spring-jxc-dubbo.xml用配置XML的方式注入
 * dubbo不要用注解扫描@Reference，而是直接使用@Autowired
 * 
 * @author liwb
 * @date 2016年8月5日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 		进销存2.0		2016年8月5日			liwb				用户登录授权
 * 商业管理系统1.0.0    2016年9月8日                     zhangq              规范代码
 */
public class UserRealm extends CasRealm {

	/**
	 * 日志
	 */
	private static final Logger LOG = LoggerFactory.getLogger(UserRealm.class);

	/**
	 * 用户中心系统用户接口api
	 */
	@Autowired
	private ISysUserApi sysUserApi;

	/**
	 * 用户dubbo接口
	 */
	@Autowired
	private SysUserServiceApi sysUserService;

	/**
	 * 用户类别权限Dubbo接口
	 */
	@Autowired
	private SysUserCategoryGrantServiceApi sysUserCategoryGrantServiceApi;

	/**
	 * 机构Dubbo接口
	 */
	@Autowired
	private BranchesServiceApi branchesService;

	/**
	 * 供应商Dubbo接口
	 */
	@Autowired
	private SupplierServiceApi supplierService;

	/**
	 * @Description: 登入令牌
	 * @return info 认证信息
	 * @throws AuthenticationException 认证异常
	 * (non-Javadoc)
	 * @see org.apache.shiro.cas.CasRealm#doGetAuthenticationInfo(org.apache.shiro.authc.AuthenticationToken)
	 */
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		AuthenticationInfo info = super.doGetAuthenticationInfo(token);
		try {
			if (info == null) {
				throw new IncorrectCredentialsException("登录账号或密码错误");
			}
			// 获取用户中心登录用户
			String sysUserId = (String) token.getPrincipal();
			SystemUserDto caUser = sysUserApi.loadSysUser(sysUserId);
			if (null == caUser) {
				throw new IncorrectCredentialsException("登录账号或密码错误");
			}

			// 登录账号被禁用
			if (caUser.getStatus().intValue() == 1) {
				throw new LockedAccountException("登录账号被禁用");
			}

			// 获取本地用户信息
			SysUser sysUser = sysUserService.getUserById(caUser.getId());
			if (null == sysUser) {
				LOG.error("登录失败，零售系统数据库中无当前用户数据，用户ID：{}", caUser.getId());
				throw new AuthenticationException("登录失败，商业管理系统不存在当前用户信息");
			}

			// 如果是禁用状态
			if (StatusEnum.DISABLE.getCode().equals(sysUser.getStatus())) {
				LOG.error("登录失败，该用户已禁用，用户ID：{}", caUser.getId());
				throw new AuthenticationException("登录失败，该用户已禁用!");
			}

			buildLoginInfo(caUser, sysUser);
		} catch (Exception e) {
			LOG.error("登录验证出错:", e);
			throw new AuthenticationException("登录验证出错！");
		}
		return info;
	}

	/**
	 * @Description: 封装登录用户信息
	 * @param caUser
	 * @param sysUser
	 * @author liwb
	 * @date 2016年9月18日
	 */
	private void buildLoginInfo(SystemUserDto caUser, SysUser sysUser) {
		Session session = UserUtil.getSession();
		sysUser.setLastLoginTime(caUser.getLastVisit());
		sysUser.setLastLoginIp(session.getHost());

		// 获取用户类别权限，并保存到session
		List<String> codes = sysUserCategoryGrantServiceApi.getAllCategoryCodeByUserId(sysUser.getId());
		sysUser.setCategoryCodes(codes);

		Branches branch = branchesService.getBranchInfoById(sysUser.getBranchId());
		if (branch == null) {
			throw new BusinessException("用户对应机构为空！");
		}

		// 获取机构类型完整编码
		sysUser.setBranchCompleCode(branch.getBranchCompleCode());
		sysUser.setBranchName(branch.getBranchName());
		sysUser.setBranchType(branch.getType());
		sysUser.setBranchParentId(branch.getParentId());

		// 获取当前机构默认供应商，如果是总部或者分公司，则直接取当前机构的供应商，如果是店铺则获取父节点分公司的供应商
		String branchId = null;
		if (BranchTypeEnum.HEAD_QUARTERS.getCode().equals(branch.getType())
				|| BranchTypeEnum.BRANCH_OFFICE.getCode().equals(branch.getType())) {
			branchId = branch.getBranchesId();
		} else {
			branchId = branch.getParentId();
		}

		// 设置当前机构默认供应商信息
		Supplier supplier = supplierService.getDefaultSupplierByBranchId(branchId);
		UserUtil.setDefaultSupplier(supplier);

		LOG.info("当前用户信息：{}", sysUser);

		// 设置用户session
		UserUtil.setCurrentUser(sysUser);
		// 设置用户价格权限，必须在设置用户session以后
		PriceGrantUtil.setPriceGrant(sysUser.getPriceGrant());

		// 更新用户登录信息
		sysUserService.updateLoginInfo(sysUser);
	}

	/**
	 * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用。
	 * (non-Javadoc)
	 * @see org.apache.shiro.cas.CasRealm#doGetAuthorizationInfo(org.apache.shiro.subject.PrincipalCollection)
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		try {
			SysUser sysUser = UserUtil.getCurrentUser();
			// 用户接受的操作权限类
			SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
			List<SysMenuPermissionDto> list = sysUserApi.findPermissionBySysUserId(sysUser.getId(), SystemCodeEnum.JXC);
			// 如果权限为空
			if (null == list || list.isEmpty()) {
				return null;
			}
			for (SysMenuPermissionDto sysMenuPermissionDto : list) {
				if (StringUtils.isNotBlank(sysMenuPermissionDto.getCode())) {
					info.addStringPermissions(sysMenuPermissionDto.getPermissions(null));
				}
			}
			LOG.debug("授权查询回调函数信息：{}", info);
			return info;
		} catch (Exception e) {
			LOG.error("赋予权限出错{}", e);
		}
		return null;
	}

	/**
	 * 
	 * (non-Javadoc)
	 * @see org.apache.shiro.realm.AuthorizingRealm#clearCachedAuthorizationInfo(org.apache.shiro.subject.PrincipalCollection)
	 */
	@Override
	public void clearCachedAuthorizationInfo(PrincipalCollection principals) {
		super.clearCachedAuthorizationInfo(principals);
	}

	/**
	 * 
	 * (non-Javadoc)
	 * @see org.apache.shiro.realm.AuthenticatingRealm#clearCachedAuthenticationInfo(org.apache.shiro.subject.PrincipalCollection)
	 */
	@Override
	public void clearCachedAuthenticationInfo(PrincipalCollection principals) {
		super.clearCachedAuthenticationInfo(principals);
	}

	/**
	 * 
	 * (non-Javadoc)
	 * @see org.apache.shiro.realm.CachingRealm#clearCache(org.apache.shiro.subject.PrincipalCollection)
	 */
	@Override
	public void clearCache(PrincipalCollection principals) {
		super.clearCache(principals);
	}

	/**
	 * @Description: 清理授权缓存
	 * @author liwb
	 * @date 2016年8月5日
	 */
	public void clearAllCachedAuthorizationInfo() {
		getAuthorizationCache().clear();
	}

	/**
	 * @Description: 清理认证信息缓存
	 * @author liwb
	 * @date 2016年8月5日
	 */
	public void clearAllCachedAuthenticationInfo() {
		getAuthenticationCache().clear();
	}

	/**
	 * @Description: 清理缓存
	 * @author liwb
	 * @date 2016年8月5日
	 */
	public void clearAllCache() {
		clearAllCachedAuthenticationInfo();
		clearAllCachedAuthorizationInfo();
	}
}
