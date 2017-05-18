package com.okdeer.jxc.config;  

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.okdeer.base.web.interceptor.CatInterceptor;

/**
 * 
 * ClassName: CatInterceptorConfig 
 * @Description: CAT监控 请求拦截
 * @author zhangq
 * @date 2017年4月17日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Configuration
public class CatInterceptorConfig extends WebMvcConfigurerAdapter {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// 对所有请求进行拦截
		registry.addInterceptor(new CatInterceptor());
	}

}
