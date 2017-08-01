/**
 * @Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 * @project okdeer-jxc-web
 * @Package: com.okdeer.jxc.controller.redis
 * @author songwj
 * @date 2017年08月01 11:05
 * 注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.controller.redis;

import com.alibaba.dubbo.config.annotation.Reference;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.retail.facade.stock.facade.RedisKeysManageFacade;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.authz.annotation.RequiresUser;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 *
 * @ClassName: RedisKeysManageController
 * @Description: 管理库存redis中存放的keys
 * @project okdeer-jxc-web
 * @author songwj
 * @date 2017年08月01 11:05
 * =================================================================================================
 *     Task ID            Date               Author           Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     V2.7          2017年08月01      songwj                   管理库存redis中存放的keys
 */
@RestController
@RequestMapping("/redis")
public class RedisKeysManageController {

    @Reference(version = "1.0.0", check = false)
    private RedisKeysManageFacade redisKeysManageFacade;

    @RequestMapping(value = "")
    @RequiresRoles("jxc_admin_role")
    public ModelAndView list() {
        return new ModelAndView("/redis/list");
    }

    @RequestMapping(value = "/list")
    @RequiresRoles("jxc_admin_role")
    public List<Map<String,Object>> getKeysList(String pattern){
        List<Map<String,Object>> list = Lists.newArrayList();
        Set<String> keys = redisKeysManageFacade.getKeys(pattern);
        Map<String,Object> map;
        for (String key : keys){
            map = Maps.newHashMap();
            map.put("key",key);
            long timeout = redisKeysManageFacade.ttlKey(key);
            map.put("timeout",timeout==-1?"永久":timeout);
            map.put("vale",redisKeysManageFacade.getVal(key));
            list.add(map);
        }
        return list;
    }

    @RequestMapping(value = "/del", method = RequestMethod.POST)
    @RequiresRoles("jxc_admin_role")
    public RespJson delete(String[] keys) {
        boolean bool = redisKeysManageFacade.delKeys(keys);
        return bool?RespJson.success():RespJson.error();
    }
}
