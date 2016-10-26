package com.okdeer.jxc.controller.goods;  

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.stock.entity.GoodsComponent;
import com.okdeer.jxc.stock.service.GoodsComponentApi;
import com.okdeer.jxc.stock.vo.GoodsComponentVo;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: GoodsComponentController 
 * @Description: 商品组合设置
 * @author yangyq02
 * @date 2016年10月25日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *	进销存V2.0.0		 2016年10月25日			       杨永钦  			           组合商品Controller
 */

@Controller
@RequestMapping("goods/component")
public class GoodsComponentController extends BaseController<GoodsSelectController> {
	@Reference(version = "1.0.0", check = false)
	GoodsComponentApi goodsComponentApi;

	@RequestMapping(value = "view")
	public String view() {
		return "goods/goodsComponent";
	}

	/**
	 * @Description: 查询组合商品列表
	 * @return   
	 * @return PageUtils<GoodsSku>  
	 * @throws
	 * @author yangyq02
	 * @date 2016年10月25日
	 */
	@RequestMapping(value = "queryList",method=RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsComponent>  queryList( GoodsComponentVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try{
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			PageUtils<GoodsComponent> page= goodsComponentApi.queryLists(vo);
			return page;
		}catch(Exception e){
			LOG.error("查询组合商品失败！:{}",e);
			return null;
		}
	}
	/**
	 * @Description: 查询商品成分
	 * @return   
	 * @return List<GoodsSku>  
	 * @throws
	 * @author yangyq02
	 * @date 2016年10月25日
	 */
	@RequestMapping(value = "queryComponent",method=RequestMethod.POST)
	@ResponseBody
	public List<GoodsComponent>  queryComponent(String skuId) {
		try{

			return goodsComponentApi.queryComponent(skuId);
		}catch(Exception e){
			LOG.error("查询商品成分失败！:{}",e);
			return null;
		}
	}
	/**
	 * @Description: 保存商品成分
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author yangyq02
	 * @date 2016年10月25日
	 */
	@RequestMapping(value = "saveComponent",method=RequestMethod.POST)
	@ResponseBody
	public RespJson  saveComponent(String goodsJson) {
		try{
			JSONObject jsonObject = com.alibaba.fastjson.JSON.parseObject(goodsJson);
			String skuId=jsonObject.getString("skuId");
//			com.alibaba.fastjson.JSONArray jsonList =JSON.parseArray(jsonObject.getString("detailList"));
//			for(int i=0;i<jsonList.size();i++){
//				JSONObject object = com.alibaba.fastjson.JSON.parseObject(jsonList.get(i).toString());
//				object.remove("type");
//			}
			List<GoodsComponent> componentList=JSON.parseArray(jsonObject.getString("detailList"),GoodsComponent.class );
			goodsComponentApi.save( skuId,UserUtil.getCurrUserId(), componentList);
			return RespJson.success();
		}catch(Exception e){
			LOG.error("保存商品成分失败！:{}",e);
			return RespJson.error("保存商品成分失败！");
		}
	}
}
