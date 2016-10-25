/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2016年10月25日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.system;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.okdeer.jxc.controller.BaseController;

/**
 * ClassName: SystemErrorController 
 * @Description: 系统错误Controller
 * @author liwb
 * @date 2016年10月25日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 零售管理系统1.0.0	  2016年10月12日			 liwb			    系统错误Controller
 */
@Controller
@RequestMapping(value = "error")
public class SystemErrorController extends BaseController<SystemErrorController> {

	@RequestMapping(value = "403", method = RequestMethod.GET)
	public String error403() {
		return "error/403";
	}

}
