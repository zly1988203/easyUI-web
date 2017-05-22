package com.okdeer.jxc.controller.settle.supplier;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.settle.supplier.service.SupplierAccountCurrentService;

/***
 * 
 *<p></p>
 * ClassName: SupplierAccountCurrentController 
 * @Description: 供应商往来账单
 * @author xuyq
 * @date 2017年5月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@RestController
@RequestMapping("/settle/supplierAccountCurrent")
public class SupplierAccountCurrentController extends BaseController<SupplierAccountCurrentController> {

    /**
     * SupplierAccountCurrentService
     */
    @Reference(version = "1.0.0", check = false)
    private SupplierAccountCurrentService supplierAccountCurrentService;
}
