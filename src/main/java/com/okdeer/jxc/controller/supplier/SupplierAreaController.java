/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月20日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.supplier;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.supplier.service.SupplierAreaServiceApi;
import com.okdeer.jxc.supplier.vo.SupplierAreaVo;
import com.okdeer.jxc.utils.UserUtil;

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
@RequestMapping("common/supplierArea")
public class SupplierAreaController extends
		BaseController<SupplierAreaController> {

	@Reference(version = "1.0.0", check = false)
	private SupplierAreaServiceApi supplierAreaService;

	// 店铺服务接口
	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesService;

	/**
	 * @Description 查询供应商区域树结构
	 * @param vo
	 * @param response
	 * @return   
	 * @author zhangchm
	 * @date 2016年7月20日
	 */
	@RequestMapping(value = "getSupplierAreaToTree")
	@ResponseBody
	public String getSupplierAreaToTree() {
		try {
			// begin added by lijy02 2016.9.12:添加过滤条件
			SupplierAreaVo vo = new SupplierAreaVo();
			String branchesId = UserUtil.getCurrBranchId();
			Integer branchType = UserUtil.getCurrBranchType();
			if (branchesId != null) {
				vo.setBranchId(branchesId);
				// 如果机构类型不是 0 1 需要查询他们的分公司 找到他们分公司的供应商
				if (branchType != 0 && branchType != 1) {
					// 查询店铺的分公司
					Branches branches = branchesService
							.getBranchInfoById(branchesId);
					if (branches != null && branches.getParentId() != null) {
						// 把父级的id加入条件查询分公司的供应商
						vo.setBranchId(branches.getParentId());
					}
				}
			}
			// end added by lijy02
			String supplierAreaTree = supplierAreaService
					.querySupplierAreaToTree(vo);
			return supplierAreaTree;
		} catch (Exception e) {
			LOG.error("查询商对应区域树结构异常:", e);
		}
		return null;
	}

}
