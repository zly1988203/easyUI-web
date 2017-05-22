package com.okdeer.jxc.controller.settle.supplier;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}