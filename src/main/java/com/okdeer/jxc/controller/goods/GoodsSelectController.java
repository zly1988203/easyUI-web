/** 
 *@Project: okdeer-jxc-web 
 *@Author: yangyq02
 *@Date: 2016年8月3日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.goods;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.okdeer.base.common.exception.ServiceException;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.entity.BranchesGrow;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.common.enums.BranchPriceSpecEnum;
import com.okdeer.jxc.common.enums.BranchSelectGoodsSpecEnum;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.result.ResultCodeEnum;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.scale.Message;
import com.okdeer.jxc.form.enums.FormType;
import com.okdeer.jxc.goods.entity.GoodsCategory;
import com.okdeer.jxc.goods.entity.GoodsSelect;
import com.okdeer.jxc.goods.entity.GoodsSelectDeliver;
import com.okdeer.jxc.goods.qo.GoodsCategoryQo;
import com.okdeer.jxc.goods.service.GoodsCategoryServiceApi;
import com.okdeer.jxc.goods.service.GoodsSelectServiceApi;
import com.okdeer.jxc.goods.service.GoodsSupplierBranchServiceApi;
import com.okdeer.jxc.goods.vo.GoodsSelectVo;
import com.okdeer.jxc.goods.vo.GoodsSkuVo;
import com.okdeer.jxc.goods.vo.GoodsStockVo;
import com.okdeer.jxc.utils.UserUtil;

import net.sf.json.JSONArray;

/**
 * ClassName: GoodsSelectController 
 * @Description: 商品选择Controller类
 * @author yangyq02
 * @date 2016年8月3日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
  *	进销存V2.0.0		2016年8月3日			       杨永钦  			           商品选择Controller类
  *	商业管理系统		2016.9.17			   李俊义				商品选择Controller类修改
 */
@Controller
@RequestMapping("goods/goodsSelect")
public class GoodsSelectController extends BaseController<GoodsSelectController> {

	@Reference(version = "1.0.0", check = false)
	private GoodsSelectServiceApi goodsSelectServiceApi;

	@Reference(version = "1.0.0", check = false)
	private GoodsCategoryServiceApi goodsCategoryService;
	
	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesService;
	
	@Reference(version = "1.0.0", check = false)
	GoodsSupplierBranchServiceApi goodsSupplierBranchServiceApi;

	/**
	 * @Description: 商品选择view
	 * @param  model
	 * @return String  
	 * @throws
	 * @author yangyq02
	 * @date 2016年8月3日
	 */
	@RequestMapping(value = "view")
	public String view(HttpServletRequest req, Model model) {
		LOG.info("商品选择跳转页面参数:{}", req.toString());
		String type = req.getParameter("type");
		String supplierId = req.getParameter("supplierId");
		String sourceBranchId = req.getParameter("sourceBranchId");
		String targetBranchId = req.getParameter("targetBranchId");
		String branchId = req.getParameter("branchId");
		//商品公共组件查询判断是否过滤捆绑商品
		String flag = req.getParameter("flag");
		model.addAttribute("flag", flag);
		model.addAttribute("type", type);
		model.addAttribute("searchSupplierId", supplierId);
		model.addAttribute("sourceBranchId", sourceBranchId);
		model.addAttribute("targetBranchId", targetBranchId);
		model.addAttribute("branchId", branchId);
		return "component/publicGoods";
	}

	/**
	 * @Description: 查询商品列表
	 * @param vo GoodsSelectVo商品选择VO
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @return PageUtils<GoodsSelect>  
	 * @throws
	 * @author yangyq02 lijy02
	 * @date 2016年8月3日
	 */
	@RequestMapping(value = "getGoodsList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsSelect> getGoodsList(GoodsSelectVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			// 如果页面上有传入机构 则选择页面上的
			// 没有传入机构则选择登录机构
			String branchId = vo.getBranchId();
			if (StringUtils.isEmpty(branchId)) {
				vo.setBranchId(UserUtil.getCurrBranchId());
			}
			// 多机构查询
			if (branchId.indexOf(",") != -1) {
				vo.setBranchId("");
				vo.setBranchIds(Arrays.asList(branchId.split(",")));
			}

			//如果formType 是属于配送中的数据 说明不需要管理库存
			if(FormType.DA.name().equals(vo.getFormType())||FormType.DO.name().equals(vo.getFormType())
					||FormType.DI.name().equals(vo.getFormType())||FormType.DR.name().equals(vo.getFormType())) {
				vo.setIsManagerStock(1);
			}
			LOG.info("商品查询参数:{}" + vo.toString());
			// 要货单商品资料查询、价格查询
			if (FormType.DA.name().equals(vo.getFormType())) {
				PageUtils<GoodsSelect> goodsSelects = getGoodsListDA(vo);
				return goodsSelects;
			}
			PageUtils<GoodsSelect> suppliers = null;
			if(FormType.PA.name().equals(vo.getFormType()) || FormType.PR.name().equals(vo.getFormType())){
				if(StringUtils.isNotBlank(vo.getSupplierId())){
					//根据机构id判断查询采购商品
					suppliers = queryPurchaseGoods(vo);
				}else{
					suppliers = goodsSelectServiceApi.queryLists(vo);
				}
			}else{
				suppliers = goodsSelectServiceApi.queryLists(vo);
			}
			return suppliers;
		} catch (Exception e) {
			LOG.error("查询商品选择数据出现异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 要货单商品资料查询、价格查询
	 * @param vo
	 * @return
	 * @author zhangchm
	 * @date 2016年11月28日
	 */
	private PageUtils<GoodsSelect> getGoodsListDA(GoodsSelectVo vo) {
		// 查询要货机构类型、配送设置
		BranchesGrow targetBranch = branchesService.queryBranchesAndSpecByBranchId(vo.getTargetBranchId());
		if (StringUtils.isEmpty(targetBranch.getPriceSpec())) {
			targetBranch.setPriceSpec(BranchPriceSpecEnum.COST_PRICE.getKey());
		}
		// 要货机构:自营店A
		if (BranchTypeEnum.SELF_STORE.getCode().equals(targetBranch.getBranchType())) {
			return queryByBranchTypeGetGoodsAndPrice_A_Target(vo, targetBranch);
		}
		// 要货机构:加盟店B\加盟店C (发货机构配送价、发货机构商品)
		if (BranchTypeEnum.FRANCHISE_STORE_B.getCode().equals(targetBranch.getBranchType())
				|| BranchTypeEnum.FRANCHISE_STORE_C.getCode().equals(targetBranch.getBranchType())) {
			vo.setPriceSpec(BranchPriceSpecEnum.DISTRIBUTION_PRICE.getKey());
			return goodsSelectServiceApi.queryByBranchTypeGetGoodsAndPrice_A_SourceBranch_Target(vo);
		}
		// 要货机构:为分公司、物流中心
		if (BranchTypeEnum.BRANCH_OFFICE.getCode().equals(targetBranch.getBranchType())
				|| BranchTypeEnum.LOGISTICS_CENTER.getCode().equals(targetBranch.getBranchType())) {
			return queryByBranchTypeGetGoodsAndPrice_A_Source(vo, targetBranch);
		}
		return null;
	}

	/**
	 * @Description: 发货机构:自营店A，根据配送设置取要货机构成本价或要货机构配送价 ，根据配送设置取发货机构商品或发货机构与要货机构并集
	 *               发货机构:加盟店B\C，要货机构配送价， 发货机构商品
	 * @param vo
	 * @param targetBranch
	 * @return
	 * @author zhangchm
	 * @date 2016年11月28日
	 */
	private PageUtils<GoodsSelect> queryByBranchTypeGetGoodsAndPrice_A_Source(GoodsSelectVo vo,
			BranchesGrow targetBranch) {
		vo.setPriceSpec(targetBranch.getPriceSpec());
		// 获取 发货机构
		BranchesGrow sourceBranch = branchesService.queryBranchesAndSpecByBranchId(vo.getSourceBranchId());
		// 自营店A 发货机构与要货机构并集
		if (BranchTypeEnum.SELF_STORE.getCode().equals(sourceBranch.getBranchType())) {
			if (StringUtils.isEmpty(targetBranch.getSelectGoodsSpec())
					|| BranchSelectGoodsSpecEnum.INTERSECTION_SELECT_GOODS.getKey().equals(
							targetBranch.getSelectGoodsSpec())) {
				return goodsSelectServiceApi.queryByBranchTypeGetGoodsAndPrice_A_SourceBranchAndTargetBranch_Source(vo);
			} else {
				// 发货机构商品
				return goodsSelectServiceApi.queryByBranchTypeGetGoodsAndPrice_A_SourceBranch_Source(vo);
			}
		} else if (BranchTypeEnum.FRANCHISE_STORE_B.getCode().equals(sourceBranch.getBranchType())
				|| BranchTypeEnum.FRANCHISE_STORE_C.getCode().equals(sourceBranch.getBranchType())) {
			// 发货机构商品
			vo.setPriceSpec(BranchPriceSpecEnum.DISTRIBUTION_PRICE.getKey());
			return goodsSelectServiceApi.queryByBranchTypeGetGoodsAndPrice_A_SourceBranch_Source(vo);
		} else {
			LOG.error("发货机构类型错误！");
			return null;
		}
	}

	/**
	 * @Description: 要货机构:自营店A，根据配送设置取要货机构成本价或发货机构配送价，根据配送设置取发货机构商品或发货机构与要货机构并集,
	 * 				  	        自营店要货价格直接取物流配送价；（不启用则默认为自身成本价）,
	 * 				  	        自营店要货可以要仓库所有对外供应商品；（不启用则只能要仓库供应且自身有卖的商品）
	 * 				 要货机构:加盟店B\C，发货机构配送价， 发货机构商品
	 * @param vo
	 * @param targetBranch
	 * @return
	 * @author zhangchm
	 * @date 2016年11月28日
	 */
	private PageUtils<GoodsSelect> queryByBranchTypeGetGoodsAndPrice_A_Target(GoodsSelectVo vo,
			BranchesGrow targetBranch) {
		vo.setPriceSpec(targetBranch.getPriceSpec());
		// 发货机构与要货机构并集
		if (StringUtils.isEmpty(targetBranch.getSelectGoodsSpec())
				|| BranchSelectGoodsSpecEnum.INTERSECTION_SELECT_GOODS.getKey().equals(
						targetBranch.getSelectGoodsSpec())) {
			return goodsSelectServiceApi.queryByBranchTypeGetGoodsAndPrice_A_SourceBranchAndTargetBranch_Target(vo);
		} else {
			// 发货机构商品
			return goodsSelectServiceApi.queryByBranchTypeGetGoodsAndPrice_A_SourceBranch_Target(vo);
		}
	}

	//根据机构id判断查询采购商品
	private PageUtils<GoodsSelect> queryPurchaseGoods(GoodsSelectVo vo) throws ServiceException  {
		//1、查询选择机构
		String branchId = vo.getBranchId();
		String supplierId = vo.getSupplierId();
		Branches branches = branchesService.getBranchInfoById(branchId);
		PageUtils<GoodsSelect> suppliers = null;
		Integer type = branches.getType();
		//2、判断选择机构类型为店铺还是分公司,type : 机构类型(0.总部、1.分公司、2.物流中心、3.自营店、4.加盟店B、5.加盟店C)
		if(type ==Constant.THREE || type ==Constant.FOUR || type ==Constant.FIVE){
			Integer count = goodsSupplierBranchServiceApi.queryCountByBranchIdAndSupplierId(branchId, supplierId);
			if(count>0){
				//2.1 如果供应商机构商品关系存在
				suppliers = goodsSelectServiceApi.queryPurchaseGoodsLists(vo);
			}else{
				//2.2 如果供应商机构商品关系不存在,需要查询该机构上级分公司
				vo.setParentId(branches.getParentId());
				vo.setBranchId(branchId);
				suppliers = goodsSelectServiceApi.queryBranchPurchaseGoodsLists(vo);
			}
		}else{
			suppliers = goodsSelectServiceApi.queryPurchaseGoodsLists(vo);
		}
		return suppliers;
	}
	
	
	/**
	 * @Description: 根据货号批量查询商品
	 * @param skuCodes
	 * @return   
	 * @return List<GoodsSelect>  
	 * @throws
	 * @author yangyq02
	 * @date 2016年8月23日
	 */
	@RequestMapping(value = "importSkuCode", method = RequestMethod.POST)
	@ResponseBody
	public List<GoodsSelect> importSkuCode(String[] skuCodes, String branchId, String type, String sourceBranchId,
			String targetBranchId) {
		List<GoodsSelect> suppliers = null;
		try {
			if (FormType.DA.name().equals(type)) {
				GoodsSelectVo vo = new GoodsSelectVo();
				vo.setIsManagerStock(1);
				vo.setTargetBranchId(targetBranchId);
				vo.setSourceBranchId(sourceBranchId);
				vo.setSkuCodesOrBarCodes(Arrays.asList(skuCodes));
				vo.setPageNumber(1);
				vo.setPageSize(50);
				PageUtils<GoodsSelect> goodsSelects = getGoodsListDA(vo);
				suppliers = goodsSelects.getList();
			} else {
				if (StringUtils.isEmpty(branchId)) {
					branchId = UserUtil.getCurrBranchId();
				}
				List<String> branchIds = new ArrayList<String>(0);
				// 多机构查询
				if (branchId.indexOf(",") != -1) {
					branchIds = Arrays.asList(branchId.split(","));
					branchId = "";
				}
				// 根据有无skuCodes传来数据 空表示是导入货号 有数据表示导入数据
				suppliers = goodsSelectServiceApi.queryByCodeLists(skuCodes, branchId, branchIds);
			}
			LOG.info("根据货号查询商品:{}" + suppliers.toString());
			return suppliers;
		} catch (Exception e) {
			LOG.error("查询商品选择数据出现异常:", e);
		}
		return Collections.emptyList();
	}


	/**
	 * @Description: 查询电子秤商品 （重和计件商品）
	 * @param GoodsSelectJson
	 * @param response
	 * @return   
	 * @return List<GoodsSelect>  
	 * @throws
	 * @author yangyq02
	 * @date 2016年8月23日
	 */
	@RequestMapping(value = "queryScaleGoods", method = RequestMethod.POST)
	@ResponseBody
	public Message queryScaleGoods(String GoodsSelectJson) {
		Message msg = new Message();
		try {
			GoodsSelectVo goodsVo = JSON.parseObject(GoodsSelectJson, GoodsSelectVo.class);
			LOG.info("goodsVo:" + goodsVo);
			goodsVo.setBranchId(UserUtil.getCurrBranchId());
			goodsVo.setPricingType(99);
			LOG.info("vo:" + goodsVo.toString());
			List<GoodsSelect> list = goodsSelectServiceApi.queryScaleGoods(goodsVo);
			msg.setData(list);
			return msg;
		} catch (Exception e) {
			msg.setSuccess(Message.FAIT);
			msg.setMessage(e.getMessage());
			LOG.error("查询商品选择数据出现异常:", e);
		}
		return msg;
	}

	/**
	 * @Description 查询类别
	 * @param vo
	 * @param categoryVoJson
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @author yangyq02
	 * @date 2016年7月20日
	 */
	@RequestMapping(value = "getComponentList", method = RequestMethod.POST)
	@ResponseBody
	public Message getComponentList(String categoryVoJson) {
		Message msg = new Message();
		try {
			GoodsCategoryQo qo = JSON.parseObject(categoryVoJson, GoodsCategoryQo.class);
			PageUtils<GoodsCategory> suppliers = goodsCategoryService.queryLists(qo);
			msg.setData(suppliers.getList());
			return msg;
		} catch (Exception e) {
			msg.setMessage(e.getMessage());
			msg.setSuccess(Message.FAIT);
			LOG.error("查询查询类别异常:", e);
		}
		return msg;
	}

	/**
	 * @Description: enter事件配送导入
	 * @param skuCode
	 * @param formType
	 * @param sourceBranchId
	 * @param targetBranchId
	 * @return
	 * @author lijy02
	 * @date 2016年9月24日
	 */
	@RequestMapping(value = "enterSearchGoodsDeliver", method = RequestMethod.POST)
	@ResponseBody
	public List<GoodsSelect> enterSearchGoodsDeliver(String skuCode, String formType, String sourceBranchId,
			String targetBranchId) {
		LOG.info("enter事件配送导入参数:skuCode=" + skuCode + ",formType=" + formType + ",sourceBranchId=" + sourceBranchId
				+ ",targetBranchId=" + targetBranchId);
		List<GoodsSelect> goodsSelect = new ArrayList<GoodsSelect>();
		if (StringUtils.isNotEmpty(skuCode)) {
			goodsSelect = goodsSelectServiceApi.queryBySkuCodeForDeliver(skuCode, formType, sourceBranchId,
					targetBranchId);
		}
		return goodsSelect;
	}

	/**
	 * @Description: 获取商品库存、价格 
	 * @param req
	 * @return
	 * @author zhangchm
	 * @date 2016年10月12日
	 */
	@RequestMapping(value = "selectStockAndPrice", method = RequestMethod.POST)
	@ResponseBody
	public List<GoodsSelectDeliver> selectStockAndPrice(HttpServletRequest req) {
		String goodsStockVo = req.getParameter("goodsStockVo");
		List<GoodsSelect> goodsSelect = new ArrayList<GoodsSelect>(0);
		List<GoodsSelectDeliver> goodsSelectDeliverTemp = new ArrayList<GoodsSelectDeliver>(0);
		try {
			GoodsStockVo goodsStockVos = new ObjectMapper().readValue(goodsStockVo, GoodsStockVo.class);
			goodsSelect = goodsSelectServiceApi.queryByBrancheAndSkuIds(goodsStockVos);
			List<GoodsSelectDeliver> goodsSelectDeliver = new ArrayList<GoodsSelectDeliver>(0);
			goodsSelectDeliverTemp = getGoodsSelectDeliverLists(goodsStockVos, goodsSelect, goodsSelectDeliver, true);
		} catch (IOException e) {
			LOG.error("获取商品库存、价格 异常:", e);
		}
		return goodsSelectDeliverTemp;
	}

	/**
	 * @Description: 获取商品库存、价格 
	 * @param req
	 * @return
	 * @author zhangchm
	 * @date 2016年10月12日
	 */
	@RequestMapping(value = "selectStockAndPriceToDo", method = RequestMethod.POST)
	@ResponseBody
	public List<GoodsSelectDeliver> selectStockAndPriceToDo(HttpServletRequest req) {
		String goodsStockVo = req.getParameter("goodsStockVo");
		List<GoodsSelect> goodsSelect = new ArrayList<GoodsSelect>(0);
		List<GoodsSelectDeliver> goodsSelectDeliverTemp = new ArrayList<GoodsSelectDeliver>(0);
		try {
			GoodsStockVo goodsStockVos = new ObjectMapper().readValue(goodsStockVo, GoodsStockVo.class);
			goodsSelect = goodsSelectServiceApi.queryByBrancheAndSkuIdsToDo(goodsStockVos);
			List<GoodsSelectDeliver> goodsSelectDeliver = new ArrayList<GoodsSelectDeliver>(0);
			goodsSelectDeliverTemp = getGoodsSelectDeliverLists(goodsStockVos, goodsSelect, goodsSelectDeliver, false);
		} catch (IOException e) {
			LOG.error("获取商品库存、价格 异常:{}", e);
		}
		return goodsSelectDeliverTemp;
	}

	/**
	 * @Description: 值转换
	 * @param goodsStockVos
	 * @param goodsSelects
	 * @param goodsSelectDelivers
	 * @param flag
	 * @return
	 * @author zhangchm
	 * @date 2016年10月15日
	 */
	private List<GoodsSelectDeliver> getGoodsSelectDeliverLists(GoodsStockVo goodsStockVos,
			List<GoodsSelect> goodsSelects, List<GoodsSelectDeliver> goodsSelectDelivers, boolean flag) {
		GoodsSelectDeliver goodsSelectDeliver = null;
		for (GoodsSelect goodsSelect : goodsSelects) {
			goodsSelectDeliver = new GoodsSelectDeliver();
			BeanUtils.copyProperties(goodsSelect, goodsSelectDeliver);
			goodsSelectDelivers.add(goodsSelectDeliver);
		}
		if (StringUtils.isEmpty(goodsStockVos.getGoodsSkuVo().get(0).getLargeNum())) {
			return goodsSelectDelivers;
		} else {
			Map<String, GoodsSkuVo> map = getGoodsSkuVo(goodsStockVos);
			if (flag) {
				for (GoodsSelectDeliver temp : goodsSelectDelivers) {
					temp.setLargeNum(map.get(temp.getId()).getLargeNum());
				}
			} else {
				for (GoodsSelectDeliver temp : goodsSelectDelivers) {
					GoodsSkuVo vo = map.get(temp.getId());
					temp.setLargeNum(vo.getLargeNum());
					temp.setIsGift(vo.getIsGift());
					temp.setPrice(vo.getDistributionPrice());
				}
			}
			return goodsSelectDelivers;
		}
	}

	/**
	 * @Description: 获取页面传递商品数量
	 * @param goodsStockVos
	 * @return
	 * @author zhangchm
	 * @date 2016年10月15日
	 */
	private Map<String, GoodsSkuVo> getGoodsSkuVo(GoodsStockVo goodsStockVos) {
		Map<String, GoodsSkuVo> map = new HashMap<String, GoodsSkuVo>();
		for (GoodsSkuVo goodsSkuVo : goodsStockVos.getGoodsSkuVo()) {
			map.put(goodsSkuVo.getId(), goodsSkuVo);
		}
		return map;
	}
	
	
	/**
	 * @Description: 商品选择view
	 * @param  model
	 * @return String  
	 * @throws
	 * @author zhongy
	 * @date 2016年11月09日
	 */
	@RequestMapping(value = "goGoodsSku")
	public String goGoodsSku(Model model,HttpServletRequest request) {
		String branchId = request.getParameter("branchId");
		model.addAttribute("branchId", branchId);
		return "component/publicGoodsSku";
	}
	
	/**
	 * @Description: 查询商品列表
	 * @param vo GoodsSelectVo商品选择VO
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @return PageUtils<GoodsSelect>  
	 * @throws
	 * @author zhongy
	 * @date 2016年11月09日
	 */
	@RequestMapping(value = "queryGoodsSkuLists", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsSelect> queryGoodsSkuLists(GoodsSelectVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			LOG.info("标准商品查询参数,vo={}",vo);
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			PageUtils<GoodsSelect> suppliers = goodsSelectServiceApi.queryGoodsSkuLists(vo);
			return suppliers;
		} catch (Exception e) {
			LOG.error("标准查询商品选择数据出现异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 查询要货单中已订数量
	 * @param req
	 * @return
	 * @author zhangchm
	 * @date 2016年12月12日
	 */
	@RequestMapping(value = "queryAlreadyNum", method = RequestMethod.POST)
	@ResponseBody
	public RespJson queryAlreadyNum(HttpServletRequest req) {
		RespJson respJson = RespJson.success();
		String goodsStockVo = req.getParameter("goodsStockVo");
		List<Map<String, Object>> goodsSelect = new ArrayList<Map<String, Object>>();
		try {
			GoodsStockVo goodsStockVos = new ObjectMapper().readValue(goodsStockVo, GoodsStockVo.class);
			goodsSelect = goodsSelectServiceApi.queryAlreadyNum(goodsStockVos);
			JSONArray jsonObject = JSONArray.fromObject(goodsSelect);
			respJson.put("data", jsonObject);
		} catch (IOException e) {
			respJson.put(RespJson.KEY_CODE, ResultCodeEnum.FAIL.getCode());
			LOG.error("获取商品库存、价格 异常:", e);
		}
		return respJson;
	}
	
	/**
	 * @Description: 公共提示框 三个按钮
	 * @return   
	 * @author zhaoly
	 * @date 2017年02月23日
	 */
	@RequestMapping(value = "goPublicComfirmDialog")
	public String goPublicComfirmDialog() {
		return "component/publicComfirmDialog";
	}
	
}
