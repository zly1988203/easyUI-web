/** 
 *@Project: okdeer-jxc-pos 
 *@Author: liwb
 *@Date: 2016年11月17日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */
package com.okdeer.jxc.controller.common;

import java.io.Serializable;

import com.alibaba.fastjson.JSONObject;
import com.okdeer.jxc.common.utils.FastJsonUtils;

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

public class RequestJson<T> implements Serializable {

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
	 * @Fields branchCode : 店铺Code
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
	 * @Fields version : APP客户端版本号
	 */
	private Long version;

	/**
	 * @Fields posNo : POS编号
	 */
	private String posNo;

	/**
	 * @Fields data : data数据
	 */
	private T data;

	@Override
	public String toString() {
		return "RequestJson [userId=" + userId + ", branchId=" + branchId + ", branchCode=" + branchCode + ", token="
				+ token + ", machinecode=" + machinecode + ", version=" + version + ", posNo=" + posNo + ", data="
				+ data + "]";
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

	public T getData() {
		return data;
	}

	public JSONObject getDataJSONObject() {
		return FastJsonUtils.toJSONObject(data);
	}

	public void setData(T data) {
		this.data = data;
	}

	public String getBranchCode() {
		return branchCode;
	}

	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}

	public Long getVersion() {
		return version;
	}

	public void setVersion(Long version) {
		this.version = version;
	}

	public String getPosNo() {
		return posNo;
	}

	public void setPosNo(String posNo) {
		this.posNo = posNo;
	}

}
