/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月28日
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.branch;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.druid.util.StringUtils;
import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.branch.vo.BranchesVo;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: BranchesController 
 * @Description: 机构组件Controller
 * @author zhangchm
 * @date 2016年7月28日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    进销存2.0.0		   2016年7月28日                  zhangchm            创建机构组件Controller， 查询公共选择机构、查询机构
 *    商业管理系统		   2016年9月13日                lijy02          	            修改查询过滤条件
 */

@Controller
@RequestMapping("common/branches")
public class BranchesController extends BaseController<BranchesController> {

	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesService;

	/**	
	 * @Description: 公共选择机构页面
	 * @return   
	 * @author zhangchm
	 * @date 2016年7月28日
	 */
	@RequestMapping(value = "view")
	public String view() {
		return "component/branches";
	}

	/**
	 * @Description: 公共选择机构
	 * @param req
	 * @param model
	 * @return   
	 * @author zhangchm
	 * @date 2016年7月28日
	 */
	@RequestMapping(value = "viewComponent")
	public String viewComponent(HttpServletRequest req, Model model) {
		String formType = req.getParameter("formType");
		String branchId = req.getParameter("branchId");
		model.addAttribute("formType", formType);
		model.addAttribute("branchId", branchId);
		return "component/publicAgency";
	}

	/**
	 * @Description: 查询机构
	 * @param vo
	 * @param response
	 * @param pageNumber
	 * @param pageSize
	 * @return 
	 * @author zhangchm
	 * @date 2016年7月28日
	 */
	@RequestMapping(value = "getComponentList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<Branches> getComponentList(BranchesVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
			vo.setType(UserUtil.getCurrBranchType());
			if (StringUtils.isEmpty(vo.getBranchId())) {
				vo.setBranchId(UserUtil.getCurrBranchId());
			}
			LOG.info("机构查询参数:{}", vo);
			PageUtils<Branches> suppliers = branchesService.queryLists(vo);
			LOG.info("机构列表：{}", suppliers);
			return suppliers;
		} catch (Exception e) {
			LOG.error("查询机构异常:", e);
		}
		return null;
	}

}
