/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年11月14日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc;

import java.math.BigDecimal;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.sale.activity.vo.ActivityDetailVo;
import com.okdeer.jxc.sale.activity.vo.ActivityVo;
import com.okdeer.jxc.sale.enums.ActivityType;
import com.okdeer.jxc.system.entity.SysUser;

/**
 * ClassName: ActivityControllerTest 
 * @author xiaoj02
 * @date 2016年11月14日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
public class ActivityControllerUpdateTest {
	
	@Autowired  
    private WebApplicationContext wac;  
  
    private MockMvc mockMvc; 
    
    @Before  
    public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }
    
    @Test
    @Rollback(false)//设置是否回滚 
    public void save() throws Exception {
    	MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/sale/activity/update");
    	requestBuilder.contentType(MediaType.APPLICATION_JSON_UTF8);
    	
    	SysUser user = new SysUser();
    	user.setId("junit测试用户Id");
    	user.setBranchCode("00000");
    	requestBuilder.sessionAttr(Constant.SESSION_USER, user);
    	
    	ActivityVo activityVo = new ActivityVo();
    	activityVo.setId("8a94e7f1586240b501586240b5740000");
    	activityVo.setActivityName("junit测试修改");
    	activityVo.setActivityType(ActivityType.SALE_PRICE.getValue());
    	activityVo.setActivityScope(0);
    	activityVo.setDailyStartTime(Time.valueOf("09:00:00"));
    	activityVo.setDailyEndTime(Time.valueOf("18:00:00"));
    	activityVo.setStartTime(new Date());
    	activityVo.setEndTime(new Date(System.currentTimeMillis() + 1000*60*60*24));
    	activityVo.setWeeklyActivityDay("1267");
    	activityVo.setBranchIds("junit测试机构1,junit测试机构2");
    	
    	List<ActivityDetailVo> detailList = new ArrayList<ActivityDetailVo>();
    	ActivityDetailVo detailVo1= new ActivityDetailVo();
    	detailVo1.setGoodsSkuId("junit测试商品");
    	detailVo1.setSaleAmount(new BigDecimal(998));
    	detailList.add(detailVo1);
    	activityVo.setDetailList(detailList);
    	
    	String jsonText = JSON.toJSONString(activityVo);
    	requestBuilder.content(jsonText);
    	
    	
        ResultActions resultActions = mockMvc.perform(requestBuilder);
        resultActions.andDo(MockMvcResultHandlers.print());
    }
	
}
