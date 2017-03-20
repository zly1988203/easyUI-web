package com.okdeer.jxc.controller.stock;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.constant.PrintConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.print.JasperHelper;
import com.okdeer.jxc.stock.service.StocktakingOperateServiceApi;
import com.okdeer.jxc.stock.vo.StocktakingDifferenceVo;
import com.okdeer.jxc.utils.UserUtil;

/**
 * <p></p>
 * ClassName: StocktakingDiffSearchController 
 * @Description: 盘点差异查询
 * @author xuyq
 * @date 2017年3月7日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/stocktaking/diffSearch")
public class StocktakingDiffSearchController extends BaseController<StocktakingDiffSearchController> {

	/**
	 * @Fields stocktakingOperateServiceApi : stocktakingOperateServiceApi
	 */
	@Reference(version = "1.0.0", check = false)
	private StocktakingOperateServiceApi stocktakingOperateServiceApi;

	/**
	 * 
	 * @Description: 跳转列表页面
	 * @return String
	 * @author xuyq
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "/list")
	public String list() {
		return "/stocktaking/diffSearch/diffSearchList";
	}

	/**
	 * @Description: 查询列表
	 * @param vo 参数VO
	 * @param pageNumber 页码
	 * @param pageSize 页数
	 * @return PageUtils
	 * @author xuyq
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "getDiffSearchList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<StocktakingDifferenceVo> getDiffSearchList(StocktakingDifferenceVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			// 结束日期延后一天
			if (vo.getEndTime() != null) {
				vo.setEndTime(DateUtils.getDayAfter(vo.getEndTime()));
			}
			LOG.info(LogConstant.OUT_PARAM, vo);
			PageUtils<StocktakingDifferenceVo> stocktakingBatchList = stocktakingOperateServiceApi
					.getDiffSearchList(vo);
			LOG.info(LogConstant.PAGE, stocktakingBatchList.toString());
			return stocktakingBatchList;
		} catch (Exception e) {
			LOG.error("盘点申请查询列表信息异常:{}", e);
		}
		return PageUtils.emptyPage();
	}

	/***
	 * 
	 * @Description: 导出列表
	 * @param response HttpServletResponse
	 * @param diffVo 参数VO
	 * @return RespJson
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/exportDiffSearchList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportDiffSearchList(HttpServletResponse response, StocktakingDifferenceVo diffVo) {
		RespJson resp = RespJson.success();
		try {
			if (StringUtils.isBlank(diffVo.getBranchCompleCode())) {
				diffVo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
			}
			// 结束日期延后一天
			if (diffVo.getEndTime() != null) {
				diffVo.setEndTime(DateUtils.getDayAfter(diffVo.getEndTime()));
			}
			List<StocktakingDifferenceVo> exportList = stocktakingOperateServiceApi.exportDiffSearchList(diffVo);

			String fileName = "盘点差异查询" + DateUtils.getCurrStr("yyyyMMdd");
			String templateName = ExportExcelConstant.DIFFSEARCHSUMMARIZING;
			if ("2".equals(diffVo.getRotationType())) {
				templateName = ExportExcelConstant.DIFFSEARCHDETAIL;
			}
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("导出盘点差异查询异常：{}", e);
			resp = RespJson.error("导出盘点差异查询异常");
		}
		return resp;
	}

	/**
	 * 
	 * @Description: 打印
	 * @param diffVo 参数VO
	 * @param response response
	 * @param request request
	 * @return String
	 * @author xuyq
	 * @date 2017年2月17日
	 */
	@RequestMapping(value = "/printDiffSearchList", method = RequestMethod.GET)
	@ResponseBody
	public String printDiffSearchList(StocktakingDifferenceVo diffVo, HttpServletResponse response,
			HttpServletRequest request) {
		try {
			// 结束日期延后一天
			if (diffVo.getEndTime() != null) {
				diffVo.setEndTime(DateUtils.getDayAfter(diffVo.getEndTime()));
			}
			LOG.info("差异查询打印参数：{}", diffVo);
			List<StocktakingDifferenceVo> printList = stocktakingOperateServiceApi.exportDiffSearchList(diffVo);

			if (printList.size() > PrintConstant.PRINT_MAX_ROW) {
				return "<script>alert('打印最大行数不能超过300行');top.closeTab();</script>";
			}
			String path = PrintConstant.DIFF_SEARCH_SUMMARIZING;
			if ("2".equals(diffVo.getRotationType())) {
				path = PrintConstant.DIFF_SEARCH_DETAIL;
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("startDate", diffVo.getStartTime() == null ? "" : diffVo.getStartTime());
			map.put("endDate", diffVo.getEndTime() == null ? "" : diffVo.getEndTime());
			map.put("printName", UserUtil.getCurrentUser().getUserName());
			JasperHelper.exportmain(request, response, map, JasperHelper.PDF_TYPE, path, printList, "");
		} catch (Exception e) {
			LOG.error(PrintConstant.ROTARATE_PRINT_ERROR, e);
		}
		return null;
	}
}
