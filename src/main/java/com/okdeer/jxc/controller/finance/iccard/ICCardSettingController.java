/**
 *@Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 *@Project: okdeer-jxc-web
 *@Package: com.okdeer.jxc.controller.finance.iccard
 *@Author: songwj
 *@Date: 2017年5月19日 上午9:49:28
 *注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */

package com.okdeer.jxc.controller.finance.iccard;

import java.math.BigDecimal;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.google.common.collect.Maps;
import com.okdeer.jxc.branch.entity.BranchSpec;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.finance.iccard.entity.ICCardSetting;
import com.okdeer.jxc.finance.iccard.service.ICCardSettingService;
import com.okdeer.jxc.utils.UserUtil;

/**
 * @ClassName: ICcardSettingController
 * @Description:  一开通设置
 * @project okdeer-jxc-web
 * @author songwj
 * @date 2017年5月19日 上午9:49:28
 * =================================================================================================
 *     Task ID	         Date		  Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     V2.6         	2017年5月19日		  songwj		  一开通设置
 */
@Controller
@RestController
@RequestMapping("iccard/setting")
public class ICCardSettingController {
	
	private static final Logger logger = LoggerFactory.getLogger(ICCardSettingController.class);
	
	@Reference(version = "1.0.0", check = false)
	private ICCardSettingService icCardSettingService;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ModelAndView iccardSetting() {
		Map<String, Object> map = Maps.newConcurrentMap();
		BranchSpec branchSpec = icCardSettingService.selectBranchSpecByBranchId(UserUtil.getCurrentUser().getBranchId());
		map.put("enabled", branchSpec.getEcardEnabled());
		map.put("minAmount", branchSpec.getEcardMinAmount());
		return new ModelAndView("finance/iccard/iccardSetting",map);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public RespJson save(byte enabled, BigDecimal minAmount,@RequestParam(value = "ids[]") String[] ids,@RequestParam(value = "enableds[]")byte[] enableds){
		boolean bool = icCardSettingService.updateBranchSpec(UserUtil.getCurrentUser().getBranchId(), enabled, minAmount,ids,enableds);
		if(bool) return RespJson.success("一卡通设置成功!");
		return RespJson.error("一卡通设置失败!");
	}
	
	@RequestMapping(value = "/type/save", method = RequestMethod.POST)
	public RespJson save(String ip, int port,String cardType,String code){
		
		if(icCardSettingService.isExistICCardSetting(UserUtil.getCurrentUser().getBranchId(), cardType)){
			return RespJson.error("一卡通已经存在，请添加其它一卡通!");
		}else{
			icCardSettingService.saveICCardSetting(UserUtil.getCurrentUser().getBranchId(), ip, port, cardType, code, UserUtil.getCurrentUser().getId());
			return RespJson.success("添加一卡通成功!");
		}
	}

	@RequestMapping(value = "/type/delete/{id}", method = RequestMethod.POST)
	public RespJson delete(@PathVariable("id")String id){
		ICCardSetting icCardSetting = new ICCardSetting();
		icCardSetting.setDisabled(Byte.valueOf("1"));
		icCardSetting.setId(id);
		icCardSettingService.updateICCardSetting(icCardSetting);
		return RespJson.success("删除一卡通成功!");
	}
	
	@RequestMapping(value = "/type/list")
	public PageUtils<ICCardSetting> typeList(){
		PageUtils<ICCardSetting> suppliers = PageUtils.emptyPage();
		try {
			suppliers = icCardSettingService.selectBranchAllSettingList(UserUtil.getCurrentUser().getBranchId());
			return suppliers;
		} catch (Exception e) {
			logger.error("一卡通查询列表失败！", e);
		}
		return suppliers;
	}
	
	@RequestMapping(value = "addIcCardType", method = RequestMethod.GET)
	public ModelAndView addIcCardType() {
		return new ModelAndView("finance/iccard/addIcCardType");
	}
	
	@RequestMapping(value = "icCardShopSetting", method = RequestMethod.GET)
	public ModelAndView icCardShopSetting() {
		return new ModelAndView("finance/iccard/iccardShopSetting");
	}
}
