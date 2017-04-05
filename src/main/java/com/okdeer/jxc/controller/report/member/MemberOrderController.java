/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2017年2月16日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report.member;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.service.BranchSpecServiceApi;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.constant.PrintConstant;
import com.okdeer.jxc.common.controller.BasePrintController;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.print.JasperHelper;
import com.okdeer.jxc.controller.report.TradeOrderCountController;
import com.okdeer.jxc.report.member.MemberOrderServiceApi;
import com.okdeer.jxc.report.qo.MemberOrderReportQo;
import com.okdeer.jxc.report.vo.MemberOrderListReportVo;
import com.okdeer.jxc.report.vo.MemberOrderReportVo;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: MemberOrderController 
 * @Description: 会员消费报表
 * @author zhangchm
 * @date 2017年2月16日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("memberOrder/report")
public class MemberOrderController extends BasePrintController<TradeOrderCountController, Object> {

	@Reference(version = "1.0.0", check = false)
	private MemberOrderServiceApi memberOrderServiceApi;

	/**
	 * @Description: 跳转会员消费报表
	 * @return
	 * @author zhangchm
	 * @date 2017年2月16日
	 */
	@RequestMapping(value = "view")
	public String view(Model model) {
		model.addAttribute("branchId", getCurrBranchId());
		return "report/cash/memberOrderReport";
	}

	/**
	 * @Description: 会员消费报表
	 * @param request
	 * @param response
	 * @return
	 * @author zhangchm
	 * @date 2017年2月16日
	 */
	@RequestMapping(value = "/memberOrderAll")
	@ResponseBody
	public PageUtils<MemberOrderReportVo> memberOrderAll(MemberOrderReportQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			qo.setEndTime(DateUtils.getNextDay(qo.getEndTime()));
			LOG.info(LogConstant.OUT_PARAM, qo.toString());
			PageUtils<MemberOrderReportVo> pages = memberOrderServiceApi.queryMemberOrderAll(qo);
			List<MemberOrderReportVo> footer = new ArrayList<MemberOrderReportVo>();
			MemberOrderReportVo vo = memberOrderServiceApi.queryMemberOrderAllSum(qo);
			if (vo != null) {
				footer.add(vo);
			}
			pages.setFooter(footer);
			return pages;
		} catch (Exception e) {
			LOG.error("会员消费报表查询异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 导出会员消费汇总
	 * @param qo
	 * @return
	 * @author zhangchm
	 * @date 2017年2月16日
	 */
	@RequestMapping(value = "memberOrderAllExportList")
	public void memberOrderAllExportList(HttpServletResponse response, MemberOrderReportQo qo) {
		LOG.info(LogConstant.OUT_PARAM, qo.toString());
		try {
			qo.setEndTime(DateUtils.getNextDay(qo.getEndTime()));
			List<MemberOrderReportVo> exportList = memberOrderServiceApi.queryMemberOrderAlls(qo);
			MemberOrderReportVo vo = memberOrderServiceApi.queryMemberOrderAllSum(qo);
			vo.setPhone("合计：");
			exportList.add(vo);
			String fileName = "会员消费汇总" + "_" + DateUtils.getCurrSmallStr();
			String templateName = ExportExcelConstant.MEMBER_ORDER_ALL;
			// 导出Excel
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("MemberOrderController : memberOrderAllExportList : ", e);
		}
	}

	/**
	 * @Description: 会员消费明细报表
	 * @param request
	 * @param response
	 * @return
	 * @author zhangchm
	 * @date 2017年2月16日
	 */
	@RequestMapping(value = "/memberOrderList")
	@ResponseBody
	public PageUtils<MemberOrderListReportVo> memberOrderList(MemberOrderReportQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			qo.setEndTime(DateUtils.getNextDay(qo.getEndTime()));
			LOG.info(LogConstant.OUT_PARAM, qo.toString());
			PageUtils<MemberOrderListReportVo> pages = memberOrderServiceApi.queryMemberOrderList(qo);
			List<MemberOrderListReportVo> footer = new ArrayList<MemberOrderListReportVo>();
			MemberOrderListReportVo vo = memberOrderServiceApi.queryMemberOrderListSum(qo);
			if (vo != null) {
				footer.add(vo);
			}
			pages.setFooter(footer);
			return pages;
		} catch (Exception e) {
			LOG.error("会员消费明细查询异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 导出会员消费明细
	 * @param qo
	 * @return
	 * @author zhangchm
	 * @date 2017年2月16日
	 */
	@RequestMapping(value = "memberOrderListExportList")
	public void memberOrderListExportList(HttpServletResponse response, MemberOrderReportQo qo) {
		LOG.info(LogConstant.OUT_PARAM, qo.toString());
		try {
			qo.setEndTime(DateUtils.getNextDay(qo.getEndTime()));
			List<MemberOrderListReportVo> exportList = memberOrderServiceApi.queryMemberOrderLists(qo);
			MemberOrderListReportVo vo = memberOrderServiceApi.queryMemberOrderListSum(qo);
			vo.setPhone("合计：");
			exportList.add(vo);
			String fileName = "会员消费明细" + "_" + DateUtils.getCurrSmallStr();
			String templateName = ExportExcelConstant.MEMBER_ORDER_LIST;
			// 导出Excel
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("MemberOrderController : memberOrderListExportList : ", e);
		}
	}

	/**
	 * @Description: 会员消费汇总报表打印
	 * @param qo
	 * @param request
	 * @param response
	 * @author zhangchm
	 * @date 2017年2月17日
	 */
	@RequestMapping(value = "memberOrderAllPrint", method = RequestMethod.GET)
	@ResponseBody
	public String memberOrderAllPrint(MemberOrderReportQo qo, HttpServletResponse response, HttpServletRequest request,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber) {
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(PrintConstant.PRINT_MAX_LIMIT);
			qo.setEndTime(DateUtils.getNextDay(qo.getEndTime()));
			// 初始化默认参数
			LOG.debug("会员消费汇总打印参数：{}", qo.toString());
			// 查询条数
			int lenght = memberOrderServiceApi.queryMemberOrderAllCount(qo);
			if (lenght > PrintConstant.PRINT_MAX_ROW) {
				return "<script>alert('打印最大行数不能超过3000行');top.closeTab();</script>";
			}
			// 查询明细
			List<MemberOrderReportVo> list = memberOrderServiceApi.queryMemberOrderAlls(qo);
			if (!CollectionUtils.isEmpty(list) && list.size() > PrintConstant.PRINT_MAX_ROW) {
				return "<script>alert('打印最大行数不能超过3000行');top.closeTab();</script>";
			}
			// 查询合计
			MemberOrderReportVo vo = memberOrderServiceApi.queryMemberOrderAllSum(qo);
			vo.setPhone("合计：");
			list.add(vo);
			String path = PrintConstant.MEMBER_ORDER_ALL_REPORT;
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("startDate", DateUtils.formatDate(qo.getStartTime(), DateUtils.DATE_FULL_STR));
			map.put("endDate", DateUtils.formatDate(qo.getEndTime(), DateUtils.DATE_FULL_STR));
			map.put("printName", UserUtil.getCurrentUser().getUserName());
			JasperHelper.exportmain(request, response, map, JasperHelper.PDF_TYPE, path, list, "");
		} catch (Exception e) {
			LOG.error(PrintConstant.CASH_FLOW_PRINT_ERROR, e);
		}
		return null;
	}

	/**
	 * @Description: 会员消费明细报表打印
	 * @param qo
	 * @param request
	 * @param response
	 * @author zhangchm
	 * @date 2017年2月17日
	 */
	@RequestMapping(value = "memberOrderListPrint", method = RequestMethod.GET)
	@ResponseBody
	public String memberOrderListPrint(MemberOrderReportQo qo, HttpServletResponse response,
			HttpServletRequest request, @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber) {
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(PrintConstant.PRINT_MAX_LIMIT);
			qo.setEndTime(DateUtils.getNextDay(qo.getEndTime()));
			// 初始化默认参数
			LOG.debug("会员消费明细打印参数：{}", qo.toString());
			// 查询条数
			int lenght = memberOrderServiceApi.queryMemberOrderListCount(qo);
			if (lenght > PrintConstant.PRINT_MAX_ROW) {
				return "<script>alert('打印最大行数不能超过3000行');top.closeTab();</script>";
			}
			// 查询明细
			List<MemberOrderListReportVo> list = memberOrderServiceApi.queryMemberOrderLists(qo);
			if (!CollectionUtils.isEmpty(list) && list.size() > PrintConstant.PRINT_MAX_ROW) {
				return "<script>alert('打印最大行数不能超过3000行');top.closeTab();</script>";
			}
			// 查询合计
			MemberOrderListReportVo vo = memberOrderServiceApi.queryMemberOrderListSum(qo);
			vo.setPhone("合计：");
			list.add(vo);
			String path = PrintConstant.MEMBER_ORDER_LIST_REPORT;
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("startDate", DateUtils.formatDate(qo.getStartTime(), DateUtils.DATE_FULL_STR));
			map.put("endDate", DateUtils.formatDate(qo.getEndTime(), DateUtils.DATE_FULL_STR));
			map.put("printName", UserUtil.getCurrentUser().getUserName());
			JasperHelper.exportmain(request, response, map, JasperHelper.PDF_TYPE, path, list, "");
		} catch (Exception e) {
			LOG.error(PrintConstant.CASH_FLOW_PRINT_ERROR, e);
		}
		return null;
	}

	@Override
	protected Map<String, Object> getPrintReplace(String formNo) {
		return null;
	}

	@Override
	protected List<Object> getPrintDetail(String formNo) {
		return null;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.common.controller.BasePrintController#getBranchSpecService()
	 */
	@Override
	protected BranchSpecServiceApi getBranchSpecService() {
		return null;
	}

}
