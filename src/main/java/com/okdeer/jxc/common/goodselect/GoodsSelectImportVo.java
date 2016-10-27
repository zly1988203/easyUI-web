/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年10月13日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.common.goodselect;

import java.util.List;

import com.okdeer.jxc.goods.entity.GoodsSelect;

/**
 * ClassName: GoodsSelectImportVo 
 * @Description: TODO
 * @author xiaoj02
 * @date 2016年10月13日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

public class GoodsSelectImportVo<T extends GoodsSelect> {
	
	private String message;
	
	private String errorFileUrl;
	
	private List<T> list;
	
	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

	
	/**
	 * @param message the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	
	/**
	 * @return the errorFileUrl
	 */
	public String getErrorFileUrl() {
		return errorFileUrl;
	}

	
	/**
	 * @param errorFileUrl the errorFileUrl to set
	 */
	public void setErrorFileUrl(String errorFileUrl) {
		this.errorFileUrl = errorFileUrl;
	}


	
	/**
	 * @return the list
	 */
	public List<T> getList() {
		return list;
	}


	
	/**
	 * @param list the list to set
	 */
	public void setList(List<T> list) {
		this.list = list;
	}


}
