package com.okdeer.jxc.controller.report.month;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 *<p></p>
 * ClassName: MonthStatementController 
 * @Description: 月结处理
 * @author xuyq
 * @date 2017年3月30日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
 
@RestController
@RequestMapping("report/monthStatement")
public class MonthStatementController {
	
	@RequestMapping(value = "list")
	public ModelAndView monthStatement(Model model) {
		return new ModelAndView("report/month/monthStatement");
	}
}
