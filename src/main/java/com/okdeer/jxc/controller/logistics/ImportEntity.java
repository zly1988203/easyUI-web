package com.okdeer.jxc.controller.logistics;

import java.io.Serializable;
import java.math.BigDecimal;

public class ImportEntity implements Serializable {

	/**
	 * @Fields serialVersionUID : serialVersionUID
	 */
	private static final long serialVersionUID = -421241876104597128L;

	/**
	 * 业务系统单号
	 */
	private String formNo;

	/**
	 * 物流系统单号
	 */
	private String logisticFormNo;

	/**
	 * 行号
	 */
	private Integer rowNo;

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

	/**
	 * 备注
	 */
	private String remark;

	public String getFormNo() {
		return formNo;
	}

	public void setFormNo(String formNo) {
		this.formNo = formNo;
	}

	public String getLogisticFormNo() {
		return logisticFormNo;
	}

	public void setLogisticFormNo(String logisticFormNo) {
		this.logisticFormNo = logisticFormNo;
	}

	public Integer getRowNo() {
		return rowNo;
	}

	public void setRowNo(Integer rowNo) {
		this.rowNo = rowNo;
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

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Override
	public String toString() {
		return "ImportEntity [formNo=" + formNo + ", logisticFormNo=" + logisticFormNo + ", rowNo=" + rowNo
				+ ", skuCode=" + skuCode + ", barCode=" + barCode + ", num=" + num + ", giftNum=" + giftNum
				+ ", remark=" + remark + "]";
	}

}