package com.okdeer.jxc.controller.settle.supplier;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.settle.supplier.service.SupplierChainService;

/**
 * 
 *<p></p>
 * ClassName: SupplierChainController 
 * @Description: 供应商联营账单
 * @author xuyq
 * @date 2017年5月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@RestController
@RequestMapping("/settle/supplierChain")
public class SupplierChainController extends BaseController<SupplierChainController> {

    /**
     * SupplierChainService
     */
    @Reference(version = "1.0.0", check = false)
    private SupplierChainService supplierChainService;
    
    /**
     * 
     * @Description: 供应商联营账单列表页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "chainList")
    public ModelAndView chainList(Model model) {
        return new ModelAndView("settle/supplier/chain/chainList");
    }

    /**
     * 
     * @Description: 供应商联营账单新增页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "chainAdd")
    public ModelAndView chainAdd(Model model) {
        return new ModelAndView("settle/supplier/chain/chainAdd");
    }

    /**
     * 
     * @Description: 供应商联营账单编辑页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "chainEdit")
    public ModelAndView chainEdit(Model model) {
        return new ModelAndView("settle/supplier/chain/chainEdit");
    }

    /**
     * 
     * @Description: 供应商联营账单详情页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "chainView")
    public ModelAndView chainView(Model model) {
        return new ModelAndView("settle/supplier/chain/chainView");
    }
}