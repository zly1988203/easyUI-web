/** 
 *@Project: okdeer-jxc-web 
 *@Author: liux01
 *@Date: 2016年10月25日 
 *@Copyright: ©2014-2020 www.yschome.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.report;

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
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.report.service.GoodsSaleReportServiceApi;
import com.okdeer.jxc.report.vo.GoodsSaleCountVo;
import com.okdeer.jxc.report.vo.GoodsSaleReportVo;
import com.okdeer.jxc.utils.UserUtil;


/**
 * ClassName: StoreSaleController 
 * @Description: TODO
 * @author liux01
 * @date 2016年10月25日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("goodsSale/report")
public class GoodsSaleController extends BaseController<GoodsSaleController> {
	@Reference(version = "1.0.0", check = false)
	private GoodsSaleReportServiceApi goodsSaleReportServiceApi;
	/**
	 * 
	 * @Description: TODO
	 * @return
	 * @author liux01
	 * @date 2016年10月26日
	 */
	@RequestMapping(value = "/list")
	public String list(){
		return "/report/retail/goodsSaleReport";
	}
	/**
	 * 
	 * @Description: 获取商品销售情况汇总
	 * @param vo 入参
	 * @param pageNumber 页数
	 * @param pageSize 每页显示数
	 * @return
	 * @author liux01
	 * @date 2016年10月26日
	 */
	@RequestMapping(value = "getGoodsSaleList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsSaleReportVo> getGoodsSaleList(
			GoodsSaleReportVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setSourceBranchId(UserUtil.getCurrBranchId());
			PageUtils<GoodsSaleReportVo> goodsSaleReportList = goodsSaleReportServiceApi.getGoodsSaleList(vo);
			LOG.info(LogConstant.PAGE, goodsSaleReportList.toString());
			return goodsSaleReportList;
		} catch (Exception e) {
			LOG.error("获取单据列表信息异常:{}", e);
		}
		return null;
	}
	
	/**
	 * @Description: 商品销售合计
	 * @param vo
	 * @return
	 * @author liux01
	 * @date 2016年10月27日
	 */
	@RequestMapping(value = "sum", method = RequestMethod.POST)
	@ResponseBody
	public RespJson sum(GoodsSaleReportVo vo) {
		RespJson respJson = RespJson.success();
		try {
			GoodsSaleCountVo goodsSaleCountVo = goodsSaleReportServiceApi.queryGoodsSaleCountSum(vo);
			if (goodsSaleCountVo != null) {
				respJson.put("discountAmountSum", goodsSaleCountVo.getDiscountAmountSum());
				respJson.put("originalAmountSum", goodsSaleCountVo.getOriginalAmountSum());
				respJson.put("returnAmountSum", goodsSaleCountVo.getReturnAmountSum());
				respJson.put("returnNumSum", goodsSaleCountVo.getReturnNumSum());
				respJson.put("saleAmountSum", goodsSaleCountVo.getSaleAmountSum());
				respJson.put("saleNumSum", goodsSaleCountVo.getSaleNumSum());
				respJson.put("totalAmountSum", goodsSaleCountVo.getTotalAmountSum());
				respJson.put("totalNumSum", goodsSaleCountVo.getTotalNumSum());
			}
		} catch (Exception e) {
			LOG.error("店铺销售排名合计出现异常:{}", e);
			respJson = RespJson.error("店铺销售排名合计失败！");
		}
		return respJson;
	}
	/**
	 * 
	 * @Description: 导出
	 * @param response
	 * @param vo
	 * @return
	 * @author liux01
	 * @date 2016年10月27日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportList(HttpServletResponse response, GoodsSaleReportVo vo) {
		RespJson resp = RespJson.success();
		try {
			List<GoodsSaleReportVo> exportList = goodsSaleReportServiceApi.exportList(vo);

			String fileName = "商品销售汇总表";

			String templateName = ExportExcelConstant.GOODS_SALE_REPORT;

			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("导出库存调整商品异常：{}", e);
			resp = RespJson.error("导出库存调整商品异常");
		}
		return resp;
	}
	
}
