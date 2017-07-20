/**
 * @Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 * @project okdeer-jxc-
 * @Package: com.okdeer.jxc.controller.report.supplier
 * @author songwj
 * @date 2017年07月14 17:18
 * 注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.controller.report.supplier;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.PrintConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.print.JasperHelper;
import com.okdeer.retail.common.page.PageUtils;
import com.okdeer.retail.facade.report.entity.SupplierStock;
import com.okdeer.retail.facade.report.facade.SupplierStockFacade;
import com.okdeer.retail.facade.report.qo.SupplierStockQo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

/**
 *
 * @ClassName: SupplierStockReportController
 * @Description: 供应商进货报表
 * @project okdeer-jxc-
 * @author songwj
 * @date 2017年07月14 17:18
 * =================================================================================================
 *     Task ID            Date               Author           Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     V2.7         2017年07月14   songwj             TODO
 */
@RestController
@RequestMapping("/report/supplier/stock")
public class SupplierStockReportController extends BaseController<SupplierStockReportController> {

    @Reference(version = "1.0.0", check = false)
    private SupplierStockFacade supplierStockFacade;

    @RequestMapping(value = "")
    public ModelAndView list() {
        return new ModelAndView("/report/supplier/stocklist");
    }

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public PageUtils<SupplierStock> getReportList(SupplierStockQo vo,
                                                  @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
                                                  @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        //Optional<SupplierStockQo> optional = Optional.ofNullable(vo);
        //vo = optional.orElse(new SupplierStockQo());
        vo.setPageNum(pageNumber);
        vo.setPageSize(pageSize);
        if(StringUtils.isBlank(vo.getBranchCompleCode())){
            vo.setBranchCode(getCurrBranchCompleCode());
        }else{
            vo.setBranchCode(vo.getBranchCompleCode());
        }
        if (StringUtils.isNotBlank(vo.getStartTime())) {
            PageUtils<SupplierStock> pageUtils = supplierStockFacade.getSupplierStocks(vo);

            if(pageUtils!=null){
               SupplierStock reportVo = supplierStockFacade.sumSupplierStocks(vo);
                if(reportVo!=null){
                    reportVo.setSupplierCode("SUM");
                    pageUtils.setFooter(new ArrayList<SupplierStock>(Arrays.asList(reportVo)));
                }
                // 过滤数据权限字段
                //cleanAccessData(pageUtils);
                return pageUtils;
            }
        }
        return PageUtils.emptyPage();
    }

    @RequestMapping(value = "/export/list", method = RequestMethod.POST)
    public RespJson exportList(HttpServletResponse response, SupplierStockQo vo) {
        RespJson resp = RespJson.success();
        //Optional<SupplierStockQo> optional = Optional.ofNullable(vo);
        //vo = optional.orElse(new SupplierStockQo());

        if(StringUtils.isBlank(vo.getBranchCompleCode())){
            vo.setBranchCode(getCurrBranchCompleCode());
        }else{
            vo.setBranchCode(vo.getBranchCompleCode());
        }
        if (StringUtils.isNotBlank(vo.getStartTime())) {
            List<SupplierStock> exportList = supplierStockFacade.exportSupplierStocks(vo);
            // 过滤数据权限字段
            //cleanAccessData(exportList);
            String fileName = "供应商进货报表_" + DateUtils.getCurrSmallStr();
            String templateName = ExportExcelConstant.SUPPLIER_STOCK_REPORT;
            exportListForXLSX(response, exportList, fileName, templateName);
        }else {
            resp = RespJson.error();
        }
        return resp;
    }

    @RequestMapping(value = "/print", method = RequestMethod.GET)
    public String printReport(SupplierStockQo vo, HttpServletResponse response, HttpServletRequest request) {
        //Optional<SupplierStockQo> optional = Optional.ofNullable(vo);
        //vo = optional.orElse(new SupplierStockQo());
        vo.setPageNum(Integer.valueOf(PAGE_NO));
        vo.setPageSize(PrintConstant.PRINT_MAX_LIMIT);
        // 默认当前机构
        if(StringUtils.isBlank(vo.getBranchCompleCode())){
            vo.setBranchCode(getCurrBranchCompleCode());
        }else{
            vo.setBranchCode(vo.getBranchCompleCode());
        }
        if (StringUtils.isNotBlank(vo.getStartTime())) {
            List<SupplierStock> exportList = supplierStockFacade.exportSupplierStocks(vo);
            // 过滤数据权限字段
            //cleanAccessData(exportList);
            if (exportList.size() > PrintConstant.PRINT_MAX_ROW) {
                return "<script>alert('打印最大行数不能超过3000行');top.closeTab();</script>";
            }
            String path = PrintConstant.SUPPLIER_STOCK_REPORT;
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("startDate", vo.getStartTime());
            map.put("endDate", vo.getStartTime());
            map.put("printName", getCurrentUser().getUserName());
            JasperHelper.exportmain(request, response, map, JasperHelper.PDF_TYPE, path, exportList, "");
        }
        return null;
    }
}
