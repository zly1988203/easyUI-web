/** 
 *@Project: okdeer-jxc-web 
 *@Author: liux01
 *@Date: 2016年10月11日 
 *@Copyright: ©2014-2020 www.yschome.com Inc. All rights reserved. 
 */    
package com.okdeer.jxc.controller.stock;

import java.io.IOException;
import java.io.InputStream;
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

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportComponent;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportHandle;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportVo;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.goods.entity.GoodsSelect;
import com.okdeer.jxc.goods.entity.GoodsSelectByStockAdjust;
import com.okdeer.jxc.stock.service.StockAdjustServiceApi;
import com.okdeer.jxc.stock.vo.StockFormDetailVo;
import com.okdeer.jxc.stock.vo.StockFormVo;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

import net.sf.json.JSONObject;


/**
 * ClassName: StockAdjustController 
 * @Description: TODO
 * @author liux01
 * @date 2016年10月11日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    零售管理系统		    2016年10月11日		liux01				商品库存调整
 */
@Controller
@RequestMapping("/stock/adjust")
public class StockAdjustController extends BaseController<StockAdjustController> {

	@Reference(version = "1.0.0", check = false)
	private StockAdjustServiceApi stockAdjustServiceApi;
	@Autowired
	private GoodsSelectImportComponent goodsSelectImportComponent;

	/**
	 * 
	 * @Description: 获取库存调整列表页面
	 * @return
	 * @author liux01
	 * @date 2016年10月11日
	 */
	@RequestMapping(value = "/list")
	public String list(){
		return "/stockAdjust/list";
	}
	/**
	 * 
	 * @Description: 获取库存调整新增页面
	 * @return
	 * @author liux01
	 * @date 2016年10月11日
	 */
	@RequestMapping(value = "/add")
	public String add(){
		return "/stockAdjust/add";
	}
	/**
	 * 
	 * @Description: 获取库存调整编辑页面
	 * @return
	 * @author liux01
	 * @date 2016年10月11日
	 */
	@RequestMapping(value = "/edit" , method = RequestMethod.GET)
	public String edit(String id,HttpServletRequest request){
		StockFormVo stockFormVo = stockAdjustServiceApi.getStcokFormInfo(id);
		request.setAttribute("stockFormVo", stockFormVo);
		return "/stockAdjust/edit";
	}
	/**
	 * 
	 * @Description: 审核通过跳转页面
	 * @param id
	 * @param request
	 * @return
	 * @author liux01
	 * @date 2016年10月18日
	 */
	@RequestMapping(value = "/checkSuccess" , method = RequestMethod.GET)
	public String checkSuccess(String id,HttpServletRequest request){
		StockFormVo stockFormVo = stockAdjustServiceApi.getStcokFormInfo(id);
		request.setAttribute("stockFormVo", stockFormVo);
		return "/stockAdjust/check";
	}
	/**
	 * 
	 * @Description: 获取单据列表信息
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author liux01
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "getStockFormList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<StockFormVo> getStockFormList(
			StockFormVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.info(LogConstant.OUT_PARAM, vo.toString());
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setBranchId(UserUtil.getCurrBranchId());
			PageUtils<StockFormVo> stockFormList = stockAdjustServiceApi
					.getStockFormList(vo);
			LOG.info(LogConstant.PAGE, stockFormList.toString());
			return stockFormList;
		} catch (Exception e) {
			LOG.error("获取单据列表信息异常:{}", e);
		}
		return null;
	}
	/**
	 * 
	 * @Description: 保存库存调整单据
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author liux01
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "addStockForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson addStcokForm(StockFormVo vo) {
		RespJson resp;
		try {
			SysUser user = UserUtil.getCurrentUser();
			vo.setCreateUserId(user.getId());
			return stockAdjustServiceApi.addStockForm(vo);
		} catch (Exception e) {
			LOG.error("保存单据信息异常:{}", e);
			resp = RespJson.error("保存单据信息失败");
		}
		return resp;
		
	}
	/**
	 * 
	 * @Description: 更新信息
	 * @param vo
	 * @return
	 * @author liux01
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "updateStockForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson updateStockForm(StockFormVo vo) {
		RespJson resp;
		try {
			SysUser user = UserUtil.getCurrentUser();
			vo.setCreateUserId(user.getId());
			return stockAdjustServiceApi.updateStockForm(vo);
		} catch (Exception e) {
			LOG.error("更新单据信息异常:{}", e);
			resp = RespJson.error("更新单据信息失败");
		}
		return resp;
		
	}
	
	/**
	 * 
	 * @Description: 获取库存信息
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author liux01
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "getStockFormDetailList", method = RequestMethod.GET)
	@ResponseBody
	public List<StockFormDetailVo> getStockFormDetailList(String id) {
		LOG.info(LogConstant.OUT_PARAM, id);
		try {
			return stockAdjustServiceApi.getStcokFormDetailList(id);
		} catch (Exception e) {
			LOG.error("获取单据信息异常:{}", e);
		}
		return null;
	}
	/**
	 * 
	 * @Description: 删除单据信息
	 * @param id
	 * @return
	 * @author liux01
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "deleteStockFormList", method = RequestMethod.POST)
	@ResponseBody
	public String deleteStockFormList(List<String> ids){
		LOG.info(LogConstant.OUT_PARAM, ids);
		try {
			return stockAdjustServiceApi.deleteStockFormList(ids);
		} catch (Exception e) {
			LOG.error("删除单据信息异常:{}", e);
		}
		return null;
	}
	/**
	 * 
	 * @Description: 审核单据信息
	 * @param vo
	 * @return
	 * @author liux01
	 * @date 2016年10月14日
	 */
	@RequestMapping(value = "check", method = RequestMethod.POST)
	@ResponseBody
	public RespJson check(String id){
		RespJson resp;
		try {
			SysUser user = UserUtil.getCurrentUser();
			return stockAdjustServiceApi.check(id,user.getId());
		} catch (Exception e) {
			LOG.error("审核单据信息异常:{}", e);
			resp = RespJson.error(e.getMessage());
		}
		return resp;
	}
	/**
	 * 
	 * @Description: 删除库存调整信息
	 * @param id
	 * @return
	 * @author liux01
	 * @date 2016年10月14日
	 */
	@RequestMapping(value = "deleteStockAdjust", method = RequestMethod.POST)
	@ResponseBody
	public RespJson deleteStockAdjust(String id){
		RespJson resp;
		try {
			return stockAdjustServiceApi.deleteStockAdjust(id);
		} catch (Exception e) {
			LOG.error("删除单据信息异常:{}", e);
			resp = RespJson.error("删除单据信息失败");
		}
		return resp;
	}
	/**
	 * 
	 * @Description: 导出
	 * @param response
	 * @param qo
	 * @return
	 * @author liux01
	 * @date 2016年10月14日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public RespJson exportList(HttpServletResponse response, StockFormVo vo) {

		RespJson resp = RespJson.success();
		try {
			List<StockFormDetailVo> exportList = stockAdjustServiceApi.exportList(vo);

			String fileName = "库存调整" + "_" + DateUtils.getCurrSmallStr();

			String templateName = ExportExcelConstant.STOCKADJUST;

			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("导出库存调整商品异常：{}", e);
			resp = RespJson.error("导出库存调整商品异常");
		}
		return resp;
	}
	/**
	 * 
	 * @Description: 文件导入
	 * @param file 文件
	 * @param branchId  机构ID
	 * @param type 类型
	 * @return
	 * @author liux01
	 * @date 2016年10月15日
	 */
	@RequestMapping(value = "importList")
	@ResponseBody
	public RespJson importList(@RequestParam("file") MultipartFile file, String branchId,String type){
		RespJson respJson = RespJson.success();
		try {
			if(file.isEmpty()){
				return RespJson.error("文件为空");
			}
			InputStream is = file.getInputStream();
			// 获取文件名
			String fileName = file.getOriginalFilename();
			SysUser user = UserUtil.getCurrentUser();
			String[] field = null; 
			if(type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)){//货号
				field = new String[]{"skuCode","realNum"};
			}else if(type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)){//条码
				field = new String[]{"barCode","realNum"};
			}
			
			GoodsSelectImportVo<GoodsSelectByStockAdjust> vo = goodsSelectImportComponent.importSelectGoodsWithStock(fileName, is, field, new GoodsSelectByStockAdjust(), branchId,user.getId(), type,"/stock/adjust/downloadErrorFile", new GoodsSelectImportBusinessValid() {
				
				@Override
				public void businessValid(List<JSONObject> list, String[] excelField) {
					for (JSONObject obj : list) {
						String realNum = obj.getString("realNum");
						try {
							Double.parseDouble(realNum);
						} catch (Exception e) {
							obj.element("error", "数量必填");
						}
						
					}
				}
				/**
				 * (non-Javadoc)
				 * @see com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid#formatter(java.util.List)
				 */
				@Override
				public void formatter(List<? extends GoodsSelect> list) {
					
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
		
		if(type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)){//货号
			columns = new String[]{"skuCode","realNum"};
			headers = new String[]{"货号","数量"};
		}else if(type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)){//条码
			columns = new String[]{"barCode","realNum"};
			headers = new String[]{"条码","数量"};
		}

		goodsSelectImportComponent.downloadErrorFile(code, reportFileName, headers, columns , response);
	}
	/**
	 * 
	 * @Description: 导入模板下载
	 * @param response
	 * @param type
	 * @author liux01
	 * @date 2016年10月15日
	 */
	@RequestMapping(value = "exportTemp")
	public void exportTemp(HttpServletResponse response, String type) {
		try {
			// 导出文件名称，不包括后缀名
			String fileName = null;
			String templateName = null;
			if(type.equals(GoodsSelectImportHandle.TYPE_SKU_CODE)){
				fileName = "库存调整货号导入模板";
				templateName = ExportExcelConstant.STOCK_ADJUST_SKU_TEMPLE;
			}else if(type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)){
				templateName = ExportExcelConstant.STOCK_ADJUST_BAR_TEMPLE;
				fileName = "商品条码条码导入模板";
			}
			// 导出Excel
			exportListForXLSX(response, null, fileName, templateName);
		} catch (Exception e) {
			LOG.error("库存调整导入失败:{}", e);
		}
	}
	
}
