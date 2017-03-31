package com.okdeer.jxc.controller.branch;  

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.service.BranchSpecServiceApi;
import com.okdeer.jxc.branch.vo.BranchSpecVo;
import com.okdeer.jxc.common.exception.BusinessException;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.utils.UserUtil;

@Controller
@RequestMapping("branchSetting")
public class BranchSettingController extends BaseController<BranchSettingController> {
	/**
	 * 机构设置Dubbo接口
	 */
	@Reference(version = "1.0.0", check = false)
	private BranchSpecServiceApi branchSpecServiceApi;
	
	/**
	 * 
	 * @Description: 跳转销售设置页面
	 * @return String  
	 * @author zhangq
	 * @date 2017年3月29日
	 */
	@RequestMapping(value = "/toSaleSetting")
	public String toSaleSettingPage(){
		return "setting/saleSetting";
	}
	
	/**
	 * 
	 * @Description: 跳转配送设置页面
	 * @return String  
	 * @author zhangq
	 * @date 2017年3月29日
	 */
	@RequestMapping(value = "/toDelivelSetting")
	public String toDelivelSettingPage(){
		return "setting/delivelSetting";
	}
	
	/**
	 * 
	 * @Description: 跳转采购设置页面
	 * @return String  
	 * @author zhangq
	 * @date 2017年3月29日
	 */
	@RequestMapping(value = "/toPurchaseSetting")
	public String toPurchaseSettingsPage(){
		return "setting/purchaseSetting";
	}
	
	/**
	 * 
	 * @Description: 跳转系统设置页面
	 * @return String  
	 * @author zhangq
	 * @date 2017年3月30日
	 */
	@RequestMapping(value = "/toSystemSetting")
	public String toSystemPage(){
		return "setting/systemSetting";
	}
	

	
	/**
	 * 
	 * @Description: 获取机构设置
	 * @return RespJson  
	 * @author zhangq
	 * @date 2017年3月29日
	 */
	@RequestMapping(value = "getSetting", method=RequestMethod.POST)
	@ResponseBody
	public RespJson getBranchSetting(){
		String branchId = UserUtil.getCurrBranchId();
		try {
			BranchSpecVo vo = branchSpecServiceApi.queryByBranchId(branchId);
			return RespJson.success(vo, "success");
		} catch (BusinessException e) {
			LOG.warn(e.getMessage());
			return RespJson.error(e.getMessage());
		}
	}
	
	/**
	 * 
	 * @Description: 保存配置
	 * @param vo 
	 * @return RespJson  
	 * @author zhangq
	 * @date 2017年3月29日
	 */
	@RequestMapping(value = "save", method = RequestMethod.POST)
	@ResponseBody
	public RespJson saveSetting(BranchSpecVo vo) {
		LOG.info("更新机构配置，{}", vo);
		try {
			//额外复制
			vo.setBranchId(UserUtil.getCurrBranchId());
			vo.setUpdateUserId(UserUtil.getCurrUserId());
			vo.setUpdateTime(DateUtils.getCurrDate());
			
			//更新
			return branchSpecServiceApi.update(vo);
		} catch (Exception e) {
			LOG.error("保存机构配置失败{}", e);
			return RespJson.error("保存机构配置失败！");
		}
	}
}
