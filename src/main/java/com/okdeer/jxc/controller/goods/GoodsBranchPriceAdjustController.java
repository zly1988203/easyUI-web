/** 
 *@Project: okdeer-jxc-web 
 *@Author: liux01
 *@Date: 2017年3月6日 
 *@Copyright: ©2014-2020 www.yschome.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.goods;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportComponent;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportHandle;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportVo;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.goods.entity.GoodsPriceForm;
import com.okdeer.jxc.goods.entity.GoodsPriceFormAll;
import com.okdeer.jxc.goods.entity.GoodsPriceFormBranch;
import com.okdeer.jxc.goods.entity.GoodsPriceFormDetail;
import com.okdeer.jxc.goods.entity.GoodsSelect;
import com.okdeer.jxc.goods.entity.GoodsSelectPriceAdjst;
import com.okdeer.jxc.goods.qo.GoodsBranchPriceAdjustQo;
import com.okdeer.jxc.goods.service.GoodsBranchPriceAdjustService;
import com.okdeer.jxc.goods.service.GoodsPriceAdustServiceApi;
import com.okdeer.jxc.goods.vo.GoodsBranchPriceAdjustVo;
import com.okdeer.jxc.goods.vo.GoodsPriceFormConst;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

import net.sf.json.JSONObject;


/**
 * ClassName: GoodsBranchPriceAdjustController 
 * @Description: TODO
 * @author liux01
 * @date 2017年3月6日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("goods/branchPriceAdjust")
public class GoodsBranchPriceAdjustController extends BaseController<GoodsBranchPriceAdjustController> {

	@Reference(version="1.0.0",check=false)
	private GoodsBranchPriceAdjustService goodsBranchPriceAdjustService;
	@Reference(version="1.0.0",check=false)
	private GoodsPriceAdustServiceApi goodsPriceAdustService;
	@Autowired
	private GoodsSelectImportComponent goodsSelectImportComponent;
	/**
	 * 
	 * @Description: TODO
	 * @return
	 * @author liux01
	 * @date 2017年3月6日
	 */
	@RequestMapping(value = "list")
	public String list(Model model) {
		model.addAttribute("branchId", UserUtil.getCurrBranchId());
		model.addAttribute("branchCode", UserUtil.getCurrBranchCompleCode());
		model.addAttribute("branchName", UserUtil.getCurrBranchCompleName());
		return "goods/branchPriceAdjust/list";
	}
	/**
	 * 
	 * @Description: 获取店铺商品调价单列表信息
	 * @param vo 入参
	 * @param pageNumber 页数
	 * @param pageSize 每页显示数
	 * @return
	 * @author liux01
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "getGoodsBranchPriceAdjustList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsBranchPriceAdjustVo> getGoodsBranchPriceAdjustList(
			GoodsBranchPriceAdjustQo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
			PageUtils<GoodsBranchPriceAdjustVo> list = goodsBranchPriceAdjustService.getGoodsBranchPriceAdjustList(vo);
			return list;
		} catch (Exception e) {
			LOG.error("获取滞销信息列表信息异常:{}", e);
		}
		return null;
	}
	/**
	 * 
	 * @Description: 跳转到新增页面
	 * @param model
	 * @param request
	 * @return
	 * @author liux01
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "/addFormView", method = RequestMethod.GET)
	public String addFormView(Model model, HttpServletRequest request) {
		model.addAttribute("branchId", UserUtil.getCurrentUser().getBranchId());
		model.addAttribute("branchName",UserUtil.getCurrBranchCompleName());
		return "goods/branchPriceAdjust/addModifyBranchPrice";
	}
	/**
	 * 
	 * @Description: 保存店铺调价单信息
	 * @param data
	 * @return
	 * @author liux01
	 * @date 2017年3月8日
	 */
	@RequestMapping(value = "/saveForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson saveForm(@RequestBody String data) {
		try {
			if (StringUtils.isNotEmpty(data)) {
				SysUser user = UserUtil.getCurrentUser();
				GoodsPriceFormAll  goodsPriceFormAll = JSON.parseObject(data, GoodsPriceFormAll.class);
				if (goodsPriceFormAll != null) {
					return goodsBranchPriceAdjustService.saveForm(goodsPriceFormAll,user);
				} else {
					RespJson rep = RespJson.error("保存数据不能为空！");
					return rep;
				}
			} else {
				RespJson rep = RespJson.error("保存数据不能为空！");
				return rep;
			}
		} catch (Exception e) {
			LOG.error(GoodsPriceFormConst.ADD_GOODS_PRICE_FOMR_ERRO, e);
			return RespJson.error(GoodsPriceFormConst.ADD_GOODS_PRICE_FOMR_ERRO);
		}
	}
	/**
	 * 
	 * @Description: 更新店铺商品价格
	 * @param data
	 * @return
	 * @author liux01
	 * @date 2017年3月8日
	 */
	@RequestMapping(value = "/updateForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson updateForm(@RequestBody String data) {
		GoodsPriceFormAll goodsPriceFormAll = null;
		try {
			if (StringUtils.isNotEmpty(data)) {
				goodsPriceFormAll = JSON.parseObject(data, GoodsPriceFormAll.class);
				if (goodsPriceFormAll != null) {
					SysUser user = UserUtil.getCurrentUser();
					return goodsBranchPriceAdjustService.updateForm(goodsPriceFormAll,user);
				} else {
					RespJson rep = RespJson.error("保存数据不能为空！");
					return rep;
				}
			} else {
				RespJson rep = RespJson.error("保存数据不能为空！");
				return rep;
			}
		} catch (Exception e) {
			LOG.error(GoodsPriceFormConst.UPDATE_GOODS_PRICE_FOMR_ERRO, e);
			RespJson respJson = RespJson.error(GoodsPriceFormConst.UPDATE_GOODS_PRICE_FOMR_ERRO);
			return respJson;
		}
	}
	/**
	 * 
	 * @Description: 获取门店调价单信息
	 * @param formNo
	 * @param model
	 * @return
	 * @author liux01
	 * @date 2017年3月8日
	 */
	@RequestMapping(value = "/getForm", method = RequestMethod.GET)
	public String getForm(String formNo, Model model) {
		// 根据formNo查询单据
		GoodsPriceForm goodsPriceForm = goodsPriceAdustService.queryFormInCheck(formNo);
		List<GoodsPriceFormBranch> goodsPriceFormBranch = goodsPriceAdustService.queryPriceFormBranch(formNo);
		if(goodsPriceFormBranch != null && goodsPriceFormBranch.size() == 1){
			model.addAttribute("branchId", goodsPriceFormBranch.get(0).getBranchId());
			model.addAttribute("branchName", goodsPriceFormBranch.get(0).getBranchName());
		}
		model.addAttribute("goodsPriceForm", goodsPriceForm);
		return "goods/branchPriceAdjust/addModifyBranchPrice";
	}
	/**
	 * 
	 * @Description: 获取调价单明细
	 * @param formNo
	 * @return
	 * @author liux01
	 * @date 2017年3月8日
	 */
	@RequestMapping(value = "/getBranchPriceDetailsById")
	@ResponseBody
	public List<GoodsPriceFormDetail> getBranchPriceDetailsById(String formId) {
		return goodsBranchPriceAdjustService.getBranchPriceDetailsById(formId);
	}
	/**
	 * 
	 * @Description: 删除调价单
	 * @param formNo
	 * @return
	 * @author liux01
	 * @date 2017年3月8日
	 */
	@RequestMapping(value = "/deleteForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson deleteForm(String formNo) {
		// 获取当前用户
		SysUser user = UserUtil.getCurrentUser();
		// 修改人
		String updateUserId = user.getId();
		try {
			goodsPriceAdustService.removeFormByFormNo(formNo, updateUserId);
		} catch (Exception e) {
			LOG.error(GoodsPriceFormConst.DELETE_GOODS_PRICE_FOMR_ERRO, e);
			RespJson respJson = RespJson.error(GoodsPriceFormConst.DELETE_GOODS_PRICE_FOMR_ERRO);
			return respJson;
		}
		return RespJson.success();
	}
	@RequestMapping(value = "/bacthDeleteForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson bacthDeleteForm(String ids) {
		try {
			// 获取当前用户
			SysUser user = UserUtil.getCurrentUser();
			// 修改人
			String updateUserId = user.getId();
			if(StringUtils.isBlank(ids)){
				return RespJson.error("未选择单据");
			}
			String[] idArray = ids.split(",");
			return goodsBranchPriceAdjustService.bacthDeleteForm(idArray, updateUserId);
		} catch (Exception e) {
			LOG.error(GoodsPriceFormConst.DELETE_GOODS_PRICE_FOMR_ERRO, e);
			RespJson respJson = RespJson.error(GoodsPriceFormConst.DELETE_GOODS_PRICE_FOMR_ERRO);
			return respJson;
		}
	}
	/**
	 * 
	 * @Description: 导入模板
	 * @param response
	 * @param type
	 * @author liux01
	 * @date 2017年3月8日
	 */
	@RequestMapping(value = "exportTemp")
	public void exportTemp(HttpServletResponse response, Integer type) {
		LOG.info("GoodsPriceAdjustController:exportList:" + type);
		try {
			// 导出文件名称，不包括后缀名
			String fileName = "门店调价单货号导入模板";
			// 模板名称，包括后缀名
			String templateName = ExportExcelConstant.GOODS_BRANCH_PRICE_ADJUST_TEMPLE_SKUCODE;
			if (Constant.ZERO == type) {
				templateName = ExportExcelConstant.GOODS_BRANCH_PRICE_ADJUST_TEMPLE_SKUCODE;
				fileName = "门店调价单货号导入模板";
			} else {
				templateName = ExportExcelConstant.GOODS_BRANCH_PRICE_ADJUST_TEMPLE_BARCODE;
				fileName = "门店调价单条形码导入模板";
			}
			// 导出Excel
			exportListForXLSX(response, null, fileName, templateName);
		} catch (Exception e) {
			LOG.error("调价单导入模版下载失败:", e);
		}
	}
	/**
	 * 
	 * @Description: 导入货号或者条码
	 * @param file
	 * @param type
	 * @param branchId
	 * @return
	 * @author liux01
	 * @date 2017年3月8日
	 */
	@RequestMapping(value = "importList")
	@ResponseBody
	public RespJson importList(@RequestParam("file") MultipartFile file, String type, String[] branchId) {
		RespJson respJson = RespJson.success();
		try {
			if (file.isEmpty()) {
				return RespJson.error("文件为空");
			}

			if (StringUtils.isBlank(type)) {
				return RespJson.error("导入类型为空");
			}

			// 文件流
			InputStream is = file.getInputStream();
			// 获取文件名
			String fileName = file.getOriginalFilename();

			SysUser user = UserUtil.getCurrentUser();

			String[] field = null;

			if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {// 货号
				field = new String[] { "skuCode", "ignoreSkuName", "ignoreSpec", "newSalePrice","newVipPrice" };
			} else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {// 条码
				field = new String[] { "barCode", "ignoreSkuName", "ignoreSpec", "newSalePrice","newVipPrice" };
			}
			GoodsSelectImportVo<GoodsSelect> vo = goodsSelectImportComponent.importSelectGoodsMultiBranch(fileName, is,
					field, new GoodsSelectPriceAdjst(), branchId, user.getId(), type,
					"/goods/branchPriceAdjust/downloadErrorFile", new GoodsSelectImportBusinessValid() {

						@Override
						public void businessValid(List<JSONObject> excelListSuccessData, String[] excelField) {

						}

						/**
						 * (non-Javadoc)
						 * @see com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid#formatter(java.util.List)
						 */
						@Override
						public void formatter(List<? extends GoodsSelect> list, List<JSONObject> excelListSuccessData,
								List<JSONObject> excelListErrorData) {

						}

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
	 * @Description: 导入异常处理
	 * @param code
	 * @param type
	 * @param response
	 * @author liux01
	 * @date 2017年3月8日
	 */
	@RequestMapping(value = "downloadErrorFile")
	public void downloadErrorFile(String code, String type, HttpServletResponse response) {
		String reportFileName = "错误数据";

		String[] headers = null;
		String[] columns = null;

		if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {// 货号
			columns = new String[] { "skuCode", "ignoreSkuName", "ignoreSpec", "newPurPrice", "newSalePrice",
					"newDcPrice", "newWsPrice", "newVipPrice" };
			headers = new String[] { "货号", "商品名称", "规格","新零售价","新会员价" };
		} else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {// 条码
			columns = new String[] { "barCode", "ignoreSkuName", "ignoreSpec", "newSalePrice","newVipPrice" };
			headers = new String[] { "条码", "商品名称", "规格", "新零售价","新会员价" };
		}

		goodsSelectImportComponent.downloadErrorFile(code, reportFileName, headers, columns, response);
	}
	
	@RequestMapping(value = "/checkForm")
	@ResponseBody
	public RespJson checkForm(String formNo,String effectDate) {
		try {
			// 判断获得的生效时间是否为null 生效时间是空说明生效时间小于所填时间 要返回给用户错误信息
			if (StringUtils.isEmpty(effectDate)) {
				return RespJson.error(GoodsPriceFormConst.EFFECTDATE_NOT_NULL);
			}
			SysUser user = UserUtil.getCurrentUser();
			return goodsBranchPriceAdjustService.checkForm(formNo,effectDate,user);
		} catch (Exception e) {
			LOG.error("审核调价单失败", e);
			return RespJson.error("审核调价单失败");
		}
	}
	/**
	 * 
	 * @Description: 跳转到调价公司页面
	 * @return
	 * @author liux01
	 * @date 2017年3月9日
	 */
	@RequestMapping(value = "/modifyPriceDialog", method = RequestMethod.GET)
	public String modifyPriceDialog() {
		return "goods/branchPriceAdjust/modifyPriceDialog";
	}

	/**
	 * 
	 * @Description: 导出
	 * @param response
	 * @param formNo
	 * @author liux01
	 * @date 2017年3月10日
	 */
	@RequestMapping(value = "exportList")
	public void exportList(HttpServletResponse response, String formNo) {
		LOG.info("GoodsPriceAdjustController:exportList:" + formNo);
		try {
			List<GoodsPriceFormDetail> exportList = goodsPriceAdustService.queryDetailsByFormNo(formNo);
			// 导出文件名称，不包括后缀名
			String fileName = "门店调价单" + "_" + DateUtils.getCurrSmallStr();
			// 模板名称，包括后缀名
			String templateName = ExportExcelConstant.GOODS_BRANCH_PRICE_ADJUST_FORM;
			// 导出Excel
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("GoodsPriceAdjustController:exportList:", e);
		}
	}
}
