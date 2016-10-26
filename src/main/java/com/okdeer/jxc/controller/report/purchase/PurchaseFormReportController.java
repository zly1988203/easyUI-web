/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年10月26日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.report.purchase;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.report.DataRecord;
import com.okdeer.jxc.common.report.ReportService;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.controller.common.ReportController;
import com.okdeer.jxc.form.purchase.service.PurchaseFormReportServiceApi;

/**
 * ClassName: PurchaseReportController 
 * @Description: TODO
 * @author xiaoj02
 * @date 2016年10月26日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@RequestMapping("report/purchase")
@Controller
public class PurchaseFormReportController extends ReportController{
	
	@Reference(version = "1.0.0", check = false)
	private PurchaseFormReportServiceApi serviceApi;

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getParam(javax.servlet.http.HttpServletRequest)
	 */
	@Override
	public Map<String, Object> getParam(HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		String type =	request.getParameter("type");
		map.put("type", type);
		return map;
	}
	
	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getReportService()
	 */
	@Override
	public ReportService getReportService() {
		return serviceApi;
	}
	
	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getHeaders()
	 */
	@Override
	public String[] getHeaders() {
		
		return new String[]{
				"单据编号",
				"单据类型",
				"金额",
				"状态",
				"创建时间"
				};
		
	}
	
	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getColumns()
	 */
	@Override
	public String[] getColumns() {
		return new String[]{
				"form_no",
				"form_type",
				"amount",
				"status",
				"create_time"
				};
	}
	
	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#formatter(com.okdeer.jxc.common.report.DataRecord)
	 */
	@Override
	public void formatter(DataRecord dataRecord) {
		String formType = dataRecord.getString("form_type");
		if(formType!=null){
			switch (formType) {
				case "PA":
					dataRecord.put("form_type","采购订单");
					break;
				case "PI":	
					dataRecord.put("form_type","采购收货单");
					break;
				case "PR":
					dataRecord.put("form_type","采购退货单");
					break;
				default:
					break;
			}
		}
		Integer status = dataRecord.getInteger("status");
		if(status!=null){
			switch (status) {
				case 0:
					dataRecord.put("status","待审核");
					break;
				case 1:	
					dataRecord.put("status","审核通过");
					break;
				case 2:
					dataRecord.put("form_type","审核不通过");
					break;
				default:
					break;
			}
		}
		
		String createTime = dataRecord.getDateString("create_time",DateUtils.DATE_FULL_STR);
		if(createTime!=null){
			dataRecord.put("create_time",createTime);
		}
		
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getFileName()
	 */
	@Override
	public String getFileName() {
		return "采购";
	}
	
}
