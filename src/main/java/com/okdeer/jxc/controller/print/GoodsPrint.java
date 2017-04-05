/** 
 *@Project: okdeer-jxc-api 
 *@Author: yangyq02
 *@Date: 2016年8月4日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.print;

import java.io.Serializable;
import java.math.BigDecimal;
import java.text.MessageFormat;

import org.springframework.beans.factory.annotation.Value;

/**
 * ClassName: GoodsSelectVo 
 * @Description: 商品选择VO
 * @author yangyq02
 * @date 2016年8月4日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 		重构2.0			2016-8-3			xiaoj02				商品选择对象
 * 		重构2.0			2016-8-17			李俊义                                                商品价格的修改
 */
public class GoodsPrint implements Serializable {

	/**
	 * @Fields serialVersionUID : 序列化
	 */
	private static final long serialVersionUID = -771665879754110971L;

	/**
	 * @Fields branchId : 机构ID
	 */
	private String branchId;

	/**
	 * @Fields skuId : 商品SKUid
	 */
	private String skuId;

	/**
	 * @Fields skuCode : 货号
	 */
	private String skuCode;

	/**
	 * @Fields skuName : 商品名称
	 */
	private String skuName;

	/**
	 * @Fields barCode : 国际码
	 */
	private String barCode;

	/**
	 * @Fields memoryCode : 助记码
	 */
	private String memoryCode;

	/**
	 * @Fields purchasePrice : 进价（采购价）
	 */
	private BigDecimal purchasePrice;

	/**
	 * @Fields salePrice : 销售价
	 */
	private BigDecimal salePrice;

	/**
	 * @Fields wholesalePrice : 批发价
	 */
	private BigDecimal wholesalePrice;

	/**
	 * @Fields vipPrice : 会员价
	 */
	private BigDecimal vipPrice;

	/**
	 * @Fields distributionPrice : 配送价
	 */
	private BigDecimal distributionPrice;

	/**
	 * @Fields oldPurPrice : 旧采购价
	 */
	private BigDecimal oldPurPrice;

	/**
	 * @Fields oldSalePrice : 旧销售价
	 */
	private BigDecimal oldSalePrice;

	/**
	 * @Fields oldWsPrice : 旧批发价
	 */
	private BigDecimal oldWsPrice;

	/**
	 * @Fields oldVipPrice : 旧会员价
	 */
	private BigDecimal oldVipPrice;

	/**
	 * @Fields oldDcPrice : 旧配送价
	 */
	private BigDecimal oldDcPrice;

	/**
	 * 产地
	 */
	private String originPlace;

	/**
	 * @Fields promotionPrice : 促销价格
	 */
	private BigDecimal promotionPrice;

	/**
	 * @Fields printCount : 打印份数
	 */
	private Integer printCount;

	/**
	 * @Fields startTime : 活动开始日期
	 */
	private String startTime;// 活动开始日期

	/**
	 * @Fields endTime : 活动结束日期
	 */
	private String endTime;// 活动结束日期

	/**
	 * @Fields dailyStartTime : 活动开始时段
	 */
	private String dailyStartTime;// 活动开始时段

	/**
	 * @Fields dailyEndTime : 活动结束时段
	 */
	private String dailyEndTime;// 活动结束时段

	/**
	 * @Fields activityTime : 活动时间
	 */
	private String activityTime;

	/**
	 * @Fields barCodeImg :条码图片
	 */
	private String barCodeImg;

	/**
	 * @Fields qrCodeUrl : 二维码地址
	 */
	@Value("qrCodeUrl")
	private static String qrCodeUrl="http://update.okdeer.com/ymlstore.html";

	/**
	 * @Fields qrCodeInfo : 二维码信息
	 */
	@SuppressWarnings("unused")
	private String qrCodeInfo;

	public BigDecimal getOldPurPrice() {
		return oldPurPrice;
	}

	/**
	 * @return the skuName
	 */
	public String getSkuName() {
		return skuName;
	}

	/**
	 * @param skuName the skuName to set
	 */
	public void setSkuName(String skuName) {
		this.skuName = skuName;
	}

	/**
	 * @param oldPurPrice the oldPurPrice to set
	 */
	public void setOldPurPrice(BigDecimal oldPurPrice) {
		this.oldPurPrice = oldPurPrice;
	}

	/**
	 * @return the oldSalePrice
	 */
	public BigDecimal getOldSalePrice() {
		return oldSalePrice;
	}

	/**
	 * @param oldSalePrice the oldSalePrice to set
	 */
	public void setOldSalePrice(BigDecimal oldSalePrice) {
		this.oldSalePrice = oldSalePrice;
	}

	/**
	 * @return the oldWsPrice
	 */
	public BigDecimal getOldWsPrice() {
		return oldWsPrice;
	}

	/**
	 * @param oldWsPrice the oldWsPrice to set
	 */
	public void setOldWsPrice(BigDecimal oldWsPrice) {
		this.oldWsPrice = oldWsPrice;
	}

	/**
	 * @return the oldVipPrice
	 */
	public BigDecimal getOldVipPrice() {
		return oldVipPrice;
	}

	/**
	 * @param oldVipPrice the oldVipPrice to set
	 */
	public void setOldVipPrice(BigDecimal oldVipPrice) {
		this.oldVipPrice = oldVipPrice;
	}

	/**
	 * @return the oldDcPrice
	 */
	public BigDecimal getOldDcPrice() {
		return oldDcPrice;
	}

	/**
	 * @param oldDcPrice the oldDcPrice to set
	 */
	public void setOldDcPrice(BigDecimal oldDcPrice) {
		this.oldDcPrice = oldDcPrice;
	}

	/**
	 * @Fields sellable :库存（ 可销售库存）
	 */
	private String sellable;

	/**
	 * @Fields unit : 单位
	 */
	private String unit;

	/**
	 * @Fields spec : 规格
	 */
	private String spec;

	/**
	 * @return the purchasePrice
	 */
	public BigDecimal getPurchasePrice() {
		return purchasePrice;
	}

	/**
	 * @param purchasePrice the purchasePrice to set
	 */
	public void setPurchasePrice(BigDecimal purchasePrice) {
		this.purchasePrice = purchasePrice;
	}

	/**
	 * @return the salePrice
	 */
	public BigDecimal getSalePrice() {
		return salePrice;
	}

	/**
	 * @param salePrice the salePrice to set
	 */
	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}

	/**
	 * @return the wholesalePrice
	 */
	public BigDecimal getWholesalePrice() {
		return wholesalePrice;
	}

	/**
	 * @param wholesalePrice the wholesalePrice to set
	 */
	public void setWholesalePrice(BigDecimal wholesalePrice) {
		this.wholesalePrice = wholesalePrice;
	}

	/**
	 * @return the vipPrice
	 */
	public BigDecimal getVipPrice() {
		return vipPrice;
	}

	/**
	 * @param vipPrice the vipPrice to set
	 */
	public void setVipPrice(BigDecimal vipPrice) {
		this.vipPrice = vipPrice;
	}

	/**
	 * @return the distributionPrice
	 */
	public BigDecimal getDistributionPrice() {
		return distributionPrice;
	}

	/**
	 * @param distributionPrice the distributionPrice to set
	 */
	public void setDistributionPrice(BigDecimal distributionPrice) {
		this.distributionPrice = distributionPrice;
	}

	/**
	 * @return the skuId
	 */
	public String getSkuId() {
		return skuId;
	}

	/**
	 * @param skuId the skuId to set
	 */
	public void setSkuId(String skuId) {
		this.skuId = skuId;
	}

	/**
	 * @return the skuCode
	 */
	public String getSkuCode() {
		return skuCode;
	}

	/**
	 * @param skuCode the skuCode to set
	 */
	public void setSkuCode(String skuCode) {
		this.skuCode = skuCode;
	}

	/**
	 * @return the barCode
	 */
	public String getBarCode() {
		return barCode;
	}

	/**
	 * @param barCode the barCode to set
	 */
	public void setBarCode(String barCode) {
		this.barCode = barCode;
	}

	/**
	 * @return the memoryCode
	 */
	public String getMemoryCode() {
		return memoryCode;
	}

	/**
	 * @param memoryCode the memoryCode to set
	 */
	public void setMemoryCode(String memoryCode) {
		this.memoryCode = memoryCode;
	}

	/**
	 * @return the sellable
	 */
	public String getSellable() {
		return sellable;
	}

	/**
	 * @param sellable the sellable to set
	 */
	public void setSellable(String sellable) {
		this.sellable = sellable;
	}

	/**
	 * @return the unit
	 */
	public String getUnit() {
		return unit;
	}

	/**
	 * @param unit the unit to set
	 */
	public void setUnit(String unit) {
		this.unit = unit;
	}

	/**
	 * @return the spec
	 */
	public String getSpec() {
		return spec;
	}

	/**
	 * @param spec the spec to set
	 */
	public void setSpec(String spec) {
		this.spec = spec;
	}

	/**
	 * @return the promotionPrice
	 */
	public BigDecimal getPromotionPrice() {
		return promotionPrice;
	}

	/**
	 * @param promotionPrice the promotionPrice to set
	 */
	public void setPromotionPrice(BigDecimal promotionPrice) {
		this.promotionPrice = promotionPrice;
	}

	/**
	 * @return the printCount
	 */
	public Integer getPrintCount() {
		return printCount;
	}

	/**
	 * @param printCount the printCount to set
	 */
	public void setPrintCount(Integer printCount) {
		this.printCount = printCount;
	}

	/**
	 * @return the barCodeImg
	 */
	public String getBarCodeImg() {
		return barCodeImg;
	}

	/**
	 * @param barCodeImg the barCodeImg to set
	 */
	public void setBarCodeImg(String barCodeImg) {
		this.barCodeImg = barCodeImg;
	}

	/**
	 * @return the originPlace
	 */
	public String getOriginPlace() {
		return originPlace;
	}

	/**
	 * @param originPlace the originPlace to set
	 */
	public void setOriginPlace(String originPlace) {
		this.originPlace = originPlace;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getDailyStartTime() {
		return dailyStartTime;
	}

	public void setDailyStartTime(String dailyStartTime) {
		this.dailyStartTime = dailyStartTime;
	}

	public String getDailyEndTime() {
		return dailyEndTime;
	}

	public void setDailyEndTime(String dailyEndTime) {
		this.dailyEndTime = dailyEndTime;
	}

	public String getActivityTime() {
		return activityTime;
	}

	public void setActivityTime(String activityTime) {
		this.activityTime = activityTime;
	}

	public String getBranchId() {
		return branchId;
	}

	public void setBranchId(String branchId) {
		this.branchId = branchId;
	}

	public String getQrCodeInfo() {
		qrCodeInfo=  MessageFormat.format( qrCodeUrl+"?type=1&branchId={0}&barCode={1}",this.branchId,this.barCode);
		 return qrCodeInfo;
	}

	public void setQrCodeInfo(String qrCodeInfo) {
		this.qrCodeInfo = qrCodeInfo;
	}
}
