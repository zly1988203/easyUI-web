/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhengwj
 *@Date: 2017年3月28日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.branch;

import java.util.Iterator;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.BranchSpec;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.service.FileUploadService;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.deliver.service.DeliverConfigServiceApi;
import com.okdeer.jxc.utils.poi.ExcelExportUtil;

/**
 * ClassName: TemplateUploadController 
 * @Description: 出库单模板设置
 * @author zhengwj
 * @date 2017年3月28日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("templateUpload")
public class TemplateUploadController extends BaseController<TemplateUploadController> {

	@Reference(version = "1.0.0", check = false)
	private DeliverConfigServiceApi deliverConfigServiceApi;

	/**
	 * @Fields fileUploadService : 文件上传service
	 */
	@Autowired
	private FileUploadService fileUploadService;

	/**
	 * @Fields uploadToken : 文件上传命名空间
	 */
	@Value("${fileUploadToken}")
	private String uploadToken;

	/**
	 * 出库单模板上传，指定了工作空间，上传可查看SysPictureInfoService
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/DOsheet", method = RequestMethod.POST)
	@ResponseBody
	public RespJson uploadDOsheet(MultipartHttpServletRequest request, String branchId) {
		// 最大文件大小
		long maxSize = 1000000;

		if (!ServletFileUpload.isMultipartContent(request)) {
			return RespJson.error("请选择文件。");
		}

		Iterator<String> itr = request.getFileNames();
		MultipartFile mpf = null;
		while (itr.hasNext()) {
			mpf = request.getFile(itr.next());
			if (mpf == null || StringUtils.isEmpty(mpf.getOriginalFilename())) {
				continue;
			}
			// 获取文件名
			String fileName = mpf.getOriginalFilename();
			// 检查文件大小
			if (mpf.getSize() > maxSize) {
				return RespJson.error("上传文件大小超过限制。");
			}
			// 检查扩展名
			String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
			if (!ExcelExportUtil.REPORT_XLS.equals(fileExt) || ExcelExportUtil.REPORT_XLSX.equals(fileExt)) {
				return RespJson.error("上传文件扩展名是不允许的扩展名。\n只允许excel格式。");
			}
		}

		// 上传文件
		List<String> filePaths = fileUploadService.getFilePaths(request, uploadToken);
		if (CollectionUtils.isEmpty(filePaths)) {
			return RespJson.error("模板上传失败");
		}
		// 保存该用户的模板设置
		BranchSpec branchSpec = deliverConfigServiceApi.querySpecByBranchId(branchId);
		if (null == branchSpec) {
			branchSpec = new BranchSpec();
			//branchSpec.set
		} else {
			
		}
		//return deliverConfigServiceApi.saveBranchSpec((branchId, validityDay).saveTemplatePath(filePaths.get(0), branchId);
		return RespJson.success();
	}
}
