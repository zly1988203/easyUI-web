
package com.okdeer.jxc.controller.print;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRAbstractExporter;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.base.JRBaseReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.jasperreports.JasperReportsUtils;

import com.okdeer.jxc.utils.IOStreamUtils;

/**
 * ClassName: JasperHelper 
 * @Description: 模板打印帮助类
 * @author yangyq02
 * @date 2016年8月23日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    进销存2.0.0		   2016年8月20日                   杨永钦                                                模板打印帮助类
 */

public class JasperHelper {

	/**
	 * @Fields PRINT_TYPE :直接打印类型常量
	 */
	public static final String PRINT_TYPE = "print";

	/**
	 * @Fields PDF_TYPE :生成pdf类型常量
	 */
	public static final String PDF_TYPE = "pdf";

	/**
	 * @Fields EXCEL_TYPE :导出execl类型常量
	 */
	public static final String EXCEL_TYPE = "excel";

	/**
	 * @Fields HTML_TYPE : 生成html类型常量
	 */
	public static final String HTML_TYPE = "html";

	/**
	 * @Fields WORD_TYPE : 生成word类型常量
	 */
	public static final String WORD_TYPE = "word";

	/**
	 * logger
	 */
	private static final Logger LOG = LoggerFactory.getLogger(JasperHelper.class);
	
	/**
	 * 私有构造函数
	 * <p>Title: 私有构造函数</p> 
	 * <p>Description: 增加私有构造函数用以隐藏公开构造函数</p>
	 */
	private JasperHelper(){
		super();
	}

	/**
	 * @Description: 导出文件
	 * @param jasperReport
	 * @param type   
	 * @return void  
	 * @throws
	 * @author yangyq02
	 * @date 2016年8月23日
	 */
	public static void prepareReport(JasperReport jasperReport, String type) {
		/*
		 * 如果导出的是excel，则需要去掉周围的margin
		 */
		if ("excel".equals(type))
			try {
				Field margin = JRBaseReport.class.getDeclaredField("leftMargin");
				margin.setAccessible(true);
				margin.setInt(jasperReport, 0);
				margin = JRBaseReport.class.getDeclaredField("topMargin");
				margin.setAccessible(true);
				margin.setInt(jasperReport, 0);
				margin = JRBaseReport.class.getDeclaredField("bottomMargin");
				margin.setAccessible(true);
				margin.setInt(jasperReport, 0);
				Field pageHeight = JRBaseReport.class.getDeclaredField("pageHeight");
				pageHeight.setAccessible(true);
				pageHeight.setInt(jasperReport, 2147483647);
			} catch (Exception e) {
				LOG.error("ireport导出execl出现错误", e);
			}
	}


	/** 
	 * 导出pdf，注意此处中文问题，  
	 * 这里应该详细说：主要在ireport里变下就行了。看图 
	 * 1）在ireport的classpath中加入iTextAsian.jar 
	 * 2）在ireport画jrxml时，看ireport最左边有个属性栏。 
	 * 下边的设置就在点字段的属性后出现。 
	 * pdf font name ：STSong-Light ，pdf encoding ：UniGB-UCS2-H 
	 */
	private static void exportPdf(JasperPrint jasperPrint, HttpServletResponse response)
			throws IOException, JRException {
		response.setContentType("application/pdf");
		ServletOutputStream ouputStream = response.getOutputStream();
		JRAbstractExporter<?, ?, ?, ?> exporter = new JRPdfExporter();
		response.reset();
		response.setContentType("application/pdf");
		JasperReportsUtils.render(exporter, jasperPrint, ouputStream);
		ouputStream.flush();
		ouputStream.close();
	}


	/** 
	 * 按照类型导出不同格式文件 
	 *  
	 * @param datas   数据集合
	 * @param type  文件类型 
	 * @param filePath文件的路径
	 * @param request 
	 * @param response 
	 * @param defaultFilename默认的导出文件的名称 
	 */
	private static void export(Collection<?> datas, Map<String, Object> parametersMap, String type,
			String defaultFilename, String filePath, HttpServletResponse response) {
		LOG.debug("导出判断     The method======= export() start.......................");
		LOG.debug("默认文件名称:{}", defaultFilename);
		try {
			InputStream fis = IOStreamUtils.getImportPathInputStream(filePath);
			JasperReport jasperReport = JasperCompileManager.compileReport(fis);

			prepareReport(jasperReport, type);
			JRDataSource ds = new JRBeanCollectionDataSource(datas, false);
			JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parametersMap, ds);
			if (PDF_TYPE.equals(type)) {
				exportPdf(jasperPrint, response);
			} 
		} catch (Exception e) {
			LOG.error("ireport导出出现错误", e);
		}
	}

	/** 
	 * 导出入口 
	 *  
	 * @param exportType 
	 *            导出文件的类型 
	 * @param jaspername 
	 *            jasper文件的名字 如： xx.jasper 
	 * @param lists 
	 *           导出的数据 
	 * @param request 
	 * @param response 
	 * @param defaultFilename默认的导出文件的名称 
	 */
	public static void exportmain(HttpServletRequest request, HttpServletResponse response,
			Map<String, Object> map, String exportType, String jaspername, List<?> lists, String defaultFilename) {
		export(lists, map, exportType, defaultFilename, jaspername, response);
	}
}
