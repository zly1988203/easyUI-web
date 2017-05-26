
package com.okdeer.jxc.controller.settle.franchise;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.settle.supplier.SupplierChainController;
import com.okdeer.jxc.settle.franchise.service.FranchiseSettleService;
import com.okdeer.jxc.settle.franchise.vo.FranchiseSettleDetailVo;
import com.okdeer.jxc.settle.franchise.vo.FranchiseSettleVo;

/**
 * 
 *<p></p>
 * ClassName: FranchiseSettleController 
 * @Description: 加盟店结算
 * @author 
 * @date 2017年5月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@RestController
@RequestMapping("/settle/franchiseSettle")
public class FranchiseSettleController extends BaseController<SupplierChainController> {

	/**
	 * FranchiseSettleService
	 */
	@Reference(version = "1.0.0", check = false)
	private FranchiseSettleService franchiseSettleService;

	/**
	 * 
	 * @Description: 加盟店结算列表页
	 * @param model model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年5月22日
	 */
	@RequestMapping(value = "settleList")
	public ModelAndView settleList(Model model) {
		return new ModelAndView("settle/franchise/settle/settleList");
	}

	/**
	 * @Description: 获取加盟店预收款列表
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequestMapping(value = "getSettleList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<FranchiseSettleVo> getSettleList(FranchiseSettleVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setTargetBranchId(getCurrBranchId());
			PageHelper.startPage(pageNumber, pageSize, true);
			List<FranchiseSettleVo> list = franchiseSettleService.getSettleList(vo);
			return new PageUtils<FranchiseSettleVo>(list);
		} catch (Exception e) {
			LOG.error("获取加盟店预收款列表异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 检查是否存在未审核的结算
	 * @author zhengwj
	 * @date 2017年5月24日
	 */
	@RequiresPermissions("JxcFranchiseSettle:add")
	@RequestMapping(value = "checkAuditCount", method = RequestMethod.GET)
	@ResponseBody
	public RespJson checkAuditCount() {
		RespJson respJson = RespJson.success();
		try {
			// 检查是否存在未审核的结算
			int auditCount = franchiseSettleService.getAuditCount(getCurrBranchId());
			if (auditCount > 0) {
				respJson = RespJson.error("存在未审核的结算单");
			}
		} catch (Exception e) {
			LOG.error("获取未审核结算单数量异常:", e);
			respJson = RespJson.error("获取未审核结算单数量异常！");
		}
		return respJson;
	}

	/**
	 * 
	 * @Description: 加盟店结算新增页
	 * @param model model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年5月22日
	 */
	@RequiresPermissions("JxcFranchiseSettle:add")
	@RequestMapping(value = "settleAdd")
	public ModelAndView settleAdd(Model model) {
		return new ModelAndView("settle/franchise/settle/settleAdd");
	}

	/**
	 * @Description: 获取新增结算的单据列表
	 * @author zhengwj
	 * @date 2017年5月24日
	 */
	@RequiresPermissions("JxcFranchiseSettle:add")
	@RequestMapping(value = "getFormList", method = RequestMethod.POST)
	@ResponseBody
	public List<FranchiseSettleDetailVo> getFormList(String franchiseId) {
		try {
			List<FranchiseSettleDetailVo> list = franchiseSettleService.getFormList(getCurrBranchId(), franchiseId);
			return list;
		} catch (Exception e) {
			LOG.error("获取新增结算的单据列表异常:", e);
		}
		return new ArrayList<>();
	}

	/**
	 * @Description: 保存加盟店结算
	 * @author zhengwj
	 * @date 2017年5月24日
	 */
	@RequiresPermissions("JxcFranchiseSettle:add")
	@RequestMapping(value = "settleSave", method = RequestMethod.POST)
	@ResponseBody
	public RespJson settleSave(@RequestBody String jsonText) {
		RespJson respJson = RespJson.success();
		try {
			// 检查是否存在未审核的结算
			int auditCount = franchiseSettleService.getAuditCount(getCurrBranchId());
			if (auditCount > 0) {
				return RespJson.error("存在未审核的结算单");
			}
			FranchiseSettleVo vo = JSON.parseObject(jsonText, FranchiseSettleVo.class);
			vo.setCreateUserId(getCurrUserId());
			vo.setBranchCode(getCurrBranchCode());
			respJson = franchiseSettleService.saveSettle(vo);
		} catch (Exception e) {
			LOG.error("保存加盟店结算异常:", e);
			respJson = RespJson.error("保存加盟店结算失败！");
		}
		return respJson;
	}

	/**
	 * 
	 * @Description: 加盟店结算编辑页
	 * @param model model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年5月22日
	 */
	@RequiresPermissions("JxcFranchiseSettle:edit")
	@RequestMapping(value = "settleEdit")
	public ModelAndView settleEdit(String id, Model model) {
		FranchiseSettleVo vo = franchiseSettleService.getSettle(id);
		ModelAndView modelAndView = new ModelAndView("settle/franchise/settle/settleEdit");
		modelAndView.addObject("settle", vo);
		return modelAndView;
	}

	/**
	 * @Description: 更新加盟店结算
	 * @author zhengwj
	 * @date 2017年5月24日
	 */
	@RequiresPermissions("JxcFranchiseSettle:edit")
	@RequestMapping(value = "settleUpdate", method = RequestMethod.POST)
	@ResponseBody
	public RespJson settleUpdate(@RequestBody String jsonText) {
		RespJson respJson = RespJson.success();
		try {
			FranchiseSettleVo vo = JSON.parseObject(jsonText, FranchiseSettleVo.class);
			vo.setUpdateUserId(getCurrUserId());
			respJson = franchiseSettleService.updateSettle(vo);
		} catch (Exception e) {
			LOG.error("更新加盟店结算异常:", e);
			respJson = RespJson.error("更新加盟店结算失败！");
		}
		return respJson;
	}

	/**
	 * 
	 * @Description: 加盟店结算详情页
	 * @param model model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年5月22日
	 */
	@RequestMapping(value = "settleView")
	public ModelAndView settleView(String id, Model model) {
		FranchiseSettleVo vo = franchiseSettleService.getSettle(id);
		ModelAndView modelAndView = new ModelAndView("settle/franchise/settle/settleView");
		modelAndView.addObject("settle", vo);
		return modelAndView;
	}

	/**
	 * @Description: 删除加盟店结算
	 * @author zhengwj
	 * @date 2017年5月24日
	 */
	@RequiresPermissions("JxcFranchiseSettle:delete")
	@RequestMapping(value = "settleDelete", method = RequestMethod.POST)
	@ResponseBody
	public RespJson settleDelete(List<String> ids) {
		RespJson respJson = RespJson.success();
		try {
			respJson = franchiseSettleService.deleteSettle(ids);
		} catch (Exception e) {
			LOG.error("删除加盟店结算异常:", e);
			respJson = RespJson.error("删除加盟店结算失败！");
		}
		return respJson;
	}

	/**
	 * @Description: 审核加盟店结算
	 * @author zhengwj
	 * @date 2017年5月24日
	 */
	@RequiresPermissions("JxcFranchiseSettle:audit")
	@RequestMapping(value = "settleAudit", method = RequestMethod.POST)
	@ResponseBody
	public RespJson settleAudit(String id) {
		RespJson respJson = RespJson.success();
		try {
			respJson = franchiseSettleService.auditSettle(id, getCurrUserId());
		} catch (Exception e) {
			LOG.error("审核加盟店结算异常:", e);
			respJson = RespJson.error("审核加盟店结算失败！");
		}
		return respJson;
	}

	/**
	 * @Description: 获取加盟店结算详情列表
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequestMapping(value = "getDetailList", method = RequestMethod.POST)
	@ResponseBody
	public List<FranchiseSettleDetailVo> getDetailList(String formId) {
		try {
			if (StringUtils.isBlank(formId)) {
				return new ArrayList<>();
			}
			return franchiseSettleService.getDetailList(formId);
		} catch (Exception e) {
			LOG.error("获取加盟店结算详情列表异常:{}", e);
		}
		return new ArrayList<>();
	}

	/**
	 * @Description: 加盟店结算明细导出
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequestMapping(value = "exportList")
	public void exportList(HttpServletResponse response, String formId) {
		try {
			if (StringUtils.isBlank(formId)) {
				return;
			}
			List<FranchiseSettleDetailVo> exportList = franchiseSettleService.getDetailList(formId);
			// 导出文件名称，不包括后缀名
			String fileName = "加盟店结算" + "_" + DateUtils.getCurrSmallStr();
			// 模板名称，包括后缀名
			String templateName = ExportExcelConstant.PURCHASEFORM;
			// 导出Excel
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("加盟店结算明细导出失败:", e);
		}
	}

}