package com.okdeer.jxc.controller.stock;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.base.common.utils.DateUtils;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.report.service.StockExceptionServiceApi;
import com.okdeer.jxc.report.vo.StockIndexVo;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

/***
 *  <p></p>
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
public class StockExceptionController extends BaseController<StockExceptionController> {

	/**
	 * @Fields stockExceptionServiceApi : stockExceptionServiceApi
	 */
	@Reference(version = "1.0.0", check = false)
	private StockExceptionServiceApi stockExceptionServiceApi;

	/**
	 * 
	 * @Description: 跳转列表页面
	 * @return String
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
	 * @param vo 参数VO
	 * @param pageNumber 页码
	 * @param pageSize 页数
	 * @return PageUtils
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "getStockExceptionList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<StockIndexVo> getStockExceptionList(StockIndexVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			SysUser user = UserUtil.getCurrentUser();
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			if(StringUtils.isBlank(vo.getBranchCompleCode())){
				vo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
			}
			vo.setBranchType(user.getBranchType() == 0 ? 1 : 2);
			LOG.debug(LogConstant.OUT_PARAM, vo.toString());
			PageUtils<StockIndexVo> stockExceptionList = stockExceptionServiceApi.getStockExceptionList(vo);
			LOG.debug(LogConstant.PAGE, stockExceptionList.toString());
			return stockExceptionList;
		} catch (Exception e) {
			LOG.error("库存异常查询列表信息异常:{}", e);
		}
		return null;
	}

	/***
	 * 
	 * @Description: 导出列表
	 * @param response HttpServletResponse
	 * @param vo 参数VO
	 * @return RespJson
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/exportStockExceptionList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportList(HttpServletResponse response, StockIndexVo vo) {
		RespJson resp = RespJson.success();
		try {
			SysUser user = UserUtil.getCurrentUser();
			vo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
			vo.setBranchType(user.getBranchType() == 0 ? 1 : 2);
			List<StockIndexVo> exportList = stockExceptionServiceApi.exportStockExceptionList(vo);
			String fileName = "库存异常查询" + DateUtils.getDate("yyyyMMdd");
			String templateName = ExportExcelConstant.STOCKEXCEPTION;
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("导出库存异常查询异常：{}", e);
			resp = RespJson.error("导出库存异常查询异常");
		}
		return resp;
	}

}
