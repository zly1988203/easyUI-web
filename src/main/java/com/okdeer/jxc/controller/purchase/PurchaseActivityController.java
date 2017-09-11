/**
 * @Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 * @project okdeer
 * @Package: com.okdeer.jxc.controller.purchase
 * @author songwj
 * @date 2017年09月05 10:45
 * 注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.controller.purchase;

import com.alibaba.dubbo.config.annotation.Reference;
import com.google.common.collect.Maps;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.JsonMapper;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.purchase.service.PurchaseActivityService;
import com.okdeer.jxc.form.purchase.vo.PurchaseActivityDetailVo;
import com.okdeer.jxc.form.purchase.vo.PurchaseActivityVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author songwj
 * @ClassName: PurchaseActivityController
 * @Description: 采购促销活动单
 * @project okdeer
 * @date 2017年09月05 10:45
 * =================================================================================================
 * Task ID            Date               Author           Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * V2.9          2017年09月05             songwj             采购促销活动单
 */
@RestController
@RequestMapping("purchase/activity")
public class PurchaseActivityController extends BaseController<PurchaseActivityController> {

    @Reference(version = "1.0.0", check = false)
    private PurchaseActivityService purchaseActivityService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ModelAndView list() {
        Map<String, String> model = Maps.newHashMap();
        return new ModelAndView("form/purchase/activity/activityList", model);
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public ModelAndView add() {
        Map<String, String> model = Maps.newHashMap();
        return new ModelAndView("form/purchase/activity/addActivity", model);
    }

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public PageUtils<PurchaseActivityVo> list(PurchaseActivityVo vo,
                                              @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
                                              @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        try {
            vo.setPageNumber(pageNumber);
            vo.setPageSize(pageSize);
            if (StringUtils.isBlank(vo.getBranchId())) {
                vo.setBranchId(getCurrBranchId());
            }
            PageUtils<PurchaseActivityVo> purchaseActivityVoLists = this.purchaseActivityService.getPurchaseActivityList(vo);
            return purchaseActivityVoLists;
        } catch (Exception e) {
            LOG.error("获取采购促销活动列表失败!", e);
        }
        return PageUtils.emptyPage();
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public RespJson save(HttpServletRequest request) {
        try {

            List<PurchaseActivityDetailVo> purchaseActivityDetailVos = JsonMapper.nonDefaultMapper().fromJson(request.getParameter("list"), JsonMapper.nonDefaultMapper().contructCollectionType(ArrayList.class, PurchaseActivityDetailVo.class));

            PurchaseActivityVo vo = JsonMapper.nonDefaultMapper().fromJson(request.getParameter("formObj"), PurchaseActivityVo.class);
            vo.setBranchCode(getCurrBranchCode());
            vo.setCreateUserId(getCurrUserId());
            vo.setCreateUserName(getCurrentUser().getUserName());
            String id = purchaseActivityService.savePurchaseActivityAndDetail(vo, purchaseActivityDetailVos);
            return RespJson.success(new HashMap<String, String>() {
                {
                    put("id", id);
                }
            });
        } catch (Exception e) {
            LOG.error("保存采购促销活动失败!", e);
            return RespJson.error("保存采购促销活动失败!");
        }
    }

    @RequestMapping(value = "edit/{id}")
    public ModelAndView edit(@PathVariable(value = "id") String id) {
        Map<String, Object> model = Maps.newHashMap();
        model.put("form", purchaseActivityService.getPurchaseActivityById(id));
        //model.put("detail", purchaseActivityService.);
        return new ModelAndView("form/purchase/activity/editActivity", model);
    }
}