/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年5月23日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.branch;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
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

	@RequestMapping(value = "deleteGroup",method=RequestMethod.POST)
	@ResponseBody
	public RespJson deleteGroup(String groupId) {
		try{
			return branchGroupServiceApi.deleteBranchGroup(groupId,getCurrUserId());
		}catch(Exception e){
			return RespJson.error("删除分组操作失败！");
		}
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

	@RequestMapping(value = "queryGrouBranchs",method=RequestMethod.POST)
	@ResponseBody
	public HashMap<String,String>  queryGrouBranchs(String groupIds) {
		//		groupIds="8a94e76f5d408ed4015d4093d33b0003,8a94e76f5d408ed4015d4093e74d0004";
		List<BranchGroupDetail> list= branchGroupServiceApi.queryBranchListByGroupId(Arrays.asList(groupIds.split(",")));
		HashMap<String,StringBuffer> map=new HashMap<String,StringBuffer>();
		HashSet<String> set=new HashSet<String>();
		StringBuffer branchIdBuf=new StringBuffer();
		if(CollectionUtils.isNotEmpty(list)){
			for(BranchGroupDetail detail:list){
				if(map.containsKey(detail.getGroupId())){
					map.get(detail.getGroupId()).append(",").append(detail.getBranchName());
				}else{
					map.put(detail.getGroupId(), new StringBuffer().append(detail.getGroupName()+":"+detail.getBranchName()));
				}
				if(!set.contains(detail.getBranchId())){
					set.add(detail.getBranchId());                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
					branchIdBuf.append(detail.getBranchId()).append(",");
				}
			}
		}
		StringBuffer returnBuf=new StringBuffer();
		for(StringBuffer buf:map.values()){
			returnBuf.append(buf).append(";");
		}
		HashMap<String,String> returnMap =new HashMap<String,String>();
		returnMap.put("branchId", branchIdBuf.delete(branchIdBuf.length()-1, branchIdBuf.length()).toString());
		returnMap.put("branchName", returnBuf.toString());
		return returnMap;
	}

}
