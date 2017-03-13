package com.okdeer.jxc.utils;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.okdeer.jxc.utils.poi.ExcelReaderUtil;

import net.sf.json.JSONObject;

public class TxtReadUtil {

	/**
	 * LOG
	 */
	private static final Logger LOG = LoggerFactory.getLogger(ExcelReaderUtil.class);

	/**
	 * @Fields POINT : 字符"."
	 */
	public static final String POINT = ".";

	/**
	 * @Fields TXT_POSTFIX : txt
	 */
	public static final String TXT_POSTFIX = "txt";

	/**
	 * @Description: 解析TXT文件
	 * @param fileName
	 * @param is
	 * @param fields
	 * @return
	 * @author xuyq
	 * @date 2017年3月11日
	 */
	public static List<JSONObject> readTxtFile(String fileName, InputStream is, String[] fields) {
		if (StringUtils.isBlank(fileName)) {
			return Collections.emptyList();
		}

		// 根据文件名，获取文件后缀
		String postfix = getSuffix(fileName);

		if (StringUtils.isBlank(postfix)) {
			LOG.warn("文件名 [{}] suffix is empty", fileName);
			return Collections.emptyList();
		}

		if (!TXT_POSTFIX.equals(postfix)) {
			LOG.warn("文件[{}]后缀名错误, 后缀名为=[{}]", fileName, postfix);
			return Collections.emptyList();
		}

		List<JSONObject> txtList = new ArrayList<JSONObject>();
		try {
			String encoding = "GBK";
			// 考虑到编码格式
			InputStreamReader read = new InputStreamReader(is, encoding);
			BufferedReader bufferedReader = new BufferedReader(read);
			String lineTxt = null;
			while ((lineTxt = bufferedReader.readLine()) != null) {
				// LOG.info("读取一行：",lineTxt);
				if (StringUtils.isBlank(lineTxt)) {
					continue;
				}
				txtList.add(parseLine(lineTxt, fields));
			}
			read.close();
		} catch (Exception e) {
			LOG.error("读取文件内容出错:{}", e);
		}
		return txtList;
	}

	/**
	 * @Description: 解析行
	 * @param lineTxt
	 * @param fields
	 * @return
	 * @author xuyq
	 * @date 2017年3月11日
	 */
	private static JSONObject parseLine(String lineTxt, String[] fields) {
		JSONObject json = null;
		String[] arrTxt = lineTxt.split(",");
		for (int i = 0; i < fields.length; i++) {
			if (json == null) {
				json = new JSONObject();
			}
			String fieldStr = arrTxt[i];
			if (fieldStr == null) {
				continue;
			}

			json.element(fields[i], fieldStr);
		}
		return json;
	}

	public static String getSuffix(String fileName) {
		if (StringUtils.isBlank(fileName)) {
			return null;
		}
		if (fileName.contains(POINT)) {
			StringBuilder sb = new StringBuilder(fileName);
			return sb.substring(sb.lastIndexOf(POINT) + 1, sb.length());
		}
		return null;
	}

}
