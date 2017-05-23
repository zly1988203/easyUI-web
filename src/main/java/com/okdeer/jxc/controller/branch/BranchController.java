/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年5月23日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.branch;  

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

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
@RequestMapping("archive/branch")
public class BranchController extends BaseController<BranchController> {
	
	@RequestMapping(value = "toManager")
	public String toManager() {
		return "archive/branch/branchList";
	}
	
	@RequestMapping(value = "toAdd")
	public String toAdd() {
		return "archive/branch/branchEdit";
	}
	
	@RequestMapping(value = "toEdit")
	public String toEdit() {
		return "archive/branch/branchEdit";
	}

}
