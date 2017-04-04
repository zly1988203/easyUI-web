package com.okdeer.jxc.controller.goods;  

import java.util.Date;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.UuidUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.goods.entity.GoodsBarcode;
import com.okdeer.jxc.goods.entity.GoodsBranchPrice;
import com.okdeer.jxc.goods.qo.GoodsBarcodeQo;
import com.okdeer.jxc.goods.service.GoodsBarcodeService;
import com.okdeer.jxc.utils.UserUtil;

@Controller
@RequestMapping("goods/goodsBarcode")
public class GoodsBarcodeController extends BaseController<GoodsBarcodeController>{
	@Reference(version = "1.0.0", check = false)
	GoodsBarcodeService goodsBarcodeService;
	@RequestMapping(value = "querySkuBarCodeBySkuId", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<com.okdeer.jxc.goods.entity.GoodsBarcode> querySkuBarCodeBySkuId(String skuId){
		try{
			GoodsBarcodeQo qo=new GoodsBarcodeQo();
			qo.setSkuId(skuId);
			//只查询商品非主条码信息
			qo.setIsPrimary(Boolean.FALSE);
			return new PageUtils<com.okdeer.jxc.goods.entity.GoodsBarcode>(goodsBarcodeService.queryLists(qo));
		}catch(Exception e){
			LOG.error("查询商品各机构信息失败", e);
			return null;
		}
	}
	/**
	 * @Description: 保存分公司安全库存
	 * @param qo
	 * @return   
	 * @return PageUtils<GoodsBranchPriceVo>  
	 * @throws
	 * @author yangyq02
	 * @date 2017年3月12日
	 */
	@RequestMapping(value = "saveSkuBarCode", method = RequestMethod.POST)
	@ResponseBody
	public RespJson saveSkuBarCode(@RequestBody String json){
		try{
			List<GoodsBarcode> list=JSON.parseArray(json, GoodsBarcode.class);
			if(CollectionUtils.isEmpty(list)){
				return RespJson.error("附加条码不允许为空！");
			}
			for(GoodsBarcode barCode:list){
				barCode.setUpdateUserId(UserUtil.getCurrUserId());
				barCode.setCreateUserId(UserUtil.getCurrUserId());
			}
			return goodsBarcodeService.saveGoodsBarcode(list, list.get(0).getSkuId());
		}catch(Exception e){
			LOG.error("保存附加条码失败", e);
			return RespJson.error("保存附加条码失败");
		}
	}
}
