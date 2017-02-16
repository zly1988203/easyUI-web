/** 
 *@Project: okdeer-jxc-web 
 *@Author: liux01
 *@Date: 2017年2月15日 
 *@Copyright: ©2014-2020 www.yschome.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.report;

import java.util.ArrayList;
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
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.constant.PrintConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.print.JasperHelper;
import com.okdeer.jxc.report.qo.GoodsUnsaleReportQo;
import com.okdeer.jxc.report.service.GoodsUnsaleReportService;
import com.okdeer.jxc.report.vo.GoodsUnsaleReportVo;
import com.okdeer.jxc.utils.UserUtil;


/**
 * ClassName: GoodsUnSaleReportController 
 * @Description: TODO
 * @author liux01
 * @date 2017年2月15日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("report/goodsUnsale")
public class GoodsUnSaleReportController extends BaseController<GoodsUnSaleReportController> {

	@Reference(version = "1.0.0", check = false)
	private GoodsUnsaleReportService goodsUnsaleReportService;
	/**
	 * 
	 * @Description: TODO
	 * @return
	 * @author liux01
	 * @date 2017年2月15日
	 */
	@RequestMapping(value = "/list")
	public String list(){
		return "/report/goodsUnsale/goodsUnsaleReport";
	}
	/**
	 * 
	 * @Description: 查询滞销信息
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author liux01
	 * @date 2017年2月15日
	 */
	@RequestMapping(value = "getGoodsUnsaleReportList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsUnsaleReportVo> getGoodsUnsaleReportList(
			GoodsUnsaleReportQo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setSourceBranchId(UserUtil.getCurrBranchId());
			PageUtils<GoodsUnsaleReportVo> list = goodsUnsaleReportService.getGoodsUnsaleReportList(vo);
			GoodsUnsaleReportVo goodsUnsaleReportVo = goodsUnsaleReportService.queryGoodsUnsaleReportSum(vo);
			List<GoodsUnsaleReportVo> footer = new ArrayList<GoodsUnsaleReportVo>();
			if(goodsUnsaleReportVo !=null){
				footer.add(goodsUnsaleReportVo);
			}
			list.setFooter(footer);
			return list;
		} catch (Exception e) {
			LOG.error(" 获取联营销售列表信息异常:{}", e);
		}
		return null;
	}
	/**
	 * 
	 * @Description: 导出滞销信息
	 * @param response
	 * @param vo
	 * @return
	 * @author liux01
	 * @date 2017年2月15日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportList(HttpServletResponse response, GoodsUnsaleReportQo vo) {
		RespJson resp = RespJson.success();
		try {
			vo.setSourceBranchId(UserUtil.getCurrBranchId());
			List<GoodsUnsaleReportVo> exportList = goodsUnsaleReportService.exportList(vo);
			GoodsUnsaleReportVo goodsUnsaleReportVo = goodsUnsaleReportService.queryGoodsUnsaleReportSum(vo);
			goodsUnsaleReportVo.setBranchCode("合计:");
			exportList.add(goodsUnsaleReportVo);
			String fileName = "商品滞销导出";
			String templateName = ExportExcelConstant.GOODS_UNSALE_REPORT;
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("导出单品ABC销售额列表异常：{}", e);
			resp = RespJson.error("导出单品ABC销售额列表异常");
		}
		return resp;
	}
	/**
	 * 
	 * @Description: 打印
	 * @param qo
	 * @param response
	 * @param request
	 * @return
	 * @author liux01
	 * @date 2017年2月16日
	 */
	@RequestMapping(value = "printReport", method = RequestMethod.GET)
	@ResponseBody
	public String printReport(GoodsUnsaleReportQo qo, HttpServletResponse response, HttpServletRequest request) {
		try {
			qo.setSourceBranchId(UserUtil.getCurrBranchId());
			List<GoodsUnsaleReportVo> exportList = goodsUnsaleReportService.exportList(qo);
			GoodsUnsaleReportVo goodsUnsaleReportVo = goodsUnsaleReportService.queryGoodsUnsaleReportSum(qo);
			if(goodsUnsaleReportVo !=null){
				exportList.add(goodsUnsaleReportVo);
			}
			int lenght= exportList.size();
			if(lenght>PrintConstant.PRINT_MAX_ROW){
				return "<script>alert('打印最大行数不能超过3000行');top.closeTab();</script>";
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("startDate", qo.getStartTime());
			map.put("endDate", qo.getEndTime());
			map.put("printName", UserUtil.getCurrentUser().getUserName());
			String path = PrintConstant.GOODS_UNSALE_REPORT;
			JasperHelper.exportmain(request, response, map, JasperHelper.PDF_TYPE, path, exportList, "");
		} catch (Exception e) {
			LOG.error(PrintConstant.CASH_FLOW_PRINT_ERROR, e);
		}
		return null;
	}
}
