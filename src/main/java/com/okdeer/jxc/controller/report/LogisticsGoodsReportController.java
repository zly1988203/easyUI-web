/** 
 *@Project: okdeer-jxc-web 
 *@Author: taomm
 *@Date: 2016年8月15日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.enums.GoodsStatusEnum;
import com.okdeer.jxc.common.enums.GoodsTypeEnum;
import com.okdeer.jxc.common.enums.PricingTypeEnum;
import com.okdeer.jxc.common.enums.SaleWayEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.goods.service.GoodsBranchPriceServiceApi;
import com.okdeer.jxc.report.qo.GoodsReportQo;
import com.okdeer.jxc.report.service.GoodsReportService;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

/**
 * 
 * ClassName: LogisticsGoodsReportController 
 * @Description: 物流商品查询
 * @author zhangchm
 * @date 2017年7月11日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("goodsLogistics/report")
public class LogisticsGoodsReportController extends
BaseController<LogisticsGoodsReportController> {

	@Reference(version = "1.0.0", check = false)
	private GoodsReportService goodsReportService;

	@Reference(version = "1.0.0", check = false)
	BranchesServiceApi branchesServiceApi;

	@Reference(version = "1.0.0", check = false)
	private GoodsBranchPriceServiceApi goodsBranchPriceService;

	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesService;

	/**
	 * @Description: 物流商品查询跳转页
	 * @param model
	 * @return   
	 * @return String  
	 * @throws
	 * @author zhangchm
	 * @date 2017年7月11日
	 */
	@RequestMapping(value = "view")
	public String view(Model model) {
		SysUser user = getCurrentUser();
		Branches branchesGrow = branchesServiceApi.getBranchInfoById(user.getBranchId());
		model.addAttribute("branchesGrow", branchesGrow);
		//计价方式
		model.addAttribute("pricingType", PricingTypeEnum.values()); 
		//商品状态
		model.addAttribute("goodsStatus", GoodsStatusEnum.values()); 
		//商品类型
		model.addAttribute("goodsType", GoodsTypeEnum.values()); 
		
		model.addAttribute("saleWayList", SaleWayEnum.values()); 
		return "report/goodsLogistics/goodsReport";
	}

	/**
	 * @Description: 物流商品查询
	 * @param qo
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @return PageUtils<GoodsReportVo>  
	 * @throws
	 * @author zhangchm
	 * @date 2017年7月11日
	 */
	@RequestMapping(value = "getList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<Map<String,Object>> getList(
			GoodsReportQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);

			// 如果没有选择店铺，则查询登录人所在机构的商品
			if (StringUtils.isEmpty(qo.getBranchName())) {
				qo.setBranchId(UserUtil.getCurrBranchId());
			}else{
				String branchName = qo.getBranchName();
				if (StringUtils.isNotBlank(branchName) && branchName.contains("[")
						&& branchName.contains("]")) {
					int length = branchName.indexOf("]");
					qo.setBranchName(branchName.substring(length+1, branchName.length()));
				}

				List<Branches> branchList = branchesService.getBranchByKeyword(qo.getBranchName());
				if(branchList.size()==1){
					qo.setBranchId(branchList.get(0).getBranchesId());
				}
			}	
			PageUtils<Map<String,Object>> goodsReport = goodsReportService.queryGoodsLogistics(qo);
			return goodsReport;

		} catch (Exception e) {
			LOG.error("查询商品选择数据出现异常:", e);
		}
		return null;
	}

	/**
	 * @Description: 物流商品查询导出
	 * @param response
	 * @param qo
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author zhangchm
	 * @date 2017年7月11日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportList(HttpServletResponse response, GoodsReportQo qo) {

		LOG.debug("物流商品查询导出execl：vo" + qo);
		try {
			// 如果没有选择店铺，则查询登录人所在机构的商品
			if (StringUtils.isEmpty(qo.getBranchName())) {
				qo.setBranchId(UserUtil.getCurrBranchId());
			}else{
				String branchName = qo.getBranchName();
				if (StringUtils.isNotBlank(branchName) && branchName.contains("[")
						&& branchName.contains("]")) {
					int length = branchName.indexOf("]");
					qo.setBranchName(branchName.substring(length+1, branchName.length()));
				}

				List<Branches> branchList = branchesService.getBranchByKeyword(qo.getBranchName());
				if(branchList.size()==1){
					qo.setBranchId(branchList.get(0).getBranchesId());
				}
			}

			List<Map<String,Object>> exportList = goodsReportService.queryGoodsLogisticsList(qo);
			if(CollectionUtils.isNotEmpty(exportList)){
				String fileName = "商品_" + DateUtils.formatDate(DateUtils.getCurrDate(), DateUtils.DATE_KEY_STR);
				String templateName = ExportExcelConstant.GOODSLOGISTICSREPORT;
				exportListForXLSX(response, exportList, fileName, templateName);
			} else {
				RespJson json = RespJson.error("无数据可导");
				return json;
			}
		} catch (Exception e) {
			LOG.error("商品查询导出execl出现错误{}", e);
			RespJson json = RespJson.error("导出失败");
			return json;
		}
		return null;
	}
}
