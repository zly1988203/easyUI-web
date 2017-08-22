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
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.pos.service.PosAdServiceApi;
import com.okdeer.jxc.pos.vo.PosAdFormVo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

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
@RequestMapping("pos/ad/form")
public class PosAdFormController extends BaseController<PosAdFormController> {

    @Reference(version = "1.0.0", check = false)
    private PosAdServiceApi posAdServiceApi;

    @RequestMapping(value = "/list")
    public ModelAndView list() {
        Map<String, String> model = Maps.newHashMap();
        return new ModelAndView("sale/pos/ad/adlist", model);
    }
    
    @RequestMapping(value = "/add")
    public ModelAndView add() {
        Map<String, String> model = Maps.newHashMap();
        return new ModelAndView("sale/pos/ad/addAd", model);
    }

    @RequestMapping(value = "edit/{id}")
    public ModelAndView edit(@PathVariable(value = "id")String id) {
        Map<String, Object> model = Maps.newHashMap();
        model.put("form",posAdServiceApi.getPosAdByFormId(id));
        return new ModelAndView("sale/pos/ad/editAd", model);
    }

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public PageUtils<PosAdFormVo> list(PosAdFormVo vo,
                                       @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
                                       @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
        try {
            vo.setPageNumber(pageNumber);
            vo.setPageSize(pageSize);
            PageUtils<PosAdFormVo> posWheelsurfFormVoPageUtils = this.posAdServiceApi.getPosAdList(vo);
            //return RespJson.success(posWheelsurfFormVoPageUtils);
            return posWheelsurfFormVoPageUtils;
        }catch (Exception e){
            LOG.error("获取POS客屏广告列表失败!" ,e);
            //return RespJson.error("获取POS客屏活动列表失败!" );
        }
        return PageUtils.emptyPage();
    }
}
