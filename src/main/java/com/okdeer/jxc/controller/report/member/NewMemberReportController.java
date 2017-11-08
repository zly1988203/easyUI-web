/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年11月8日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.report.member;  

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.okdeer.jxc.controller.BaseController;


/**
 * ClassName: NewMemberReportController 
 * @Description: 新会员统计报表
 * @author liwb
 * @date 2017年11月8日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@RestController
@RequestMapping("newMember/report")
public class NewMemberReportController extends BaseController<NewMemberReportController> {
	
	@RequestMapping(value = "toManager")
	public ModelAndView toManager() {
		return new ModelAndView("report/member/newMemberReport");
	}


}
