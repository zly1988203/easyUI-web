
package com.okdeer.jxc.utils.jxls;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Serializable;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.jxls.area.Area;
import org.jxls.area.XlsArea;
import org.jxls.builder.AreaBuilder;
import org.jxls.builder.xls.XlsCommentAreaBuilder;
import org.jxls.command.Command;
import org.jxls.command.EachCommand;
import org.jxls.common.Context;
import org.jxls.transform.Transformer;
import org.jxls.util.JxlsHelper;
import org.jxls.util.TransformerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.utils.IOStreamUtils;

/**
 * ClassName: ReportExcelUtil 
 * @Description: 导出Excel工具类，基于jxl插件
 * @author liwb
 * @date 2016年8月20日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 商业管理系统1.0.0	  2016年8月20日			 liwb			    导出Excel工具类
 */

public class ReportExcelUtil {

	/**
	 * @Fields LOG : LOG
	 */
	private static final Logger LOG = LoggerFactory.getLogger(ImportExcelUtil.class);

	/**
	 * 设置响应前缀
	 */
	private final static String REPORT_HEADER = "Content-Disposition";

	/**
	 * 设置响应后缀
	 */
	private final static String REPORT_HEADER_TWO = "attachment;filename=";

	/**
	 * 导出为xlsx格式
	 */
	public final static String REPORT_XLSX = ".xlsx";

	/**
	 * 导出为xls格式
	 */
	public final static String REPORT_XLS = ".xls";
	
	/**
	 * 私有构造函数
	 * <p>Title: 私有构造函数</p> 
	 * <p>Description: 增加私有构造函数用以隐藏公开构造函数</p>
	 */
	private ReportExcelUtil(){
		super();
	}

	/**
	 * @Description: 导出Excel公用方法
	 * @param response
	 * @param dataList 数据集合
	 * @param fileName 导出文件名称，不包括后缀名
	 * @param templateName 模板名称
	 * @param suffix	导出文件后缀名
	 * @author liwb
	 * @date 2016年8月22日
	 */
	public static void exportListCommon(HttpServletResponse response, List<?> dataList, String fileName,
			String templateName, String suffix, Integer pageSize) {
		InputStream is = null;
		try {
			// 超过最大值，则不能导出
			if (dataList != null && dataList.size() > ExportExcelConstant.EXPORT_MAX_SIZE) {
				LOG.warn("数据记录数大于{}", ExportExcelConstant.EXPORT_MAX_SIZE);
				return;
			}
			// 获取Excel目录指定文件的InputStream
			is = IOStreamUtils.getExcelExportPathInputStream(templateName);
			if (pageSize == null) {
				reportExcelToList(response, is, fileName, suffix, dataList);
			} else {
				reportExcelPage(response, is, fileName, suffix, dataList, pageSize);
			}
		} catch (IOException e) {
			LOG.error("导出Excel流错误：", e);
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					LOG.error("流已关闭!", e);
				}
			}
		}
	}

	/**
	 * @Description: 导出后缀名为“.xlsx”的Excel公用方法
	 * @param response	
	 * @param dataList	数据集合
	 * @param fileName	导出文件名称，不包括后缀名
	 * @param templateName	模板名称，包括后缀名
	 * @author liwb
	 * @date 2016年8月22日
	 */
	public static void exportListForXLSX(HttpServletResponse response, List<?> dataList, String fileName,
			String templateName) {
		exportListCommon(response, dataList, fileName, templateName, REPORT_XLSX, null);
	}

	/**
	 * @Description: 导出后缀名为“.xlsx”的Excel公用方法
	 * @param response	
	 * @param dataList	数据集合
	 * @param fileName	导出文件名称，不包括后缀名
	 * @param templateName	模板名称，包括后缀名
	 * @param pageSize		Integer 每页显示大小
	 * @author liwb
	 * @date 2016年8月22日
	 */
	public static void exportPageForXLSX(HttpServletResponse response, List<?> dataList, String fileName,
			String templateName) {
		exportListCommon(response, dataList, fileName, templateName, REPORT_XLSX,
				ExportExcelConstant.EXPORT_SHEET_PAGE_SIZE);
	}

	/**
	 * 简单的List导出Excel文件
	 *
	 * @param response			HttpServletResponse 输出响应
	 * @param is				InputStream 读取模版文件的文件输入流，一般为“类.class.getResourceAsStream("模版名称.xlsx")”
	 * @param reportFileName	String 导出的文件名称
	 * @param reportSuffix		String 导出的文件后缀
	 * @param reportList		List 需要导出的List集合
	 * @throws IOException
	 */
	@SuppressWarnings("rawtypes")
	public static void reportExcelToList(HttpServletResponse response, InputStream is, String reportFileName,
			String reportSuffix, List reportList) throws IOException {
		Context context = new Context();
		context.putVar("reportList", reportList);
		reportToContext(response, is, reportFileName, reportSuffix, context);
	}

	/**
	 * 简单的Map导出Excel文件
	 *
	 * @param response			HttpServletResponse 输出响应
	 * @param is				InputStream 读取模版文件的文件输入流，一般为“类.class.getResourceAsStream("模版名称.xlsx")”
	 * @param reportFileName	String 导出的文件名称
	 * @param reportSuffix		String 导出的文件后缀
	 * @param reportMap			HashMap 需要导出的Map集合
	 * @throws IOException
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static void reportExcelToMap(HttpServletResponse response, InputStream is, String reportFileName,
			String reportSuffix, Map reportMap) throws IOException {
		Context context = new Context(reportMap);
		reportToContext(response, is, reportFileName, reportSuffix, context);
	}

	/**
	 * @Description: Map以及List导出Excel文件
	 * @param response			HttpServletResponse 输出响应
	 * @param is				InputStream 读取模版文件的文件输入流，一般为“类.class.getResourceAsStream("模版名称.xlsx")”
	 * @param reportFileName	String 导出的文件名称
	 * @param reportSuffix		String 导出的文件后缀
	 * @param reportMap			HashMap 需要导出的Map集合
	 * @param reportList		List 需要导出的List集合
	 * @throws IOException		
	 * @author liwb
	 * @date 2016年8月20日
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static void reportExcelToMapAndList(HttpServletResponse response, InputStream is, String reportFileName,
			String reportSuffix, Map reportMap, List reportList) throws IOException {
		Context context = new Context(reportMap);
		context.putVar("reportList", reportList);
		reportToContext(response, is, reportFileName, reportSuffix, context);
	}

	/**
	 * 分页导出Excel文件
	 *
	 * @param response       HttpServletResponse 输出响应
	 * @param is             InputStream 读取模版文件的文件输入流，一般为“类.class.getResourceAsStream("模版名称.xlsx")”
	 * @param reportFileName String 导出文件的名称
	 * @param reportSuffix   String 导出文件的后缀
	 * @param reportList     List 需要导出的List集合
	 * @param pageSize       Integer 每页显示大小
	 * @throws IOException
	 */
	@SuppressWarnings("rawtypes")
	public static void reportExcelPage(HttpServletResponse response, InputStream is, String reportFileName,
			String reportSuffix, List reportList, Integer pageSize) throws IOException {
		response.setHeader(REPORT_HEADER, REPORT_HEADER_TWO + URLEncoder.encode(reportFileName + reportSuffix, "UTF-8"));
		OutputStream os = response.getOutputStream();
		Transformer transformer = TransformerFactory.createTransformer(is, os);
		AreaBuilder areaBuilder = new XlsCommentAreaBuilder(transformer);
		List<Area> xlsAreaList = areaBuilder.build();
		Area xlsArea = xlsAreaList.get(0);
		Area perArea = xlsAreaList.get(1);

		XlsArea sheetArea = new XlsArea(xlsArea.getAreaRef(), transformer);
		EachCommand sheetEachCommand = new EachCommand("Sheet", "Sheets", sheetArea, new SimpleCellRefGenerator());
		xlsArea.addCommand(xlsArea.getAreaRef(), sheetEachCommand);

		XlsArea personArea = new XlsArea(perArea.getAreaRef(), transformer);
		Command personEachCommand = new EachCommand("obj", "Sheet.reportList", personArea);
		sheetArea.addCommand(perArea.getAreaRef(), personEachCommand);

		Context context = transformer.createInitialContext();
		List<ReportExcelList> sheetList = createReportExcelSheet(reportList, pageSize);
		context.putVar("Sheets", sheetList);
		xlsArea.applyAt(xlsArea.getStartCellRef(), context);
		xlsArea.processFormulas();
		transformer.write();
		is.close();
		os.close();
	}

	/**
	 * 将list集合转成分页list对象以便分页使用
	 *
	 * @param reportList List 需要导出的数据
	 * @param pageSize   Integer 每个sheet的数据条数
	 * @return List<ReportExcelList>
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private static List<ReportExcelList> createReportExcelSheet(List reportList, Integer pageSize) {
		Integer no = reportList.size() % pageSize == 0 ? reportList.size() / pageSize
				: ((reportList.size() / pageSize) + 1);
		List<ReportExcelList> lists = new ArrayList<ReportExcelList>();
		for (int i = 0; i < no; i++) {
			ReportExcelList pl = new ReportExcelList();
			if ((i + 1) == no) {
				pl.setReportList(reportList.subList(i * pageSize, reportList.size()));
				lists.add(pl);
			} else {
				pl.setReportList(reportList.subList(i * pageSize, (i + 1) * pageSize));
				lists.add(pl);
			}

		}
		return lists;
	}

	/**
	 * 对于数据量不大的简单导出功能，提供公共的导出方法，只需要提供Context内容
	 *
	 * @param response
	 *            HttpServletResponse 输出响应
	 * @param is
	 *            InputStream
	 *            读取模版文件的文件输入流，一般为“类.class.getResourceAsStream("模版名称.xlsx")”
	 * @param reportFileName
	 *            String 导出的文件名称
	 * @param reportSuffix
	 *            String 导出的文件后缀
	 * @param reportContext
	 *            Context 输出到Excel上面的内容数据
	 * @throws IOException
	 */
	private static void reportToContext(HttpServletResponse response, InputStream is, String reportFileName,
			String reportSuffix, Context reportContext) throws IOException {
		// 设置响应
		response.setHeader(REPORT_HEADER, REPORT_HEADER_TWO + URLEncoder.encode(reportFileName + reportSuffix, "UTF-8"));
		// 设置输出流，这里使用response对象的输出流，提供web下载
		OutputStream os = response.getOutputStream();
		JxlsHelper.getInstance().processTemplate(is, os, reportContext);
		is.close();
		os.close();
	}

	/**
	 * 将需要导出的数据转换成分页展示对象，为适应分页导出功能
	 *
	 * @param <T>
	 */
	@SuppressWarnings("serial")
	public static class ReportExcelList<T> implements Serializable {

		/**
		 * 需要转换的分页数据集合
		 */
		private List<T> reportList;

		public List<T> getReportList() {
			return reportList;
		}

		public void setReportList(List<T> reportList) {
			this.reportList = reportList;
		}
	}
}
