/**
 *@Project: okdeer-jxc-web
 *@Author: zhangq
 *@Date: 2016年9月8日
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved.
 */

package com.okdeer.jxc.utils;

import java.util.HashSet;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * ClassName: SessionListener
 * @Description: session监听器
 * @author zhangq
 * @date 2016年9月8日
 *
 * =================================================================================================
 *     Task ID               Date                    Author                 Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 商业管理系统1.0.0    2016年9月7日                     zhangq              规范代码
 */
@WebListener
public class SessionListener implements HttpSessionListener {

	/**
	 * LOG
	 */
	private static final Logger LOG = LoggerFactory.getLogger(SessionListener.class);

	/**
	 * 
	 * (non-Javadoc)
	 * @see javax.servlet.http.HttpSessionListener#sessionCreated(javax.servlet.http.HttpSessionEvent)
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public void sessionCreated(HttpSessionEvent event) {
		HttpSession session = event.getSession();
		ServletContext application = session.getServletContext();

		// 在application范围由一个HashSet集保存所有的session
		Set sessions = (HashSet) application.getAttribute("sessions");
		if (sessions == null) {
			sessions = new HashSet();
			application.setAttribute("sessions", sessions);
		}

		// 新创建的session均添加到HashSet集中
		sessions.add(session);
		if (LOG.isInfoEnabled()) {
			LOG.info("会话新增：{}", session.getId());
		}
	}

	@SuppressWarnings("rawtypes")
	public void sessionDestroyed(HttpSessionEvent event) {
		HttpSession session = event.getSession();
		ServletContext application = session.getServletContext();
		Set sessions = (HashSet) application.getAttribute("sessions");

		// 销毁的session均从HashSet集中移除
		if (sessions != null) {
			sessions.remove(session);
		}

		if (LOG.isInfoEnabled()) {
			LOG.info("会话移除：{}", session.getId());
		}
	}

}
