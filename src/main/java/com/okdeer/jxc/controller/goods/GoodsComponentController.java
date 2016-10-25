package com.okdeer.jxc.controller.goods;  

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("goods/component")
public class GoodsComponentController {
	@RequestMapping(value = "view")
	public String view() {
		return "goods/goodsComponent";
	}
}
