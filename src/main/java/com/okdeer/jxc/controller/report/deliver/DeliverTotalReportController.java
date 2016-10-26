/** 
 *@Project: okdeer-jxc-web 
 *@Author: lijy02
 *@Date: 2016年10月25日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report.deliver;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.report.DataRecord;
import com.okdeer.jxc.common.report.ReportService;
import com.okdeer.jxc.controller.common.ReportController;
import com.okdeer.jxc.report.deliver.service.DeliverDetailsReportServiceApi;


@Controller
@RequestMapping("report/deliverTotalReport")
public class DeliverTotalReportController extends ReportController {

	/**
	 * @Fields purchaseReportService : 采购报表service
	 */
	@Reference(version = "1.0.0", check = false)
	private DeliverDetailsReportServiceApi deliverDetailsReportServiceApi;

	/**
	 * @Description: 采购报表明细
	 * @return
	 * @author lijy02
	 * @date 2016年10月25日
	 */
	@RequestMapping("/view")
	public String view() {
		return "report/deliver/deliverTotalReport";
	}

	/**
	 * @Description: 采购明细查询
	 * @param qo 采购报名查询字段类
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author lijy02
	 * @date 2016年10月25日
	 */

	@Override
	public ReportService getReportService() {
		return deliverDetailsReportServiceApi;
	}

	@Override
	public Map<String, Object> getParam(HttpServletRequest request) {
		return null;
	}

	@Override
	public String getFileName() {
		return null;
	}

	@Override
	public String[] getHeaders() {
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
