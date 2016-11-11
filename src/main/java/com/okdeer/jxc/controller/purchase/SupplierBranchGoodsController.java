/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月20日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.purchase;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.goods.service.GoodsSkuServiceApi;
import com.okdeer.jxc.goods.service.GoodsSupplierBranchServiceApi;
import com.okdeer.jxc.goods.vo.BranchGoodsSkuVo;
import com.okdeer.jxc.goods.vo.GoodsSupplierBranchVo;
import com.okdeer.jxc.supplier.service.SupplierAreaServiceApi;
import com.okdeer.jxc.supplier.vo.SupplierAreaVo;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.poi.ExcelReaderUtil;

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
	 * @Description: 导入
	 * @param file
	 * @return 返回查询结果
	 * @author zhongy
	 * @date 2016年11月09日
	 */
	@RequestMapping(value = "/importListEnable", method = RequestMethod.POST)
	@ResponseBody
	public List<BranchGoodsSkuVo> importListEnable(@RequestParam("file") MultipartFile file,Integer type) {
		try { 
			if (file.isEmpty()) {
				LOG.info("file is empty");
				return null;
			}
			if(type == null){
				type = 0;
			}
			// 文件流
			InputStream is = file.getInputStream();
			// 获取文件名
			String fileName = file.getOriginalFilename();
			// 解析Excel
			List<String> list = ExcelReaderUtil.readExcelForFirstColumn(fileName, is, new String());
			List<String> tempList = new ArrayList<String>();
			for (String barCode : list) {
				if(barCode != null && barCode.indexOf(".") != -1){
					tempList.add(barCode.substring(0,barCode.indexOf(".")));
				}else{
					tempList.add(barCode);
				}
			}
			List<BranchGoodsSkuVo> goodsSkus = goodsSkuServiceApi.querySkuGoodsByBarCodes(tempList,type);
			return goodsSkus;
		} catch (IOException e) {
			LOG.error("读取Excel流异常:", e);
		} catch (Exception e) {
			LOG.error("用户导入异常:", e);
		}
		return null;
	}
	
}
