package com.okdeer.jxc.controller.stock;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.okdeer.jxc.controller.BaseController;

@Controller
@RequestMapping("/takeStock/diffSearch")
public class TakeStockDiffSearchController extends BaseController<TakeStockDiffSearchController> {

	/**
	 * 
	 * @Description: 跳转列表页面
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/list")
	public String list() {
		return "/takeStock/diffSearch/diffSearchList";
	}
}
