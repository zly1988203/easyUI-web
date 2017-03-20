/**
 *@Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 *@Project: okdeer-jxc-web
 *@Package: com.okdeer.jxc.controller.overdue
 *@Author: songwj
 *@Date: 2017年3月17日 上午9:58:46
 *注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.controller.overdue;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.time.LocalDateTime;

import org.hamcrest.Matchers;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.okdeer.jxc.Application;
import com.okdeer.jxc.config.test.ResourceConfig;
import com.okdeer.jxc.config.test.ShiroConfiguration;

/**
 * @ClassName: OverdueFormControllerTest
 * @Description: 调价订单控制器测试
 * @project okdeer-jxc-web
 * @author songwj
 * @date 2017年3月17日 上午9:58:46
 * =================================================================================================
 *     Task ID	         Date		  Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     V2.3         	2017年3月17日	   songwj		              调价订单控制器测试
 */
@RunWith(SpringJUnit4ClassRunner.class) // SpringJUnit支持，由此引入Spring-Test框架支持！ 
@SpringApplicationConfiguration(classes = Application.class) // 指定我们SpringBoot工程的Application启动类
@WebAppConfiguration(value = "src/main/webapp") // 由于是Web项目，Junit需要模拟ServletContext，因此我们需要给我们的测试类加上@WebAppConfiguration。
@ContextConfiguration(classes={ ResourceConfig.class, ShiroConfiguration.class })
public class OverdueFormControllerTest {

    @Autowired
    private WebApplicationContext wac;
    private MockMvc mockMvc;

    @Before
    public void setUp() throws Exception {
	mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void testOverdueList() throws Exception {
	MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/form/overdue/list"))  
	            .andExpect(MockMvcResultMatchers.view().name("form/overdue/overdueList"))  
	            .andDo(MockMvcResultHandlers.print())  
	            .andReturn();  
	int status = result.getResponse().getStatus();  
	Assert.assertTrue("错误，正确的返回值为200", status == 200);  
	Assert.assertFalse("错误，正确的返回值为200", status != 200);  
    }

    @Test
    public void testAdd() throws Exception {
	MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/form/overdue/add"))  
	            .andExpect(MockMvcResultMatchers.view().name("form/overdue/overdueAdd"))  
	            .andDo(MockMvcResultHandlers.print())  
	            .andReturn();  
	int status = result.getResponse().getStatus();  
	Assert.assertTrue("错误，正确的返回值为200", status == 200);  
	Assert.assertFalse("错误，正确的返回值为200", status != 200);  
    }

    @Test
    public void testOverdueApplyList() throws Exception {
	MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/form/overdue/apply/list"))  
	            .andExpect(MockMvcResultMatchers.view().name("form/overdue/overdueApplyList"))  
	            .andDo(MockMvcResultHandlers.print())  
	            .andReturn();  
	int status = result.getResponse().getStatus();  
	Assert.assertTrue("错误，正确的返回值为200", status == 200);  
	Assert.assertFalse("错误，正确的返回值为200", status != 200);  
    }

    @Test
    public void testOverdueApprovedList() throws Exception {
	MvcResult result = mockMvc.perform(post("/form/overdue/approved/list").contentType(MediaType.APPLICATION_JSON)
		.param("endTime", LocalDateTime.now().toString()).accept(MediaType.APPLICATION_JSON)) // 执行请求
		.andDo(print()) // print request and response to Console
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))// 验证响应contentType
		.andExpect(jsonPath("$.pageNum", is(1)))// http://goessner.net/articles/JsonPath/
		.andExpect(jsonPath("$.pageSize", is(10)))
		.andExpect(jsonPath("$.list", hasSize(Matchers.greaterThanOrEqualTo(1))))
		.andReturn(); 
	int status = result.getResponse().getStatus();  
	Assert.assertTrue("错误，正确的返回值为200", status == 200);  
	Assert.assertFalse("错误，正确的返回值为200", status != 200);  
    }

    @Test
    public void testOverdueApplyListData() throws Exception {
	MvcResult result = mockMvc.perform(post("/form/overdue/apply/list/data").contentType(MediaType.APPLICATION_JSON)
		.param("endTime", LocalDateTime.now().toString()).accept(MediaType.APPLICATION_JSON)) // 执行请求
		.andDo(print()) // print request and response to Console
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))// 验证响应contentType
		.andExpect(jsonPath("$.pageNum", is(1)))// http://goessner.net/articles/JsonPath/
		.andExpect(jsonPath("$.pageSize", is(10)))
		.andExpect(jsonPath("$.list", hasSize(Matchers.greaterThanOrEqualTo(1))))
		.andReturn(); 
	int status = result.getResponse().getStatus();  
	Assert.assertTrue("错误，正确的返回值为200", status == 200);  
	Assert.assertFalse("错误，正确的返回值为200", status != 200);  
    }

    @Test
    public void testDelete() throws Exception {
	MvcResult result = mockMvc.perform(post("/form/overdue/delete").contentType(MediaType.APPLICATION_JSON)
		.param("formIds","1","2").accept(MediaType.APPLICATION_JSON)) // 执行请求
		.andDo(print()) // print request and response to Console
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))// 验证响应contentType
		.andExpect(jsonPath("$.message", equalTo("success")))// http://goessner.net/articles/JsonPath/
		.andReturn(); 
	int status = result.getResponse().getStatus();  
	Assert.assertTrue("错误，正确的返回值为200", status == 200);  
	Assert.assertFalse("错误，正确的返回值为200", status != 200);  
    }

    @Test
    public void testEdit() {
	fail("Not yet implemented");
    }

    @Test
    public void testDetailList() {
	fail("Not yet implemented");
    }

    @Test
    public void testUpdateDetail() {
	fail("Not yet implemented");
    }

    @Test
    public void testSave() {
	fail("Not yet implemented");
    }

    @Test
    public void testCheck() {
	fail("Not yet implemented");
    }

    @Test
    public void testCommit() {
	fail("Not yet implemented");
    }

    @Test
    public void testPrintReport() {
	fail("Not yet implemented");
    }

    @Test
    public void testApprovedPrintReport() {
	fail("Not yet implemented");
    }

    @Test
    public void testEditPrintReport() {
	fail("Not yet implemented");
    }

    @Test
    public void testExportOverdueFormVoHttpServletResponse() {
	fail("Not yet implemented");
    }

    @Test
    public void testExportTemp() {
	fail("Not yet implemented");
    }

    @Test
    public void testExportList() {
	fail("Not yet implemented");
    }

    @Test
    public void testDownloadErrorFile() {
	fail("Not yet implemented");
    }

}
