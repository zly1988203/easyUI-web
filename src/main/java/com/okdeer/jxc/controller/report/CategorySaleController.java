/** 
 *@Project: okdeer-jxc-web 
 *@Author: liux01
 *@Date: 2016年10月25日 
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
import com.okdeer.jxc.report.service.CategorySaleReportServiceApi;
import com.okdeer.jxc.report.vo.CategorySaleReportVo;
import com.okdeer.jxc.utils.UserUtil;


/**
 * ClassName: CategorySaleController 
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
@RequestMapping("categorySale/report")
public class CategorySaleController extends BaseController<CategorySaleController> {
	@Reference(version = "1.0.0", check = false)
	private CategorySaleReportServiceApi categorySaleReportServiceApi;
	
	@RequestMapping(value = "/list")
	public String list(){
		return "/report/retail/categorySaleReport";
	}
	/**
	 * 
	 * @Description: 获取店铺列表销售汇总情况信息
	 * @param vo 入参
	 * @param pageNumber 页数
	 * @param pageSize 每页显示数
	 * @return
	 * @author liux01
	 * @date 2016年10月26日
	 */
	@RequestMapping(value = "getCategorySaleList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<CategorySaleReportVo> getCategorySaleList(
			CategorySaleReportVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.debug(LogConstant.OUT_PARAM, vo.toString());
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setSourceBranchId(UserUtil.getCurrBranchId());
			PageUtils<CategorySaleReportVo> goodsSaleReportList = categorySaleReportServiceApi.getCategorySaleList(vo);
			CategorySaleReportVo categorySaleReportVo = categorySaleReportServiceApi.queryCategorySaleCountSum(vo);
			List<CategorySaleReportVo> footer = new ArrayList<CategorySaleReportVo>();
			if(categorySaleReportVo != null){
				footer.add(categorySaleReportVo);
			}
			goodsSaleReportList.setFooter(footer);
			// 过滤数据权限字段
			cleanAccessData(goodsSaleReportList);
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
	public RespJson exportList(HttpServletResponse response, CategorySaleReportVo vo) {
		RespJson resp = RespJson.success();
		try {
			vo.setSourceBranchId(UserUtil.getCurrBranchId());
			/*List<CategorySaleReportVo> exportList = categorySaleReportServiceApi.exportList(vo);*/
			// 导出的数据列表
			List<CategorySaleReportVo> exportList = new ArrayList<CategorySaleReportVo>();
			
			// 限制导出数据的起始数量
			int startCount = limitStartCount(vo.getStartCount());
			// 限制导出数据的总数量
			int endCount = limitEndCount(vo.getEndCount());
			
			// 商，按2K条数据一次查询拆分，可以拆分为多少次查询
			int resIndex = (int) (endCount / LIMIT_REQ_COUNT);
			// 余数，按2K拆分后，剩余的数据
			int modIndex = endCount % LIMIT_REQ_COUNT;
			
			// 每2K条数据一次查询
			for(int i = 0; i < resIndex; i++){
				int newStart = (i * LIMIT_REQ_COUNT) + startCount;
				vo.setStartCount(newStart);
				vo.setEndCount(LIMIT_REQ_COUNT);
				List<CategorySaleReportVo> tempList = categorySaleReportServiceApi.exportList(vo);
				exportList.addAll(tempList);
			}
			
			// 存在余数时，查询剩余的数据
			if(modIndex > 0){
				int newStart = (resIndex * LIMIT_REQ_COUNT) + startCount;
				int newEnd = modIndex;
				vo.setStartCount(newStart);
				vo.setEndCount(newEnd);
				List<CategorySaleReportVo> tempList = categorySaleReportServiceApi.exportList(vo);
				exportList.addAll(tempList);
			}
			String fileName = "类别销售分析表";
			String templateName = ExportExcelConstant.CATEGORY_SALE_REPORT;

			cleanAccessData(exportList);
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("导出库存调整商品异常：{}", e);
			resp = RespJson.error("导出库存调整商品异常");
		}
		return resp;
	}
}
