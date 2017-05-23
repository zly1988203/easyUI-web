package com.okdeer.jxc.controller.settle.supplier;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.settle.supplier.service.SupplierSettleService;

/**
 * 
 *<p></p>
 * ClassName: SupplierSettleController 
 * @Description: 供应商结算
 * @author xuyq
 * @date 2017年5月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@RestController
@RequestMapping("/settle/supplierSettle")
public class SupplierSettleController extends BaseController<SupplierSettleController> {

    /**
     * SupplierSettleService
     */
    @Reference(version = "1.0.0", check = false)
    private SupplierSettleService supplierSettleService;
    
    /**
     * 
     * @Description: 供应商结算列表页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "settleList")
    public ModelAndView settleList(Model model) {
        return new ModelAndView("settle/supplier/settle/settleList");
    }
    
    /**
     * 
     * @Description: 供应商结算新增页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "settleAdd")
    public ModelAndView settleAdd(Model model) {
        return new ModelAndView("settle/supplier/settle/settleAdd");
    }
    
    /**
     * 
     * @Description: 供应商结算编辑页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "settleEdit")
    public ModelAndView settleEdit(Model model) {
        return new ModelAndView("settle/supplier/settle/settleEdit");
    }
    
    /**
     * 
     * @Description: 供应商结算详情页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "settleView")
    public ModelAndView settleView(Model model) {
        return new ModelAndView("settle/supplier/settle/settleView");
    }

}