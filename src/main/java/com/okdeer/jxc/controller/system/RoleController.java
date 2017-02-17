/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2016年7月20日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.system;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.system.entity.SysRole;
import com.okdeer.jxc.system.po.SysRolePo;
import com.okdeer.jxc.system.qo.SysRoleQo;
import com.okdeer.jxc.system.service.SysRoleService;
import com.okdeer.jxc.system.vo.SysRoleVo;

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
@RequestMapping("system/role")
public class RoleController extends BaseController<RoleController> {

	@Reference(version = "1.0.0", check = false)
	private SysRoleService sysRoleService;
	
	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesService;
	
	/**
	 * @Description: 角色列表页面
	 * @return
	 * @author liwb
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "toManager")
	public String toManager() {
		return "system/role/roleList";
	}
	
	/**
	 * @Description: 角色列表左边树形机构角色菜单
	 * @return
	 * @author liwb
	 * @date 2017年2月15日
	 */
	@RequestMapping(value = "/getBranchRoleToTree")
	@ResponseBody
	public String getBranchRoleToTree() {
		try {
			SysRoleVo roleVo = new SysRoleVo();
			roleVo.setBranchCompleCode(getCurrBranchCompleCode());
			roleVo.setBranchType(getCurrBranchType());
			roleVo.setBranchId(getCurrBranchId());
			// 机构供应商区域树形展示
			String tree = sysRoleService.getBranchRoleToTree(roleVo);
			return tree;
		} catch (Exception e) {
			LOG.error("查询机构供应商区域树形结构异常:", e);
		}
		return null;
	}
	
	@RequestMapping(value = "/getRoleList")
	@ResponseBody
	public PageUtils<SysRolePo> getRoleList(SysRoleQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		
		LOG.info("角色列表查询参数：{}", qo);
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			
			//用户未选择或输入机构，筛选当前登录机构及下属机构的所有用户
			if(StringUtils.isBlank(qo.getBranchCompleCode())){
				qo.setBranchCompleCode(getCurrBranchCompleCode());
			}
			
			// 获取机构类型
			int branchType = getCurrBranchType();

			// 如果不是总部，则要去除总部类型的数据
			if (!BranchTypeEnum.HEAD_QUARTERS.getCode().equals(branchType)) {
				List<Integer> branchTypeFilters = new ArrayList<Integer>();
				branchTypeFilters.add(BranchTypeEnum.HEAD_QUARTERS.getCode());
				qo.setBranchTypeFilters(branchTypeFilters);
			}
			
			// 结束日期加一天
			if (qo.getEndTime() != null) {
				qo.setEndTime(DateUtils.getDayAfter(qo.getEndTime()));
			}
			
			qo.setBranchType(null);

			return sysRoleService.queryRoleListByPage(qo);
		} catch (Exception e) {
			LOG.error("查询角色信息异常:", e);
		}
		return PageUtils.emptyPage();
	}
	
	/**
	 * @Description: 到新增角色页面
	 * @return
	 * @author liwb
	 * @date 2017年2月16日
	 */
	@RequestMapping(value = "toAddRole")
	public String toAddRole(Model model) {
		
		List<BranchTypeEnum> typeList = buildCurrTypeList();
		
		model.addAttribute("typeList", typeList);
		
		return "system/role/roleAdd";
	}

	/**
	 * @Description: 构建当前机构类型权限列表
	 * @return
	 * @author liwb
	 * @date 2017年2月16日
	 */
	private List<BranchTypeEnum> buildCurrTypeList() {
		List<BranchTypeEnum> typeList = new ArrayList<BranchTypeEnum>();
		Integer branchType = getCurrBranchType();
		
		//总部有所有类型权限
		if(BranchTypeEnum.HEAD_QUARTERS.getCode().equals(branchType)){
			typeList = Arrays.asList(BranchTypeEnum.values());
		}
		
		//分公司有除总部以外的所有权限
		else if(BranchTypeEnum.BRANCH_OFFICE.getCode().equals(branchType)){
			for(BranchTypeEnum type : BranchTypeEnum.values()){
				if(!BranchTypeEnum.HEAD_QUARTERS.equals(type)){
					typeList.add(type);
				}
			}
		}
		
		//其它只有当前类型的权限
		else{
			BranchTypeEnum currType = BranchTypeEnum.enumValueOf(branchType);
			typeList.add(currType);
		}
		return typeList;
	}
	
	/**
	 * @Description: 到修改角色页面
	 * @param roleId
	 * @param model
	 * @return
	 * @author liwb
	 * @date 2017年2月16日
	 */
	@RequestMapping(value = "toUpdateRole")
	public String toUpdateRole(String roleId, Model model) {
		
		SysRole role = sysRoleService.getRoleById(roleId);
		
		List<BranchTypeEnum> typeList = buildCurrTypeList();
		
		model.addAttribute("typeList", typeList);
		model.addAttribute("role", role);
		
		if(StringUtils.isNotBlank(role.getBranchId())){
			Branches branch = branchesService.getBranchInfoById(role.getBranchId());
			model.addAttribute("branch", branch);
		}
		
		return "system/role/roleEdit";
	}
	
	
	
	@RequestMapping(value = "toProduceAuth")
	public String toProduceAuth(String roleId, Model model) {
		
		
		return "system/role/produceAuth";
	}
	
	/**
	 * @Description: 新增角色信息
	 * @param role
	 * @return
	 * @author liwb
	 * @date 2017年2月15日
	 */
	@RequestMapping(value = "/addRole")
	@ResponseBody
	public RespJson addRole(SysRoleVo roleVo) {
		LOG.info("新增角色信息：{}", roleVo);
		RespJson respJson = RespJson.success();
		try {
			// 设置创建者Id
			roleVo.setCreateUserId(getCurrUserId());

			// 新增角色信息
			respJson = sysRoleService.addRole(roleVo);
		} catch (Exception e) {
			LOG.error("新增角色异常：", e);
			respJson = RespJson.error("新增角色异常!");
		}
		return respJson;
	}
	
	/**
	 * @Description: 修改角色信息
	 * @param role
	 * @return
	 * @author liwb
	 * @date 2017年2月15日
	 */
	@RequestMapping(value = "/updateRole")
	@ResponseBody
	public RespJson updateRole(SysRoleVo roleVo) {
		LOG.info("修改角色信息：{}", roleVo);
		RespJson respJson = RespJson.success();
		try {
			// 设置修改者Id
			roleVo.setUpdateUserId(getCurrUserId());
			
			// 修改角色信息
			respJson = sysRoleService.updateRole(roleVo);
		} catch (Exception e) {
			LOG.error("修改角色异常：", e);
			respJson = RespJson.error("修改角色异常!");
		}
		return respJson;
	}
	
	/**
	 * @Description: 删除角色信息
	 * @param roleId
	 * @return
	 * @author liwb
	 * @date 2017年2月15日
	 */
	@RequestMapping(value = "/deleteRole")
	@ResponseBody
	public RespJson deleteRole(String roleId) {
		LOG.info("删除角色Id：{}", roleId);
		RespJson respJson = RespJson.success();
		try {
			// 删除角色信息
			respJson = sysRoleService.deleteRole(roleId, getCurrUserId());
		} catch (Exception e) {
			LOG.error("删除角色异常：", e);
			respJson = RespJson.error("删除角色异常!");
		}
		return respJson;
	}
	

}
