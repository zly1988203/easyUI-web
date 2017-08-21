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
import com.okdeer.jxc.common.utils.JsonMapper;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.pos.service.PosWheelsurfServiceApi;
import com.okdeer.jxc.pos.vo.PosWheelsurfFormDetailVo;
import com.okdeer.jxc.pos.vo.PosWheelsurfFormVo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Collections;
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
@RequestMapping("pos/wheelsurf/form")
public class PosWheelsurfFormController extends BaseController<PosWheelsurfFormController> {

	@Reference(version = "1.0.0", check = false)
	PosWheelsurfServiceApi posWheelsurfServiceApi;

    @RequestMapping(value = "/list")
    public ModelAndView list() {
        Map<String, String> model = Maps.newHashMap();
        return new ModelAndView("sale/pos/wheelsurf/wheelsurflist", model);
    }
    
	/**
	 * 跳转到新增页面
	 */
	@RequestMapping(value = "add")
	public ModelAndView add() {
		 Map<String, String> model = Maps.newHashMap();
		return new ModelAndView("sale/pos/wheelsurf/addWheelsurf",model);
	}

	@RequestMapping(value = "copy/{id}")
	public ModelAndView copy(@PathVariable(value = "id")String id) {
		Map<String, Object> model = Maps.newHashMap();
		model.put("form",posWheelsurfServiceApi.getPosWheelsurfByFormId(id));
		return new ModelAndView("sale/pos/wheelsurf/addWheelsurf",model);
	}

	/**
	 * 跳转到编辑页面
	 */
	@RequestMapping(value = "edit/{id}")
	public ModelAndView edit(@PathVariable(value = "id")String id) {
		try {
			Map<String, Object> model = Maps.newHashMap();
			model.put("form",posWheelsurfServiceApi.getPosWheelsurfByFormId(id));
			//ObjectMapper mapper = new ObjectMapper();
			//mapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
			//mapper.configure(JsonGenerator.Feature.QUOTE_FIELD_NAMES, false);
			//model.put("detail" , mapper.writeValueAsString(posWheelsurfServiceApi.getPosWheelsurfDetailList(id)));
			return new ModelAndView("sale/pos/wheelsurf/editWheelsurf",model);
		}catch (Exception e){
			LOG.error("编辑POS客屏活动失败!",e);
		}
		return new ModelAndView("sale/pos/wheelsurf/editWheelsurf");
	}

	@RequestMapping(value = "edit/detail/{id}")
	public Map<String, List<PosWheelsurfFormDetailVo>> editDetail(@PathVariable(value = "id")String id) {
		try {
			Map<String, List<PosWheelsurfFormDetailVo>> model = Maps.newHashMap();
			model.put("detail" ,posWheelsurfServiceApi.getPosWheelsurfDetailList(id));
			return model;
		}catch (Exception e){
			LOG.error("编辑POS客屏活动失败!",e);
		}
		return Collections.emptyMap();
	}

	@RequestMapping(value = "/list", method = RequestMethod.POST)
	public PageUtils<PosWheelsurfFormVo> list(PosWheelsurfFormVo vo,
						 @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
						 @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			PageUtils<PosWheelsurfFormVo> posWheelsurfFormVoPageUtils = this.posWheelsurfServiceApi.getPosWheelsurfList(vo);
			//return RespJson.success(posWheelsurfFormVoPageUtils);
			return posWheelsurfFormVoPageUtils;
		}catch (Exception e){
			LOG.error("获取POS客屏活动列表失败!" ,e);
			//return RespJson.error("获取POS客屏活动列表失败!" );
		}
		return PageUtils.emptyPage();
	}

	@RequestMapping(value = "/del/{id}", method = RequestMethod.POST)
	public RespJson del(@PathVariable(value = "id")String id) {
		try {
			posWheelsurfServiceApi.delPosWheelsurfFormAndDetail(id);
			return RespJson.success();
		}catch (Exception e){
			LOG.error("删除POS客屏活动失败!" ,e);
			return RespJson.error("删除POS客屏活动失败!" );
		}
	}

	@RequestMapping(value = "/over", method = RequestMethod.POST)
	public RespJson over(String formId){
		try {
			posWheelsurfServiceApi.updatePosWheelsurfForm(formId,2);
			return RespJson.success();
		}catch (Exception e){
			LOG.error("终止POS客屏活动失败!" ,e);
			return RespJson.error("终止POS客屏活动失败!" );
		}
	}

	@RequestMapping(value = "/audit", method = RequestMethod.POST)
	public RespJson audit(String formId){
		try {
			posWheelsurfServiceApi.updatePosWheelsurfForm(formId,1);
			return RespJson.success();
		}catch (Exception e){
			LOG.error("审核POS客屏活动失败!" ,e);
			return RespJson.error("审核POS客屏活动失败!" );
		}
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public RespJson saveGoods(HttpServletRequest request) {
		try {

			List<PosWheelsurfFormDetailVo> posGroupKeys = JsonMapper.nonDefaultMapper().fromJson(request.getParameter("list"),JsonMapper.nonDefaultMapper().contructCollectionType(ArrayList.class, PosWheelsurfFormDetailVo.class));
			PosWheelsurfFormVo vo = JsonMapper.nonDefaultMapper().fromJson(request.getParameter("formObj"),PosWheelsurfFormVo.class);
			posWheelsurfServiceApi.updatePosWheelsurfFormAndDetail(vo,posGroupKeys);
			return RespJson.success();
		}catch (Exception e){
			LOG.error("保存POS客屏活动失败!" ,e);
			return RespJson.error("保存POS客屏活动失败!" );
		}
	}
}
