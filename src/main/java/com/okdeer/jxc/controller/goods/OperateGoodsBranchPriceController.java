/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年9月17日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */
package com.okdeer.jxc.controller.goods;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import net.sf.json.JSONObject;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.enums.GoodsStatusEnum;
import com.okdeer.jxc.common.goodselect.BranchGoodsImportComponent;
import com.okdeer.jxc.common.goodselect.BranchGoodsImportVo;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportHandle;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.goods.entity.GoodsBranchPrice;
import com.okdeer.jxc.goods.entity.GoodsBranchPriceVo;
import com.okdeer.jxc.goods.entity.GoodsSelect;
import com.okdeer.jxc.goods.qo.GoodsBranchPriceQo;
import com.okdeer.jxc.goods.service.GoodsBranchPriceServiceApi;
import com.okdeer.jxc.goods.service.GoodsSkuSyncServiceApi;
import com.okdeer.jxc.goods.vo.BranchGoodsPropVo;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;
import com.okdeer.jxc.utils.jxls.ReportExcelUtil;

/**
 * ClassName: GoodsBranchPriceController 
 * @Description: 运营商品引入
 * @author zhangchm
 * @date 2017年5月26日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    进销存2.0.0		   2016年9月17日                  xiaoj02            		店铺商品
 */
@Controller
@RequestMapping("branch/operateGoods")
public class OperateGoodsBranchPriceController extends BaseController<OperateGoodsBranchPriceController> {
	@Reference(version = "1.0.0", check = false)
	private GoodsBranchPriceServiceApi goodsBranchPriceService;
	@Reference(version = "1.0.0", check = false)
	private GoodsSkuSyncServiceApi goodsSkuSyncServiceApi;
	@Autowired
	private BranchGoodsImportComponent branchGoodsImportComponent;
	@Reference(version = "1.0.0", check = false)
	BranchesServiceApi branchesServiceApi;

	/**
	 * 列表
	 * @return
	 * @author zhangchm
	 * @date 2017年5月26日
	 */
	@RequestMapping(value = "list")
	public String list() {
		return "operateGoods/branchgoods/list";
	}

	@RequestMapping(value = "listData", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsBranchPriceVo> listData(GoodsBranchPriceQo qo) {
		if (StringUtils.isBlank(qo.getBranchId())) {
			SysUser user = UserUtil.getCurrentUser();
			qo.setBranchId(user.getBranchId());
		}
		if (qo.getStatus() == null) {
			qo.setStatus(0);
		}
		try {
			Integer branchType = null;
			if (StringUtils.isBlank(qo.getBranchType())) {
				branchType = UserUtil.getCurrBranchType();
			} else {
				branchType = Integer.valueOf(qo.getBranchType());
			}
			// 查询机构商品
			PageUtils<GoodsBranchPriceVo> branchGoods = null;
			if (BranchTypeEnum.LOGISTICS_CENTER.getCode().equals(branchType)
					|| BranchTypeEnum.SELF_STORE.getCode().equals(branchType)
					|| BranchTypeEnum.FRANCHISE_STORE_B.getCode().equals(branchType)
					|| BranchTypeEnum.FRANCHISE_STORE_C.getCode().equals(branchType)) {
				branchGoods = goodsBranchPriceService.queryOperateBranchGoods(qo);
			} else if (BranchTypeEnum.HEAD_QUARTERS.getCode().equals(branchType)
					|| BranchTypeEnum.BRANCH_OFFICE.getCode().equals(branchType)) {
				branchGoods = goodsBranchPriceService.queryOperateBranchCompanyGoods(qo);
			} else {
				LOG.error("机构类型错误!");
				return null;
			}
			return branchGoods;
		} catch (Exception e) {
			LOG.error("查询店铺商品异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * 批量启用商品
	 * @param skuIds
	 * @param storeId
	 * @return
	 * @author zhangchm
	 * @date 2017年5月26日
	 */
	@RequestMapping(value = "enable", method = RequestMethod.POST)
	@ResponseBody
	public RespJson enable(String skuIds, String branchId) {
		if (StringUtils.isBlank(skuIds)) {
			return RespJson.error("未选择商品");
		}
		String[] skuIdArray = skuIds.split(",");
		if (skuIdArray.length == 0) {
			return RespJson.error("未选择商品");
		}
		if (skuIdArray.length > 1000) {
			return RespJson.error("选择的商品数量超过了限制数量");
		}
		List<String> skuIdList = new ArrayList<String>();
		for (int i = 0; i < skuIdArray.length; i++) {
			skuIdList.add(skuIdArray[i]);
		}
		SysUser user = UserUtil.getCurrentUser();
		if (StringUtils.isBlank(branchId)) {
			branchId = user.getBranchId();
		}
		try {
			goodsBranchPriceService.enable(skuIdList, branchId, user.getId());
		} catch (Exception e) {
			return RespJson.error("导入失败");
		}
		return RespJson.success();
	}

	/**
	 * @Description: 多机构引入批量启用商品
	 * @param branchesId
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author zhangchm
	 * @date 2017年5月26日
	 */
	@RequestMapping(value = "branchesLeadInto", method = RequestMethod.POST)
	@ResponseBody
	public RespJson branchesLeadInto(String skuIds, String branchesId) {
		if (StringUtils.isBlank(branchesId)) {
			return RespJson.error("未选择机构");
		}
		if (StringUtils.isBlank(skuIds)) {
			return RespJson.error("未选择商品");
		}
		List<String> brancheList = splitStr(branchesId);
		if (brancheList.isEmpty()) {
			return RespJson.error("未选择机构");
		}
		if (brancheList.size() > 100) {
			return RespJson.error("选择的机构数量超过了限制数量 100");
		}
		List<String> skuIdList = splitStr(skuIds);
		if (skuIdList.isEmpty()) {
			return RespJson.error("未选择商品");
		}
		if (skuIdList.size() > 1000) {
			return RespJson.error("选择的商品数量超过了限制数量 1000");
		}
		SysUser user = UserUtil.getCurrentUser();
		try {
			goodsBranchPriceService.branchesLeadInto(brancheList, skuIdList, user.getId());
		} catch (Exception e) {
			return RespJson.error("多机构引入商品失败!");
		}
		return RespJson.success();
	}

	private List<String> splitStr(String str) {
		String[] strs = str.split(",");
		List<String> brancheList = new ArrayList<String>();
		if (strs.length == 0) {
			return brancheList;
		}
		for (int i = 0; i < strs.length; i++) {
			brancheList.add(strs[i]);
		}
		return brancheList;
	}

	/**
	 * 批量启用商品
	 * @param skuIds
	 * @param storeId
	 * @return
	 * @author zhangchm
	 * @date 2017年5月26日
	 */
	@RequestMapping(value = "enableOne", method = RequestMethod.POST)
	@ResponseBody
	public RespJson enableOne(String skuIds, String branchId) {
		if (StringUtils.isBlank(skuIds)) {
			return RespJson.error("未选择商品");
		}
		String[] skuIdArray = skuIds.split(",");
		if (skuIdArray.length == 0) {
			return RespJson.error("未选择商品");
		}
		if (skuIdArray.length > 1) {
			return RespJson.error("选择的商品数量超过了限制数量");
		}
		SysUser user = UserUtil.getCurrentUser();
		if (StringUtils.isBlank(branchId)) {
			branchId = user.getBranchId();
		}
		try {
			goodsBranchPriceService.enableOne(skuIds, branchId, user.getId());
		} catch (Exception e) {
			return RespJson.error("导入失败");
		}
		return RespJson.success();
	}

	/**
	 * 批量淘汰商品
	 * @param skuCodes
	 * @param storeId
	 * @author zhangchm
	 * @date 2017年5月26日
	 */
	@RequestMapping(value = "eliminateGoodsStoreSku", method = RequestMethod.POST)
	@ResponseBody
	public RespJson eliminateGoodsStoreSku(String goodsStoreSkuIds, String branchId) {
		SysUser user = UserUtil.getCurrentUser();
		if (StringUtils.isBlank(goodsStoreSkuIds)) {
			return RespJson.error("批量淘汰商品");
		}
		String[] skuIdArray = goodsStoreSkuIds.split(",");
		if (skuIdArray.length == 0) {
			return RespJson.error("未选择商品");
		}
		if (skuIdArray.length > 1000) {
			return RespJson.error("选择的商品数量超过了限制数量");
		}
		List<String> skuIdList = new ArrayList<String>();
		for (int i = 0; i < skuIdArray.length; i++) {
			skuIdList.add(skuIdArray[i]);
		}
		if (StringUtils.isBlank(branchId)) {
			branchId = user.getBranchId();
		}
		try {
			goodsSkuSyncServiceApi.eliminateGoodsStoreSkuToMq(branchId, skuIdList, user.getId());
		} catch (Exception e) {
			return RespJson.error(e.getLocalizedMessage());
		}
		return RespJson.success();
	}

	/**
	 * 批量恢复商品
	 * @param skuCodes
	 * @param storeId
	 * @author zhangchm
	 * @date 2017年5月26日
	 */
	@RequestMapping(value = "recoveryGoodsStoreSku", method = RequestMethod.POST)
	@ResponseBody
	public RespJson recoveryGoodsStoreSku(String skuObjs) {
		if (StringUtils.isBlank(skuObjs)) {
			return RespJson.error("批量淘汰商品");
		}
		String[] skuObjArr = skuObjs.split("\\|");
		if (skuObjArr.length == 0) {
			return RespJson.error("未选择商品");
		}
		if (skuObjArr.length > 1000) {
			return RespJson.error("选择的商品数量超过了限制数量");
		}
		List<GoodsBranchPrice> goodsBranchPriceList = new ArrayList<GoodsBranchPrice>();
		for (int i = 0; i < skuObjArr.length; i++) {
			GoodsBranchPrice goodsBranchPrice = new GoodsBranchPrice();
			// skuObj格式备注：skuObj=id+","+skuId + ','+branchId+"|"
			String[] skuObj = skuObjArr[i].split(",");
			goodsBranchPrice.setStatus(String.valueOf(GoodsStatusEnum.NORMAL.ordinal()));
			goodsBranchPrice.setId(skuObj[0]);
			goodsBranchPrice.setSkuId(skuObj[1]);
			goodsBranchPrice.setBranchId(skuObj[2]);
			goodsBranchPriceList.add(goodsBranchPrice);
		}
		try {
			if (CollectionUtils.isNotEmpty(goodsBranchPriceList)) {
				goodsSkuSyncServiceApi.recoveryGoodsStoreSkuToMq(goodsBranchPriceList);
			}
		} catch (Exception e) {
			return RespJson.error(e.getLocalizedMessage());
		}
		return RespJson.success();
	}

	/**
	 * 跳转分公司商品属性编辑页
	 * @param goodsBranchPriceId 商品机构价格表ID
	 * @return 
	 */
	@RequestMapping(value = "tobranchGoodsPropEdit")
	public String tobranchGoodsPropEdit(String goodsBranchPriceId, Model model) {
		BranchGoodsPropVo vo = goodsBranchPriceService.queryBranchGoodsPropById(goodsBranchPriceId);
		model.addAttribute("vo", vo);
		return "operateGoods/branchgoods/branchGoodsPropEdit";
	}

	/**
	 * 更新分公司商品属性信息
	 * @param branchGoodsPropVo 分公司商品属性信息VO
	 * @param validate
	 * @return
	 */
	@RequestMapping(value = "/branchGoodsPropSave", method = RequestMethod.POST)
	@ResponseBody
	public RespJson branchGoodsPropSave(@Valid BranchGoodsPropVo branchGoodsPropVo, BindingResult validate) {
		if (validate.hasErrors()) {
			String errorMessage = validate.getFieldError().getDefaultMessage();
			LOG.warn("validate error message:{}", errorMessage);
			return RespJson.error(errorMessage);
		}
		branchGoodsPropVo.setUpdateUserId(UserUtil.getCurrUserId());
		return goodsBranchPriceService.updateBranchGoodsProp(branchGoodsPropVo);
	}

	/************************************修改商品导入*****************************************/
	/**
	 * 商品导入
	 * @param file
	 * @param type 0货号、1条码
	 * @param status,0:机构已有商品,1:机构未引入商品,2:所有
	 * @param branchId
	 * @return
	 * @author zhangchm
	 * @date 2017年5月26日
	 */
	@RequestMapping(value = "importList")
	@ResponseBody
	public RespJson importList(@RequestParam("file") MultipartFile file, String type, String branchId, Integer status) {
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
			String[] fields = null;
			if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {
				fields = new String[] { "skuCode" };
			} else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {
				fields = new String[] { "barCode" };
			}
			String errorFileDownloadUrlPrefix = "/branch/operateGoods/downloadErrorFile";
			Map<String, String> map_branchid = new HashMap<String, String>();
			BranchGoodsImportVo<GoodsBranchPriceVo> vo = branchGoodsImportComponent.importSelectGoods(fileName, is,
					fields, new GoodsBranchPriceVo(), branchId, status, user.getId(), type, errorFileDownloadUrlPrefix,
					new GoodsSelectImportBusinessValid() {
						@Override
						public void businessValid(List<JSONObject> excelListSuccessData, String[] excelField) {
							// 未引入的商品，需要验证上级是否引入及自身是否引入
							if (status == 1) {
								ImportValidParentExist(excelListSuccessData, branchId, type);
								ImportValidExists(excelListSuccessData, branchId, type);
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
					}, map_branchid);
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
	 * @Description: 导入验证，上级是否引入
	 * @param excelListSuccessData
	 * @param branchId
	 * @param type   
	 * @return void  
	 * @author zhangchm
	 * @date 2017年5月26日
	 */
	public void ImportValidParentExist(List<JSONObject> excelListSuccessData, String branchId, String type) {
		GoodsBranchPriceQo qo = new GoodsBranchPriceQo();
		qo.setStatus(0);
		qo.setPage(1);
		PageUtils<GoodsBranchPriceVo> page = null;
		Branches branch = branchesServiceApi.getBranchInfoById(branchId);// 机构类型(0.总部、1.分公司、2.物流中心、3.自营店、4.加盟店B、5.加盟店C)
		if (branch.getType() == 3 || branch.getType() == 4 || branch.getType() == 5) {
			qo.setBranchId(branch.getParentId());
			qo.setRows(excelListSuccessData.size());
			List<String> codeList = new ArrayList<String>();
			if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {
				for (JSONObject obj : excelListSuccessData) {
					codeList.add(obj.getString("skuCode"));
				}
				qo.setSkuCodeList(codeList);
			} else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {
				for (JSONObject obj : excelListSuccessData) {
					codeList.add(obj.getString("barCode"));
				}
				qo.setBarCodeList(codeList);
			}
			// 不需要查询上级门店所有的，只需要查询要导入的
			page = goodsBranchPriceService.queryBranchGoods(qo);
			List<GoodsBranchPriceVo> list = page.getList();
			Map<String, GoodsBranchPriceVo> map = new HashMap<String, GoodsBranchPriceVo>();
			// 用于一品多码进行匹配
			Map<String, GoodsBranchPriceVo> allBarCode = new HashMap<String, GoodsBranchPriceVo>();
			if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {
				for (GoodsBranchPriceVo vo : list) {
					map.put(vo.getSkuCode(), vo);
				}
			} else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {
				for (GoodsBranchPriceVo vo : list) {
					map.put(vo.getBarCode(), vo);
					String[] barCodes = vo.getBarCodes().split(",");
					for (int i = 0; i < barCodes.length; i++) {
						allBarCode.put(barCodes[i], vo);
					}
				}
			}
			// 上级未引入验证
			for (JSONObject obj : excelListSuccessData) {
				if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {
					String skuCode = obj.getString("skuCode");
					if (!map.containsKey(skuCode)) {
						obj.element("error", "分公司未引入或已淘汰该商品!");
					}
				} else {
					String barCode = obj.getString("barCode");
					if (!map.containsKey(barCode) && !allBarCode.containsKey(barCode)) {
						obj.element("error", "分公司未引入或已淘汰该商品!");
					}
				}
			}
		}
	}

	/**
	 * 
	 * @Description: 导入验证，验证机构是否已存在
	 * @param excelListSuccessData
	 * @param branchId
	 * @param type   
	 * @return void  
	 * @throws
	 * @author zhangchm
	 * @date 2017年5月26日
	 */
	public void ImportValidExists(List<JSONObject> excelListSuccessData, String branchId, String type) {
		GoodsBranchPriceQo qo = new GoodsBranchPriceQo();
		qo.setStatus(0);
		qo.setPage(1);
		qo.setRows(excelListSuccessData.size());
		qo.setBranchId(branchId);
		// 条码或货号列表
		List<String> list = new ArrayList<String>();
		if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {
			for (JSONObject obj : excelListSuccessData) {
				String skuCode = obj.getString("skuCode");
				list.add(skuCode);
			}
			qo.setSkuCodeList(list);
		} else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {
			for (JSONObject obj : excelListSuccessData) {
				String barCode = obj.getString("barCode");
				list.add(barCode);
			}
			qo.setBarCodeList(list);
		}
		PageUtils<GoodsBranchPriceVo> page = null;
		Branches branch = branchesServiceApi.getBranchInfoById(branchId);// 机构类型(0.总部、1.分公司、2.物流中心、3.自营店、4.加盟店B、5.加盟店C)
		if (branch.getType() == 3 || branch.getType() == 4 || branch.getType() == 5) {
			page = goodsBranchPriceService.queryBranchGoods(qo);
		} else {
			page = goodsBranchPriceService.queryBranchCompanyGoods(qo);
		}
		// 已引入数据
		List<GoodsBranchPriceVo> existsList = page.getList();
		Map<String, GoodsBranchPriceVo> existsMap = new HashMap<String, GoodsBranchPriceVo>();
		for (GoodsBranchPriceVo goodsBranchPriceVo : existsList) {
			if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {
				existsMap.put(goodsBranchPriceVo.getSkuCode(), goodsBranchPriceVo);
			} else {
				existsMap.put(goodsBranchPriceVo.getBarCode(), goodsBranchPriceVo);
			}
		}
		// 处理异常
		for (JSONObject obj : excelListSuccessData) {
			if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {
				if (existsMap.containsKey(obj.getString("skuCode"))) {
					obj.element("error", "机构已存在!");
				}
			} else {
				if (existsMap.containsKey(obj.getString("barCode"))) {
					obj.element("error", "机构已存在!");
				}
			}
		}
	}

	/**
	 * @author zhangchm
	 * @date 2017年5月26日
	 */
	@RequestMapping(value = "downloadErrorFile")
	public void downloadErrorFile(String code, String type, HttpServletResponse response) {
		String reportFileName = "错误数据";
		String[] headers = null;
		String[] columns = null;
		if (type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)) {
			columns = new String[] { "skuCode" };
			headers = new String[] { "货号" };
		} else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {
			columns = new String[] { "barCode" };
			headers = new String[] { "条码" };
		}
		branchGoodsImportComponent.downloadErrorFile(code, reportFileName, headers, columns, response);
	}

	/**
	 * @Description: 商品引入导入模板
	 * @param response
	 * @param type
	 * @author zhangchm
	 * @date 2017年5月26日
	 */
	@RequestMapping(value = "exportTemp")
	public void exportTemp(HttpServletResponse response, Integer type) {
		LOG.debug("商品引入导入模板请求参数,type={}", type);
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
			if (StringUtils.isNotBlank(fileName) && StringUtils.isNotBlank(templateName)) {
				exportListForXLSX(response, null, fileName, templateName);
			}
		} catch (Exception e) {
			LOG.error("导出模板异常", e);
		}
	}

	/**
	 * @Description: 导出后缀名为“.xlsx”的Excel公用方法
	 * @param response	
	 * @param dataList	数据集合
	 * @param fileName	导出文件名称，不包括后缀名
	 * @param templateName	模板名称，包括后缀名
	 * @author zhangchm
	 * @date 2017年5月26日
	 */
	protected void exportListForXLSX(HttpServletResponse response, List<?> dataList, String fileName,
			String templateName) {
		ReportExcelUtil.exportListForXLSX(response, dataList, fileName, templateName);
	}
}
