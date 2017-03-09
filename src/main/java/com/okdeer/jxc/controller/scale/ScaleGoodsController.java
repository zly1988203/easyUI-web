/** 
 *@Project: okdeer-jxc-web 
 *@Author: yangyq02
 *@Date: 2016年8月3日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.scale;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.goods.entity.GoodsCategory;
import com.okdeer.jxc.goods.entity.GoodsSelect;
import com.okdeer.jxc.goods.qo.GoodsCategoryQo;
import com.okdeer.jxc.goods.service.GoodsCategoryServiceApi;
import com.okdeer.jxc.goods.service.GoodsSelectServiceApi;
import com.okdeer.jxc.goods.vo.GoodsSelectVo;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: ScaleGoodsController 
 * @Description: 商品选择Controller类
 * @author yangyq02
 * @date 2016年8月3日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *	进销存V2.0.0		2016年8月3日			       杨永钦  			商品选择Controller类
 */
@Controller
@RequestMapping("scale/scaleGoods")
public class ScaleGoodsController extends BaseController<ScaleGoodsController> {

	@Reference(version = "1.0.0", check = false)
	private GoodsSelectServiceApi goodsSelectServiceApi;

	@Reference(version = "1.0.0", check = false)
	private GoodsCategoryServiceApi goodsCategoryService;


	/**
	 * @Description: 根据货号批量查询商品
	 * @param skuCodes
	 * @return List<GoodsSelect>  
	 * @throws
	 * @author yangyq02
	 * @date 2016年8月23日
	 */
	@RequestMapping(value = "queryByCodeLists", method = RequestMethod.POST)
	@ResponseBody
	public Message queryByCodeLists(String[] skuCodes) {
		try {
			if (UserUtil.getCurrentUser() == null) {
				return Message.getNotLogged();
			}
			List<GoodsSelect> goodsList = goodsSelectServiceApi.queryByCodeLists(skuCodes, UserUtil.getCurrBranchId(),
					null);
			LOG.info("page" + goodsList.toString());
			return Message.getSuccessMsg(goodsList);
		} catch (Exception e) {
			LOG.error("查询商品选择数据出现异常:", e);
			return Message.getFailMsg("查询商品选择数据出现异常:");
		}
	}

	/**
	 * @Description: 查询电子秤商品 （重和计件商品）
	 * @param skuCodes
	 * @return List<GoodsSelect>  
	 * @throws
	 * @author yangyq02
	 * @date 2016年8月23日
	 */
	@RequestMapping(value = "queryScaleGoods", method = RequestMethod.POST)
	@ResponseBody
	public Message queryScaleGoods(String GoodsSelectJson) {
		try {
			if (UserUtil.getCurrentUser() == null) {
				return Message.getNotLogged();
			}
			GoodsSelectVo goodsVo = JSON.parseObject(GoodsSelectJson, GoodsSelectVo.class);
			LOG.info("goodsVo:" + goodsVo);
			goodsVo.setBranchId(UserUtil.getCurrBranchId());

			goodsVo.setPricingType(99);
			LOG.info("vo:" + goodsVo.toString());
			List<GoodsSelect> list = goodsSelectServiceApi.queryScaleGoods(goodsVo);
			return Message.getSuccessMsg(list);
		} catch (Exception e) {
			LOG.error("查询商品选择数据出现异常:", e);
			return Message.getFailMsg("查询商品选择数据出现异常"+e);
		}
	}

	/**
	 * @Description 查询类别
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @author yangyq02
	 * @date 2016年7月20日
	 */
	@RequestMapping(value = "getComponentList", method = RequestMethod.POST)
	@ResponseBody
	public Message getComponentList(String categoryVoJson) {
		try {
			if (UserUtil.getCurrentUser() == null) {
				return Message.getNotLogged();
			}
			GoodsCategoryQo qo = JSON.parseObject(categoryVoJson, GoodsCategoryQo.class);
			PageUtils<GoodsCategory> suppliers = goodsCategoryService.queryLists(qo);
			return Message.getSuccessMsg(suppliers.getList());
		} catch (Exception e) {
			LOG.error("查询查询类别异常:", e);
			return Message.getFailMsg("查询查询类别异常");
		}
	}
}
