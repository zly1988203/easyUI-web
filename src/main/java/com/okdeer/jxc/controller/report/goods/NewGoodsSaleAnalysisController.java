/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年4月1日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.report.goods;  

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.okdeer.jxc.common.report.DataRecord;
import com.okdeer.jxc.common.report.ReportService;
import com.okdeer.jxc.controller.common.ReportController;


/**
 * ClassName: NewGoodsSaleAnalysisController 
 * @Description: 新平销售分析Controller
 * @author liwb
 * @date 2017年4月1日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@Controller
@RequestMapping("report/newGoodsSaleAnalysis")
public class NewGoodsSaleAnalysisController extends ReportController {
	
	@RequestMapping("/toManager")
	public String toManager(Model model) {
		return "report/goods/goodsTotalAnalysiList";
	}
	

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getReportService()
	 */
	@Override
	public ReportService getReportService() {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getParam(javax.servlet.http.HttpServletRequest)
	 */
	@Override
	public Map<String, Object> getParam(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getFileName()
	 */
	@Override
	public String getFileName() {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getHeaders()
	 */
	@Override
	public String[] getHeaders() {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getColumns()
	 */
	@Override
	public String[] getColumns() {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#formatter(com.okdeer.jxc.common.report.DataRecord)
	 */
	@Override
	public void formatter(DataRecord dataRecord) {
		// TODO Auto-generated method stub
		
	}

}
