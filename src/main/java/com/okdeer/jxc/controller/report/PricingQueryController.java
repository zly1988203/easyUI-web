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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.report.DataRecord;
import com.okdeer.jxc.common.report.ReportService;
import com.okdeer.jxc.common.utils.BooleanUtils;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.controller.common.ReportController;
import com.okdeer.jxc.report.service.PricingQueryServiceApi;
@Controller
@RequestMapping("report/pricingQuery")
public class PricingQueryController  extends ReportController{

	/**
	 * @Fields PricingQueryService : tiaojdservice
	 */
	@Reference(version = "1.0.0", check = false)
	private PricingQueryServiceApi pricingQueryServiceApi;

	@RequestMapping("/view")
	public String view() {
		return "report/pricing/pricingQuery";
	}
	
	@Override
	public ReportService getReportService() {
		return pricingQueryServiceApi;
	}
	/**
	 * 查询调价单列表
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getReportService()
	 */
	@Override
	public Map<String, Object> getParam(HttpServletRequest request) {
		Map<String,Object> map= this.builderParams(request, null);
		return map;
		
	}
	/**
	 * 
	 * @Description: 调价单查询导出
	 * @param request
	 * @param response
	 * @return
	 * @author chenchm
	 * @date 2016年11月11日
	 */
	@RequestMapping(value = "/exportList")
	@ResponseBody
	public String exportList(HttpServletRequest request,HttpServletResponse response) {
		
		try {
			Map<String,Object> map=getParam(request);
			LOG.info("调价单导出查询参数:{}" + map.toString());
			List<DataRecord> reportList=pricingQueryServiceApi.getList(map);
			String fileName = "调价查询" +map.get("startTime").toString().replaceAll("-", "")+'-'+map.get("endTime").toString().replaceAll("-", "");
			String templateName = ExportExcelConstant.PRICING_QUERY;
			for(DataRecord dataRecord:reportList){
				formatter(dataRecord);
			}
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
    /**
     * 导出isEffected 0,1 转换为 是 ,否
     * (non-Javadoc)
     * @see com.okdeer.jxc.controller.common.ReportController#formatter(com.okdeer.jxc.common.report.DataRecord)
     */
	@Override
	public void formatter(DataRecord dataRecord) {
		dataRecord.put("isEffected",  BooleanUtils.getBooleanStrDesc((Integer)dataRecord.get("isEffected")));
	}


	
	
}

