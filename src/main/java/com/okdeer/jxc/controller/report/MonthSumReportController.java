package com.okdeer.jxc.controller.report;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.controller.BaseReportController;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.utils.UserUtil;
import com.okdeer.retail.common.page.EasyUIPageInfo;
import com.okdeer.retail.facade.report.facade.BaseReportFacade;
import com.okdeer.retail.facade.report.facade.MonthSumReportFacade;
import com.okdeer.retail.facade.report.qo.MonthSumReportQo;
import com.okdeer.retail.facade.report.vo.MonthSumReportVo;

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
public class MonthSumReportController extends BaseReportController<MonthSumReportQo, MonthSumReportVo> {
	/**
	 * 日进销存报表Dubbo接口
	 */
	@Reference(version = "1.0.0", check = false)
	private MonthSumReportFacade monthSumReportFacade;
	
	@Override
	protected String getViewName() {
		return "/report/month/monthSumReport";
	}
	//因为之前的菜单已经固定为list。。。
	@RequestMapping(value = "/list")
	public String list(Model model) {
		return this.index(model);
	}
	//因为之前的菜单已经固定为list，用list显示查询会菜单路径冲突。。。
	@RequestMapping(value = "/getData", method = RequestMethod.POST)
	@ResponseBody
	public EasyUIPageInfo<MonthSumReportVo> getReportList(MonthSumReportQo qo, @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		return super.getReportList(qo, pageNumber, pageSize);
		
	}
	
	@Override
	protected Model getModel(Model model) {
		model.addAttribute("startTime",
				LocalDate.now().minusMonths(1).format(DateTimeFormatter.ofPattern(DateUtils.DATE_JFP_STR_R)));
		return model;
	}

	@Override
	protected MonthSumReportQo getQueryObject(MonthSumReportQo qo) {
		// 如果机构为空
		if (StringUtils.isEmpty(qo.getBranchId())) {
			qo.setBranchId(UserUtil.getCurrBranchId());
		}
		// 月结日期
		if (StringUtils.isEmpty(qo.getSumDate())) {
			qo.setSumDate(LocalDate.now().format(DateTimeFormatter.ofPattern(DateUtils.DATE_JFP_STR_R)));
		}
		return null;
	}

	@Override
	protected Class<MonthSumReportVo> getViewObjectClass() {
		return MonthSumReportVo.class;
	}

	@Override
	protected BaseReportFacade<MonthSumReportQo, MonthSumReportVo> getReportFade() {
		return monthSumReportFacade;
	}

}
