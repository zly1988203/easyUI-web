/** 
 *@Project: okdeer-jxc-web 
 *@Author: lijy02
 *@Date: 2016年10月25日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report.purchase;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.purchase.po.PurchaseExpireFormPo;
import com.okdeer.jxc.form.purchase.qo.FormQueryQo;
import com.okdeer.jxc.form.purchase.service.PurchaseReportService;

/***
 * 
 * ClassName: PurchaseExpireFormController 
 * @Description: 采购订单供应商过期订单查询
 * @author xuyq
 * @date 2017年9月30日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("report/purchase")
public class PurchaseExpireFormController extends BaseController<PurchaseExpireFormController> {

    /**
     * @Fields purchaseReportService : 采购报表service
     */
    @Reference(version = "1.0.0", check = false)
    private PurchaseReportService purchaseReportService;

    /**
     * 
     * @Description: 采购订单供应商过期订单查询
     * @return String
     * @author xuyq
     * @date 2017年9月30日
     */
    @RequestMapping("/expireFormList")
    public String stateTrackList() {
        return "report/purchase/expireFormList";
    }

    /**
     * 
     * @Description: 采购订单供应商过期订单查询
     * @param qo 采购报表查询条件QO
     * @param pageNumber
     * @param pageSize
     * @return PageUtils
     * @author xuyq
     * @date 2017年9月30日
     */
    @RequestMapping(value = "getExpireFormList", method = RequestMethod.POST)
    @ResponseBody
    public PageUtils<PurchaseExpireFormPo> getExpireFormList(FormQueryQo qo,
            @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
            @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        try {
            if (StringUtils.isEmpty(qo.getBranchId())) {
                qo.setBranchCode(getCurrBranchCode());
            }
            qo.setPageNumber(pageNumber);
            qo.setPageSize(pageSize);
            if (qo.getEndTime() != null) {
                Date time = DateUtils.getNextDay(qo.getEndTime());
                qo.setEndTime(time);
            }

            LOG.debug("采购订单供应商过期订单查询：{}", qo);
            PageUtils<PurchaseExpireFormPo> list = purchaseReportService.getExpireFormPage(qo);
            // 过滤数据权限字段
            cleanAccessData(list);
            return list;

        } catch (Exception e) {
            LOG.error("采购订单供应商过期订单查询:{}", e);
        }
        return PageUtils.emptyPage();
    }

    /***
     * 
     * @Description: 采购订单供应商过期订单查询导出
     * @param response
     * @param qo 采购报表查询条件QO
     * @param pageNumber
     * @param pageSize
     * @author xuyq
     * @date 2017年9月30日
     */
    @RequestMapping(value = "exportExpireFormList")
    public void exportExpireFormList(HttpServletResponse response, FormQueryQo qo,
            @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
            @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        try {
            if (StringUtils.isEmpty(qo.getBranchId())) {
                qo.setBranchCode(getCurrBranchCode());
            }
            if (qo.getEndTime() != null) {
                Date time = DateUtils.getNextDay(qo.getEndTime());
                qo.setEndTime(time);
            }

            LOG.debug("采购订单供应商过期订单查询导出:{}", qo);
            List<PurchaseExpireFormPo> exportList = purchaseReportService.getExpireFormList(qo);
            // 导出文件名称，不包括后缀名
            String fileName = "供应商过期订单查询" + "_" + DateUtils.getCurrSmallStr();
            // 模板名称，包括后缀名
            String templateName = "";
            switch (qo.getSearchType()) {
                case "supplierTotal":
                    fileName += "-供应商汇总";
                    templateName = ExportExcelConstant.PUR_EXPIRE_FORM_BY_SUPPLIER;
                    break;
                case "formNoTotal":
                    fileName += "-单据汇总";
                    templateName = ExportExcelConstant.PUR_EXPIRE_FORM_BY_FORMNO;
                    break;
                default:
                    break;
            }
            // 导出Excel
            cleanAccessData(exportList);
            exportListForXLSX(response, exportList, fileName, templateName);
        } catch (Exception e) {
            LOG.error("采购订单供应商过期订单查询导出:{}", e);
        }
    }
}
