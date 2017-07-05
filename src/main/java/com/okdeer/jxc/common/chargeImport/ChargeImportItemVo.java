/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年6月5日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.common.chargeImport;

import java.math.BigDecimal;

/**
 * ClassName: ChargeImportVo 
 * @Description: 费用导入Vo
 * @author liwb
 * @date 2017年6月5日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

public class ChargeImportItemVo implements java.io.Serializable {

	/**
	 * @Fields serialVersionUID : serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	/*** 费用字典ID */
	private String costTypeId;

	/*** 费用代码 */
	private String costTypeCode;

	/*** 费用名称 */
	private String costTypeLabel;

	/*** 费用值 */
	private BigDecimal amount;

	/*** 备注 */
	private String remark;

	@Override
	public String toString() {
		return "ChargeImportVo [costTypeId=" + costTypeId + ", costTypeCode=" + costTypeCode + ", costTypeLabel="
				+ costTypeLabel + ", amount=" + amount + ", remark=" + remark + "]";
	}

	public String getCostTypeId() {
		return costTypeId;
	}

	public void setCostTypeId(String costTypeId) {
		this.costTypeId = costTypeId;
	}

	public String getCostTypeCode() {
		return costTypeCode;
	}

	public void setCostTypeCode(String costTypeCode) {
		this.costTypeCode = costTypeCode;
	}

	public String getCostTypeLabel() {
		return costTypeLabel;
	}

	public void setCostTypeLabel(String costTypeLabel) {
		this.costTypeLabel = costTypeLabel;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}
