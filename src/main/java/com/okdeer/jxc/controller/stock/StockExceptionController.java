package com.okdeer.jxc.controller.stock;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.formula.functions.T;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.report.service.StockExceptionServiceApi;
import com.okdeer.jxc.report.vo.StockIndexVo;
import com.okdeer.jxc.utils.UserUtil;

/***
 * 
 * ClassName: StockExceptionController 
 * @Description: 库存异常查询Controller
 * @author xuyq
 * @date 2017年2月14日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/stock/exception")
public class StockExceptionController extends BaseController<T> {

	@Reference(version = "1.0.0", check = false)
	private StockExceptionServiceApi stockExceptionServiceApi;

	/**
	 * 
	 * @Description: 跳转列表页面
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/list")
	public String list() {
		return "/stockException/stockExceptionList";
	}

	/**
	 * 
	 * @Description: 查询列表
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "getStockExceptionList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<StockIndexVo> getStockExceptionList(StockIndexVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setBranchId(UserUtil.getCurrBranchId());
			PageUtils<StockIndexVo> stockExceptionList = stockExceptionServiceApi.getStockExceptionList(vo);
			LOG.info(LogConstant.PAGE, stockExceptionList.toString());
			return stockExceptionList;
		} catch (Exception e) {
			LOG.error("库存异常查询列表信息异常:{}", e);
		}
		return null;
	}

	/***
	 * 
	 * @Description: 导出列表
	 * @param response
	 * @param vo
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/exportStockExceptionList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportList(HttpServletResponse response, StockIndexVo vo) {
		RespJson resp = RespJson.success();
		try {
			vo.setBranchId(UserUtil.getCurrBranchId());
			List<StockIndexVo> exportList = stockExceptionServiceApi.exportStockExceptionList(vo);
			String fileName = "库存异常查询数据";
			String templateName = ExportExcelConstant.STOCKEXCEPTION;
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("导出库存异常查询异常：{}", e);
			resp = RespJson.error("导出库存异常查询异常");
		}
		return resp;
	}

}
