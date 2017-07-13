/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年7月12日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.report.plan;  

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.common.utils.gson.GsonUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.settle.store.entity.StorePlan;
import com.okdeer.jxc.settle.store.po.StorePlanListPo;
import com.okdeer.jxc.settle.store.qo.StorePlanQo;
import com.okdeer.jxc.settle.store.service.StorePlanService;
import com.okdeer.jxc.settle.store.vo.StorePlanVo;


/**
 * ClassName: StorePlanController 
 * @Description: 门店计划Controller
 * @author liwb
 * @date 2017年7月12日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@RestController
@RequestMapping("target/storePlan")
public class StorePlanController extends BaseController<StorePlanController> {
	
	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchService;
	
	@Reference(version = "1.0.0", check = false)
	private StorePlanService storePlanService;
	
	@RequestMapping(value = "toManager")
	public ModelAndView toManager() {
		return new ModelAndView("report/plan/storePlan/storePlanList");
	}

	@RequestMapping(value = "toAdd")
	public ModelAndView toAdd() {
		return new ModelAndView("report/plan/storePlan/storePlanAdd");
	}

	@RequestMapping(value = "toEdit")
	public ModelAndView toEdit(String branchId, String monthStr) {
		
		LOG.debug("机构Id：{}，时间：{}", branchId, monthStr);

		if (StringUtils.isAnyBlank(branchId, monthStr)) {
			return super.toErrorPage("机构ID或者时间值为空");
		}
		
		Branches branch = branchService.getBranchInfoById(branchId);
		
		Integer year = Integer.valueOf(monthStr.substring(0, 4));
		

		ModelAndView mv = new ModelAndView("report/plan/storePlan/storePlanEdit");
		mv.addObject("branch", branch);
		mv.addObject("monthStr", monthStr);
		mv.addObject("year", year);
		return mv;
	}
	
	
	@RequestMapping(value = "getStorePlanList", method = RequestMethod.POST)
	public PageUtils<StorePlanListPo> getStorePlanList(StorePlanQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {

		qo.setPageNumber(pageNumber);
		qo.setPageSize(pageSize);

		// 构建查询参数
		buildSearchParams(qo);
		LOG.debug("查询门店计划条件：{}", qo);

		try {

			return storePlanService.getStorePlanListForPage(qo);
		} catch (Exception e) {
			LOG.error("分页查询门店计划异常:", e);
		}
		return PageUtils.emptyPage();
	}
	
	private void buildSearchParams(StorePlanQo qo) {
		// 默认当前机构
		if (StringUtils.isBlank(qo.getBranchCompleCode())) {
			qo.setBranchCompleCode(super.getCurrBranchCompleCode());
		}

		qo.setEndTime(DateUtils.addMonths(qo.getEndTime(), 1));
	}
	
	@RequestMapping(value = "getStorePlanListByYear", method = RequestMethod.POST)
	public PageUtils<StorePlan> getStorePlanListByYear(String branchId, Integer year) {

		LOG.debug("机构Id：{}，年份：{}", branchId, year);

		if (StringUtils.isBlank(branchId) || year == null) {
			LOG.warn("获取门店计划信息， 前端传参错误！");
			return PageUtils.emptyPage();
		}

		try {

			List<StorePlan> list = storePlanService.getStorePlanListByYear(branchId, year);

			return new PageUtils<StorePlan>(list);

		} catch (Exception e) {
			LOG.error("获取门店计划详情信息列表异常：", e);
		}
		return PageUtils.emptyPage();
	}
	
	@RequestMapping(value = "addStorePlan", method = RequestMethod.POST)
	public RespJson addStorePlan(@RequestBody String jsonText) {
		LOG.debug("新增门店计划参数：{}", jsonText);
		try {

			StorePlanVo vo = GsonUtils.fromJson(jsonText, StorePlanVo.class);
			vo.setUserId(super.getCurrUserId());

			return storePlanService.addStorePlan(vo);

		} catch (Exception e) {
			LOG.error("新增门店计划失败：", e);
		}
		return RespJson.error();
	}

	@RequestMapping(value = "updateStorePlan", method = RequestMethod.POST)
	public RespJson updateStorePlan(@RequestBody String jsonText) {
		LOG.debug("修改门店计划参数：{}", jsonText);
		try {

			StorePlanVo vo = GsonUtils.fromJson(jsonText, StorePlanVo.class);
			vo.setUserId(super.getCurrUserId());

			return storePlanService.updateStorePlan(vo);

		} catch (Exception e) {
			LOG.error("修改门店计划失败：", e);
		}
		return RespJson.error();
	}
	
}
