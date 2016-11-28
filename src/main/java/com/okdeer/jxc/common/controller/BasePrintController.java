/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangq
 *@Date: 2016年8月24日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.common.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.okdeer.jxc.common.utils.JsonMapper;
import com.okdeer.jxc.controller.BaseController;


/**
 * ClassName: BasePrintController 
 * @Description: 打印BaseController
 * @author zhangq
 * @date 2016年8月24日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 商业管理系统1.0.0	2016年8月24日                  zhangq              创建打印Base Controller
 */

public abstract class BasePrintController<T,P> extends BaseController<T> {

	/**
	 * 
	 * @Description: 获取打印占位JSON
	 * @param formNo 订单号
	 * @return 打印替换JSON
	 * @author zhangq
	 * @date 2016年8月29日
	 */
	protected abstract Map<String, Object> getPrintReplace(String formNo);
	
	/**
	 * 
	 * @Description: 获取打印表格明细JSON
	 * @param formNo 订单号
	 * @return 打印表格明细JSON
	 * @author zhangq
	 * @date 2016年8月29日
	 */
	protected abstract List<P> getPrintDetail(String formNo);
	
	/**
	 * 
	 * @Description: 打印预览页面
	 * @param page
	 * @param template
	 * @param sheetNo
	 * @param model
	 * @return
	 * @author zhangq
	 * @date 2016年8月29日
	 */
	@RequestMapping(value = "/preview")
	public ModelAndView preview(String page, String template, String sheetNo,HttpServletRequest request, ModelAndView model){
		String controllerUrl = request.getRequestURI().replace("/okdeerjxc/", "/").replace("/preview", "/");
		JsonMapper jsonMapper = new JsonMapper();
		// 页签
		String tabId = "prev_" + page + "_" + sheetNo;
		model.addObject("tabId", tabId);
		model.addObject("sheetNo", sheetNo);
		
		model.addObject("page", page);
		model.addObject("controllerUrl", controllerUrl);
		//获取打印占位JSON
		Map<String, Object> replaceMap = getPrintReplace(sheetNo);
		String jsonReplace = jsonMapper.toJson(replaceMap);
		model.addObject("jsonReplace", jsonReplace);
		//获取打印表格明细JSON
		List<P> detailList = getPrintDetail(sheetNo);
		String jsonDetail = jsonMapper.toJson(detailList);
		model.addObject("jsonDetail", jsonDetail);
		//页面跳转
		model.setViewName("component/publicPrintPreview");
		return model;
	}
}
