
package com.okdeer.jxc.controller;

import java.io.InputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.okdeer.jxc.common.handler.PriceGrantHandler;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.PriceGrantUtil;
import com.okdeer.jxc.utils.UserUtil;
import com.okdeer.jxc.utils.jxls.ReportExcelUtil;
import com.okdeer.jxc.utils.poi.ExcelReaderUtil;

/**
 * ClassName: BaseController 
 * @Description: Controller基类，提供公共方法
 * @author liwb
 * @date 2016年8月5日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 商业管理系统1.0.0	  2016年8月18日			 liwb			  Controller基类
 */

public class BaseController<T> {

	/**
	 * LOG
	 */
	protected final Logger LOG = LoggerFactory.getLogger(this.getClass());

	/**
	 * @Fields PAGE_NO : 分页默认为第1页
	 */
	protected static final String PAGE_NO = "1";

	/**
	 * 默认显示10条记录
	 */
	protected static final String PAGE_SIZE = "10";

	/**
	 * @Description: 获取当前用户信息
	 * @return
	 * @author liwb
	 * @date 2016年8月5日
	 */
	protected SysUser getCurrentUser() {
		return UserUtil.getCurrentUser();
	}

	/**
	 * @Description: 获取当前用户ID
	 * @return
	 * @author liwb
	 * @date 2016年8月5日
	 */
	protected String getCurrUserId() {
		SysUser user = getCurrentUser();
		return user == null ? null : user.getId();
	}

	/**
	 * @Description: 获取当前机构ID
	 * @return
	 * @author liwb
	 * @date 2016年8月5日
	 */
	protected String getCurrBranchId() {
		SysUser user = getCurrentUser();
		return user == null ? null : user.getBranchId();
	}

	/**
	 * @Description: 获取当前机构code
	 * @return
	 * @author liwb
	 * @date 2016年8月5日
	 */
	protected String getCurrBranchCode() {
		SysUser user = getCurrentUser();
		return user == null ? null : user.getBranchCode();
	}

	/**
	 * @Description: 获取当前登录用户机构完整code
	 * @return
	 * @author lijy02
	 * @date 2016年9月8日
	 */
	protected String getCurrBranchCompleCode() {
		SysUser sysUser = getCurrentUser();
		return sysUser == null ? null : sysUser.getBranchCompleCode();
	}

	/**
	 * @Description: 获取当前机构Type
	 * @return
	 * @author liwb
	 * @date 2016年8月5日
	 */
	protected Integer getCurrBranchType() {
		SysUser user = getCurrentUser();
		return user == null ? null : user.getBranchType();
	}

	/**
	 * @Description: 获取当前用户商品分类权限列表
	 * @return
	 * @author liwb
	 * @date 2016年8月13日
	 */
	protected List<String> getCurrCategoryGrants() {
		SysUser user = getCurrentUser();
		return user == null ? null : user.getCategoryCodes();
	}

	/**
	 * @Description: 过滤价格权限
	 * @param handler PriceGrantHandler接口
	 * @author liwb
	 * @date 2016年8月19日
	 */
	protected void filterPriceGrant(PriceGrantHandler handler) {
		PriceGrantUtil.grantPrice(handler);
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
	protected void exportListForXLSX(HttpServletResponse response,
			List<?> dataList, String fileName, String templateName) {
		ReportExcelUtil.exportListForXLSX(response, dataList, fileName,
				templateName);
	}

	/**
	 * @Description: 分sheet页导出后缀名为“.xlsx”的Excel公用方法，默认分页大小为1000
	 * @param response	
	 * @param dataList	数据集合
	 * @param fileName	导出文件名称，不包括后缀名
	 * @param templateName	模板名称，包括后缀名
	 * @author liwb
	 * @date 2016年8月22日
	 */
	protected void exportPageForXLSX(HttpServletResponse response,
			List<?> dataList, String fileName, String templateName) {
		ReportExcelUtil.exportPageForXLSX(response, dataList, fileName,
				templateName);
	}

	/**
	 * @Description: 解析Excel文件，返回List集合
	 * @param fileName 文件名称
	 * @param is	文件流
	 * @param fields 解析字段信息
	 * @param entity 转换实体类
	 * @return 返回数据列表信息，泛型与entity一致
	 * @author liwb
	 * @date 2016年8月31日
	 */
	@SuppressWarnings("hiding")
	protected <T> List<T> parseExcel(String fileName, InputStream is,
			String[] fields, T entity) {
		return ExcelReaderUtil.readExcel(fileName, is, fields, entity);
	}
}
