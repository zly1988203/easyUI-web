/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月20日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.supplier;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.enums.BalanceWayEnum;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.enums.SaleWayEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.supplier.entity.Supplier;
import com.okdeer.jxc.supplier.entity.SupplierArea;
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
 * 零售管理系统1.0.0	  2016年10月14日			 liwb			     供应商档案controller
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
	public String toAdd(Model model, SupplierQo qo) {
		LOG.debug("跳转新增供应商信息参数：{}", qo);
		//获取初始化参数
		initOpParams(model, qo);

		return "supplier/archive/supplierArchiveAdd";
	}

	/**
	 * @Description: 操作页面的默认参数
	 * @param model
	 * @param qo
	 * @author liwb
	 * @date 2016年10月15日
	 */
	private void initOpParams(Model model, SupplierQo qo) {
		SaleWayEnum[] saleWayEnums = SaleWayEnum.values();
		BalanceWayEnum[] balanceWayEnums = BalanceWayEnum.values();

		model.addAttribute("saleWayEnums", saleWayEnums);
		model.addAttribute("balanceWayEnums", balanceWayEnums);

		String branchId = qo.getBranchId();
		// 机构Id为空则默认为当前机构Id
		if (StringUtils.isBlank(branchId)) {
			branchId = super.getCurrBranchId();
		}
		List<SupplierArea> areaList = supplierAreaService
				.querySupplierListByBranchId(branchId);
		model.addAttribute("areaList", areaList);

		Branches branch = branchesService.getBranchInfoById(branchId);
		model.addAttribute("branch", branch);
	}

	/**
	 * @Description: 到修改页面
	 * @return
	 * @author liwb
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "toEdit")
	public String toEdit(Model model, SupplierQo qo) {
		LOG.debug("跳转修改供应商信息参数：{}", qo);
		//获取初始化参数
		initOpParams(model, qo);

		//获取初始化编辑页面参数
		initEditParams(model, qo);
		return "supplier/archive/supplierArchiveEdit";
	}

	/**
	 * @Description: 初始化编辑页面参数
	 * @param model
	 * @param qo
	 * @author liwb
	 * @date 2016年10月15日
	 */
	private void initEditParams(Model model, SupplierQo qo) {
		String id = qo.getId();
		Supplier supplier = supplierService.getById(id);
		SupplierExt supplierExt = supplierService.getSupplierExtById(id);
		// 将supplier 的信息复制到 supplierExt对象中
		BeanUtils.copyProperties(supplier, supplierExt);
		model.addAttribute("supplier", supplierExt);
	}
	
	/**
	 * @Description: 到复制页面
	 * @return
	 * @author liwb
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "toCopy")
	public String toCopy(Model model, SupplierQo qo) {
		LOG.debug("跳转复制供应商信息参数：{}", qo);
		
		//获取初始化参数
		initOpParams(model, qo);
		
		//获取初始化编辑页面参数
		initEditParams(model, qo);
		return "supplier/archive/supplierArchiveAdd";
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
	public PageUtils<Supplier> getSupplierList(
			SupplierQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			LOG.debug("分页查询供应商条件参数:{}", qo);

			// 添加过滤条件
			Integer branchType = super.getCurrBranchType();
			// 如果机构类型不是总部，分公司，则无查看权限
			if (!BranchTypeEnum.HEAD_QUARTERS.getCode().equals(branchType)
					&& !BranchTypeEnum.BRANCH_OFFICE.getCode().equals(
							branchType)) {
				LOG.error("当前机构无查看权限！机构Code：{}，机构类型：{}", getCurrBranchCode(),
						branchType);
				return PageUtils.emptyPage();
			}

			String branchId = qo.getBranchId();
			if (StringUtils.isNotBlank(branchId)) {
				Branches branch = branchesService.getBranchInfoById(branchId);
				qo.setBranchCompleCode(branch.getBranchCompleCode());
			} else {
				qo.setBranchCompleCode(super.getCurrBranchCompleCode());
			}
			qo.setBranchId(null);
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
	@RequestMapping(value = "/addSupplier", method = RequestMethod.POST)
	@ResponseBody
	public RespJson addSupplier(@Valid Supplier supplier,
			@Valid SupplierExt supplierExt, BindingResult validate) {
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

			// 封装Vo信息
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
	@RequestMapping(value = "/updateSupplier", method = RequestMethod.POST)
	@ResponseBody
	public RespJson updateSupplier(@Valid Supplier supplier,
			@Valid SupplierExt supplierExt, BindingResult validate) {
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

			// 封装Vo信息
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
	@RequestMapping(value = "/deleteSupplier", method = RequestMethod.POST)
	@ResponseBody
	public RespJson deleteSupplier(String supplierId) {
		RespJson respJson = RespJson.success();
		try {
			respJson = supplierService.deleteSupplier(supplierId,
					super.getCurrUserId());
		} catch (Exception e) {
			LOG.error("删除供应商异常：", e);
			respJson = RespJson.error("删除供应商异常：" + e.getMessage());
		}
		return respJson;
	}

	/**
	 * @Description: 导出
	 * @param qo
	 * @param response
	 * @return
	 * @author lijy02
	 * @date 2016年10月15日
	 */
	@RequestMapping(value = "exportHandel", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportHandel(SupplierQo qo, HttpServletResponse response) {
		try {
			qo.setPageSize(ExportExcelConstant.EXPORT_MAX_SIZE);
			qo.setPageNumber(0);
			// 添加过滤条件
			Integer branchType = super.getCurrBranchType();
			// 如果机构类型不是总部，分公司，则无查看权限
			if (!BranchTypeEnum.HEAD_QUARTERS.getCode().equals(branchType)
					&& !BranchTypeEnum.BRANCH_OFFICE.getCode().equals(
							branchType)) {
				LOG.error("当前机构无查看权限！机构Code：{}，机构类型：{}", getCurrBranchCode(),
						branchType);
				return RespJson.error("无数据可导");
			}
			String branchId = qo.getBranchId();
			if (StringUtils.isNotBlank(branchId)) {
				Branches branch = branchesService.getBranchInfoById(branchId);
				qo.setBranchCompleCode(branch.getBranchCompleCode());
			} else {
				qo.setBranchCompleCode(super.getCurrBranchCompleCode());
			}
			qo.setBranchId(null);
			List<Supplier> list = supplierService.getSupplierAll(qo);

			if (CollectionUtils.isNotEmpty(list)) {
				if (list.size() > ExportExcelConstant.EXPORT_MAX_SIZE) {
					RespJson json = RespJson.error("最多只能导出"
							+ ExportExcelConstant.EXPORT_MAX_SIZE + "条数据");
					return json;
				}
				// 导出文件名称，不包括后缀名
				String fileName = "供应商档案列表" + "_" + DateUtils.getCurrSmallStr();
				// 模板名称，包括后缀名
				String templateName = ExportExcelConstant.SUPPLIER_EXPORT_EXCEL;

				// 导出Excel
				exportPageForXLSX(response, list, fileName, templateName);
				return null;
			} else {
				RespJson json = RespJson.error("无数据可导");
				return json;
			}
		} catch (Exception e) {
			LOG.error("导出商品失败", e);
			RespJson json = RespJson.error(e.toString());
			return json;
		}
	}

}
