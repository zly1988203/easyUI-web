/**
 *@Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 *@Project: okdeer-jxc-web
 *@Package: com.okdeer.jxc.controller.overdue
 *@Author: songwj
 *@Date: 2017年3月17日 上午9:58:46
 *注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.controller.overdue;

import static org.hamcrest.Matchers.anyOf;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;

import java.io.File;
import java.time.LocalDateTime;

import javax.annotation.Resource;

import org.apache.commons.codec.net.URLCodec;
import org.apache.commons.io.FileUtils;
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
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportHandle;
import com.okdeer.jxc.config.test.ResourceConfig;
import com.okdeer.jxc.config.test.ShiroConfiguration;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.system.service.SysUserServiceApi;
import com.okdeer.jxc.util.ShiroTestUtils;

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

    @Resource(name = "sysUserService")
    private SysUserServiceApi sysUserService;
    
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
    public void testEdit() throws Exception {
	MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/form/overdue/edit/12"))  
	            .andExpect(MockMvcResultMatchers.view().name(anyOf(equalTo("form/overdue/overdueView"),equalTo("form/overdue/overdueEdit"),equalTo("error/500"))))  
	            .andDo(MockMvcResultHandlers.print())
	            .andExpect(model().attributeExists("errorMsg")) //验证存在错误的属性
	            .andExpect(model().attribute("errorMsg", "商品调价订单不存在！")) //验证属性相等性  
	            .andReturn();  
	int status = result.getResponse().getStatus();  
	Assert.assertTrue("错误，正确的返回值为200", status == 200);  
	Assert.assertFalse("错误，正确的返回值为200", status != 200); 
    }

    @Test
    public void testDetailList() throws Exception {
	MvcResult result = mockMvc.perform(post("/form/overdue/detail/list/123").contentType(MediaType.APPLICATION_JSON)
		.accept(MediaType.APPLICATION_JSON)) // 执行请求
		.andDo(print()) // print request and response to Console
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))// 验证响应contentType
		.andExpect(jsonPath("$.pageNum", is(0)))// http://goessner.net/articles/JsonPath/
		.andExpect(jsonPath("$.pageSize", is(10)))
		.andExpect(jsonPath("$.list", hasSize(0)))
		.andReturn(); 
	int status = result.getResponse().getStatus();  
	Assert.assertTrue("错误，正确的返回值为200", status == 200);  
	Assert.assertFalse("错误，正确的返回值为200", status != 200);  
    }

    @Test
    public void testUpdateDetail() throws Exception {
	MvcResult result = mockMvc.perform(post("/form/overdue/detail/update").content("{}"))
		.andDo(print()) // print request and response to Console
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))// 验证响应contentType
		.andExpect(jsonPath("$.message", equalTo("error")))// http://goessner.net/articles/JsonPath/
		.andReturn(); 
	int status = result.getResponse().getStatus();  
	Assert.assertTrue("错误，正确的返回值为200", status == 200);  
	Assert.assertFalse("错误，正确的返回值为200", status != 200);  
    }

    @Test
    public void testSave() throws Exception {
	MvcResult result = mockMvc.perform(post("/form/overdue/save").content("{}"))
		.andDo(print()) // print request and response to Console
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))// 验证响应contentType
		.andExpect(jsonPath("$.message", equalTo("error")))// http://goessner.net/articles/JsonPath/
		.andReturn(); 
	int status = result.getResponse().getStatus();  
	Assert.assertTrue("错误，正确的返回值为200", status == 200);  
	Assert.assertFalse("错误，正确的返回值为200", status != 200);  
    }

    @Test
    public void testCheck() throws Exception {
	MvcResult result = mockMvc.perform(post("/form/overdue/check").contentType(MediaType.APPLICATION_JSON)
		.param("formId", "").param("ids[]", "").param("auditDescs[]", "").param("status", "1")
		.accept(MediaType.APPLICATION_JSON))
		.andDo(print()) // print request and response to Console
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))// 验证响应contentType
		.andExpect(jsonPath("$.message", equalTo("error")))// http://goessner.net/articles/JsonPath/
		.andReturn(); 
	int status = result.getResponse().getStatus();  
	Assert.assertTrue("错误，正确的返回值为200", status == 200);  
	Assert.assertFalse("错误，正确的返回值为200", status != 200);  
    }

    @Test
    public void testCommit() throws Exception {
	MvcResult result = mockMvc.perform(post("/form/overdue/commit").content("{}"))
		.andDo(print()) // print request and response to Console
		.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))// 验证响应contentType
		.andExpect(jsonPath("$.message", equalTo("error")))// http://goessner.net/articles/JsonPath/
		.andReturn(); 
	int status = result.getResponse().getStatus();  
	Assert.assertTrue("错误，正确的返回值为200", status == 200);  
	Assert.assertFalse("错误，正确的返回值为200", status != 200);  
    }

    @Test
    public void testPrintReport() throws Exception {
	SysUser sysUser = sysUserService.getUserByCode("jxc_admin");
	ShiroTestUtils.mockSubject("jxc_admin",Constant.SESSION_USER,sysUser);
	MvcResult result = mockMvc.perform(get("/form/overdue/report/print"))
		.andExpect(content().contentType("application/pdf"))// 验证响应contentType
		.andReturn(); 
	byte[] io = result.getResponse().getContentAsByteArray();
	FileUtils.writeByteArrayToFile(new File(System.getProperty("user.dir")+"/src/test/resources/tmp/test.pdf"), io);
	int status = result.getResponse().getStatus();  
	Assert.assertTrue("错误，正确的返回值为200", status == 200);  
	Assert.assertFalse("错误，正确的返回值为200", status != 200);  
    }

    @Test
    public void testApprovedPrintReport() throws Exception {
	SysUser sysUser = sysUserService.getUserByCode("jxc_admin");
	ShiroTestUtils.mockSubject("jxc_admin",Constant.SESSION_USER,sysUser);
	MvcResult result = mockMvc.perform(get("/form/overdue/approved/report/print"))
		.andExpect(content().contentType("application/pdf"))// 验证响应contentType
		.andReturn(); 
	byte[] io = result.getResponse().getContentAsByteArray();
	FileUtils.writeByteArrayToFile(new File(System.getProperty("user.dir")+"/src/test/resources/tmp/test.pdf"), io);
	int status = result.getResponse().getStatus();  
	Assert.assertTrue("错误，正确的返回值为200", status == 200);  
	Assert.assertFalse("错误，正确的返回值为200", status != 200);  
    }

    @Test
    public void testEditPrintReport() throws Exception {
	SysUser sysUser = sysUserService.getUserByCode("jxc_admin");
	ShiroTestUtils.mockSubject("jxc_admin",Constant.SESSION_USER,sysUser);
	MvcResult result = mockMvc.perform(get("/form/overdue/edit/report/print"))
		.andExpect(content().contentType("application/pdf"))// 验证响应contentType
		.andReturn(); 
	byte[] io = result.getResponse().getContentAsByteArray();
	FileUtils.writeByteArrayToFile(new File(System.getProperty("user.dir")+"/src/test/resources/tmp/test.pdf"), io);
	int status = result.getResponse().getStatus();  
	Assert.assertTrue("错误，正确的返回值为200", status == 200);  
	Assert.assertFalse("错误，正确的返回值为200", status != 200); 
    }

    @Test
    public void testExportOverdueFormVo() throws Exception {
	SysUser sysUser = sysUserService.getUserByCode("jxc_admin");
	ShiroTestUtils.mockSubject("jxc_admin",Constant.SESSION_USER,sysUser);
	MvcResult result = mockMvc.perform(post("/form/overdue/exports"))
		.andDo(print()) // print request and response to Console
		.andReturn(); 
	String contentDisposition =  result.getResponse().getHeaders("Content-Disposition").get(0);
	Assert.assertNotNull(contentDisposition);
	String filename = new String(URLCodec.decodeUrl(contentDisposition.replace("attachment;filename=", "").getBytes()));
	Assert.assertNotNull(filename);
	byte[] io = result.getResponse().getContentAsByteArray();
	FileUtils.writeByteArrayToFile(new File(System.getProperty("user.dir")+"/src/test/resources/tmp/"+filename), io);
	int status = result.getResponse().getStatus();  
	Assert.assertTrue("错误，正确的返回值为200", status == 200);  
	Assert.assertFalse("错误，正确的返回值为200", status != 200);  
    }

    @Test
    public void testExportTemp() throws Exception {
	MvcResult result = mockMvc.perform(post("/form/overdue/export/templ").content(GoodsSelectImportHandle.TYPE_SKU_CODE))
		.andDo(print()) // print request and response to Console
		.andReturn(); 
	int status = result.getResponse().getStatus();  
	Assert.assertTrue("错误，正确的返回值为200", status == 200);  
	Assert.assertFalse("错误，正确的返回值为200", status != 200);  
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
