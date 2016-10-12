
package com.okdeer.jxc.controller.system;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.system.entity.SysUser;
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
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author liwb
	 * @date 2016年8月20日
	 */
	@RequestMapping(value = "/json")
	@ResponseBody
	public PageUtils<SysUser> getData(SysUserVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			
			//构建初始化参数
			vo = buildDefaultParams(vo);

			return sysUserService.queryLists(vo);
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
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @author zhangchm
	 * @date 2016年7月28日
	 */
	@RequestMapping(value = "getOperator")
	@ResponseBody
	public PageUtils<SysUser> getOperator(SysUserVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.debug("获取操作员查询参数:{}", vo);
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setBranchId(super.getCurrBranchId());
			return sysUserService.queryLists(vo);
		} catch (Exception e) {
			LOG.error("查询操作员异常:", e);
		}
		return PageUtils.emptyPage();
	}
	
	@RequestMapping(value = "/toAddUser")
	public String addGoods(Model model, HttpServletRequest request) {


		return "system/userAdd";
	}

	/**
	 * @Description: 初始化默认参数
	 * @param vo
	 * @author liwb
	 * @date 2016年9月23日
	 */
	private SysUserVo buildDefaultParams(SysUserVo vo) {

		// 如果没有修改所选机构等信息，则去掉该参数
		String branchNameOrCode = vo.getBranchNameOrCode();
		if (StringUtils.isNotBlank(branchNameOrCode) && branchNameOrCode.contains("[")
				&& branchNameOrCode.contains("]")) {
			vo.setBranchNameOrCode(null);
		}

		// 默认当前机构
		if (StringUtils.isBlank(vo.getBranchCode()) && StringUtils.isBlank(vo.getBranchNameOrCode())) {
			vo.setBranchCompleCode(getCurrBranchCompleCode());
		}

		return vo;
	}

}
