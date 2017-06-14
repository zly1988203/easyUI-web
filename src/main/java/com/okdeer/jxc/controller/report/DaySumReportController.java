package com.okdeer.jxc.controller.report;  

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.report.qo.DaySumReportQo;
import com.okdeer.jxc.report.service.DaySumReportFacade;
import com.okdeer.jxc.report.vo.DaySumReportVo;
import com.okdeer.jxc.utils.UserUtil;

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
	
	@RequestMapping(value = "/list")
	public String list(Model model){
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
	public PageUtils<DaySumReportVo> getDayReportList(
			DaySumReportQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			if(StringUtils.isEmpty(qo.getBranchId())){
				qo.setBranchId(UserUtil.getCurrBranchId());
			}
			
			PageUtils<DaySumReportVo> poolSaleReportList = daySumReportFacade.queryList(qo);
			DaySumReportVo dayReportVo = daySumReportFacade.queryListSum(qo);
			List<DaySumReportVo> footer = new ArrayList<DaySumReportVo>();
			
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
}
