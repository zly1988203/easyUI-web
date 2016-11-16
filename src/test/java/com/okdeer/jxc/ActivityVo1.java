/** 
 *@Project: okdeer-jxc-api 
 *@Author: xiaoj02
 *@Date: 2016年11月11日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc;

import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import com.okdeer.jxc.sale.activity.vo.ActivityDetailVo;

/**
 * ClassName: ActivityVo 
 * @Description: TODO
 * @author xiaoj02
 * @date 2016年11月11日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

public class ActivityVo1 {
	
	/**
	 * 活动名称
	 */
	private String activityName;
	/**
	 * 活动开始时间
	 */
	private Date startTime;
	/**
	 * 活动结束时间
	 */
	private Date endTime;
	/**
	 * 活动每天的开始时间
	 */
	private String dailyStartTime;
	/**
	 * 活动每天的结束时间
	 */
	private String dailyEndTime;
	/**
	 * 活动日在星期几（1234567,表示全周都有效，23表示周二和周三有效）
	 */
	private String weeklyActivityDay;
	/**
	 * 促销活动类型（1特价、2折扣、3偶数特价、4换购、5满减、6组合特价）
	 */
	private Integer activityType;
	/**
	 * 促销活动范围（0商品、1类别、2全场）
	 */
	private Integer activityScope;
	/**
	 * 活动机构
	 */
	private String branchIds;
	/**
	 * 活动明细
	 */
	private List<ActivityDetailVo> detailList;
	
	public String validate(){
		//activityName validate
		if(StringUtils.isBlank(activityName)){
			return "<活动名称>不能为空";
		}
		
		//startTime validate
		if(startTime == null){
			return "<活动开始>时间不能为空";
		}
		
		//endTime validate
		if(endTime == null){
			return "<活动结束>时间不能为空";
		}
		Date now = new Date();
		if(endTime.before(now)){
			return "<活动结束时间>不能早于当前时间";
		}
		if(endTime.before(startTime)){
			return "<活动结束时间>不能早于开始时间";
		}
		
		//dailyStartTime validate
		if(dailyStartTime == null){
			return "<活动每天开始时间>不能为空";
		}
		
		//dailyEndTime validate
		if(dailyEndTime == null){
			return "<活动每天结束时间>不能为空";
		}
//		if(dailyEndTime.before(dailyStartTime)){
//			return "<活动每天结束时间>不能早于活动每天开始时间";
//		}
		
		//weeklyActivityDay validate
		if(StringUtils.isBlank(weeklyActivityDay)){
			return "<活动日>不能为空";
		}
		Pattern weeklyActivityDayPattern = Pattern.compile("^[1]?[2]?[3]?[4]?[5]?[6]?[7]?$");
		Matcher weeklyActivityDayMatcher = weeklyActivityDayPattern.matcher(weeklyActivityDay);
		if(!weeklyActivityDayMatcher.find()){
			return "<活动日>不合法";
		}
		
		//activityType validate
		if(activityType == null){
			return "<活动类型>不能为空";
		}
		Pattern activityTypePattern = Pattern.compile("^[123456]$");
		Matcher activityTypeMatcher = activityTypePattern.matcher(activityType.toString());
		if(!activityTypeMatcher.find()){
			return "<活动类型>不合法";
		}
		
		//activityScope validate
		if(activityScope == null){
			return "<活动范围>不能为空";
		}
		Pattern activityScopePattern = Pattern.compile("^[012]$");
		Matcher activityScopeMatcher = activityScopePattern.matcher(activityScope.toString());
		if(!activityScopeMatcher.find()){
			return "<活动范围>不合法";
		}
		
		//branchIds validate
		if(StringUtils.isBlank(branchIds)){
			return "<活动店铺>不能为空";
		}
		
		//detailList validate
		if(CollectionUtils.isEmpty(detailList)){
			return "<活动详情>不能为空";
		}
		
		//TODO 满减时，详情信息需要按满减价格排序
//		for (int i = 0; i < detailList.size(); i++) {
//			ActivityDetailVo detailVo = detailList.get(i);
//			String validMsg = detailVo.validate(activityType, activityScope);
//			if(validMsg!=null){
//				return "第" + i + "行，"+validMsg;
//			}
//		}
		
		return null;
	}
	
	
	
	/**
	 * @return the activityName
	 */
	public String getActivityName() {
		return activityName;
	}
	
	/**
	 * @param activityName the activityName to set
	 */
	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}
	
	/**
	 * @return the startTime
	 */
	public Date getStartTime() {
		return startTime;
	}
	
	/**
	 * @param startTime the startTime to set
	 */
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	
	/**
	 * @return the endTime
	 */
	public Date getEndTime() {
		return endTime;
	}
	
	/**
	 * @param endTime the endTime to set
	 */
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	
	/**
	 * @return the dailyStartTime
	 */
	public String getDailyStartTime() {
		return dailyStartTime;
	}
	
	/**
	 * @param dailyStartTime the dailyStartTime to set
	 */
	public void setDailyStartTime(String dailyStartTime) {
		this.dailyStartTime = dailyStartTime;
	}

	/**
	 * @return the dailyEndTime
	 */
	public String getDailyEndTime() {
		return dailyEndTime;
	}
	
	/**
	 * @param dailyEndTime the dailyEndTime to set
	 */
	public void setDailyEndTime(String dailyEndTime) {
		this.dailyEndTime = dailyEndTime;
	}

	/**
	 * @return the weeklyActivityDay
	 */
	public String getWeeklyActivityDay() {
		return weeklyActivityDay;
	}
	
	/**
	 * @param weeklyActivityDay the weeklyActivityDay to set
	 */
	public void setWeeklyActivityDay(String weeklyActivityDay) {
		this.weeklyActivityDay = weeklyActivityDay;
	}
	
	/**
	 * @return the activityType
	 */
	public Integer getActivityType() {
		return activityType;
	}
	
	/**
	 * @param activityType the activityType to set
	 */
	public void setActivityType(Integer activityType) {
		this.activityType = activityType;
	}
	
	/**
	 * @return the activityScope
	 */
	public Integer getActivityScope() {
		return activityScope;
	}
	
	/**
	 * @param activityScope the activityScope to set
	 */
	public void setActivityScope(Integer activityScope) {
		this.activityScope = activityScope;
	}
	
	/**
	 * @return the branchIds
	 */
	public String getBranchIds() {
		return branchIds;
	}
	
	/**
	 * @param branchIds the branchIds to set
	 */
	public void setBranchIds(String branchIds) {
		this.branchIds = branchIds;
	}
	
	/**
	 * @return the detailList
	 */
	public List<ActivityDetailVo> getDetailList() {
		return detailList;
	}
	
	/**
	 * @param detailList the detailList to set
	 */
	public void setDetailList(List<ActivityDetailVo> detailList) {
		this.detailList = detailList;
	}
	
}
