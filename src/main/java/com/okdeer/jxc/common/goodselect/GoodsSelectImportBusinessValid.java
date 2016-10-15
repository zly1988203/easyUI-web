/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年10月14日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.common.goodselect;


import java.util.List;

import org.apache.poi.ss.formula.functions.T;

import com.okdeer.jxc.goods.entity.GoodsSelect;

import net.sf.json.JSONObject;

/**
 * ClassName: GoodSelectImportBusinessValid 
 * @Description: TODO
 * @author xiaoj02
 * @date 2016年10月14日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

public interface GoodsSelectImportBusinessValid {

	List<JSONObject> businessValid(List<JSONObject> list, String[] excelField);
	
	void formatter(List<? extends GoodsSelect> list);
	
}
