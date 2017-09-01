
package com.okdeer.jxc.controller.settle.franchise;

import java.util.ArrayList;
import java.util.List;

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
import com.okdeer.jxc.common.enums.ContractStatusEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.settle.franchise.entity.FranchiseContractRule;
import com.okdeer.jxc.settle.franchise.service.FranchiseContractService;
import com.okdeer.jxc.settle.franchise.vo.FranchiseContractVo;

/**
 * ClassName: FranchiseContractController 
 * @Description: 加盟店合同建立
 * @author zhengwj
 * @date 2017年8月16日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@RestController
@RequestMapping("/settle/franchiseContract")
public class FranchiseContractController extends BaseController<FranchiseContractController> {

	/**
	 * FranchiseContractService
	 */
	@Reference(version = "1.0.0", check = false)
	private FranchiseContractService franchiseContractService;

	/**
	 * 
	 * @Description: 加盟店合同列表页
	 * @param model model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年5月22日
	 */
	@RequestMapping(value = "contractList")
	public ModelAndView contractList(Model model) {
		return new ModelAndView("settle/franchise/contract/contractList");
	}

	/**
	 * @Description: 获取加盟店合同列表
	 * @author zhengwj
	 * @date 2017年5月27日
	 */
	@RequestMapping(value = "getContractList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<FranchiseContractVo> getContractList(FranchiseContractVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setTargetBranchCode(getCurrBranchCompleCode());
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			PageUtils<FranchiseContractVo> page = franchiseContractService.getContractList(vo);
			return page;
		} catch (Exception e) {
			LOG.error("获取加盟店合同列表异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * 
	 * @Description: 加盟店合同新增页
	 * @param model model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年5月22日
	 */
	@RequiresPermissions("JxcFranchiseContract:add")
	@RequestMapping(value = "contractAdd")
	public ModelAndView contractAdd(Model model) {
		return new ModelAndView("settle/franchise/contract/contractAdd");
	}

	/**
	 * @Description: 保存加盟店合同
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequiresPermissions("JxcFranchiseContract:add")
	@RequestMapping(value = "contractSave", method = RequestMethod.POST)
	@ResponseBody
	public RespJson contractSave(String data) {
		RespJson respJson = RespJson.success();
		try {
			FranchiseContractVo vo = JSON.parseObject(data, FranchiseContractVo.class);
			vo.setCreateUserId(getCurrUserId());
			respJson = franchiseContractService.saveContract(vo);
		} catch (Exception e) {
			LOG.error("保存加盟店合同异常:", e);
			respJson = RespJson.error("保存加盟店合同失败！");
		}
		return respJson;
	}

	/**
	 * 
	 * @Description: 加盟店合同编辑页
	 * @param model model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年5月22日
	 */
	@RequiresPermissions("JxcFranchiseContract:edit")
	@RequestMapping(value = "contractEdit")
	public ModelAndView contractEdit(String id, Model model) {
		FranchiseContractVo vo = franchiseContractService.getContract(id);
		ModelAndView modelAndView = new ModelAndView("settle/franchise/contract/contractEdit");
		if (vo != null && !ContractStatusEnum.NOT_AUDITED.getKey().equals(vo.getStatus())) {
			modelAndView.setViewName("settle/franchise/contract/contractView");
		}
		modelAndView.addObject("contractVo", vo);
		return modelAndView;
	}

	/**
	 * @Description: 更新加盟店合同
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequiresPermissions("JxcFranchiseContract:edit")
	@RequestMapping(value = "contractUpdate", method = RequestMethod.POST)
	@ResponseBody
	public RespJson contractUpdate(String data) {
		RespJson respJson = RespJson.success();
		try {
			FranchiseContractVo vo = JSON.parseObject(data, FranchiseContractVo.class);
			vo.setUpdateUserId(getCurrUserId());
			respJson = franchiseContractService.updateContract(vo);
		} catch (Exception e) {
			LOG.error("更新加盟店合同异常:", e);
			respJson = RespJson.error("更新加盟店合同失败！");
		}
		return respJson;
	}

	/**
	 * @Description: 删除加盟店合同
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequiresPermissions("JxcFranchiseContract:delete")
	@RequestMapping(value = "contractDelete", method = RequestMethod.POST)
	@ResponseBody
	public RespJson contractDelete(@RequestParam(value = "ids[]") List<String> ids) {
		RespJson respJson = RespJson.success();
		try {
			respJson = franchiseContractService.deleteContract(ids, getCurrUserId());
		} catch (Exception e) {
			LOG.error("删除加盟店合同异常:", e);
			respJson = RespJson.error("删除加盟店合同失败！");
		}
		return respJson;
	}

	/**
	 * @Description: 终止加盟店合同
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequiresPermissions("JxcFranchiseContract:terminate")
	@RequestMapping(value = "contractTerminate", method = RequestMethod.POST)
	@ResponseBody
	public RespJson contractTerminate(@RequestParam(value = "ids[]") List<String> ids) {
		RespJson respJson = RespJson.success();
		try {
			respJson = franchiseContractService.terminateContract(ids, getCurrUserId());
		} catch (Exception e) {
			LOG.error("终止加盟店合同异常:", e);
			respJson = RespJson.error("终止加盟店合同失败！");
		}
		return respJson;
	}

	/**
	 * @Description: 审核加盟店合同
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequiresPermissions("JxcFranchiseContract:audit")
	@RequestMapping(value = "contractAudit", method = RequestMethod.POST)
	@ResponseBody
	public RespJson contractAudit(String formId) {
		RespJson respJson = RespJson.success();
		try {
			respJson = franchiseContractService.auditContract(formId, getCurrUserId());
		} catch (Exception e) {
			LOG.error("审核加盟店合同异常:", e);
			respJson = RespJson.error("审核加盟店合同失败！");
		}
		return respJson;
	}

	/**
	 * @Description: 获取加盟店合同毛利分配规则列表
	 * @author zhengwj
	 * @date 2017年5月23日
	 */
	@RequestMapping(value = "getRuleList", method = RequestMethod.GET)
	@ResponseBody
	public List<FranchiseContractRule> getRuleList(String formId) {
		try {
			if (StringUtils.isBlank(formId)) {
				return new ArrayList<>();
			}
			return franchiseContractService.getRuleList(formId);
		} catch (Exception e) {
			LOG.error("获取加盟店合同毛利分配规则列表异常:{}", e);
		}
		return new ArrayList<>();
	}

	/**
	 * @Description: 检测是否加盟店存在合同
	 * @author zhengwj
	 * @date 2017年8月19日
	 */
	@RequestMapping(value = "checkExistContract", method = RequestMethod.POST)
	@ResponseBody
	public RespJson checkExistContract(String franchiseBranchId) {
		RespJson respJson = RespJson.success();
		try {
			respJson = franchiseContractService.checkExistContract(franchiseBranchId);
		} catch (Exception e) {
			LOG.error("检测是否加盟店存在合同异常:", e);
			respJson = RespJson.error("检测是否加盟店存在合同失败！");
		}
		return respJson;
	}

}