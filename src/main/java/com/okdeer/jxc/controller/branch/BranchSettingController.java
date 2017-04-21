
package com.okdeer.jxc.controller.branch;

import java.util.ArrayList;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchSpecServiceApi;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.branch.vo.BranchSpecVo;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
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
	 * 机构Dubbo接口
	 */
	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesServiceApi;

	/**
	 * 
	 * @Description: 跳转销售设置页面
	 * @return String  
	 * @author zhangq
	 * @date 2017年3月29日
	 */
	@RequestMapping(value = "/toSaleSetting")
	public String toSaleSettingPage() {
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
	public String toDelivelSettingPage() {
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
	public String toPurchaseSettingsPage() {
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
	public String toSystemPage() {
		return "setting/systemSetting";
	}

	/**
	 * 
	 * @Description: 获取机构设置
	 * @return RespJson  
	 * @author zhangq
	 * @date 2017年3月29日
	 */
	@RequestMapping(value = "getSetting", method = RequestMethod.POST)
	@ResponseBody
	public RespJson getBranchSetting() {
		String branchId = UserUtil.getCurrBranchId();
		try {
			RespJson resp = validPermissions();
			if(!resp.isSuccess()){
				return resp;
			}
			BranchSpecVo vo = branchSpecServiceApi.queryByBranchId(branchId);
			return RespJson.success(vo, "success");
		} catch (BusinessException e) {
			LOG.warn(e.getMessage());
			return RespJson.error(e.getMessage());
		}
	}
	
	/**
	 * 
	 * @Description: 验证
	 * @return RespJson  
	 * @author zhangq
	 * @date 2017年4月10日
	 */
	private RespJson validPermissions(){
		String branchId = UserUtil.getCurrBranchId();
		//机构类型(0.总部、1.分公司、2.物流中心、3.自营店、4.加盟店B、5.加盟店C) 
		Branches branch = branchesServiceApi.getBranchInfoById(branchId);
		
		//机构不存在
		if(null == branch){
			return RespJson.error("机构不存在");
		}
		
		//总部不可以设置
		if(branch.getType() == 0){
			return RespJson.error("总部不可以设置");
		}
		
		//门店取分公司配置，否则取自己
		if(branch.getType() == 3 || branch.getType() == 4 || branch.getType() == 5){
			return RespJson.error("门店不可以设置");
		}
		
		return RespJson.success();
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
		LOG.debug("更新机构配置，{}", vo);
		try {
			RespJson resp = validPermissions();
			if(!resp.isSuccess()){
				return resp;
			}
			// 额外复制
			vo.setBranchId(UserUtil.getCurrBranchId());
			vo.setUpdateUserId(UserUtil.getCurrUserId());
			vo.setUpdateTime(DateUtils.getCurrDate());

			// 更新
			return branchSpecServiceApi.update(vo);
		} catch (Exception e) {
			LOG.error("保存机构配置失败{}", e);
			return RespJson.error("保存机构配置失败！");
		}
	}

	/**
	 * @Description: 出库单模板导出
	 * @param type 模板类型
	 * @author zhengwj
	 * @date 2017年3月31日
	 */
	@RequestMapping(value = "exportTemp")
	public void exportTemp(HttpServletResponse response, int type) {
		try {
			// 导出文件名称，不包括后缀名
			String fileName = "出库单导出模板";
			String templateName = null;
			if (type == 1) {
				templateName = ExportExcelConstant.DOSHEET1;
			} else if (type == 2) {
				templateName = ExportExcelConstant.DOSHEET2;
			}
			// 导出Excel
			exportListForXLSX(response, new ArrayList<>(), fileName, templateName);
		} catch (Exception e) {
			LOG.error("下载出库单模板失败:{}", e);
		}
	}
}
