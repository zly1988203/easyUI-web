/** 
 *@Project: okdeer-jxc-web 
 *@Author: taomm
 *@Date: 2016年8月15日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.PrintConstant;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.print.JasperHelper;
import com.okdeer.jxc.report.qo.GoodsReportQo;
import com.okdeer.jxc.report.service.GoodsReportService;
import com.okdeer.jxc.report.vo.GoodsReportVo;
import com.okdeer.jxc.utils.UserUtil;

/**
 * 	
 * ClassName: GoodsReportController 
 * @Description: 库存查询
 * @author dongh
 * @date 2016年8月17日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    进销存2.0.0		   2016年9月12日                  dongh            库存查询
 *    商业管理系统 		   2016年9月12日			yangyq02				库存查询完善
 */
@Controller
@RequestMapping("goods/report")
public class GoodsReportController extends
		BaseController<GoodsReportController> {

	@Reference(version = "1.0.0", check = false)
	private GoodsReportService goodsReportService;

	/**
	 * 
	 * @Description: 商品查询跳转页
	 * @return
	 * @author taomm
	 * @date 2016年8月22日
	 */
	@RequestMapping(value = "view")
	public String view() {
		return "report/goods/goodsReport";
	}

	/**
	 * 
	 * @Description: 库存查询
	 * @param qo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author dongh
	 * @date 2016年8月22日
	 */
	@RequestMapping(value = "getList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsReportVo> getList(
			GoodsReportQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);

			// 如果没有选择店铺，则查询登录人所在机构的商品
			if (StringUtils.isEmpty(qo.getBranchId())) {
				qo.setBranchId(UserUtil.getCurrBranchId());
			}
			PageUtils<GoodsReportVo> goodsReport = goodsReportService
					.queryListToPage(qo);
			return goodsReport;
		} catch (Exception e) {
			LOG.error("查询商品选择数据出现异常:", e);
		}
		return null;
	}

	/**
	 * 
	 * @Description: 商品查询导出
	 * @param response
	 * @param vo
	 * @return
	 * @author dongh
	 * @date 2016年8月25日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public String exportList(HttpServletResponse response, GoodsReportQo qo) {

		LOG.info("商品查询导出execl：vo" + qo);
		try {
			// 如果没有选择店铺，则查询登录人所在机构的商品
			if (StringUtils.isEmpty(qo.getBranchId())) {
				qo.setBranchId(UserUtil.getCurrBranchId());
			}
			List<GoodsReportVo> exportList = goodsReportService.queryList(qo);

			String fileName = "商品查询列表" + "_" + DateUtils.getCurrSmallStr();

			String templateName = ExportExcelConstant.GOODSREPORT;

			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("商品查询导出execl出现错误{}", e);
		}
		return null;
	}

	// start by lijy02

	/**
	 * @Description: 商品查询打印
	 * @param qo
	 * @param response
	 * @param request
	 * @param pageNumber
	 * @author lijy02
	 * @date 2016年9月13日
	 */
	@RequestMapping(value = "printReport", method = RequestMethod.GET)
	@ResponseBody
	public void printReport(GoodsReportQo qo, HttpServletResponse response,
			HttpServletRequest request,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber) {
		try {
			// 如果没有选择店铺，则查询登录人所在机构的商品
			if (StringUtils.isEmpty(qo.getBranchId())) {
				qo.setBranchId(UserUtil.getCurrBranchId());
			}
			String branchCode = UserUtil.getCurrBranchCode();
			qo.setBranchCode(branchCode);
			qo.setPageNumber(pageNumber);
			qo.setPageSize(PrintConstant.PRINT_MAX_LIMIT);
			List<GoodsReportVo> list = goodsReportService.queryList(qo);
			String path = PrintConstant.GOODS_REPORT;
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("printName", UserUtil.getCurrentUser().getUserName());
			JasperHelper.exportmain(request, response, map,
					JasperHelper.PDF_TYPE, path, list, "");
		} catch (Exception e) {
			LOG.error(PrintConstant.SALE_FLOW_PRINT_ERROR, e);
		}
	}
	// end by lijy02
}
