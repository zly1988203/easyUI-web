/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhengwj
 *@Date: 2017年5月31日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.settle.franchise;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.github.pagehelper.PageHelper;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.settle.franchise.service.FranchiseAccountCurrentService;
import com.okdeer.jxc.settle.franchise.vo.FranchiseAccountCurrentVo;

/**
 * ClassName: FranchiseAccountCurrentController 
 * @Description: 加盟店往来账款
 * @author zhengwj
 * @date 2017年5月31日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@RestController
@RequestMapping("/settle/franchiseAccountCurrent")
public class FranchiseAccountCurrentController extends BaseController<FranchiseAccountCurrentController> {

	/**
	 * @Fields franchiseAccountCurrentService : 往来账款service
	 */
	@Reference(version = "1.0.0", check = false)
	private FranchiseAccountCurrentService franchiseAccountCurrentService;

	/**
	 * @Description: 加盟店往来账款页面
	 * @author zhengwj
	 * @date 2017年5月31日
	 */
	@RequestMapping(value = "list")
	public ModelAndView accountCurrentList(Model model) {
		return new ModelAndView("settle/franchise/account/accountList");
	}

	/**
	 * @Description: 获取加盟店往来账款列表
	 * @author zhengwj
	 * @date 2017年5月31日
	 */
	@RequestMapping(value = "getAccountList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<FranchiseAccountCurrentVo> getAccountList(FranchiseAccountCurrentVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			PageHelper.startPage(pageNumber, pageSize, true);
			List<FranchiseAccountCurrentVo> list = franchiseAccountCurrentService.getAccountList(vo);
			return new PageUtils<FranchiseAccountCurrentVo>(list);
		} catch (Exception e) {
			LOG.error("获取加盟店往来账款列表异常:", e);
		}
		return PageUtils.emptyPage();
	}
}
