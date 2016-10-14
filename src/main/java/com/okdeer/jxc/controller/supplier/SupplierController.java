/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月20日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.supplier;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.supplier.entity.Supplier;
import com.okdeer.jxc.supplier.qo.SupplierQo;
import com.okdeer.jxc.supplier.service.SupplierAreaServiceApi;
import com.okdeer.jxc.supplier.service.SupplierServiceApi;
import com.okdeer.jxc.supplier.vo.SupplierAreaVo;

/**
 * ClassName: SupplierArchiveController 
 * @Description: 供应商档案controller
 * @author liwb
 * @date 2016年10月12日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@Controller
@RequestMapping("supplierArchive/")
public class SupplierController extends BaseController<SupplierController> {

	@Reference(version = "1.0.0", check = false)
	private SupplierAreaServiceApi supplierAreaService;

	@Reference(version = "1.0.0", check = false)
	private SupplierServiceApi supplierService;

	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesService;

	/**
	 * @Description: 到管理列表页面
	 * @return
	 * @author liwb
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "toManager")
	public String toManager() {
		return "supplier/archive/supplierArchiveList";
	}

	/**
	 * @Description: 到新增页面
	 * @return
	 * @author liwb
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "toAdd")
	public String toAdd() {
		return "supplier/archive/supplierArchiveAdd";
	}

	/**
	 * @Description: 到修改页面
	 * @return
	 * @author liwb
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "toEdit")
	public String toEdit() {
		return "supplier/archive/supplierArchiveEdit";
	}

	/**
	 * @Description: 机构供应商区域树形展示
	 * @return
	 * @author liwb
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "getBranchSupplierAreaToTree")
	@ResponseBody
	public String getBranchSupplierAreaToTree() {
		try {
			SupplierAreaVo vo = new SupplierAreaVo();
			vo.setBranchCompleCode(super.getCurrBranchCompleCode());

			// 机构供应商区域树形展示
			String tree = supplierAreaService.queryBranchSupplierAreaToTree(vo);
			return tree;
		} catch (Exception e) {
			LOG.error("查询机构供应商区域树形结构异常:", e);
		}
		return null;
	}

	/**
	 * @Description: 分页查询机构信息
	 * @param qo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author liwb
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "getSupplierList")
	@ResponseBody
	public PageUtils<Supplier> getSupplierList(SupplierQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			LOG.info("分页查询获取供应商条件参数:{}", qo);

			// 添加过滤条件
			String branchId = super.getCurrBranchId();
			Integer branchType = super.getCurrBranchType();
			qo.setBranchId(branchId);
			// 如果机构类型不是总部，分公司，则无查看权限
			if (!BranchTypeEnum.HEAD_QUARTERS.getCode().equals(branchType)
					&& !BranchTypeEnum.BRANCH_OFFICE.getCode().equals(branchType)) {
				LOG.error("当前机构无查看权限！机构Code：{}，机构类型：{}", getCurrBranchCode(), branchType);
				return PageUtils.emptyPage();
			}
			return supplierService.queryLists(qo);
		} catch (Exception e) {
			LOG.error("查询供应商异常:", e);
		}
		return PageUtils.emptyPage();
	}

}
