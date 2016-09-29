/** 
 *@Project: okdeer-jxc-system
 *@Author: zhangq
 *@Date: 2016年8月22日
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.system;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.utils.JsonMapper;
import com.okdeer.jxc.system.service.SysPrintGridServiceApi;
import com.okdeer.jxc.system.service.SysPrintPaperServiceApi;
import com.okdeer.jxc.system.service.SysPrintTemplateServiceApi;
import com.okdeer.jxc.system.vo.SysPrintGridVo;
import com.okdeer.jxc.system.vo.SysPrintPaperVo;
import com.okdeer.jxc.system.vo.SysPrintTemplateVo;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: PrintDesignController 
 * @Description: 打印模版设计器Controller
 * @author zhangq
 * @date 2016年6月20日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 商业管理系统1.0.0	2016年8月23日                  zhangq              创建打印模版设计器Controller
 */
@Controller
@RequestMapping("printdesign")
public class PrintDesignController {

	/**
	 * 打印模版业务逻辑访问接口
	 */
	@Reference(version = "1.0.0", check = false)
	private SysPrintTemplateServiceApi printTemplateService;

	/**
	 * 打印纸张业务逻辑访问接口
	 */
	@Reference(version = "1.0.0", check = false)
	private SysPrintPaperServiceApi printPaperService;

	/**
	 * 打印表格业务逻辑接口
	 */
	@Reference(version = "1.0.0", check = false)
	private SysPrintGridServiceApi printGridService;

	/**
	 * 金额格式化
	 */
	DecimalFormat df = new DecimalFormat("0.00");

	/**
	 * 
	 * @Description: 跳转到打印设置页面
	 * @author zhangq
	 * @date 2016年7月22日
	 */
	@RequestMapping(value = "design")
	public String index() {
		return "component/publicPrintDesign";
	}

	/**
	 * 
	 * @Description: 加载打印模版
	 * @param templateCode 模版代码
	 * @return 打印模版列表
	 * @author zhangq
	 * @date 2016年7月25日
	 */
	@RequestMapping(value = "/loadPrintTemplates", method = RequestMethod.POST)
	@ResponseBody
	public List<SysPrintTemplateVo> loadPrintTemplates(String templateCode) {
		List<SysPrintTemplateVo> result = printTemplateService.queryPrintTemplateListByCode(templateCode,
				UserUtil.getCurrentUser().getId());
		return result;
	}

	/**
	 * 
	 * @Description: 加载打印模版
	 * @param templateCode 模版代码
	 * @param templateId 模版Id
	 * @return 模版信息
	 * @author zhangq
	 * @date 2016年7月25日
	 */
	@RequestMapping(value = "/loadPrintTemplate", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> loadPrintTemplate(String templateCode, String templateId) {
		SysPrintTemplateVo vo = null;
		// temp_no为-1时，表示为默认模版
		if ("-1".equals(templateId)) {
			vo = printTemplateService.queryDefaultPrintTemplateByCode(templateCode);
		} else {
			vo = printTemplateService.queryPrintTemplateVoById(templateId);
		}

		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", null != vo);
		result.put("template", vo);

		return result;
	}

	/**
	 * 
	 * @Description: 保存模版（新增OR修改）   
	 * @param request 请求对象
	 * @return PrintTemplateResultVo对象
	 * @author zhangq
	 * @date 2016年7月25日
	 */
	@RequestMapping(value = "/savePrintTemplate", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> savePrintTemplate(HttpServletRequest request,String template) {
		JsonMapper jsonMapper = new JsonMapper();
		SysPrintTemplateVo vo = jsonMapper.fromJson(template, SysPrintTemplateVo.class);

		String userId = UserUtil.getCurrentUser().getId();
		if (null == vo.getCreateUserId() || "".equals(vo.getCreateUserId())) {
			vo.setCreateUserId(userId);
			vo.setUpdateUserId(userId);
			printTemplateService.addPrintTemplate(vo);
		} else {
			vo.setUpdateUserId(userId);
			printTemplateService.updatePrintTemplate(vo);
		}

		// 封装返回值
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", null != vo);
		result.put("template", vo);

		return result;
	}

	/**
	 * 
	 * @Description: 删除模版
	 * @param request 请求对象
	 * @return 操作结果
	 * @author zhangq
	 * @date 2016年7月25日
	 */
	@RequestMapping(value = "/deletePrintTemplate", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> deletePrintTemplate(String templateId) {
		SysPrintTemplateVo template = new SysPrintTemplateVo();
		template.setTemplateId(templateId);
		template.setUpdateUserId(UserUtil.getCurrentUser().getId());
		boolean success = printTemplateService.deletePrintTemplate(template);

		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", success);
		result.put("message", success ? "删除成功" : "删除失败");

		return result;
	}

	/**
	 * 
	 * @Description: 设置首选打印模版
	 * @param templateCode 模版代码
	 * @param templateId 模版Id
	 * @return 是否操作成功
	 * @author zhangq
	 * @date 2016年7月25日
	 */
	@RequestMapping(value = "/setTemplateDefault", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> setTemplateDefault(String templateCode, String templateId) {
		SysPrintTemplateVo template = new SysPrintTemplateVo();
		template.setTemplateCode(templateCode);
		template.setTemplateId(templateId);
		template.setCreateUserId(UserUtil.getCurrentUser().getId());

		boolean success = printTemplateService.updateTemplateDefault(template);

		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", success);
		result.put("message", success ? "设置成功" : "设置失败");

		return result;
	}

	/**
	 * 
	 * @Description: 加载打印纸张
	 * @return 打印纸张列表
	 * @author zhangq
	 * @date 2016年7月25日
	 */
	@RequestMapping(value = "/loadPrintPapers", method = RequestMethod.POST)
	@ResponseBody
	public List<SysPrintPaperVo> loadPrintPapers() {
		List<SysPrintPaperVo> result = printPaperService.queryPrintPaperVoList(UserUtil.getCurrentUser().getId());
		return result;
	}

	/**
	 * 
	 * @Description: 保存打印纸张
	 * @param paper 打印纸张对象
	 * @return 是否操作成功
	 * @author zhangq
	 * @date 2016年7月25日
	 */
	@RequestMapping(value = "/savePrintPaper", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> savePrintPaper(String paper) {
		JsonMapper jsonMapper = new JsonMapper();
		SysPrintPaperVo vo = jsonMapper.fromJson(paper, SysPrintPaperVo.class);
		printPaperService.savePrintPaper(vo);
		//封装返回值
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", true);
		result.put("message", "保存成功");
		return result;
	}

	/**
	 * 
	 * @Description: 删除打印纸张
	 * @param id 纸张Id
	 * @return 是否操作成功
	 * @author zhangq
	 * @date 2016年7月25日
	 */
	@RequestMapping(value = "/deletePrintPaper", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> deletePrintPaper(String id) {
		printPaperService.deletePrintPaperById(id);
		
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", true);
		result.put("message", "删除成功");
		return result;
	}

	/**
	 * 
	 * @Description: 加载模板明细列
	 * @param pageId 单据类型
	 * @return 模板明细列
	 * @author zhangq
	 * @date 2016年7月25日
	 */
	@RequestMapping(value = "/loadPrintGridColumns", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> loadPrintGridColumns(String templateCode) {
		SysPrintTemplateVo vo = printTemplateService.queryDefaultPrintTemplateByCode(templateCode);
		List<SysPrintGridVo> list = printGridService.queryPrintGridVoList(templateCode, vo.getTrueId());

		Map<String, Object> result = new HashMap<String, Object>();
		result.put("success", !list.isEmpty());
		result.put("columns", list);
		return result;
	}

	/**
	 * 
	 * @Description: 加载模板缺省明细列
	 * @return 缺省明细列
	 * @author zhangq
	 * @date 2016年7月25日
	 */
	@RequestMapping(value = "/loadDefaultGridColumns", method = RequestMethod.POST)
	public Map<String, Object> loadDefaultGridColumns() {
		return null;
	}
}
