/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月28日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.branch;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.BranchArea;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchAreaServiceApi;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.branch.vo.BranchAreaVo;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: BranchAreaController 
 * @Description: 机构区域Controller 
 * @author zhangchm
 * @date 2016年7月28日 
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    进销存2.0.0		   2016年7月28日                  zhangchm            创建机构区域Controller， 查询机构区域树结构
 *    商家管理系统		    2016年8月26日		lijy02				添加用户权限
 */

@Controller
@RequestMapping("common/branchArea")
public class BranchAreaController extends BaseController<BranchAreaController> {

	@Reference(version = "1.0.0", check = false)
	private BranchAreaServiceApi branchAreaService;

	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesService;

	/**
	 * @Description 查询机构区域树结构
	 * @param vo
	 * @return   
	 * @author zhangchm
	 * @date 2016年7月20日
	 */
	@RequestMapping(value = "getBranchAreaToTree", method = RequestMethod.POST)
	@ResponseBody
	public String getBranchAreaToTree(BranchAreaVo vo) {
		try {
			LOG.info("机构区域树查询参数:{}", vo.toString());
			String branchAreaTree = branchAreaService.queryBranchAreaToTree(vo);
			LOG.info("机构区域树 branchAreaTree:{}", branchAreaTree);
			return branchAreaTree;
		} catch (Exception e) {
			LOG.error("查询机构区域树结构异常:", e);
		}
		return null;
	}

	/**
	 * @Description: 查询区域
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @author 李俊义
	 * @date 2016年8月18日
	 */
	@RequestMapping(value = "getBranchAreaList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<BranchArea> getBranchAreaList(
			BranchAreaVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			LOG.info("查询区域参数:{}", vo.toString()+"pageNumber:"+pageNumber+"pageSize:"+pageSize);
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			SysUser user = UserUtil.getCurrentUser();
			if (user != null) {
				vo.setBranchType(user.getBranchType());
				if (user.getBranchId() != null) {
					// 根据机构编码查询区域code
					Branches branch = branchesService.getBranchInfoById(user
							.getBranchId());
					// 如果机构区域不为空
					if (branch != null) {
						vo.setBranchAreaCode(branch.getBranchAreaCode());
					}
				}
			}
			PageUtils<BranchArea> suppliers = branchAreaService.queryLists(vo);
			LOG.info("区域机构列表{}" , suppliers);
			return suppliers;
		} catch (Exception e) {
			LOG.error("查询区域机构异常:", e);
		}
		return null;
	}
}
