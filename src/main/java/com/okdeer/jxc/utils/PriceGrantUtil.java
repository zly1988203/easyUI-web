
package com.okdeer.jxc.utils;

import java.math.BigDecimal;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import com.okdeer.jxc.common.enums.PriceGrantEnum;
import com.okdeer.jxc.common.handler.PriceGrantHandler;

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
	 * @Fields PRICE_GRANT : redis 保存价格权限key值
	 */
	private static final String PRICE_GRANT = "JXC_PRICE_GRANT_";

	/**
	 * @Fields PRICE_GRANT_TIME_MINUETS : 保存价格权限到redis的时间
	 */
	private static final int PRICE_GRANT_TIME_MINUETS = 60;

	/**
	 * @Fields redisTemplate :  redis操作工具类，方便注入的普通属性
	 */
	@Resource
	private StringRedisTemplate redisTemplateTmp;

	/**
	 * @Fields redisTemplate :  redis操作工具类
	 */
	private static StringRedisTemplate redisTemplate;

	/**
	 * @Description: 过滤价格权限
	 * @param handler
	 * @author liwb
	 * @date 2016年8月18日
	 */
	public static synchronized void grantPrice(PriceGrantHandler handler) {

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
	public static BigDecimal grantSalePrice(BigDecimal salePrice) {
		return grantPriceCommon(salePrice, PriceGrantEnum.SALE_PRICE);
	}

	/**
	 * @Description: 
	 * @param vipPrice
	 * @return
	 * @author liwb
	 * @date 2016年8月13日
	 */
	public static BigDecimal grantVipPrice(BigDecimal vipPrice) {
		return grantPriceCommon(vipPrice, PriceGrantEnum.VIP_PRICE);
	}

	/**
	 * @Description: 根据权限获取采购价
	 * @param purchasePrice
	 * @return
	 * @author liwb
	 * @date 2016年8月13日
	 */
	public static BigDecimal grantPurchasePrice(BigDecimal purchasePrice) {
		return grantPriceCommon(purchasePrice, PriceGrantEnum.PURCHASE_PRICE);
	}

	/**
	 * @Description: 根据权限获取批发价
	 * @param wholesalePrice
	 * @return
	 * @author liwb
	 * @date 2016年8月13日
	 */
	public static BigDecimal grantWholesalePrice(BigDecimal wholesalePrice) {
		return grantPriceCommon(wholesalePrice, PriceGrantEnum.WHOLESALE_PRICE);
	}

	/**
	 * @Description: 根据权限获取最低售价
	 * @param wholesalePrice
	 * @return
	 * @author liwb
	 * @date 2016年8月13日
	 */
	public static BigDecimal grantLowestPrice(BigDecimal lowestPrice) {
		return grantPriceCommon(lowestPrice, PriceGrantEnum.LOWEST_PRICE);
	}

	/**
	 * @Description: 根据权限获取配送价
	 * @param wholesalePrice
	 * @return
	 * @author liwb
	 * @date 2016年8月13日
	 */
	public static BigDecimal grantDistributionPrice(BigDecimal distributionPrice) {
		return grantPriceCommon(distributionPrice,
				PriceGrantEnum.DISTRIBUTION_PRICE);
	}

	/**
	 * @Description: 生成价格权限保存在redis中的key值
	 * @param userId
	 * @return
	 * @author liwb
	 * @date 2016年8月17日
	 */
	private static String buildPriceGrantRedisKey() {
		String userId = UserUtil.getCurrUserId();
		String key = PRICE_GRANT + userId;
		return key;
	}

	/**
	 * @Description: 获取redis中的用户价格权限
	 * @param userId
	 * @return
	 * @author liwb
	 * @date 2016年8月17日
	 */
	public static String getPriceGrant() {

		// key值
		String key = buildPriceGrantRedisKey();

		// 获取redis中的价格权限值
		String priceGrant = redisTemplate.opsForValue().get(key);

		return priceGrant;
	}

	/**
	 * @Description: 设置用户价格权限到redis中
	 * @param userId
	 * @param priceGrant
	 * @author liwb
	 * @date 2016年8月17日
	 */
	public static synchronized void setPriceGrant(String priceGrant) {

		// key值
		String key = buildPriceGrantRedisKey();

		if (StringUtils.isBlank(priceGrant)) {
			return;
		}

		// 保存60分钟
		redisTemplate.opsForValue().set(key, priceGrant,
				PRICE_GRANT_TIME_MINUETS, TimeUnit.MINUTES);
	}

	/**
	 * @Description: 清除redis中的价格权限
	 * @param userId
	 * @author liwb
	 * @date 2016年8月17日
	 */
	public static void clearPriceGrant() {
		// key值
		String key = buildPriceGrantRedisKey();

		redisTemplate.delete(key);
	}

	/**
	 * @Description: 获取价格权限通用方法，无权限返回null，有权限则返回价格本身
	 * @param price
	 * @param priceGrantEnum
	 * @return
	 * @author liwb
	 * @date 2016年8月13日
	 */
	private static BigDecimal grantPriceCommon(BigDecimal price,
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

	public StringRedisTemplate getRedisTemplateTmp() {
		return redisTemplateTmp;
	}

	public void setRedisTemplateTmp(StringRedisTemplate redisTemplateTmp) {
		this.redisTemplateTmp = redisTemplateTmp;
	}

	@PostConstruct
	public void init() {
		redisTemplate = this.redisTemplateTmp;
	}

}
