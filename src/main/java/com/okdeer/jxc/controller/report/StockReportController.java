/** 
 *@Project: okdeer-jxc-web 
 *@Author: taomm
 *@Date: 2016年8月15日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.report;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.enums.BranchGoodsStatusEnum;
import com.okdeer.jxc.common.enums.PricingTypeEnum;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.report.qo.StockReportQo;
import com.okdeer.jxc.report.service.StockReportService;
import com.okdeer.jxc.report.vo.StockReportVo;
import com.okdeer.jxc.utils.UserUtil;

/**
 * 
 * ClassName: StockReportController 
 * @Description: 库存查询
 * @author dongh
 * @date 2016年8月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("stock/report")
public class StockReportController extends BaseController<StockReportController> {

	@Reference(version = "1.0.0", check = false)
	private StockReportService stockReportService;

	/**
	 * 
	 * @Description: 商品库存查询跳转页
	 * @return 返回视图
	 * @author taomm
	 * @date 2016年8月22日
	 */
	@RequestMapping(value = "view")
	public String view(Model model) {
		model.addAttribute("pricingType", PricingTypeEnum.values()); // 计价方式
		model.addAttribute("goodsStatus", BranchGoodsStatusEnum.values()); // 商品状态
		return "report/goods/goodsStockReport";
	}

	/**
	 * 
	 * @Description: 库存查询
	 * @param qo 请求参数
	 * @param pageNumber
	 * @param pageSize
	 * @return 返回查询结果
	 * @author dongh
	 * @date 2016年8月22日
	 */
	@RequestMapping(value = "getList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<StockReportVo> getList(StockReportQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			LOG.debug("商品库存查询，报表查询参数：{}", qo);
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);

			// 构建默认参数
			qo = buildDefaultParams(qo);

			// 1、列表查询
			PageUtils<StockReportVo> page = stockReportService.queryListToPage(qo);

			// 获取页脚合计一栏数据
			List<StockReportVo> sum = getFooterList(qo);
			page.setFooter(sum);
			return page;
		} catch (Exception e) {
			LOG.error("商品库存查询异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 获取页脚合计一栏数据
	 * @param qo
	 * @return
	 * @author liwb
	 * @date 2016年9月24日
	 */
	private List<StockReportVo> getFooterList(StockReportQo qo) {
		// 2、汇总查询
		StockReportVo footer = stockReportService.queryStockReportSum(qo);

		String branchCode = "<b>" + footer.getBranchCode() + "</b>";
		footer.setBranchCode(branchCode);
		if (StringUtils.isBlank(footer.getActual())) {
			footer.setActual("0.00");
		}
		if (StringUtils.isBlank(footer.getCostAmount())) {
			footer.setCostAmount("0.00");
		}
		if (StringUtils.isBlank(footer.getSaleAmount())) {
			footer.setSaleAmount("0.00");
		}
		footer.setCostPrice(null);
		footer.setSalePrice(null);
		List<StockReportVo> sum = new ArrayList<StockReportVo>();
		sum.add(footer);
		return sum;
	}

	/**
	 * 
	 * @Description: 报表导出
	 * @param request
	 * @param response
	 * @param vo
	 * @author dongh
	 * @date 2016年8月25日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public String exportList(StockReportQo qo, HttpServletResponse response) {

		LOG.debug("商品库存查询，报表导出参数：{}", qo);
		try {
			// 构建默认参数
			qo = buildDefaultParams(qo);
			// 1、列表查询
			List<StockReportVo> exportList = stockReportService.queryList(qo);

			// 2、汇总查询
			StockReportVo footer = stockReportService.queryStockReportSum(qo);
			if (StringUtils.isBlank(footer.getActual())) {
				footer.setActual("0.00");
			}
			if (StringUtils.isBlank(footer.getCostAmount())) {
				footer.setCostAmount("0.00");
			}
			if (StringUtils.isBlank(footer.getSaleAmount())) {
				footer.setSaleAmount("0.00");
			}
			if (CollectionUtils.isEmpty(exportList)) {
				exportList = new ArrayList<StockReportVo>();
			}
			exportList.add(footer);
			// 3、价格特殊处理
			exportList = handlePrice(exportList);
			String fileName = "商品库存报表" + "_" + DateUtils.getCurrSmallStr();
			String templateName = ExportExcelConstant.STOCKREPORT;
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("商品库存查询报表导出异常:", e);
		}
		return null;
	}

	/**
	 * @Description: 构建默认参数
	 * @param qo
	 * @author liwb
	 * @date 2016年9月26日
	 */
	private StockReportQo buildDefaultParams(StockReportQo qo) {

		// 去掉选择机构的展示参数
		String branchNameOrCode = qo.getBranchNameOrCode();
		if (StringUtils.isNotBlank(branchNameOrCode) && branchNameOrCode.contains("[") && branchNameOrCode.contains("]")) {
			qo.setBranchNameOrCode(null);
		}

		// 去掉选择类型的展示参数
		String categoryNameCode = qo.getCategoryNameOrCode();
		if (StringUtils.isNotBlank(categoryNameCode) && categoryNameCode.contains("[") && categoryNameCode.contains("]")) {
			qo.setCategoryNameOrCode(null);
		}
		
		// 默认当前机构
		if (StringUtils.isBlank(qo.getBranchCode()) && StringUtils.isBlank(qo.getBranchNameOrCode())) {
			qo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
		}

		return qo;
	}

	private List<StockReportVo> handlePrice(List<StockReportVo> exportList) {
		for (StockReportVo vo : exportList) {
			// 库存
			if (StringUtils.isNotBlank(vo.getActual())) {
				java.math.BigDecimal actual = new java.math.BigDecimal(vo.getActual()).setScale(4,
						java.math.BigDecimal.ROUND_HALF_UP);
				vo.setActual(String.valueOf(actual));
			}
			// 成本价
			if (StringUtils.isNotBlank(vo.getCostPrice())) {
				java.math.BigDecimal costPrice = new java.math.BigDecimal(vo.getCostPrice()).setScale(4,
						java.math.BigDecimal.ROUND_HALF_UP);
				vo.setCostPrice(String.valueOf(costPrice));
			}
			// 库存金额
			if (StringUtils.isNotBlank(vo.getCostAmount())) {
				java.math.BigDecimal costAmount = new java.math.BigDecimal(vo.getCostAmount()).setScale(4,
						java.math.BigDecimal.ROUND_HALF_UP);
				vo.setCostAmount(String.valueOf(costAmount));
			}
			// 售价
			if (StringUtils.isNotBlank(vo.getSalePrice())) {
				java.math.BigDecimal salePrice = new java.math.BigDecimal(vo.getSalePrice()).setScale(4,
						java.math.BigDecimal.ROUND_HALF_UP);
				vo.setSalePrice(String.valueOf(salePrice));
			}
			// 售价金额
			if (StringUtils.isNotBlank(vo.getSaleAmount())) {
				java.math.BigDecimal saleAmount = new java.math.BigDecimal(vo.getSaleAmount()).setScale(4,
						java.math.BigDecimal.ROUND_HALF_UP);
				vo.setSaleAmount(String.valueOf(saleAmount));
			}
		}
		return exportList;
	}
}
