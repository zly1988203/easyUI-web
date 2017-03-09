/**
 *@Project: okdeer-jxc-web
 *@Author: zhangq
 *@Date: 2016年9月8日
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved.
 */

package com.okdeer.jxc.utils;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.supplier.entity.Supplier;
import com.okdeer.jxc.system.entity.SysUser;

/**
 * ClassName: SessionUtil 
 * @Description: session 工具类
 * @author liwb
 * @date 2016年8月4日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *		进销存2.0	  2016年8月18日			 liwb			  用户信息工具类
 * 商业管理系统1.0.0    2016年9月8日                     zhangq              规范代码，增加私有构造函数用以隐藏公开构造函数
 */
public class UserUtil {

	// Begin added by zhangq 2016-09-08 增加私有构造函数用以隐藏公开构造函数
	/**
	 * 私有构造函数
	 * <p>Title: 私有构造函数</p> 
	 * <p>Description: 增加私有构造函数用以隐藏公开构造函数</p>
	 */
	private UserUtil() {
		super();
	}

	// End added by zhangq 2016-09-08 增加私有构造函数用以隐藏公开构造函数

	/**
	 * 获取当前用户session
	 * 
	 * @return session
	 */
	public static Session getSession() {
		return SecurityUtils.getSubject().getSession();
	}
	
	public static HttpSession getHttpSession() {
		ServletRequestAttributes requestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		return requestAttributes.getRequest().getSession();
	}
	

	/**
	 * @Description: 获取当前登录用户对象
	 * @return
	 * @author liwb
	 * @date 2016年8月5日
	 */
	public static SysUser getCurrentUser() {
		return getSessionValue(Constant.SESSION_USER);
	}
	
	/**
	 * @Description: 获取当前登录用户对象(兼容Junit)
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月5日
	 */
	public static SysUser getUser() {
		return getHttpSessionValue(Constant.SESSION_USER);
	}

	/**
	 * @Description: 获取当前登录用户对象的权限
	 * @return
	 * @author lijy02
	 * @date 2016年8月5日
	 */
	public static void setPriceGrantMap(SysUser sysUser) {
		String priceGrant = sysUser.getPriceGrant();
		if (StringUtils.isEmpty(priceGrant)) {
			return;
		}
		String[] priceGrantArray = priceGrant.split(",");
		Map<String, String> priceGrantMap = new HashMap<String, String>();
		for (String string : priceGrantArray) {
			priceGrantMap.put(string, string);
		}
		setSessionValue(Constant.PRICE_GRANT_MAP, priceGrantMap);
	}

	/**
	 * @Description: 设置用户session信息
	 * @param user
	 * @author liwb
	 * @date 2016年8月5日
	 */
	public static void setCurrentUser(SysUser user) {
		setSessionValue(Constant.SESSION_USER, user);
	}
	
	/**
	 * @Description: 设置当前用户机构默认供应商
	 * @param supplier
	 * @author liwb
	 * @date 2016年9月20日
	 */
	public static void setDefaultSupplier(Supplier supplier) {
		setSessionValue(Constant.SESSION_DEFAULT_SUPPLIER, supplier);
	}
	
	/**
	 * @Description: 获取当前用户机构默认供应商
	 * @return
	 * @author liwb
	 * @date 2016年8月5日
	 */
	public static Supplier getDefaultSupplier() {
		return getSessionValue(Constant.SESSION_DEFAULT_SUPPLIER);
	}

	/**
	 * @Description: 获取当前登录用户ID
	 * @return
	 * @author liwb
	 * @date 2016年8月5日
	 */
	public static String getCurrUserId() {
		SysUser sysUser = getCurrentUser();
		return sysUser == null ? null : sysUser.getId();
	}

	/**
	 * @Description: 获取当前登录用户机构ID
	 * @return
	 * @author liwb
	 * @date 2016年8月5日
	 */
	public static String getCurrBranchId() {
		SysUser sysUser = getCurrentUser();
		return sysUser == null ? null : sysUser.getBranchId();
	}

	/**
	 * @Description: 获取当前登录用户机构code
	 * @return
	 * @author lijy02
	 * @date 2016年8月5日
	 */
	public static String getCurrBranchCode() {
		SysUser sysUser = getCurrentUser();
		return sysUser == null ? null : sysUser.getBranchCode();
	}

	/**
	 * @Description: 获取当前登录用户机构完整code
	 * @return
	 * @author lijy02
	 * @date 2016年9月8日
	 */
	public static String getCurrBranchCompleCode() {
		SysUser sysUser = getCurrentUser();
		return sysUser == null ? null : sysUser.getBranchCompleCode();
	}

	/**
	 * 
	 * @Description: 获取当前登录用户编号+名称
	 * @return
	 * @author liux01
	 * @date 2017年3月9日
	 */
	public static String getCurrBranchCompleName(){
		SysUser sysUser = getCurrentUser();
		return sysUser == null ? null : "["+sysUser.getBranchCode()+"]"+sysUser.getBranchName();
	}
	/**
	 * @Description: 获取当前登录用户机构类型
	 * @return
	 * @author liwb
	 * @date 2016年8月5日
	 */
	public static Integer getCurrBranchType() {
		SysUser sysUser = getCurrentUser();
		return sysUser == null ? null : sysUser.getBranchType();
	}

	/**
	 * @Description: 根据key值获取session当中的对象
	 * @param key
	 * @return
	 * @author liwb
	 * @date 2016年8月5日
	 */
	@SuppressWarnings("unchecked")
	public static <T extends Serializable> T getSessionValue(String key) {
		Session session = getSession();
		if (null != session) {
			return (T) session.getAttribute(key);
		} else {
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	public static <T extends Serializable> T getHttpSessionValue(String key) {
		HttpSession httpSession = UserUtil.getHttpSession();
		if (null != httpSession) {
			return (T) httpSession.getAttribute(key);
		} else {
			return null;
		}
	}
	

	/**
	 * @Description: 保存对象到session当中
	 * @param key
	 * @param value
	 * @author liwb
	 * @date 2016年8月5日
	 */
	public static void setSessionValue(String key, Object value) {
		Session session = getSession();
		if (null != session) {
			session.setAttribute(key, value);
		}
	}
}
