
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
import com.okdeer.jxc.form.enums.FormType;
import com.okdeer.jxc.settle.franchise.service.FranchiseChargeService;
import com.okdeer.jxc.settle.franchise.vo.FranchiseChargeDetailVo;
import com.okdeer.jxc.settle.franchise.vo.FranchiseChargeVo;

/***
 * 
 *<p></p>
 * ClassName: FranchiseChargeController 
 * @Description: 加盟店预收，费用
 * @author 
 * @date 2017年5月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@RestController
@RequestMapping("/settle/franchiseCharge")
public class FranchiseChargeController extends BaseController<SupplierChainController> {

	/**
	 * FranchiseChargeService
	 */
	@Reference(version = "1.0.0", check = false)
	private FranchiseChargeService franchiseChargeService;

	/**
	 * 
	 * @Description: 加盟店预收款列表页
	 * @param model model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年5月22日
	 */
	@RequestMapping(value = "advanceList")
	public ModelAndView advanceList(Model model) {
		return new ModelAndView("settle/franchise/advance/advanceList");
	}

	/**
	 * @Description: 获取加盟店预收款列表
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequestMapping(value = "getAdvanceList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<FranchiseChargeVo> getAdvanceList(FranchiseChargeVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setTargetBranchId(getCurrBranchId());
			vo.setFormType(FormType.FI.toString());
			PageHelper.startPage(pageNumber, pageSize, true);
			List<FranchiseChargeVo> list = franchiseChargeService.getChargeList(vo);
			return new PageUtils<FranchiseChargeVo>(list);
		} catch (Exception e) {
			LOG.error("获取加盟店预收款列表异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * 
	 * @Description: 加盟店预收款列表页
	 * @param model model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年5月22日
	 */
	@RequiresPermissions("JxcFranchiseAdvance:add")
	@RequestMapping(value = "advanceAdd")
	public ModelAndView advanceAdd(Model model) {
		return new ModelAndView("settle/franchise/advance/advanceAdd");
	}

	/**
	 * @Description: 保存加盟店预收款
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequiresPermissions("JxcFranchiseAdvance:add")
	@RequestMapping(value = "advanceSave", method = RequestMethod.POST)
	@ResponseBody
	public RespJson advanceSave(@RequestBody String jsonText) {
		RespJson respJson = RespJson.success();
		try {
			FranchiseChargeVo vo = JSON.parseObject(jsonText, FranchiseChargeVo.class);
			vo.setCreateUserId(getCurrUserId());
			vo.setBranchCode(getCurrBranchCode());
			vo.setFormType(FormType.FI.toString());
			respJson = franchiseChargeService.saveCharge(vo);
		} catch (Exception e) {
			LOG.error("保存加盟店预收款异常:", e);
			respJson = RespJson.error("保存加盟店预收款失败！");
		}
		return respJson;
	}

	/**
	 * 
	 * @Description: 加盟店预收款编辑页
	 * @param model model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年5月22日
	 */
	@RequiresPermissions("JxcFranchiseAdvance:edit")
	@RequestMapping(value = "advanceEdit")
	public ModelAndView advanceEdit(String id, Model model) {
		FranchiseChargeVo vo = franchiseChargeService.getCharge(id);
		ModelAndView modelAndView = new ModelAndView("settle/franchise/advance/advanceEdit");
		modelAndView.addObject("advance", vo);
		return modelAndView;
	}

	/**
	 * @Description: 更新加盟店预收款
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequiresPermissions("JxcFranchiseAdvance:edit")
	@RequestMapping(value = "advanceUpdate", method = RequestMethod.POST)
	@ResponseBody
	public RespJson advanceUpdate(@RequestBody String jsonText) {
		RespJson respJson = RespJson.success();
		try {
			FranchiseChargeVo vo = JSON.parseObject(jsonText, FranchiseChargeVo.class);
			vo.setUpdateUserId(getCurrUserId());
			vo.setFormType(FormType.FI.toString());
			respJson = franchiseChargeService.updateCharge(vo);
		} catch (Exception e) {
			LOG.error("更新加盟店预收款异常:", e);
			respJson = RespJson.error("更新加盟店预收款失败！");
		}
		return respJson;
	}

	/**
	 * 
	 * @Description: 加盟店预收款详情页
	 * @param model model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年5月22日
	 */
	@RequestMapping(value = "advanceView")
	public ModelAndView advanceView(String id, Model model) {
		FranchiseChargeVo vo = franchiseChargeService.getCharge(id);
		ModelAndView modelAndView = new ModelAndView("settle/franchise/advance/advanceView");
		modelAndView.addObject("advance", vo);
		return modelAndView;
	}

	/**
	 * @Description: 删除加盟店预收款
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequiresPermissions("JxcFranchiseAdvance:delete")
	@RequestMapping(value = "advanceDelete", method = RequestMethod.POST)
	@ResponseBody
	public RespJson advanceDelete(List<String> ids) {
		RespJson respJson = RespJson.success();
		try {
			respJson = franchiseChargeService.deleteCharge(ids);
		} catch (Exception e) {
			LOG.error("删除加盟店预收款异常:", e);
			respJson = RespJson.error("删除加盟店预收款失败！");
		}
		return respJson;
	}

	/**
	 * @Description: 审核加盟店预收款
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequiresPermissions("JxcFranchiseAdvance:audit")
	@RequestMapping(value = "advanceAudit", method = RequestMethod.POST)
	@ResponseBody
	public RespJson advanceAudit(String id) {
		RespJson respJson = RespJson.success();
		try {
			respJson = franchiseChargeService.auditCharge(id, getCurrUserId());
		} catch (Exception e) {
			LOG.error("审核加盟店预收款异常:", e);
			respJson = RespJson.error("审核加盟店预收款失败！");
		}
		return respJson;
	}

	/**
	 * 
	 * @Description: 加盟店费用列表页
	 * @param model model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年5月22日
	 */
	@RequestMapping(value = "chargeList")
	public ModelAndView chargeList(Model model) {
		return new ModelAndView("settle/franchise/charge/chargeList");
	}

	/**
	 * 
	 * @Description: 加盟店费用新增页
	 * @param model model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年5月22日
	 */
	@RequestMapping(value = "chargeAdd")
	public ModelAndView chargeAdd(Model model) {
		return new ModelAndView("settle/franchise/charge/chargeAdd");
	}

	/**
	 * 
	 * @Description: 加盟店费用编辑页
	 * @param model model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年5月22日
	 */
	@RequestMapping(value = "chargeEdit")
	public ModelAndView chargeEdit(Model model) {
		return new ModelAndView("settle/franchise/charge/chargeEdit");
	}

	/**
	 * 
	 * @Description: 加盟店费用详情页
	 * @param model model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年5月22日
	 */
	@RequestMapping(value = "chargeView")
	public ModelAndView chargeView(Model model) {
		return new ModelAndView("settle/franchise/charge/chargeView");
	}

	/**
	 * @Description: 获取加盟店预收款、费用详情列表
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequestMapping(value = "getDetailList", method = RequestMethod.POST)
	@ResponseBody
	public List<FranchiseChargeDetailVo> getDetailList(String formId) {
		try {
			if (StringUtils.isBlank(formId)) {
				return new ArrayList<>();
			}
			return franchiseChargeService.getDetailList(formId);
		} catch (Exception e) {
			LOG.error("获取加盟店预收款、费用详情列表异常:{}", e);
		}
		return new ArrayList<>();
	}

	/**
	 * @Description: 加盟店预收款、费用明细导出
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequestMapping(value = "exportList")
	public void exportList(HttpServletResponse response, String formId, String type) {
		try {
			if (StringUtils.isAnyBlank(formId, type)) {
				return;
			}
			List<FranchiseChargeDetailVo> exportList = franchiseChargeService.getDetailList(formId);
			String fileName = "";
			String templateName = "";
			if (FormType.FI.toString().equals(type)) {
				// 导出文件名称，不包括后缀名
				fileName = "加盟店预收款" + "_" + DateUtils.getCurrSmallStr();
				// 模板名称，包括后缀名
				templateName = ExportExcelConstant.PURCHASEFORM;
			} else {
				// 导出文件名称，不包括后缀名
				fileName = "加盟店费用" + "_" + DateUtils.getCurrSmallStr();
				templateName = ExportExcelConstant.RETURN_FORM;
			}
			// 导出Excel
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("加盟店预收款、费用明细导出失败:", e);
		}
	}

}