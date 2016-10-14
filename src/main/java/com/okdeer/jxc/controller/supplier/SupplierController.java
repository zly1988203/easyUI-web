/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月20日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.supplier;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.enums.BalanceWayEnum;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.enums.SaleWayEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.supplier.entity.Supplier;
import com.okdeer.jxc.supplier.entity.SupplierExt;
import com.okdeer.jxc.supplier.qo.SupplierQo;
import com.okdeer.jxc.supplier.service.SupplierAreaServiceApi;
import com.okdeer.jxc.supplier.service.SupplierServiceApi;
import com.okdeer.jxc.supplier.vo.SupplierAreaVo;
import com.okdeer.jxc.supplier.vo.SupplierVo;

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
@RequestMapping("supplier")
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
	public String toAdd(Model model) {
		SaleWayEnum[] saleWayEnums = SaleWayEnum.values();
		BalanceWayEnum[] balanceWayEnums = BalanceWayEnum.values();
		
		model.addAttribute("saleWayEnums", saleWayEnums);
		model.addAttribute("balanceWayEnums", balanceWayEnums);
		
		return "supplier/archive/supplierArchiveAdd";
	}

	/**
	 * @Description: 到修改页面
	 * @return
	 * @author liwb
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "toEdit")
	public String toEdit(Model model) {
		SaleWayEnum[] saleWayEnums = SaleWayEnum.values();
		BalanceWayEnum[] balanceWayEnums = BalanceWayEnum.values();
		
		model.addAttribute("saleWayEnums", saleWayEnums);
		model.addAttribute("balanceWayEnums", balanceWayEnums);
		
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

	
	/**
	 * @Description: 新增供应商信息
	 * @param supplier
	 * @param supplierExt
	 * @param validate
	 * @return
	 * @author liwb
	 * @date 2016年10月14日
	 */
	@RequestMapping(value = "/addSupplier")
	@ResponseBody
	public RespJson addSupplier(@Valid Supplier supplier, @Valid SupplierExt supplierExt,
			BindingResult validate) {
		if (validate.hasErrors()) {
			String errorMessage = validate.getFieldError().getDefaultMessage();
			LOG.warn("validate errorMessage:{}", errorMessage);
			return RespJson.error(errorMessage);
		}
		LOG.info("新增供应商信息{}，扩展信息{}", supplier, supplierExt);
		RespJson respJson = RespJson.success();
		try {
			// 设置创建者Id
			supplier.setCreateUserId(super.getCurrUserId());

			//封装Vo信息
			SupplierVo supplierVo = new SupplierVo();
			supplierVo.setSupplier(supplier);
			supplierVo.setSupplierExt(supplierExt);
			
			// 新增供应商信息
			respJson = supplierService.addSupplier(supplierVo);
		} catch (Exception e) {
			LOG.error("新增供应商异常：", e);
			respJson = RespJson.error("新增供应商异常：" + e.getMessage());
		}
		return respJson;
	}
	
	/**
	 * @Description: 修改供应商信息
	 * @param supplier
	 * @param supplierExt
	 * @param validate
	 * @return
	 * @author liwb
	 * @date 2016年10月14日
	 */
	@RequestMapping(value = "/updateSupplier")
	@ResponseBody
	public RespJson updateSupplier(@Valid Supplier supplier, @Valid SupplierExt supplierExt,
			BindingResult validate) {
		if (validate.hasErrors()) {
			String errorMessage = validate.getFieldError().getDefaultMessage();
			LOG.warn("validate errorMessage:{}", errorMessage);
			return RespJson.error(errorMessage);
		}
		LOG.info("修改供应商信息{}，扩展信息{}", supplier, supplierExt);
		RespJson respJson = RespJson.success();
		try {
			// 设置创建者Id
			supplier.setUpdateUserId(super.getCurrUserId());
			
			//封装Vo信息
			SupplierVo supplierVo = new SupplierVo();
			supplierVo.setSupplier(supplier);
			supplierVo.setSupplierExt(supplierExt);
			
			// 新增供应商信息
			respJson = supplierService.updateSupplier(supplierVo);
		} catch (Exception e) {
			LOG.error("修改供应商异常：", e);
			respJson = RespJson.error("修改供应商异常：" + e.getMessage());
		}
		return respJson;
	}
	
	/**
	 * @Description: 删除供应商信息
	 * @param supplierId
	 * @return
	 * @author liwb
	 * @date 2016年10月14日
	 */
	@RequestMapping(value = "/deleteSupplier")
	@ResponseBody
	public RespJson deleteSupplier(String supplierId) {
		RespJson respJson = RespJson.success();
		try {
			respJson = supplierService.deleteSupplier(supplierId, super.getCurrUserId());
		} catch (Exception e) {
			LOG.error("删除供应商异常：", e);
			respJson = RespJson.error("删除供应商异常：" + e.getMessage());
		}
		return respJson;
	}
	
}
