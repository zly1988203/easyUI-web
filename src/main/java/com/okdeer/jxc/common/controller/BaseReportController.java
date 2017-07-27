package com.okdeer.jxc.common.controller;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.utils.PriceGrantUtil;
import com.okdeer.retail.common.entity.colsetting.GridColumn;
import com.okdeer.retail.common.page.EasyUIPageInfo;
import com.okdeer.retail.common.price.DataAccessParser;
import com.okdeer.retail.common.util.GridExportPrintUtils;
import com.okdeer.retail.common.util.JacksonUtil;
import com.okdeer.retail.facade.report.facade.BaseReportFacade;
import com.okdeer.retail.facade.report.qo.BaseReportQo;
import com.okdeer.retail.facade.report.vo.DaySumReportVo;

/**
 * 
 * ClassName: BaseReportController 
 * @Description: 报表BaseController
 * @author zhangq
 * @date 2017年7月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
public abstract class BaseReportController<Q extends BaseReportQo, V> extends BaseController<V> {

	/**
	 * 
	 * @Description: 获取跳转路径
	 * @return String  
	 * @author zhangq
	 * @date 2017年7月22日
	 */
	protected abstract String getViewName();

	/**
	 * 
	 * @Description: 获取Model对象
	 * @param model
	 * @return Model  
	 * @author zhangq
	 * @date 2017年7月22日
	 */
	protected abstract Model getModel(Model model);

	/**
	 * 
	 * @Description: 获取查询对象
	 * @param qo
	 * @return Q  
	 * @author zhangq
	 * @date 2017年7月22日
	 */
	protected abstract Q getQueryObject(Q qo);

	/**
	 * 
	 * @Description: 获取显示对象的class
	 * @param qo
	 * @return Class<V>  
	 * @author zhangq
	 * @date 2017年7月22日
	 */
	protected abstract Class<V> getViewObjectClass();

	/**
	 * 
	 * @Description: 获取facade对象
	 * @return BaseReportFacade<Q,V>  
	 * @author zhangq
	 * @date 2017年7月22日
	 */
	protected abstract BaseReportFacade<Q, V> getReportFade();

	/**
	 * 
	 * @Description: 跳转报表首页
	 * @return ModelAndView  
	 * @author zhangq
	 * @date 2017年7月22日
	 */
	@RequestMapping(value = "/index")
	public String index(Model model) {
		// 获取model对象
		model = getModel(model);

		// 无权限访问的字段
		Set<String> forbiddenSets = PriceGrantUtil.getNoPriceGrantSets();
		DataAccessParser parser = new DataAccessParser(getViewObjectClass(), forbiddenSets);
		forbiddenSets = parser.getAllForbiddenSets();

		// 所有列
		/*List<GridColumn> gridColumnList = GridExportPrintUtils.getAccessGridColumns(getViewObjectClass(),
				forbiddenSets);*/
		String columns = GridExportPrintUtils.getAccessGridColumnsJson(getViewObjectClass(),
				forbiddenSets);
		model.addAttribute("columns", columns);

		return getViewName();
	}

	/**
	 * 
	 * @Description: 获取报表数据
	 * @param qo
	 * @param pageNumber
	 * @param pageSize
	 * @return EasyUIPageInfo<V>  
	 * @author zhangq
	 * @date 2017年7月22日
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST)
	@ResponseBody
	public EasyUIPageInfo<V> getReportList(Q qo, @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			// 分页参数
			qo.setPageNum(pageNumber);
			qo.setPageSize(pageSize);

			// 查询数据
			EasyUIPageInfo<V> page = getReportFade().queryListPage(qo);
			
			cleanAccessData(page.getRows());
			cleanAccessData(page.getFooter());
			return page;
		} catch (Exception e) {
			LOG.error("获取报表数据异常:{}", e);
		}
		return null;
	}

	/**
	 * 
	 * @Description: 导出
	 * @param response
	 * @param qo
	 * @return RespJson  
	 * @author zhangq
	 * @date 2017年7月22日
	 */
	@RequestMapping(value = "/export", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportList(HttpServletResponse response, Q qo) {
		RespJson resp = RespJson.success();
		try {
			// 查询结果
			List<V> exportList = getReportFade().queryList(qo);

			// 无权限访问的字段
			Set<String> forbiddenSets = PriceGrantUtil.getNoPriceGrantSets();
			DataAccessParser parser = new DataAccessParser(DaySumReportVo.class, forbiddenSets);
			forbiddenSets = parser.getAllForbiddenSets();

			// 导出
			GridExportPrintUtils.exportAccessExcel(DaySumReportVo.class, exportList, forbiddenSets, response);
		} catch (Exception e) {
			LOG.error("导出日销售列表信息异常:{}", e);
			resp = RespJson.error("导出日进销存报表异常");
		}
		return resp;
	}

}
