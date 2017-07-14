/**
 * @Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 * @project okdeer-jxc-
 * @Package: com.okdeer.jxc.controller.report.supplier
 * @author songwj
 * @date 2017年07月14 17:18
 * 注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.controller.report.store;

import com.okdeer.jxc.controller.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @ClassName: SupplierStockReportController
 * @Description: 门店销售报表
 * @project okdeer-jxc-
 * @author songwj
 * @date 2017年07月14 17:18
 * =================================================================================================
 *     Task ID            Date               Author           Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     V2.7         2017年07月14   songwj             TODO
 */
@RestController
@RequestMapping("/report/store/sell")
public class StoreSellReportController extends BaseController<StoreSellReportController> {

    @RequestMapping(value = "")
    public ModelAndView list() {
        return new ModelAndView("/report/store/selllist");
    }

}
