package com.okdeer.jxc.common.util;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.http.HttpServletRequest;

public class ServletUtil {
	public static String getRequestContent(HttpServletRequest request) {
		InputStream is = null;
		InputStreamReader isr = null;
		BufferedReader br = null;
		try {
			request.setCharacterEncoding("UTF-8");
			StringBuffer sb = new StringBuffer();
			is = request.getInputStream();
			isr = new InputStreamReader(is, "UTF-8");
			br = new BufferedReader(isr);
			String s = "";
			while ((s = br.readLine()) != null) {
				sb.append(s);
			}
			return sb.toString();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (br != null) {
					br.close();
				}
				if (isr != null) {
					isr.close();
				}
				if (is != null) {
					is.close();
				}
			} catch (Exception e2) {
				e2.printStackTrace();
			}

		}
		return null;
	}
}
