package com.okdeer.jxc.controller.stock;

import javax.servlet.http.HttpServletRequest;

import org.apache.poi.ss.formula.functions.T;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.okdeer.jxc.controller.BaseController;

/***
 * 
 * ClassName: CombineSplitController 
 * @Description: 组合拆分单Controller
 * @author xuyq
 * @date 2017年2月14日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/stock/combineSplit")
public class CombineSplitController extends BaseController<T> {

	/***
	 * 
	 * @Description: 跳转列表页面
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/list")
	public String list() {
		return "/combineSplit/combineSplitList";
	}

	/***
	 * 
	 * @Description: 跳转新增页面
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/add")
	public String add() {
		return "/combineSplit/combineSplitAdd";
	}

	/***
	 * 
	 * @Description: 跳转修改页面
	 * @param id
	 * @param request
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.GET)
	public String edit(String id, HttpServletRequest request) {
		return "/combineSplit/combineSplitEdit";
	}
}
