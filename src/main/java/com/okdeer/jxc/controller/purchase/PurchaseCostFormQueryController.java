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
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.purchase.service.PurchaseCostFormService;
import com.okdeer.jxc.form.purchase.vo.PurchaseCostFormDetailVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 *
 * @ClassName: PurchaseCostFormQueryController
 * @Description: 采购成本调价单查询
 * @project okdeer
 * @author songwj
 * @date 2017年09月05 10:44
 * =================================================================================================
 *     Task ID            Date               Author           Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     V2.9          2017年09月05             songwj             采购成本调价单查询
 */
@RestController
@RequestMapping("report/purchase/cost/form")
public class PurchaseCostFormQueryController extends BaseController<PurchaseCostFormQueryController> {

    @Reference(version = "1.0.0", check = false)
    private PurchaseCostFormService purchaseCostFormService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ModelAndView list() {
        Map<String, String> model = Maps.newHashMap();
        return new ModelAndView("form/purchase/cost/reportList", model);
    }

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public PageUtils<PurchaseCostFormDetailVo> list(PurchaseCostFormDetailVo vo,
                                                    @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
                                                    @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        try {
            vo.setPageNumber(pageNumber);
            vo.setPageSize(pageSize);
            if(StringUtils.isBlank(vo.getBranchId())){
                vo.setBranchId(getCurrBranchId());
            }
            PageUtils<PurchaseCostFormDetailVo> purchaseCostFormDetailPage = this.purchaseCostFormService.getPurchaseCostFormDetailPage(vo);
            return purchaseCostFormDetailPage;
        } catch (Exception e) {
            LOG.error("采购成本调价单查询列表失败!", e);
        }
        return PageUtils.emptyPage();
    }


    @RequestMapping(value = "/export/list", method = RequestMethod.POST)
    public RespJson exportList(HttpServletResponse response, PurchaseCostFormDetailVo vo) {
        RespJson resp = RespJson.success();
        if(StringUtils.isBlank(vo.getBranchId())){
            vo.setBranchId(getCurrBranchId());
        }
        try {
            if (vo.getStartTime()!=null&&vo.getEndTime()!=null) {
                List<PurchaseCostFormDetailVo> exportList = purchaseCostFormService.getPurchaseCostFormDetailList(vo);
                String fileName = "采购成本调整查询_" + DateUtils.getCurrSmallStr();
                String templateName = ExportExcelConstant.PURCHASE_COST_FORM;

                exportListForXLSX(response, exportList, fileName, templateName);
            } else {
                resp = RespJson.error();
            }
        }catch (Exception e){
            LOG.error("采购成本调整查询导出异常!",e);
            resp = RespJson.error("采购成本调整查询导出异常!");
        }
        return resp;
    }


}
