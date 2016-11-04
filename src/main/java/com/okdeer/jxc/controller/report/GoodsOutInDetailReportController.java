/** 
 *@Project: okdeer-jxc-web 
 *@Author: liux01
 *@Date: 2016年10月26日 
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
import com.okdeer.jxc.report.service.GoodsOutInDetailServiceApi;
import com.okdeer.jxc.report.vo.GoodsOutInDetailCountVo;
import com.okdeer.jxc.report.vo.GoodsOutInDetailVo;
import com.okdeer.jxc.utils.UserUtil;


/**
 * ClassName: GoodsOutInDetailReportController 
 * @Description: TODO
 * @author liux01
 * @date 2016年10月26日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("goods/goodsDetail")
public class GoodsOutInDetailReportController extends BaseController<GoodsOutInDetailReportController> {
	@Reference(version = "1.0.0", check = false)
	private GoodsOutInDetailServiceApi goodsOutInDetailServiceApi;
	@RequestMapping(value = "/list")
	public String list(){
		return "/report/goods/goodsOutInDetailReport";
	}
	@RequestMapping(value = "getGoodsOutInDetailList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsOutInDetailVo> getGoodsOutInDetailList(
			GoodsOutInDetailVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setSourceBranchId(UserUtil.getCurrBranchId());
			PageUtils<GoodsOutInDetailVo> goodsSaleReportList = goodsOutInDetailServiceApi.getGoodsOutInDetailList(vo);
			LOG.info(LogConstant.PAGE, goodsSaleReportList.toString());
			return goodsSaleReportList;
		} catch (Exception e) {
			LOG.error("类别销售列表信息异常:{}", e);
		}
		return null;
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
	public RespJson exportList(HttpServletResponse response, GoodsOutInDetailVo vo) {
		RespJson resp = RespJson.success();
		try {
			vo.setSourceBranchId(UserUtil.getCurrBranchId());
			List<GoodsOutInDetailVo> exportList = goodsOutInDetailServiceApi.exportList(vo);

			String fileName = "商品出入库明细查询";

			String templateName = ExportExcelConstant.GOODS_OUT_IN_DETAIL_REPORT;

			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("导出库存调整商品异常：{}", e);
			resp = RespJson.error("导出库存调整商品异常");
		}
		return resp;
	}
	/**
	 * @Description: 商品出入库合计
	 * @param vo
	 * @return
	 * @author liux01
	 * @date 2016年10月27日
	 */
	@RequestMapping(value = "sum", method = RequestMethod.POST)
	@ResponseBody
	public RespJson sum(GoodsOutInDetailVo vo) {
		RespJson respJson = RespJson.success();
		try {
			vo.setSourceBranchId(UserUtil.getCurrBranchId());
			GoodsOutInDetailCountVo goodsOutInDetailCountVo = goodsOutInDetailServiceApi.queryGoodsOutInDetailCountSum(vo);
			if (goodsOutInDetailCountVo != null) {
				respJson.put("outNumSum", goodsOutInDetailCountVo.getOutNumSum());
				respJson.put("inNumSum", goodsOutInDetailCountVo.getInNumSum());
				respJson.put("costAmountSum", goodsOutInDetailCountVo.getCostAmountSum());
				respJson.put("saleAmountSum", goodsOutInDetailCountVo.getSaleAmountSum());
			}
		} catch (Exception e) {
			LOG.error("店铺销售排名合计出现异常:{}", e);
			respJson = RespJson.error("店铺销售排名合计失败！");
		}
		return respJson;
	}
}
