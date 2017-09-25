/** 
 *@Project: okdeer-jxc-web 
 *@Author: liux01
 *@Date: 2016年10月25日 
 *@Copyright: ©2014-2020 www.yschome.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.report;

import com.alibaba.dubbo.rpc.RpcContext;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.report.service.GoodsSaleReportServiceApi;
import com.okdeer.jxc.report.vo.GoodsSaleReportVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Future;


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
	//@Reference(version = "1.0.0", check = false)
	@Resource
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
		LOG.debug(LogConstant.OUT_PARAM, vo.toString());
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			//修改zhuangrh20170815 start
			if (StringUtils.isBlank(vo.getBranchCompleCode())){ //如果前端不传取当前用户机构编码
				vo.setBranchCompleCode(getCurrBranchCompleCode());
			}
			//buildParam(vo);
			//修改zhuangrh20170815 end
			goodsSaleReportServiceApi.getGoodsSaleList(vo);
			Future<PageUtils<GoodsSaleReportVo>> goodsSaleReportListFuture = RpcContext.getContext().getFuture();

			goodsSaleReportServiceApi.queryGoodsSaleCountSum(vo);
			Future<GoodsSaleReportVo> goodsSaleReportVoFuture = RpcContext.getContext().getFuture();

			GoodsSaleReportVo goodsSaleReportVo = goodsSaleReportVoFuture.get();
			List<GoodsSaleReportVo> footer = new ArrayList<GoodsSaleReportVo>();
			if(goodsSaleReportVo !=null){
				footer.add(goodsSaleReportVo);
			}
			PageUtils<GoodsSaleReportVo> goodsSaleReportList = goodsSaleReportListFuture.get();
			goodsSaleReportList.setFooter(footer);
			LOG.debug(LogConstant.PAGE, goodsSaleReportList.toString());
			// 过滤数据权限字段
			cleanAccessData(goodsSaleReportList);
			return goodsSaleReportList;
		} catch (Exception e) {
			LOG.error("获取单据列表信息异常:{}", e);
		}
		return null;
	}

	/**
	 * @Description: 构建查询参数
	 * @param vo
	 * @author zhengwj
	 * @date 2017年7月26日
	 */
	private void buildParam(GoodsSaleReportVo vo) {
		if (StringUtils.isNotBlank(vo.getSupplierId())) {
			vo.setSupplierName(null);
		} else if (StringUtils.isNotBlank(vo.getSupplierName()) && vo.getSupplierName().indexOf("]") > 0) {
			vo.setSupplierName(vo.getSupplierName().substring(vo.getSupplierName().indexOf("]") + 1));
		}
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
			vo.setBranchCompleCode(getCurrBranchCompleCode());
			buildParam(vo);
			//List<GoodsSaleReportVo> exportList =
			goodsSaleReportServiceApi.exportList(vo);
			Future<List<GoodsSaleReportVo>> exportListFuture = RpcContext.getContext().getFuture();

			//GoodsSaleReportVo goodsSaleReportVo = goodsSaleReportServiceApi.queryGoodsSaleCountSum(vo);
			goodsSaleReportServiceApi.queryGoodsSaleCountSum(vo);
			Future<GoodsSaleReportVo> goodsSaleReportVoFuture = RpcContext.getContext().getFuture();

			GoodsSaleReportVo goodsSaleReportVo = goodsSaleReportVoFuture.get();
			List<GoodsSaleReportVo> exportList = exportListFuture.get();
			if (goodsSaleReportVo != null) {
				goodsSaleReportVo.setBranchName("合计：");
				exportList.add(goodsSaleReportVo);
			}
			String fileName = "商品销售汇总表";

			String templateName = ExportExcelConstant.GOODS_SALE_REPORT;

			cleanAccessData(exportList);
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("导出商品销售汇总异常：{}", e);
			resp = RespJson.error("导出商品销售汇总异常");
		}
		return resp;
	}
	
}
