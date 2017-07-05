/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年6月5日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.common.chargeImport;

import java.util.List;

/**
 * ClassName: ChargeImportVo 
 * @Description: 费用导入Vo
 * @author liwb
 * @date 2017年6月5日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

public class ChargeImportVo {

	private String message;

	private String errorFileUrl;

	private List<ChargeImportItemVo> list;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getErrorFileUrl() {
		return errorFileUrl;
	}

	public void setErrorFileUrl(String errorFileUrl) {
		this.errorFileUrl = errorFileUrl;
	}

	public List<ChargeImportItemVo> getList() {
		return list;
	}

	public void setList(List<ChargeImportItemVo> list) {
		this.list = list;
	}

}
