/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年5月23日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.branch;  

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.po.BranchPo;
import com.okdeer.jxc.branch.qo.BranchQo;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.branch.vo.BranchOpVo;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;


/**
 * ClassName: BranchController 
 * @Description: 机构资料Controller
 * @author liwb
 * @date 2017年5月23日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@RestController
@RequestMapping("archive/branch")
public class BranchController extends BaseController<BranchController> {
	
	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesService;
	
	@RequestMapping(value = "toManager")
	public ModelAndView toManager() {
		return new ModelAndView("archive/branch/branchList");
	}
	
	@RequestMapping(value = "toAdd")
	public ModelAndView toAdd() {
		return new ModelAndView("archive/branch/branchEdit");
	}
	
	@RequestMapping(value = "toEdit")
	public ModelAndView toEdit() {
		return new ModelAndView("archive/branch/branchEdit");
	}
	
	/**
	 * @Description: 机构区域树形结构 展示
	 * @return
	 * @author liwb
	 * @date 2017年5月23日
	 */
	@RequestMapping(value = "getBranchAreaToTree")
	public String getBranchAreaToTree() {
		try {
			// 根据当前机构获取机构区域树形结构
			return branchesService.getBranchAndAreaToTree(super.getCurrBranchCompleCode());
		} catch (Exception e) {
			
			LOG.error("查询机构供应商区域树形结构异常:", e);
		}
		return StringUtils.EMPTY;
	}
	
	
	/**
	 * @Description: 分页查询机构信息
	 * @param qo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author liwb
	 * @date 2017年5月23日
	 */
	@RequestMapping(value = "getBranchList", method = RequestMethod.POST)
	public PageUtils<BranchPo> getBranchList(BranchQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		
		qo.setPageNumber(pageNumber);
		qo.setPageSize(pageSize);
		LOG.debug("查询机构条件：{}", qo);
		
		try {
			
			return branchesService.getBranchListForPage(qo);
		} catch (Exception e) {
			LOG.error("分页查询机构信息异常:", e);
		}
		return PageUtils.emptyPage();
	}
	
	/**
	 * @Description: 修改机构信息
	 * @param vo
	 * @return
	 * @author liwb
	 * @date 2017年5月23日
	 */
	@RequestMapping(value = "updateBranch", method = RequestMethod.POST)
	public RespJson updateBranch(BranchOpVo vo){
		LOG.debug("修改机构信息参数：{}", vo);
		try {
			
			vo.setUserId(super.getCurrUserId()); 	// 当前用户Id
			
			return branchesService.updateBranchInfo(vo);
			
		} catch (Exception e) {
			LOG.error("修改机构信息失败：", e);
		}
		return RespJson.error();
	}
	

}
