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
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.pos.service.PosGroupKeyService;
import com.okdeer.jxc.pos.vo.PosGroupKeyVo;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

	@Reference(version = "1.0.0", check = false)
	PosGroupKeyService posGroupKeyService;

    @RequestMapping(value = "/list")
    public ModelAndView add() {
        Map<String, String> model = Maps.newHashMap();
        return new ModelAndView("sale/pos/group/keylist", model);
    }
    
	@RequestMapping(value = "/addGroup/{branchId}", method = RequestMethod.GET)
	public ModelAndView addGroup(@PathVariable(value = "branchId") String branchId) {
        String groupCode  = posGroupKeyService.getGroupCode(branchId);
        Map<String, String> model = Maps.newHashMap();
        model.put("groupCode",groupCode);
        model.put("branchId",branchId);
        return new ModelAndView("sale/pos/group/addGroup",model);
	}
	
	@RequestMapping(value = "/editGroup", method = RequestMethod.GET)
	public ModelAndView editGroup() {
		return new ModelAndView("sale/pos/group/editGroup");
	}

	@RequestMapping(value = "/save/group", method = RequestMethod.POST)
	public RespJson saveGroup(PosGroupKeyVo posGroupKey) {
    	try {
			posGroupKeyService.savePosGroupKey(posGroupKey);
			return RespJson.success();
		}catch (Exception e){
			LOG.error("保存分组失败!" ,e);
			return RespJson.error("保存分组失败!" );
		}
	}


}
