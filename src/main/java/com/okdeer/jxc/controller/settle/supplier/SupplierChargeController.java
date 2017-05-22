package com.okdeer.jxc.controller.settle.supplier;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.settle.supplier.service.SupplierChargeService;

/**
 * 
 *<p></p>
 * ClassName: SupplierChargeController 
 * @Description: 供应商预付，费用
 * @author xuyq
 * @date 2017年5月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@RestController
@RequestMapping("/settle/supplierCharge")
public class SupplierChargeController extends BaseController<SupplierChargeController> {

    /**
     * SupplierChargeService
     */
    @Reference(version = "1.0.0", check = false)
    private SupplierChargeService supplierChargeService;

}