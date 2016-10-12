/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月20日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.supplier;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.BranchArea;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.supplier.service.SupplierAreaServiceApi;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: SupplierAreaController 
 * @Description: 供应商区域Controller
 * @author 李俊义
 * @date 2016年7月20日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    零售系统		2016.10.12			lijy02				供应商区域控制类
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
		if(UserUtil.getCurrBranchType()==0) {
			return "supplier/area/supplierAreaList";
		}else {
			return "supplier/area/supplierAreaListOther";
		}
	}
	
	/**
	 * @Description: 根据条件查询供应商区域
	 * @param CodeOrName 编号或者名称
	 * @return
	 * @author lijy02
	 * @date 2016年10月12日
	 */
	@RequestMapping(value = "getSupplierAreaList")
	public List<BranchArea> getSupplierAreaList(String CodeOrName) {
		//判断当前用户是否是0 总部
		//总部查询总部下机构的供应商区域，其他的查询本机构的区域
		LOG.info("供应商区域查询参数CodeOrName:{}",CodeOrName);
		if(UserUtil.getCurrBranchType()==0) {
			
			return null;
		}else {
			
			return null;
		}
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
