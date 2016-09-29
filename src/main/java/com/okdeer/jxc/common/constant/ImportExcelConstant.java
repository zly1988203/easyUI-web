
package com.okdeer.jxc.common.constant;

/**
 * ClassName: ImportExcelConstant 
 * @Description: 导入Excel常量类
 * @author liwb
 * @date 2016年8月31日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 商业管理系统1.0.0	  2016年8月18日			 liwb			     导入Excel常量类
 */

public interface ImportExcelConstant {

	/**
	 * @Fields TEMPLATE_DIR : 导入模板文件目录 /template/excel/import
	 */
	String TEMPLATE_IMPORT_DIR = "/template/excel/import/";

	/**
	 * @Fields USER_LIST_FIELDS : 用户信息导入字段名信息
	 */
	String[] USER_LIST_FIELDS = { "id", "userCode", "userName", "mobile",
			"branchId", "branchType", "createTime" };

	/**
	 * @Fields GOODS_PRICE_ADJUST_FIELDS : 调价单信息导入字段名信息
	 */
	String[] GOODS_PRICE_ADJUST_FIELDS = { "skuCode", "skuName", "barCode",
			"spec", "unit", "oldPurPrice", "newPurPrice", "oldSalePrice",
			"newSalePrice", "oldDcPrice", "newDcPrice", "oldWsPrice",
			"newWsPrice", "oldVipPrice", "newVipPrice" };

	/**
	 * @Fields GOODS_PRICE_ADJUST_FIELDS : 中州价签打印字段
	 */
	String[] PRINT_ZZ_FIELDS = { "barCode", "skuName", "spec", "salePrice",
			"unit", "originPlace" };

	/**
	 * @Fields IMPORTMAX : 导入最大限制10000
	 */
	Integer IMPORTMAX = 10000;

	/**
	 * @Fields IMPORTMAXERRO : 导入数据不能超过10000
	 */
	String IMPORTMAXERRO = "导入数据不能超过10000";
}
