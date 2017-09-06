/**
 * @Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 * @project okdeer
 * @Package: com.okdeer.jxc.controller.purchase
 * @author songwj
 * @date 2017年09月05 10:44
 * 注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.controller.purchase;

import com.alibaba.dubbo.config.annotation.Reference;
import com.google.common.collect.Maps;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.purchase.service.PurchaseCostFormService;
import com.okdeer.jxc.form.purchase.vo.PurchaseCostFormVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

/**
 * @author songwj
 * @ClassName: PurchaseCostFormController
 * @Description: 采购成本调价单
 * @project okdeer
 * @date 2017年09月05 10:44
 * =================================================================================================
 * Task ID            Date               Author           Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * V2.9          2017年09月05             songwj             采购成本调价单
 */
@RestController
@RequestMapping("purchase/cost/form")
public class PurchaseCostFormController extends BaseController<PurchaseCostFormController> {

    @Reference(version = "1.0.0", check = false)
    private PurchaseCostFormService purchaseCostFormService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ModelAndView list() {
        Map<String, String> model = Maps.newHashMap();
        return new ModelAndView("form/purchase/cost/costList", model);
    }

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public PageUtils<PurchaseCostFormVo> list(PurchaseCostFormVo vo,
                                              @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
                                              @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        try {
            vo.setPageNumber(pageNumber);
            vo.setPageSize(pageSize);
            if(StringUtils.isBlank(vo.getBranchId())){
                vo.setBranchId(getCurrBranchId());
            }
            PageUtils<PurchaseCostFormVo> purchaseCostFormPage = this.purchaseCostFormService.getPurchaseCostFormList(vo);
            return purchaseCostFormPage;
        } catch (Exception e) {
            LOG.error("获取采购成本调价单列表失败!", e);
        }
        return PageUtils.emptyPage();
    }

    @RequestMapping(value = "/add")
    public ModelAndView add() {
        Map<String, String> model = Maps.newHashMap();
        return new ModelAndView("form/purchase/cost/addCost", model);
    }

    @RequestMapping(value = "/edit")
    public ModelAndView edit() {
        Map<String, String> model = Maps.newHashMap();
        return new ModelAndView("form/purchase/cost/editCost", model);
    }

    @RequestMapping(value = "/view")
    public ModelAndView view() {
        Map<String, String> model = Maps.newHashMap();
        return new ModelAndView("form/purchase/cost/editCost", model);
    }

}
