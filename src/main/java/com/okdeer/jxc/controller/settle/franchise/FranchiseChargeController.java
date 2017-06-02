
package com.okdeer.jxc.controller.settle.franchise;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.okdeer.jxc.branch.service.BranchSpecServiceApi;
import com.okdeer.jxc.common.controller.BasePrintController;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
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
public class FranchiseChargeController extends BasePrintController<FranchiseChargeController, FranchiseChargeDetailVo> {

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
			if (StringUtils.isNotBlank(vo.getFranchiseBranchCode())) {
				vo.setBranchName(null);
			}
			if (StringUtils.isNotBlank(vo.getCreateUserId())) {
				vo.setCreateUserName(null);
			}
			vo.setBranchCode(getCurrBranchCompleCode());
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
	public RespJson advanceSave(String data) {
		RespJson respJson = RespJson.success();
		try {
			FranchiseChargeVo vo = JSON.parseObject(data, FranchiseChargeVo.class);
			vo.setCreateUserId(getCurrUserId());
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
		modelAndView.addObject("chargeVo", vo);
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
	public RespJson advanceUpdate(String data) {
		RespJson respJson = RespJson.success();
		try {
			FranchiseChargeVo vo = JSON.parseObject(data, FranchiseChargeVo.class);
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
		modelAndView.addObject("chargeVo", vo);
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
	public RespJson advanceDelete(@RequestParam(value = "ids[]") List<String> ids) {
		RespJson respJson = RespJson.success();
		try {
			respJson = franchiseChargeService.deleteCharge(ids, getCurrUserId());
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
	public RespJson advanceAudit(String formId) {
		RespJson respJson = RespJson.success();
		try {
			respJson = franchiseChargeService.auditCharge(formId, getCurrUserId());
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
	 * @Description: 获取加盟店费用列表
	 * @author zhengwj
	 * @date 2017年5月27日
	 */
	@RequestMapping(value = "getChargeList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<FranchiseChargeVo> getChargeList(FranchiseChargeVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			if (StringUtils.isNotBlank(vo.getFranchiseBranchCode())) {
				vo.setBranchName(null);
			}
			if (StringUtils.isNotBlank(vo.getCreateUserId())) {
				vo.setCreateUserName(null);
			}
			vo.setBranchCode(getCurrBranchCompleCode());
			vo.setFormType(FormType.FO.toString());
			PageHelper.startPage(pageNumber, pageSize, true);
			List<FranchiseChargeVo> list = franchiseChargeService.getChargeList(vo);
			return new PageUtils<FranchiseChargeVo>(list);
		} catch (Exception e) {
			LOG.error("获取加盟店费用列表异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * 
	 * @Description: 加盟店费用新增页
	 * @param model model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年5月22日
	 */
	@RequiresPermissions("JxcFranchiseCharge:add")
	@RequestMapping(value = "chargeAdd")
	public ModelAndView chargeAdd(Model model) {
		return new ModelAndView("settle/franchise/charge/chargeAdd");
	}

	/**
	 * @Description: 保存加盟店费用
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequiresPermissions("JxcFranchiseCharge:add")
	@RequestMapping(value = "chargeSave", method = RequestMethod.POST)
	@ResponseBody
	public RespJson chargeSave(String data) {
		RespJson respJson = RespJson.success();
		try {
			FranchiseChargeVo vo = JSON.parseObject(data, FranchiseChargeVo.class);
			vo.setCreateUserId(getCurrUserId());
			vo.setFormType(FormType.FO.toString());
			respJson = franchiseChargeService.saveCharge(vo);
		} catch (Exception e) {
			LOG.error("保存加盟店费用异常:", e);
			respJson = RespJson.error("保存加盟店费用失败！");
		}
		return respJson;
	}

	/**
	 * 
	 * @Description: 加盟店费用编辑页
	 * @param model model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年5月22日
	 */
	@RequiresPermissions("JxcFranchiseCharge:edit")
	@RequestMapping(value = "chargeEdit")
	public ModelAndView chargeEdit(String id, Model model) {
		FranchiseChargeVo vo = franchiseChargeService.getCharge(id);
		ModelAndView modelAndView = new ModelAndView("settle/franchise/charge/chargeEdit");
		modelAndView.addObject("chargeVo", vo);
		return modelAndView;
	}

	/**
	 * @Description: 更新加盟店费用
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequiresPermissions("JxcFranchiseCharge:edit")
	@RequestMapping(value = "chargeUpdate", method = RequestMethod.POST)
	@ResponseBody
	public RespJson chargeUpdate(String data) {
		RespJson respJson = RespJson.success();
		try {
			FranchiseChargeVo vo = JSON.parseObject(data, FranchiseChargeVo.class);
			vo.setUpdateUserId(getCurrUserId());
			vo.setFormType(FormType.FO.toString());
			respJson = franchiseChargeService.updateCharge(vo);
		} catch (Exception e) {
			LOG.error("更新加盟店费用异常:", e);
			respJson = RespJson.error("更新加盟店费用失败！");
		}
		return respJson;
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
	public ModelAndView chargeView(String id, Model model) {
		FranchiseChargeVo vo = franchiseChargeService.getCharge(id);
		ModelAndView modelAndView = new ModelAndView("settle/franchise/charge/chargeView");
		modelAndView.addObject("chargeVo", vo);
		return modelAndView;
	}

	/**
	 * @Description: 删除加盟店费用
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequiresPermissions("JxcFranchiseCharge:delete")
	@RequestMapping(value = "chargeDelete", method = RequestMethod.POST)
	@ResponseBody
	public RespJson chargeDelete(@RequestParam(value = "ids[]") List<String> ids) {
		RespJson respJson = RespJson.success();
		try {
			respJson = franchiseChargeService.deleteCharge(ids, getCurrUserId());
		} catch (Exception e) {
			LOG.error("删除加盟店费用异常:", e);
			respJson = RespJson.error("删除加盟店费用失败！");
		}
		return respJson;
	}

	/**
	 * @Description: 审核加盟店费用
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequiresPermissions("JxcFranchiseCharge:audit")
	@RequestMapping(value = "chargeAudit", method = RequestMethod.POST)
	@ResponseBody
	public RespJson chargeAudit(String formId) {
		RespJson respJson = RespJson.success();
		try {
			respJson = franchiseChargeService.auditCharge(formId, getCurrUserId());
		} catch (Exception e) {
			LOG.error("审核加盟店费用异常:", e);
			respJson = RespJson.error("审核加盟店费用失败！");
		}
		return respJson;
	}

	/**
	 * @Description: 获取加盟店预收款、费用详情列表
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequestMapping(value = "getDetailList", method = RequestMethod.GET)
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
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.common.controller.BasePrintController#getPrintReplace(java.lang.String)
	 */
	@Override
	protected Map<String, Object> getPrintReplace(String formNo) {
		Map<String, Object> replaceMap = new HashMap<String, Object>();
		FranchiseChargeVo vo = franchiseChargeService.getCharge(formNo);
		if (null != vo) {
			replaceMap.put("_订单编号", vo.getFormNo());
			replaceMap.put("formNo", vo.getFormNo());
			replaceMap.put("branchName", vo.getBranchName());
			replaceMap.put("payTime", vo.getPayTime() != null ? DateUtils.getSmallRStr(vo.getPayTime()) : "");
			replaceMap.put("remark", vo.getRemark());
			replaceMap.put("sumAmount", vo.getSumAmount());
			replaceMap.put("createUserName", vo.getCreateUserName());
			replaceMap.put("createTime", vo.getCreateTime() != null ? DateUtils.getFullStr(vo.getCreateTime()) : "");
			replaceMap.put("updateUserName", vo.getUpdateUserName());
			replaceMap.put("updateTime", vo.getUpdateTime() != null ? DateUtils.getFullStr(vo.getUpdateTime()) : "");
			replaceMap.put("auditUserName", vo.getAuditUserName());
			replaceMap.put("auditTime", vo.getAuditTime() != null ? DateUtils.getFullStr(vo.getAuditTime()) : "");
		}
		return replaceMap;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.common.controller.BasePrintController#getPrintDetail(java.lang.String)
	 */
	@Override
	protected List<FranchiseChargeDetailVo> getPrintDetail(String formNo) {
		return franchiseChargeService.getDetailList(formNo);
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.common.controller.BasePrintController#getBranchSpecService()
	 */
	@Override
	protected BranchSpecServiceApi getBranchSpecService() {
		return null;
	}

}