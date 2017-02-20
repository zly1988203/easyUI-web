package com.okdeer.jxc.controller.stock;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.enums.StockAdjustEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.stock.entity.GoodsComponent;
import com.okdeer.jxc.stock.service.GoodsComponentApi;
import com.okdeer.jxc.stock.service.StockAdjustServiceApi;
import com.okdeer.jxc.stock.vo.StockFormDetailVo;
import com.okdeer.jxc.stock.vo.StockFormVo;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

/***
 * 
 * ClassName: CombineSplitController 
 * @Description: 组合拆分单Controller
 * @author xuyq
 * @date 2017年2月14日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/stock/combineSplit")
public class CombineSplitController extends BaseController<T> {

	@Reference(version = "1.0.0", check = false)
	private StockAdjustServiceApi stockAdjustServiceApi;
	
	@Reference(version = "1.0.0", check = false)
	private GoodsComponentApi goodsComponentApi;
	/***
	 * 
	 * @Description: 跳转列表页面
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/list")
	public String list() {
		return "/combineSplit/combineSplitList";
	}

	/***
	 * 
	 * @Description: 跳转新增页面
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/add")
	public String add() {
		return "/combineSplit/combineSplitAdd";
	}

	/***
	 * 
	 * @Description: 跳转修改页面
	 * @param id
	 * @param request
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/combineSplitEdit", method = RequestMethod.GET)
	public String edit(String id, HttpServletRequest request) {
		StockFormVo stockFormVo = stockAdjustServiceApi.getStcokFormInfo(id);
		request.setAttribute("stockFormVo", stockFormVo);
		return "/combineSplit/combineSplitEdit";
	}
	
	/***
	 * 
	 * @Description: 查询列表
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author xuyq
	 * @date 2017年2月16日
	 */
	@RequestMapping(value = "/getCombineSplitList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<StockFormVo> getCombineSplitList(StockFormVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			//调整类型
			vo.setFormType(StockAdjustEnum.COMBINESPLIT.getKey());
			PageUtils<StockFormVo> stockFormList = stockAdjustServiceApi.getStockFormList(vo);
			LOG.info(LogConstant.PAGE, stockFormList.toString());
			return stockFormList;
		} catch (Exception e) {
			LOG.error("获取单据列表信息异常:{}", e);
		}
		return null;
	}
	
	/***
	 * 
	 * @Description: 详细
	 * @param id
	 * @param report
	 * @param request
	 * @return
	 * @author xuyq
	 * @date 2017年2月16日
	 */
	@RequestMapping(value = "/combineSplitView", method = RequestMethod.GET)
	public String combineSplitView(String id, String report, HttpServletRequest request) {
		StockFormVo stockFormVo = stockAdjustServiceApi.getCombineSplitInfo(id);
		request.setAttribute("stockFormVo", stockFormVo);
		request.setAttribute("close", report);
		return "/combineSplit/combineSplitView";
	}
	
	/**
	 * 
	 * @Description: 获取库存调整明细信息
	 * @param id 库存调整主键ID
	 * @return
	 * @author liux01
	 * @date 2016年11月4日
	 */
	
	/***
	 * 
	 * @Description:  获取成分商品明细信息
	 * @param id
	 * @return
	 * @author xuyq
	 * @date 2017年2月19日
	 */
	@RequestMapping(value = "getCombineSplitDetailList", method = RequestMethod.GET)
	@ResponseBody
	public List<StockFormDetailVo> getCombineSplitDetailList(String id) {
		LOG.info(LogConstant.OUT_PARAM, id);
		try {
			return stockAdjustServiceApi.getCombineSplitDetailList(id);
		} catch (Exception e) {
			LOG.error("获取单据信息异常:{}", e);
		}
		return null;
	}
	
	/**
	 * 
	 * @Description: 查询组合商品成分
	 * @param skuId
	 * @return
	 * @author xuyq
	 * @date 2017年2月18日
	 */
	@RequestMapping(value = "getGoodsComponentDetailList",method=RequestMethod.POST)
	@ResponseBody
	public List<GoodsComponent>  getGoodsComponentDetailList(String skuId,String branchId) {
		try{
			return goodsComponentApi.getCombineSplitDetailList(skuId,branchId);
		}catch(Exception e){
			LOG.error("查询商品成分失败！:{}",e);
			return null;
		}
	}
	
	@RequestMapping(value = "/saveCombineSplit", method = RequestMethod.POST)
	@ResponseBody
	public RespJson saveCombineSplit(String data) {
		LOG.debug("保存组合拆分单 ：data=" + data);
		SysUser user = UserUtil.getCurrentUser();
		if (user == null) {
			RespJson rep = RespJson.error("用户不能为空！");
			return rep;
		}
		RespJson respJson = RespJson.success();
		try {
			if (StringUtils.isNotEmpty(data)) {
				StockFormVo vo = JSON.parseObject(data, StockFormVo.class);
				vo.setCreateUserId(user.getId());
				return stockAdjustServiceApi.addCombineSplitStockForm(vo);
			} else {
				RespJson rep = RespJson.error("保存数据不能为空！");
				return rep;
			}
		} catch (Exception e) {
			LOG.error("保存组合拆分单异常：", e);
			respJson = RespJson.error("保存组合拆分单异常!");
		}
		return respJson;
	}
	
	/**
	 * 
	 * @Description: 删除组合拆分
	 * @param id
	 * @return
	 * @author xuyq
	 * @date 2017年2月19日
	 */
	@RequestMapping(value = "deleteCombineSplit", method = RequestMethod.POST)
	@ResponseBody
	public RespJson deleteCombineSplit(String id) {
		RespJson resp;
		try {
			return stockAdjustServiceApi.deleteStockAdjust(id);
		} catch (Exception e) {
			LOG.error("删除组合拆分单异常:{}", e);
			resp = RespJson.error("删除组合拆分单失败");
		}
		return resp;
	}
	
	/**
	 * 
	 * @Description:  更新组合拆分
	 * @param jsonText
	 * @return
	 * @author xuyq
	 * @date 2017年2月19日
	 */
	@RequestMapping(value = "updateCombineSplit", method = RequestMethod.POST)
	@ResponseBody
	public RespJson updateCombineSplit(String data) {
		RespJson resp;
		try {
			StockFormVo vo = JSON.parseObject(data, StockFormVo.class);
			SysUser user = UserUtil.getCurrentUser();
			vo.setCreateUserId(user.getId());
			return stockAdjustServiceApi.updateStockForm(vo);
		} catch (Exception e) {
			LOG.error("更新单据信息异常:{}", e);
			resp = RespJson.error("更新单据信息失败");
		}
		return resp;

	}
	
	/**
	 * 
	 * @Description: 审核组合拆分
	 * @param id
	 * @return
	 * @author xuyq
	 * @date 2017年2月19日
	 */
	@RequestMapping(value = "auditCombineSplit", method = RequestMethod.POST)
	@ResponseBody
	public RespJson auditCombineSplit(String id) {
		RespJson resp;
		try {
			SysUser user = UserUtil.getCurrentUser();
			return stockAdjustServiceApi.auditCombineSplit(id, user.getId());
		} catch (Exception e) {
			LOG.error("审核单据信息异常:{}", e);
			resp = RespJson.error(e.getMessage());
		}
		return resp;
	}
	
}
