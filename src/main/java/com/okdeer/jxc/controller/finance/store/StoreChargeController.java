/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年5月22日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.finance.store;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.common.utils.gson.GsonUtils;
import com.okdeer.jxc.common.vo.UpdateStatusVo;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.enums.FormStatus;
import com.okdeer.jxc.settle.store.po.StoreChargePo;
import com.okdeer.jxc.settle.store.qo.StoreChargeQo;
import com.okdeer.jxc.settle.store.service.StoreChargeService;
import com.okdeer.jxc.settle.store.vo.StoreChargeVo;

/**
 * ClassName: StoreChargeController 
 * @Description: 门店费用登记Controller
 * @author liwb
 * @date 2017年5月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@RestController
@RequestMapping("finance/storeCharge")
public class StoreChargeController extends BaseController<StoreChargeController> {

	@Reference(version = "1.0.0", check = false)
	private StoreChargeService storeChargeService;

	@RequestMapping(value = "toManager")
	public ModelAndView toManager() {
		return new ModelAndView("finance/storeCharge/storeChargeList");
	}

	@RequestMapping(value = "toAdd")
	public ModelAndView toAdd() {
		return new ModelAndView("finance/storeCharge/storeChargeAdd");
	}

	@RequestMapping(value = "toEdit")
	public ModelAndView toEdit(String formId) {

		if (StringUtils.isBlank(formId)) {
			return super.toErrorPage("单据ID为空");
		}
		
		StoreChargePo po = storeChargeService.getStoreChargeById(formId);
		
		ModelAndView mv = new ModelAndView();
		mv.addObject("po", po);
		
		// 待审核
		if(FormStatus.WAIT_CHECK.getValue().equals(po.getAuditStatus())){
			mv.setViewName("finance/storeCharge/storeChargeEdit");
		}
		// 已审核
		else if(FormStatus.WAIT_CHECK.getValue().equals(po.getAuditStatus())){
			mv.setViewName("finance/storeCharge/storeChargeView");
		}
		
		return mv;
	}
	
	@RequestMapping(value = "getStoreChargeList", method = RequestMethod.POST)
	public PageUtils<StoreChargePo> getStoreChargeList(StoreChargeQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {

		qo.setPageNumber(pageNumber);
		qo.setPageSize(pageSize);
		// 默认当前机构
		if(StringUtils.isBlank(qo.getBranchCompleCode())){
			qo.setBranchCompleCode(super.getCurrBranchCompleCode());
		}
		
		qo.setEndTime(DateUtils.getDayAfter(qo.getEndTime()));
				
		LOG.debug("查询门店费用条件：{}", qo);

		try {

			return storeChargeService.getStoreChargeForPage(qo);
		} catch (Exception e) {
			LOG.error("分页查询门店费用异常:", e);
		}
		return PageUtils.emptyPage();
	}
	
	
	@RequestMapping(value = "addStoreCharge", method = RequestMethod.POST)
	public RespJson addStoreCharge(@RequestBody String jsonText) {
		LOG.debug("新增门店费用参数：{}", jsonText);
		try {

			StoreChargeVo vo = GsonUtils.fromJson(jsonText, StoreChargeVo.class);
			vo.setCreateUserId(super.getCurrUserId());
			
			return storeChargeService.addStoreCharge(vo);

		} catch (Exception e) {
			LOG.error("新增门店费用失败：", e);
		}
		return RespJson.error();
	}
	
	
	@RequestMapping(value = "updateStoreCharge", method = RequestMethod.POST)
	public RespJson updateStoreCharge(@RequestBody String jsonText) {
		LOG.debug("修改门店费用参数：{}", jsonText);
		try {
			
			StoreChargeVo vo = GsonUtils.fromJson(jsonText, StoreChargeVo.class);
			vo.setUpdateUserId(super.getCurrUserId());
			
			return storeChargeService.updateStoreCharge(vo);
			
		} catch (Exception e) {
			LOG.error("修改门店费用失败：", e);
		}
		return RespJson.error();
	}
	
	
	@RequestMapping(value = "checkStoreCharge", method = RequestMethod.POST)
	public RespJson checkStoreCharge(String formId) {
		LOG.debug("审核门店费用ID：{}", formId);
		try {
			
			UpdateStatusVo vo = new UpdateStatusVo();
			vo.setId(formId);
			vo.setUpdateUserId(super.getCurrUserId());
			
			return storeChargeService.checkStoreCharge(vo);
			
		} catch (Exception e) {
			LOG.error("审核门店费用失败：", e);
		}
		return RespJson.error();
	}
	
	
	@RequestMapping(value = "deleteStoreCharge", method = RequestMethod.POST)
	public RespJson deleteStoreCharge(String formId) {
		LOG.debug("删除门店费用ID：{}", formId);
		try {
			
			UpdateStatusVo vo = new UpdateStatusVo();
			vo.setId(formId);
			vo.setUpdateUserId(super.getCurrUserId());
			
			return storeChargeService.deleteStoreCharge(vo);
			
		} catch (Exception e) {
			LOG.error("删除门店费用失败：", e);
		}
		return RespJson.error();
	}

}
