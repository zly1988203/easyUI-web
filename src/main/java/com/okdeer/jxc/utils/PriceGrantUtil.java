
package com.okdeer.jxc.utils;

import java.math.BigDecimal;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import com.okdeer.jxc.common.enums.PriceGrantEnum;
import com.okdeer.jxc.common.exception.BusinessException;
import com.okdeer.jxc.common.handler.PriceGrantHandler;
import com.okdeer.jxc.system.entity.SysUser;

/**
 * ClassName: PriceGrantUtil 
 * @Description: 价格权限控制
 * @author liwb
 * @date 2016年8月13日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *		进销存2.0	  2016年8月18日			 liwb			    价格权限控制工具类
 */

@Component
public class PriceGrantUtil {
	
	/**
	 * 私有构造函数
	 * <p>Title: 私有构造函数</p> 
	 * <p>Description: 增加私有构造函数用以隐藏公开构造函数</p>
	 */
	private PriceGrantUtil(){
		super();
	}
	
	/**
	 * @Description: 过滤价格权限
	 * @param handler
	 * @author liwb
	 * @date 2016年8月18日
	 */
	public void grantPrice(PriceGrantHandler handler) {

		// 过滤销售价
		BigDecimal salePrice = grantSalePrice(handler.getSalePrice());
		handler.setSalePrice(salePrice);

		// 过滤会员价
		BigDecimal vipPrice = grantVipPrice(handler.getVipPrice());
		handler.setVipPrice(vipPrice);

		// 过滤采购价
		BigDecimal purchasePrice = grantPurchasePrice(handler
				.getPurchasePrice());
		handler.setPurchasePrice(purchasePrice);

		// 过滤批发价
		BigDecimal wholesalePrice = grantWholesalePrice(handler
				.getWholesalePrice());
		handler.setWholesalePrice(wholesalePrice);

		// 过滤最低售价
		BigDecimal lowestPrice = grantLowestPrice(handler.getLowestPrice());
		handler.setLowestPrice(lowestPrice);

		// 过滤销售价
		BigDecimal distributionPrice = grantDistributionPrice(handler
				.getDistributionPrice());
		handler.setDistributionPrice(distributionPrice);
	}

	/**
	 * @Description: 根据权限获取零售价
	 * @param salePrice
	 * @return
	 * @author liwb
	 * @date 2016年8月13日
	 */
	public BigDecimal grantSalePrice(BigDecimal salePrice) {
		return grantPriceCommon(salePrice, PriceGrantEnum.SALE_PRICE);
	}

	/**
	 * @Description: 
	 * @param vipPrice
	 * @return
	 * @author liwb
	 * @date 2016年8月13日
	 */
	public BigDecimal grantVipPrice(BigDecimal vipPrice) {
		return grantPriceCommon(vipPrice, PriceGrantEnum.VIP_PRICE);
	}

	/**
	 * @Description: 根据权限获取采购价
	 * @param purchasePrice
	 * @return
	 * @author liwb
	 * @date 2016年8月13日
	 */
	public BigDecimal grantPurchasePrice(BigDecimal purchasePrice) {
		return grantPriceCommon(purchasePrice, PriceGrantEnum.PURCHASE_PRICE);
	}

	/**
	 * @Description: 根据权限获取批发价
	 * @param wholesalePrice
	 * @return
	 * @author liwb
	 * @date 2016年8月13日
	 */
	public BigDecimal grantWholesalePrice(BigDecimal wholesalePrice) {
		return grantPriceCommon(wholesalePrice, PriceGrantEnum.WHOLESALE_PRICE);
	}

	/**
	 * @Description: 根据权限获取最低售价
	 * @param wholesalePrice
	 * @return
	 * @author liwb
	 * @date 2016年8月13日
	 */
	public BigDecimal grantLowestPrice(BigDecimal lowestPrice) {
		return grantPriceCommon(lowestPrice, PriceGrantEnum.LOWEST_PRICE);
	}

	/**
	 * @Description: 根据权限获取配送价
	 * @param wholesalePrice
	 * @return
	 * @author liwb
	 * @date 2016年8月13日
	 */
	public BigDecimal grantDistributionPrice(BigDecimal distributionPrice) {
		return grantPriceCommon(distributionPrice,
				PriceGrantEnum.DISTRIBUTION_PRICE);
	}


	/**
	 * @Description: 获取redis中的用户价格权限
	 * @param userId
	 * @return
	 * @author liwb
	 * @date 2016年8月17日
	 */
	public String getPriceGrant() {

		// key值
//		String key = buildPriceGrantRedisKey();
//
//		// 获取redis中的价格权限值
//		String priceGrant = redisTemplate.opsForValue().get(key);
		
		SysUser sysUser = UserUtil.getCurrentUser();
		if(sysUser==null){
			throw new BusinessException("用户未登陆，或者session失效");
		}
		
		return sysUser.getPriceGrant();
	}



	/**
	 * @Description: 获取价格权限通用方法，无权限返回null，有权限则返回价格本身
	 * @param price
	 * @param priceGrantEnum
	 * @return
	 * @author liwb
	 * @date 2016年8月13日
	 */
	private BigDecimal grantPriceCommon(BigDecimal price,
			PriceGrantEnum priceGrantEnum) {

		String priceGrant = getPriceGrant();

		// 如果价格权限为空，则说明无限制
		if (StringUtils.isBlank(priceGrant)) {
			return price;
		}

		// 如果有权限，则直接返回价格
		String[] priceGrants = priceGrant.split(",");
		for (String s : priceGrants) {
			if (priceGrantEnum.getValue().equals(s)) {
				return price;
			}
		}

		return null;
	}

}
