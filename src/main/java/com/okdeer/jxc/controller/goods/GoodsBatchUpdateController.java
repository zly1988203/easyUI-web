package com.okdeer.jxc.controller.goods;  

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportComponent;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportHandle;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportVo;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.goods.entity.GoodsSelect;
import com.okdeer.jxc.goods.service.GoodsBatchUpdateServiceApi;
import com.okdeer.jxc.goods.vo.GoodsBatchUpdateImportVo;
import com.okdeer.jxc.goods.vo.GoodsBatchUpdateVo;
import com.okdeer.jxc.report.qo.GoodsReportQo;
import com.okdeer.jxc.report.service.GoodsReportService;
import com.okdeer.jxc.report.vo.GoodsReportVo;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

/**
 * 
 * ClassName: GoodsBatchUpdateController 
 * @Description: 商品批量修改
 * @author zhangq
 * @date 2017年4月1日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("goods/batchUpdate")
public class GoodsBatchUpdateController extends BaseController<GoodsBatchUpdateController> {

	@Autowired
	private GoodsSelectImportComponent goodsSelectImportComponent; 
	
	@Reference(version = "1.0.0", check = false)
	private GoodsBatchUpdateServiceApi goodsBatchUpdateServiceApi;
	
	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesServiceApi;
	
	@Reference(version = "1.0.0", check = false)
	private GoodsReportService goodsReportService;
	
	/**
	 * 
	 * @Description: 跳转到商品属性批量修改页
	 * @return String  
	 * @author zhangq
	 * @date 2017年4月1日
	 */
	@RequestMapping(value = "/index")
	private String toBatchUpdatePage(){
		return "/goods/goodsBatchUpdate";
	}
	
	/**
	 * 
	 * @Description: 导入条码或货号
	 * @param file
	 * @param type
	 * @param branchId
	 * @return RespJson  
	 * @author zhangq
	 * @date 2017年4月1日
	 */
	@RequestMapping(value = "import")
	@ResponseBody
	public RespJson importList(@RequestParam("file") MultipartFile file, String type, String branchId) {
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
				fields = new String[] { "skuCode"};
			} else if (type.equals(GoodsSelectImportHandle.TYPE_BAR_CODE)) {
				fields = new String[] { "barCode"};
			}
			
			//错误下载地址
			String errorFileDownloadUrlPrefix = "/goods/batchUpdate/download/downloadErrorFile";
			
			GoodsSelectImportVo<GoodsSelect> vo = goodsSelectImportComponent.importSelectGoods(fileName, is, fields,
				new GoodsBatchUpdateImportVo(), branchId, user.getId(), type, errorFileDownloadUrlPrefix,
				new GoodsSelectImportBusinessValid() {
					@Override
					public void businessValid(List<JSONObject> excelListSuccessData, String[] excelField) {
						
					}

					@Override
					public void formatter(List<? extends GoodsSelect> list, List<JSONObject> excelListSuccessData,
							List<JSONObject> excelListErrorData) {
					}

					@Override
					public void errorDataFormatter(List<JSONObject> list) {
						
					}
				}, null);
			
			//barcode 列表
			List<String> barCodeList= new ArrayList<String>();
			List<GoodsSelect> list = vo.getList();
			for (GoodsSelect goodsSelect : list) {
				barCodeList.add(goodsSelect.getBarCode());
			}
			
			//导入列表
			GoodsReportQo qo = new GoodsReportQo();
			qo.setBranchId(branchId);
			qo.setBarCodeList(barCodeList);
			List<GoodsReportVo> importList = goodsReportService.queryList(qo);
			
			
			Map<String,Object> newVo = new HashMap<String,Object>();
			newVo.put("list",importList);
			newVo.put("message",vo.getMessage());
			newVo.put("errorFileUrl",vo.getErrorFileUrl());
			respJson.put("importInfo", newVo);

		} catch (IOException e) {
			respJson = RespJson.error("读取Excel流异常");
			LOG.error("读取Excel流异常:", e);
		} catch (Exception e) {
			respJson = RespJson.error("导入发生异常");
			LOG.error("导入发生异常:", e);
		}
		return respJson;
	}
	
	/**
	 * 
	 * @Description: 导入模版下载
	 * @param response
	 * @return void  
	 * @author zhangq
	 * @date 2017年4月5日
	 */
    @RequestMapping(value = "/importTemplate")
    public void exportTemp(HttpServletResponse response,String type) {
		try {
			String fileName;
			String templateName;
			if (StringUtils.equalsIgnoreCase(GoodsSelectImportHandle.TYPE_SKU_CODE, type)) {
				fileName = "货号导入模板";
				templateName = ExportExcelConstant.SKUCODE_TEMPLE_TYPE;
			} else {
				fileName = "条码导入模板";
				templateName = ExportExcelConstant.BARCODE_TEMPLE_TYPE;
			}
			exportListForXLSX(response, null, fileName, templateName);
		} catch (Exception e) {
			LOG.error("查看调价订单导入模板异常", e);
		}
	}
    
    /**
     * 
     * @Description: 下载错误信息
     * @param code
     * @param type
     * @param response   
     * @return void  
     * @author zhangq
     * @date 2017年4月5日
     */
	@RequestMapping(value = "/download/downloadErrorFile")
	public void downloadErrorFile(String code, String type, HttpServletResponse response) {
		String reportFileName = "错误数据";
		String[] headers;
		String[] columns;
		if (StringUtils.equalsIgnoreCase(GoodsSelectImportHandle.TYPE_SKU_CODE, type)) {
			headers = new String[] { "货号", "数量" };
			columns = new String[] { "skuCode", "applyNum" };
		} else {
			headers = new String[] { "条码", "数量" };
			columns = new String[] { "barCode", "applyNum" };
		}
		goodsSelectImportComponent.downloadErrorFile(code, reportFileName, headers, columns, response);
	}
   
	
	/**
	 * 
	 * @Description: 批量更新
	 * @param jsonText 
	 * @return RespJson  
	 * @author zhangq
	 * @date 2017年4月1日
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public RespJson save(@RequestBody String jsonText) {
		//解析页面参数
		GoodsBatchUpdateVo vo = JSON.parseObject(jsonText,new TypeReference<GoodsBatchUpdateVo>(){});
		
		//验证数据合法性
		RespJson resp = validSave(vo);
		if(!resp.isSuccess()){
			return resp;
		}
		
		//其他参数
		vo.setUpdateUserId(UserUtil.getCurrUserId());
		vo.setUpdateTime(DateUtils.getCurrDate());
		
		return goodsBatchUpdateServiceApi.batchUpdate(vo);
	}
	
	/**
	 * 
	 * @Description: 批量更新验证
	 * @param vo
	 * @return RespJson  
	 * @author zhangq
	 * @date 2017年4月4日
	 */
	private RespJson validSave(GoodsBatchUpdateVo vo){
		//机构类型(0.总部、1.分公司、2.物流中心、3.自营店、4.加盟店B、5.加盟店C) 
		Branches branch = branchesServiceApi.getBranchInfoById(vo.getBranchId());
		
		//总部仅可修改：是否管理库存、是否高值商品、是否关注商品、修改商品类别、修改商品品牌
		if(branch.getType() == 0 && !(vo.isManagerStockChecked() || vo.isHighValueChecked() || vo.isAttentionChecked() || vo.isCategoryChecked() || vo.isBrandChecked())){
			return RespJson.error("是否管理库存、是否高值商品、是否关注商品、修改商品类别、修改商品品牌,请至少勾选一项。");
		}
		
		//分公司仅可修改：是否参与促销、是否直送商品、分店调价、安全库存系数、修改主供应商
		if(branch.getType() == 1 && !(vo.isAllowActivityChecked() || vo.isFastDeliverChecked() || vo.isSafetyCoefficientChecked() || vo.isSupplierChecked())){
			return RespJson.error("是否参与促销、是否直送商品、分店调价、安全库存系数、修改主供应商,请至少勾选一项。");
		}
		
		//门店仅可修改：安全库存系数、修改主供应商
		if((branch.getType() == 3 || branch.getType() == 4 || branch.getType() == 5)
			&&!(vo.isSafetyCoefficientChecked() || vo.isSupplierChecked())){
			return RespJson.error("安全库存系数、修改主供应商,请至少勾选一项。");
		}
		
		return RespJson.success();
	}

}