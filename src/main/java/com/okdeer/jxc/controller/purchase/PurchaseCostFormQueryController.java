/**
 * @Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 * @project okdeer
 * @Package: com.okdeer.jxc.controller.purchase
 * @author songwj
 * @date 2017年09月05 10:44
 * 注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.controller.purchase;

import com.google.common.collect.Maps;
import com.okdeer.jxc.controller.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

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

    @RequestMapping(value = "/list")
    public ModelAndView list() {
        Map<String, String> model = Maps.newHashMap();
        return new ModelAndView("form/purchase/cost/reportList", model);
    }

}
