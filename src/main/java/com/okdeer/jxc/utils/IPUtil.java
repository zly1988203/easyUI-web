
package com.okdeer.jxc.utils;

import javax.servlet.http.HttpServletRequest;

/**
 * ClassName: IPUtil 
 * @Description: 客户端IP工具类
 * @author liwb
 * @date 2016年9月17日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

public class IPUtil {

	/**
	 * @Fields CURR_IP : 当前客户端,自己
	 */
	private static final String CURR_IP = "127.0.0.1";

	/**
	 * @Fields UNKNOWN : unknown
	 */
	private static final String UNKNOWN = "unknown";

	/**
	 * @Fields CURR_HEADER_IP : 当前头部IP信息
	 */
	private static final String CURR_HEADER_IP = "0:0:0:0:0:0:0:1";
	
	/**
	 * 私有构造函数
	 * <p>Title: 私有构造函数</p> 
	 * <p>Description: 增加私有构造函数用以隐藏公开构造函数</p>
	 */
	private IPUtil(){
		super();
	}

	/**
	 * @Description: 获取客户端IP
	 * @param request
	 * @return
	 * @author liwb
	 * @date 2016年9月17日
	 */
	public static String getIpAddress(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
			ip = request.getHeader("http_client_ip");
		}
		if (ip == null || ip.length() == 0 || UNKNOWN.equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ip != null && ip.indexOf(",") != -1) {
			ip = ip.substring(ip.lastIndexOf(",") + 1, ip.length()).trim();
		}
		if (CURR_HEADER_IP.equals(ip)) {
			ip = CURR_IP;
		}
		return ip;
	}
}
