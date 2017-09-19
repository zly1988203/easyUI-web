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
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.enums.AuditStatusEnum;
import com.okdeer.jxc.common.enums.DisabledEnum;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportComponent;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportHandle;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportVo;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.JsonMapper;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.purchase.service.PurchaseActivityService;
import com.okdeer.jxc.form.purchase.vo.PurchaseActivityDetailVo;
import com.okdeer.jxc.form.purchase.vo.PurchaseActivityVo;
import com.okdeer.jxc.goods.entity.GoodsSelect;
import com.okdeer.jxc.sale.activity.vo.ActivityGoodsImportVo;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;
import net.sf.json.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.*;

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

    @Resource
    private GoodsSelectImportComponent goodsSelectImportComponent;

    @Reference(version = "1.0.0", check = false)
    private BranchesServiceApi branchesService;

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
            if (StringUtils.isBlank(vo.getId())) {
                vo.setCreateUserId(getCurrUserId());
                vo.setCreateUserName(getCurrentUser().getUserName());
            } else {
                vo.setUpdateUserId(getCurrUserId());
                vo.setUpdateUserName(getCurrentUser().getUserName());
            }
            vo.setBranchIds(getCurrBranchId());
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

    @RequestMapping(value = "detail/list/{id}")
    public RespJson editdetailList(@PathVariable(value = "id") String id, @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
                                   @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        try {
            PurchaseActivityDetailVo vo = new PurchaseActivityDetailVo();
            vo.setFormId(id);
            vo.setPageNumber(pageNumber);
            vo.setPageSize(pageSize);
            PageUtils<PurchaseActivityDetailVo> detailVoPageUtils = purchaseActivityService.getPurchaseActivityDetailList(vo);
            return RespJson.success(detailVoPageUtils.getList());
        } catch (Exception e) {
            LOG.error("获取采购促销活动详情失败!", e);
            return RespJson.error("获取采购促销活动详情失败!");
        }
    }


    @RequestMapping(value = "/del", method = RequestMethod.POST)
    public RespJson del(@RequestParam(value = "ids[]") String[] ids) {
        try {
            boolean bool = Boolean.FALSE;
            for (String id : ids) {
                PurchaseActivityVo vo = purchaseActivityService.getPurchaseActivityById(id);
                if (AuditStatusEnum.AUDIT.getCode().equals(vo.getStatus()) || AuditStatusEnum.OVER.getCode().equals(vo.getStatus())) {
                    bool = Boolean.TRUE;
                    break;
                }
            }
            if (bool) {
                return RespJson.error("刪除的数据包含已审核或已终止的单据,请刷新再删除!");
            } else {
                purchaseActivityService.delPurchaseActivityAndDetail(ids);
                return RespJson.success();
            }
        } catch (Exception e) {
            LOG.error("删除采购促销单据失败!", e);
            return RespJson.error("删除采购促销单据失败!");
        }
    }

    @RequestMapping(value = "/over", method = RequestMethod.POST)
    public RespJson over(String formId) {
        try {
            PurchaseActivityVo vo = purchaseActivityService.getPurchaseActivityById(formId);
            if (DisabledEnum.YES.getIndex() == Integer.valueOf(vo.getDisabled())) {
                return RespJson.error("该采购促销单已被删除,无法终止!");
            } else if (AuditStatusEnum.UNAUDIT.getCode().equals(vo.getStatus())) {
                return RespJson.error("该采购促销单未审核,无法终止!");
            } else {
                vo = new PurchaseActivityVo();
                vo.setId(formId);
                vo.setStatus(AuditStatusEnum.OVER.getCode());
                vo.setUpdateTime(new Date());
                vo.setUpdateUserId(getCurrUserId());
                purchaseActivityService.updatePurchaseActivity(vo);
                return RespJson.success();
            }
        } catch (Exception e) {
            LOG.error("终止采购促销单失败!", e);
            return RespJson.error("终止采购促销单失败!");
        }
    }

    @RequestMapping(value = "/audit", method = RequestMethod.POST)
    public RespJson audit(String formId) {
        try {
            PurchaseActivityVo vo = purchaseActivityService.getPurchaseActivityById(formId);
            if (DisabledEnum.YES.getIndex() == Integer.valueOf(vo.getDisabled())) {
                return RespJson.error("该采购促销单已被删除,无法审核!");
            } else if (AuditStatusEnum.OVER.getCode().equals(vo.getStatus())) {
                return RespJson.error("该采购促销已终止,无需审核!");
            } else {
                //vo = new PurchaseCostFormVo();
                //vo.setId(formId);
                vo.setStatus(AuditStatusEnum.AUDIT.getCode());
                vo.setValidTime(new Date());
                vo.setValidUserId(getCurrUserId());
                purchaseActivityService.updatePurchaseActivity(vo);
                return RespJson.success();
            }
        } catch (Exception e) {
            LOG.error("审核采购促销失败!", e);
            return RespJson.error("审核采购促销失败!");
        }
    }

    @RequestMapping(value = "/export/list", method = RequestMethod.POST)
    public RespJson exportList(HttpServletResponse response, PurchaseActivityVo vo) {
        RespJson resp = RespJson.success();
        try {
            List<PurchaseActivityVo> purchaseActivityVos = purchaseActivityService.getPurchaseActivityLists(vo);
            String fileName = "采购促销单_" + DateUtils.getCurrSmallStr();
            String templateName = ExportExcelConstant.PURCHASE_ACTIVITYL_FORM;
            exportListForXLSX(response, purchaseActivityVos, fileName, templateName);
        } catch (Exception e) {
            LOG.error("采购成本调整明细导出异常!", e);
            resp = RespJson.error("采购成本调整明细导出异常!");
        }
        return resp;
    }

    @RequestMapping(value = "/export/detail/{id}", method = RequestMethod.POST)
    public RespJson exportList(HttpServletResponse response, @PathVariable(value = "id") String id) {
        RespJson resp = RespJson.success();
        try {
            PurchaseActivityDetailVo vo = new PurchaseActivityDetailVo();
            vo.setFormId(id);
            List<PurchaseActivityDetailVo> purchaseActivityVos = purchaseActivityService.getPurchaseActivityDetailLists(vo);
            String fileName = "采购促销单明细_" + DateUtils.getCurrSmallStr();
            String templateName = ExportExcelConstant.PURCHASE_ACTIVITYL_FORM_DETAIL;
            exportListForXLSX(response, purchaseActivityVos, fileName, templateName);
        } catch (Exception e) {
            LOG.error("采购成本调整明细导出异常!", e);
            resp = RespJson.error("采购成本调整明细导出异常!");
        }
        return resp;
    }

    @RequestMapping(value = "copy/{id}")
    public ModelAndView copy(@PathVariable(value = "id") String id) {
        Map<String, Object> model = Maps.newHashMap();
        model.put("form", purchaseActivityService.getPurchaseActivityById(id));
        return new ModelAndView("form/purchase/activity/addActivity", model);
    }

    @RequestMapping(value = "importList")
    @ResponseBody
    public RespJson importList(@RequestParam("file") MultipartFile file, String type, String branchIds, String branchName, String supplierId) {
        RespJson respJson = RespJson.success();
        try {
            if (file.isEmpty()) {
                return RespJson.argumentError("文件为空");
            }

            if (StringUtils.isBlank(type)) {
                return RespJson.argumentError("导入类型为空");
            }

            if (StringUtils.isBlank(branchIds)) {
                return RespJson.argumentError("机构Id数据为空");
            }

            // 文件流
            InputStream is = file.getInputStream();

            // 获取文件名
            String fileName = file.getOriginalFilename();

            SysUser user = UserUtil.getCurrentUser();

            //构建导入字段信息
            String[] field = buildFields(type);
            if (field == null) {
                return RespJson.argumentError("导入类型错误！");
            }

            List<String> branchIdList = Lists.newArrayList();

            if (branchIds.contains(",") && branchIds.contains("所有")) {
                String[] branches = StringUtils.splitByWholeSeparatorPreserveAllTokens(branchIds, ",");
                String[] branchNames = StringUtils.splitByWholeSeparatorPreserveAllTokens(branchName, ",");
                for (int i = 0, length = branchNames.length; i < length; ++i) {
                    if (StringUtils.endsWith(branchNames[i], "所有")) {
                        List<Branches> queryBranchIds = branchesService.queryChildById(branches[i]);
                        for (Branches branches1 : queryBranchIds) {
                            branchIdList.add(branches1.getBranchesId());
                        }
                    } else {
                        branchIdList.add(branches[i]);
                    }
                }
                //branchId = branches[index];
            } else if (branchIds.contains(",")) {
                String[] branches = StringUtils.splitByWholeSeparatorPreserveAllTokens(branchIds, ",");
                for (String id : branches) {
                    branchIdList.add(id);
                }
            } else {
                branchIdList.add(branchIds);
            }


            GoodsSelectImportVo<GoodsSelect> vo = goodsSelectImportComponent.importGoods(fileName, is, field,
                    new ActivityGoodsImportVo(), branchIdList, user.getId(), type, "/purchase/activity/downloadErrorFile",
                    new GoodsSelectImportBusinessValid() {

                        @Override
                        public void businessValid(List<JSONObject> excelListSuccessData, String[] excelField) {
                            for (JSONObject obj : excelListSuccessData) {
                                try {
                                    String newPurPrice = obj.getString("newPurPrice");
                                    Double.parseDouble(newPurPrice);
                                } catch (Exception e) {
                                    obj.element("newPurPrice", 0);
                                }
                            }
                        }

                        @Override
                        public void formatter(List<? extends GoodsSelect> list, List<JSONObject> excelListSuccessData,
                                              List<JSONObject> excelListErrorData) {
                            for (GoodsSelect objGoods : list) {
                                ActivityGoodsImportVo obj = (ActivityGoodsImportVo) objGoods;

                                BigDecimal price = obj.getNewPurPrice();
                                if (price == null) {
                                    obj.setPrice(obj.getNewPurPrice());
                                }
                            }
                        }

                        /**
                         * (non-Javadoc)
                         * @see com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid#errorDataFormatter(java.util.List)
                         */
                        @Override
                        public void errorDataFormatter(List<JSONObject> list) {

                        }
                    }, supplierId);
            vo.setErrorFileUrl(vo.getErrorFileUrl());
            respJson.put("importInfo", vo);

        } catch (IOException e) {
            respJson = RespJson.error("读取Excel流异常");
            LOG.error("读取Excel流异常:", e);
        } catch (Exception e) {
            respJson = RespJson.error("导入发生异常");
            LOG.error("导入商品异常:", e);
        }
        return respJson;

    }

    private String[] buildFields(String type) {
        String[] field = null;
        if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {// 货号
            field = new String[]{"skuCode", "newPurPrice"};
        } else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {// 条码
            field = new String[]{"barCode", "newPurPrice"};

        }
        return field;
    }


    @RequestMapping(value = "downloadErrorFile")
    public void downloadErrorFile(String code, String type, HttpServletResponse response) {
        String reportFileName = "错误数据";
        String[] headers = null;
        String[] columns = null;
        if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {// 货号
            columns = new String[]{"skuCode", "newPurPrice"};
            headers = new String[]{"货号", "活动进货价"};
        } else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {// 条码
            columns = new String[]{"barCode", "newPurPrice"};
            headers = new String[]{"条码", "活动进货价"};
        }
        goodsSelectImportComponent.downloadErrorFile(code, reportFileName, headers, columns, response);
    }


    @RequestMapping(value = "exportTemp")
    public void exportTemp(HttpServletResponse response, String type) {
        try {
            String fileName = "";
            String templateName = "";
            if (GoodsSelectImportHandle.TYPE_SKU_CODE.equals(type)) {// 货号
                templateName = ExportExcelConstant.PURCHASE_ACTIVITYL_GOODS_SKUCODE_TEMPLATE;
                fileName = "采购促销活动货号导入模板";

            } else if (GoodsSelectImportHandle.TYPE_BAR_CODE.equals(type)) {// 条码
                templateName = ExportExcelConstant.PURCHASE_ACTIVITYL_GOODS_BARCODE_TEMPLATE;
                fileName = "采购促销活动条码导入模板";
            }

            if (StringUtils.isNotBlank(fileName) && StringUtils.isNotBlank(templateName)) {
                exportListForXLSX(response, null, fileName, templateName);
            }
        } catch (Exception e) {
            LOG.error("导出采购促销活动导入模板异常", e);
        }
    }
}
