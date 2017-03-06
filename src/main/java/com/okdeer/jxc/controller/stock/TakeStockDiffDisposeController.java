package com.okdeer.jxc.controller.stock;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.okdeer.jxc.controller.BaseController;

@Controller
@RequestMapping("/takeStock/diffDispose")
public class TakeStockDiffDisposeController extends BaseController<TakeStockDiffDisposeController> {

	/**
	 * 
	 * @Description: 跳转列表页面
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/list")
	public String list() {
		return "/takeStock/diffDispose/diffDisposeList";
	}
}
