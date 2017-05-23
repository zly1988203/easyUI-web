package com.okdeer.jxc.controller.common;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.settle.supplier.service.SupplierChargeService;
import com.okdeer.jxc.system.entity.SysDict;
import com.okdeer.jxc.system.vo.SysDictVo;

/***
 * 
 *<p></p>
 * ClassName: ChargeSelectController 
 * @Description: 费用选择
 * @author xuyq
 * @date 2017年5月23日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@RestController
@RequestMapping("/common/chargeSelect")
public class ChargeSelectController extends BaseController<ChargeSelectController> {

    /**
     * SupplierChargeService
     */
    @Reference(version = "1.0.0", check = false)
    private SupplierChargeService supplierChargeService;

    /***
     * 
     * @Description: 费用选择
     * @param vo
     * @param model
     * @return ModelAndView
     * @author xuyq
     * @date 2017年5月23日
     */
    @RequestMapping(value = "viewChargeComponent")
    public ModelAndView viewComponent(String type, Model model) {
        LOG.debug("费用选择跳转页面参数:{}", type);
        model.addAttribute("type", type);
        return new ModelAndView("component/publicCharge");
    }

    /**
     * 
     * @Description: 查询费用项列表
     * @param vo vo
     * @param pageNumber 1
     * @param pageSize 1
     * @return PageUtils
     * @author xuyq
     * @date 2017年5月23日
     */
    @RequestMapping(value = "getChargeComponentList", method = RequestMethod.POST)
    public PageUtils<SysDict> getChargeComponentList(SysDictVo vo,
            @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
            @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        try {
            LOG.debug("查询费用选择参数:{}", vo + "pageNumber:" + pageNumber + "pageSize:" + pageSize);
            vo.setPageNumber(pageNumber);
            vo.setPageSize(pageSize);

            PageUtils<SysDict> sysDictPage = supplierChargeService.findDictByDictType(vo);
            LOG.debug("费用选择列表：{}", sysDictPage);
            return sysDictPage;
        } catch (Exception e) {
            LOG.error("查询费用选择异常:{}", e);
        }
        return null;
    }
}
