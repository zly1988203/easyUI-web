package com.okdeer.jxc.controller.report.purchase;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
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
import com.okdeer.jxc.form.purchase.qo.FormQueryQo;
import com.okdeer.jxc.form.purchase.service.PurchaseReportService;
import com.okdeer.jxc.form.purchase.vo.DeliverAndStockReportVo;

/**
 * 
 * ClassName: DeliverAndStockReportController 
 * @Description: 要货与库存报表
 * @author xuyq
 * @date 2017年9月5日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("report/purchase")
public class DeliverAndStockReportController extends BaseController<PurchaseReportController> {

    /**
     * @Fields purchaseReportService : 采购报表service
     */
    @Reference(version = "1.0.0", check = false)
    private PurchaseReportService purchaseReportService;

    /**
     * 
     * @Description: 页面跳转
     * @return String
     * @author xuyq
     * @date 2017年9月5日
     */
    @RequestMapping("/deliverAndStockReport")
    public String deliverAndStockReport() {
        return "report/purchase/deliverAndStockReport";
    }

    /***
     * 
     * @Description: 要货与库存报表数据查询
     * @param qo 要货与库存报表数据查询查询字段类
     * @param pageNumber
     * @param pageSize
     * @return PageUtils
     * @author xuyq
     * @date 2017年9月5日
     */
    @RequestMapping(value = "getDelAndStoReportList", method = RequestMethod.POST)
    @ResponseBody
    public PageUtils<DeliverAndStockReportVo> getDelAndStoReportList(FormQueryQo qo,
            @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
            @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        try {
            LOG.debug("要货与库存报表数据查询查询：{}", qo);
            qo.setPageNumber(pageNumber);
            qo.setPageSize(pageSize);
            if (qo.getEndTime() != null) {
                Date time = DateUtils.getNextDay(qo.getEndTime());
                qo.setEndTime(time);
            }

            PageUtils<DeliverAndStockReportVo> list = purchaseReportService.getDelAndStoReportPageList(qo);
            if(list !=null && CollectionUtils.isNotEmpty(list.getList())){
                // 2、查询合计
                DeliverAndStockReportVo vo = purchaseReportService.getDelAndStoReportListSum(qo);
                List<DeliverAndStockReportVo> footer = new ArrayList<>();
                footer.add(vo);
                list.setFooter(footer);
            }
            // 过滤数据权限字段
            cleanAccessData(list);
            return list;

        } catch (Exception e) {
            LOG.error("要货与库存报表数据查询异:{}", e);
        }
        return PageUtils.emptyPage();
    }

    /***
     * 
     * @Description: 导出
     * @param response
     * @param qo
     * @param pageNumber
     * @param pageSize
     * @author xuyq
     * @date 2017年9月5日
     */
    @RequestMapping(value = "exportDelAndStoReport")
    public void exportDelAndStoReport(HttpServletResponse response, FormQueryQo qo,
            @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
            @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        LOG.debug("要货与库存报表导出:{}", qo);
        try {
            if (qo.getEndTime() != null) {
                Date time = DateUtils.getNextDay(qo.getEndTime());
                qo.setEndTime(time);
            }

            List<DeliverAndStockReportVo> exportList = purchaseReportService.getDelAndStoReportList(qo);
            /*if(CollectionUtils.isNotEmpty(exportList)){
                // 2、查询合计
                DeliverAndStockReportVo vo = purchaseReportService.getDelAndStoReportListSum(qo);
                exportList.add(vo);
            }*/
            // 导出文件名称，不包括后缀名
            String fileName = "要货与库存报表" + "_" + DateUtils.getCurrSmallStr();
            // 模板名称，包括后缀名
            String templateName = ExportExcelConstant.DELIVER_AND_STOCK_REPORT;
            // 导出Excel
            cleanAccessData(exportList);
            exportListForXLSX(response, exportList, fileName, templateName);
        } catch (Exception e) {
            LOG.error("要货与库存报表导出:{}", e);
        }
    }
}
