/** 
 *@Project: okdeer-jxc-common 
 *@Author: zhengwj
 *@Date: 2017年3月28日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.common.service;

import java.util.List;

import org.springframework.web.multipart.MultipartHttpServletRequest;

/**
 * ClassName: FileUploadService 
 * @Description: 七牛文件上传service
 * @author zhengwj
 * @date 2017年3月28日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

public interface FileUploadService {

	/**
	 * @Description: 上传文件到指定命名空间
	 * @param request 上传文件
	 * @param uploadToken 指定命名空间
	 * @return 文件路径
	 * @author zhengwj
	 * @date 2017年3月28日
	 */
	List<String> getFilePaths(MultipartHttpServletRequest request, String uploadToken);
}
