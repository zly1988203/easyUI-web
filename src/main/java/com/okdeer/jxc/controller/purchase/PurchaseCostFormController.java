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
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.enums.AuditStatusEnum;
import com.okdeer.jxc.common.enums.DisabledEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.purchase.qo.PurchaseFormDetailPO;
import com.okdeer.jxc.form.purchase.service.PurchaseCostFormService;
import com.okdeer.jxc.form.purchase.vo.PurchaseCostFormVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

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
            if(purchaseCostFormPage!=null){
                PurchaseCostFormVo reportVo = purchaseCostFormService.sumPurchaseCostFormList(vo);
                if(reportVo!=null){
                    reportVo.setFormNo("SUM");
                    purchaseCostFormPage.setFooter(new ArrayList<>(Arrays.asList(reportVo)));
                }else{
                    reportVo=new PurchaseCostFormVo();
                    reportVo.setFormNo("SUM");
                    purchaseCostFormPage.setFooter(new ArrayList<>());
                }
                return purchaseCostFormPage;
            }
            return PageUtils.emptyPage();
        } catch (Exception e) {
            LOG.error("获取采购成本调价单列表失败!", e);
        }
        return PageUtils.emptyPage();
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public RespJson save(HttpServletRequest request,@RequestBody PurchaseCostFormVo vo) {
        try {
            vo.setBranchCode(getCurrBranchCode());
            vo.setCreateUserId(getCurrUserId());
            if (StringUtils.isNotBlank(vo.getId())){
                vo.setUpdateUserId(getCurrUserId());
            }
            String id = purchaseCostFormService.saveOrUpdate(vo);
            return RespJson.success(new HashMap<String, String>() {
                {
                    put("id", id);
                }
            });
        } catch (Exception e) {
            LOG.error("采购成本调价单保存失败!", e);
            return RespJson.error("采购成本调价单保存失败!");
        }
    }

    @RequestMapping(value = "edit/{id}")
    public ModelAndView edit(@PathVariable(value = "id") String id) {
        Map<String, Object> model = Maps.newHashMap();
        model.put("form", purchaseCostFormService.getPurchaseCostById(id));
        //model.put("detail", posGroupKeys);
        return new ModelAndView("form/purchase/cost/editCost", model);
    }

    @RequestMapping(value = "detail/list/{id}")
    public RespJson editdetailList(@PathVariable(value = "id") String id) {
        try {
            List<PurchaseFormDetailPO> purchaseFormDetailPOS = purchaseCostFormService.getPurchaseCostFormDetail(id);
            return RespJson.success(purchaseFormDetailPOS);
        }catch (Exception e){
            LOG.error("查询采购成本详情失败!",e);
            return RespJson.error("查询采购成本详情失败!");
        }
    }

    @RequestMapping(value = "/del", method = RequestMethod.POST)
    public RespJson del(@RequestParam(value = "ids[]") String[] ids) {
        try {
            boolean bool = Boolean.FALSE;
            for (String id : ids) {
                PurchaseCostFormVo vo = purchaseCostFormService.getPurchaseCostById(id);
                if (AuditStatusEnum.AUDIT.getCode().equals(vo.getStatus()) || AuditStatusEnum.OVER.getCode().equals(vo.getStatus())) {
                    bool = Boolean.TRUE;
                    break;
                }
            }
            if (bool) {
                return RespJson.error("刪除的数据包含已审核或已终止的单据,请刷新再删除!");
            } else {
                purchaseCostFormService.delPurchaseCostForm(ids);
                return RespJson.success();
            }
        } catch (Exception e) {
            LOG.error("删除采购成本调整单据失败!", e);
            return RespJson.error("删除采购成本调整单据失败!");
        }
    }

    @RequestMapping(value = "/over", method = RequestMethod.POST)
    public RespJson over(String formId) {
        try {
            PurchaseCostFormVo vo = purchaseCostFormService.getPurchaseCostById(formId);
            if (DisabledEnum.YES.getIndex()==Integer.valueOf(vo.getDisabled())) {
                return RespJson.error("该采购成本调整单已被删除,无法终止!");
            } else if (AuditStatusEnum.UNAUDIT.getCode().equals(vo.getStatus())) {
                return RespJson.error("该采购成本调整单未审核,无法终止!");
            } else {
                vo = new PurchaseCostFormVo();
                vo.setId(formId);
                vo.setStatus(AuditStatusEnum.OVER.getCode());
                vo.setUpdateTime(new Date());
                vo.setUpdateUserId(getCurrUserId());
                purchaseCostFormService.updatePurchaseCostForm(vo);
                return RespJson.success();
            }
        } catch (Exception e) {
            LOG.error("终止采购成本调整单失败!", e);
            return RespJson.error("终止采购成本调整单失败!");
        }
    }

    @RequestMapping(value = "/audit", method = RequestMethod.POST)
    public RespJson audit(String formId) {
        try {
            PurchaseCostFormVo vo = purchaseCostFormService.getPurchaseCostById(formId);
            if (DisabledEnum.YES.getIndex()==Integer.valueOf(vo.getDisabled())) {
                return RespJson.error("该采购成本调整单已被删除,无法审核!");
            } else if (AuditStatusEnum.OVER.getCode().equals(vo.getStatus())) {
                return RespJson.error("该采购成本调整单已终止,无需审核!");
            } else {
                //vo = new PurchaseCostFormVo();
                //vo.setId(formId);
                vo.setStatus(AuditStatusEnum.AUDIT.getCode());
                vo.setValidTime(new Date());
                vo.setValidUserId(getCurrUserId());
                purchaseCostFormService.check(vo);
                return RespJson.success();
            }
        } catch (Exception e) {
            LOG.error("审核采购成本调整单失败!", e);
            return RespJson.error("审核采购成本调整单失败!");
        }
    }

    @RequestMapping(value = "/export/list", method = RequestMethod.POST)
    public RespJson exportList(HttpServletResponse response, PurchaseCostFormVo vo) {
        RespJson resp = RespJson.success();
        try {
            List<PurchaseFormDetailPO> purchaseFormDetailPOS = purchaseCostFormService.getPurchaseCostFormDetail(vo.getId());
            String fileName = "采购成本调明细_" + DateUtils.getCurrSmallStr();
            String templateName = ExportExcelConstant.PURCHASE_COST_FORM_DETAIL;
            exportListForXLSX(response, purchaseFormDetailPOS, fileName, templateName);
        }catch (Exception e){
            LOG.error("采购成本调整明细导出异常!",e);
            resp = RespJson.error("采购成本调整明细导出异常!");
        }
        return resp;
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
