/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangq
 *@Date: 2016年8月24日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.common.controller;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.service.BranchSpecServiceApi;
import com.okdeer.jxc.branch.vo.BranchSpecVo;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
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
	 * 机构设置Dubbo接口
	 */
	@Reference(version = "1.0.0", check = false)
	private BranchSpecServiceApi branchSpecServiceApi;

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
				is = IOStreamUtils.getExcelExportPathInputStream(getExportFile(page, branchId));
			} else {
				is = IOStreamUtils.getExcelExportPathInputStream(page + ".xlsx");
			}
			// ReportExcelUtil.reportExcelToList(response, is,
			// replaceMap.get("_订单编号").toString(), ReportExcelUtil.REPORT_XLSX,
			// detailList);
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
	 * @Description: 下载导出模板到本地
	 * @param page 单据类型
	 * @return 模板名称
	 * @author zhengwj
	 * @date 2017年3月28日
	 */
	private String getExportFile(String page, String branchId) {
		// 获取机构的出库单模板设置
		BranchSpecVo vo = branchSpecServiceApi.queryByBranchId(branchId);
		if (null == vo || StringUtils.isBlank(vo.getDosheetTemplate())) {
			LOG.error("出库单模板设置为空，不能导出,branchId:{}", branchId);
			throw new BusinessException("出库单模板设置为空，不能导出");
		}
		String key = vo.getDosheetTemplate();
		String filePath = ExportExcelConstant.TEMPLATE_EXPORT_DIR + page + key + ".xlsx";
		File file = new File(filePath);
		// 判断模板是否存在，不存在的需要下载
		if (!file.exists()) {
			try {
				URL url = new URL(filePrefix + key);
				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				// 设置超时间为3秒
				conn.setConnectTimeout(3 * 1000);
				// 防止屏蔽程序抓取而返回403错误
				// conn.setRequestProperty("User-Agent", "Mozilla/4.0
				// (compatible; MSIE 5.0; Windows NT; DigExt)");

				// 得到输入流
				InputStream inputStream = conn.getInputStream();
				// 获取自己数组
				byte[] buffer = new byte[1024];
				int len = 0;
				ByteArrayOutputStream bos = new ByteArrayOutputStream();
				while ((len = inputStream.read(buffer)) != -1) {
					bos.write(buffer, 0, len);
				}
				bos.close();
				byte[] getData = bos.toByteArray();

				FileOutputStream fos = new FileOutputStream(file);
				fos.write(getData);
				if (fos != null) {
					fos.close();
				}
				if (inputStream != null) {
					inputStream.close();
				}
			} catch (Exception e) {
				LOG.error("七牛下载导出模板错误:{}", e);
			}
		}
		return page + key + ".xlsx";
	}
}
