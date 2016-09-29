/**
 *@Project: okdeer-jxc-web
 *@Author: zhangq
 *@Date: 2016年9月8日
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved.
 */

package com.okdeer.jxc.utils;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * ClassName: AjaxFilter
 * @Description: Ajax过滤器
 * @author zhangq
 * @date 2016年9月8日
 *
 * =================================================================================================
 *     Task ID               Date                    Author                 Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 商业管理系统1.0.0    2016年9月7日                     zhangq              规范代码
 */
public class AjaxFilter implements Filter {

	/**
	 * 
	 * (non-Javadoc)
	 * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
	 */
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	/**
	 * 
	 * (non-Javadoc)
	 * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest, javax.servlet.ServletResponse, javax.servlet.FilterChain)
	 */
	@Override
	public void doFilter(ServletRequest servletRequestt, ServletResponse servletResponse, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) servletRequestt;
		HttpServletResponse response = (HttpServletResponse) servletResponse;

		String ajaxSubmit = request.getHeader("X-Requested-With");
		if (ajaxSubmit != null && "XMLHttpRequest".equals(ajaxSubmit) && request.getSession(false) == null) {
			response.setHeader("sessionstatus", "timeout");
			response.getWriter().print("sessionstatus");
			return;
		}
		chain.doFilter(servletRequestt, servletResponse);
	}

	/**
	 * 
	 * (non-Javadoc)
	 * @see javax.servlet.Filter#destroy()
	 */
	@Override
	public void destroy() {

	}
}
