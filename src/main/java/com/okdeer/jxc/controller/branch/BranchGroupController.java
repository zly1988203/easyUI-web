/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年5月23日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.branch;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.stock.entity.GoodsComponent;
import com.okdeer.jxc.stock.vo.GoodsComponentVo;

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
	public PageUtils<GoodsComponent>  queryList( GoodsComponentVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		return null;
	}
	/**
	 * @Description: 查询机构分组门店明细
	 * @return   
	 * @return List<GoodsSku>  
	 * @throws
	 * @author yangyq02
	 * @date 2016年10月25日
	 */
	@RequestMapping(value = "queryBranch",method=RequestMethod.POST)
	@ResponseBody
	public List<GoodsComponent>  queryBranch(String skuId) {
		return null;
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
	public RespJson  saveBranchGroup(String goodsJson) {
		return null;
	}

}
