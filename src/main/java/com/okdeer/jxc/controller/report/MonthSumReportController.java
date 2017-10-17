package com.okdeer.jxc.controller.report;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.controller.BaseReportController;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.utils.PriceGrantUtil;
import com.okdeer.jxc.utils.UserUtil;
import com.okdeer.retail.common.page.EasyUIPageInfo;
import com.okdeer.retail.common.price.DataAccessParser;
import com.okdeer.retail.common.util.GridExportPrintUtils;
import com.okdeer.retail.facade.report.facade.BaseReportFacade;
import com.okdeer.retail.facade.report.facade.MonthSumReportFacade;
import com.okdeer.retail.facade.report.qo.MonthSumReportQo;
import com.okdeer.retail.facade.report.vo.MonthSumReportVo;

/**
 * 
 * ClassName: MonthSumReportController 
 * @Description: 月进销存报表
 * @author zhangq
 * @date 2017年7月17日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("report/month")
public class MonthSumReportController extends BaseReportController<MonthSumReportQo, MonthSumReportVo> {
	/**
	 * 日进销存报表Dubbo接口
	 */
	@Reference(version = "1.0.0", check = false)
	private MonthSumReportFacade monthSumReportFacade;

	@Override
	protected String getViewName() {
		return "/report/month/monthSumReport";
	}
	//因为之前的菜单已经固定为list。。。
	@RequestMapping(value = "/list")
	public String list(Model model) {
		return this.index(model);
	}
	//因为之前的菜单已经固定为list，用list显示查询会菜单路径冲突。。。
	@RequestMapping(value = "/getData", method = RequestMethod.POST)
	@ResponseBody
	public EasyUIPageInfo<MonthSumReportVo> getReportList(MonthSumReportQo qo, @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		return super.getReportList(qo, pageNumber, pageSize);

	}

	@Override
	protected Model getModel(Model model) {
		model.addAttribute("startTime",
				LocalDate.now().minusMonths(1).format(DateTimeFormatter.ofPattern(DateUtils.DATE_JFP_STR_R)));
		return model;
	}

	@Override
	protected MonthSumReportQo getQueryObject(MonthSumReportQo qo) {
		// 如果机构为空
		if (StringUtils.isEmpty(qo.getBranchId())) {
			qo.setBranchId(UserUtil.getCurrBranchId());
		}
		// 月结日期
		if (StringUtils.isEmpty(qo.getSumDate())) {
			qo.setSumDate(LocalDate.now().format(DateTimeFormatter.ofPattern(DateUtils.DATE_JFP_STR_R)));
		}
		return null;
	}

	@Override
	protected Class<MonthSumReportVo> getViewObjectClass() {
		return MonthSumReportVo.class;
	}

	@Override
	protected BaseReportFacade<MonthSumReportQo, MonthSumReportVo> getReportFade() {
		return monthSumReportFacade;
	}	
	@RequestMapping(value = "/export", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportList(HttpServletResponse response, MonthSumReportQo qo) {
		RespJson resp = RespJson.success();
		try {
			getQueryObject(qo);
			// 导出的数据列表
			List<MonthSumReportVo> exportList = new ArrayList<MonthSumReportVo>();

			// 限制导出数据的起始数量
			int startCount = limitStartCount(qo.getStartCount());
			// 限制导出数据的总数量
			int endCount = limitEndCount(qo.getEndCount());

			// 商，按2K条数据一次查询拆分，可以拆分为多少次查询
			int resIndex = (int) (endCount / LIMIT_REQ_COUNT);
			// 余数，按2K拆分后，剩余的数据
			int modIndex = endCount % LIMIT_REQ_COUNT;

			// 每2K条数据一次查询

			for(int i = 0; i < resIndex; i++){
				//如果行数是2000整倍数，最后一次查询
				if(modIndex==0&&i==resIndex){
					qo.setTotal(true);
					qo.setTotalStartCount(startCount);
					qo.setTotalStartCount(endCount);
				}

				int newStart = (i * LIMIT_REQ_COUNT) + startCount;
				qo.setStartCount(newStart);
				qo.setEndCount(LIMIT_REQ_COUNT);
				List<MonthSumReportVo> tempList = getReportFade().queryList(qo);
				exportList.addAll(tempList);

			}

			// 存在余数时，查询剩余的数据
			if(modIndex > 0){
				int newStart = (resIndex * LIMIT_REQ_COUNT) + startCount;
				int newEnd = modIndex;
				qo.setStartCount(newStart);
				qo.setEndCount(newEnd);
				
				qo.setTotal(true);
				qo.setTotalStartCount(startCount);
				qo.setTotalEndCount(endCount);
				List<MonthSumReportVo> tempList = getReportFade().queryList(qo);
				exportList.addAll(tempList);
			}

			// 无权限访问的字段
			Set<String> forbiddenSets = PriceGrantUtil.getNoPriceGrantSets();
			DataAccessParser parser = new DataAccessParser(getViewObjectClass(), forbiddenSets);
			forbiddenSets = parser.getAllForbiddenSets();

			// 导出
			GridExportPrintUtils.exportAccessExcel(getViewObjectClass(), exportList, forbiddenSets, response,
					qo.getReportType());
		} catch (Exception e) {
			LOG.error("导出列表信息异常:{}", e);
			resp = RespJson.error("导出列表信息异常");
		}
		return resp;
	}
}
