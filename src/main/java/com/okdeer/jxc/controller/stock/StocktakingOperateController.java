package com.okdeer.jxc.controller.stock;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportHandle;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportTxt;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportVo;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.goods.entity.GoodsSelect;
import com.okdeer.jxc.goods.entity.GoodsSelectByStockTaking;
import com.okdeer.jxc.stock.service.StocktakingOperateServiceApi;
import com.okdeer.jxc.stock.vo.StocktakingFormDetailVo;
import com.okdeer.jxc.stock.vo.StocktakingFormVo;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

import net.sf.json.JSONObject;

/**
 * <p></p>
 * ClassName: StocktakingOperateController 
 * @Description: 存货盘点
 * @author xuyq
 * @date 2017年3月7日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/stocktaking/operate")
public class StocktakingOperateController extends BaseController<StocktakingOperateController> {

	@Reference(version = "1.0.0", check = false)
	private StocktakingOperateServiceApi stocktakingOperateServiceApi;

	@Autowired
	private GoodsSelectImportTxt goodsSelectImportTxt;

	/**
	 * 
	 * @Description: 跳转列表页面
	 * @return String
	 * @author xuyq
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "/list")
	public String list() {
		return "/stocktaking/operate/operateList";
	}

	/**
	 * 
	 * @Description: 跳转新增页面
	 * @return String
	 * @author xuyq
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "/add")
	public String add() {
		return "/stocktaking/operate/operateAdd";
	}

	/**
	 * 
	 * @Description: 跳转弹框页面
	 * @return String
	 * @author xuyq
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "/publicStocktaking")
	public String publicStocktaking() {
		return "/component/publicStocktaking";
	}

	/***
	 * 
	 * @Description: 详细
	 * @param id 记录ID
	 * @param report 关闭状态
	 * @param request HttpServletRequest
	 * @return String
	 * @author xuyq
	 * @date 2017年2月16日
	 */
	@RequestMapping(value = "/stocktakingFormView", method = RequestMethod.GET)
	public String stocktakingFormView(String id, String report, HttpServletRequest request) {
		StocktakingFormVo formVo = stocktakingOperateServiceApi.getStocktakingFormById(id);
		request.setAttribute("stocktakingFormVo", formVo);
		request.setAttribute("close", report);
		return "/stocktaking/operate/operateEdit";
	}

	/***
	 * 
	 * @Description:  获取明细信息
	 * @param id 记录ID
	 * @return List
	 * @author xuyq
	 * @date 2017年2月19日
	 */
	@RequestMapping(value = "/stocktakingFormDetailList", method = RequestMethod.GET)
	@ResponseBody
	public List<StocktakingFormDetailVo> stocktakingFormDetailList(String formId) {
		LOG.info(LogConstant.OUT_PARAM, formId);
		List<StocktakingFormDetailVo> detailList = new ArrayList<StocktakingFormDetailVo>();
		try {
			detailList = stocktakingOperateServiceApi.getStocktakingFormDetailList(formId);
		} catch (Exception e) {
			LOG.error("获取单据信息异常:{}", e);
		}
		return detailList;
	}

	/**
	 * @Description: 查询列表
	 * @param vo 参数VO
	 * @param pageNumber 页码
	 * @param pageSize 页数
	 * @return PageUtils
	 * @author xuyq
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "/getStocktakingFormList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<StocktakingFormVo> getStocktakingFormList(StocktakingFormVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			LOG.info(LogConstant.OUT_PARAM, vo.toString());
			PageUtils<StocktakingFormVo> StocktakingFormList = stocktakingOperateServiceApi.getStocktakingFormList(vo);
			LOG.info(LogConstant.PAGE, StocktakingFormList.toString());
			return StocktakingFormList;
		} catch (Exception e) {
			LOG.error("存货盘点查询列表信息异常:{}", e);
		}
		return null;
	}

	/**
	 * @Description: 保存盘点单
	 * @param data
	 * @return
	 * @author xuyq
	 * @date 2017年3月9日
	 */
	@RequestMapping(value = "/saveStocktakingForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson saveStocktakingForm(String data) {
		RespJson respJson = RespJson.success();
		LOG.debug("保存存货盘点 ：data{}" + data);
		SysUser user = UserUtil.getCurrentUser();
		if (user == null) {
			respJson = RespJson.error("用户不能为空！");
			return respJson;
		}
		try {
			if (StringUtils.isBlank(data)) {
				respJson = RespJson.error("保存数据不能为空！");
				return respJson;
			}
			StocktakingFormVo vo = JSON.parseObject(data, StocktakingFormVo.class);
			if ("1".equals(vo.getOperateType())) {
				// 新增
				vo.setCreateUserId(user.getId());
				vo.setCreateUserName(user.getUserName());
				return stocktakingOperateServiceApi.saveStocktakingForm(vo);
			} else {
				// 修改
				vo.setUpdateUserId(user.getId());
				vo.setUpdateUserName(user.getUserName());
				return stocktakingOperateServiceApi.updateStocktakingForm(vo);
			}
		} catch (Exception e) {
			LOG.error("保存存货盘点异常：{}", e);
			respJson = RespJson.error("保存存货盘点异常!");
		}
		return respJson;
	}

	/**
	 * 
	 * @Description: 删除
	 * @param ids 记录IDS
	 * @return RespJson
	 * @author xuyq
	 * @date 2017年2月19日
	 */
	@RequestMapping(value = "deleteStocktakingForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson deleteStocktakingForm(@RequestParam(value = "ids[]") List<String> ids) {
		RespJson resp;
		try {
			return stocktakingOperateServiceApi.deleteStocktakingForm(ids);
		} catch (Exception e) {
			LOG.error("删除组合拆分单异常:{}", e);
			resp = RespJson.error("删除组合拆分单失败");
		}
		return resp;
	}

	/**
	 * @Description: 导入文件
	 * @param file
	 * @param branchId
	 * @param type
	 * @return
	 * @author xuyq
	 * @date 2017年3月11日
	 */
	@RequestMapping(value = "importStocktakingForm")
	@ResponseBody
	public RespJson importStocktakingForm(@RequestParam("file") MultipartFile file, String branchId, String type) {
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
			if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {
				// 货号
				field = new String[] { "skuCode", "stocktakingNum" };
			} else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {
				// 条码
				field = new String[] { "barCode", "stocktakingNum" };
			}
			GoodsSelectImportVo<GoodsSelectByStockTaking> vo = goodsSelectImportTxt.importSelectGoodsWithStockTxt(
					fileName, is, field, new GoodsSelectByStockTaking(), branchId, user.getId(), type,
					"/stocktaking/operate/downloadErrorFile", new GoodsSelectImportBusinessValid() {

						@Override
						public void businessValid(List<JSONObject> excelListSuccessData, String[] excelField) {
							for (JSONObject obj : excelListSuccessData) {
								double stocktakingNum = 0;
								String errorStr = "盘点数量必须为0到" + ExportExcelConstant.MAXNUM + "的数字";
								// 校验空
								if (obj.get("stocktakingNum") == null || obj.get("stocktakingNum") == null) {
									obj.element("error", errorStr);
									continue;
								}
								// 校验上限
								String upperLimit = obj.getString("stocktakingNum");
								try {
									stocktakingNum = Double.parseDouble(upperLimit);
									if (stocktakingNum < 0 || stocktakingNum > ExportExcelConstant.MAXNUM) {
										obj.element("error", errorStr);
									}
								} catch (Exception e) {
									obj.element("error", errorStr);
									LOG.error("数字转换异常:", e);
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
							LOG.info("formatter");
						}

						/**
						 * (non-Javadoc)
						 * @see com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid#errorDataFormatter(java.util.List)
						 */
						@Override
						public void errorDataFormatter(List<JSONObject> list) {
							LOG.info("errorDataFormatter");
						}

					});

			// 作金额计算
			List<GoodsSelectByStockTaking> stcoktakingVos = vo.getList();
			for (GoodsSelectByStockTaking staking : stcoktakingVos) {
				BigDecimal result = staking.getSalePrice().multiply(staking.getStocktakingNum());
				result.setScale(4, BigDecimal.ROUND_HALF_UP);
				staking.setAmount(result);
			}
			respJson.put("importInfo", vo);

		} catch (IOException e) {
			respJson = RespJson.error("读取TXT流异常");
			LOG.error("读取TXT流异常:", e);
		} catch (Exception e) {
			respJson = RespJson.error("导入发生异常");
			LOG.error("用户导入异常:", e);
		}
		return respJson;

	}

	/**
	 * 
	 * @Description: 导出异常信息
	 * @param code 编码
	 * @param type 类型
	 * @param response HttpServletResponse
	 * @author liux01
	 * @date 2016年10月15日
	 */
	@RequestMapping(value = "downloadErrorFile")
	public void downloadErrorFile(String code, String type, HttpServletResponse response) {
		String reportFileName = "错误数据";

		String[] headers = null;
		String[] columns = null;

		if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {
			// 货号
			columns = new String[] { "skuCode", "stocktakingNum" };
			headers = new String[] { "货号", "盘点数量" };
		} else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {
			// 条码
			columns = new String[] { "barCode", "stocktakingNum" };
			headers = new String[] { "条码", "盘点数量" };
		}

		goodsSelectImportTxt.downloadErrorFile(code, reportFileName, headers, columns, response);
	}
}
