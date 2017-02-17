package com.okdeer.jxc.controller.stock;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.report.service.StockIndexServiceApi;
import com.okdeer.jxc.report.vo.StockIndexVo;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

/***
 * 
 * ClassName: StockIndexController 
 * @Description: 库存存量指标Controller
 * @author xuyq
 * @date 2017年2月14日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/stock/index")
public class StockIndexController extends BaseController<T> {

	@Reference(version = "1.0.0", check = false)
	private StockIndexServiceApi stockIndexServiceApi;
	/**
	 * 
	 * @Description: 跳转列表页面
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/list")
	public String list() {
		return "/stockIndex/stockIndexList";
	}

	/**
	 * 
	 * @Description: 跳转新增页面
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/add")
	public String add() {
		return "/stockIndex/stockIndexAdd";
	}

	/**
	 * 
	 * @Description: 跳转修改页面
	 * @param id
	 * @param request
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.GET)
	public String edit(String id, HttpServletRequest request) {
		return "/stockIndex/stockIndexEdit";
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
	@RequestMapping(value = "getStockIndexList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<StockIndexVo> getstockIndexList(StockIndexVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			PageUtils<StockIndexVo> stockIndexList = stockIndexServiceApi.getStockIndexList(vo);
			LOG.info(LogConstant.PAGE, stockIndexList.toString());
			return stockIndexList;
		} catch (Exception e) {
			LOG.error("库存存量指标查询列表信息异常:{}", e);
		}
		return null;
	}
	/***
	 * 
	 * @Description: 保存库存存量指标
	 * @param vo
	 * @param validate
	 * @return
	 * @author xuyq
	 * @date 2017年2月15日
	 */
	
	@RequestMapping(value = "/saveStockIndex", method = RequestMethod.POST)
	@ResponseBody
	public RespJson saveStockIndex(String data) {
		LOG.debug("保存库存存量指标 ：data=" + data);
		if (StringUtils.isNotEmpty(data)) {
			List<StockIndexVo> jsonList = JSON.parseArray(data, StockIndexVo.class);
			if (jsonList != null && jsonList.size() > 0) {
				Map<String,Object> paramMap = new HashMap<String,Object>();
				paramMap.put("branchId", jsonList.get(0).getBranchId());
				paramMap.put("userId", "10000");
				paramMap.put("jsonList", jsonList);
				stockIndexServiceApi.saveStockIndex(paramMap);
			} else {
				RespJson rep = RespJson.error("保存数据不能为空！");
				return rep;
			}
		} else {
			RespJson rep = RespJson.error("保存数据不能为空！");
			return rep;
		}
		SysUser user = UserUtil.getCurrentUser();
		if (user == null) {
			RespJson rep = RespJson.error("用户不能为空！");
			return rep;
		}
		
		RespJson respJson = RespJson.success();
		try {
			
		} catch (Exception e) {
			LOG.error("保存库存存量指标异常：", e);
			respJson = RespJson.error("保存库存存量指标异常!");
		}
		return respJson;
	}	
}
