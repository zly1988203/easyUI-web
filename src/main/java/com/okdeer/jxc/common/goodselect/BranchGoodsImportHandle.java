/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年10月14日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.common.goodselect;

import java.util.List;

import net.sf.json.JSONObject;

import com.okdeer.jxc.goods.entity.GoodsBranchPriceVo;

/**
 * 商品选择excel导入处理接口
 * ClassName: GoodsSelectImportHandle 
 * @author xiaoj02
 * @date 2016年10月14日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

public interface BranchGoodsImportHandle {
	
	/**
	 * 货号 
	 */
	public static final String TYPE_SKU_CODE = "0";
	
	/**
	 * 条码 
	 */
	public static final String TYPE_BAR_CODE = "1";
	
	/**
	 * @Description: TODO
	 * @param dblist
	 * @author xiaoj02
	 * @date 2016年10月14日
	 */
	void checkWithDataBase(List<? extends GoodsBranchPriceVo> dblist,String type);

	/**
	 * @Description: TODO
	 * @param list
	 * @param excelField
	 * @param entity
	 * @return
	 * @author xiaoj02
	 * @date 2016年10月14日
	 */
	<T extends GoodsBranchPriceVo> List<T> getSuccessData(String type,List<T> list, String[] excelField, T entity);
	
	/**
	 * @Description: TODO
	 * @return
	 * @author xiaoj02
	 * @date 2016年10月14日
	 */
	List<JSONObject> getExcelListSuccessData();

	/**
	 * @Description: TODO
	 * @return
	 * @author xiaoj02
	 * @date 2016年10月14日
	 */
	List<String> getExcelSuccessCode();

	/**
	 * @Description: TODO
	 * @return
	 * @author xiaoj02
	 * @date 2016年10月14日
	 */
	List<JSONObject> getExcelListErrorData();
	
	

}
