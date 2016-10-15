/** 
 *@Project: okdeer-jxc-web 
 *@Author: yangyq02
 *@Date: 2016年8月3日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.goods;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.scale.Message;
import com.okdeer.jxc.goods.entity.GoodsCategory;
import com.okdeer.jxc.goods.entity.GoodsSelect;
import com.okdeer.jxc.goods.entity.GoodsSelectDeliver;
import com.okdeer.jxc.goods.service.GoodsCategoryServiceApi;
import com.okdeer.jxc.goods.service.GoodsSelectServiceApi;
import com.okdeer.jxc.goods.vo.GoodsCategoryVo;
import com.okdeer.jxc.goods.vo.GoodsSelectVo;
import com.okdeer.jxc.goods.vo.GoodsSkuVo;
import com.okdeer.jxc.goods.vo.GoodsStockVo;
import com.okdeer.jxc.utils.UserUtil;

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
public class GoodsSelectController extends
		BaseController<GoodsSelectController> {

	@Reference(version = "1.0.0", check = false)
	private GoodsSelectServiceApi goodsSelectServiceApi;

	@Reference(version = "1.0.0", check = false)
	private GoodsCategoryServiceApi goodsCategoryService;

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
		String sourceBranchId = req.getParameter("sourceBranchId");
		String targetBranchId = req.getParameter("targetBranchId");
		String branchId = req.getParameter("branchId");
		model.addAttribute("type", type);
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
	public PageUtils<GoodsSelect> getGoodsList(
			GoodsSelectVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			// 如果页面上有传入机构 则选择页面上的
			// 没有传入机构则选择登录机构
			if (StringUtils.isEmpty(vo.getBranchId())) {
				vo.setBranchId(UserUtil.getCurrBranchId());
			}
//			if (FormType.DA.toString().equals(vo.getFormType())) {
//				vo.setBranchId(vo.getTargetBranchId());
//			}
//			if (FormType.DO.toString().equals(vo.getFormType())) {
//				vo.setBranchId(vo.getSourceBranchId());
//			}
			LOG.info("商品查询参数:{}" + vo.toString());
			PageUtils<GoodsSelect> suppliers = goodsSelectServiceApi
					.queryLists(vo);
			LOG.info("page" + suppliers.toString());
			return suppliers;
		} catch (Exception e) {
			LOG.error("查询商品选择数据出现异常:", e);
		}
		return PageUtils.emptyPage();
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
	public List<GoodsSelect> importSkuCode(String[] skuCodes) {
		try {
			// 根据有无skuCodes传来数据 空表示是导入货号 有数据表示导入数据
			List<GoodsSelect> suppliers = goodsSelectServiceApi
					.queryByCodeLists(skuCodes, UserUtil.getCurrBranchId());
			LOG.info("根据货号批量查询商品参数:{}" + suppliers.toString());
			return suppliers;
		} catch (Exception e) {
			LOG.error("查询商品选择数据出现异常:", e);
		}
		return Collections.emptyList();
	}

	/**
	 * @Description: 导入商品集合
	 * @param goodsSelectList
	 * @return
	 * @author lijy02
	 * @date 2016年9月13日
	 */
	/*@RequestMapping(value = "importGoodsLists", method = RequestMethod.POST)
	@ResponseBody
	public List<GoodsSelect> importGoodsLists(String[] branchIds,
			@RequestBody List<GoodsSelect> goodsSelectList) {
		try {
			LOG.info("导入商品集合参数:{}" + goodsSelectList.toString()+"branchIds:"+branchIds);
			List<GoodsSelect> suppliers = new ArrayList<GoodsSelect>();
			// 从导入的excel中得到skuCodes集合
			// 根据skuCodes集合查询他的商品信息集合
			List<String> codes = new ArrayList<String>();
			for (GoodsSelect goodsSelect : goodsSelectList) {
				codes.add(goodsSelect.getSkuCode() != null ? goodsSelect
						.getSkuCode() : goodsSelect.getBarCode());
			}
			
			 * String[] skuCodes = (String[]) codes.toArray(new String[codes
			 * .size()]);
			 
			if(codes.isEmpty()) {
				LOG.error("货号或者条形码不能为空:");
				throw new Exception("货号或者条形码不能为空:");
			}
			suppliers = goodsSelectServiceApi.queryGoods(codes, branchIds);
			if (suppliers != null) {
				// 传到页面中的商品资料以标准库的为主
				Map<String, GoodsSelect> map = new HashMap<String, GoodsSelect>();
				for (GoodsSelect good : goodsSelectList) {
					map.put(good.getSkuCode() != null ? good.getSkuCode()
							: good.getBarCode(), good);
				}
				restructureExcelValue(goodsSelectList, suppliers, map);

			}
			LOG.info("导入商品集合列表:{}" + goodsSelectList.toString());
			return suppliers;
		} catch (Exception e) {
			LOG.error("查询商品选择数据出现异常:", e);
		}
		return Collections.emptyList();
	}*/

	/**
	 * @Description: 导入商品集合(配送)
	 * @param importGoodsListsDeliver
	 * @return
	 * @author lijy02
	 * @date 2016年9月13日
	 */
	/*@RequestMapping(value = "importGoodsListsDeliver", method = RequestMethod.POST)
	@ResponseBody
	public List<GoodsSelect> importGoodsListsDeliver(
			@RequestBody GoodsImportVo goodsImportVo) {
		try {
			LOG.info("导入商品集合(配送)参数:{}" + goodsImportVo.toString());
			List<GoodsSelect> suppliers = new ArrayList<GoodsSelect>();
			List<GoodsSelect> goodsSelectList = goodsImportVo
					.getGoodsSelectList();
			List<String> skuCodes = goodsImportVo.getSkuCodes();
			// && CollectionUtils.isEmpty(skuCodes)
			String formType = goodsImportVo.getFormType();
			String sourceBranchId = goodsImportVo.getSourceBranchId();
			String targetBranchId = goodsImportVo.getTargetBranchId();
			// 传入的是明细
			if (!CollectionUtils.isEmpty(goodsSelectList)) {
				suppliers = goodsSelectServiceApi.queryGoodsByListsDeliver(
						goodsSelectList, formType, sourceBranchId,
						targetBranchId);
				if (suppliers != null) {
					// 传到页面中的商品资料以标准库的为主
					Map<String, GoodsSelect> map = new HashMap<String, GoodsSelect>();
					for (GoodsSelect good : goodsSelectList) {
						map.put(good.getSkuCode() != null ? good.getSkuCode()
								: good.getBarCode(), good);
					}
					restructureExcelValue(goodsSelectList, suppliers, map);

				}
			}
			// 传入的是货号
			if (!CollectionUtils.isEmpty(skuCodes)) {
				suppliers = goodsSelectServiceApi.queryGoodsByLists(skuCodes,
						formType, sourceBranchId, targetBranchId);

			}
			return suppliers;
		} catch (Exception e) {
			LOG.error("查询商品选择数据出现异常:", e);
		}
		return Collections.emptyList();
	}*/

	/**
	 * @Description: 重构导入excel的值
	 * @param goodsSelectList
	 * @param suppliers
	 * @param map
	 * @author lijy02
	 * @date 2016年9月20日
	 */
	/*private void restructureExcelValue(List<GoodsSelect> goodsSelectList,
			List<GoodsSelect> suppliers, Map<String, GoodsSelect> map) {
		// 把excel中的得到的新值赋值到数据库查询出来的数据
		for (GoodsSelect goodsSelect : suppliers) {
			GoodsSelect good = map.get(goodsSelect.getSkuCode())!=null ? 
					map.get(goodsSelect.getSkuCode()): map.get(goodsSelect.getBarCode());
//			// 新采购价
//			goodsSelect.setNewPurPrice(good.getNewPurPrice());
//			// 新配送价
//			goodsSelect.setNewDcPrice(good.getNewDcPrice());
//			// 新销售价
//			goodsSelect.setNewSalePrice(good.getNewSalePrice());
//			// 新会员价
//			goodsSelect.setNewVipPrice(good.getNewVipPrice());
//			// 新批发价
//			goodsSelect.setNewWsPrice(good.getNewWsPrice());
			// 数量
//			goodsSelect.setApplyNum(good.getApplyNum());
//			goodsSelect.setRealNum(good.getRealNum());
//			goodsSelect.setReceiveNum(good.getReceiveNum());
//			goodsSelect.setDealNum(good.getDealNum());
			// 是否赠品
//			if (Constant.ISGIFT.equals(good.getIsGift())) {
//				goodsSelect.setIsGift(Constant.STRING_ONE);
//			} else {
//				goodsSelect.setIsGift(Constant.ZERO_STR);
//			}

			goodsSelectList.add(goodsSelect);
		}
	}*/

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
			GoodsSelectVo goodsVo = JSON.parseObject(GoodsSelectJson,
					GoodsSelectVo.class);
			LOG.info("goodsVo:" + goodsVo);
			goodsVo.setBranchId(UserUtil.getCurrBranchId());
			goodsVo.setPricingType(99);
			LOG.info("vo:" + goodsVo.toString());
			List<GoodsSelect> list = goodsSelectServiceApi
					.queryScaleGoods(goodsVo);
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
			GoodsCategoryVo vo = JSON.parseObject(categoryVoJson,
					GoodsCategoryVo.class);
			LOG.info("vo:" + vo.toString());
			PageUtils<GoodsCategory> suppliers = goodsCategoryService
					.queryLists(vo);
			LOG.info("page" + suppliers.toString());
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
	public List<GoodsSelect> enterSearchGoodsDeliver(String skuCode,
			String formType, String sourceBranchId, String targetBranchId) {
		LOG.info("enter事件配送导入参数:skuCode=" + skuCode+",formType="+formType+
				",sourceBranchId="+sourceBranchId+",targetBranchId="+targetBranchId);
		List<GoodsSelect> goodsSelect = new ArrayList<GoodsSelect>();
		if (StringUtils.isNotEmpty(skuCode)) {
			goodsSelect = goodsSelectServiceApi.queryBySkuCodeForDeliver(
					skuCode, formType, sourceBranchId, targetBranchId);
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
			try {
				BeanUtils.copyProperties(goodsSelectDeliver, goodsSelect);
			} catch (IllegalAccessException | InvocationTargetException e) {
				LOG.error("转换商品信息异常:{}", e);
			}
			goodsSelectDelivers.add(goodsSelectDeliver);
		}
		if (StringUtils.isEmpty(goodsStockVos.getGoodsSkuVo().get(0).getNum())) {
			return goodsSelectDelivers;
		} else {
			Map<String, GoodsSkuVo> map = getGoodsSkuVo(goodsStockVos);
			if (flag) {
				for (GoodsSelectDeliver temp : goodsSelectDelivers) {
					temp.setNum(map.get(temp.getId()).getNum());
				}
			} else {
				for (GoodsSelectDeliver temp : goodsSelectDelivers) {
					GoodsSkuVo vo = map.get(temp.getId());
					temp.setNum(vo.getNum());
					temp.setDistributionPrice(vo.getDistributionPrice());
					temp.setIsGift(vo.getIsGift());
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
}
