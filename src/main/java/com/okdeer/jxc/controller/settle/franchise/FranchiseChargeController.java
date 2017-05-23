package com.okdeer.jxc.controller.settle.franchise;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.settle.supplier.SupplierChainController;
import com.okdeer.jxc.settle.franchise.service.FranchiseChargeService;

/***
 * 
 *<p></p>
 * ClassName: FranchiseChargeController 
 * @Description: 加盟店预收，费用
 * @author 
 * @date 2017年5月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@RestController
@RequestMapping("/settle/franchiseCharge")
public class FranchiseChargeController extends BaseController<SupplierChainController> {

    /**
     * FranchiseChargeService
     */
    @Reference(version = "1.0.0", check = false)
    private FranchiseChargeService franchiseChargeService;

    /**
     * 
     * @Description: 加盟店预付列表页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "advanceList")
    public ModelAndView advanceList(Model model) {
        return new ModelAndView("settle/franchise/advance/advanceList");
    }
    
    /**
     * 
     * @Description: 加盟店费用列表页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "chargeList")
    public ModelAndView chargeList(Model model) {
        return new ModelAndView("settle/franchise/charge/chargeList");
    }
    
    /**
     * 
     * @Description: 加盟店预付列表页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "advanceAdd")
    public ModelAndView advanceAdd(Model model) {
        return new ModelAndView("settle/franchise/advance/advanceAdd");
    }

    /**
     * 
     * @Description: 加盟店预付编辑页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "advanceEdit")
    public ModelAndView advanceEdit(Model model) {
        return new ModelAndView("settle/franchise/advance/advanceEdit");
    }

    /**
     * 
     * @Description: 加盟店预付详情页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "advanceView")
    public ModelAndView advanceView(Model model) {
        return new ModelAndView("settle/franchise/advance/advanceView");
    }

    /**
     * 
     * @Description: 加盟店费用新增页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "chargeAdd")
    public ModelAndView chargeAdd(Model model) {
        return new ModelAndView("settle/franchise/charge/chargeAdd");
    }

    /**
     * 
     * @Description: 加盟店费用编辑页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "chargeEdit")
    public ModelAndView chargeEdit(Model model) {
        return new ModelAndView("settle/franchise/charge/chargeEdit");
    }

    /**
     * 
     * @Description: 加盟店费用详情页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "chargeView")
    public ModelAndView chargeView(Model model) {
        return new ModelAndView("settle/franchise/charge/chargeView");
    }
}