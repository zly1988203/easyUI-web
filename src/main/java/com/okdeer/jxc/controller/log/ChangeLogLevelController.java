/**
 * @Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 * @project okdeer
 * @Package: com.okdeer.jxc.controller.log
 * @author songwj
 * @date 2017年07月31 16:17
 * 注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.controller.log;

import com.alibaba.dubbo.config.annotation.Reference;
import com.google.common.collect.Maps;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.log.service.LogService;
import com.okdeer.retail.common.util.Log4jUtils;
import com.okdeer.retail.facade.report.facade.LogFacade;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.authz.annotation.RequiresUser;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

import static sun.misc.Version.print;


/**
 *
 * @ClassName: ChangeLogLevelController
 * @Description: 动态改变日志级别控制器
 * @project okdeer
 * @author songwj
 * @date 2017年07月31 16:17
 * =================================================================================================
 *     Task ID            Date               Author           Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     V2.7          2017年07月31   songwj             TODO
 */
@RestController
@RequestMapping("/log4j")
public class ChangeLogLevelController {

    @Reference(version = "1.0.0", check = false)
    private LogService logService;

    @Reference(version = "1.0.0", check = false)
    private LogFacade logFacade;

    @Reference(version = "1.0.0", check = false)
    private com.okdeer.retail.facade.stock.facade.LogFacade stockLogFacade;

    @RequestMapping(value = "")
    @RequiresRoles("jxc_admin_role")
    public ModelAndView list() {
        return new ModelAndView("/log/list", new HashMap<String, String>() {
            {
                put("level",Log4jUtils.getLoggerLevel());
            }
        });
    }

    @RequestMapping(value = "/level", method = RequestMethod.POST)
    @RequiresRoles("jxc_admin_role")
    public Map<String,String> level(String system){
        String level ="";
        switch (system){
            case "retail-service":
                level=logService.getLoggerLevel();
                break;
            case "pos":
                break;
            case "m-pos":
                break;
            case "retail-service-stock":
                level=stockLogFacade.getLoggerLevel();
                break;
            case "retail-service-report":
                level=logFacade.getLoggerLevel();
                break;
            default:
                level=Log4jUtils.getLoggerLevel();
        }
        Map<String,String> maps = Maps.newHashMap();
        maps.put("level",level);
        return maps;
    }

    @RequestMapping(value = "/change", method = RequestMethod.POST)
    @RequiresRoles("jxc_admin_role")
    public RespJson change(String system,String loggerName,String loggerLevel){
        try {
            switch (system){
                case "retail-service":
                    if (StringUtils.isNotBlank(loggerName)) {
                        logService.changeLoggerLevel(loggerName, loggerLevel);
                    }else {
                        logService.changeLoggerLevel(loggerLevel);
                    }
                    break;
                case "pos":
                    break;
                case "m-pos":
                    break;
                case "retail-service-stock":
                    if (StringUtils.isNotBlank(loggerName)) {
                        stockLogFacade.changeLoggerLevel(loggerName, loggerLevel);
                    }else {
                        stockLogFacade.changeLoggerLevel(loggerLevel);
                    }
                    break;
                case "retail-service-report":
                    if (StringUtils.isNotBlank(loggerName)) {
                        logFacade.changeLoggerLevel(loggerName, loggerLevel);
                    }else {
                        logFacade.changeLoggerLevel(loggerLevel);
                    }
                    break;
                default:
                    if (StringUtils.isNotBlank(loggerName)) {
                        Log4jUtils.changeLoggerLevel(loggerName, loggerLevel);
                    }else {
                        Log4jUtils.changeLoggerLevel(loggerLevel);
                    }
            }

            return RespJson.success();
        }catch (Exception e){
            return RespJson.error();
        }
    }
}
