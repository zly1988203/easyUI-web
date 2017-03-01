/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhangchm
 *@Date: 2016年7月20日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.goods;

import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.commons.collections.CollectionUtils;
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
import com.okdeer.jxc.goods.entity.GoodsCategory;
import com.okdeer.jxc.goods.qo.GoodsCategoryQo;
import com.okdeer.jxc.goods.service.GoodsCategoryServiceApi;

/**
 * ClassName: SupplierAreaController 
 * @Description: 类别Controller
 * @author zhangchm
 * @date 2016年7月20日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *    进销存2.0.0		   2016年7月20日                  zhangchm            创建类别Controller， 查询公共选择类别、类别树结构、类别
 */

@Controller
@RequestMapping("common/category")
public class GoodsCategoryController extends
		BaseController<GoodsCategoryController> {

	@Reference(version = "1.0.0", check = false)
	private GoodsCategoryServiceApi goodsCategoryService;

	/**
	 * @Description: 公共选择类别
	 * @return   
	 * @author zhangchm
	 * @date 2016年7月21日
	 */
	@RequestMapping(value = "views")
	public String views() {
		return "component/publicCategory";
	}

	/**
	 * @Description 类别树结构
	 * @param vo
	 * @param response
	 * @return   
	 * @author zhangchm
	 * @date 2016年7月20日
	 */
	@RequestMapping(value = "getGoodsCategoryToTree")
	@ResponseBody
	public String getGoodsCategoryToTree(GoodsCategoryQo vo) {
		try {
			LOG.info("类别树结构参数:" + vo.toString());
			String categoryTree = goodsCategoryService
					.queryGoodsCategoryToTree(vo);
			LOG.info("categoryTree:" + categoryTree);
			return categoryTree;
		} catch (Exception e) {
			LOG.error("查询类别树结构异常:", e);
		}
		return null;
	}

	/**
	 * @Description 查询类别
	 * @param vo
	 * @param response
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @author zhangchm
	 * @date 2016年7月20日
	 */
	@RequestMapping(value = "getComponentList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsCategory> getComponentList(
			GoodsCategoryQo vo,String categoryType,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			//判断类别类型1.goodsTotal 商品汇总 2.categoryTotal 类别汇总
			if("goodsTotal".equals(categoryType)) {
				vo.setCategoryLevel("3");
			}
			if("categoryTotal".equals(categoryType)) {
				vo.setCategoryLevel("1");
			}
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			PageUtils<GoodsCategory> suppliers = goodsCategoryService.queryLists(vo);
			return suppliers;
		} catch (Exception e) {
			LOG.error("查询类别异常:", e);
		}
		return null;
	}
	
	/**********************************商品类别管理start add by zhongy*************************************/
	
	/**
	 * @Description: 跳转到商品类别管理
	 * @return   
	 * @author zhongy
	 * @date 2017年02月10日
	 */
	@RequestMapping(value = "goCategroyList")
	public String goCategroyList() {
		return "categoryManager/categoryList";
	}
	
	/**
	 * @Description 根据上级类别Id查询子级类别列表
	 * @param qo
	 * @param response
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @author zhongy
	 * @date 2017年02月10日
	 */
	@RequestMapping(value = "queryChildrenCategryList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GoodsCategory> queryChildrenCategryList(
			GoodsCategoryQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			LOG.info("查询类别参数:qo={}",qo);
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			if(StringUtils.isNotBlank(qo.getCategoryNameOrCode())){
				qo.setCategoryNameOrCode(qo.getCategoryNameOrCode().trim());
			}else{
				qo.setCategoryNameOrCode("");
			}
			PageUtils<GoodsCategory> goodsCategorys = goodsCategoryService.queryLists(qo);
			return goodsCategorys;
		} catch (Exception e) {
			LOG.error("查询类别异常:", e);
		}
		return null;
	}
	
	/**
	 * @Description: 进入新增类别页面
	 * @return   
	 * @author zhongy
	 * @date 2017年02月13日
	 */
	@RequestMapping(value = "goAdd")
	public String goAdd(Model model,GoodsCategory goodsCategory) {
		String parentCategoryId = goodsCategory.getParentCategoryId();
		//1、类别parentCategoryId等于0，表示新增一级分类
		if(Constant.ZERO_STR.equals(parentCategoryId)){
			goodsCategory.setCategoryName("[0]所有");
			goodsCategory.setCategoryLevel(String.valueOf(Constant.ONE));
		}else{
			GoodsCategory category = goodsCategoryService.queryGoodsCategoryById(parentCategoryId);
			goodsCategory.setCategoryName("["+category.getCategoryCode()+"]"+category.getCategoryName());
			goodsCategory.setCategoryLevel(String.valueOf((Integer.valueOf(category.getCategoryLevel())+1)));
		}
		model.addAttribute("goodsCategory", goodsCategory);
		return "categoryManager/addCategory";
	}
	
	/**
	 * @Description: 新增类别信息
	 * @param goodsCategory
	 * @param validate
	 * @return
	 * @author zhongy
	 * @date 2017年02月13日
	 */
	@RequestMapping(value = "/saveCategory", method = RequestMethod.POST)
	@ResponseBody
	public RespJson saveCategory(@Valid GoodsCategory goodsCategory, BindingResult validate) {
		//1 校验是否必填
		if (validate.hasErrors()) {
			String errorMessage = validate.getFieldError().getDefaultMessage();
			LOG.warn("validate errorMessage:{}", errorMessage);
			return RespJson.error(errorMessage);
		}
		
		//2 获取分类编号= 父级分类编号+子级分类最大编号
		if(StringUtils.isBlank(goodsCategory.getCategoryCode())){
			StringBuffer categoryCode = new StringBuffer();
			String parentCategoryId = goodsCategory.getParentCategoryId();
			String categoryLevel = goodsCategory.getCategoryLevel();
			GoodsCategory category = goodsCategoryService.queryGoodsCategoryById(parentCategoryId);
			String rightCode = goodsCategoryService.getMaxCategoryCode(parentCategoryId,categoryLevel);
			if(String.valueOf(Constant.ONE).equals(categoryLevel)){
				categoryCode.append(rightCode);
			}else{
				categoryCode.append(category.getCategoryCode()).append(rightCode);
			}
			goodsCategory.setCategoryCode(categoryCode.toString());
		}else{
			goodsCategory.setCategoryCode(goodsCategory.getCategoryCode().trim());
		}
		
		//3 校验唯一性
		goodsCategory.setCategoryName(goodsCategory.getCategoryName().trim());
		Integer nameCount = goodsCategoryService.queryCategoryNameCount(goodsCategory);
		if(nameCount>0) {
			return RespJson.error("类别名称重复");
		}
		
		Integer codeCount = goodsCategoryService.queryCategoryCodeCount(goodsCategory);
		if(codeCount>0) {
			return RespJson.error("类别编码重复");
		}
		
		//4 保存
		RespJson respJson = RespJson.success();
		try {
			goodsCategory.setCreateUserId(super.getCurrUserId());
			goodsCategoryService.insert(goodsCategory);
		} catch (Exception e) {
			LOG.error("新增类别异常：", e);
			respJson = RespJson.error("新增类别异常!");
		}
		return respJson;
	}
	
	
	/**
	 * @Description: 到修改页面
	 * @return
	 * @author zhongy
	 * @date 2017年02月10日
	 */
	@RequestMapping(value = "goEdit")
	public String goEdit(Model model, String id) {
		LOG.debug("跳转修改类别信息参数：id={}", id);
		GoodsCategory goodsCategory = goodsCategoryService.queryGoodsCategoryById(id);
		model.addAttribute("goodsCategory", goodsCategory);
		return "categoryManager/updateCategroy";
	}
	
	/**
	 * @Description: 修改商品类别
	 * @param goodsBrand
	 * @param validate
	 * @return
	 * @author zhongy
	 * @date 2017年02月09日
	 */
	@RequestMapping(value = "/updateCategory", method = RequestMethod.POST)
	@ResponseBody
	public RespJson updateBrand(@Valid GoodsCategory goodsCategory, BindingResult validate) {
		//1 校验是否必填
		if (validate.hasErrors()) {
			String errorMessage = validate.getFieldError().getDefaultMessage();
			LOG.warn("validate errorMessage:{}", errorMessage);
			return RespJson.error(errorMessage);
		}
		//2 校验唯一性
		if(StringUtils.isNotBlank(goodsCategory.getCategoryName())){
			goodsCategory.setCategoryName(goodsCategory.getCategoryName().trim());
		}
		Integer nameCount = goodsCategoryService.queryCategoryNameCount(goodsCategory);
		if(nameCount>0) {
			return RespJson.error("类别名称重复");
		}
		
		//3 保存
		RespJson respJson = RespJson.success();
		try {
			goodsCategoryService.updateByPrimaryKey(goodsCategory);
		} catch (Exception e) {
			LOG.error("修改类别异常：", e);
			respJson = RespJson.error("修改类别异常!");
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
	@RequestMapping(value = "deleteCategroy", method = RequestMethod.POST)
	@ResponseBody
	public RespJson deleteCategroy(String ids) {
		RespJson resp = RespJson.success();
		try {
		if (StringUtils.isNotBlank(ids)) {
		   //1 校验类别是否存在子级
		   String childrenMsg = checkCategoryIsChildren(ids);
           if(StringUtils.isNotBlank(childrenMsg)){
        	    resp = RespJson.error("类别名称：【"+childrenMsg+"】存在子级类别，不能删除!");
				return resp;
			}
           //2 校验类别在商品中是否已使用
           String applyMsg = checkCategoryIsApply(ids);
           if(StringUtils.isNotBlank(applyMsg)){
       	        resp = RespJson.error("类别名称：【"+applyMsg+"】在商品中已使用，不能删除!");
				return resp;
			}
			//3  删除类别
            String[] arr = ids.split(",");
			List<String> categoryIds = Arrays.asList(arr);
			if(CollectionUtils.isNotEmpty(categoryIds)) {
				goodsCategoryService.deleteByIds(categoryIds);
			}
		    }
		} catch (ServiceException e) {
			LOG.error("删除类别异常：", e);
			resp = RespJson.error("删除类别异常!");
		}
		return resp;
	}
	
	
	//校验类别是否存在子级
	private String checkCategoryIsChildren(String ids){
		String[] arr = ids.split(",");
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < arr.length; i++) {
			//1 校验类别是否存在子级，有子级不能删除
			Integer isChildren = goodsCategoryService.checkCategoryIsChildren(arr[i]);
			if(isChildren>0){
				GoodsCategory goodsCategory = goodsCategoryService.queryGoodsCategoryById(arr[i]);
				sb.append(goodsCategory.getCategoryName());
				break;
			}
		  }
		return sb.toString();
	}
	
	//校验类别在商品中是否已使用
	private String checkCategoryIsApply(String ids){
		String[] arr = ids.split(",");
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < arr.length; i++) {
			//1 校验类别是否存在子级，有子级不能删除
			Integer count = goodsCategoryService.checkCategoryIsApply(arr[i]);
			if(count>0){
				GoodsCategory goodsCategory = goodsCategoryService.queryGoodsCategoryById(arr[i]);
				sb.append(goodsCategory.getCategoryName());
				break;
			}
		  }
		return sb.toString();
	}
	
	/**
	 * @Description: 商品类别导出
	 * @param request
	 * @param response
	 * @param vo
	 * @author zhongy
	 * @date 2017年02月13日
	 */
	@RequestMapping(value = "/exportList", method = RequestMethod.POST)
	@ResponseBody
	public String exportList(GoodsCategoryQo qo, HttpServletResponse response) {
		LOG.info("商品类别查询，报表导出参数：{}", qo);
		try {
			if(StringUtils.isNotBlank(qo.getCategoryNameOrCode())){
				qo.setCategoryNameOrCode(qo.getCategoryNameOrCode().trim());
			}else{
				qo.setCategoryNameOrCode("");
			}
			List<GoodsCategory> exportList = goodsCategoryService.queryExportCategory(qo);
			String fileName = "类别导出" + "_" + DateUtils.getCurrSmallStr();
			String templateName = ExportExcelConstant.GOODS_CATEGORY_REPORT;
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("商品类别报表导出异常:", e);
		}
		return null;
	}
	
	/**********************************商品类别管理end add by zhongy*************************************/
}
