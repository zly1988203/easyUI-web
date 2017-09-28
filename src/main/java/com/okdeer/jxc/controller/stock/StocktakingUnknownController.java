/**
 * @Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 * @project okdeer-jxc-
 * @Package: com.okdeer.jxc.controller.stock
 * @author songwj
 * @date 2017年07月14 16:46
 * 注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.controller.stock;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.stock.entity.ImPdUnknownSKU;
import com.okdeer.jxc.stock.service.StocktakingOperateServiceApi;
import com.okdeer.jxc.stock.vo.StocktakingFormVo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @ClassName: StocktakingUnknownController
 * @Description: StocktakingUnknownController
 * @project okdeer-jxc-
 * @author songwj
 * @date 2017年07月14 16:46
 * =================================================================================================
 *     Task ID            Date               Author           Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     V2.7          2017年07月14   songwj             StocktakingUnknownController
 */
@RestController
@RequestMapping("/stocktaking/unknown/sku")
public class StocktakingUnknownController extends BaseController<StocktakingUnknownController> {

    @RequestMapping(value = "")
    public ModelAndView list() {
        return new ModelAndView("/stocktaking/unknown/skuList");
    }

    @Reference(version = "1.0.0", check = false)
    private StocktakingOperateServiceApi stocktakingOperateServiceApi;


    @RequestMapping(value = "/getStocktakingFormList", method = RequestMethod.POST)
    @ResponseBody
    public PageUtils<StocktakingFormVo> getStocktakingFormList(StocktakingFormVo vo,
                                                               @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
                                                               @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        try {
            vo.setPageNumber(pageNumber);
            vo.setPageSize(pageSize);
            // 结束日期延后一天
            if (vo.getEndTime() != null) {
                vo.setEndTime(DateUtils.getDayAfter(vo.getEndTime()));
            }
            LOG.debug(LogConstant.OUT_PARAM, vo);
            return stocktakingOperateServiceApi.getStocktakingFormUnknownList(vo);
        } catch (Exception e) {
            LOG.error("存货盘点查询列表信息异常:{}", e);
        }
        return PageUtils.emptyPage();
    }

    @RequestMapping(value = "/stocktakingFormView", method = RequestMethod.GET)
    public ModelAndView stocktakingFormView(String id, String report, HttpServletRequest request) {
        StocktakingFormVo formVo = stocktakingOperateServiceApi.getStocktakingFormById(id);
        request.setAttribute("stocktakingFormVo", formVo);
        request.setAttribute("close", report);
        return new ModelAndView("/stocktaking/unknown/skuView");
    }


    @RequestMapping(value = "/exportDetailList", method = RequestMethod.POST)
    @ResponseBody
    public RespJson exportPPDetailList(HttpServletResponse response, StocktakingFormVo vo) {
        String formId = vo.getId();
        String formNo = vo.getFormNo();

        LOG.debug("盘点详细列表导出参数：{}", formId);
        RespJson resp = RespJson.success();
        try {
            List<ImPdUnknownSKU> detailList = stocktakingOperateServiceApi.getStocktakingUnknownByFormId(formId);

            String fileName = formNo + "盘点未知商品详情" + DateUtils.getCurrSmallStr();
            String templateName = ExportExcelConstant.STOCKTAKING_UNKNOWN_DETAIL;
            exportListForXLSX(response, detailList, fileName, templateName);
        } catch (Exception e) {
            LOG.error("盘点详细列表导出异常：{}", e);
            resp = RespJson.error("盘点详细列表导出异常");
        }
        return resp;
    }

    @RequestMapping(value = "/stocktakingFormDetailList", method = RequestMethod.GET)
    @ResponseBody
    public List<ImPdUnknownSKU> stocktakingFormDetailList(String formId) {
        LOG.debug(LogConstant.OUT_PARAM, formId);
        List<ImPdUnknownSKU> detailList = new ArrayList<>();
        try {
            detailList = stocktakingOperateServiceApi.getStocktakingUnknownByFormId(formId);
        } catch (Exception e) {
            LOG.error("获取单据信息异常:{}", e);
        }
        return detailList;
    }

}
