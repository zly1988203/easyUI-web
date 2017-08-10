/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月20日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report.logistics;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.supplier.po.SupplierPo;
import com.okdeer.jxc.supplier.qo.SupplierQo;
import com.okdeer.jxc.supplier.service.SupplierAreaServiceApi;
import com.okdeer.jxc.supplier.service.SupplierServiceApi;
import com.okdeer.jxc.supplier.vo.SupplierAreaVo;

/**
 * 
 * ClassName: LogisticsSupplierController 
 * @Description: 物流供应商档案controller
 * @author zhangchm
 * @date 2017年8月8日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@Controller
@RequestMapping("logisticsSupplier")
public class LogisticsSupplierController extends BaseController<LogisticsSupplierController> {

	@Reference(version = "1.0.0", check = false)
	private SupplierAreaServiceApi supplierAreaService;

	@Reference(version = "1.0.0", check = false)
	private SupplierServiceApi supplierService;

	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesService;

	/**
	 * @Description: 到管理列表页面
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月8日
	 */
	@RequestMapping(value = "toManager")
	public String toManager() {
		return "logistics/supplierArchiveList";
	}

	/**
	 * @Description: 机构供应商区域树形展示
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月8日
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
	 * @Description: 查询机构信息
	 * @param qo
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @return PageUtils<SupplierPo>  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月8日
	 */
	@RequestMapping(value = "getSupplierList")
	@ResponseBody
	public PageUtils<SupplierPo> getSupplierList(SupplierQo qo,
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
					&& !BranchTypeEnum.BRANCH_OFFICE.getCode().equals(branchType)) {
				LOG.error("当前机构无查看权限！机构Code：{}，机构类型：{}", getCurrBranchCode(), branchType);
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
	 * @Description: 导出
	 * @param qo
	 * @param response
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author zhangchm
	 * @date 2017年8月8日
	 */
	@RequestMapping(value = "exportHandel", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportHandel(SupplierQo qo, HttpServletResponse response) {
		try {
			// 添加过滤条件
			Integer branchType = super.getCurrBranchType();
			// 如果机构类型不是总部，分公司，则无查看权限
			if (!BranchTypeEnum.HEAD_QUARTERS.getCode().equals(branchType)
					&& !BranchTypeEnum.BRANCH_OFFICE.getCode().equals(branchType)) {
				LOG.error("当前机构无查看权限！机构Code：{}，机构类型：{}", getCurrBranchCode(), branchType);
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
			List<SupplierPo> list = supplierService.getSupplierAll(qo);

			if (CollectionUtils.isNotEmpty(list)) {
				if (list.size() > ExportExcelConstant.EXPORT_MAX_SIZE) {
					RespJson json = RespJson.error("最多只能导出" + ExportExcelConstant.EXPORT_MAX_SIZE + "条数据");
					return json;
				}
				// 导出文件名称，不包括后缀名
				String fileName = "GYS" + "_" + DateUtils.formatDate(DateUtils.getCurrDate(), DateUtils.DATE_KEY_STR);
				// 模板名称，包括后缀名
				String templateName = ExportExcelConstant.SUPPLIER_LOGISTICS_EXPORT_EXCEL;

				// 导出Excel
				exportListForXLSX(response, list, fileName, templateName);
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
