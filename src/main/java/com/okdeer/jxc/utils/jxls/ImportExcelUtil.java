
package com.okdeer.jxc.utils.jxls;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.jxls.reader.ReaderBuilder;
import org.jxls.reader.XLSReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.SAXException;

import com.okdeer.jxc.utils.IOStreamUtils;

/**
 * ClassName: ImportExcelUtil 
 * @Description: 导入Excel工具类
 * @author liwb
 * @date 2016年8月23日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 商业管理系统1.0.0	  2016年8月20日			 liwb			   导入Excel工具类
 */

public class ImportExcelUtil {

	/**
	 * @Fields LOG : LOG
	 */
	private static final Logger LOG = LoggerFactory.getLogger(ImportExcelUtil.class);
	
	/**
	 * 私有构造函数
	 * <p>Title: 私有构造函数</p> 
	 * <p>Description: 增加私有构造函数用以隐藏公开构造函数</p>
	 */
	private ImportExcelUtil(){
		super();
	}

	/**
	 * @Description: 解析Excel文件，返回List集合
	 * @param excelFile 	MultipartFile文件
	 * @param templateName	导入模板名称
	 * @return
	 * @throws IOException
	 * @throws SAXException
	 * @throws InvalidFormatException
	 * @author liwb
	 * @date 2016年8月23日
	 */
	public static <T> List<T> parseExcelFile(MultipartFile excelFile, String templateName) {

		InputStream inputXML = null;
		InputStream inputXLS = null;
		XLSReader mainReader;
		try {
			// 获取导入模板文件流
			inputXML = IOStreamUtils.getExcelImportPathInputStream(templateName);

			// 构建jxls文件流
			mainReader = ReaderBuilder.buildFromXML(inputXML);

			// 获取Excel文件流
			inputXLS = new BufferedInputStream(excelFile.getInputStream());

			Map<String, Object> map = new HashMap<String, Object>();
			List<T> dataList = new ArrayList<T>();
			map.put("dataList", dataList);

			// 解析文件，并得到相应集合
			mainReader.read(inputXLS, map);

			return dataList;
		} catch (IOException e) {
			LOG.error("解析Excel 流异常:", e);
		} catch (SAXException e) {
			LOG.error("解析Excel SAX异常:", e);
		} catch (InvalidFormatException e) {
			LOG.error("解析Excel 格式化数据异常:", e);
		} finally {
			closeIO(inputXML, inputXLS);
		}

		return Collections.emptyList();
	}

	/**
	 * @Description: TODO
	 * @param inputXML
	 * @param inputXLS
	 * @author liwb
	 * @date 2016年9月18日
	 */
	private static void closeIO(InputStream inputXML, InputStream inputXLS) {
		try {
			if (inputXML != null) {
				inputXML.close();
			}
			if (inputXLS != null) {
				inputXLS.close();
			}
		} catch (IOException e) {
			LOG.warn("流已关闭!", e);
		}
	}

}
