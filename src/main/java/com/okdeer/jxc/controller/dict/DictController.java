/** 
 *@Project: okdeer-jxc-web 
 *@Author: yangyq02
 *@Date: 2016年8月8日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.dict;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.dict.entity.Dict;
import com.okdeer.jxc.dict.service.DictServiceApi;
import com.okdeer.jxc.form.entity.PurchaseForm;

/**
 * ClassName: DeliverSelectController 
 * @Description: 字典
 * @author yangyq02
 * @date 2016年8月8日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *      重构2.0			2016-8-6			yangyq02	       字典Controller
 */
@Controller
@RequestMapping("common/dict")
public class DictController extends BaseController<PurchaseForm> {

	@Reference(version = "1.0.0", check = false)
	private DictServiceApi dictServiceApi;

	/**
	 * @Description:  返回字典页面
	 * @param req
	 * @param model
	 * @return   
	 * @return String  
	 * @throws
	 * @author yangyq02
	 * @date 2016年8月11日
	 */
	@RequestMapping(value = "views/{type}")
	public String views(@PathVariable String type, Model model,
			HttpServletRequest req) {
		String dictType = req.getParameter("dictType");
		model.addAttribute("type", type);
		model.addAttribute("dictType", dictType);
		return "component/publicOperator";
	}

	/**
	 * @Description:根据代码type显示代码
	 * @param req
	 * @return   
	 * @return PageUtils<Dict>  
	 * @throws
	 * @author yangyq02
	 * @date 2016年8月11日
	 */
	@RequestMapping(value = "getDictType")
	@ResponseBody
	public PageUtils<Dict> getDictType(HttpServletRequest req) {
		try {
			String type = req.getParameter("dictType");
			LOG.info("type:" + type);
			PageUtils<Dict> suppliers = dictServiceApi.queryDictBytype(type);
			LOG.info("page" + suppliers.toString());
			return suppliers;
		} catch (Exception e) {
			LOG.error("查询字典出现错误:", e);
		}
		return null;
	}
}
