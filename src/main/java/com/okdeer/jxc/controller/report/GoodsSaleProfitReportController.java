/** 
 *@Project: okdeer-jxc-web 
 *@Author: liux01
 *@Date: 2016年11月10日 
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
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.report.service.GoodsSaleProfitReportServiceApi;
import com.okdeer.jxc.report.vo.GoodsSaleProfitReportVo;
import com.okdeer.jxc.utils.UserUtil;


/**
 * ClassName: GoodsSaleProfitReportController 
 * @Description: TODO
 * @author liux01
 * @date 2016年11月10日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("goods/goodsSaleProfit")
public class GoodsSaleProfitReportController extends BaseController<GoodsSaleProfitReportController> {
	@Reference(version = "1.0.0", check = false)
	private GoodsSaleProfitReportServiceApi goodsSaleProfitReportServiceApi;
	@RequestMapping(value = "/list")
	public String list(){
		return "/report/goods/goodsSaleProfit";
	}
	
	/**
	 * 
	 * @Description: 获取报表列表信息
	 * @param vo  商品销售毛利对象
	 * @param pageNumber  页数
	 * @param pageSize 每页显示数
	 * @return
	 * @author liux01
	 * @date 2016年11月11日
	 */
	@RequestMapping(value = "goodsSaleProfitList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsSaleProfitReportVo> goodsSaleProfitList(
			GoodsSaleProfitReportVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setSourceBranchId(UserUtil.getCurrBranchId());
			PageUtils<GoodsSaleProfitReportVo> goodsOutInfoDetailList = goodsSaleProfitReportServiceApi.goodsSaleProfitList(vo);
			GoodsSaleProfitReportVo goodsSaleProfitReportVo = goodsSaleProfitReportServiceApi.queryGoodsSaleProfitSum(vo);
			List<GoodsSaleProfitReportVo> footer = new ArrayList<GoodsSaleProfitReportVo>();
			if(goodsSaleProfitReportVo !=null){
				footer.add(goodsSaleProfitReportVo);
			}
			goodsOutInfoDetailList.setFooter(footer);
			LOG.info(LogConstant.PAGE, goodsOutInfoDetailList.toString());
			return goodsOutInfoDetailList;
		} catch (Exception e) {
			LOG.error("单品毛利ABC列表信息异常:{}", e);
		}
		return null;
	}	

	/**
	 * 
	 * @Description: 导出报表信息
	 * @param response
	 * @param vo 商品销售毛利对象
	 * @return
	 * @author liux01
	 * @date 2016年11月11日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportList(HttpServletResponse response, GoodsSaleProfitReportVo vo) {
		RespJson resp = RespJson.success();
		try {
			vo.setSourceBranchId(UserUtil.getCurrBranchId());
			List<GoodsSaleProfitReportVo> exportList = goodsSaleProfitReportServiceApi.exportList(vo);
			GoodsSaleProfitReportVo goodsSaleProfitReportVo = goodsSaleProfitReportServiceApi.queryGoodsSaleProfitSum(vo);
			goodsSaleProfitReportVo.setBranchName("合计:");
			exportList.add(goodsSaleProfitReportVo);
			String fileName = "单品毛利ABC分析"+vo.getStartTime().replace("-", "")+"-"+vo.getEndTime().replace("-", "");
			String templateName = ExportExcelConstant.GOODS_SALE_PROFIT_REPORT;
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("导出单品ABC毛利异常：{}", e);
			resp = RespJson.error("导出导出单品ABC毛利异常");
		}
		return resp;
	}
}
