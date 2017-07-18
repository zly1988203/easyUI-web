package com.okdeer.jxc.controller.report;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.utils.UserUtil;
import com.okdeer.retail.common.page.PageUtils;
import com.okdeer.retail.common.util.GridExportPrintUtils;
import com.okdeer.retail.facade.report.facade.DaySumReportFacade;
import com.okdeer.retail.facade.report.qo.DaySumReportQo;
import com.okdeer.retail.facade.report.vo.DaySumReportVo;

/**
 * 
 * ClassName: DaySumReportController 
 * @Description: 日进销存报表
 * @author zhangq
 * @date 2017年6月8日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("report/day")
public class DaySumReportController extends BaseController<DaySumReportController> {

	/**
	 * 日进销存报表Dubbo接口
	 */
	@Reference(version = "1.0.0", check = false)
	private DaySumReportFacade daySumReportFacade;

	/**
	 * 
	 * @Description: 跳转报表页
	 * @param model
	 * @return String  
	 * @author zhangq
	 * @date 2017年7月17日
	 */
	@RequestMapping(value = "/list")
	public String list(Model model) {
		model.addAttribute("branchId", UserUtil.getCurrentUser().getBranchId());
		model.addAttribute("branchName", UserUtil.getCurrentUser().getBranchName());
		return "/report/day/daySumReport";
	}

	/**
	 * 
	 * @Description: 获取日销售报表
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author liux01
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "getDayReportList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<DaySumReportVo> getDayReportList(DaySumReportQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			// 分页参数
			qo.setPageNum(pageNumber);
			qo.setPageSize(pageSize);

			// 如果机构为空
			if (StringUtils.isEmpty(qo.getBranchId())) {
				qo.setBranchId(UserUtil.getCurrBranchId());
			}

			// 查询结果
			PageUtils<DaySumReportVo> pages = daySumReportFacade.queryListPage(qo);
			return pages;
		} catch (Exception e) {
			LOG.error("获取日销售列表信息异常:{}", e);
		}
		return null;
	}

	/**
	 * 
	 * @Description: 导出日销售报表
	 * @param response
	 * @param vo
	 * @return RespJson  
	 * @author zhangq
	 * @date 2017年7月17日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportList(HttpServletResponse response, DaySumReportQo qo) {
		RespJson resp = RespJson.success();
		try {
			// 如果机构为空
			if (StringUtils.isEmpty(qo.getBranchId())) {
				qo.setBranchId(UserUtil.getCurrBranchId());
			}

			// 查询结果
			List<DaySumReportVo> exportList = daySumReportFacade.queryList(qo);
			cleanAccessData(exportList);

			GridExportPrintUtils<DaySumReportVo> exportUtils = new GridExportPrintUtils<DaySumReportVo>();
			exportUtils.exportExcel(DaySumReportVo.class, exportList, response);
		} catch (Exception e) {
			LOG.error("导出日销售列表信息异常:{}", e);
			resp = RespJson.error("导出日进销存报表异常");
		}
		return resp;
	}
}
