package com.okdeer.jxc.utils;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 扩展认证默认过滤
 * @author ty
 * @date 2014年12月2日 下午10:47:09
 */
public class FormAuthenticationCaptchaFilter extends FormAuthenticationFilter {
	
	/**
	 * 日志
	 */
	private static final Logger LOG = LoggerFactory.getLogger(FormAuthenticationCaptchaFilter.class);

	public static final String DEFAULT_CAPTCHA_PARAM = "captcha";
	private String captchaParam = DEFAULT_CAPTCHA_PARAM;

	public String getCaptchaParam() {
		LOG.info("getCaptchaParam==========================================");
		return captchaParam;
	}

	protected String getCaptcha(ServletRequest request) {
		LOG.info("getCaptcha==========================================");
		
		return WebUtils.getCleanParam(request, getCaptchaParam());
	}

	protected AuthenticationToken createToken(ServletRequest request, ServletResponse response) {
		
		LOG.info("createToken==========================================");
		
		String username = getUsername(request);
		String password = getPassword(request);
		String captcha = getCaptcha(request);
		boolean rememberMe = isRememberMe(request);
		String host = getHost(request);
		return new UsernamePasswordCaptchaToken(username,password.toCharArray(), rememberMe, host, captcha);
	}

}