/** 
 *@Project: okdeer-jxc-web 
 *@Author: liux01
 *@Date: 2017年2月13日 
 *@Copyright: ©2014-2020 www.yschome.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.report;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.report.qo.PoolSaleReportQo;
import com.okdeer.jxc.report.service.PoolSaleReportService;
import com.okdeer.jxc.report.vo.PoolSaleReportVo;
import com.okdeer.jxc.utils.UserUtil;


/**
 * ClassName: PoolSaleReportController 
 * @Description: 联营销售报表功能
 * @author liux01
 * @date 2017年2月13日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     V2.2              2017-2-13           liux01				联营销售报表功能
 */
@Controller
@RequestMapping("report/poolSale")
public class PoolSaleReportController extends BaseController<PoolSaleReportController> {
	@Reference(version = "1.0.0", check = false)
	private PoolSaleReportService poolSaleReportService;
	/**
	 * 
	 * @Description: 联营销售查询列表
	 * @return
	 * @author liux01
	 * @date 2017年2月13日
	 */
	@RequestMapping(value = "/list")
	public String list(){
		return "/report/pool/poolList";
	}
	/**
	 * 
	 * @Description: 获取联营销售列表信息
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author liux01
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "getGoodsPoolSaleList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<PoolSaleReportVo> getGoodsPoolSaleList(
			PoolSaleReportQo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.debug(LogConstant.OUT_PARAM, vo.toString());
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setSourceBranchId(UserUtil.getCurrBranchId());
			PageUtils<PoolSaleReportVo> poolSaleReportList = poolSaleReportService.goodsPoolSaleList(vo);
			PoolSaleReportVo poolSaleReportVo = poolSaleReportService.queryPoolSaleAmountSum(vo);
			List<PoolSaleReportVo> footer = new ArrayList<PoolSaleReportVo>();
			if(poolSaleReportVo !=null){
				footer.add(poolSaleReportVo);
			}
			poolSaleReportList.setFooter(footer);
			return poolSaleReportList;
		} catch (Exception e) {
			LOG.error("获取联营销售列表信息异常:{}", e);
		}
		return null;
	}	
	@RequestMapping(value = "getGoodsPoolSaleDetailList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<PoolSaleReportVo> getGoodsPoolSaleDetailList(
			PoolSaleReportQo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.debug(LogConstant.OUT_PARAM, vo.toString());
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setSourceBranchId(UserUtil.getCurrBranchId());
			PageUtils<PoolSaleReportVo> poolSaleReportList = poolSaleReportService.goodsPoolSaleDetailList(vo);
			PoolSaleReportVo poolSaleReportVo = poolSaleReportService.queryPoolSaleDetailAmountSum(vo);
			List<PoolSaleReportVo> footer = new ArrayList<PoolSaleReportVo>();
			if(poolSaleReportVo !=null){
				footer.add(poolSaleReportVo);
			}
			poolSaleReportList.setFooter(footer);
			return poolSaleReportList;
		} catch (Exception e) {
			LOG.error("获取联营销售明细信息异常:{}", e);
		}
		return null;
	}	
	/**
	 * 
	 * @Description: 联营销售导出
	 * @param response
	 * @param vo
	 * @return
	 * @author liux01
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportList(HttpServletResponse response, PoolSaleReportQo vo) {
		RespJson resp = RespJson.success();
		try {
			vo.setSourceBranchId(UserUtil.getCurrBranchId());
			List<PoolSaleReportVo> exportList = poolSaleReportService.exportList(vo);
			PoolSaleReportVo poolSaleReportVo = poolSaleReportService.queryPoolSaleAmountSum(vo);
			poolSaleReportVo.setBranchName("合计:");
			exportList.add(poolSaleReportVo);
			String fileName = "联营销售汇总查询_"+DateUtils.getCurrSmallStr();
			String templateName = ExportExcelConstant.POOL_SALE_REPORT;
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("导出联营报表异常：{}", e);
			resp = RespJson.error("导出联营报表异常");
		}
		return resp;
	}
	/**
	 * 
	 * @Description: 联营销售明细导出
	 * @param response
	 * @param vo
	 * @return
	 * @author liux01
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/exportDetailList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportDetailList(HttpServletResponse response, PoolSaleReportQo vo) {
		RespJson resp = RespJson.success();
		try {
			vo.setSourceBranchId(UserUtil.getCurrBranchId());
			List<PoolSaleReportVo> exportList = poolSaleReportService.exportDetailList(vo);
			PoolSaleReportVo poolSaleReportVo = poolSaleReportService.queryPoolSaleDetailAmountSum(vo);
			poolSaleReportVo.setBranchName("合计:");
			exportList.add(poolSaleReportVo);
			String fileName = "联营销售明细查询_"+DateUtils.getCurrSmallStr();
			String templateName = ExportExcelConstant.POOL_SALE_DETAIL_REPORT;
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("联营销售明细导出异常：{}", e);
			resp = RespJson.error("联营销售明细导出异常");
		}
		return resp;
	}
	
}
