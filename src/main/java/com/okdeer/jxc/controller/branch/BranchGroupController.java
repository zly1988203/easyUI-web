/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年5月23日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.branch;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.BranchGroup;
import com.okdeer.jxc.branch.entity.BranchGroupDetail;
import com.okdeer.jxc.branch.service.BranchGroupServiceApi;
import com.okdeer.jxc.branch.vo.BranchesGroupVo;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.gson.GsonUtils;
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

@Controller
@RequestMapping("branch/branchGroup")
public class BranchGroupController extends BaseController<BranchGroupController> {

	@Reference(version = "1.0.0", check = false)
	BranchGroupServiceApi branchGroupServiceApi;

	@RequestMapping(value = "view")
	public String view() {
		return "archive/branch/branchGroup";
	}

	@RequestMapping(value = "add")
	public String add() {
		return "archive/branch/branchGroupAdd";
	}
	@RequestMapping(value = "edit")
	public String edit() {
		return "archive/branch/branchGroupEdit";
	}

	/**
	 * @Description: 查询机构分组列表
	 * @return   
	 * @return PageUtils<GoodsSku>  
	 * @throws
	 * @author yangyq02
	 * @date 2016年10月25日
	 */
	@RequestMapping(value = "queryList",method=RequestMethod.POST)
	@ResponseBody
	public PageUtils<BranchGroup>  queryList( BranchesGroupVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		vo.setPageNumber(pageNumber);
		vo.setPageSize(pageSize);
		return branchGroupServiceApi.queryLists(vo);
	}
	/**
	 * @Description: 查询机构分组门店明细
	 * @return   
	 * @return List<GoodsSku>  
	 * @throws
	 * @author yangyq02
	 * @date 2016年10月25日
	 */
	@RequestMapping(value = "queryGrouBranch",method=RequestMethod.POST)
	@ResponseBody
	public List<BranchGroupDetail>  queryGrouBranch(String groupId) {
		return branchGroupServiceApi.queryBranchListByGroupId(groupId);
	}
	/**
	 * @Description: 保存商品成分
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author yangyq02
	 * @date 2016年10月25日
	 */
	@RequestMapping(value = "saveBranchGroup",method=RequestMethod.POST)
	@ResponseBody
	public RespJson  saveBranchGroup(@RequestBody String goodsJson) {
		LOG.debug("保存门店分组参数：{}",goodsJson);
		try {
			//BranchGroup group=JacksonUtil.toEntity(goodsJson, BranchGroup.class);
			BranchGroup	 group=GsonUtils.fromJson(goodsJson, BranchGroup.class);
			if(StringUtils.isEmpty( group.getId())){
				
				return  branchGroupServiceApi.addBranchGroup(group, getCurrUserId());
			}else{
				return  branchGroupServiceApi.updateBranchGroup(group, getCurrUserId());
			}
		}
		catch (Exception e) {
			LOG.error("保存门店分组出现异常：{}",e);
			return RespJson.error("保存门店分组出现异常");
		}
	}


	/**
	 * @Description: 保存分组门店信息
	 * @param goodsJson
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author yangyq02
	 * @date 2017年7月15日
	 */
	@RequestMapping(value = "saveGroupBranch",method=RequestMethod.POST)
	@ResponseBody
	public RespJson  saveGroupBranch(@RequestBody String goodsJson) {
		LOG.debug("保存门店分组参数：{}",goodsJson);
		try {
			BranchesGroupVo	 group=GsonUtils.fromJson(goodsJson, BranchesGroupVo.class);
			return  branchGroupServiceApi.saveGroupBranch(group,  getCurrUserId());
		}
		catch (Exception e) {
			LOG.error("保存门店分组出现异常：{}",e);
			return RespJson.error("保存门店分组出现异常");
		}
	}

}
