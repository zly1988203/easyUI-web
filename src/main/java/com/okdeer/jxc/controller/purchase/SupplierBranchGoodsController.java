/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月20日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.purchase;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

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
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportComponent;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportHandle;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportVo;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.goods.entity.GoodsSelect;
import com.okdeer.jxc.goods.entity.GoodsSelectByPurchase;
import com.okdeer.jxc.goods.service.GoodsSkuServiceApi;
import com.okdeer.jxc.goods.service.GoodsSupplierBranchServiceApi;
import com.okdeer.jxc.goods.vo.BranchGoodsSkuVo;
import com.okdeer.jxc.goods.vo.GoodsSupplierBranchVo;
import com.okdeer.jxc.supplier.service.SupplierAreaServiceApi;
import com.okdeer.jxc.supplier.vo.SupplierAreaVo;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: SupplierBranchGoodsController 
 * @Description: 供应商机构商品controller
 * @author zhongy
 * @date 2016年11月08日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 零售管理系统1.3.0	  2016年11月08日			 zhongy			    供应商机构商品controller
 */

@Controller
@RequestMapping("supplierBranchGoods")
public class SupplierBranchGoodsController extends BaseController<SupplierBranchGoodsController> {

	@Reference(version = "1.0.0", check = false)
	private SupplierAreaServiceApi supplierAreaService;

	@Reference(version = "1.0.0", check = false)
	BranchesServiceApi branchesServiceApi;

	@Reference(version = "1.0.0", check = false)
	GoodsSkuServiceApi goodsSkuServiceApi;
	
	@Reference(version = "1.0.0", check = false)
	GoodsSupplierBranchServiceApi goodsSupplierBranchServiceApi;
	
	@Autowired
	private GoodsSelectImportComponent goodsSelectImportComponent;
	/**
	 * @Description: 到管理列表页面
	 * @return
	 * @author zhongy
	 * @date 2016年11月08日
	 */
	@RequestMapping(value = "goList")
	public String goList(Model model) {
		SysUser user = getCurrentUser();
		Branches branchesGrow = branchesServiceApi.getBranchInfoById(user.getBranchId());
		model.addAttribute("branchesGrow", branchesGrow);
		return "supplierBranchGoods/supplierBranchGoodsList";
	}

	/**
	 * @Description: 机构供应商树形展示
	 * @return
	 * @author zhongy
	 * @date 2016年11月08日
	 */
	@RequestMapping(value = "getBranchSupplierToTree")
	@ResponseBody
	public String getBranchSupplierToTree(SupplierAreaVo vo) {
		try {
			vo.setBranchCompleCode(super.getCurrBranchCompleCode());
			// 机构供应商区域树形展示
			String tree = supplierAreaService.queryBranchSupplierToTree(vo);
			return tree;
		} catch (Exception e) {
			LOG.error("查询机构供应商树形结构异常:", e);
		}
		return null;
	}
	
	/**
	 * @Description: 供应商机构商品查询
	 * @return List<BranchGoodsSkuVo>  
	 * @author zhongy
	 * @date 2016年11月10日
	 */
	@RequestMapping(value = "findSupplierBranchGoods", method = RequestMethod.POST)
	@ResponseBody
	public List<BranchGoodsSkuVo> findSupplierBranchGoods(String branchId,String supplierId) {
		try {
			LOG.info("供应商机构商品查询请求参数,branchId={},supplierId={}",branchId,supplierId);
			List<BranchGoodsSkuVo> result = goodsSupplierBranchServiceApi.querySupplierBranchGoods(branchId, supplierId);
			return result;
		} catch (Exception e) {
			LOG.error("供应商机构商品查询异常:", e);
		}
		return null;
	}
	
	
	/**
	 * 保存供应商机构商品
	 * @param validate
	 * @param form
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月4日
	 */
	@RequestMapping(value = "saveSupplierBranchGoods", method = RequestMethod.POST)
	@ResponseBody
	public Map<String,String> saveSupplierBranchGoods(@RequestBody String jsonText) {
		Map<String,String> map = new HashMap<String,String>();
		try {
			GoodsSupplierBranchVo vo = JSON.parseObject(jsonText, GoodsSupplierBranchVo.class);
			List<String> skuIds = vo.getSkuIds();
			String branchId = vo.getBranchId();
			String supplierId = vo.getSupplierId();
			goodsSupplierBranchServiceApi.batchSaveSupplierBranchGoods(skuIds,branchId,supplierId);
			map.put("code", "0");
		} catch (Exception e) {
			LOG.error("保存供应商机构商品异常",e);
			map.put("message", "保存供应商机构商品异常");
		}
		return map;
	}
	
	/**
	 * 删除供应商机构商品
	 * @param validate
	 * @param form
	 * @return
	 * @author xiaoj02
	 * @date 2016年8月4日
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Map<String,String> delete(@RequestBody String jsonText) {
		Map<String,String> map = new HashMap<String,String>();
		try {
			GoodsSupplierBranchVo vo = JSON.parseObject(jsonText, GoodsSupplierBranchVo.class);
			List<String> skuIds = vo.getSkuIds();
			String branchId = vo.getBranchId();
			String supplierId = vo.getSupplierId();
			goodsSupplierBranchServiceApi.deleteSupplierBranchGoods(skuIds, branchId, supplierId);
			map.put("code", "0");
		} catch (Exception e) {
			LOG.error("删除供应商机构商品异常",e);
			map.put("message", "删除供应商机构商品异常");
		}
		return map;
	}
	
	/**
	 * @Description: 供应商机构商品关系导出
	 * @param response
	 * @param branchId 机构id
	 * @param supplierId 供应商id
	 * @return
	 * @author zhongy
	 * @date 2016年11月11日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public String exportList(HttpServletResponse response,String branchId,String branchName,
			String supplierId,String supplierName) {
		LOG.info("供应商机构商品关系导出请求参数,branchId={},supplierId={}",branchId,supplierId);
		try {
			List<BranchGoodsSkuVo> list = goodsSupplierBranchServiceApi.querySupplierBranchGoods(branchId, supplierId);
			String fileName = supplierName+"_"+branchName+ "_" + DateUtils.getCurrSmallStr();
			String templateName = ExportExcelConstant.SUPPLIER_BRANCH_GOODS_REPORT;
			exportListForXLSX(response, list, fileName, templateName);
		} catch (Exception e) {
			LOG.error("供应商机构商品关系导出失败", e);
		}
		return null;
	}
	
	/**
	 * @Description: 供应商机构商品导入模板
	 * @param response
	 * @param type
	 * @author zhongy
	 * @date 2016年11月15日
	 */
	@RequestMapping(value = "exportTemp")
	public void exportTemp(HttpServletResponse response, Integer type) {
		LOG.info("导出采购导入模板请求参数,type={}", type);
		try {
			String fileName = "";
			String templateName = "";
			if (Constant.ZERO == type) {
				templateName = ExportExcelConstant.GOODS_INTRODUCE_SKU_CODE_TEMPLE;
				fileName = "货号导入模板";
			} else if (Constant.ONE == type) {
				templateName = ExportExcelConstant.GOODS_INTRODUCE_BAR_CODE_TEMPLE;
				fileName = "条码导入模板";
			}
			if (StringUtils.isNotBlank(fileName)
					&& StringUtils.isNotBlank(templateName)) {
				exportListForXLSX(response, null, fileName, templateName);
			}
		} catch (Exception e) {
			LOG.error("导出采购导入模板异常", e);
		}
	}
	
	/**
	 * 商品导入
	 * @param file
	 * @param type 2货号、3条码
	 * @param branchId
	 * @return
	 * @author xiaoj02
	 * @date 2016年10月14日
	 */
	@RequestMapping(value = "importListEnable")
	@ResponseBody
	public RespJson importList(@RequestParam("file") MultipartFile file,String type) {
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

			if (type.equals(String.valueOf(Constant.ZERO))) {// 货号
				field = new String[] { "skuCode"};
			} else if (type.equals(String.valueOf(Constant.ONE))) {// 条码
				field = new String[] { "barCode"};
			}
			GoodsSelectImportVo<GoodsSelect> vo = goodsSelectImportComponent.importSelectGoods(fileName, is, field,
							new GoodsSelectByPurchase(), null,
							user.getId(), type,
							"/supplierBranchGoods/downloadErrorFile",
							new GoodsSelectImportBusinessValid() {

								@Override
								public void businessValid(
										List<JSONObject> list,
										String[] excelField) {
								}

								/**
								 * (non-Javadoc)
								 * @see com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid#formatter(java.util.List)
								 */
								@Override
								public void formatter(
										List<? extends GoodsSelect> list) {
									for (GoodsSelect objGoods : list) {
										GoodsSelectByPurchase obj = (GoodsSelectByPurchase) objGoods;

										BigDecimal price = obj.getPrice();
										if (price == null) {
											obj.setPrice(obj.getPurchasePrice());
										}
									}
								}

								/**
								 * (non-Javadoc)
								 * @see com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid#errorDataFormatter(java.util.List)
								 */
								@Override
								public void errorDataFormatter(
										List<JSONObject> list) {
									
								}
					}, null);
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
	 * @author xiaoj02
	 * @date 2016年10月15日
	 */
	@RequestMapping(value = "downloadErrorFile")
	public void downloadErrorFile(String code, String type,
			HttpServletResponse response) {
		String reportFileName = "错误数据";

		String[] headers = null;
		String[] columns = null;

		if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {// 货号
			columns = new String[] { "skuCode"};
			headers = new String[] { "货号"};
		} else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {// 条码
			columns = new String[] { "barCode"};
			headers = new String[] { "条码"};
		}
		goodsSelectImportComponent.downloadErrorFile(code, reportFileName,headers, columns, response);
	}
	
}
