/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhengwj
 *@Date: 2017年8月17日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.settle.franchise;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.branch.service.BranchSpecServiceApi;
import com.okdeer.jxc.common.controller.BasePrintController;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.form.enums.FormStatus;
import com.okdeer.jxc.settle.franchise.service.FranchiseProfitSettleService;
import com.okdeer.jxc.settle.franchise.vo.FranchiseProfitSettleDetailVo;
import com.okdeer.jxc.settle.franchise.vo.FranchiseProfitSettleVo;

/**
 * ClassName: FranchiseProfitSettleController 
 * @Description: 加盟店毛利结算
 * @author zhengwj
 * @date 2017年8月17日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@RestController
@RequestMapping("/settle/franchiseProfitSettle")
public class FranchiseProfitSettleController
		extends BasePrintController<FranchiseProfitSettleController, FranchiseProfitSettleDetailVo> {

	/**
	 * @Fields franchiseProfitSettleService : 加盟店毛利结算service
	 */
	@Reference(version = "1.0.0", check = false)
	private FranchiseProfitSettleService franchiseProfitSettleService;

	/**
	 * @Description: 加盟店毛利结算列表页面
	 * @author zhengwj
	 * @date 2017年8月17日
	 */
	@RequestMapping(value = "settleList")
	public ModelAndView contractList(Model model) {
		return new ModelAndView("settle/franchise/profit/settleList");
	}

	/**
	 * @Description: 获取加盟店毛利结算列表
	 * @author zhengwj
	 * @date 2017年8月17日
	 */
	@RequestMapping(value = "getSettleList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<FranchiseProfitSettleVo> getSettleList(FranchiseProfitSettleVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setTargetBranchCode(getCurrBranchCompleCode());
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			PageUtils<FranchiseProfitSettleVo> page = franchiseProfitSettleService.getSettleList(vo);
			return page;
		} catch (Exception e) {
			LOG.error("获取加盟店毛利结算列表异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 判断是否存在未结算的毛利结算单
	 * @author zhengwj
	 * @date 2017年8月17日
	 */
	@RequiresPermissions("JxcFranchiseProfit:add")
	@RequestMapping(value = "checkAuditCount", method = RequestMethod.POST)
	@ResponseBody
	public RespJson checkAuditCount(String franchiseBranchId) {
		RespJson respJson = RespJson.success();
		try {
			// 检查是否存在未审核的结算
			int auditCount = franchiseProfitSettleService.getAuditCount(franchiseBranchId);
			if (auditCount > 0) {
				respJson = RespJson.error("存在未审核的毛利结算单");
			}
		} catch (Exception e) {
			LOG.error("获取未审核结算单数量异常:", e);
			respJson = RespJson.error("获取未审核毛利结算单数量异常！");
		}
		return respJson;
	}

	/**
	 * @Description: 加盟店毛利结算新增页面
	 * @author zhengwj
	 * @date 2017年8月17日
	 */
	@RequiresPermissions("JxcFranchiseProfit:add")
	@RequestMapping(value = "settleAdd")
	public ModelAndView settleAdd(Model model) {
		return new ModelAndView("settle/franchise/profit/settleAdd");
	}

	/**
	 * @Description: 获取新增毛利结算的商品列表
	 * @author zhengwj
	 * @date 2017年8月17日
	 */
	@RequiresPermissions("JxcFranchiseProfit:add")
	@RequestMapping(value = "getFormList", method = RequestMethod.POST)
	@ResponseBody
	public List<FranchiseProfitSettleDetailVo> getFormList(FranchiseProfitSettleVo vo) {
		try {
			List<FranchiseProfitSettleDetailVo> list = franchiseProfitSettleService.getFormList(vo);
			return list;
		} catch (Exception e) {
			LOG.error("获取新增毛利结算的商品列表异常:", e);
		}
		return new ArrayList<>();
	}

	/**
	 * @Description: 保存加盟店毛利结算
	 * @author zhengwj
	 * @date 2017年8月17日
	 */
	@RequiresPermissions("JxcFranchiseProfit:add")
	@RequestMapping(value = "settleSave", method = RequestMethod.POST)
	@ResponseBody
	public RespJson settleSave(String data) {
		RespJson respJson = RespJson.success();
		try {
			FranchiseProfitSettleVo vo = JSON.parseObject(data, FranchiseProfitSettleVo.class);
			vo.setCreateUserId(getCurrUserId());
			respJson = franchiseProfitSettleService.saveSettle(vo);
		} catch (Exception e) {
			LOG.error("保存加盟店毛利结算异常:", e);
			respJson = RespJson.error("保存加盟店毛利结算失败！");
		}
		return respJson;
	}

	/**
	 * @Description: 加盟店毛利结算编辑页面
	 * @author zhengwj
	 * @date 2017年8月18日
	 */
	@RequiresPermissions("JxcFranchiseProfit:edit")
	@RequestMapping(value = "settleEdit")
	public ModelAndView settleEdit(String id, Model model) {
		FranchiseProfitSettleVo vo = franchiseProfitSettleService.getSettle(id);
		ModelAndView modelAndView = new ModelAndView("settle/franchise/profit/settleEdit");
		if (FormStatus.CHECK_SUCCESS.getValue().equals(vo.getAuditStatus())) {
			modelAndView.setViewName("settle/franchise/profit/settleView");
		}
		modelAndView.addObject("settleVo", vo);
		return modelAndView;
	}

	/**
	 * @Description: 更新加盟店毛利结算
	 * @author zhengwj
	 * @date 2017年8月18日
	 */
	@RequiresPermissions("JxcFranchiseProfit:edit")
	@RequestMapping(value = "settleUpdate", method = RequestMethod.POST)
	@ResponseBody
	public RespJson settleUpdate(String data) {
		RespJson respJson = RespJson.success();
		try {
			FranchiseProfitSettleVo vo = JSON.parseObject(data, FranchiseProfitSettleVo.class);
			vo.setUpdateUserId(getCurrUserId());
			respJson = franchiseProfitSettleService.updateSettle(vo);
		} catch (Exception e) {
			LOG.error("更新加盟店毛利结算异常:", e);
			respJson = RespJson.error("更新加盟店毛利结算失败！");
		}
		return respJson;
	}

	/**
	 * @Description: 删除加盟店毛利结算
	 * @author zhengwj
	 * @date 2017年8月18日
	 */
	@RequiresPermissions("JxcFranchiseProfit:delete")
	@RequestMapping(value = "settleDelete", method = RequestMethod.POST)
	@ResponseBody
	public RespJson settleDelete(@RequestParam(value = "ids[]") List<String> ids) {
		RespJson respJson = RespJson.success();
		try {
			respJson = franchiseProfitSettleService.deleteSettle(ids, getCurrUserId());
		} catch (Exception e) {
			LOG.error("删除加盟店毛利结算异常:", e);
			respJson = RespJson.error("删除加盟店毛利结算失败！");
		}
		return respJson;
	}

	/**
	 * @Description: 审核加盟店毛利结算
	 * @author zhengwj
	 * @date 2017年8月18日
	 */
	@RequiresPermissions("JxcFranchiseProfit:audit")
	@RequestMapping(value = "settleAudit", method = RequestMethod.POST)
	@ResponseBody
	public RespJson settleAudit(String formId) {
		RespJson respJson = RespJson.success();
		try {
			respJson = franchiseProfitSettleService.auditSettle(formId, getCurrUserId());
		} catch (Exception e) {
			LOG.error("审核加盟店毛利结算异常:", e);
			respJson = RespJson.error("审核加盟店毛利结算失败！");
		}
		return respJson;
	}

	/**
	 * @Description: 获取加盟店毛利结算详情列表
	 * @author zhengwj
	 * @date 2017年8月18日
	 */
	@RequestMapping(value = "getDetailList", method = RequestMethod.GET)
	@ResponseBody
	public List<FranchiseProfitSettleDetailVo> getDetailList(String formId) {
		try {
			if (StringUtils.isBlank(formId)) {
				return new ArrayList<>();
			}
			return franchiseProfitSettleService.getDetailList(formId);
		} catch (Exception e) {
			LOG.error("获取加盟店毛利结算详情列表异常:{}", e);
		}
		return new ArrayList<>();
	}

	/**
	 * @Description: 计算账款
	 * @author zhengwj
	 * @date 2017年8月17日
	 */
	@RequestMapping(value = "calAmount", method = RequestMethod.POST)
	@ResponseBody
	public RespJson calAmount(FranchiseProfitSettleVo vo) {
		RespJson respJson = RespJson.success();
		try {
			respJson = franchiseProfitSettleService.calAmount(vo);
		} catch (Exception e) {
			LOG.error("加盟店毛利结算计算账款异常:", e);
			respJson = RespJson.error("加盟店毛利结算计算账款失败！");
		}
		return respJson;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.common.controller.BasePrintController#getPrintReplace(java.lang.String)
	 */
	@Override
	protected Map<String, Object> getPrintReplace(String formNo) {
		Map<String, Object> replaceMap = new HashMap<>();
		FranchiseProfitSettleVo vo = franchiseProfitSettleService.getSettle(formNo);
		if (null != vo) {
			replaceMap.put("_订单编号", vo.getFormNo());
			replaceMap.put("saleCount", vo.getSaleCount());
			replaceMap.put("saleAmount", vo.getSaleAmount());
			replaceMap.put("costAmount", vo.getCostAmount());
			replaceMap.put("profitAmount", vo.getProfitAmount());
		}
		return replaceMap;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.common.controller.BasePrintController#getPrintDetail(java.lang.String)
	 */
	@Override
	protected List<FranchiseProfitSettleDetailVo> getPrintDetail(String formNo) {
		return franchiseProfitSettleService.getDetailList(formNo);
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.common.controller.BasePrintController#getBranchSpecService()
	 */
	@Override
	protected BranchSpecServiceApi getBranchSpecService() {
		return null;
	}

}
