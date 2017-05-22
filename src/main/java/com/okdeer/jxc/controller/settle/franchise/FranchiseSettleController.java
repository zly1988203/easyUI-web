package com.okdeer.jxc.controller.settle.franchise;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.settle.supplier.SupplierChainController;
import com.okdeer.jxc.settle.franchise.service.FranchiseSettleService;

/**
 * 
 *<p></p>
 * ClassName: FranchiseSettleController 
 * @Description: 加盟店结算
 * @author 
 * @date 2017年5月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@RestController
@RequestMapping("/settle/franchiseSettle")
public class FranchiseSettleController extends BaseController<SupplierChainController> {

    /**
     * FranchiseSettleService
     */
    @Reference(version = "1.0.0", check = false)
    private FranchiseSettleService franchiseSettleService;

    /**
     * 
     * @Description: 加盟店结算列表页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "settleList")
    public ModelAndView settleList(Model model) {
        return new ModelAndView("settle/franchise/settle/settleList");
    }
}