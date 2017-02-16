package com.okdeer.jxc.controller.stock;

import javax.servlet.http.HttpServletRequest;

import org.apache.poi.ss.formula.functions.T;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.enums.StockAdjustEnum;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.stock.service.StockAdjustServiceApi;
import com.okdeer.jxc.stock.vo.StockFormVo;

/***
 * 
 * ClassName: CombineSplitController 
 * @Description: 组合拆分单Controller
 * @author xuyq
 * @date 2017年2月14日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/stock/combineSplit")
public class CombineSplitController extends BaseController<T> {

	@Reference(version = "1.0.0", check = false)
	private StockAdjustServiceApi stockAdjustServiceApi;
	
	/***
	 * 
	 * @Description: 跳转列表页面
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/list")
	public String list() {
		return "/combineSplit/combineSplitList";
	}

	/***
	 * 
	 * @Description: 跳转新增页面
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/add")
	public String add() {
		return "/combineSplit/combineSplitAdd";
	}

	/***
	 * 
	 * @Description: 跳转修改页面
	 * @param id
	 * @param request
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/combineSplitEdit", method = RequestMethod.GET)
	public String edit(String id, HttpServletRequest request) {
		StockFormVo stockFormVo = stockAdjustServiceApi.getStcokFormInfo(id);
		request.setAttribute("stockFormVo", stockFormVo);
		return "/combineSplit/combineSplitEdit";
	}
	
	/***
	 * 
	 * @Description: 查询列表
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author xuyq
	 * @date 2017年2月16日
	 */
	@RequestMapping(value = "/getCombineSplitList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<StockFormVo> getCombineSplitList(StockFormVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			//调整类型
			vo.setFormType(StockAdjustEnum.COMBINESPLIT.getKey());
			PageUtils<StockFormVo> stockFormList = stockAdjustServiceApi.getStockFormList(vo);
			LOG.info(LogConstant.PAGE, stockFormList.toString());
			return stockFormList;
		} catch (Exception e) {
			LOG.error("获取单据列表信息异常:{}", e);
		}
		return null;
	}
	
	/***
	 * 
	 * @Description: 详细
	 * @param id
	 * @param report
	 * @param request
	 * @return
	 * @author xuyq
	 * @date 2017年2月16日
	 */
	@RequestMapping(value = "/combineSplitView", method = RequestMethod.GET)
	public String combineSplitView(String id, String report, HttpServletRequest request) {
		StockFormVo stockFormVo = stockAdjustServiceApi.getStcokFormInfo(id);
		request.setAttribute("stockFormVo", stockFormVo);
		request.setAttribute("close", report);
		return "/combineSplit/combineSplitView";
	}
}
