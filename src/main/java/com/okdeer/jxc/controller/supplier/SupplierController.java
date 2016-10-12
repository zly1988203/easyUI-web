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
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.supplier.service.SupplierServiceApi;

/**
 * ClassName: SupplierController 
 * @Description: 供应商组件Controller
 * @author zhangchm
 * @date 2016年7月20日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    进销存2.0.0		   2016年7月20日                  zhangchm            创建供应商组件Controller， 查询供应商
 */

@Controller
@RequestMapping("supplier")
public class SupplierController extends BaseController<SupplierController> {

	@Reference(version = "1.0.0", check = false)
	private SupplierServiceApi supplierService;

	// 店铺服务接口
	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesService;

	

}
