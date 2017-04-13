package com.okdeer.jxc.controller.report.month;

import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.report.TimeSectionSaleReportController;
import com.okdeer.jxc.report.service.MonthStatementService;
import com.okdeer.jxc.report.vo.MonthlyReport;
import com.okdeer.jxc.system.entity.SysUser;

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
public class MonthStatementController extends BaseController<TimeSectionSaleReportController> {

	/**
	 * @Fields monthStatementService : MonthStatementService
	 */
	@Reference(version = "1.0.0", check = false)
	private MonthStatementService monthStatementService;

	/**
	 * @Description: 跳转月结页
	 * @param model Model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年4月6日
	 */
	@RequestMapping(value = "list")
	public ModelAndView monthStatement(Model model) {
		return new ModelAndView("report/month/monthStatement");
	}

	/**
	 * @Description: 月结处理
	 * @param mr 参数对象
	 * @return RespJson
	 * @author xuyq
	 * @date 2017年4月6日
	 */
	@RequestMapping(value = "/executeMonthStatement", method = RequestMethod.POST)
	public RespJson executeMonthStatement(@Valid MonthlyReport mr, BindingResult validate) {
		SysUser user = getCurrentUser();
		RespJson respJson = RespJson.success();
		try {
			if (StringUtils.isBlank(mr.getBranchId()) || StringUtils.isBlank(mr.getRptDate())) {
				respJson = RespJson.error("机构或月结期间不能为空！");
				return respJson;
			}
			mr.setCreateUserId(user.getId());
			mr.setUpdateUserId(user.getId());
			mr.setEndDate(new Date());
			
			respJson = monthStatementService.executeMonthStatement(mr);
		} catch (Exception e) {
			LOG.error("月结处理异常：", e);
			respJson = RespJson.error("月结处理异常!");
		}
		return respJson;
	}

	/**
	 * @Description: 获得机构月结配置及数据
	 * @param branchId 机构ID
	 * @return RespJson
	 * @author xuyq
	 * @date 2017年4月6日
	 */
	@RequestMapping(value = "/getUpMonthReportDay", method = RequestMethod.POST)
	public RespJson getUpMonthReportDay(String branchId) {
		RespJson respJson = RespJson.success();
		try {
			List<MonthlyReport> branchSpecList = monthStatementService.getBranchLastMonthAndReportDay(branchId, null);
			MonthlyReport monReport = branchSpecList.get(0);
			respJson = RespJson.success(monReport);
		} catch (Exception e) {
			LOG.error("获得机构月结配置及数据异常：", e);
			respJson = RespJson.error("获得机构月结配置及数据异常!");
		}
		return respJson;
	}

}
