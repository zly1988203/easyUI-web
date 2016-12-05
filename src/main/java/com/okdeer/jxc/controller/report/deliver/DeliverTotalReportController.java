/** 
 *@Project: okdeer-jxc-web 
 *@Author: lijy02
 *@Date: 2016年10月25日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report.deliver;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.enums.DeliverAuditStatusEnum;
import com.okdeer.jxc.common.report.DataRecord;
import com.okdeer.jxc.common.report.ReportService;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.common.ReportController;
import com.okdeer.jxc.report.deliver.service.DeliverTotalReportServiceApi;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;


@Controller
@RequestMapping("report/deliverTotalReport")
public class DeliverTotalReportController extends ReportController {

	/**
	 * @Fields purchaseReportService : 采购报表service
	 */
	@Reference(version = "1.0.0", check = false)
	private DeliverTotalReportServiceApi deliverTotalReportServiceApi;

	@Reference(version = "1.0.0", check = false)
	BranchesServiceApi branchesServiceApi;
	
	/**
	 * @Description: 采购报表明细
	 * @return
	 * @author lijy02
	 * @date 2016年10月25日
	 */
	@RequestMapping("/view")
	public String view(Model model) {
		SysUser user = getCurrentUser();
		Branches branchesGrow = branchesServiceApi.getBranchInfoById(user.getBranchId());
		model.addAttribute("branchesGrow", branchesGrow);
		
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
		return deliverTotalReportServiceApi;
	}

	@Override
	public Map<String, Object> getParam(HttpServletRequest request) {
		Map<String, Object> map= this.builderParams(request, null);
		
		if(!map.containsKey("categoryType")||"".equals(map.get("categoryType"))){
			map.put("categoryType", "smallCategory");
		}
		//如果查询往来账。默认给查询当前机构的往来
		if("branch".equals(map.get("queryType"))&&!map.containsKey("branchId")){
			map.put("branchId", UserUtil.getCurrBranchId());
		}
		if(!map.containsKey("branchId")){
			map.put("branchCompleCode", UserUtil.getCurrBranchCompleCode());
		}
		return map;
	}

	@RequestMapping("reportListPage")
	@ResponseBody
	public PageUtils<DataRecord> reportListPage(HttpServletRequest request,@RequestParam(value = "page", defaultValue = PAGE_NO)  Integer page,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) Integer rows) {
		PageUtils<DataRecord> list = getReportService().getListPage(getParam(request),page, rows);
		for (DataRecord dataRecord : list.getList()) {
			formatter(dataRecord);
		}
		return list;
	}

	@RequestMapping(value = "exportDeliverExcel")
	public void exportExcel(HttpServletRequest request, HttpServletResponse response){

		Map<String, Object> map = getParam(request);
		String reportFileName="";
		String templateName="";
		if(map.get("queryType")==null||StringUtils.isEmpty(map.get("queryType").toString())){
			return ;
		}
		if("goods".equals(map.get("queryType"))){
			reportFileName="配送汇总"+ "_" + DateUtils.getCurrSmallStr()+"-"+"商品查询";
			templateName="deliverTotalByGoods.xlsx";
		}else if("form".equals(map.get("queryType"))){
			reportFileName="配送汇总"+ "_" + DateUtils.getCurrSmallStr()+"-"+"订单查询";
			templateName="deliverTotalByForm.xlsx";
		}else if("category".equals(map.get("queryType"))){
			reportFileName="配送汇总"+ "_" + DateUtils.getCurrSmallStr()+"-"+"类别汇总查询";
			templateName="deliverTotalByCategory.xlsx";
		}else if("branch".equals(map.get("queryType"))){
			reportFileName="配送汇总"+ "_" + DateUtils.getCurrSmallStr()+"-"+"往来汇总查询";
			templateName="deliverTotalBybranch.xlsx";
		}
		// 模板名称，包括后缀名
		List<DataRecord> dataList=deliverTotalReportServiceApi.getList(map);
		DataRecord data = deliverTotalReportServiceApi.getTotal(map);
		dataList.add(data);
		for (DataRecord dataRecord : dataList) {
			formatter(dataRecord);
		}
		exportListForXLSX(response, dataList, reportFileName, templateName);
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
		return null;
	}

	@Override
	public void formatter(DataRecord dataRecord) {
		if(dataRecord.containsKey("status")){
			String statusName= DeliverAuditStatusEnum.getName(dataRecord.getString("status"));
			dataRecord.put("statusName", statusName);
		}
		if(dataRecord.containsKey("validTime")){
			String dateStr=DateUtils.formatDate(dataRecord.getDate("validTime"), DateUtils.DATE_SMALL_STR_R);
			dataRecord.put("validTimeDesc", dateStr);
		}
	}
	@RequestMapping("reportTotal")
	public DataRecord getTotal(){
		return null;
	}
}
