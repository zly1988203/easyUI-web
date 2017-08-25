package com.okdeer.jxc.controller.logistics;

import java.io.Serializable;
import java.math.BigDecimal;

public class ImportEntity implements Serializable {

	/**
	 * @Fields serialVersionUID : serialVersionUID
	 */
	private static final long serialVersionUID = -421241876104597128L;

	/**
	 * 单号
	 */
	private String formNo;

	/**
	 * 货号
	 */
	private String skuCode;

	/**
	 * 条码
	 */
	private String barCode;

	/**
	 * 数量
	 */
	private BigDecimal num;

	/**
	 * 赠品数量
	 */
	private BigDecimal giftNum;

	public String getFormNo() {
		return formNo;
	}

	public void setFormNo(String formNo) {
		this.formNo = formNo;
	}

	public String getSkuCode() {
		return skuCode;
	}

	public void setSkuCode(String skuCode) {
		this.skuCode = skuCode;
	}

	public String getBarCode() {
		return barCode;
	}

	public void setBarCode(String barCode) {
		this.barCode = barCode;
	}

	public BigDecimal getNum() {
		return num;
	}

	public void setNum(BigDecimal num) {
		this.num = num;
	}

	public BigDecimal getGiftNum() {
		return giftNum;
	}

	public void setGiftNum(BigDecimal giftNum) {
		this.giftNum = giftNum;
	}

	@Override
	public String toString() {
		return "ImportEntity [formNo=" + formNo + ", skuCode=" + skuCode + ", barCode=" + barCode + ", num=" + num
				+ ", giftNum=" + giftNum + "]";
	}
}
