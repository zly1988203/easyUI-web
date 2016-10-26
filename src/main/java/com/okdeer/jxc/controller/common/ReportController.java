/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年10月26日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.okdeer.jxc.common.report.DataRecord;
import com.okdeer.jxc.common.report.ReportService;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.utils.poi.ExcelExportUtil;

import net.sf.json.JSONObject;

/**
 * ClassName: ReportController 
 * @Description: TODO
 * @author xiaoj02
 * @date 2016年10月26日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *	v1.2.0				2016-10-26		xiaoj02				报表通用controller
 */

public abstract class ReportController {
	
	public abstract ReportService getReportService();
	
	public abstract Map<String,Object> getParam(HttpServletRequest request);
	
	@RequestMapping("reportList")
	@ResponseBody
	public RespJson reportList(HttpServletRequest request) {
		List<DataRecord> list = getReportService().getList(getParam(request));
		RespJson json =RespJson.success();
		json.put("data", list);
		return json;
	}
	
	@RequestMapping("reportListPage")
	@ResponseBody
	public RespJson reportListPage(HttpServletRequest request, Integer page, Integer rows) {
		PageUtils<DataRecord> list = getReportService().getListPage(getParam(request),page, rows);
		RespJson json =RespJson.success();
		json.put("data", list);
		return json;
	}
	
	@RequestMapping(value = "exportExcel")
	public void exportExcel(HttpServletRequest request, HttpServletResponse response){
		String reportFileName = getFileName();
		String[] headers = getHeaders();
		String[] columns = getColumns();
		List<DataRecord> dataList = getReportService().getList(getParam(request));
		
		List<JSONObject> jsonList = new ArrayList<JSONObject>();
		for (DataRecord dataRecord : dataList) {
			JSONObject jsonObject = new JSONObject();
			//格式化数据
			formatter(dataRecord);
			
			jsonObject.putAll(dataRecord);
			jsonList.add(jsonObject);
		}
		
		ExcelExportUtil.exportExcel(reportFileName, headers, columns, jsonList, response);
	}
	
	public abstract String getFileName();
	
	public abstract String[] getHeaders();
	
	public abstract String[] getColumns();
	
	public abstract void formatter(DataRecord dataRecord);
}
