/**
 *@Project: okdeer-jxc-web
 *@Author: zhangq
 *@Date: 2016年9月8日
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved.
 */

package com.okdeer.jxc.common.shiro;

import java.io.IOException;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.AccessControlFilter;

/**
 * ClassName: UserFilter 
 * @Description: 重写Shiro userFilter 过滤器
 * @author liwb
 * @date 2016年8月18日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *		进销存2.0	  2016年8月18日			liwb				用户权限过滤器
 * 商业管理系统1.0.0    2016年9月7日                     zhangq              规范代码
 */

public class UserFilter extends AccessControlFilter {


	/**
	 * 
	 * (non-Javadoc)
	 * @see org.apache.shiro.web.filter.AccessControlFilter#isAccessAllowed(javax.servlet.ServletRequest, javax.servlet.ServletResponse, java.lang.Object)
	 */
	protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
		HttpServletRequest req = (HttpServletRequest) request;
		String ignoreUrl = req.getRequestURL().toString();
		if (isLoginRequest(request, response)) {
			return true;
		} else if (ignoreUrl.contains("/scale/")) {
			return true;
		} else if (ignoreUrl.contains("/error/")) {
			return true;
		} else {
			Subject subject = getSubject(request, response);
			return subject.getPrincipal() != null;
		}
	}

	/**
	 * 
	 * (non-Javadoc)
	 * @see org.apache.shiro.web.filter.AccessControlFilter#onAccessDenied(javax.servlet.ServletRequest, javax.servlet.ServletResponse)
	 */
	protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		String loginUrl = getLoginUrl();
		timeout(httpRequest, httpResponse, loginUrl);
		return false;
	}

	/**
	 * @Description: 超时处理
	 * @param request
	 * @param response
	 * @param logoutUrl
	 * @throws IOException
	 * @author liwb
	 * @date 2016年8月18日
	 */
	private void timeout(HttpServletRequest request, HttpServletResponse response, String logoutUrl) throws IOException {
		String ajaxFlag = request.getHeader("X-Requested-With");
		if ("XMLHttpRequest".equalsIgnoreCase(ajaxFlag)) {
			response.setHeader("sessionTimeOut", "true");
			response.setHeader("logoutUrl", logoutUrl);
			// 请求超时
			response.setStatus(408);
		} else {
			response.getOutputStream().println("<html>");
			response.getOutputStream().println("<script>");
			response.getOutputStream().println("window.open ('" + logoutUrl + "','_top')");
			response.getOutputStream().println("</script>");
			response.getOutputStream().println("</html>");
			response.flushBuffer();
		}
	}
}