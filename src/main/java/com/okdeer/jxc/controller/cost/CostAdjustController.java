package com.okdeer.jxc.controller.cost;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.entity.PurchaseForm;

@Controller
@RequestMapping("cost/costAdjust")
public class CostAdjustController extends BaseController<PurchaseForm>{
	@RequestMapping(value = "view")
	public String view(String type, Model model) {
		model.addAttribute("type", type);
		return "cost/costAdjustList";
	}
	@RequestMapping(value = "add")
	public String add(String type, Model model) {
		model.addAttribute("type", type);
		return "cost/costAdjustAdd";
	}
	@RequestMapping(value = "edit")
	public String edit(String type, Model model) {
		model.addAttribute("type", type);
		return "cost/costAdjustEdit";
	}
}
