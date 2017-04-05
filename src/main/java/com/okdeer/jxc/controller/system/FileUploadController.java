/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhengwj
 *@Date: 2017年3月28日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.system;

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

import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.service.FileUploadService;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.utils.poi.ExcelExportUtil;

/**
 * ClassName: FileUploadController 
 * @Description: 文件上传controller
 * @author zhengwj
 * @date 2017年3月28日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("fileUpload")
public class FileUploadController extends BaseController<FileUploadController> {

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
	 * @Description: 出库单模板上传，指定了工作空间
	 * @param request 上传的文件
	 * @return 七牛文件路径
	 * @author zhengwj
	 * @date 2017年3月30日
	 */
	@RequestMapping(value = "/templateUpload", method = RequestMethod.POST)
	@ResponseBody
	public RespJson templateUpload(MultipartHttpServletRequest request) {
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
			String fileExt = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
			if (!ExcelExportUtil.REPORT_XLSX.equals(fileExt)) {
				return RespJson.error("不支持该文件类型，请上传excel表格。");
			}
		}

		// 上传文件
		List<String> filePaths = fileUploadService.getFilePaths(request, uploadToken);
		if (CollectionUtils.isEmpty(filePaths)) {
			return RespJson.error("模板上传失败");
		}
		// 返回七牛文件路径
		RespJson respJson = RespJson.success();
		respJson.put("filePath", filePaths.get(0).substring(0, filePaths.get(0).lastIndexOf(".")));
		return respJson;
	}
}
