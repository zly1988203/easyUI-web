/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月20日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.supplier;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.supplier.entity.Supplier;
import com.okdeer.jxc.supplier.service.SupplierServiceApi;
import com.okdeer.jxc.supplier.vo.SupplierVo;
import com.okdeer.jxc.utils.UserUtil;

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
@RequestMapping("common/supplier")
public class SupplierController extends BaseController<SupplierController> {

	@Reference(version = "1.0.0", check = false)
	private SupplierServiceApi supplierService;

	// 店铺服务接口
	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesService;

	/**
	 * @Description: 公共选择供应商
	 * @return   
	 * @author zhangchm
	 * @date 2016年7月21日
	 */
	@RequestMapping(value = "views")
	public String views() {
		return "component/publicSupplier";
	}

	/**
	 * @Description: 查询供应商
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @author zhangchm
	 * @date 2016年7月22日
	 */
	@RequestMapping(value = "getComponentList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<Supplier> getComponentList(
			SupplierVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			// begin added by lijy02 2016.9.12:添加过滤条件
			String branchesId = UserUtil.getCurrBranchId();
			Integer branchType = UserUtil.getCurrBranchType();
			if (branchesId != null) {
				vo.setBranchesId(branchesId);
				// 如果机构类型不是 0 1 需要查询他们的分公司 找到他们分公司的供应商
				if (branchType != 0 && branchType != 1) {
					// 查询店铺的分公司
					Branches branches = branchesService
							.getBranchInfoById(branchesId);
					if (branches != null && branches.getParentId() != null) {
						// 把父级的id加入条件查询分公司的供应商
						vo.setBranchesId(branches.getParentId());
					}
				}
			}
			// end added by lijy02
			LOG.info("vo:" + vo.toString());
			PageUtils<Supplier> suppliers = supplierService.queryLists(vo);
			LOG.info("page" + suppliers.toString());
			return suppliers;
		} catch (Exception e) {
			LOG.error("查询供应商异常:", e);
		}
		return null;
	}

	/**
	 * 
	 * @Description: 获取供应商树
	 * @return
	 * @author taomm
	 * @date 2016年8月15日
	 */
	@RequestMapping(value = "getSupplierToTree")
	@ResponseBody
	public String getGoodsCategoryToTree() {
		try {
			String brandTree = supplierService.querySupplierToTree();
			return brandTree;
		} catch (Exception e) {
			LOG.error("查询供应商树结构异常:", e);
		}
		return null;
	}

	/**
	 * 
	 * @Description: TODO
	 * @param id
	 * @return
	 * @author xiaoj02
	 * @date 2016年9月13日
	 */
	@RequestMapping(value = "getById")
	@ResponseBody
	public RespJson getById(String id) {
		Supplier supplier = supplierService.getById(id);
		RespJson respJson = RespJson.success();
		respJson.put("supplier", supplier);
		return respJson;
	}

}
