/** 
 *@Project: okdeer-jxc-pos 
 *@Author: liwb
 *@Date: 2016年11月17日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.common;

import java.io.Serializable;

import com.okdeer.jxc.common.utils.FastJsonUtils;

import net.sf.json.JSONObject;

/**
 * ClassName: RequestJson 
 * @Description: POS请求参数实体
 * @author liwb
 * @date 2016年11月17日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 零售管理系统2.0.0	  2016年11月17日			 liwb			  POS请求参数实体
 */

public class RequestJson implements Serializable {

	/**
	 * @Fields serialVersionUID : serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * @Fields userId : 用户Id
	 */
	private String userId;

	/**
	 * @Fields branchId : 店铺Id
	 */
	private String branchId;
	
	/**
	 * @Fields branchCode : 店铺code
	 */
	private String branchCode;

	/**
	 * @Fields token : token标识
	 */
	private String token;

	/**
	 * @Fields machinecode : 机器编码
	 */
	private String machinecode;
	
	/**
	 * @Fields machinecode : pos机编码
	 */
	private String posNo;

	/**
	 * @Fields data : data数据
	 */
	private String data;

	/**
	 * (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "RequestJson [userId=" + userId + ", branchId=" + branchId + ", branchCode=" + branchCode + ", token="
				+ token + ", machinecode=" + machinecode + ", posNo=" + posNo + ", data=" + data + "]";
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getBranchId() {
		return branchId;
	}

	public void setBranchId(String branchId) {
		this.branchId = branchId;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getMachinecode() {
		return machinecode;
	}

	public void setMachinecode(String machinecode) {
		this.machinecode = machinecode;
	}

	public String getData() {
		return data;
	}
	
	public String getBranchCode() {
		return branchCode;
	}
	
	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}
	
	/**
	 * @return the posNo
	 */
	public String getPosNo() {
		return posNo;
	}
	
	/**
	 * @param posNo the posNo to set
	 */
	public void setPosNo(String posNo) {
		this.posNo = posNo;
	}

	public JSONObject getDataJSONObject() {
		JSONObject obj = JSONObject.fromObject(data);
		return obj;
	}
	
	public <T> T getDataObject(Class<T> clz) {
		return FastJsonUtils.parseObject(data.toString(), clz);
	}

	public void setData(String data) {
		this.data = data;
	}

}
