/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年5月23日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.branch;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.BranchCost;
import com.okdeer.jxc.branch.po.BranchPo;
import com.okdeer.jxc.branch.qo.BranchQo;
import com.okdeer.jxc.branch.service.BranchCostService;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.branch.vo.BranchCostVo;
import com.okdeer.jxc.branch.vo.BranchOpVo;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.enums.OfflineStatusEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.common.utils.gson.GsonUtils;
import com.okdeer.jxc.controller.BaseController;

/**
 * ClassName: BranchController 
 * @Description: 机构资料Controller
 * @author liwb
 * @date 2017年5月23日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@RestController
@RequestMapping("archive/branch")
public class BranchController extends BaseController<BranchController> {

	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesService;

	@Reference(version = "1.0.0", check = false)
	private BranchCostService branchCostService;

	@RequestMapping(value = "toManager")
	public ModelAndView toManager() {
		ModelAndView mv = new ModelAndView("archive/branch/branchList");
		mv.addObject("OfflineStatusList", OfflineStatusEnum.values());
		mv.addObject("branchTypeList", super.getCurrTypeList());
		return mv;
	}

	@RequestMapping(value = "toEdit")
	public ModelAndView toEdit(String branchId) {
		ModelAndView mv = new ModelAndView("archive/branch/branchEdit");
		mv.addObject("branchId", branchId);
		mv.addObject("OfflineStatusList", OfflineStatusEnum.values());
		return mv;
	}

	@RequestMapping(value = "getBranchInfoById")
	public RespJson getBranchInfoById(String branchId) {
		if (StringUtils.isBlank(branchId)) {
			return RespJson.error("机构id为空");
		}

		LOG.debug("机构Id：", branchId);
		try {
			BranchPo branch = branchesService.getBranchPoById(branchId);

			// 机构固定费用信息
			List<BranchCost> decorateCostList = branchCostService.getDecorateCostForPage(branchId);
			List<BranchCost> deviceCostList = branchCostService.getDeviceCostForPage(branchId);
			List<BranchCost> amortizeCostList = branchCostService.getAmortizeCostForPage(branchId);

			Map<String, Object> data = new HashMap<String, Object>();
			data.put("branch", branch);
			data.put("decorateCostList", decorateCostList);
			data.put("deviceCostList", deviceCostList);
			data.put("amortizeCostList", amortizeCostList);

			RespJson respJson = RespJson.success(data);
			return respJson;
		} catch (Exception e) {
			LOG.error("获取机构详情错误：", e);
		}

		return RespJson.error();
	}

	/**
	 * @Description: 机构区域树形结构 展示
	 * @return
	 * @author liwb
	 * @date 2017年5月23日
	 */
	@RequestMapping(value = "getBranchAreaToTree")
	public String getBranchAreaToTree() {
		try {
			// 根据当前机构获取机构区域树形结构
			return branchesService.getBranchAndAreaToTree(super.getCurrBranchCompleCode());
		} catch (Exception e) {

			LOG.error("查询机构供应商区域树形结构异常:", e);
		}
		return StringUtils.EMPTY;
	}

	/**
	 * @Description: 分页查询机构信息
	 * @param qo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author liwb
	 * @date 2017年5月23日
	 */
	@RequestMapping(value = "getBranchList", method = RequestMethod.POST)
	public PageUtils<BranchPo> getBranchList(BranchQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {

		qo.setPageNumber(pageNumber);
		qo.setPageSize(pageSize);

		// 默认当前机构
		if (StringUtils.isBlank(qo.getBranchCompleCode())) {
			qo.setBranchCompleCode(super.getCurrBranchCompleCode());
		}
		LOG.debug("查询机构条件：{}", qo);

		try {

			return branchesService.getBranchListForPage(qo);
		} catch (Exception e) {
			LOG.error("分页查询机构信息异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 修改机构信息
	 * @param vo
	 * @return
	 * @author liwb
	 * @date 2017年5月23日
	 */
	@RequestMapping(value = "updateBranch", method = RequestMethod.POST)
	public RespJson updateBranch(BranchOpVo vo) {
		LOG.debug("修改机构信息参数：{}", vo);
		try {

			vo.setUserId(super.getCurrUserId()); // 当前用户Id

			RespJson respJson = branchesService.updateBranchInfo(vo);
			if (!respJson.isSuccess()) {
				LOG.error(respJson.getMessage());
			}

			return respJson;
		} catch (Exception e) {
			LOG.error("修改机构信息失败：", e);
		}
		return RespJson.error();
	}

	@RequestMapping(value = "updateBranchCost", method = RequestMethod.POST)
	public RespJson updateBranchCost(@RequestBody String jsonText) {
		LOG.debug("修改机构费用参数：{}", jsonText);
		try {

			BranchCostVo vo = GsonUtils.fromJson(jsonText, BranchCostVo.class);
			vo.setUserId(super.getCurrUserId()); // 当前用户Id

			RespJson respJson = branchesService.updateBranchCost(vo);
			if (!respJson.isSuccess()) {
				LOG.error(respJson.getMessage());
			}

			return respJson;

		} catch (Exception e) {
			LOG.error("修改机构费用失败：", e);
		}
		return RespJson.error();
	}

	@RequestMapping(value = "exportHandel", method = RequestMethod.POST)
	public RespJson exportHandel(BranchQo qo, HttpServletResponse response) {
		try {
			// 默认当前机构
			if (StringUtils.isBlank(qo.getBranchCompleCode())) {
				qo.setBranchCompleCode(super.getCurrBranchCompleCode());
			}

			LOG.debug("查询机构条件：{}", qo);

			List<BranchPo> list = branchesService.getBranchListForExport(qo);

			RespJson respJson = super.validateExportList(list);
			if (!respJson.isSuccess()) {
				LOG.info(respJson.getMessage());
				return respJson;
			}

			// 导出文件名称，不包括后缀名
			String fileName = "机构信息列表" + "_" + DateUtils.getCurrSmallStr();

			// 模板名称，包括后缀名
			String templateName = ExportExcelConstant.BRANCH_EXPORT_TEMPLATE;

			// 导出Excel
			exportListForXLSX(response, list, fileName, templateName);
			return null;

		} catch (Exception e) {
			LOG.error("导出机构信息失败", e);
		}
		return RespJson.error();
	}

}
