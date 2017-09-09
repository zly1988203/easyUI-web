/** 
 *@Project: okdeer-jxc-web 
 *@Author: taomm
 *@Date: 2016年8月15日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report.logistics;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.goods.qo.GoodsBarcodeQo;
import com.okdeer.jxc.goods.service.GoodsBarcodeService;

/**
 * 
 * ClassName: LogisticsGoodsBarcodeController 
 * @Description: 物流系统辅条码导出
 * @author zhangchm
 * @date 2017年8月9日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("logisticsGoodsBarcode")
public class LogisticsGoodsBarcodeController extends BaseController<LogisticsGoodsBarcodeController> {

	@Reference(version = "1.0.0", check = false)
	private GoodsBarcodeService goodsBarcodeService;

	/**
	 * @Description: 物流系统辅条码导出页面
	 * @return   
	 * @author zhongy
	 * @date 2017年02月08日
	 */
	@RequestMapping(value = "view")
	public String view() {
		return "logistics/goodsBarcode";
	}
	
	/**
	 * 
	 * @Description: 查询物流系统辅条码
	 * @param qo
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @return PageUtils<Map<String,Object>>  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月9日
	 */
	@RequestMapping(value = "queryGoodsBarcodeList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<Map<String,Object>> queryGoodsBarcodeList(GoodsBarcodeQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			String branchName = qo.getBranchName();
			if(StringUtils.isNotBlank(branchName)){
				branchName = branchName.substring(branchName.lastIndexOf("]")+1,branchName.length());
				qo.setBranchName(branchName);
			}
			if(StringUtils.isNotBlank(qo.getSkuCode())){
				qo.setSkuCode(qo.getSkuCode().trim());
			}else{
				qo.setSkuCode("");
			}
			qo.setBranchCompleCode(getCurrBranchCompleCode());
			PageUtils<Map<String,Object>> goodsBarcode = goodsBarcodeService.queryListsPage(qo);
			return goodsBarcode;
		} catch (Exception e) {
			LOG.error("查询查询品牌异常:", e);
		}
		return null;
	}
	
	/**
	 * @Description: 物流系统辅条码报表导出
	 * @param qo
	 * @param response
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月9日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public String exportList(GoodsBarcodeQo qo, HttpServletResponse response) {
		try {
			String branchName = qo.getBranchName();
			if(StringUtils.isNotBlank(branchName)){
				branchName = branchName.substring(branchName.lastIndexOf("]")+1,branchName.length());
				qo.setBranchName(branchName);
			}
			if(StringUtils.isNotBlank(qo.getSkuCode())){
				qo.setSkuCode(qo.getSkuCode().trim());
			}else{
				qo.setSkuCode("");
			}
			qo.setBranchCompleCode(getCurrBranchCompleCode());
			List<Map<String,Object>> exportList = goodsBarcodeService.queryReportLists(qo);
			String fileName = "SPTM" + "_" + DateUtils.formatDate(DateUtils.getCurrDate(), DateUtils.DATE_KEY_STR);
			String templateName = ExportExcelConstant.GOODS_BARCODE_REPORT;
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("商品条码报表导出异常:", e);
		}
		return null;
	}
	
}
