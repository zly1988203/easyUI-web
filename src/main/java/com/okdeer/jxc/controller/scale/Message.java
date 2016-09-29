package com.okdeer.jxc.controller.scale;

import java.io.Serializable;

import com.alibaba.fastjson.JSON;

public class Message implements Serializable{

	/**
	 * @Fields SUCCESS : 成功
	 */
	public final static String  SUCCESS="success";
	/**
	 * @Fields FAIT : 失败
	 */
	public final static String  FAIT="fail";

	/**
	 * @Fields NOT_LOGGED :未登录
	 */
	public final static String NOT_LOGGED="not_logged";
	/**
	 *版本号
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * @Fields success : 是否执行成功标示
	 */
	private String success=SUCCESS;
	/**
	 * @Fields message : 提示消息
	 */
	private String message;
	/**
	 * @Fields data : 返回数据
	 */
	private Object data;
	
	public static Message SUCCESS_MSG=new Message(SUCCESS,null,null);


	public Message(){

	}

	public Message(String success, String message, Object data) {
		this.success = success;
		this.message = message;
		this.data = data;
	}

	/**
	 * @return the success
	 */
	public String getSuccess() {
		return success;
	}


	/**
	 * @param success the success to set
	 */
	public void setSuccess(String success) {
		this.success = success;
	}

	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	public Object getData() {
		return data;
	}


	public void setData(Object data) {
		this.data = data;
	}

	/**
	 * (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return JSON.toJSONString(this);
	}

	/**
	 * @Description: 判断是否为true
	 * @return   
	 * @return boolean  
	 * @throws
	 * @author yangyq02
	 * @date 2016年8月25日
	 */
	public boolean isResult(){
		return SUCCESS.equals(this.success);
	}
	/**
	 * @Description: 成功
	 * @return   
	 * @return Message  
	 * @throws
	 * @author yangyq02
	 * @date 2016年9月18日
	 */
	public static Message getSuccessMsg(){
		return  SUCCESS_MSG;
	}
	/**
	 * @Description: 成功
	 * @param data
	 * @return   
	 * @return Message  
	 * @throws
	 * @author yangyq02
	 * @date 2016年9月18日
	 */
	public static Message getSuccessMsg(Object data){
		return new Message(SUCCESS,null,data);
	}
	/**
	 * @Description: 失败
	 * @param str
	 * @return   
	 * @return Message  
	 * @throws
	 * @author yangyq02
	 * @date 2016年9月18日
	 */
	public static Message getFailMsg(String str){
		return new Message(FAIT,str,null);
	}
	
	/**
	 * @Description: 未登录
	 * @param data
	 * @return   
	 * @return Message  
	 * @throws
	 * @author yangyq02
	 * @date 2016年9月18日
	 */
	public static Message getNotLogged(){
		return new Message(NOT_LOGGED ,"用户为登录，请登录后再操作",null);
	}
}
