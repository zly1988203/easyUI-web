
package com.okdeer.jxc.controller.system;

import java.math.BigDecimal;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.common.enums.PriceGrantEnum;
import com.okdeer.jxc.common.exception.BusinessException;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.system.entity.SysRole;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.system.qo.SysUserQo;
import com.okdeer.jxc.system.qo.UserListQo;
import com.okdeer.jxc.system.service.SysRoleService;
import com.okdeer.jxc.system.service.SysUserServiceApi;
import com.okdeer.jxc.system.vo.SysUserVo;
import com.okdeer.jxc.system.vo.UserListVo;
import com.okdeer.jxc.utils.UserUtil;

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

	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchService;

	@Reference(version = "1.0.0", check = false)
	private SysRoleService roleService;

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
	public PageUtils<UserListVo> getData(UserListQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);

			// 用户未选择或输入机构，筛选当前登录机构及下属机构的所有用户
			if (StringUtils.isBlank(qo.getBranchKeyword())) {
				String branchCompleCode = getCurrBranchCompleCode();
				qo.setBranchCompleCode(branchCompleCode);
			}

			return sysUserService.queryUserList(qo);
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
	public String views(String type, String check, String isOpenStock, String formType, Model model) {
		if (StringUtils.isNotEmpty(check)) {
			model.addAttribute("check", check);
		}
		model.addAttribute("type", type);
		model.addAttribute("isOpenStock", isOpenStock);
		model.addAttribute("formType", formType);
		return "component/publicOperator";
	}

	/**
	 * @Description: 礼品兑换机构选择
	 * @return   
	 * @author zhangchm zhongy
	 * @date 2017年1月11日
	 */
	@RequestMapping(value = "publicBranchChoose")
	public String publicBranchChoose(String type, String check, Model model) {
		if (StringUtils.isNotEmpty(check)) {
			model.addAttribute("check", check);
		}
		model.addAttribute("type", type);
		// 机构类型(0.总部、1.分公司、2.物流中心、3.自营店、4.加盟店B、5.加盟店C
		model.addAttribute("branchType", UserUtil.getCurrBranchType());
		return "component/publicBranchChoose";
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
			/* qo.setBranchId(super.getCurrBranchId()); */
			qo.setBranchCompleCode(super.getCurrBranchCompleCode());
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
	public String toEditUser(String userId, Model model) {

		SysUser user = sysUserService.getUserById(userId);
		// 最大折扣比率，需乘以100
		if (null != user.getMaxDiscountRadio()) {
			BigDecimal maxDiscountRadio = user.getMaxDiscountRadio().multiply(
					new BigDecimal(Constant.STRING_ONE_HUNDRED));
			user.setMaxDiscountRadio(maxDiscountRadio);
		}
		Branches branch = branchService.getBranchInfoById(user.getBranchId());
		SysRole role = roleService.getRoleByUserId(userId);

		model.addAttribute("user", user);
		model.addAttribute("branch", branch);
		model.addAttribute("role", role);
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
	@ResponseBody
	public RespJson addUser(SysUserVo userVo) {
		LOG.debug("新增用户信息{}", userVo);
		RespJson respJson = RespJson.success();
		try {
			// 设置创建者Id
			userVo.setCreateUserId(super.getCurrUserId());

			// 价格权限赋值
			userVo.setPriceGrant(buildPriceGrants(userVo.getPriceGrantStr()));

			// 新增用户信息
			respJson = sysUserService.addUser(userVo);
		} catch (Exception e) {
			LOG.error("新增用户异常：", e);
			respJson = RespJson.error("新增用户异常!");
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
	@ResponseBody
	public RespJson updateUser(SysUserVo userVo) {
		LOG.debug("修改用户信息{}", userVo);
		RespJson respJson = RespJson.success();
		try {
			// 设置操作者Id
			userVo.setUpdateUserId(super.getCurrUserId());

			// 价格权限赋值
			userVo.setPriceGrant(buildPriceGrants(userVo.getPriceGrantStr()));

			// 修改用户信息
			respJson = sysUserService.updateUser(userVo);
		} catch (BusinessException e) {
			LOG.error("修改用户异常：", e);
			respJson = RespJson.error(e.getMessage());
		} catch (Exception e) {
			LOG.error("修改用户异常：", e);
			respJson = RespJson.error("修改用户异常!");
		}
		return respJson;
	}

	/**
	 * @Description: 构建价格权限
	 * @param priceGrantStr
	 * @author liwb
	 * @date 2017年5月31日
	 */
	private String buildPriceGrants(String priceGrantStr) {
		String priceGrant = null;

		// 价格权限
		if (StringUtils.isNotBlank(priceGrantStr)) {

			// 默认加上零售价、会员价 权限
			priceGrant = PriceGrantEnum.SALE_PRICE.getValue() + "," + PriceGrantEnum.VIP_PRICE.getValue() + ","
					+ priceGrantStr;
		}
		return priceGrant;
	}

	/**
	 * @Description: 删除用户信息
	 * @param userId
	 * @return
	 * @author liwb
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "/deleteUser", method = RequestMethod.POST)
	@ResponseBody
	public RespJson deleteUser(String userId) {
		LOG.info("删除用户信息，userId{}", userId);
		RespJson respJson = RespJson.success();
		try {

			// 新增用户信息
			respJson = sysUserService.deleteUser(userId, getCurrUserId());
		} catch (Exception e) {
			LOG.error("删除用户异常：", e);
			respJson = RespJson.error("删除用户异常!");
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
	@RequestMapping(value = "/enableUser", method = RequestMethod.POST)
	@ResponseBody
	public RespJson enableUser(String userId) {
		LOG.debug("启用用户，userId{}", userId);
		RespJson respJson = RespJson.success();
		try {

			// 新增用户信息
			respJson = sysUserService.enableUser(userId, getCurrUserId());
		} catch (Exception e) {
			LOG.error("启用用户异常：", e);
			respJson = RespJson.error("启用用户异常!");
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
	@RequestMapping(value = "/disableUser", method = RequestMethod.POST)
	@ResponseBody
	public RespJson disableUser(String userId) {
		LOG.debug("禁用用户，userId{}", userId);
		RespJson respJson = RespJson.success();
		try {

			// 新增用户信息
			respJson = sysUserService.disableUser(userId, getCurrUserId());
		} catch (Exception e) {
			LOG.error("禁用用户异常：", e);
			respJson = RespJson.error("禁用用户异常!");
		}
		return respJson;
	}

	// /**
	// * @Description: 初始化默认参数
	// * @param qo
	// * @author liwb
	// * @date 2016年9月23日
	// */
	// private SysUserQo buildDefaultParams(SysUserQo qo) {
	//
	// // 如果没有修改所选机构等信息，则去掉该参数
	// String branchNameOrCode = qo.getBranchNameOrCode();
	// if (StringUtils.isNotBlank(branchNameOrCode) && branchNameOrCode.contains("[")
	// && branchNameOrCode.contains("]")) {
	// qo.setBranchNameOrCode(null);
	// }
	//
	// // 默认当前机构
	// if (StringUtils.isBlank(qo.getBranchCode()) && StringUtils.isBlank(qo.getBranchNameOrCode())) {
	// qo.setBranchCompleCode(getCurrBranchCompleCode());
	// }
	//
	// return qo;
	// }

}