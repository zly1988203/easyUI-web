
package com.okdeer.jxc.controller;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;

import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.parser.DataAccessParser;
import com.okdeer.jxc.common.parser.MapAccessParser;
import com.okdeer.jxc.common.parser.vo.KeyExtendVo;
import com.okdeer.jxc.common.report.DataRecord;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.StringUtils;
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
	 * @Fields SUCCESS : success
	 */
	protected static final String SUCCESS = "success";

	/**
	 * @Fields PAGE_500 : 500页面
	 */
	protected static final String PAGE_500 = "/error/500";

	/**
	 * @Fields error_Msg : 500页面错误提示消息key值
	 */
	protected static final String ERROR_MSG = "errorMsg";

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
	 * @Description: 导出后缀名为“.xlsx”的Excel公用方法
	 * @param response	
	 * @param dataList	数据集合
	 * @param fileName	导出文件名称，不包括后缀名
	 * @param templateName	模板名称，包括后缀名
	 * @author liwb
	 * @date 2016年8月22日
	 */
	protected void exportListForXLSX(HttpServletResponse response, List<?> dataList, String fileName,
			String templateName) {
		ReportExcelUtil.exportListForXLSX(response, dataList, fileName, templateName);
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
	protected void exportPageForXLSX(HttpServletResponse response, List<?> dataList, String fileName,
			String templateName) {
		ReportExcelUtil.exportPageForXLSX(response, dataList, fileName, templateName);
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
	protected <T> List<T> parseExcel(String fileName, InputStream is, String[] fields, T entity) {
		return ExcelReaderUtil.readExcel(fileName, is, fields, entity);
	}

	/**
	 * @Description: 获取当前机构类型权限列表
	 * @return
	 * @author liwb
	 * @date 2017年2月16日
	 */
	protected List<BranchTypeEnum> getCurrTypeList() {
		List<BranchTypeEnum> typeList = new ArrayList<BranchTypeEnum>();
		Integer branchType = getCurrBranchType();

		// 总部有所有类型权限
		if (BranchTypeEnum.HEAD_QUARTERS.getCode().equals(branchType)) {
			typeList = Arrays.asList(BranchTypeEnum.values());
		}

		// 分公司有除总部以外的所有权限
		else if (BranchTypeEnum.BRANCH_OFFICE.getCode().equals(branchType)) {
			for (BranchTypeEnum type : BranchTypeEnum.values()) {
				if (!BranchTypeEnum.HEAD_QUARTERS.equals(type)) {
					typeList.add(type);
				}
			}
		}

		// 其它只有当前类型的权限
		else {
			BranchTypeEnum currType = BranchTypeEnum.enumValueOf(branchType);
			typeList.add(currType);
		}
		return typeList;
	}

	/**
	 * @Description: 验证导出集合数据
	 * @param list
	 * @author liwb
	 * @date 2017年5月24日
	 */
	protected RespJson validateExportList(List<?> list) {
		if (CollectionUtils.isEmpty(list)) {
			return RespJson.error("无数据可导");
		}

		if (list.size() > ExportExcelConstant.EXPORT_MAX_SIZE) {
			return RespJson.error("最多只能导出" + ExportExcelConstant.EXPORT_MAX_SIZE + "条数据");
		}

		return RespJson.success();
	}

	/**
	 * @Description: 跳转到错误页面
	 * @param errorMsg 错误信息
	 * @return
	 * @author liwb
	 * @date 2017年5月25日
	 */
	protected ModelAndView toErrorPage(String errorMsg) {
		ModelAndView mv = new ModelAndView("error/info");
		mv.addObject("errorMsg", errorMsg);
		return mv;
	}

	/**
	 * 过滤价格权限数据（单个vo）
	 * @param data 要过滤的vo对象
	 */
	protected void cleanAccessData(Object data) {
	    if(data == null){
	        return;
	    }
		Set<String> forbiddenSets = PriceGrantUtil.getNoPriceGrantSets();
		DataAccessParser parser = new DataAccessParser(data.getClass(), forbiddenSets);
		parser.cleanDataObject(data);
	}

	/**
	 * 过滤价格权限数据（vo list）
	 * @param datas 要过滤的vo对象
	 */
	protected void cleanAccessData(List<? extends Object> datas) {
	    if(CollectionUtils.isEmpty(datas)){
	        return;
	    }
		Class<?> cls = datas.get(0).getClass();
		Set<String> forbiddenSets = PriceGrantUtil.getNoPriceGrantSets();
		DataAccessParser parser = new DataAccessParser(cls, forbiddenSets);
		parser.cleanDataObjects(datas);
	}

	/**
	 * 过滤价格权限数据（单个map）
	 * @param extendVos 要过滤的数据key与关联key列表
	 * @param dataMap 要过滤的数据
	 */
	protected void cleanDataMap(String keyStr, DataRecord data) {
	    if(StringUtils.isBlank(keyStr) || data == null || data.size() == 0){
	        return;
	    }
		List<KeyExtendVo> extendVos = parserPriceKey(keyStr);
		Set<String> forbiddenSets = PriceGrantUtil.getNoPriceGrantSets();
		MapAccessParser parser = new MapAccessParser(extendVos, forbiddenSets);
		parser.cleanDataMap(data);
	}

	/**
	 * 过滤价格权限数据（单个map）
	 * @param extendVos 要过滤的数据key与关联key列表
	 * @param dataMap 要过滤的数据
	 */
	protected void cleanDataMap(String keyStr, Map<String, Object> data) {
	    if(StringUtils.isBlank(keyStr) || data == null || data.size() == 0){
	        return;
	    }
		List<KeyExtendVo> extendVos = parserPriceKey(keyStr);
		Set<String> forbiddenSets = PriceGrantUtil.getNoPriceGrantSets();
		MapAccessParser parser = new MapAccessParser(extendVos, forbiddenSets);
		parser.cleanDataMap(data);
	}

	/**
	 * 过滤价格权限数据（map集合）
	 * @param extendVos 要过滤的数据key与关联key列表
	 * @param dataMaps 要过滤的数据
	 */
	protected void cleanDataMaps(String keyStr, List<DataRecord> datas) {
	    if(StringUtils.isBlank(keyStr) || CollectionUtils.isEmpty(datas)){
	        return;
	    }
		List<KeyExtendVo> extendVos = parserPriceKey(keyStr);
		Set<String> forbiddenSets = PriceGrantUtil.getNoPriceGrantSets();
		MapAccessParser parser = new MapAccessParser(extendVos, forbiddenSets);
		parser.cleanDataMap(datas);
	}

	/**
	* 
	* @Description: 转换过滤权限字段
	* @param keyStr
	* @return List
	* @date 2017年6月9日
	*/
	private List<KeyExtendVo> parserPriceKey(String keyStr) {
		List<KeyExtendVo> keyList = new ArrayList<KeyExtendVo>();
		if (StringUtils.isBlank(keyStr)) {
			return keyList;
		}
		String[] tempArrKey = keyStr.split("#");
		for (int i = 0; i < tempArrKey.length; i++) {
			KeyExtendVo keyVo = new KeyExtendVo();

			String tempKeyStr = tempArrKey[i];
			String key = tempKeyStr.substring(0, tempKeyStr.indexOf(":"));
			// 设置属性
			keyVo.setKey(key);
			String extKeysStr = tempKeyStr.substring(tempKeyStr.indexOf(":") + 1);
			String[] extKeysArr = extKeysStr.split(",");
			Set<String> extKeys = new HashSet<String>();
			for (int j = 0; j < extKeysArr.length; j++) {
				extKeys.add(extKeysArr[j]);
			}
			// 设置属性
			keyVo.setExtKeys(extKeys);
			keyList.add(keyVo);
		}
		return keyList;
	}

}
