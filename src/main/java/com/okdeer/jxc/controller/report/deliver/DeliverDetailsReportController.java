/** 
 *@Project: okdeer-jxc-web 
 *@Author: lijy02
 *@Date: 2016年10月25日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report.deliver;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.report.DataRecord;
import com.okdeer.jxc.common.report.ReportService;
import com.okdeer.jxc.controller.common.ReportController;
import com.okdeer.jxc.report.deliver.service.DeliverTotalReportServiceApi;


@Controller
@RequestMapping("report/deliverDetailReport")
public class DeliverDetailsReportController extends ReportController {
	protected final Logger LOG = LoggerFactory.getLogger(this.getClass());
	/**
	 * @Fields purchaseReportService : 采购报表service
	 */
	@Reference(version = "1.0.0", check = false)
	private DeliverTotalReportServiceApi deliverTotalReportServiceApi;
	/**
	 * @Description: 采购报表明细
	 * @return
	 * @author lijy02
	 * @date 2016年10月25日
	 */
	@RequestMapping("/view")
	public String view() {
		return "report/deliver/deliverDetailsReport";
	}
	@Override
	public ReportService getReportService() {
		return null;
	}

	@Override
	public Map<String, Object> getParam(HttpServletRequest request) {
		// TODO Auto-generated method stub
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
