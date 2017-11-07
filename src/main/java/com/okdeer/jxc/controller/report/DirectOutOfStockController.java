/**
 * @Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 * @project okdeer
 * @Package: com.okdeer.jxc.controller.report
 * @author songwj
 * @date 2017年11月07 17:07
 * 注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.controller.report;

import com.google.common.collect.Maps;
import com.okdeer.jxc.common.report.ReportService;
import com.okdeer.jxc.controller.common.ReportController;
import com.okdeer.retail.common.report.DataRecord;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @author songwj
 * @ClassName: DirectOutOfStockController
 * @Description: TODO
 * @project okdeer
 * @date 2017年11月07 17:07
 * =================================================================================================
 * Task ID            Date               Author           Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * V2.9.4          2017年11月07   songwj             TODO
 */
@RestController
@RequestMapping("report/direct/outOfStock")
public class DirectOutOfStockController extends ReportController {

    @RequestMapping("/view")
    public ModelAndView view() {
        Map<String, String> map = Maps.newHashMap();
        map.put("branchId", getCurrBranchId());
        return new ModelAndView("report/direct/outOfStock", map);
    }

    @Override
    public ReportService getReportService() {
        return null;
    }

    @Override
    public Map<String, Object> getParam(HttpServletRequest request) {
        return null;
    }

    /**
     * @return
     * @Description: 价格权限字段过滤Map集合 <权限名称， 权限字段，多个以','分隔>
     * @author liwb
     * @date 2017年7月20日
     */
    @Override
    public Map<String, String> getPriceAccess() {
        return null;
    }

    @Override
    public String getFileName() {
        return null;
    }

    @Override
    public String[] getHeaders() {
        return new String[0];
    }

    @Override
    public String[] getColumns() {
        return new String[0];
    }

    @Override
    public void formatter(DataRecord dataRecord) {

    }
}
