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
import com.google.gson.JsonArray;
import com.okdeer.ca.api.sysrole.entity.SysMenuOperDto;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.constant.SysConstant;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.help.SysHelper;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.entity.Tree;
import com.okdeer.jxc.common.utils.gson.GsonUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.system.entity.SysRole;
import com.okdeer.jxc.system.po.SysRolePo;
import com.okdeer.jxc.system.qo.SysRoleQo;
import com.okdeer.jxc.system.service.SysRoleService;
import com.okdeer.jxc.system.vo.RoleAuthVo;
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
			int branchType = getCurrBranchType();
			String currBranchCompleCode = getCurrBranchCompleCode();
			roleVo.setBranchCompleCode(currBranchCompleCode);
			roleVo.setBranchType(branchType);
			roleVo.setBranchId(getCurrBranchId());
			// 如果是物流中心或者店铺，则需要获取到分公司的branchCompleCode
			if (branchType > 1) {
				String parentCompleCode = currBranchCompleCode.substring(0, currBranchCompleCode.length() - 5);
				roleVo.setParentCompleCode(parentCompleCode);
			}
			
			// 机构供应商区域树形展示
			List<Tree> trees = sysRoleService.getBranchRoleToTree(roleVo);
			String treeStr = GsonUtils.toJson(trees);
			return treeStr;
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

			//构建查询参数
			buildQueryParams(qo);

			return sysRoleService.queryRoleListByPage(qo);
		} catch (Exception e) {
			LOG.error("查询角色信息异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 构建查询参数
	 * @param qo
	 * @author liwb
	 * @date 2017年2月25日
	 */
	private void buildQueryParams(SysRoleQo qo) {
		String currBranchCompleCode = getCurrBranchCompleCode();

		// 用户未选择或输入机构，筛选当前登录机构及下属机构的所有用户
		if (StringUtils.isBlank(qo.getBranchCompleCode())) {
			qo.setBranchCompleCode(currBranchCompleCode);
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
		qo.setBranchTypeFilt(branchType);

		// 如果是物流中心或者店铺，则需要获取到分公司的branchCompleCode
		if (branchType > BranchTypeEnum.BRANCH_OFFICE.getCode()) {
			String parentCompleCode = currBranchCompleCode.substring(0, currBranchCompleCode.length() - 5);
			qo.setParentCompleCode(parentCompleCode);
		}
		
		//如果当前机构是总部，并且传递的机构完整编码不是总部，则过滤公共角色
		if(branchType == BranchTypeEnum.HEAD_QUARTERS.getCode() && 
				!SysConstant.MANAGER_BRANCH_CODE.equals(qo.getBranchCompleCode())){
			qo.setFilterCommon(1);
		}
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

		// 总部有所有类型权限
		if (BranchTypeEnum.HEAD_QUARTERS.getCode().equals(branchType)) {
			typeList = Arrays.asList(BranchTypeEnum.values());
		}

		// 分公司有除总部以外的所有权限
		else if (BranchTypeEnum.BRANCH_OFFICE.getCode().equals(branchType)) {
			for (BranchTypeEnum type : BranchTypeEnum.values()) {
				if (!BranchTypeEnum.HEAD_QUARTERS.equals(type)) {
					typeList.add(type);
				}
			}
		}

		// 其它只有当前类型的权限
		else {
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

		if (StringUtils.isNotBlank(role.getBranchId())) {
			Branches branch = branchesService.getBranchInfoById(role.getBranchId());
			model.addAttribute("branch", branch);
		}

		return "system/role/roleEdit";
	}

	/**
	 * @Description: 跳转到分配角色页面
	 * @param roleId
	 * @param model
	 * @return
	 * @author liwb
	 * @date 2017年2月17日
	 */
	@RequestMapping(value = "toProduceAuth")
	public String toProduceAuth(String roleId, Model model) {
		try {
			SysRole role = sysRoleService.getRoleById(roleId);
			List<RoleAuthVo> authList = sysRoleService.buildRoleAuth(roleId, getCurrUserId());
			model.addAttribute("role", role);
			model.addAttribute("authList", authList);
		} catch (Exception e) {
			LOG.error("获取数据异常", e);
		}

		return "system/role/produceAuth";
	}

	/**
	 * @Description: 分配权限保存功能
	 * @param roleId
	 * @param data
	 * @return
	 * @author liwb
	 * @date 2017年2月17日
	 */
	@RequestMapping(value = "produceRoleAuth")
	@ResponseBody
	public RespJson produceRoleAuth(String roleId, String branchId, String data) {
		LOG.info("保存角色权限，角色Id{}, 权限数据{}", roleId, GsonUtils.toJson(data));
		RespJson respJson = RespJson.success();
		try {
			if (StringUtils.isBlank(data)) {
				return RespJson.error("数据异常!");
			}

			// 如果是系统初始化管理员，则只允许 总部管理员修改
			if (SysHelper.isInitialRole(roleId) && !SysHelper.isSuperAdmin(getCurrUserId())) {
				return RespJson.businessError("系统初始化管理员不允许修改！");
			}

			if (StringUtils.isNotBlank(branchId) && !SysConstant.MANAGER_BRANCH_ID.equals(getCurrBranchId())
					&& !branchId.equals(getCurrBranchId())) {
				return RespJson.businessError("只允许修改本机构下的角色信息！");
			}
			
			//通用角色只有总部可以维护
			if(StringUtils.isBlank(branchId) && !SysConstant.MANAGER_BRANCH_ID.equals(getCurrBranchId())){
				return RespJson.businessError("通用角色只有总部可以维护！");
			}

			// 转换为JSON数据
			JsonArray jArray = GsonUtils.parseJsonArray(data);

			// 构建菜单操作数据列表
			List<SysMenuOperDto> menuOpList = buildMenuOpList(jArray);

			// 修改角色权限
			respJson = sysRoleService.produceRoleAuth(roleId, getCurrUserId(), menuOpList);
		} catch (Exception e) {
			LOG.error("保存角色权限异常：", e);
			respJson = RespJson.error("保存角色权限异常!");
		}
		return respJson;
	}

	private List<SysMenuOperDto> buildMenuOpList(JsonArray jArray) {

		// 如果是空数据
		if (jArray == null || jArray.size() == 0) {
			return new ArrayList<SysMenuOperDto>();
		}

		List<SysMenuOperDto> menuOpList = GsonUtils.fromJsonList(jArray, SysMenuOperDto.class);

		return menuOpList;
	}

	/**
	 * @Description: 新增角色信息
	 * @param role
	 * @return
	 * @author liwb
	 * @date 2017年2月15日
	 */
	@RequestMapping(value = "addRole")
	@ResponseBody
	public RespJson addRole(SysRoleVo roleVo) {
		LOG.info("新增角色信息：{}", roleVo);
		RespJson respJson = RespJson.success();
		try {
			// 设置创建者Id
			roleVo.setCreateUserId(getCurrUserId());
			
			// 如果是空字符串，则设置为null
			if(StringUtils.isBlank(roleVo.getBranchId())){
				roleVo.setBranchId(null);
			}

			// 如果是总部，默认为总部机构
			if (BranchTypeEnum.HEAD_QUARTERS.getCode().equals(roleVo.getBranchType())) {
				roleVo.setBranchId(SysConstant.MANAGER_BRANCH_ID);
			}

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
	@RequestMapping(value = "updateRole")
	@ResponseBody
	public RespJson updateRole(SysRoleVo roleVo) {
		LOG.info("修改角色信息：{}", roleVo);
		RespJson respJson = RespJson.success();
		try {
			// 设置修改者Id
			roleVo.setUpdateUserId(getCurrUserId());

			roleVo.setCurrBranchId(getCurrBranchId());

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
	@RequestMapping(value = "deleteRole")
	@ResponseBody
	public RespJson deleteRole(String roleId) {
		LOG.info("删除角色Id：{}", roleId);
		RespJson respJson = RespJson.success();
		try {
			
			// 删除角色信息
			respJson = sysRoleService.deleteRole(roleId, getCurrBranchId());
		} catch (Exception e) {
			LOG.error("删除角色异常：", e);
			respJson = RespJson.error("删除角色异常!");
		}
		return respJson;
	}

}
