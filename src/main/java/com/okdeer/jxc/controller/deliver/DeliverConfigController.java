/** 
 *@Project: okdeer-jxc-web 
 *@Author: yangyq02
 *@Date: 2016年9月7日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.deliver;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.vo.BranchSpecVo;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.deliver.entity.BranchRebate;
import com.okdeer.jxc.form.deliver.entity.BranchRebateDetail;
import com.okdeer.jxc.form.deliver.service.DeliverConfigServiceApi;
import com.okdeer.jxc.form.entity.PurchaseForm;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: DeliverConfigController 
 * @Description: 配送配置相关
 * @author yangyq02
 * @date 2016年9月7日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *      重构2.0			2016-9-7			yangyq02	        配送配置相关Controller
 */
@Controller
@RequestMapping("form/deliverConfig")
public class DeliverConfigController extends BaseController<PurchaseForm> {

	@Reference(version = "1.0.0", check = false)
	private DeliverConfigServiceApi deliverConfigServiceApi;

	/**
	 * @Description: 保存配送有效期
	 * @param validityDay
	 * @return   
	 * @return String  
	 * @throws
	 * @author yangyq02
	 * @date 2016年9月7日
	 */
	@RequestMapping(value = "saveValidityDay", method = RequestMethod.POST)
	@ResponseBody
	public RespJson saveValidityDay(BranchSpecVo vo) {
		try {
			vo.setBranchId(UserUtil.getCurrBranchId());
			vo.setCreateUserId(UserUtil.getCurrUserId());
			vo.setCreateTime(DateUtils.getCurrDate());

			deliverConfigServiceApi.saveBranchSpec(vo);
			return RespJson.success();
		} catch (Exception e) {
			LOG.error("保存机构配置失败{}", e);
			return RespJson.error("保存机构配置失败！");
		}
	}

	/**
	 * @Description: 保存返利比例
	 * @param moneys
	 * @param rebates
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author yangyq02
	 * @date 2016年9月8日
	 */
	@RequestMapping(value = "saveRebate", method = RequestMethod.POST)
	@ResponseBody
	public RespJson saveRebate(String moneys, String rebates) {
		try {
			BranchRebate branchRebate = new BranchRebate();
			branchRebate.setRebate(rebates);
			branchRebate.setCreateUserId(UserUtil.getCurrUserId());
			branchRebate.setUpdateUserId(UserUtil.getCurrUserId());
			branchRebate.setMoney(moneys);
			// 获取当前机构
			branchRebate.setBranchId(UserUtil.getCurrBranchId());
			// 获取机构类型
			deliverConfigServiceApi.saveRebate(branchRebate);
			return RespJson.success();
		} catch (Exception e) {
			LOG.error("保存配送返利设置出现错误", e);
			return RespJson.error("保存配送返利设置失败！");
		}
	}

	/**
	 * @Description: 得到返利配置
	 * @return   
	 * @return List<BranchRebateDetail>  
	 * @throws
	 * @author yangyq02
	 * @date 2016年9月8日
	 */
	@RequestMapping(value = "getRebateConfig", method = RequestMethod.POST)
	@ResponseBody
	public List<BranchRebateDetail> getRebateConfig() {
		try {
			BranchRebate branchRebate = deliverConfigServiceApi.getRebateConfig(UserUtil.getCurrBranchId());
			if (branchRebate == null) {
				return null;
			}
			return branchRebate.toRebateDetail();
		} catch (Exception e) {
			LOG.error("查询配送返利设置出现错误", e);
			return Collections.emptyList();
		}
	}
}
