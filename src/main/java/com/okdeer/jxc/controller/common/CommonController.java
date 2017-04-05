/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月28日
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.common;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.okdeer.jxc.controller.BaseController;

/**
 * ClassName: CommonController 
 * @Description: 公共组件Controller
 * @author lijy02
 * @date 2016年7月28日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    商业管理系统		   2016年9月13日                lijy02          	            公共组件控制器
 */

@Controller
@RequestMapping("common")
public class CommonController extends BaseController<CommonController> {

	@RequestMapping(value = "uploadFile")
	public String view(HttpServletRequest req, Model model) {
		return "component/publicUploadFile";
	}

	@RequestMapping(value = "uploadTemplate")
	public String uploadTemplateView(HttpServletRequest req, Model model) {
		return "component/publicUploadTemplate";
	}
}
