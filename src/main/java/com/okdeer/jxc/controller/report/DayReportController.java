/** 
 *@Project: okdeer-jxc-web 
 *@Author: liux01
 *@Date: 2017年2月14日 
 *@Copyright: ©2014-2020 www.yschome.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.report;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.report.qo.DayReportQo;
import com.okdeer.jxc.report.service.DayReportService;
import com.okdeer.jxc.report.vo.DayReportVo;
import com.okdeer.jxc.utils.UserUtil;


/**
 * ClassName: DayReportController 
 * @Description: TODO
 * @author liux01
 * @date 2017年2月14日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("report/day")
public class DayReportController extends BaseController<DayReportController> {

	@Reference(version = "1.0.0", check = false)
	private DayReportService dayReportService;
	@RequestMapping(value = "/list")
	public String list(Model model){
		model.addAttribute("branchId", UserUtil.getCurrentUser().getBranchId());
		model.addAttribute("branchName", UserUtil.getCurrentUser().getBranchName());
		return "/report/day/dayList";
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
	public PageUtils<DayReportVo> getDayReportList(
			DayReportQo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setSourceBranchId(UserUtil.getCurrBranchId());
			PageUtils<DayReportVo> poolSaleReportList = dayReportService.getDayReportList(vo);
			DayReportVo dayReportVo = dayReportService.queryDayReportSum(vo);
			List<DayReportVo> footer = new ArrayList<DayReportVo>();
			if(dayReportVo !=null){
				footer.add(dayReportVo);
			}
			poolSaleReportList.setFooter(footer);
			return poolSaleReportList;
		} catch (Exception e) {
			LOG.error("获取日销售列表信息异常:{}", e);
		}
		return null;
	}	
	/**
	 * 
	 * @Description: 导出excel
	 * @param response
	 * @param vo
	 * @return
	 * @author liux01
	 * @date 2017年2月15日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportList(HttpServletResponse response, DayReportQo vo) {
		RespJson resp = RespJson.success();
		try {
			vo.setSourceBranchId(UserUtil.getCurrBranchId());
			List<DayReportVo> exportList = dayReportService.exportList(vo);
			DayReportVo dayReportVo = dayReportService.queryDayReportSum(vo);
			dayReportVo.setRptDate("合计:");
			exportList.add(dayReportVo);
			String fileName = "日进销存报表";
			String templateName = ExportExcelConstant.DAY_REPORT;
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("导出日进销存报表异常：{}", e);
			resp = RespJson.error("导出日进销存报表异常");
		}
		return resp;
	}
}
