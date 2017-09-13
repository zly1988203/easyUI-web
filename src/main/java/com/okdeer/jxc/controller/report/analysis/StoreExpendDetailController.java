/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年9月11日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report.analysis;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.report.analysis.qo.StoreExpendDetailQo;
import com.okdeer.jxc.report.analysis.service.StoreExpendDetailService;
import com.okdeer.jxc.utils.poi.ExcelExportUtil;
import com.okdeer.retail.common.entity.colsetting.GridColumn;
import com.okdeer.retail.common.report.DataRecord;
import com.okdeer.retail.common.util.JacksonUtil;

/**
 * ClassName: StoreExpendDetailController 
 * @Description: 门店费用开支明细报表Controller
 * @author liwb
 * @date 2017年9月11日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@SuppressWarnings("deprecation")
@RestController
@RequestMapping("report/storeExpendDetail")
public class StoreExpendDetailController extends BaseController<StoreExpendDetailController> {

	@Reference(version = "1.0.0", check = false)
	private StoreExpendDetailService storeExpendDetailService;

	/**
	 * 跳转到列表
	 */
	@RequestMapping(value = "toManager")
	public ModelAndView toManager() {
		return new ModelAndView("report/analysis/storeExpendDetailList");
	}

	@RequestMapping(value = "getList", method = RequestMethod.POST)
	public PageUtils<DataRecord> getList(StoreExpendDetailQo qo) {

		try {

			// 构建查询参数
			buildParams(qo);

			LOG.debug("查询门店费用开支明细报表条件：{}", qo);

			PageUtils<DataRecord> page = storeExpendDetailService.getReportList(qo);

			return page;
		} catch (Exception e) {
			LOG.error("查询门店费用开支明细报表异常:", e);
		}
		return PageUtils.emptyPage();
	}

	@RequestMapping(value = "getColumns", method = RequestMethod.POST)
	public RespJson getColumns(StoreExpendDetailQo qo) {
		try {
			// 构建查询参数
			buildParams(qo);

			LOG.debug("获取门店费用开支明细报表列数据查询条件：{}", qo);

			List<DataRecord> storeList = storeExpendDetailService.getStoreList(qo);

			if (CollectionUtils.isEmpty(storeList)) {
				LOG.warn("获取门店费用开支明细报表列数据为空！");
				return RespJson.businessError("获取门店费用开支明细报表列数据为空!");
			}

			List<GridColumn> storeInfoList = new ArrayList<GridColumn>();
			List<GridColumn> storeAmountList = new ArrayList<GridColumn>();

			GridColumn itemName = new GridColumn();
			itemName.setField(StoreExpendDetailService.COLUMN_ITEM_NAME);
			itemName.setTitle("项目");
			itemName.setRowspan(2); // 行合并
			itemName.setWidth("100px");
			storeInfoList.add(itemName);

			StringBuffer formatSb = new StringBuffer();
			formatSb.append(".separator.function(value,row,index){");
			formatSb.append("return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';");
			formatSb.append("}.separator.");

			int i = 1;
			for (DataRecord r : storeList) {
				GridColumn store = new GridColumn();
				store.setField(StoreExpendDetailService.COLUMN_BRANCH_NAME + i);
				store.setTitle(r.getString(StoreExpendDetailService.COLUMN_BRANCH_NAME));
				store.setColspan(2); // 列合并

				GridColumn column1 = new GridColumn();
				GridColumn column2 = new GridColumn();

				column1.setField(StoreExpendDetailService.COLUMN_MONTH_AMOUNT + i);
				column1.setTitle("当月金额");
				column1.setAlign("right"); // 金额右对齐
				column1.setWidth("120px");
				column1.setFormatter(formatSb.toString());

				column2.setField(StoreExpendDetailService.COLUMN_TOTAL_AMOUNT + i);
				column2.setTitle("累计金额");
				column2.setAlign("right"); // 金额右对齐
				column2.setWidth("120px");
				column2.setFormatter(formatSb.toString());

				storeInfoList.add(store);
				storeAmountList.add(column1);
				storeAmountList.add(column2);

				if (i >= 20) {
					break;
				}

				i++;
			}

			List<List<GridColumn>> columns = new ArrayList<List<GridColumn>>();
			columns.add(storeInfoList);
			columns.add(storeAmountList);

			String data = JacksonUtil.toJson(columns);
			data = data.replaceAll("\".separator.", "").replaceAll(".separator.\"", "");

			RespJson respJson = RespJson.success();
			respJson.setData(data);

			return respJson;
		} catch (Exception e) {
			LOG.error("获取门店费用开支明细报表列数据异常:", e);
		}
		return RespJson.error();
	}

	/**
	 * @Description: 构建查询参数
	 * @param qo
	 * @author liwb
	 * @date 2017年5月27日
	 */
	private void buildParams(StoreExpendDetailQo qo) {
		// 默认当前机构
		if (StringUtils.isBlank(qo.getBranchCompleCode())) {
			qo.setBranchCompleCode(super.getCurrBranchCompleCode());
		}

		if (qo.getRptDate() != null) {
			Date rptStartDate = DateUtils.getYearFirstDay(qo.getRptDate()); // 获取年第一天
			qo.setRptStartDate(rptStartDate);
		}
	}

	@RequestMapping(value = "exportList", method = RequestMethod.POST)
	public void exportList(StoreExpendDetailQo qo, HttpServletResponse response) {
		try {
			// 构建查询参数
			buildParams(qo);

			LOG.debug("查询门店费用开支明细报表条件：{}", qo);

			String timeStr = DateUtils.formatDate(qo.getRptDate(), DateUtils.DATE_JFP_STR);

			// 导出文件名称，不包括后缀名
			String reportFileName = "门店费用开支明细报表_" + timeStr;

			List<DataRecord> storeList = storeExpendDetailService.getStoreList(qo);

			List<String> headerList = new ArrayList<String>();
			List<String> columnList = new ArrayList<String>();

			headerList.add("项目");
			columnList.add(StoreExpendDetailService.COLUMN_ITEM_NAME);

			int i = 1;
			for (DataRecord store : storeList) {
				headerList.add(store.getString(StoreExpendDetailService.COLUMN_BRANCH_NAME));
				headerList.add(store.getString(StoreExpendDetailService.COLUMN_BRANCH_NAME));
				columnList.add(StoreExpendDetailService.COLUMN_MONTH_AMOUNT + i);
				columnList.add(StoreExpendDetailService.COLUMN_TOTAL_AMOUNT + i);
				i++;
			}

			String[] headers = headerList.toArray(new String[headerList.size()]);
			String[] columns = columnList.toArray(new String[columnList.size()]);

			// 模板名称，包括后缀名
			List<DataRecord> reportList = storeExpendDetailService.getReportListForExport(qo);

			List<JSONObject> dataList = new ArrayList<JSONObject>();
			for (DataRecord r : reportList) {
				JSONObject jObj = new JSONObject();
				for (Entry<String, Object> entry : r.entrySet()) {
					jObj.put(entry.getKey(), entry.getValue());
				}
				dataList.add(jObj);
			}

			// 和并列的公用列名
			String[] mergeHeaders = new String[] { "当月金额", "年累计金额" };

			// 从第一行开始合并列头
			int firstColIndex = 1;

			ExcelExportUtil.exportMergeHeaderExcel(reportFileName, headers, columns, dataList, response, firstColIndex,
					mergeHeaders);

		} catch (Exception e) {
			LOG.error("门店费用开支明细报表导出失败", e);
		}

	}

}
