package com.okdeer.jxc.controller.report.stock;  

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.controller.BaseReportController;
import com.okdeer.retail.facade.report.facade.BaseReportFacade;
import com.okdeer.retail.facade.report.stock.facade.StockAdjustReportFacade;
import com.okdeer.retail.facade.report.stock.qo.StockAdjustReportQo;
import com.okdeer.retail.facade.report.stock.vo.StockAdjustReportVo;



/**
 * ClassName: GoodsStockAdjustController 
 * @Description: 库存调整查询报表
 * @author yangyq02
 * @date 2017年9月9日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *		重构2.0			2017年9月9日			yangyq02			  库存调整查询报表
 */
@Controller
@RequestMapping("/report/stock/stockAdjustReport")
public class StockAdjustReportController extends BaseReportController<StockAdjustReportQo,StockAdjustReportVo>{
	@Reference(version = "1.0.0", check = false)
	StockAdjustReportFacade stockAdjustReportFacade;
	@Override
	protected String getViewName() {
		return "report/stock/stockAdjustReport";
	}

	@Override
	protected Model getModel(Model model) {
		return model;
	}

	@Override
	protected StockAdjustReportQo getQueryObject(StockAdjustReportQo qo) {
		return qo;
	}

	@Override
	protected Class<StockAdjustReportVo> getViewObjectClass() {
		return 	StockAdjustReportVo.class;
	}

	@Override
	protected BaseReportFacade<StockAdjustReportQo, StockAdjustReportVo> getReportFade() {
		return stockAdjustReportFacade;
	}

}
