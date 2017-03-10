package com.okdeer.jxc.controller.stock;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.stock.service.StocktakingApplyServiceApi;
import com.okdeer.jxc.stock.service.StocktakingOperateServiceApi;
import com.okdeer.jxc.stock.vo.StocktakingBatchVo;
import com.okdeer.jxc.stock.vo.StocktakingDifferenceVo;
import com.okdeer.jxc.utils.UserUtil;

/***
 * <p></p>
 * ClassName: StocktakingDiffDisposeController 
 * @Description: 盘点差异处理
 * @author xuyq
 * @date 2017年3月7日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/stocktaking/diffDispose")
public class StocktakingDiffDisposeController extends BaseController<StocktakingDiffDisposeController> {

	@Reference(version = "1.0.0", check = false)
	private StocktakingApplyServiceApi stocktakingApplyServiceApi;

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
		return "/stocktaking/diffDispose/diffDisposeList";
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
	@RequestMapping(value = "getDiffDisposeList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<StocktakingBatchVo> getDiffDisposeList(StocktakingBatchVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			if (StringUtils.isBlank(vo.getBranchCompleCode())) {
				vo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
			}
			LOG.info(LogConstant.OUT_PARAM, vo.toString());
			PageUtils<StocktakingBatchVo> stocktakingBatchList = stocktakingApplyServiceApi.getStocktakingBatchList(vo);
			LOG.info(LogConstant.PAGE, stocktakingBatchList.toString());
			return stocktakingBatchList;
		} catch (Exception e) {
			LOG.error("盘点申请查询列表信息异常:{}", e);
		}
		return null;
	}

	/**
	 * 
	 * @Description: 申请批次
	 * @param ids 记录IDS
	 * @return RespJson
	 * @author xuyq
	 * @date 2017年2月19日
	 */
	@RequestMapping(value = "deleteStocktakingBatch", method = RequestMethod.POST)
	@ResponseBody
	public RespJson deleteStocktakingBatch(@RequestParam(value = "ids[]") List<String> ids) {
		RespJson resp;
		try {
			return stocktakingApplyServiceApi.deleteStocktakingBatch(ids);
		} catch (Exception e) {
			LOG.error("删除组合拆分单异常:{}", e);
			resp = RespJson.error("删除组合拆分单失败");
		}
		return resp;
	}

	/***
	 * 
	 * @Description: 详细
	 * @param id 记录ID
	 * @param report 关闭状态
	 * @param request HttpServletRequest
	 * @return String
	 * @author xuyq
	 * @date 2017年2月16日
	 */
	@RequestMapping(value = "stocktakingBatchView", method = RequestMethod.GET)
	public String stocktakingBatchView(String id, String report, HttpServletRequest request) {
		StocktakingBatchVo batchVo = stocktakingApplyServiceApi.getStocktakingBatchVoById(id);
		request.setAttribute("batchVo", batchVo);
		request.setAttribute("close", report);
		return "/stocktaking/diffDispose/diffDisposeEdit";
	}

	/***
	 * 
	 * @Description:  获取明细信息
	 * @param id 记录ID
	 * @return List
	 * @author xuyq
	 * @date 2017年2月19日
	 */
	@RequestMapping(value = "/stocktakingDifferenceList", method = RequestMethod.GET)
	@ResponseBody
	public List<StocktakingDifferenceVo> stocktakingDifferenceList(String batchId) {
		LOG.info(LogConstant.OUT_PARAM, batchId);
		List<StocktakingDifferenceVo> diffList = new ArrayList<StocktakingDifferenceVo>();
		try {
			diffList = stocktakingOperateServiceApi.getStocktakingDifferenceList(batchId);
		} catch (Exception e) {
			LOG.error("获取单据信息异常:{}", e);
		}
		return diffList;
	}
}
