package com.okdeer.jxc.controller.settle.supplier;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}