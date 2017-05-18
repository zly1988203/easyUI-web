/** 
 *@Project: okdeer-jxc-web 
 *@Author: liux01
 *@Date: 2016年10月26日 
 *@Copyright: ©2014-2020 www.yschome.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.report;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.report.service.GoodsOutInDetailServiceApi;
import com.okdeer.jxc.report.vo.GoodsOutInDetailVo;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: GoodsOutInDetailReportController 
 * @Description: 商品出入库明细报表
 * @author liux01
 * @date 2016年10月26日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 零售V2.5			2017-05-05		 zhangqin			 报表及导出增加成本价和成本金额，并进价文案修改为单价，进价金额改为单据金额。规范注释及LOG。
 */
@Controller
@RequestMapping("goods/goodsDetail")
public class GoodsOutInDetailReportController extends BaseController<GoodsOutInDetailReportController> {
	
	/**
	 * 商品出入库明细报表Dubbo接口
	 */
	@Reference(version = "1.0.0", check = false)
	private GoodsOutInDetailServiceApi goodsOutInDetailServiceApi;
	
	/**
	 * 
	 * @Description: 报表页跳转
	 * @return String  
	 * @author zhangq
	 * @date 2017年5月5日
	 */
	@RequestMapping(value = "/list")
	public String list(){
		return "/report/goods/goodsOutInDetailReport";
	}
	
	/**
	 * 
	 * @Description: 获取列表数据
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return PageUtils<GoodsOutInDetailVo>  
	 * @author zhangq
	 * @date 2017年5月5日
	 */
	@RequestMapping(value = "getGoodsOutInDetailList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsOutInDetailVo> getGoodsOutInDetailList(
			GoodsOutInDetailVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.debug("获取商品出入库明细报表数据,入参{}", vo.toString());
		
		try {
			//分页参数设置
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			
			//处理供应商
			String supplierName = vo.getSupplierName();
			if(StringUtils.isNotBlank(supplierName)){
				supplierName = supplierName.substring(supplierName.lastIndexOf("]")+1,supplierName.length());
				vo.setSupplierName(supplierName);
			}
			
			//机构编号
			vo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
			
			//报表数据
			PageUtils<GoodsOutInDetailVo> goodsOutInfoDetailList = goodsOutInDetailServiceApi.getGoodsOutInDetailList(vo);
			
			//汇总数据
			GoodsOutInDetailVo goodsOutInDetailVo = goodsOutInDetailServiceApi.queryGoodsOutInDetailCountSum(vo);
			List<GoodsOutInDetailVo> footer = new ArrayList<GoodsOutInDetailVo>();
			if (goodsOutInDetailVo != null){
				footer.add(goodsOutInDetailVo);
			}
			goodsOutInfoDetailList.setFooter(footer);

			return goodsOutInfoDetailList;
		} catch (Exception e) {
			LOG.error("获取商品出入库明细报表异常:{}", e);
		}
		
		return null;
	}	
	

	/**
	 * 
	 * @Description: 导出数据
	 * @param response
	 * @param vo
	 * @return RespJson  
	 * @author zhangq
	 * @date 2017年5月5日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportList(HttpServletResponse response, GoodsOutInDetailVo vo) {
		LOG.debug("导出商品出入库明细报表数据,入参{}", vo.toString());
		
		RespJson resp = RespJson.success();
		try {
			//处理供应商
			String supplierName = vo.getSupplierName();
			if(StringUtils.isNotBlank(supplierName)){
				supplierName = supplierName.substring(supplierName.lastIndexOf("]")+1,supplierName.length());
				vo.setSupplierName(supplierName);
			}
			
			//机构编号
			vo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
			
			//报表数据
			List<GoodsOutInDetailVo> exportList = goodsOutInDetailServiceApi.exportList(vo);
			
			//汇总数据
			GoodsOutInDetailVo goodsOutInDetailVo = goodsOutInDetailServiceApi.queryGoodsOutInDetailCountSum(vo);
			goodsOutInDetailVo.setBranchCode("合计：");
			exportList.add(goodsOutInDetailVo);
			
			//导出Excel
			String fileName = "商品出入库明细查询";
			String templateName = ExportExcelConstant.GOODS_OUT_IN_DETAIL_REPORT;
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("导出商品出入库明细异常:{}", e);
			resp = RespJson.error("导出商品出入库明细异常");
		}
		
		return resp;
	}
}
