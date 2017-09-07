/**
 * @Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 * @project okdeer
 * @Package: com.okdeer.jxc.controller.purchase
 * @author songwj
 * @date 2017年09月05 10:45
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
 * @ClassName: PurchaseActivityController
 * @Description: 采购促销活动单
 * @project okdeer
 * @author songwj
 * @date 2017年09月05 10:45
 * =================================================================================================
 *     Task ID            Date               Author           Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     V2.9          2017年09月05             songwj             采购促销活动单
 */
@RestController
@RequestMapping("purchase/activity")
public class PurchaseActivityController extends BaseController<PurchaseActivityController> {

    @RequestMapping(value = "/list")
    public ModelAndView list() {
        Map<String, String> model = Maps.newHashMap();
        return new ModelAndView("form/purchase/activity/activityList", model);
    }

        @RequestMapping(value = "/add")
        public ModelAndView add() {
            Map<String, String> model = Maps.newHashMap();
            return new ModelAndView("form/purchase/activity/addActivity", model);
        }

}
