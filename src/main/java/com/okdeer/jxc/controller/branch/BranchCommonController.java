/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月28日
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.branch;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.branch.vo.BranchesVo;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
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
public class BranchCommonController extends BaseController<BranchCommonController> {

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
	public String viewComponent(BranchesVo vo, Model model) {
		LOG.debug("公共选择机构跳转页面参数:{}", vo);
		model.addAttribute("vo", vo);
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
			LOG.debug("查询机构参数:{}", vo.toString() + "pageNumber:" + pageNumber + "pageSize:" + pageSize);
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
			vo.setType(UserUtil.getCurrBranchType());
			if (StringUtils.isEmpty(vo.getBranchId())) {
				vo.setBranchId(UserUtil.getCurrBranchId());
			}
			// 查询分公司、物流中心
			if ("DZ".equals(vo.getFormType())) {
				vo.setType(null);
			}
			// 查询总部、分公司
			if ("DV".equals(vo.getFormType())) {
				vo.setBranchId(UserUtil.getCurrBranchId());
			}

			// 3.自营店、4.加盟店B、5.加盟店C
			if ("DD".equals(vo.getFormType())) {
				// vo.setBranchId(UserUtil.getCurrBranchParentId());
				vo.setBranchType(null);
				vo.setBranchTypes(new int[] { 3, 4, 5 });
				String branchCompleCode = UserUtil.getCurrBranchCompleCode();
				if (org.apache.commons.lang3.StringUtils.isNoneEmpty(branchCompleCode) && branchCompleCode.length() > 5) {
					branchCompleCode = branchCompleCode.substring(0, branchCompleCode.length() - 5);
				}
				vo.setBranchCompleCode(branchCompleCode);
			}
			// 如果是仓库商品查询，则只能查询分公司及其物流中心
			if ("SR".equals(vo.getFormType())) {
				if (UserUtil.getCurrBranchType() == 0 || UserUtil.getCurrBranchType() == 1
						|| UserUtil.getCurrBranchType() == 1) {
					vo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
				} else {
					String branchCompleCode = UserUtil.getCurrBranchCompleCode();
					vo.setBranchCompleCode(branchCompleCode.substring(0, branchCompleCode.length() - 5));
				}
				vo.setBranchType(null);
				vo.setBranchTypes(new int[] { 0, 1, 2 });
			}

			// 如果不为空，则设置多个机构条件
			if (vo.getBranchTypes() == null || vo.getBranchTypes().length == 0) {
				// 设置多个机构类型条件
				vo.setBranchTypes(strArrToIntArr(vo.getBranchTypesStr()));
			}

			PageUtils<Branches> suppliers = PageUtils.emptyPage();
			if (vo.getScope() != null && vo.getScope() == 1) {
				suppliers = branchesService.queryBranchAllLists(vo);
			} else {
				suppliers = branchesService.queryLists(vo);
			}
			LOG.debug("机构列表：{}", suppliers);
			return suppliers;
		} catch (Exception e) {
			LOG.error("查询机构异常:", e);
		}
		return null;
	}

	/***
	 * 
	 * @Description: 数组类型转换
	 * @param branchTypesStr
	 * @return
	 * @author xuyq
	 * @date 2017年6月7日
	 */
	private int[] strArrToIntArr(String branchTypesStr) {
		int[] resultArr = null;
		if (StringUtils.isBlank(branchTypesStr)) {
			return resultArr;
		}
		String[] tempArr = branchTypesStr.split(",");
		if (tempArr == null || tempArr.length == 0) {
			return resultArr;
		}
		resultArr = new int[tempArr.length];
		for (int i = 0; i < tempArr.length; i++) {
			resultArr[i] = Integer.parseInt(tempArr[i]);
		}
		return resultArr;
	}

	/**
	 * @Description:礼品兑换新增查询机构
	 * @param vo
	 * @param response
	 * @param pageNumber
	 * @param pageSize
	 * @return 
	 * @author zhongy
	 * @date 2017年1月11日
	 */
	@RequestMapping(value = "queryComponentList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<Branches> queryComponentList(BranchesVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			LOG.debug("查询机构参数:{}", vo.toString() + "pageNumber:" + pageNumber + "pageSize:" + pageSize);
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
			vo.setType(UserUtil.getCurrBranchType());
			vo.setBranchId(UserUtil.getCurrBranchId());
			PageUtils<Branches> suppliers = branchesService.queryBranchByParam(vo);
			LOG.debug("机构列表：{}", suppliers);
			return suppliers;
		} catch (Exception e) {
			LOG.error("查询机构异常:", e);
		}
		return null;
	}

	@RequestMapping(value = "selectTargetBranchData", method = RequestMethod.POST)
	@ResponseBody
	public RespJson selectTargetBranchData(String branchesId) {
		RespJson respJson = RespJson.success();
		try {
			LOG.debug("查询机构参数:{}", branchesId);
			Branches branches = branchesService.getBranchInfoById(branchesId);
			respJson.put("address", branches.getAddress());
			respJson.put("contacts", branches.getContacts());
			respJson.put("mobile", branches.getMobile());
		} catch (Exception e) {
			respJson = RespJson.error();
			LOG.error("查询机构异常:", e);
		}
		return respJson;
	}

}
