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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
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
import com.okdeer.jxc.branch.service.BranchSpecServiceApi;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.PrintConstant;
import com.okdeer.jxc.common.controller.BasePrintController;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.finance.iccard.service.ICCardAccountService;
import com.okdeer.jxc.finance.iccard.vo.ICCardAccountVo;

/**
 * @ClassName: ICCardAccountManagementController
 * @Description:  一开通账户管理
 * @project okdeer-jxc-web
 * @author songwj
 * @date 2017年5月19日 上午9:49:28
 * =================================================================================================
 *     Task ID	         Date		  Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     V2.6         	2017年5月19日		  songwj		  一开通账户管理
 */
@Controller
@RestController
@RequestMapping("iccard/account/management")
public class ICCardAccountManagementController extends BasePrintController<ICCardAccountVo, ICCardAccountVo> {

	private static final Logger logger = LoggerFactory.getLogger(ICCardAccountManagementController.class);

	@Reference(version = "1.0.0", check = false)
	private ICCardAccountService icCardAccountService;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public ModelAndView iccardSetting() {
		return new ModelAndView("finance/iccard/iccardAccountList");
	}

	@RequestMapping(value = "/list")
	public PageUtils<ICCardAccountVo> iccardAccountList(ICCardAccountVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize, HttpServletRequest request) {
		Optional<ICCardAccountVo> optional = Optional.ofNullable(vo);
		vo = optional.orElse(new ICCardAccountVo());
		vo.setPageNumber(pageNumber);
		vo.setPageSize(pageSize);
		String branchCompleCode = request.getParameter("branchCompleCode");
		if (StringUtils.isNoneBlank(branchCompleCode)) {
			vo.setBranchCode(branchCompleCode);
		} else {
			vo.setBranchCode(getCurrentUser().getBranchCompleCode());
		}
		PageUtils<ICCardAccountVo> suppliers = PageUtils.emptyPage();
		try {
			suppliers = icCardAccountService.selectAccountList(vo,true);
			if(suppliers==null){
				return PageUtils.emptyPage();
			}else{
				ICCardAccountVo icCardAccountVo = icCardAccountService.sumAccountList(vo);
				if(icCardAccountVo!=null){
        				icCardAccountVo.setBranchCode("SUM");
        				suppliers.setFooter(new ArrayList<ICCardAccountVo>(){
        				    private static final long serialVersionUID = 1L;
        
        				    {
        					add(icCardAccountVo);
        				    }
        				});
				}
			}
			return suppliers;
		} catch (Exception e) {
			logger.error("一卡通查询列表失败！", e);
		}
		return suppliers;
	}

	@RequestMapping(value = "/exports")
	public RespJson export(ICCardAccountVo vo, HttpServletRequest request, HttpServletResponse response) {
		try {
			Optional<ICCardAccountVo> optional = Optional.ofNullable(vo);
			vo = optional.orElse(new ICCardAccountVo());
			vo.setPageNumber(Integer.valueOf(PAGE_NO));
			vo.setPageSize(PrintConstant.PRINT_MAX_LIMIT);
			String branchCompleCode = request.getParameter("branchCompleCode");
			if (StringUtils.isNoneBlank(branchCompleCode)) {
				vo.setBranchCode(branchCompleCode);
			} else {
				vo.setBranchCode(getCurrentUser().getBranchCompleCode());
			}
			PageUtils<ICCardAccountVo> suppliers = icCardAccountService.selectAccountList(vo,false);
			List<ICCardAccountVo> list = suppliers.getList();
			if (!list.isEmpty() && list.size() > 0) {
				String fileName = "一开通账户管理" + "_" + DateUtils.getCurrSmallStr();
				String templateName = ExportExcelConstant.ICC_CARD_ACCOUNT_MANAGEMENT;
				exportListForXLSX(response, list, fileName, templateName);
			} else {
				return RespJson.error("无数据可导");
			}
		} catch (Exception e) {
			logger.error("一开通账户管理导出异常:", e);
			RespJson json = RespJson.error("导出失败");
			return json;
		}
		return null;
	}

	@RequestMapping(value = "/dict/{type}")
	public List<Map<String,Object>> getSysDict(@PathVariable("type") String type){
		return this.icCardAccountService.getSysDict(type);
	}
	
	@RequestMapping(value = "/recharge", method = RequestMethod.POST)
	public RespJson recharge(String branchId, BigDecimal oldBalance, BigDecimal addBalance, String rechargeType,
			BigDecimal newBalance, String remark, HttpServletRequest request, HttpServletResponse response) {
		boolean bool = this.icCardAccountService.rechargeOrExtracted(true, branchId, oldBalance, addBalance,
				rechargeType, newBalance, remark, getCurrUserId());
		if (bool) {
			return RespJson.success("一卡通充值成功!");
		}
		return RespJson.error("一卡通充值失败!");
	}

	@RequestMapping(value = "/extracted", method = RequestMethod.POST)
	public RespJson extracted(String branchId, BigDecimal oldBalance, BigDecimal extractBalance, String rechargeType,
			BigDecimal newBalance, String remark, HttpServletRequest request, HttpServletResponse response) {
		boolean bool = this.icCardAccountService.rechargeOrExtracted(false, branchId, oldBalance, extractBalance,
				rechargeType, newBalance, remark, getCurrUserId());
		if (bool) {
			return RespJson.success("一卡通提取成功!");
		}
		return RespJson.error("一卡通提取失败!");
	}
	
	@RequestMapping(value = "/iccardExtracted", method = RequestMethod.GET)
	public ModelAndView icCardExtracted() {
		return new ModelAndView("finance/iccard/iccardExtracted");
	}

	@RequestMapping(value = "/iccardRecharge", method = RequestMethod.GET)
	public ModelAndView icCardRecharge() {
		return new ModelAndView("finance/iccard/iccardRecharge");
	}

	@Override
	protected Map<String, Object> getPrintReplace(String formNo) {
		return null;
	}

	@Override
	protected List<ICCardAccountVo> getPrintDetail(String formNo) {
		return null;
	}

	@Override
	protected BranchSpecServiceApi getBranchSpecService() {
		return null;
	}
}
