/** 
 *@Project: okdeer-jxc-web 
 *@Author: chenchm
 *@Date: 2016年11月9日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.report.DataRecord;
import com.okdeer.jxc.common.report.ReportService;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.controller.common.ReportController;
import com.okdeer.jxc.report.service.OutOfStockServiceApi;
@Controller
@RequestMapping("report/outOfStock")
public class OutOfStockController  extends ReportController{

	/**
	 * @Fields PricingQueryService : tiaojdservice
	 */
	@Reference(version = "1.0.0", check = false)
	private OutOfStockServiceApi outOfStockServiceApi;

	@RequestMapping("/view")
	public String view(Model model) {
		return "report/pricing/outOfStock";
	}
	
	@Override
	public ReportService getReportService() {
		return outOfStockServiceApi;
	}

	@Override
	public Map<String, Object> getParam(HttpServletRequest request) {
		Map<String,Object> map= this.builderParams(request, null);
		return map;
		
	}
	
	/**
	 * 
	 * @Description: 导出
	 * @param request
	 * @param response
	 * @return
	 * @author chenchm
	 * @date 2016年11月11日
	 */
	@RequestMapping(value = "/exportList")
	@ResponseBody
	public String exportList(HttpServletRequest request,HttpServletResponse response) {
		Map<String,Object> map=getParam(request);
		List<DataRecord> reportList=null;
		String fileName=null;
		String templateName=null;
		//判断是否是汇总查询/明细
		try {
			DataRecord dataRecord=outOfStockServiceApi.getTotal(map);
			if("0".equals(map.get("type"))){
				LOG.info("导出配送缺货率分析明细导出查询参数:{}" + map.toString());
				reportList=outOfStockServiceApi.getList(map);
				fileName = "配送缺货率明细表" + map.get("startTime").toString().replaceAll("-", "")+'-'+map.get("endTime").toString().replaceAll("-", "");
				templateName = ExportExcelConstant.DELIVERY_DETAIL;
				dataRecord.put("inFormNo", "合计");
				
			}else{
				LOG.info("导出配送缺货率分析汇总导出查询参数:{}" + map.toString());
				reportList=outOfStockServiceApi.getList(map);
				fileName = "配送缺货率汇总表" + map.get("startTime").toString().replaceAll("-", "")+'-'+map.get("endTime").toString().replaceAll("-", "");
				templateName = ExportExcelConstant.DELIVERY_SUM;
				dataRecord.put("skuCode", "合计");
			}
			
			reportList.add(dataRecord);
			exportListForXLSX(response, reportList, fileName, templateName);
			
		} catch (Exception e) {
			LOG.error("调价单导出查询异常:", e);
		}
		return null;
	}
	

	@Override
	public String getFileName() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String[] getHeaders() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String[] getColumns() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void formatter(DataRecord dataRecord) {
		// TODO Auto-generated method stub
		
	}


	
	
}

