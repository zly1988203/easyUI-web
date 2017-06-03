
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
public class FranchiseSettleController extends BasePrintController<FranchiseSettleController, FranchiseSettleDetailVo> {

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
			if (StringUtils.isNotBlank(vo.getFranchiseBranchCode())) {
				vo.setBranchName(null);
			}
			if (StringUtils.isNotBlank(vo.getCreateUserId())) {
				vo.setCreateUserName(null);
			}
			vo.setBranchCode(getCurrBranchCompleCode());
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
	@RequestMapping(value = "checkAuditCount", method = RequestMethod.POST)
	@ResponseBody
	public RespJson checkAuditCount(String franchiseBranchId) {
		RespJson respJson = RespJson.success();
		try {
			// 检查是否存在未审核的结算
			int auditCount = franchiseSettleService.getAuditCount(franchiseBranchId);
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
			List<FranchiseSettleDetailVo> list = franchiseSettleService.getFormList(getCurrBranchCompleCode(),
					franchiseId);
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
	public RespJson settleSave(String data) {
		RespJson respJson = RespJson.success();
		try {
			FranchiseSettleVo vo = JSON.parseObject(data, FranchiseSettleVo.class);
			// 检查是否存在未审核的结算
			int auditCount = franchiseSettleService.getAuditCount(vo.getFranchiseBranchId());
			if (auditCount > 0) {
				return RespJson.error("存在未审核的结算单");
			}
			vo.setTargetBranchId(getCurrBranchId());
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
	public RespJson settleUpdate(String data) {
		RespJson respJson = RespJson.success();
		try {
			FranchiseSettleVo vo = JSON.parseObject(data, FranchiseSettleVo.class);
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
	public RespJson settleDelete(@RequestParam(value = "ids[]") List<String> ids) {
		RespJson respJson = RespJson.success();
		try {
			respJson = franchiseSettleService.deleteSettle(ids, getCurrUserId());
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
	public RespJson settleAudit(String formId) {
		RespJson respJson = RespJson.success();
		try {
			respJson = franchiseSettleService.auditSettle(formId, getCurrUserId());
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
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.common.controller.BasePrintController#getPrintReplace(java.lang.String)
	 */
	@Override
	protected Map<String, Object> getPrintReplace(String formNo) {
		Map<String, Object> replaceMap = new HashMap<String, Object>();
		FranchiseSettleVo vo = franchiseSettleService.getSettle(formNo);
		if (null != vo) {
			replaceMap.put("_订单编号", vo.getFormNo());
			replaceMap.put("formNo", vo.getFormNo());
			replaceMap.put("branchName", vo.getBranchName());
			replaceMap.put("payTypeString", vo.getPayTypeString());
			replaceMap.put("remark", vo.getRemark());
			replaceMap.put("payableAmount", vo.getPayableAmount());
			replaceMap.put("payedAmount", vo.getPayedAmount());
			replaceMap.put("unpayAmount", vo.getUnpayAmount());
			replaceMap.put("actualAmount", vo.getActualAmount());
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
	protected List<FranchiseSettleDetailVo> getPrintDetail(String formNo) {
		return franchiseSettleService.getDetailList(formNo);
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