/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月20日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.supplier;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.supplier.service.SupplierAreaServiceApi;

/**
 * ClassName: SupplierAreaController 
 * @Description: 供应商区域Controller
 * @author zhangchm
 * @date 2016年7月20日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    进销存2.0.0		   2016年7月20日                  zhangchm            创建供应商区域Controller， 查询供应商区域树结构、类别树结构、类别
 */

@Controller
@RequestMapping("supplierArea")
public class SupplierAreaController extends
		BaseController<SupplierAreaController> {

	@Reference(version = "1.0.0", check = false)
	private SupplierAreaServiceApi supplierAreaService;
	
	/**
	 * @Description: 跳转供应商区域页面
	 * @return
	 * @author lijy02
	 * @date 2016年10月12日
	 */
	@RequestMapping(value = "views")
	public String views() {
		return "supplier/area/supplierAreaList";
	}
	
	
	/**
	 * @Description: 新增页面
	 * @return
	 * @author lijy02
	 * @date 2016年10月12日
	 */
	@RequestMapping(value = "toAdd")
	public String toAdd() {
		return "supplier/area/supplierAreaAdd";
	}
	
	/**
	 * @Description: 修改页面
	 * @return
	 * @author lijy02
	 * @date 2016年10月12日
	 */
	@RequestMapping(value = "toEdit")
	public String toEdit() {
		return "supplier/area/supplierAreaEdit";
	}

}
