package com.okdeer.jxc.controller.report.month;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

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
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.Application;
import com.okdeer.jxc.config.test.ResourceConfig;
import com.okdeer.jxc.config.test.ShiroConfiguration;
import com.okdeer.jxc.report.service.MonthStatementService;
import com.okdeer.jxc.report.vo.MonthlyReport;

/**
 *<p></p>
 * ClassName: MonthStatementControllerTest 
 * @Description: MonthStatementControllerTest
 * @author xuyq
 * @date 2017年4月17日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@RunWith(SpringJUnit4ClassRunner.class) // SpringJUnit支持，由此引入Spring-Test框架支持！
@SpringApplicationConfiguration(classes = Application.class) // 指定我们SpringBoot工程的Application启动类
@WebAppConfiguration(value = "src/main/webapp") // 由于是Web项目，Junit需要模拟ServletContext，因此我们需要给我们的测试类加上@WebAppConfiguration。
@ContextConfiguration(classes = { ResourceConfig.class, ShiroConfiguration.class })
public class MonthStatementControllerTest {

	@Autowired
	private WebApplicationContext wac;

	private MockMvc mockMvc;

	@Reference(version = "1.0.0", check = false)
	private MonthStatementService monthStatementService;

	@Before
	public void setUp() throws Exception {
		mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
	}

	@After
	public void tearDown() throws Exception {
	}

	@Test
	public void monthStatementTest() throws Exception {
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/report/monthStatement/list"))
				.andExpect(MockMvcResultMatchers.view().name("report/month/monthStatement"))
				.andDo(MockMvcResultHandlers.print()).andReturn();
		int status = result.getResponse().getStatus();
		Assert.assertTrue("错误，正确的返回值为200", status == 200);
		Assert.assertFalse("错误，正确的返回值为200", status != 200);
	}

	@Test
	public void getUpMonthReportDayTest() throws Exception {
		MvcResult result = mockMvc
				.perform(post("/report/monthStatement/getUpMonthReportDay").contentType(MediaType.APPLICATION_JSON)
						.param("branchId", "1111").accept(MediaType.APPLICATION_JSON)) // 执行请求
				.andDo(print()) // print request and response to Console
				.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))// 验证响应contentType
				.andExpect(jsonPath("$.code", equalTo(0)))// http://goessner.net/articles/JsonPath/
				.andExpect(jsonPath("$.message", equalTo("success")))// http://goessner.net/articles/JsonPath/
				.andReturn();
		int status = result.getResponse().getStatus();
		Assert.assertTrue("错误，正确的返回值为200", status == 200);
		Assert.assertFalse("错误，正确的返回值为200", status != 200);

	}

	@Test
	public void executeMonthStatementTest() throws Exception {
		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
				.post("/report/monthStatement/executeMonthStatement");
		requestBuilder.contentType(MediaType.APPLICATION_JSON_UTF8);

		MonthlyReport monthlyReport = new MonthlyReport();
		monthlyReport.setBranchId("1111");
		monthlyReport.setRptDate("2017-04");

		String jsonText = JSON.toJSONString(monthlyReport);
		requestBuilder.content(jsonText);

		ResultActions resultActions = mockMvc.perform(requestBuilder);
		resultActions.andDo(MockMvcResultHandlers.print());
	}
}
