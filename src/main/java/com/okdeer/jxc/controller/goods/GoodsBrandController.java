/** 
 *@Project: okdeer-jxc-web 
 *@Author: taomm
 *@Date: 2016年8月15日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.goods;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.base.common.exception.ServiceException;
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.goods.entity.GoodsBrand;
import com.okdeer.jxc.goods.service.GoodsBrandServiceApi;
import com.okdeer.jxc.goods.vo.GoodsBrandVo;

/**
 * ClassName: GoodsBrandController 
 * @Description: TODO
 * @author taomm
 * @date 2016年8月15日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("common/brand")
public class GoodsBrandController extends BaseController<GoodsBrandController> {

	@Reference(version = "1.0.0", check = false)
	private GoodsBrandServiceApi goodsBrandService;

	/**
	 * 
	 * @Description: 获取品牌树
	 * @return
	 * @author taomm
	 * @date 2016年8月15日
	 */
	@RequestMapping(value = "getBrandToTree")
	@ResponseBody
	public String getBrandToTree() {
		try {
			String brandTree = goodsBrandService.queryBrandToTree();
			LOG.info("brandTree:" + brandTree);
			return brandTree;
		} catch (Exception e) {
			LOG.error("查询品牌树结构异常:", e);
		}
		return null;
	}

	/**
	 * @Description: 公共选择品牌
	 * @return   
	 * @author zhangchm
	 * @date 2016年8月16日
	 */
	@RequestMapping(value = "views")
	public String views() {
		return "component/publicBrand";
	}

	/**
	 * @Description 查询品牌
	 * @param vo
	 * @param response
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @author zhangchm
	 * @date 2016年8月16日
	 */
	@RequestMapping(value = "getComponentList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsBrand> getComponentList(
			GoodsBrandVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			LOG.info("查询品牌参数:{}", vo.toString());
			PageUtils<GoodsBrand> goodsBrand = goodsBrandService.queryLists(vo);
			LOG.info("page:" + goodsBrand.toString());
			return goodsBrand;
		} catch (Exception e) {
			LOG.error("查询查询品牌异常:", e);
		}
		return null;
	}
	
	
	/****************************************品牌管理start*******************************************/
	
	/**
	 * @Description: 进入品牌管理页面
	 * @return   
	 * @author zhongy
	 * @date 2017年02月08日
	 */
	@RequestMapping(value = "goBrandManager")
	public String goBrandManager() {
		return "brandManager/brandList";
	}
	
	/**
	 * @Description 查询品牌
	 * @param vo
	 * @param response
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @author zhongy
	 * @date 2017年02月08日
	 */
	@RequestMapping(value = "queryBrandList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsBrand> queryBrandList(
			GoodsBrandVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			LOG.info("查询品牌参数:{}", vo.toString());
			PageUtils<GoodsBrand> goodsBrand = goodsBrandService.queryLists(vo);
			LOG.info("page:" + goodsBrand.toString());
			return goodsBrand;
		} catch (Exception e) {
			LOG.error("查询查询品牌异常:", e);
		}
		return null;
	}
	
	/**
	 * @Description: 进入品牌管理页面
	 * @return   
	 * @author zhongy
	 * @date 2017年02月08日
	 */
	@RequestMapping(value = "goAdd")
	public String goAdd() {
		return "brandManager/addBrand";
	}
	
	/**
	 * @Description: 新增品牌信息
	 * @param goodsBrand
	 * @param validate
	 * @return
	 * @author zhongy
	 * @date 2017年02月09日
	 */
	@RequestMapping(value = "/saveBrand", method = RequestMethod.POST)
	@ResponseBody
	public RespJson saveBrand(@Valid GoodsBrand goodsBrand, BindingResult validate) {
		//1 校验是否必填
		if (validate.hasErrors()) {
			String errorMessage = validate.getFieldError().getDefaultMessage();
			LOG.warn("validate errorMessage:{}", errorMessage);
			return RespJson.error(errorMessage);
		}
		
		//2 获取品牌编号
		String brandCode = goodsBrandService.getBrandCode(String.valueOf(Constant.FOUR));
		goodsBrand.setBrandCode(brandCode);
		
		//3 校验唯一性
		Integer count = goodsBrandService.checkGoodsBrand(goodsBrand);
		if(count>0) {
			return RespJson.error("品牌名称重复");
		}
		//4 保存
		RespJson respJson = RespJson.success();
		try {
			goodsBrand.setCreateUserId(super.getCurrUserId());
			goodsBrand.setBrandName(goodsBrand.getBrandName().trim());
			goodsBrandService.insert(goodsBrand);
		} catch (Exception e) {
			LOG.error("新增品牌异常：", e);
			respJson = RespJson.error("新增品牌异常!");
		}
		return respJson;
	}
	
	/**
	 * @Description: 到修改页面
	 * @return
	 * @author zhongy
	 * @date 2017年02月09日
	 */
	@RequestMapping(value = "goEdit")
	public String goEdit(Model model, String id) {
		LOG.debug("跳转修改品牌信息参数：id={}", id);
		GoodsBrand goodsBrand = goodsBrandService.queryById(id);
		model.addAttribute("goodsBrand", goodsBrand);
		return "brandManager/updateBrand";
	}
	
	/**
	 * @Description: 修改商品品牌
	 * @param goodsBrand
	 * @param validate
	 * @return
	 * @author zhongy
	 * @date 2017年02月09日
	 */
	@RequestMapping(value = "/updateBrand", method = RequestMethod.POST)
	@ResponseBody
	public RespJson updateBrand(@Valid GoodsBrand goodsBrand, BindingResult validate) {
		//1 校验是否必填
		if (validate.hasErrors()) {
			String errorMessage = validate.getFieldError().getDefaultMessage();
			LOG.warn("validate errorMessage:{}", errorMessage);
			return RespJson.error(errorMessage);
		}
		//2 校验唯一性
		Integer count = goodsBrandService.checkGoodsBrand(goodsBrand);
		if(count>0) {
			return RespJson.error("品牌名称重复");
		}
		//3 保存
		RespJson respJson = RespJson.success();
		try {
			goodsBrand.setUpdateUserId(super.getCurrUserId());
			goodsBrand.setBrandName(goodsBrand.getBrandName().trim());
			goodsBrandService.updateGoodsBrand(goodsBrand);
		} catch (Exception e) {
			LOG.error("修改品牌异常：", e);
			respJson = RespJson.error("修改品牌异常!");
		}
		return respJson;
	}
	
	/**
	 * 删除
	 * @param ids
	 * @return
	 * @author zhongy
	 * @date 2017年02月10日
	 */
	@RequestMapping(value = "deleteBrand", method = RequestMethod.POST)
	@ResponseBody
	public RespJson delete(String ids) {
		RespJson resp = RespJson.success();
		try {
		if (StringUtils.isNotBlank(ids)) {
			String[] arr = ids.split(",");
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < arr.length; i++) {
				//1 校验品牌是否已使用，已使用不能删除
				Integer count = goodsBrandService.checkBrandIsApply(arr[i]);
				if(count>0){
					GoodsBrand goodsBrand = goodsBrandService.queryById(arr[i]);
					sb.append(goodsBrand.getBrandName()+",");
				}
			  }
			
			if(StringUtils.isNotBlank(sb)){
				resp = RespJson.error("品牌名称：【"+sb.substring(0, sb.length()-1)+"】在商品中已使用，不能删除!");
				return resp;
			}
			
			//2 删除品牌
			List<String> brandIds = Arrays.asList(arr);
			goodsBrandService.deleteByIds(brandIds);
		    }
		} catch (ServiceException e) {
			LOG.error("删除品牌异常：", e);
			resp = RespJson.error("删除品牌异常!");
		}
		return resp;
	}
	
	/**
	 * 
	 * @Description: 报表导出
	 * @param request
	 * @param response
	 * @param vo
	 * @author zhongy
	 * @date 2017年02月09日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public String exportList(GoodsBrandVo vo, HttpServletResponse response) {

		LOG.info("商品品牌查询，报表导出参数：{}", vo);
		try {
			// 1、列表查询
			List<GoodsBrand> exportList = goodsBrandService.queryReportLists(vo);
			String fileName = "商品品牌报表" + "_" + DateUtils.getCurrSmallStr();
			String templateName = ExportExcelConstant.GOODS_BRAND_REPORT;
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("商品品牌报表导出异常:", e);
		}
		return null;
	}
	
	/****************************************品牌管理end*******************************************/
}
