/** 
 *@Project: okdeer-jxc-common 
 *@Author: zhengwj
 *@Date: 2017年3月28日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.common.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.okdeer.jxc.common.server.BaseServiceImpl;
import com.okdeer.jxc.common.service.FileUploadService;
import com.qiniu.util.Auth;
import com.yschome.file.uploadFile;

/**
 * ClassName: FileUploadServiceImpl 
 * @Description: 七牛文件上传service
 * @author zhengwj
 * @date 2017年3月28日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Service
public class FileUploadServiceImpl extends BaseServiceImpl<FileUploadServiceImpl> implements FileUploadService {

	/**
	 * 云存储账号key
	 */
	@Value("${accessKey}")
	private String accessKey;

	/**
	 * 云存储账号秘钥
	 */
	@Value("${secretKey}")
	private String secretKey;

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.common.service.FileUploadService#getFilePaths(org.springframework.web.multipart.MultipartHttpServletRequest, java.lang.String)
	 */
	@Override
	public List<String> getFilePaths(MultipartHttpServletRequest request, String uploadToken) {
		List<String> filePaths = new ArrayList<String>();
		try {
			Iterator<String> itr = request.getFileNames();
			MultipartFile mpf = null;
			while (itr.hasNext()) {
				mpf = request.getFile(itr.next());
				if (mpf == null || StringUtils.isEmpty(mpf.getOriginalFilename())) {
					continue;
				}
				// 获取文件名
				String fileName = mpf.getOriginalFilename();
				// 获取文件后缀
				String subkey = fileName.substring(fileName.lastIndexOf("."));
				// 重新生成文件名称
				String name = String.valueOf(new Date().getTime());
				// 文件路径
				String key = name + subkey;
				byte[] data = mpf.getBytes();
				// 产生实例
				Auth auth = Auth.create(accessKey, secretKey);
				// 删除旧文件
				// FileUtil.deleteFileName(auth, uploadToken, key);
				uploadFile uploadFile = new uploadFile();
				// 获取xml文件：uc-config.properties文件工作空间
				String token = auth.uploadToken(uploadToken);
				// 文件
				boolean flag = uploadFile.upload(data, key, token);
				if (!flag) {
					return null;
				}
				filePaths.add(key);
			}
			return filePaths;
		} catch (IOException e) {
			LOG.error("文件上传异常", e);
		}
		return filePaths;
	}

}
