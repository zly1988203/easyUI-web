package com.okdeer.jxc.controller.component;  

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("component")
public class PrintExportController {
	/**
	 * 
	 * @Description: 跳转列表打印页面
	 * @return String  
	 * @author zhangq
	 * @date 2017年3月29日
	 */
	@RequestMapping(value = "gridPrint")
	public String toGridPrint(){
		return "component/publicGridPrint";
	}
}
