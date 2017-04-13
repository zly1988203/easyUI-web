/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月28日
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.common;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: CommonController 
 * @Description: 公共组件Controller
 * @author lijy02
 * @date 2016年7月28日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    商业管理系统		   2016年9月13日                lijy02          	            公共组件控制器
 */

@Controller
@RequestMapping("common")
public class CommonController extends BaseController<CommonController> {

	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesServiceApi;

	@RequestMapping(value = "uploadFile")
	public String view(HttpServletRequest req, Model model) {
		return "component/publicUploadFile";
	}

	@RequestMapping(value = "uploadTemplate")
	public String uploadTemplateView(HttpServletRequest req, Model model) {
		return "component/publicUploadTemplate";
	}

	/**
	 * 
	 * @Description: 获取当前机构信息
	 * @return RespJson  
	 * @author zhangq
	 * @date 2017年4月4日
	 */
	@RequestMapping(value = "getCurrentBranch", method = RequestMethod.POST)
	@ResponseBody
	private RespJson getCurrentBranch() {
		String branchId = UserUtil.getCurrBranchId();
		Branches branch = branchesServiceApi.getBranchInfoById(branchId);
		return RespJson.success(branch, "success");
	}
	
	/**
	 * 
	 * @Description: 根据关键字查询机构信息
	 * 关键字支持：货号、条码
	 * @return RespJson  
	 * @author zhangq
	 * @date 2017年4月7日
	 */
	@RequestMapping(value = "getBranchListByKeyword", method = RequestMethod.POST)
	@ResponseBody
	private RespJson getBranchListByKeyword(String keyword) {
		List<Branches> branchList = branchesServiceApi.getBranchByKeyword(keyword);
		return RespJson.success(branchList, "success");
	}
}
