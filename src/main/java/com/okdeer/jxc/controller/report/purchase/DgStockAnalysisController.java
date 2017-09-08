package com.okdeer.jxc.controller.report.purchase;

import java.util.ArrayList;
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
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.purchase.qo.FormQueryQo;
import com.okdeer.jxc.form.purchase.service.PurchaseReportService;
import com.okdeer.jxc.form.purchase.vo.DgStockAnalysisVo;

/***
 * 
 * ClassName: DgStockAnalysisController 
 * @Description: 东莞大仓补货分析
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
public class DgStockAnalysisController extends BaseController<PurchaseReportController> {

    /**
     * @Fields purchaseReportService : 采购报表service
     */
    @Reference(version = "1.0.0", check = false)
    private PurchaseReportService purchaseReportService;

    /***
     * 
     * @Description: 页面跳转
     * @return String
     * @author xuyq
     * @date 2017年9月5日
     */
    @RequestMapping("/dgStockAnalysis")
    public String dgStockAnalysis() {
        return "report/purchase/dgStockAnalysis";
    }

    /**
     * 
     * @Description: 东莞大仓补货分析报表数据查询
     * @param qo 查询条件
     * @param pageNumber
     * @param pageSize
     * @return PageUtils
     * @author xuyq
     * @date 2017年9月5日
     */
    @RequestMapping(value = "getDgStockAnalysisList", method = RequestMethod.POST)
    @ResponseBody
    public PageUtils<DgStockAnalysisVo> getDgStockAnalysisList(FormQueryQo qo,
            @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
            @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        try {
            LOG.debug("东莞大仓补货分析报表数据查询：{}", qo);
            if (StringUtils.isEmpty(qo.getBranchName())) {
                qo.setBranchCompleCode(getCurrBranchCompleCode());
            }
            qo.setPageNumber(pageNumber);
            qo.setPageSize(pageSize);
            qo.setBranchId(Constant.DG_BRANCH_ID);
            if (qo.getEndTime() != null) {
                Date time = DateUtils.getNextDay(qo.getEndTime());
                qo.setEndTime(time);
            }

            PageUtils<DgStockAnalysisVo> list = purchaseReportService.getDgStockAnalysisPageList(qo);
            // 2、查询合计
            DgStockAnalysisVo vo = purchaseReportService.getDgStockAnalysisListSum(qo);
            List<DgStockAnalysisVo> footer = new ArrayList<>();
            footer.add(vo);
            list.setFooter(footer);
            // 过滤数据权限字段
            cleanAccessData(list);
            return list;

        } catch (Exception e) {
            LOG.error("东莞大仓补货分析报表数据查询异常:{}", e);
        }
        return PageUtils.emptyPage();
    }

    /**
     * 
     * @Description: 导出
     * @param response
     * @param qo
     * @param pageNumber
     * @param pageSize
     * @author xuyq
     * @date 2017年9月5日
     */
    @RequestMapping(value = "exportDgStockAnalysis")
    public void exportDgStockAnalysis(HttpServletResponse response, FormQueryQo qo,
            @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
            @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        LOG.debug("东莞大仓补货分析报表导出:{}", qo);
        try {
            if (qo.getEndTime() != null) {
                Date time = DateUtils.getNextDay(qo.getEndTime());
                qo.setEndTime(time);
            }
            qo.setBranchId(Constant.DG_BRANCH_ID);
            List<DgStockAnalysisVo> exportList = purchaseReportService.getDgStockAnalysisList(qo);
            /*if(CollectionUtils.isNotEmpty(exportList)){
                // 2、查询合计
                DgStockAnalysisVo vo = purchaseReportService.getDgStockAnalysisListSum(qo);
                exportList.add(vo);
            }*/
            // 导出文件名称，不包括后缀名
            String fileName = "东莞大仓补货分析" + "_" + DateUtils.getCurrSmallStr();
            // 模板名称，包括后缀名
            String templateName = ExportExcelConstant.DG_STOCK_ANALYSIS;
            // 导出Excel
            cleanAccessData(exportList);
            exportListForXLSX(response, exportList, fileName, templateName);
        } catch (Exception e) {
            LOG.error("东莞大仓补货分析导出:{}", e);
        }
    }
}
