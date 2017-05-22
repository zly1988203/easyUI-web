package com.okdeer.jxc.controller.settle.franchise;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}