/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2016年7月20日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.system;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.system.entity.SysRole;
import com.okdeer.jxc.system.qo.SysRoleQo;
import com.okdeer.jxc.system.service.SysRoleService;

/**
 * ClassName: RoleController 
 * @Description: 角色Controller
 * @author liwb
 * @date 2016年10月12日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 零售管理系统1.0.0	  2016年10月12日			 liwb			    角色Controller
 */

@Controller
@RequestMapping("role/common")
public class RoleCommonController extends BaseController<RoleCommonController> {

	@Reference(version = "1.0.0", check = false)
	private SysRoleService sysRoleService;
	
	@RequestMapping(value = "toRoleList")
	public String toRoleListComponent() {
		return "component/publicRoleList";
	}

	@RequestMapping(value = "getRoleComponentList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<SysRole> getRoleComponentList(SysRoleQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			if (StringUtils.isBlank(qo.getBranchCompleCode())) {
				qo.setBranchCompleCode(super.getCurrBranchCompleCode());
			}

			// 获取机构类型
			int branchType = qo.getBranchType();

			// 如果不是总部，则要去除总部类型的数据
			if (!BranchTypeEnum.HEAD_QUARTERS.getCode().equals(branchType)) {
				List<Integer> branchTypeFilters = new ArrayList<Integer>();
				branchTypeFilters.add(BranchTypeEnum.HEAD_QUARTERS.getCode());
				qo.setBranchTypeFilters(branchTypeFilters);
			}
			
			qo.setBranchType(null);

			// 如果是物流中心或者店铺，则获取父机构（分公司）的角色信息
			if (BranchTypeEnum.LOGISTICS_CENTER.getCode().equals(branchType)
					|| BranchTypeEnum.isStore(branchType)) {

				// 获取父类机构（分公司）的完整编码
				StringBuffer branchCompleCode = new StringBuffer(qo.getBranchCompleCode());
				String parentCompleCode = branchCompleCode.substring(0, 9);

				// 查询其父类机构（分公司）的角色信息
				qo.setBranchCompleCode(parentCompleCode);// 机构CompleCode为父类机构CompleCode
			}

			LOG.info("角色列表查询参数:{}", qo);
			return sysRoleService.queryRoleList(qo);
		} catch (Exception e) {
			LOG.error("查询机构异常:", e);
		}
		return PageUtils.emptyPage();
	}
	
}
