package com.okdeer.jxc.controller.report.stock;  

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.controller.BaseReportController;
import com.okdeer.jxc.common.utils.BooleanUtils;
import com.okdeer.jxc.dict.entity.Dict;
import com.okdeer.jxc.dict.service.DictServiceApi;
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
@RequestMapping("report/stock/stockAdjustReport")
public class StockAdjustReportController extends BaseReportController<StockAdjustReportQo,StockAdjustReportVo>{
	@Reference(version = "1.0.0", check = false)
	StockAdjustReportFacade stockAdjustReportFacade;
	@Reference(version = "1.0.0", check = false)
	DictServiceApi dictServiceApi;
	@Override
	protected String getViewName() {
		return "report/stock/stockAdjustReport";
	}

	@Override
	protected Model getModel(Model model) {
		model.addAttribute(MAX_REPORT_TYPE, 4);
		//库存调整数据字典
		List<Dict> dict = dictServiceApi.getDictByType("ADJUST_REASON");
		model.addAttribute("ADJUST_REASON", dict);
		return model;
	}

	@Override
	protected StockAdjustReportQo getQueryObject(StockAdjustReportQo qo) {
		if(StringUtils.isEmpty(qo.getBranchCompleCode())){
			qo.setBranchCompleCode(getCurrBranchCompleCode());
		}
		if(BooleanUtils.isBoolean(qo.getIsContainChildren())){
			//如果查询下级，则把机构ID去掉
			qo.setBranchId(null);
		}
		//如果类别被选择，报表类型设置为类别所选中的值
		if(qo.getCategoryType()!=null&&StockAdjustReportFacade.REPORT_TYPE_LEVEL_1.equals(qo.getReportType())  ){
			qo.setReportType(qo.getCategoryType());
		}
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
