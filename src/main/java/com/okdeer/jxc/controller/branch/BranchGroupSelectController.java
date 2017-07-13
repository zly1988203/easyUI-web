/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年5月23日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.branch;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
@RequestMapping("branch/branchGroupSelect")
public class BranchGroupSelectController extends BaseController<BranchGroupSelectController> {

	@RequestMapping(value = "view")
	public String view() {
		return "archive/branch/branchGroupSelect";
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
		LOG.debug("查询机构参数:{}", vo.toString() + "pageNumber:" + pageNumber + "pageSize:" + pageSize);
		return null;
	}

}
