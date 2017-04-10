package com.okdeer.jxc.controller.stock;

import java.util.ArrayList;
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
import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.constant.PrintConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.print.JasperHelper;
import com.okdeer.jxc.stock.service.StocktakingApplyServiceApi;
import com.okdeer.jxc.stock.service.StocktakingOperateServiceApi;
import com.okdeer.jxc.stock.vo.StocktakingBatchVo;
import com.okdeer.jxc.stock.vo.StocktakingDifferenceVo;
import com.okdeer.jxc.system.entity.SysUser;
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

	/**
	 * @Fields stocktakingApplyServiceApi : stocktakingApplyServiceApi
	 */
	@Reference(version = "1.0.0", check = false)
	private StocktakingApplyServiceApi stocktakingApplyServiceApi;

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
			// 结束日期延后一天
			if (vo.getEndTime() != null) {
				vo.setEndTime(DateUtils.getDayAfter(vo.getEndTime()));
			}
			LOG.info(LogConstant.OUT_PARAM, vo);
			PageUtils<StocktakingBatchVo> stocktakingBatchList = stocktakingApplyServiceApi.getStocktakingBatchList(vo);
			LOG.info(LogConstant.PAGE, stocktakingBatchList.toString());
			return stocktakingBatchList;
		} catch (Exception e) {
			LOG.error("盘点申请查询列表信息异常:{}", e);
		}
		return PageUtils.emptyPage();
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
			LOG.error("删除申请批次异常:{}", e);
			resp = RespJson.error("删除申请批次失败");
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
	 * @param batchId 批次ID
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

	/**
	 * 
	 * @Description: 打印
	 * @param vo 条件vo
	 * @param response response
	 * @param request request
	 * @return String
	 * @author xuyq
	 * @date 2017年2月17日
	 */
	@RequestMapping(value = "/printDiffDispose", method = RequestMethod.GET)
	@ResponseBody
	public String printDiffDispose(StocktakingBatchVo vo, HttpServletResponse response, HttpServletRequest request) {
		try {
			LOG.info("查询详情打印参数：{}", vo);
			List<StocktakingDifferenceVo> printList = stocktakingOperateServiceApi
					.getStocktakingDifferenceList(vo.getId());

			if (printList.size() > PrintConstant.PRINT_MAX_ROW) {
				return "<script>alert('打印最大行数不能超过3000行');top.closeTab();</script>";
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("startDate", StringUtils.isBlank(vo.getCreateTime()) ? "" : vo.getCreateTime());
			map.put("endDate", StringUtils.isBlank(vo.getCreateTime()) ? "" : vo.getCreateTime());
			map.put("batchNo", StringUtils.isBlank(vo.getBatchNo()) ? "" : vo.getBatchNo());
			map.put("branchName", StringUtils.isBlank(vo.getBranchName()) ? "" : vo.getBranchName());
			map.put("createUserName", StringUtils.isBlank(vo.getCreateUserName()) ? "" : vo.getCreateUserName());
			map.put("createTime", StringUtils.isBlank(vo.getCreateTime()) ? "" : vo.getCreateTime());
			map.put("scope", StringUtils.isBlank(vo.getScope()) ? "" : vo.getScope());
			map.put("categoryShowsStr", StringUtils.isBlank(vo.getCategoryShowsStr()) ? "" : vo.getCategoryShowsStr());
			map.put("validUserName", StringUtils.isBlank(vo.getValidUserName()) ? "" : vo.getValidUserName());
			map.put("validTime", StringUtils.isBlank(vo.getValidTime()) ? "" : vo.getValidTime());
			map.put("remark", StringUtils.isBlank(vo.getRemark()) ? "" : vo.getRemark());
			map.put("printName", UserUtil.getCurrentUser().getUserName());
			JasperHelper.exportmain(request, response, map, JasperHelper.PDF_TYPE, PrintConstant.DIFF_DISPOSE_DETAIL, printList, "");
		} catch (Exception e) {
			LOG.error(PrintConstant.ROTARATE_PRINT_ERROR, e);
		}
		return null;
	}

	/**
	 * @Description: 保存差异详情
	 * @param data 保存JSON数据
	 * @return RespJson
	 * @author xuyq
	 * @date 2017年3月11日
	 */
	@RequestMapping(value = "/saveDiffDispose", method = RequestMethod.POST)
	@ResponseBody
	public RespJson saveDiffDispose(String data) {
		RespJson respJson = RespJson.success();
		LOG.info("保存差异详情 ：data{}" + data);
		SysUser user = UserUtil.getCurrentUser();
		if (user == null) {
			respJson = RespJson.error("用户不能为空！");
			return respJson;
		}
		try {
			if (StringUtils.isBlank(data)) {
				respJson = RespJson.error("保存数据不能为空！");
				return respJson;
			}
			StocktakingBatchVo vo = JSON.parseObject(data, StocktakingBatchVo.class);

			vo.setUpdateUserId(user.getId());
			vo.setUpdateTime(DateUtils.getCurrFullStr());
			vo.setUpdateUserName(user.getUserName());
			return stocktakingOperateServiceApi.saveDiffDispose(vo);
		} catch (Exception e) {
			LOG.error("保存存货盘点异常：{}", e);
			respJson = RespJson.error("保存存货盘点异常!");
		}
		return respJson;
	}

	/**
	 * @Description: 审核差异处理
	 * @param data 保存JSON数据
	 * @return RespJson
	 * @author xuyq
	 * @date 2017年3月11日
	 */
	@RequestMapping(value = "/auditDiffDispose", method = RequestMethod.POST)
	@ResponseBody
	public RespJson auditDiffDispose(String data) {
		RespJson respJson = RespJson.success();
		try {
			LOG.info("审核差异处理详情 ：data{}" + data);
			SysUser user = UserUtil.getCurrentUser();
			if (user == null) {
				respJson = RespJson.error("用户不能为空！");
				return respJson;
			}
			if (StringUtils.isBlank(data)) {
				respJson = RespJson.error("保存数据不能为空！");
				return respJson;
			}
			StocktakingBatchVo vo = JSON.parseObject(data, StocktakingBatchVo.class);
			if (vo == null) {
				respJson = RespJson.error("保存数据不能为空！");
				return respJson;
			}
			vo.setValidUserId(user.getId());
			vo.setValidUserName(user.getUserName());
			vo.setValidTime(DateUtils.getCurrFullStr());
			return stocktakingOperateServiceApi.auditDiffDispose(vo);
		} catch (Exception e) {
			LOG.error("审核差异处理信息异常:{}", e);
			respJson = RespJson.error(e.getMessage());
		}
		return respJson;
	}
	
	/**
	 * @Description: 导出
	 * @param response
	 * @param batchId
	 * @param batchNo
	 * @return
	 * @author xuyq
	 * @date 2017年4月10日
	 */
	@RequestMapping(value = "/exportDiffDetailList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportDiffDetailList(HttpServletResponse response,StocktakingBatchVo vo) {
		String batchId = vo.getId();
		String batchNo = vo.getBatchNo();
		
		LOG.info("差异详情列表导出参数batchId：{}", batchId);
		RespJson resp = RespJson.success();
		try {
			List<StocktakingDifferenceVo> diffList = stocktakingOperateServiceApi.getStocktakingDifferenceList(batchId);
			String fileName = batchNo + "差异详情" + DateUtils.getCurrSmallStr();
			String templateName = ExportExcelConstant.STOCKTAKING_DIFFDETAIL;
			exportListForXLSX(response, diffList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("差异详情列表导出异常：{}", e);
			resp = RespJson.error("差异详情列表导出异常");
		}
		return resp;
	}
}
