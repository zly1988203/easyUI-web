package com.okdeer.jxc.controller.report;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.okdeer.jxc.utils.UserUtil;

/**
 * 
 * ClassName: MonthSumReportController 
 * @Description: 月进销存报表
 * @author zhangq
 * @date 2017年7月17日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("report/month")
public class MonthSumReportController {

	/**
	 * 
	 * @Description: 跳转页面
	 * @param model
	 * @return String  
	 * @author zhangq
	 * @date 2017年7月17日
	 */
	@RequestMapping(value = "/list")
	public String list(Model model) {
		model.addAttribute("branchId", UserUtil.getCurrentUser().getBranchId());
		model.addAttribute("branchName", UserUtil.getCurrentUser().getBranchName());
		return "/report/month/monthSumReport";
	}
}
