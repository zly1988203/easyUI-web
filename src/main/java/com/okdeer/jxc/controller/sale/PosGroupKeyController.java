/**
 * @Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 * @project okdeer
 * @Package: com.okdeer.jxc.controller.sale
 * @author songwj
 * @date 2017年08月16 18:37
 * 注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.controller.sale;

import com.google.common.collect.Maps;
import com.okdeer.jxc.controller.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
@RequestMapping("pos/group/key")
public class PosGroupKeyController extends BaseController<PosGroupKeyController> {

    @RequestMapping(value = "/list")
    public ModelAndView add() {
        Map<String, String> model = Maps.newHashMap();
        return new ModelAndView("sale/pos/group/keylist", model);
    }

}
