package com.okdeer.jxc.controller.settle.supplier;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.settle.supplier.service.SupplierCheckService;

/**
 * 
 *<p></p>
 * ClassName: SupplierCheckController 
 * @Description: 供应商对账
 * @author xuyq
 * @date 2017年5月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@RestController
@RequestMapping("/settle/supplierCheck")
public class SupplierCheckController extends BaseController<SupplierCheckController> {

    /**
     * SupplierCheckService
     */
    @Reference(version = "1.0.0", check = false)
    private SupplierCheckService supplierCheckService;
    
    /**
     * 
     * @Description: 供应商对账列表页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "checkList")
    public ModelAndView checkList(Model model) {
        return new ModelAndView("settle/supplier/check/checkList");
    }
    
    /**
     * 
     * @Description: 供应商对账新增页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "checkAdd")
    public ModelAndView checkAdd(Model model) {
        return new ModelAndView("settle/supplier/check/checkAdd");
    }
    
    /**
     * 
     * @Description: 供应商对账编辑页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "checkEdit")
    public ModelAndView checkEdit(Model model) {
        return new ModelAndView("settle/supplier/check/checkEdit");
    }
    
    /**
     * 
     * @Description: 供应商对账详情页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "checkView")
    public ModelAndView checkView(Model model) {
        return new ModelAndView("settle/supplier/check/checkView");
    }

}