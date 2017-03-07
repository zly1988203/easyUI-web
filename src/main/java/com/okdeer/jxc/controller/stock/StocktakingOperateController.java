package com.okdeer.jxc.controller.stock;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.okdeer.jxc.controller.BaseController;

/**
 * <p></p>
 * ClassName: StocktakingOperateController 
 * @Description: 存货盘点
 * @author xuyq
 * @date 2017年3月7日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/stocktaking/operate")
public class StocktakingOperateController extends BaseController<StocktakingOperateController> {

	/**
	 * 
	 * @Description: 跳转列表页面
	 * @return String
	 * @author xuyq
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "/list")
	public String list() {
		return "/stocktaking/operate/operateList";
	}
}
