/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年4月5日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.sale;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.exception.BusinessException;
import com.okdeer.jxc.common.report.DataRecord;
import com.okdeer.jxc.common.report.ReportService;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.common.ReportController;
import com.okdeer.jxc.sale.activity.service.ActivityDetailQueryService;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: ActivityGoodsController 
 * @Description: 促销方案详情查询Controller
 * @author liwb
 * @date 2017年4月5日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@Controller
@RequestMapping("sale/activityDetailReport")
public class ActivityDetailQueryController extends ReportController {

	@Reference(version = "1.0.0", check = false)
	private ActivityDetailQueryService activityDetailQueryService;

	/**
	 * 跳转到列表
	 */
	@RequestMapping(value = "toManager")
	public String viewList() {
		return "sale/activityGoods/list";
	}

	/**
	 * @Description: 导出功能
	 * @param request
	 * @param response
	 * @author liwb
	 * @date 2017年4月5日
	 */
	@RequestMapping(value = "exportExcelList")
	public void exportExcelList(HttpServletRequest request, HttpServletResponse response) {
		try {
			LOG.debug("促销明细查询导出功能");
			Map<String, Object> map = getParam(request);
			String reportFileName = "";
			String templateName = "";
			String queryType = map.containsKey("queryType") ? map.get("queryType").toString() : null;
			if (StringUtils.isBlank(queryType)) {
				throw new BusinessException("系统错误，促销类型为空");
			}

			String timeStr = StringUtils.replace(map.get("startTime").toString(), "-", "") + "-"
					+ StringUtils.replace(map.get("endTime").toString(), "-", "");

			if ("goods".equals(queryType)) { // 商品促销
				reportFileName = "商品促销明细查询" + timeStr;
				templateName = ExportExcelConstant.ACTIVITY_DETAIL_QUERY_FOR_GOODS;

			} else if ("category".equals(queryType)) {// 类别促销
				reportFileName = "类别促销明细查询" + timeStr;
				templateName = ExportExcelConstant.ACTIVITY_DETAIL_QUERY_FOR_CATEGORY;

			} else if ("fullReduction".equals(queryType)) {// 满减促销
				reportFileName = "满减促销明细查询" + timeStr;
				templateName = ExportExcelConstant.ACTIVITY_DETAIL_QUERY_FOR_FULLREDUCTION;

			}

			// 模板名称，包括后缀名
			List<DataRecord> dataList = activityDetailQueryService.getList(map);

			exportListForXLSX(response, dataList, reportFileName, templateName);
		} catch (Exception e) {
			LOG.error("促销明细查询导出失败", e);
		}
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getReportService()
	 */
	@Override
	public ReportService getReportService() {
		return activityDetailQueryService;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getParam(javax.servlet.http.HttpServletRequest)
	 */
	@Override
	public Map<String, Object> getParam(HttpServletRequest request) {
		Map<String, Object> map = this.builderParams(request, null);
		if (!map.containsKey("branchCompleCode")) {
			map.put("branchCompleCode", UserUtil.getCurrBranchCompleCode());
		}
		return map;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getFileName()
	 */
	@Override
	public String getFileName() {
		return null;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getHeaders()
	 */
	@Override
	public String[] getHeaders() {
		return null;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#getColumns()
	 */
	@Override
	public String[] getColumns() {
		return null;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.controller.common.ReportController#formatter(com.okdeer.jxc.common.report.DataRecord)
	 */
	@Override
	public void formatter(DataRecord dataRecord) {

	}

}
