/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月20日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.supplier;

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.UUIDHexGenerator;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.supplier.entity.SupplierArea;
import com.okdeer.jxc.supplier.service.SupplierAreaServiceApi;
import com.okdeer.jxc.supplier.vo.SupplierAreaVo;
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
	
	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesService;

	/**
	 * @Description: 跳转供应商区域页面
	 * @return
	 * @author lijy02
	 * @date 2016年10月12日
	 */
	@RequestMapping(value = "views")
	public String views() {
		if (UserUtil.getCurrBranchType() == 0) {
			return "supplier/area/supplierAreaList";
		} else {
			return "supplier/area/supplierAreaListOther";
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
	public String toEdit(String id, Model model) {
		LOG.info("修改页面参数:{}", id);
		SupplierArea supplierArea = supplierAreaService
				.querySupplierAreaById(id);
		model.addAttribute("supplierArea", supplierArea);
		return "supplier/area/supplierAreaEdit";
	}

	/**
	 * @Description: 根据条件查询供应商区域
	 * @param CodeOrName 编号或者名称
	 * @return
	 * @author lijy02
	 * @date 2016年10月12日
	 */
	@RequestMapping(value = "getSupplierAreaList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<SupplierArea> getSupplierAreaList(
			SupplierAreaVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		vo.setPageNumber(pageNumber);
		vo.setPageSize(pageSize);
		if (StringUtils.isEmpty(vo.getBranchId())) {
			// 0 总部 如果不点击树不能查询区域 返回空集合
			// 其他根据当前登录机构查询
			if (UserUtil.getCurrBranchType() == 0) {
				return null;
			} else {
				vo.setBranchId(UserUtil.getCurrBranchId());
			}
		}
		LOG.info("供应商区域查询参数:{}", vo.toString());
		return supplierAreaService.queryLists(vo);
	}

	/**
	 * @Description: 新增供应商区域
	 * @return
	 * @author lijy02
	 * @date 2016年10月12日
	 */
	@RequestMapping(value = "addSupplierArea", method = RequestMethod.POST)
	@ResponseBody
	public RespJson addSupplierArea(SupplierArea area) {
		try {
			LOG.info("新增供应商区域:{}" + area.toString());
			String areaCode = area.getAreaCode();
			String areaName = area.getAreaName();
			// 判断区域代码，跟区域名称是不是唯一
			SupplierAreaVo supplierArea = new SupplierAreaVo();
			supplierArea.setAreaCode(areaCode);
			supplierArea.setBranchId(UserUtil.getCurrBranchId());
			List<SupplierArea> supplierAreaOne = supplierAreaService
					.querySupplierAreaByCode(supplierArea);
			if (CollectionUtils.isNotEmpty(supplierAreaOne)) {
				// 如果都不重复则新增
				RespJson rep = RespJson.error("区域编码重复！");
				return rep;
			}

			supplierArea.setAreaName(areaName);
			supplierArea.setBranchId(UserUtil.getCurrBranchId());
			List<SupplierArea> supplierAreaTwo = supplierAreaService
					.querySupplierAreaByName(supplierArea);
			if (CollectionUtils.isNotEmpty(supplierAreaTwo)) {
				RespJson rep = RespJson.error("区域名称重复！");
				return rep;
			}
			area.setAreaId(UUIDHexGenerator.generate());
			area.setBranchId(UserUtil.getCurrBranchId());
			area.setCreateUserId(UserUtil.getCurrUserId());
			supplierAreaService.addSupplierArea(area);
			return RespJson.success();
		} catch (Exception e) {
			return RespJson.error("新增供应商区域失败！");
		}
	}

	/**
	 * @Description: 根据区域编码删除供应商区域
	 * @param areaCode
	 * @return
	 * @author lijy02
	 * @date 2016年10月12日
	 */
	@RequestMapping(value = "deleteSupplierArea", method = RequestMethod.POST)
	@ResponseBody
	public RespJson deleteSupplierArea(String areaId) {
		try {
			LOG.info("根据区域编码删除供应商区域:{}", areaId);
			
			supplierAreaService.deleteSupplierArea(areaId,super.getCurrUserId());
			return RespJson.success();
		} catch (Exception e) {
			return RespJson.error("删除供应商区域失败！");
		}
	}

	/**
	 * @Description: 修改供应商区域
	 * @param vo  id areaCode areaName
	 * @return
	 * @author lijy02
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "updateSupplierArea", method = RequestMethod.POST)
	@ResponseBody
	public RespJson updateSupplierArea(SupplierArea area) {
		try {
			LOG.info("修改供应商区域参数:{}", area.toString());
			String areaName = area.getAreaName();
			// 判断区域代码，跟区域名称是不是唯一
			SupplierAreaVo supplierArea = new SupplierAreaVo();
			supplierArea.setAreaName(areaName);
			supplierArea.setBranchId(UserUtil.getCurrBranchId());
			List<SupplierArea> supplierAreaOne = supplierAreaService
					.querySupplierAreaByName(supplierArea);
			if (CollectionUtils.isNotEmpty(supplierAreaOne)) {
				RespJson rep = RespJson.error("区域名称重复！");
				return rep;
			}
			area.setUpdateUserId(UserUtil.getCurrUserId());
			supplierAreaService.updateSupplierArea(area);
			return RespJson.success();
		} catch (Exception e) {
			return RespJson.error("修改供应商区域失败！");
		}
	}

	/**
	 * @Description: 供应商公共组件树
	 * @return
	 * @author lijy02
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "supplierAreaTree")
	@ResponseBody
	public String supplierAreaTree() {
		try {
			return  branchesService.getBranchTree();
		} catch (Exception e) {
			LOG.debug("供应商公共组件树查询失败!");
		}
		return null;
	}
}
