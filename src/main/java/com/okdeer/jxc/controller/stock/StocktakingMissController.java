
package com.okdeer.jxc.controller.stock;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.PrintConstant;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.controller.print.JasperHelper;
import com.okdeer.jxc.stock.po.StockTakingMissPo;
import com.okdeer.jxc.stock.qo.StocktakingMissQo;
import com.okdeer.jxc.stock.service.StocktakingOperateServiceApi;

/**
 * <p></p>
 * ClassName: StocktakingMissController 
 * @Description: 漏盘商品查询
 * @author xuyq
 * @date 2017年3月7日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/stocktaking/miss")
public class StocktakingMissController extends BaseController<StocktakingMissController> {

	@Reference(version = "1.0.0", check = false)
	private StocktakingOperateServiceApi stocktakingOperateService;

	/**
	 *  
	 * @Description: 跳转列表页面
	 * @return String
	 * @author xuyq
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "/list")
	public String list() {
		return "/stocktaking/miss/missList";
	}

	/**
	 * @Description: 分页获取漏盘商品数据
	 * @param qo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author liwb
	 * @date 2017年3月11日
	 */
	@RequestMapping(value = "/getMissList")
	@ResponseBody
	public PageUtils<StockTakingMissPo> getMissList(StocktakingMissQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {

		qo.setPageNumber(pageNumber);
		qo.setPageSize(pageSize);

		LOG.info("漏盘列表查询参数：{}", qo);
		try {

			// 构建查询参数
			buildSearchParams(qo);

			return stocktakingOperateService.getMissListForPage(qo);
		} catch (Exception e) {
			LOG.error("查询漏盘商品列表异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 构建查询参数
	 * @param qo
	 * @author liwb
	 * @date 2017年3月11日
	 */
	private void buildSearchParams(StocktakingMissQo qo) {
		// 如果是店铺账号，则只查询当前店铺的信息
		if (BranchTypeEnum.isStore(getCurrBranchType())) {
			qo.setBranchCompleCode(null);
			qo.setBranchId(getCurrBranchId());
		} else {
			// 如果是分公司或者总部，则获取当前所有下级机构的数据
			qo.setBranchId(null);
			if (StringUtils.isBlank(qo.getBranchCompleCode())) {
				qo.setBranchCompleCode(getCurrBranchCompleCode());
			}
		}

		String skuCodeOrName = qo.getSkuCodeOrName();
		if (StringUtils.isNotBlank(skuCodeOrName)) {

			// 如果是选择的商品信息，清空商品名称
			if (skuCodeOrName.contains("[") && skuCodeOrName.contains("]")) {
				qo.setSkuCodeOrName(null);
			} else {

				// 如果是自己填写的信息，则清空商品Id
				qo.setSkuId(null);
			}
		}

		String categoryCodeOrName = qo.getCategoryCodeOrName();
		if (StringUtils.isNotBlank(categoryCodeOrName)) {

			// 如果是选择的类别信息，清空类别名称
			if (categoryCodeOrName.contains("[") && categoryCodeOrName.contains("]")) {
				qo.setCategoryCodeOrName(null);
			} else {

				// 如果是自己填写的信息，则清空分类编号
				qo.setCategoryCode(null);
			}
		}

		// 结束日期延后一天
		if (qo.getEndTime() != null) {
			qo.setEndTime(DateUtils.getDayAfter(qo.getEndTime()));
		}
	}

	/**
	 * @Description: 导出记录
	 * @param response
	 * @param qo
	 * @return
	 * @author liwb
	 * @date 2017年3月11日
	 */
	@RequestMapping(value = "/exportMissList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportMissList(HttpServletResponse response, StocktakingMissQo qo) {
		LOG.info("漏盘商品列表导出参数：{}", qo);
		RespJson resp = RespJson.success();
		try {
			// 构建查询参数
			buildSearchParams(qo);

			List<StockTakingMissPo> exportList = stocktakingOperateService.getMissList(qo);

			String fileName = "漏盘商品查询" + DateUtils.getCurrSmallStr();
			String templateName = ExportExcelConstant.STOCK_TAKING_MISS_GOODS;
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("漏盘商品列表导出异常：{}", e);
			resp = RespJson.error("漏盘商品列表导出异常");
		}
		return resp;
	}

	/**
	 * @Description: 打印PDF
	 * @param qo
	 * @param response
	 * @param request
	 * @return
	 * @author liwb
	 * @date 2017年3月11日
	 */
	@RequestMapping(value = "/printMissList", method = RequestMethod.GET)
	@ResponseBody
	public String printMissList(StocktakingMissQo qo, HttpServletResponse response, HttpServletRequest request) {
		try {
			LOG.info("漏盘列表打印功能参数：{}", qo);
			// 构建查询参数
			buildSearchParams(qo);

			List<StockTakingMissPo> printList = stocktakingOperateService.getMissList(qo);

			if (printList.size() > PrintConstant.PRINT_MAX_ROW) {
				return "<script>alert('打印最大行数不能超过" + PrintConstant.PRINT_MAX_ROW + "行');top.closeTab();</script>";
			}
			String path = PrintConstant.STOCK_TAKING_MISS_GOODS;
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("startDate", qo.getStartTime());
			map.put("endDate", qo.getEndTime());
			map.put("printName", getCurrentUser().getUserName());
			JasperHelper.exportmain(request, response, map, JasperHelper.PDF_TYPE, path, printList, "");
		} catch (Exception e) {
			LOG.error("漏盘商品列表打印出错：", e);
		}
		return null;
	}
}
