package com.okdeer.jxc.controller.stock;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportComponent;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportHandle;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportVo;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.goods.entity.GoodsSelect;
import com.okdeer.jxc.goods.entity.GoodsSelectByStockIndex;
import com.okdeer.jxc.report.service.StockIndexServiceApi;
import com.okdeer.jxc.report.vo.StockIndexVo;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

import net.sf.json.JSONObject;

/***
 * 
 * ClassName: StockIndexController 
 * @Description: 商品存量指标Controller
 * @author xuyq
 * @date 2017年2月14日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/stock/index")
public class StockIndexController extends BaseController<T> {

	@Reference(version = "1.0.0", check = false)
	private StockIndexServiceApi stockIndexServiceApi;

	@Autowired
	private GoodsSelectImportComponent goodsSelectImportComponent;

	/**
	 * 
	 * @Description: 跳转列表页面
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/list")
	public String list() {
		return "/stockIndex/stockIndexList";
	}

	/**
	 * 
	 * @Description: 跳转新增页面
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/add")
	public String add() {
		return "/stockIndex/stockIndexAdd";
	}

	/**
	 * 
	 * @Description: 跳转修改页面
	 * @param id
	 * @param request
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.GET)
	public String edit(String id, HttpServletRequest request) {
		return "/stockIndex/stockIndexEdit";
	}

	/**
	 * 
	 * @Description: 查询列表
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author xuyq
	 * @date 2017年2月14日
	 */
	@RequestMapping(value = "getStockIndexList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<StockIndexVo> getstockIndexList(StockIndexVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			SysUser user = UserUtil.getCurrentUser();
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
			vo.setBranchType(user.getBranchType() == 0 ? 1 : 2);
			LOG.info(LogConstant.OUT_PARAM, vo.toString());
			PageUtils<StockIndexVo> stockIndexList = stockIndexServiceApi.getStockIndexList(vo);
			LOG.info(LogConstant.PAGE, stockIndexList.toString());
			return stockIndexList;
		} catch (Exception e) {
			LOG.error("商品存量指标查询列表信息异常:{}", e);
		}
		return null;
	}

	/***
	 * 
	 * @Description: 保存商品存量指标
	 * @param vo
	 * @param validate
	 * @return
	 * @author xuyq
	 * @date 2017年2月15日
	 */

	@RequestMapping(value = "/saveStockIndex", method = RequestMethod.POST)
	@ResponseBody
	public RespJson saveStockIndex(String data) {
		LOG.debug("保存商品存量指标 ：data=" + data);
		SysUser user = UserUtil.getCurrentUser();
		if (user == null) {
			RespJson rep = RespJson.error("用户不能为空！");
			return rep;
		}
		RespJson respJson = RespJson.success();
		try {
			if (StringUtils.isNotEmpty(data)) {
				List<StockIndexVo> jsonList = JSON.parseArray(data, StockIndexVo.class);
				if (jsonList != null && jsonList.size() > 0) {
					Map<String, Object> paramMap = new HashMap<String, Object>();
					paramMap.put("branchId", jsonList.get(0).getBranchId());
					paramMap.put("userId", user.getId());
					paramMap.put("jsonList", jsonList);
					stockIndexServiceApi.saveStockIndex(paramMap);
				} else {
					RespJson rep = RespJson.error("保存数据不能为空！");
					return rep;
				}
			} else {
				RespJson rep = RespJson.error("保存数据不能为空！");
				return rep;
			}
		} catch (Exception e) {
			LOG.error("保存商品存量指标异常：", e);
			respJson = RespJson.error("保存商品存量指标异常!");
		}
		return respJson;
	}

	/***
	 * 
	 * @Description: 导入商品存量指标
	 * @param file
	 * @param branchId
	 * @param type
	 * @return
	 * @author xuyq
	 * @date 2017年2月17日
	 */
	@RequestMapping(value = "importStockIndexList")
	@ResponseBody
	public RespJson importStockIndexList(@RequestParam("file") MultipartFile file, String branchId, String type) {
		RespJson respJson = RespJson.success();
		try {
			if (file.isEmpty()) {
				return RespJson.error("文件为空");
			}
			InputStream is = file.getInputStream();
			// 获取文件名
			String fileName = file.getOriginalFilename();
			SysUser user = UserUtil.getCurrentUser();
			String[] field = null;
			if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {// 货号
				field = new String[] { "skuCode", "upperLimit", "lowerLimit" };
			} else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {// 条码
				field = new String[] { "barCode", "upperLimit", "lowerLimit" };
			}
			GoodsSelectImportVo<GoodsSelectByStockIndex> vo = goodsSelectImportComponent.importSelectGoodsWithStock(
					fileName, is, field, new GoodsSelectByStockIndex(), branchId, user.getId(), type,
					"/stock/index/downloadErrorFile", new GoodsSelectImportBusinessValid() {

						@Override
						public void businessValid(List<JSONObject> excelListSuccessData, String[] excelField) {
							for (JSONObject obj : excelListSuccessData) {
								if (obj.get("upperLimit") != null) {
									String realNum = obj.getString("upperLimit");
									try {
										Double.parseDouble(realNum);
									} catch (Exception e) {
										obj.element("error", "库存上限必填");
									}
								}
								if (obj.get("upperLimit") != null && Integer.parseInt(obj.getString("upperLimit")) == 0) {
									obj.element("error", "库存上限不能为0");
								}
								
								if (obj.get("lowerLimit") != null) {
									String largeNum = obj.getString("lowerLimit");
									try {
										Double.parseDouble(largeNum);
									} catch (Exception e) {
										obj.element("error", "库存下限必填");
									}
								}
								if (obj.get("lowerLimit") != null && Integer.parseInt(obj.getString("lowerLimit")) == 0) {
									obj.element("error", "库存下限不能为0");
								}

							}
						}

						/**
						 * (non-Javadoc)
						 * @see com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid#formatter(java.util.List)
						 */
						@Override
						public void formatter(List<? extends GoodsSelect> list, List<JSONObject> excelListSuccessData,
								List<JSONObject> excelListErrorData) {
						}

						/**
						 * (non-Javadoc)
						 * @see com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid#errorDataFormatter(java.util.List)
						 */
						@Override
						public void errorDataFormatter(List<JSONObject> list) {

						}

					});

			respJson.put("importInfo", vo);

		} catch (IOException e) {
			respJson = RespJson.error("读取Excel流异常");
			LOG.error("读取Excel流异常:", e);
		} catch (Exception e) {
			respJson = RespJson.error("导入发生异常");
			LOG.error("用户导入异常:", e);
		}
		return respJson;

	}

	/**
	 * 
	 * @Description: 导出异常信息
	 * @param code
	 * @param type
	 * @param response
	 * @author liux01
	 * @date 2016年10月15日
	 */
	@RequestMapping(value = "downloadErrorFile")
	public void downloadErrorFile(String code, String type, HttpServletResponse response) {
		String reportFileName = "错误数据";

		String[] headers = null;
		String[] columns = null;

		if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {// 货号
			columns = new String[] { "skuCode", "upperLimit", "lowerLimit" };
			headers = new String[] { "货号", "库存上限", "库存下限" };
		} else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {// 条码
			columns = new String[] { "barCode", "upperLimit", "lowerLimit"};
			headers = new String[] { "条码", "库存上限", "库存下限" };
		}

		goodsSelectImportComponent.downloadErrorFile(code, reportFileName, headers, columns, response);
	}

	/**
	 * 
	 * @Description: 导入模板下载
	 * @param response
	 * @param type
	 * @author liux01
	 * @date 2016年10月15日
	 */
	@RequestMapping(value = "exportStockIndexTemp")
	public void exportTemp(HttpServletResponse response, String type) {
		try {
			// 导出文件名称，不包括后缀名
			String fileName = null;
			String templateName = null;
			if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {
				fileName = "商品存量指标-导入货号模板";
				templateName = ExportExcelConstant.STOCK_INDEX_SKU_TEMPLE;
			} else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {
				templateName = ExportExcelConstant.STOCK_INDEX_BAR_TEMPLE;
				fileName = "商品存量指标-导入条码模板";
			}
			// 导出Excel
			exportListForXLSX(response, null, fileName, templateName);
		} catch (Exception e) {
			LOG.error("商品存量指标导入模板下载失败:{}", e);
		}
	}
}
