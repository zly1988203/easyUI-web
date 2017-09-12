/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年5月23日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report.logistics;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.qo.BranchQo;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.enums.OfflineStatusEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;

/**
 * 
 * ClassName: LogisticsBranchController 
 * @Description: 物流配送点导出
 * @author zhangchm
 * @date 2017年8月8日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@RestController
@RequestMapping("logisticsBranch")
public class LogisticsBranchController extends BaseController<LogisticsBranchController> {

	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesService;

	@RequestMapping(value = "toManager")
	public ModelAndView toManager() {
		ModelAndView mv = new ModelAndView("logistics/branchList");
		mv.addObject("OfflineStatusList", OfflineStatusEnum.values());
		mv.addObject("branchTypeList", super.getCurrTypeList());
		return mv;
	}

	/**
	 * @Description: 机构区域树形结构 展示
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月8日
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
	 * @return PageUtils<BranchPo>  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月8日
	 */
	@RequestMapping(value = "getBranchList", method = RequestMethod.POST)
	public PageUtils<Map<String,Object>> getBranchList(BranchQo qo,
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

			return branchesService.getLogisticsBranchListPage(qo);
		} catch (Exception e) {
			LOG.error("分页查询机构信息异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 导出
	 * @param qo
	 * @param response
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月8日
	 */
	@RequestMapping(value = "exportHandel", method = RequestMethod.POST)
	public RespJson exportHandel(BranchQo qo, HttpServletResponse response) {
		try {
			// 默认当前机构
			if (StringUtils.isBlank(qo.getBranchCompleCode())) {
				qo.setBranchCompleCode(super.getCurrBranchCompleCode());
			}
			List<Map<String,Object>> list = branchesService.getLogisticsBranchList(qo);
			RespJson respJson = super.validateExportList(list);
			if (!respJson.isSuccess()) {
				return respJson;
			}
			// 导出文件名称，不包括后缀名
			String fileName = "配送点_" + DateUtils.formatDate(DateUtils.getCurrDate(), DateUtils.DATE_KEY_STR);
			// 模板名称，包括后缀名
			String templateName = ExportExcelConstant.BRANCH_LOGISTICS_EXPORT;
			// 导出Excel
			exportListForXLSX(response, list, fileName, templateName);
			return null;
		} catch (Exception e) {
			LOG.error("导出机构信息失败", e);
		}
		return RespJson.error();
	}

}
