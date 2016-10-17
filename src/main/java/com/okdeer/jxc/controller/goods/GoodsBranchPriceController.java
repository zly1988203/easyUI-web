/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年9月17日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.goods;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.enums.GoodsStatusEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.goods.entity.GoodsBranchPrice;
import com.okdeer.jxc.goods.entity.GoodsBranchPriceVo;
import com.okdeer.jxc.goods.qo.GoodsBranchPriceQo;
import com.okdeer.jxc.goods.service.GoodsBranchPriceServiceApi;
import com.okdeer.jxc.goods.service.GoodsSkuSyncServiceApi;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;
import com.okdeer.jxc.utils.poi.ExcelReaderUtil;

/**
 * ClassName: GoodsBranchPriceController 
 * @Description: 店铺商品
 * @author xiaoj02
 * @date 2016年9月17日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    进销存2.0.0		   2016年9月17日                  xiaoj02            		店铺商品
 */

@Controller
@RequestMapping("branch/goods")
public class GoodsBranchPriceController {

	@Reference(version = "1.0.0", check = false)
	private GoodsBranchPriceServiceApi goodsBranchPriceService;
	
	@Reference(version = "1.0.0", check = false)
	private GoodsSkuSyncServiceApi goodsSkuSyncServiceApi;
	
	private static final Logger LOG = LoggerFactory.getLogger(GoodsBranchPriceController.class);
	
	/**
	 * 列表
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月15日
	 */
	@RequestMapping(value = "list")
	public String list() {
		return "goods/branchgoods/list";
	}
	
	@RequestMapping(value = "listData", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsBranchPriceVo> listData(GoodsBranchPriceQo qo) {
		if(StringUtils.isBlank(qo.getBranchId())){
			SysUser user = UserUtil.getCurrentUser();
			qo.setBranchId(user.getBranchId());
		}
		if(qo.getStatus()==null){
			qo.setStatus(0);
		}
		try {
			PageUtils<GoodsBranchPriceVo> branchGoods = goodsBranchPriceService.queryBranchGoods(qo);
			return branchGoods;
		} catch (Exception e) {
			LOG.error("查询店铺商品异常:", e);
		}
		return null;
	}
	
	/**
	 * 批量启用商品
	 * @param skuIds
	 * @param storeId
	 * @return
	 * @author xiaoj02
	 * @date 2016年9月17日
	 */
	@RequestMapping(value = "enable", method = RequestMethod.POST)
	@ResponseBody
	public RespJson enable(String skuIds, String branchId) {
		if(StringUtils.isBlank(skuIds)){
			return RespJson.error("未选择商品");
		}
		String[] skuIdArray = skuIds.split(",");
		
		if(skuIdArray.length==0){
			return RespJson.error("未选择商品");
		}
		if(skuIdArray.length>1000){
			return RespJson.error("选择的商品数量超过了限制数量");
		}
		
		List<String> skuIdList = new ArrayList<String>();
		for (int i = 0; i < skuIdArray.length; i++) {
			skuIdList.add(skuIdArray[i]);
		}
		SysUser user = UserUtil.getCurrentUser();
		
		if(StringUtils.isBlank(branchId)){
			branchId = user.getBranchId();
		}
		
		try {
			goodsBranchPriceService.enable(skuIdList, branchId, user.getId());
		} catch (Exception e) {
			return RespJson.error("导入失败");
		}
		
		return RespJson.success();
	}
	
	/**
	 * 批量启用商品
	 * @param skuIds
	 * @param storeId
	 * @return
	 * @author xiaoj02
	 * @date 2016年9月17日
	 */
	@RequestMapping(value = "enableOne", method = RequestMethod.POST)
	@ResponseBody
	public RespJson enableOne(String skuIds, String branchId) {
		if(StringUtils.isBlank(skuIds)){
			return RespJson.error("未选择商品");
		}
		String[] skuIdArray = skuIds.split(",");
		
		if(skuIdArray.length==0){
			return RespJson.error("未选择商品");
		}
		if(skuIdArray.length>1){
			return RespJson.error("选择的商品数量超过了限制数量");
		}
		
		SysUser user = UserUtil.getCurrentUser();
		
		if(StringUtils.isBlank(branchId)){
			branchId = user.getBranchId();
		}
		
		try {
			goodsBranchPriceService.enableOne(skuIds, branchId, user.getId());
		} catch (Exception e) {
			return RespJson.error("导入失败");
		}
		
		return RespJson.success();
	}
	
	/**
	 * 批量淘汰商品
	 * @param skuCodes
	 * @param storeId
	 * @author zhongy
	 * @date 2016年10月12日
	 */
	@RequestMapping(value = "eliminateGoodsStoreSku", method = RequestMethod.POST)
	@ResponseBody
	public RespJson eliminateGoodsStoreSku(String goodsStoreSkuIds, String branchId) {
		if(StringUtils.isBlank(goodsStoreSkuIds)){
			return RespJson.error("批量淘汰商品");
		}
		String[] skuIdArray = goodsStoreSkuIds.split(",");
		
		if(skuIdArray.length==0){
			return RespJson.error("未选择商品");
		}
		if(skuIdArray.length>1000){
			return RespJson.error("选择的商品数量超过了限制数量");
		}
		
		List<String> skuIdList = new ArrayList<String>();
		for (int i = 0; i < skuIdArray.length; i++) {
			skuIdList.add(skuIdArray[i]);
		}
		SysUser user = UserUtil.getCurrentUser();
		
		if(StringUtils.isBlank(branchId)){
			branchId = user.getBranchId();
		}
		try {
			goodsSkuSyncServiceApi.eliminateGoodsStoreSkuToMq(branchId, skuIdList);
		} catch (Exception e) {
			return RespJson.error(e.getLocalizedMessage());
		}
		return RespJson.success();
	}
	
	/**
	 * 批量恢复商品
	 * @param skuCodes
	 * @param storeId
	 * @author zhongy
	 * @date 2016年10月12日
	 */
	@RequestMapping(value = "recoveryGoodsStoreSku", method = RequestMethod.POST)
	@ResponseBody
	public RespJson recoveryGoodsStoreSku(String skuObjs) {
		if(StringUtils.isBlank(skuObjs)){
			return RespJson.error("批量淘汰商品");
		}
		String[] skuObjArr = skuObjs.split("\\|");
		
		if(skuObjArr.length==0){
			return RespJson.error("未选择商品");
		}
		if(skuObjArr.length>1000){
			return RespJson.error("选择的商品数量超过了限制数量");
		}
		
		List<GoodsBranchPrice> goodsBranchPriceList = new ArrayList<GoodsBranchPrice>();
		for(int i=0;i<skuObjArr.length;i++) {
			GoodsBranchPrice goodsBranchPrice = new GoodsBranchPrice();
			//skuObj格式备注：skuObj=id+","+skuId + ','+branchId+"|"
			String[] skuObj = skuObjArr[i].split(",");
			goodsBranchPrice.setStatus(String.valueOf(GoodsStatusEnum.NORMAL.ordinal()));
			goodsBranchPrice.setId(skuObj[0]);
			goodsBranchPrice.setSkuId(skuObj[1]);
			goodsBranchPrice.setBranchId(skuObj[2]);
			goodsBranchPriceList.add(goodsBranchPrice);
		}
		try {
			if(CollectionUtils.isNotEmpty(goodsBranchPriceList)) {
			   goodsSkuSyncServiceApi.recoveryGoodsStoreSkuToMq(goodsBranchPriceList);
			}
		} catch (Exception e) {
			return RespJson.error(e.getLocalizedMessage());
		}
		return RespJson.success();
	}
	
	/**
	 * 
	 * @Description: 导入
	 * @param file
	 * @return
	 * @author xiaoj02
	 * @date 2016年9月24日
	 */
	@RequestMapping(value = "/importListEnable", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsBranchPriceVo> importListEnable(@RequestParam("file") MultipartFile file, String branchId, Integer type) {
		try {
			if (file.isEmpty()) {
				LOG.info("file is empty");
				return null;
			}
			
			if(type == null){
				type = 0;
			}
			
			// 文件流
			InputStream is = file.getInputStream();
			// 获取文件名
			String fileName = file.getOriginalFilename();
			// 解析Excel
			List<String> list = ExcelReaderUtil.readExcelForFirstColumn(fileName, is, new String());
			List<String> tempList = new ArrayList<String>();
			for (String barCode : list) {
				if(barCode != null && barCode.indexOf(".") != -1){
					tempList.add(barCode.substring(0,barCode.indexOf(".")));
				}else{
					tempList.add(barCode);
				}
			}
			
			List<GoodsBranchPriceVo> goodsList = goodsBranchPriceService.querySkuGoodsByBarCodes(tempList,branchId,type);
			
			PageUtils<GoodsBranchPriceVo> pageUtils = new PageUtils<GoodsBranchPriceVo>(goodsList);
			return pageUtils;
		} catch (IOException e) {
			LOG.error("读取Excel流异常:", e);
		} catch (Exception e) {
			LOG.error("用户导入异常:", e);
		}
		return null;
	}

	
	
	
	
}
