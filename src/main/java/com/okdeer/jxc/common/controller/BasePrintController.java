/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangq
 *@Date: 2016年8月24日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.common.controller;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.okdeer.jxc.branch.service.BranchSpecServiceApi;
import com.okdeer.jxc.branch.vo.BranchSpecVo;
import com.okdeer.jxc.common.exception.BusinessException;
import com.okdeer.jxc.common.utils.JsonMapper;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.utils.IOStreamUtils;
import com.okdeer.jxc.utils.jxls.ReportExcelUtil;

/**
 * ClassName: BasePrintController 
 * @Description: 打印BaseController
 * @author zhangq
 * @date 2016年8月24日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 商业管理系统1.0.0	2016年8月24日                  zhangq              创建打印Base Controller
 */

public abstract class BasePrintController<T, P> extends BaseController<T> {

	/**
	 * 
	 * @Description: 获取打印占位JSON
	 * @param formNo 订单号
	 * @return 打印替换JSON
	 * @author zhangq
	 * @date 2016年8月29日
	 */
	protected abstract Map<String, Object> getPrintReplace(String formNo);

	/**
	 * 
	 * @Description: 获取打印表格明细JSON
	 * @param formNo 订单号
	 * @return 打印表格明细JSON
	 * @author zhangq
	 * @date 2016年8月29日
	 */
	protected abstract List<P> getPrintDetail(String formNo);

	/**
	 * 
	 * @Description: 获取打印表格明细JSON
	 * @param formNo 订单号
	 * @return 打印表格明细JSON
	 * @author zhangq
	 * @date 2016年8月29日
	 */ 
	protected void getPrintDetail(List<P> list,Map<String, Object> params){
		
	}
	/**
	 * 
	 * @Description: 打印预览页面
	 * @param page
	 * @param template
	 * @param sheetNo
	 * @param model
	 * @return
	 * @author zhangq
	 * @date 2016年8月29日
	 */
	@RequestMapping(value = "/preview")
	public ModelAndView preview(String page, String template, String sheetNo, HttpServletRequest request,
			ModelAndView model) {
		String controllerUrl = request.getRequestURI().replace("/okdeerjxc/", "/").replace("/preview", "/");
		JsonMapper jsonMapper = new JsonMapper();
		// 页签
		String tabId = "prev_" + page + "_" + sheetNo;
		model.addObject("tabId", tabId);
		model.addObject("sheetNo", sheetNo);

		model.addObject("page", page);
		model.addObject("controllerUrl", controllerUrl);
		// 获取打印占位JSON
		Map<String, Object> replaceMap = getPrintReplace(sheetNo);
		String jsonReplace = jsonMapper.toJson(replaceMap);
		model.addObject("jsonReplace", jsonReplace);
		// 获取打印表格明细JSON
		List<P> detailList = getPrintDetail(sheetNo);
		String jsonDetail = jsonMapper.toJson(detailList);
		model.addObject("jsonDetail", jsonDetail);
		// 页面跳转
		model.setViewName("component/publicPrintPreview");
		return model;
	}

	@RequestMapping(value = "exportSheet")
	public void export(HttpServletResponse response, String page, String sheetNo, String branchId) {
		// 获取打印占位JSON
		Map<String, Object> replaceMap = getPrintReplace(sheetNo);
		// 获取打印表格明细JSON
		List<P> detailList = getPrintDetail(sheetNo);
		

		InputStream is = null;
		try {
			// 出库单根据设置选择导出模板
			if ("DOSheet".equalsIgnoreCase(page)) {
				is = getExportExcelInputStream(page, branchId);
			} else {
				// 求和
				if ("DOList".equalsIgnoreCase(page)) {
					getPrintDetail(detailList,replaceMap);
				}
				is = IOStreamUtils.getExcelExportPathInputStream(page + ".xlsx");
			}
			ReportExcelUtil.reportExcelToMapAndList(response, is, replaceMap.get("_订单编号").toString(),
					ReportExcelUtil.REPORT_XLSX, replaceMap, detailList);
		} catch (Exception e) {
			LOG.error("导出失败：{}", e);
		}
	}

	/**
	 * @Fields filePrefix : 七牛文件路径前缀
	 */
	@Value("${filePrefix}")
	private String filePrefix;

	/**
	 * @Description: 获取七牛文件流
	 * @author zhengwj
	 * @throws IOException 
	 * @date 2017年3月28日
	 */
	private InputStream getExportExcelInputStream(String page, String branchId) throws IOException {
		// 获取机构的出库单模板设置
		BranchSpecVo vo = getBranchSpecService().queryByBranchId(branchId);
		if (null == vo || StringUtils.isBlank(vo.getDosheetTemplate())) {
			LOG.error("出库单模板设置为空，不能导出,branchId:{}", branchId);
			throw new BusinessException("出库单模板设置为空，不能导出");
		}
		// 出库单模板设置
		String key = vo.getDosheetTemplate();

		// 系统模板
		if ("1".equals(key) || "2".equals(key)) {
			return IOStreamUtils.getExcelExportPathInputStream(page + key + ".xlsx");
		}
		// 自定义模板
		URL url = new URL(filePrefix + key + ".xlsx");
		InputStream is = url.openStream();
		return is;
	}

	/**
	 * @Description: 获取机构配置服务，使用下载单据明细时需要实现
	 * @return
	 * @author zhengwj
	 * @date 2017年4月1日
	 */
	protected abstract BranchSpecServiceApi getBranchSpecService();
}
