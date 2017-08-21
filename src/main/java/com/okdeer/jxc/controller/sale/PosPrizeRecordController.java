/**
 * @Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 * @project okdeer
 * @Package: com.okdeer.jxc.controller.sale
 * @author songwj
 * @date 2017年08月16 18:37
 * 注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.controller.sale;

import com.alibaba.dubbo.config.annotation.Reference;
import com.google.common.collect.Maps;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.pos.service.PosPrizeRecordService;
import com.okdeer.jxc.pos.vo.PosPrizeRecordVo;
import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 *
 * @ClassName: PosAdFormController
 * @Description: TODO
 * @project okdeer
 * @author songwj
 * @date 2017年08月16 18:37
 * =================================================================================================
 *     Task ID            Date               Author           Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     V2.8          2017年08月16   songwj             TODO
 */
@RestController
@RequestMapping("pos/prize/record")
public class PosPrizeRecordController extends BaseController<PosPrizeRecordController> {

    /**
     * Logger for this class
     */
    private static final Logger logger = LoggerFactory.getLogger(PosPrizeRecordController.class);

    @Reference(version = "1.0.0", check = false)
    PosPrizeRecordService posPrizeRecordService;

    @RequestMapping(value = "/list")
    public ModelAndView add() {
        Map<String, String> model = Maps.newHashMap();
        return new ModelAndView("sale/pos/prize/recordlist", model);
    }

    @RequestMapping(value = "/load/list")
    public PageUtils<PosPrizeRecordVo> posPrizeRecordList(PosPrizeRecordVo vo,
                                       @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
                                       @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        PageUtils<PosPrizeRecordVo> suppliers;
        try {
            vo.setPageNumber(pageNumber);
            vo.setPageSize(pageSize);
            suppliers = posPrizeRecordService.getPosPrizeRecordPageList(vo);
            //return RespJson.success(suppliers);
            return suppliers;
        } catch (Exception e) {
            logger.error("加载会员活动领取记录失败！", e);
            //return RespJson.error();
        }
        return PageUtils.emptyPage();
    }

    @RequestMapping(value = "/exports")
    public RespJson export(PosPrizeRecordVo vo, HttpServletResponse response) {
        try {
            // 默认当前机构
            /*if (StringUtils.isBlank(vo.getBranchId())) {
                vo.setBranchId(getCurrBranchId());
            }*/
            List<PosPrizeRecordVo> list = posPrizeRecordService.getPosPrizeRecordList(vo);
            if (CollectionUtils.isNotEmpty(list)) {
                String fileName = "会员活动领取记录详情" + "_" + DateUtils.getCurrSmallStr();
                String templateName = ExportExcelConstant.POS_PRIZE_RECORD_DETAIL;
                exportListForXLSX(response, list, fileName, templateName);
            } else {
                return RespJson.error("无数据可导");
            }
        } catch (Exception e) {
            logger.error("会员活动领取记录导出异常:", e);
            RespJson json = RespJson.error("会员活动领取记录导出异常!");
            return json;
        }
        return null;
    }


}
