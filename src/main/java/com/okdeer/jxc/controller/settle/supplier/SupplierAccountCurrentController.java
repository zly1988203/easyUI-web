package com.okdeer.jxc.controller.settle.supplier;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.settle.supplier.qo.SupplierAccountCurrentQo;
import com.okdeer.jxc.settle.supplier.service.SupplierAccountCurrentService;
import com.okdeer.jxc.settle.supplier.vo.SupplierAccountCurrentVo;

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
    
    /**
     * 
     * @Description: 供应商往来账单列表页
     * @param model model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月22日
     */
    @RequestMapping(value = "accountCurrentList")
    public ModelAndView accountCurrentList(Model model) {
        return new ModelAndView("settle/supplier/account/accountList");
    }
    
    /**
     * @Description: 查询列表
     * @param vo 参数VO
     * @param pageNumber 页码
     * @param pageSize 页数
     * @return PageUtils
     * @author xuyq
     * @date 2017年3月7日
     */
    @RequestMapping(value = "getAccountCurrentList", method = RequestMethod.POST)
    @ResponseBody
    public PageUtils<SupplierAccountCurrentVo> getAccountCurrentList(SupplierAccountCurrentQo qo,
            @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
            @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        try {
            qo.setPageNumber(pageNumber);
            qo.setPageSize(pageSize);
            LOG.debug(LogConstant.OUT_PARAM, qo);
            PageUtils<SupplierAccountCurrentVo> advanceList = supplierAccountCurrentService.getAccountCurrentPageList(qo);
            LOG.debug(LogConstant.PAGE, advanceList.toString());
            return advanceList;
        } catch (Exception e) {
            LOG.error("供应商往来账款列表信息异常:{}", e);
        }
        return PageUtils.emptyPage();
    }
}
