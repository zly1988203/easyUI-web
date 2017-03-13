/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2016年10月13日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.utils.poi;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFPatriarch;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.okdeer.jxc.common.utils.DateUtils;

import net.sf.json.JSONObject;

/**
 * ClassName: ExcelExportUtil 
 * @Description: POI导出工具类
 * @author liwb
 * @date 2016年10月13日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@SuppressWarnings("deprecation")
public class ExcelExportUtil {

	/**
	 * LOG
	 */
	private static final Logger LOG = LoggerFactory.getLogger(ExcelExportUtil.class);

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
	 * 增加私有构造函数用以隐藏公开构造函数
	 * <p>Title: </p> 
	 * <p>Description: </p>  
	 */
	private ExcelExportUtil() {

	}

	public static void exportExcel(String reportFileName, String[] headers, String[] columns, List<JSONObject> dataList,
			HttpServletResponse response) {
		// 默认Sheet标签名称
		String sheetName = "Sheet0";

		// 默认时间格式
		String pattern = DateUtils.DATE_FULL_STR;

		exportExcel(reportFileName, sheetName, headers, columns, dataList, response, pattern);
	}

	/**  
	 * 导出Excel的方法  
	 * @param sheetName excel中的sheet名称  
	 * @param headers 表头  
	 * @param dataList 结果集  
	 * @param response 输出流  
	 * @param pattern 时间格式  
	 * @throws Exception  
	 */
	public static void exportExcel(String reportFileName, String sheetName, String[] headers, String[] columns, List<JSONObject> dataList,
			HttpServletResponse response, String pattern) {

		if (StringUtils.isBlank(pattern)) {
			pattern = DateUtils.DATE_FULL_STR;
		}

		// 声明一个工作薄
		HSSFWorkbook workbook = new HSSFWorkbook();
		OutputStream out = null;

		try {

			// 生成一个表格
			HSSFSheet sheet = workbook.createSheet(sheetName);
			// 设置表格默认列宽度为20个字节
			sheet.setDefaultColumnWidth(20);

			// 生成一个样式
			HSSFCellStyle style = workbook.createCellStyle();
			// 设置这些样式
			style.setFillForegroundColor(HSSFColor.GOLD.index);
			style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
			style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
			style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
			style.setBorderRight(HSSFCellStyle.BORDER_THIN);
			style.setBorderTop(HSSFCellStyle.BORDER_THIN);
			style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
			// 生成一个字体
			HSSFFont font = workbook.createFont();
			font.setColor(HSSFColor.VIOLET.index);
			// font.setFontHeightInPoints((short) 12);
			font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
			// 把字体应用到当前的样式
			style.setFont(font);

			// 指定当单元格内容显示不下时自动换行
			style.setWrapText(true);

			// 声明一个画图的顶级管理器
			HSSFPatriarch patriarch = sheet.createDrawingPatriarch();
			/*
			 * 
			 * 以下可以用于设置导出的数据的样式
			 * 
			 * // 生成并设置另一个样式 HSSFCellStyle style2 = workbook.createCellStyle();
			 * style2.setFillForegroundColor(HSSFColor.LIGHT_YELLOW.index);
			 * style2.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND); style2.setBorderBottom(HSSFCellStyle.BORDER_THIN);
			 * style2.setBorderLeft(HSSFCellStyle.BORDER_THIN); style2.setBorderRight(HSSFCellStyle.BORDER_THIN);
			 * style2.setBorderTop(HSSFCellStyle.BORDER_THIN); style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);
			 * style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER); // 生成另一个字体 HSSFFont font2 =
			 * workbook.createFont(); font2.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL); // 把字体应用到当前的样式
			 * style2.setFont(font2); // 声明一个画图的顶级管理器 HSSFPatriarch patriarch = sheet.createDrawingPatriarch();
			 * 
			 * 
			 * // 定义注释的大小和位置,详见文档 HSSFComment comment = patriarch.createComment(new HSSFClientAnchor(0, 0, 0, 0, (short)
			 * 4, 2, (short) 6, 5)); // 设置注释内容 comment.setString(new HSSFRichTextString("可以在POI中添加注释！")); //
			 * 设置注释作者，当鼠标移动到单元格上是可以在状态栏中看到该内容. comment.setAuthor("leno");
			 */

			// 产生表格标题行
			// 表头的样式
			HSSFCellStyle titleStyle = workbook.createCellStyle();// 创建样式对象
			titleStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER_SELECTION);// 水平居中
			titleStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直居中
			// 设置字体
			HSSFFont titleFont = workbook.createFont(); // 创建字体对象
			titleFont.setFontHeightInPoints((short) 15); // 设置字体大小
			titleFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);// 设置粗体
			// titleFont.setFontName("黑体"); // 设置为黑体字
//			titleStyle.setFont(titleFont);
//			sheet.addMergedRegion(new Region(0, (short) 0, 0, (short) (headers.length - 1)));// 指定合并区域
//			HSSFRow rowHeader = sheet.createRow(0);
//			HSSFCell cellHeader = rowHeader.createCell((short) 0); // 只能往第一格子写数据，然后应用样式，就可以水平垂直居中
//			HSSFRichTextString textHeader = new HSSFRichTextString(sheetName);
//			cellHeader.setCellStyle(titleStyle);
//			cellHeader.setCellValue(textHeader);

			HSSFRow row = sheet.createRow(0);
			for (int i = 0; i < headers.length; i++) {
				HSSFCell cell = row.createCell((short) i);
				cell.setCellStyle(style);
				HSSFRichTextString text = new HSSFRichTextString(headers[i]);
				cell.setCellValue(text);
			}
			// 遍历集合数据，产生数据行
			if (dataList != null) {
				int index = 1;
				for (JSONObject jObj : dataList) {
					// Field[] fields = t.getClass().getDeclaredFields();
					row = sheet.createRow(index);
					index++;
					for (short i = 0; i < columns.length; i++) {
						HSSFCell cell = row.createCell(i);
						// Field field = fields[i];
						// String fieldName = field.getName();
						String fieldName = columns[i];
						Object value = jObj.get(fieldName);

						String textValue = null;
						if (value == null) {
							textValue = "";
						} else if (value instanceof Date) {
							Date date = (Date) value;
							SimpleDateFormat sdf = new SimpleDateFormat(pattern);
							textValue = sdf.format(date);
						} else if (value instanceof byte[]) {
							// 有图片时，设置行高为60px;
							row.setHeightInPoints(60);
							// 设置图片所在列宽度为80px,注意这里单位的一个换算
							sheet.setColumnWidth(i, (short) (35.7 * 80));
							// sheet.autoSizeColumn(i);
							byte[] bsValue = (byte[]) value;
							HSSFClientAnchor anchor = new HSSFClientAnchor(0, 0, 1023, 255, (short) 6, index,
									(short) 6, index);
							anchor.setAnchorType(2);
							patriarch.createPicture(anchor,
									workbook.addPicture(bsValue, HSSFWorkbook.PICTURE_TYPE_JPEG));
						} else {
							// 其它数据类型都当作字符串简单处理
							textValue = value.toString();
						}

						if (textValue != null) {
							Pattern p = Pattern.compile("^//d+(//.//d+)?$");
							Matcher matcher = p.matcher(textValue);
							if (matcher.matches()) {
								// 是数字当作double处理
								cell.setCellValue(Double.parseDouble(textValue));
							} else {
								HSSFRichTextString richString = new HSSFRichTextString(textValue);
								// HSSFFont font3 = workbook.createFont();
								// font3.setColor(HSSFColor.BLUE.index);
								// richString.applyFont(font3);
								cell.setCellValue(richString);
							}
						}
					}
				}
			}

			out = response.getOutputStream();
			response.reset();// 清空输出流
			response.setHeader(REPORT_HEADER,
					REPORT_HEADER_TWO + URLEncoder.encode(reportFileName + REPORT_XLS, "UTF-8"));
			response.setContentType("application/msexcel");// 定义输出类型
			workbook.write(out);
		} catch (IOException e) {
			LOG.error("导出Excel失败：", e);
		} finally {
			try {
				if (workbook != null) {
					workbook.close();
				}
				if (out != null) {
					out.close();
				}
			} catch (IOException e) {
				LOG.error("IO was closed：", e);
			}
		}
	}
}
