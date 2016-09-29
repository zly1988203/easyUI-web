
package com.okdeer.jxc.utils;

import java.io.InputStream;

import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.ImportExcelConstant;
import com.okdeer.jxc.common.constant.PrintConstant;

/**
 * ClassName: IOStreamUtils 
 * @Description: IO流工具类
 * @author liwb
 * @date 2016年8月23日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 商业管理系统1.0.0	  2016年8月23日			 liwb			    IO流工具类
 */

public class IOStreamUtils {
	
	/**
	 * 私有构造函数
	 * <p>Title: 私有构造函数</p> 
	 * <p>Description: 增加私有构造函数用以隐藏公开构造函数</p>
	 */
	private IOStreamUtils(){
		super();
	}

	/**
	 * @Description: 获取Excel导出模板目录指定文件的InputStream
	 * @param name 模板名称
	 * @return   
	 * @return InputStream  
	 * @throws
	 * @author liwb
	 * @date 2016年7月12日
	 */
	public static InputStream getExcelExportPathInputStream(final String name) {
		return getPathInputStream(ExportExcelConstant.TEMPLATE_EXPORT_DIR
				+ name);
	}

	/**
	 * @Description: 获取Excel导入模板目录指定文件的InputStream
	 * @param name 模板名称
	 * @return
	 * @author liwb
	 * @date 2016年8月23日
	 */
	public static InputStream getExcelImportPathInputStream(final String name) {
		return getPathInputStream(ImportExcelConstant.TEMPLATE_IMPORT_DIR
				+ name);
	}

	public static InputStream getImportPathInputStream(final String name) {
		return getPathInputStream(PrintConstant.TEMPLATE_PRINT_DIR + name);
	}

	/**
	 * @Description: 获取resource目录下指定路径的InputStream
	 * @param path 路径名称
	 * @return
	 * @author liwb
	 * @date 2016年8月23日
	 */
	public static InputStream getPathInputStream(final String path) {
		return IOStreamUtils.class.getResourceAsStream(path);
	}

}
