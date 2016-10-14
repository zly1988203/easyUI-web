/** 
 *@Project: okdeer-jxc-web 
 *@Author: liux01
 *@Date: 2016年10月11日 
 *@Copyright: ©2014-2020 www.yschome.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.stock;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.stock.service.StockAdjustServiceApi;
import com.okdeer.jxc.stock.vo.StockFormDetailVo;
import com.okdeer.jxc.stock.vo.StockFormVo;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;


/**
 * ClassName: StockAdjustController 
 * @Description: TODO
 * @author liux01
 * @date 2016年10月11日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    零售管理系统		    2016年10月11日		liux01				商品库存调整
 */
@Controller
@RequestMapping("/stock/adjust")
public class StockAdjustController extends BaseController<StockAdjustController> {

	@Reference(version = "1.0.0", check = false)
	private StockAdjustServiceApi stockAdjustServiceApi;

	/**
	 * 
	 * @Description: 获取库存调整列表页面
	 * @return
	 * @author liux01
	 * @date 2016年10月11日
	 */
	@RequestMapping(value = "/list")
	public String list(){
		return "/stockAdjust/list";
	}
	/**
	 * 
	 * @Description: 获取库存调整新增页面
	 * @return
	 * @author liux01
	 * @date 2016年10月11日
	 */
	@RequestMapping(value = "/add")
	public String add(){
		return "/stockAdjust/add";
	}
	/**
	 * 
	 * @Description: 获取库存调整编辑页面
	 * @return
	 * @author liux01
	 * @date 2016年10月11日
	 */
	@RequestMapping(value = "/edit" , method = RequestMethod.GET)
	public String edit(String id,HttpServletRequest request){
		StockFormVo stockFormVo = stockAdjustServiceApi.getStcokFormInfo(id);
		request.setAttribute("stockFormVo", stockFormVo);
		return "/stockAdjust/edit";
	}
	/**
	 * 
	 * @Description: 获取单据列表信息
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author liux01
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "getStockFormList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<StockFormVo> getStockFormList(
			StockFormVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			PageUtils<StockFormVo> stockFormList = stockAdjustServiceApi
					.getStockFormList(vo);
			LOG.info(LogConstant.PAGE, stockFormList.toString());
			return stockFormList;
		} catch (Exception e) {
			LOG.error("获取单据列表信息异常:{}", e);
		}
		return null;
	}
	/**
	 * 
	 * @Description: 保存库存调整单据
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author liux01
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "addStockForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson addStcokForm(StockFormVo vo) {
		try {
			SysUser user = UserUtil.getCurrentUser();
			vo.setCreateUserId(user.getId());
			return stockAdjustServiceApi.addStockForm(vo);
		} catch (Exception e) {
			LOG.error("保存单据信息异常:{}", e);
		}
		return null;
		
	}
	/**
	 * 
	 * @Description: 更新信息
	 * @param vo
	 * @return
	 * @author liux01
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "updateStockForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson updateStockForm(StockFormVo vo) {
		try {
			SysUser user = UserUtil.getCurrentUser();
			vo.setCreateUserId(user.getId());
			return stockAdjustServiceApi.updateStockForm(vo);
		} catch (Exception e) {
			LOG.error("更新单据信息异常:{}", e);
		}
		return null;
		
	}
	
	/**
	 * 
	 * @Description: 获取库存信息
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author liux01
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "getStcokFormDetailList", method = RequestMethod.POST)
	@ResponseBody
	public List<StockFormDetailVo> getStockFormDetailList(String id) {
		LOG.info(LogConstant.OUT_PARAM, id);
		try {
			return stockAdjustServiceApi.getStcokFormDetailList(id);
		} catch (Exception e) {
			LOG.error("获取单据信息异常:{}", e);
		}
		return null;
	}
	/**
	 * 
	 * @Description: 删除单据信息
	 * @param id
	 * @return
	 * @author liux01
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "deleteStockFormList", method = RequestMethod.POST)
	@ResponseBody
	public String deleteStockFormList(List<String> ids){
		LOG.info(LogConstant.OUT_PARAM, ids);
		try {
			return stockAdjustServiceApi.deleteStockFormList(ids);
		} catch (Exception e) {
			LOG.error("删除单据信息异常:{}", e);
		}
		return null;
	}
	/**
	 * 
	 * @Description: 审核单据信息
	 * @param vo
	 * @return
	 * @author liux01
	 * @date 2016年10月14日
	 */
	@RequestMapping(value = "check", method = RequestMethod.POST)
	@ResponseBody
	public RespJson check(String id){
		try {
			SysUser user = UserUtil.getCurrentUser();
			return stockAdjustServiceApi.check(id,user.getId());
		} catch (Exception e) {
			LOG.error("删除单据信息异常:{}", e);
		}
		return null;
	}
	
	
}
