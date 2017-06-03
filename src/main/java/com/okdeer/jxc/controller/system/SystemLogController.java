/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年5月22日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.system;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.system.po.SysOperateLogPo;
import com.okdeer.jxc.system.qo.SysOperateLogQo;
import com.okdeer.jxc.system.service.SysOperateLogService;

/**
 * ClassName: SystemLogController 
 * @Description: 系统日志Controller
 * @author liwb
 * @date 2017年5月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@RestController
@RequestMapping("system/log")
public class SystemLogController extends BaseController<SystemLogController> {

	@Reference(version = "1.0.0", check = false)
	private SysOperateLogService sysOperateLogService;

	@RequestMapping(value = "toManager")
	public ModelAndView toManager() {
		return new ModelAndView("system/log/systemLogList");
	}

	@RequestMapping(value = "getOpLogList", method = RequestMethod.POST)
	public PageUtils<SysOperateLogPo> getOpLogList(SysOperateLogQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		qo.setPageNumber(pageNumber);
		qo.setPageSize(pageSize);

		// 组装查询参数
		buildSearchParams(qo);

		LOG.debug("查询系统日志条件：{}", qo);

		try {

			return sysOperateLogService.getOpLogListForPage(qo);
		} catch (Exception e) {
			LOG.error("分页查询系统日志异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 组装查询参数
	 * @param qo
	 * @author liwb
	 * @date 2017年6月2日
	 */
	private void buildSearchParams(SysOperateLogQo qo) {

		// 默认当前机构
		if (StringUtils.isBlank(qo.getBranchCompleCode())) {
			qo.setBranchCompleCode(super.getCurrBranchCompleCode());
		}

		// 日期+1
		qo.setEndTime(DateUtils.getDayAfter(qo.getEndTime()));
	}

	@RequestMapping(value = "exportHandel", method = RequestMethod.POST)
	public RespJson exportHandel(SysOperateLogQo qo, HttpServletResponse response) {
		try {

			buildSearchParams(qo);

			LOG.debug("导出系统日志条件：{}", qo);

			List<SysOperateLogPo> list = sysOperateLogService.getOpLogListForExport(qo);

			RespJson respJson = super.validateExportList(list);
			if (!respJson.isSuccess()) {
				LOG.info(respJson.getMessage());
				return respJson;
			}

			// 导出文件名称，不包括后缀名
			String fileName = "系统日志列表_" + DateUtils.getSmallStr(qo.getStartTime()) + "_"
					+ DateUtils.getSmallStr(qo.getEndTime());

			// 模板名称，包括后缀名
			String templateName = ExportExcelConstant.SYS_OPERATE_LOG_EXPORT_TEMPLATE;

			// 导出Excel
			exportListForXLSX(response, list, fileName, templateName);
			return null;

		} catch (Exception e) {
			LOG.error("导出系统日志失败", e);
		}
		return RespJson.error();
	}

}
