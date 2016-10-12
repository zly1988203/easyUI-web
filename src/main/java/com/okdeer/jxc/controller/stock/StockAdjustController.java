/** 
 *@Project: okdeer-jxc-web 
 *@Author: liux01
 *@Date: 2016年10月11日 
 *@Copyright: ©2014-2020 www.yschome.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.stock;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.okdeer.jxc.controller.BaseController;


/**
 * ClassName: StockAdjustController 
 * @Description: TODO
 * @author liux01
 * @date 2016年10月11日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    零售管理系统		    2016年10月11日		liux01				商品库存调整
 */
@Controller
@RequestMapping("/stock/ajdust")
public class StockAdjustController extends BaseController<StockAdjustController> {

	/**
	 * 
	 * @Description: 获取库存调整列表页面
	 * @return
	 * @author liux01
	 * @date 2016年10月11日
	 */
	@RequestMapping(value = "/list")
	public String list(){
		return "/stockAdjust/list";
	}
	/**
	 * 
	 * @Description: 获取库存调整新增页面
	 * @return
	 * @author liux01
	 * @date 2016年10月11日
	 */
	@RequestMapping(value = "/add")
	public String add(){
		return "/stockAdjust/add";
	}
	/**
	 * 
	 * @Description: 获取库存调整编辑页面
	 * @return
	 * @author liux01
	 * @date 2016年10月11日
	 */
	@RequestMapping(value = "/edit")
	public String edit(){
		return "/stockAdjust/edit";
	}
	
	
}
