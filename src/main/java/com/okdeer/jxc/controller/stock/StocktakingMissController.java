package com.okdeer.jxc.controller.stock;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.okdeer.jxc.controller.BaseController;

/**
 * <p></p>
 * ClassName: StocktakingMissController 
 * @Description: 漏盘商品查询
 * @author xuyq
 * @date 2017年3月7日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/stocktaking/miss")
public class StocktakingMissController extends BaseController<StocktakingMissController> {

	/**
	 * 
	 * @Description: 跳转列表页面
	 * @return String
	 * @author xuyq
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "/list")
	public String list() {
		return "/stocktaking/miss/missList";
	}
}
