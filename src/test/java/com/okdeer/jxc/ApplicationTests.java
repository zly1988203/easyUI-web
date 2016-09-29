//package com.okdeer.jxc;
//
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.FileNotFoundException;
//import java.util.List;
//
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.boot.test.SpringApplicationConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import org.springframework.test.context.web.WebAppConfiguration;
//
//import com.okdeer.jxc.utils.poi.ExcelReaderUtil;
//
//@RunWith(SpringJUnit4ClassRunner.class)
//@SpringApplicationConfiguration(classes = Application.class)
//@WebAppConfiguration
//public class ApplicationTests {
//	
//	private static final Logger LOG = LoggerFactory.getLogger(ApplicationTests.class);
//
//	@Test
//	public void contextLoads() {
//		LOG.info("contextLoads success");
//	}
//	
//	@Test
//	public void testReadExcel() throws FileNotFoundException{
//		File file = new File("D:\\Users\\liwb\\桌面\\import\\demo.xlsx");
//		FileInputStream is = new FileInputStream(file);
//		List<String> list = ExcelReaderUtil.readExcelForFirstColumn("demo.xlsx", is, new String());
//		for(String str : list){
//			if(str instanceof String){
//				LOG.info(str);
//			}
//			
//		}
//	}
//
//}
