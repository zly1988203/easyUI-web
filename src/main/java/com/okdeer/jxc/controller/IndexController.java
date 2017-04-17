package com.okdeer.jxc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
//@RequestMapping()
public class IndexController {
	
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView toReport() {
	return new ModelAndView("index");
    }

    @RequestMapping(value = "/sessionKeeper", method = RequestMethod.GET)
    public String toKeepSession() {
	return "sessionKeeper";
    }
}
