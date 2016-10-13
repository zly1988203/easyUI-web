
package com.okdeer.jxc.controller.system;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.system.qo.SysUserQo;
import com.okdeer.jxc.system.service.SysUserServiceApi;
import com.okdeer.jxc.system.vo.SysUserVo;

/**
 * ClassName: UserController 
 * @Description: 用户Controller
 * @author liwb
 * @date 2016年8月18日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 商业管理系统1.0.0	  2016年8月18日			 liwb			    用户Controller
 */

@Controller
@RequestMapping("system/user")
public class UserController extends BaseController<UserController> {

	@Reference(version = "1.0.0", check = false)
	private SysUserServiceApi sysUserService;

	/**
	 * 默认页面
	 */
	@RequestMapping(method = RequestMethod.GET)
	public String list() {
		return "system/userList";
	}

	/**
	 * @Description: 获取用户json
	 * @param qo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author liwb
	 * @date 2016年8月20日
	 */
	@RequestMapping(value = "/json")
	@ResponseBody
	public PageUtils<SysUser> getData(SysUserQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);

			// 构建初始化参数
			qo = buildDefaultParams(qo);

			return sysUserService.queryLists(qo);
		} catch (Exception e) {
			LOG.error("查询用户信息异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 公共选择采购员,区域，机构页面， 区域有选择的checkBranch
	 * @return   
	 * @author zhangchm lijy02
	 * @date 2016年7月21日 2016年8月18日
	 */
	@RequestMapping(value = "views")
	public String views(String type, String check, Model model) {
		if (StringUtils.isNotEmpty(check)) {
			model.addAttribute("check", check);
		}
		model.addAttribute("type", type);
		return "component/publicOperator";
	}

	/**
	 * @Description: 根据登录用户关联店铺查询该店铺下所有人员
	 * @param qo
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @author zhangchm
	 * @date 2016年7月28日
	 */
	@RequestMapping(value = "getOperator")
	@ResponseBody
	public PageUtils<SysUser> getOperator(SysUserQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.debug("获取操作员查询参数:{}", qo);
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			qo.setBranchId(super.getCurrBranchId());
			return sysUserService.queryLists(qo);
		} catch (Exception e) {
			LOG.error("查询操作员异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 到新增用户界面
	 * @return
	 * @author liwb
	 * @date 2016年10月12日
	 */
	@RequestMapping(value = "/toAddUser")
	public String toAddUser() {

		return "system/userAdd";
	}

	/**
	 * @Description: 到修改用户界面
	 * @return
	 * @author liwb
	 * @date 2016年10月12日
	 */
	@RequestMapping(value = "/toEditUser")
	public String toEditUser() {

		return "system/userEdit";
	}

	/**
	 * @Description: 新增用户
	 * @param userVo
	 * @return
	 * @author liwb
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "/addUser")
	public RespJson addUser(SysUserVo userVo) {
		LOG.info("新增用户信息{}", userVo);
		RespJson respJson = RespJson.success();
		try {
			// 设置创建者Id
			userVo.setCreateUserId(super.getCurrUserId());

			// 新增用户信息
			respJson = sysUserService.addUser(userVo);
		} catch (Exception e) {
			LOG.error("新增用户异常：", e);
			respJson = RespJson.error("新增用户异常：" + e.getMessage());
		}
		return respJson;
	}

	/**
	 * @Description: 修改用户
	 * @param userVo
	 * @return
	 * @author liwb
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "/updateUser")
	public RespJson updateUser(SysUserVo userVo) {
		LOG.info("修改用户信息{}", userVo);
		RespJson respJson = RespJson.success();
		try {
			// 设置操作者Id
			userVo.setUpdateUserId(super.getCurrUserId());

			// 修改用户信息
			respJson = sysUserService.updateUser(userVo);
		} catch (Exception e) {
			LOG.error("修改用户异常：", e);
			respJson = RespJson.error("修改用户异常：" + e.getMessage());
		}
		return respJson;
	}
	
	/**
	 * @Description: 删除用户信息
	 * @param userId
	 * @return
	 * @author liwb
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "/deleteUser")
	public RespJson deleteUser(String userId) {
		LOG.info("删除用户信息，userId{}", userId);
		RespJson respJson = RespJson.success();
		try {
			
			// 新增用户信息
			respJson = sysUserService.deleteUser(userId, getCurrUserId());
		} catch (Exception e) {
			LOG.error("删除用户异常：", e);
			respJson = RespJson.error("删除用户异常：" + e.getMessage());
		}
		return respJson;
	}
	
	/**
	 * @Description: 启用
	 * @param userId
	 * @return
	 * @author liwb
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "/enableUser")
	public RespJson enableUser(String userId) {
		LOG.info("启用用户，userId{}", userId);
		RespJson respJson = RespJson.success();
		try {
			
			// 新增用户信息
			respJson = sysUserService.enableUser(userId, getCurrUserId());
		} catch (Exception e) {
			LOG.error("启用用户异常：", e);
			respJson = RespJson.error("启用用户异常：" + e.getMessage());
		}
		return respJson;
	}
	
	/**
	 * @Description: 禁用
	 * @param userId
	 * @return
	 * @author liwb
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "/disableUser")
	public RespJson disableUser(String userId) {
		LOG.info("禁用用户，userId{}", userId);
		RespJson respJson = RespJson.success();
		try {
			
			// 新增用户信息
			respJson = sysUserService.disableUser(userId, getCurrUserId());
		} catch (Exception e) {
			LOG.error("禁用用户异常：", e);
			respJson = RespJson.error("禁用用户异常：" + e.getMessage());
		}
		return respJson;
	}

	/**
	 * @Description: 初始化默认参数
	 * @param qo
	 * @author liwb
	 * @date 2016年9月23日
	 */
	private SysUserQo buildDefaultParams(SysUserQo qo) {

		// 如果没有修改所选机构等信息，则去掉该参数
		String branchNameOrCode = qo.getBranchNameOrCode();
		if (StringUtils.isNotBlank(branchNameOrCode) && branchNameOrCode.contains("[")
				&& branchNameOrCode.contains("]")) {
			qo.setBranchNameOrCode(null);
		}

		// 默认当前机构
		if (StringUtils.isBlank(qo.getBranchCode()) && StringUtils.isBlank(qo.getBranchNameOrCode())) {
			qo.setBranchCompleCode(getCurrBranchCompleCode());
		}

		return qo;
	}

}