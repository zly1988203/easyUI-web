/**
 *@Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 *@Project: okdeer-jxc-web
 *@Package: com.okdeer.jxc.controller.overdue
 *@Author: songwj
 *@Date: 2017年3月8日 上午10:38:53
 *注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.controller.overdue;

import java.io.IOException;
import java.io.InputStream;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.TypeReference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.PrintConstant;
import com.okdeer.jxc.common.controller.BasePrintController;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportComponent;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportHandle;
import com.okdeer.jxc.common.goodselect.GoodsSelectImportVo;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.print.JasperHelper;
import com.okdeer.jxc.form.overdue.dto.OverdueFormDto;
import com.okdeer.jxc.form.overdue.entity.OverdueForm;
import com.okdeer.jxc.form.overdue.service.OverdueFormDetailService;
import com.okdeer.jxc.form.overdue.service.OverdueFormService;
import com.okdeer.jxc.form.overdue.vo.OverdueFormDetailVo;
import com.okdeer.jxc.form.overdue.vo.OverdueFormImportVo;
import com.okdeer.jxc.form.overdue.vo.OverdueFormVo;
import com.okdeer.jxc.goods.entity.GoodsSelect;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

import net.sf.json.JSONObject;

/**
 * @ClassName: OverdueFormController
 * @Description: 临期商品订单控制器
 * @project okdeer-jxc-web
 * @author songwj
 * @date 2017年3月8日 上午10:38:53
 * =================================================================================================
 *     Task ID	         Date		  Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *     V2.3         	2017年3月8日	  songwj		                临期商品订单控制器
 */
@RestController
@RequestMapping("form/overdue")
public class OverdueFormController extends BasePrintController<OverdueForm, OverdueFormDto>{
    
    /**
     * Logger for this class
     */
    private static final Logger logger = LoggerFactory.getLogger(OverdueFormController.class);

    @Reference(version = "1.0.0", check = false)
    private OverdueFormService overdueFormService;
    
    @Reference(version = "1.0.0", check = false)
    private OverdueFormDetailService overdueFormDetailService;
    
    @Resource
    private GoodsSelectImportComponent goodsSelectImportComponent;
    
    /**
     * 
     * @Title: overdueList   
     * @Description: 商品调价申请查询列表  
     * @return      
     * @author: songwj 
     * @date 2017年3月9日 下午1:46:11
     */
    @RequestMapping(value = "/list")
    public ModelAndView overdueList() {
	return new ModelAndView("form/overdue/overdueList");
    }
    
    @RequestMapping(value = "/add")
    public ModelAndView add() {
	return new ModelAndView("form/overdue/overdueAdd");
    }
    
    /**
     * 
     * @Title: overdueApplyList   
     * @Description: 商品调价申请列表    
     * @return      
     * @author: songwj 
     * @date 2017年3月9日 下午1:46:46
     */
    @RequestMapping(value = "/apply/list")
    public ModelAndView overdueApplyList() {
	return new ModelAndView("form/overdue/overdueApplyList");
    }
    
    /**
     * 
     * @Title: overdueApprovedList   
     * @Description: 商品调价申请查询列表数据  
     * @param vo
     * @param pageNumber
     * @param pageSize
     * @return      
     * @author: songwj 
     * @date 2017年3月9日 下午1:47:20
     */
    @RequestMapping(value = "/approved/list")
    public PageUtils<OverdueFormDto> overdueApprovedList(OverdueFormVo vo,
	    @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
	    @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
	
	Optional<OverdueFormVo> optional = Optional.ofNullable(vo);
	vo = optional.orElse(new OverdueFormVo());
	vo.setPageNumber(pageNumber);
	vo.setPageSize(pageSize);
	vo.setEndTime(Date.from(vo.getEndTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().plusDays(1).atZone(ZoneId.systemDefault()).toInstant()));
	vo.setStatus(Byte.valueOf("1"));
	PageUtils<OverdueFormDto> suppliers;
	try {
	    suppliers = overdueFormService.selectApprovedList(vo);
	    return suppliers;
	} catch (Exception e) {
	   logger.error("加载临期商品审核列表失败！",e);
	}
	return null;
    }
    
    /**
     * 
     * @Title: overdueApplyList   
     * @Description: 商品调价申请列表数据  
     * @param vo
     * @param pageNumber
     * @param pageSize
     * @return      
     * @author: songwj 
     * @date 2017年3月9日 下午1:47:24
     */
    @RequestMapping(value = "/apply/list/data")
    public PageUtils<OverdueFormDto> overdueApplyList(OverdueFormVo vo,
	    @RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
	    @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
	
	Optional<OverdueFormVo> optional = Optional.ofNullable(vo);
	vo = optional.orElse(new OverdueFormVo());
	vo.setPageNumber(pageNumber);
	vo.setPageSize(pageSize);
	vo.setEndTime( Date.from(vo.getEndTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().plusDays(1).atZone(ZoneId.systemDefault()).toInstant()));
	PageUtils<OverdueFormDto> suppliers;
	try {
	    suppliers = overdueFormService.selectApprovedListData(vo);
	    return suppliers;
	} catch (Exception e) {
	   logger.error("加载临期商品审核列表失败！",e);
	}
	return null;
    }
    
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public RespJson delete(String formIds) {
	
	RespJson resp = new RespJson();
	
	if(StringUtils.isNotBlank(formIds)){
        	//SysUser user = UserUtil.getCurrentUser();
        	resp = overdueFormService.delete(StringUtils.split(formIds, ","));
	}
	
	return resp;
    }

    @RequestMapping(value = "/edit/{formId}", method = RequestMethod.GET)
    public ModelAndView edit(@PathVariable("formId") String formId){
	ModelAndView modelAndView = new ModelAndView();
	//modelAndView.addObject(attributeName, attributeValue)
	if(StringUtils.isNotBlank(formId)){
	    OverdueFormVo  vo = overdueFormService.getOverdueFormById(formId);
	    if(vo!=null){
        	    if(StringUtils.equalsIgnoreCase("1", vo.getStatus()+"")){
        		modelAndView.setViewName("form/overdue/overdueView");
        	    }else{
            	        modelAndView.setViewName("form/overdue/overdueEdit");
        	    }
        	    modelAndView.addObject("form", vo);
	    }else{
		modelAndView.setViewName("error/500");
		modelAndView.addObject("errorMsg","商品调价订单不存在！");
	    }
	}
	return modelAndView;
    }
    
    @RequestMapping(value = "/detail/list/{formId}")
    public PageUtils<OverdueFormDetailVo> detailList(@PathVariable("formId") String formId,@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
	    @RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize){
	if(StringUtils.isNotBlank(formId)){
	    OverdueFormDetailVo vo = new OverdueFormDetailVo();
	    vo.setFormId(formId);
	    vo.setPageNumber(pageNumber);
	    vo.setPageSize(pageSize);
	    try {
		PageUtils<OverdueFormDetailVo> list = overdueFormDetailService.selectDetailList(vo);
		return list;
	    } catch (Exception e) {
		logger.error("加载临期商品审核列表详情失败！",e);
	    }
	}
	return  null;
    }
    
    @RequestMapping(value = "/detail/update", method = RequestMethod.POST)
    public RespJson updateDetail(@RequestBody String jsonText) {
	if(StringUtils.isNotBlank(jsonText)){
        	Map<String,Object> mapType = JSON.parseObject(jsonText,new TypeReference<Map<String,Object>>(){}); 
        	if(mapType!=null && !mapType.isEmpty()){
                	String detailListStr = ((JSONArray)mapType.get("detailList")).toJSONString();
                	
                	List<Map<String,Object>> detailLists = JSON.parseObject(detailListStr,new TypeReference<List<Map<String,Object>>>(){});
                	if(CollectionUtils.isEmpty(detailLists)){
                	    return overdueFormDetailService.updateDetail(mapType.get("id").toString(),detailLists);
                	}
        	}else{
        	    return RespJson.error();
        	}
	}
	return RespJson.error();
    }
    
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public RespJson save(@RequestBody String jsonText) {
	if(StringUtils.isNotBlank(jsonText)){
	    Map<String,Object> mapType = JSON.parseObject(jsonText,new TypeReference<Map<String,Object>>(){}); 
	    if(mapType!=null && !mapType.isEmpty()){
    	    	String detailListStr = ((JSONArray)mapType.get("detailList")).toJSONString();
    	    	List<Map<String,Object>> detailLists = JSON.parseObject(detailListStr,new TypeReference<List<Map<String,Object>>>(){});
    	    	if(CollectionUtils.isEmpty(detailLists)){
    	    	    return overdueFormService.saveOverdue(mapType,detailLists);
    	    	}
	    }
	}
	return RespJson.error();
    }
    
    @RequestMapping(value = "/check", method = RequestMethod.POST)
    public RespJson check(String formId,Byte status,@RequestParam(value = "ids[]")String[] ids,@RequestParam(value = "auditDescs[]")String[] auditDescs){
	if(StringUtils.isNotBlank(formId)){
	    OverdueFormVo vo = new OverdueFormVo();
	    vo.setId(formId);
	    vo.setStatus(status);
	    vo.setUpdateTime(new Date());
	    vo.setValidUserId(UserUtil.getUser().getId());
	    vo.setValidUserName(UserUtil.getUser().getUserName());
	    vo.setValidTime(new Date());
	    vo.setUpdateTime(new Date());
	    vo.setUpdateUserId(UserUtil.getUser().getId());
	    vo.setUpdateUserName(UserUtil.getUser().getUserName());
	    overdueFormService.update(vo,ids,auditDescs);
	    return RespJson.success();
	}
	return RespJson.error();
    }
    
    @RequestMapping(value = "/commit", method = RequestMethod.POST)
    public RespJson commit(@RequestBody String jsonText){
	if(StringUtils.isNotBlank(jsonText)){
	    Map<String,Object> mapType = JSON.parseObject(jsonText,new TypeReference<Map<String,Object>>(){}); 
	    if(mapType!=null && !mapType.isEmpty()){
		String detailListStr = ((JSONArray)mapType.get("detailList")).toJSONString();
    	    	List<Map<String,Object>> detailLists = JSON.parseObject(detailListStr,new TypeReference<List<Map<String,Object>>>(){});
    	    	if(!detailLists.isEmpty()&&detailLists.size()>0){
    	    	    mapType.put("userId", UserUtil.getUser().getId());
    	    	    mapType.put("userName", UserUtil.getUser().getUserName());
    	    	    return overdueFormService.commitOverdue(mapType,detailLists);
    	    	}
	    }
	}
	return RespJson.error();
    }
    
    @RequestMapping(value = "/report/print", method = RequestMethod.GET)
    public String printReport( OverdueFormVo vo, HttpServletResponse response, HttpServletRequest request){
	Optional<OverdueFormVo> optional = Optional.ofNullable(vo);
	vo = optional.orElse(new OverdueFormVo());
	vo.setPageNumber(Integer.valueOf(PAGE_NO));
	vo.setPageSize(PrintConstant.PRINT_MAX_LIMIT);
	Date date = vo.getEndTime();
	// 默认当前机构
	if (StringUtils.isBlank(vo.getBranchCode()) && StringUtils.isBlank(vo.getBranchName())) {
	    vo.setBranchCode(getCurrBranchCompleCode());
	}
	vo.setEndTime( Date.from(vo.getEndTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().plusDays(1).atZone(ZoneId.systemDefault()).toInstant()));
	PageUtils<OverdueFormDto> suppliers;
	suppliers = overdueFormService.selectApprovedListData(vo);
	List<OverdueFormDto> list = suppliers.getList();
	
	if(list.size()>PrintConstant.PRINT_MAX_ROW){
		return "<script>alert('打印最大行数不能超过3000行');top.closeTab();</script>";
	}
	String path = PrintConstant.OVERDUE_APPLY_REPORT;
	Map<String, Object> map = new HashMap<String, Object>();
	map.put("startDate", DateUtils.formatDate(vo.getStartTime(), DateUtils.DATE_SMALL_STR_R) );
	map.put("endDate", DateUtils.formatDate(date, DateUtils.DATE_SMALL_STR_R));
	map.put("printName", getCurrentUser().getUserName());
	JasperHelper.exportmain(request, response, map, JasperHelper.PDF_TYPE, path, list, "");
	return null;
    }
    
    @RequestMapping(value = "/approved/report/print", method = RequestMethod.GET)
    public String approvedPrintReport( OverdueFormVo vo, HttpServletResponse response, HttpServletRequest request){
	Optional<OverdueFormVo> optional = Optional.ofNullable(vo);
	vo = optional.orElse(new OverdueFormVo());
	vo.setPageNumber(Integer.valueOf(PAGE_NO));
	vo.setPageSize(PrintConstant.PRINT_MAX_LIMIT);
	vo.setStatus(Byte.valueOf("1"));
	Date date = vo.getEndTime();
	// 默认当前机构
	if (StringUtils.isBlank(vo.getBranchCode()) && StringUtils.isBlank(vo.getBranchName())) {
	    vo.setBranchCode(getCurrBranchCompleCode());
	}
	vo.setEndTime( Date.from(vo.getEndTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().plusDays(1).atZone(ZoneId.systemDefault()).toInstant()));
	PageUtils<OverdueFormDto> suppliers;
	suppliers = overdueFormService.selectApprovedList(vo);
	List<OverdueFormDto> list = suppliers.getList();
	
	if(list.size()>PrintConstant.PRINT_MAX_ROW){
		return "<script>alert('打印最大行数不能超过3000行');top.closeTab();</script>";
	}
	String path = PrintConstant.OVERDUE_APPROVED_REPORT;
	Map<String, Object> map = new HashMap<String, Object>();
	map.put("startDate", DateUtils.formatDate(vo.getStartTime(), DateUtils.DATE_SMALL_STR_R) );
	map.put("endDate", DateUtils.formatDate(date, DateUtils.DATE_SMALL_STR_R));
	map.put("printName", getCurrentUser().getUserName());
	JasperHelper.exportmain(request, response, map, JasperHelper.PDF_TYPE, path, list, "");
	return null;
    }
    
    @RequestMapping(value = "/edit/report/print", method = RequestMethod.GET)
    public String editPrintReport( OverdueFormVo vo, HttpServletResponse response, HttpServletRequest request){
	Optional<OverdueFormVo> optional = Optional.ofNullable(vo);
	vo = optional.orElse(new OverdueFormVo());
	vo.setPageNumber(Integer.valueOf(PAGE_NO));
	vo.setPageSize(PrintConstant.PRINT_MAX_LIMIT);
	// 默认当前机构
	if (StringUtils.isBlank(vo.getBranchCode()) && StringUtils.isBlank(vo.getBranchName())) {
	    vo.setBranchCode(getCurrBranchCompleCode());
	}
	PageUtils<OverdueFormDto> suppliers;
	suppliers = overdueFormService.selectApprovedList(vo);
	List<OverdueFormDto> list = suppliers.getList();
	
	if(list.size()>PrintConstant.PRINT_MAX_ROW){
		return "<script>alert('打印最大行数不能超过3000行');top.closeTab();</script>";
	}
	String path = PrintConstant.OVERDUE_APPROVED_REPORT_DETAIL;
	Map<String, Object> map = new HashMap<String, Object>();
	map.put("endDate", DateUtils.formatDate(new Date(), DateUtils.DATE_SMALL_STR_R));
	map.put("printName", getCurrentUser().getUserName());
	JasperHelper.exportmain(request, response, map, JasperHelper.PDF_TYPE, path, list, "");
	return null;
    }
    
    @RequestMapping(value = "/exports")
    public RespJson export(OverdueFormVo vo,HttpServletResponse response) {
	try {
	    Optional<OverdueFormVo> optional = Optional.ofNullable(vo);
		vo = optional.orElse(new OverdueFormVo());
		vo.setPageNumber(Integer.valueOf(PAGE_NO));
		vo.setPageSize(PrintConstant.PRINT_MAX_LIMIT);
		vo.setDisabled(Byte.valueOf("0"));
		// 默认当前机构
		if (StringUtils.isBlank(vo.getBranchCode()) && StringUtils.isBlank(vo.getBranchName())) {
		    vo.setBranchCode(getCurrBranchCompleCode());
		}
		PageUtils<OverdueFormDto> suppliers;
		suppliers = overdueFormService.selectApprovedList(vo);
		List<OverdueFormDto> list = suppliers.getList();
		if(!list.isEmpty()&&list.size()>0){
    			String fileName = "调价订单详情" + "_" + DateUtils.getCurrSmallStr();
    			String templateName = ExportExcelConstant.OVERDUE_APPROVED_DETAIL;
    			exportListForXLSX(response, list, fileName, templateName);
		}else{
		    return RespJson.error("无数据可导");
		}
	} catch (Exception e) {
	    LOG.error("调价订单详情导出异常:", e);
	    RespJson json = RespJson.error("导出失败");
	    return json;
	}
	return null;
    }
    
    @RequestMapping(value = "/export/templ")
    public void exportTemp(HttpServletResponse response,String type) {
	try {
	    String fileName ;
	    String templateName;
	    if(StringUtils.equalsIgnoreCase(GoodsSelectImportHandle.TYPE_SKU_CODE, type)){
		fileName= "调价订单货号导入模板";
		templateName = ExportExcelConstant.OVERDUE_APPROVED_SKUCODE_TEMPLE;
	    }else{
		fileName= "调价订单条码导入模板";
		templateName = ExportExcelConstant.OVERDUE_APPROVED_BARCODE_TEMPLE;
	    }
	    exportListForXLSX(response, null, fileName, templateName);
	} catch (Exception e) {
	    LOG.error("查看调价订单导入模板异常", e);
	}
    }
    
    @RequestMapping(value = "/import/list")
    public RespJson exportList(@RequestParam("file") MultipartFile file, String type, String branchId) {
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
	    
	    String[] field;
	    if(StringUtils.equalsIgnoreCase(GoodsSelectImportHandle.TYPE_SKU_CODE, type)){
		field = new String[] { "skuCode", "applyNum"};
	    }else{
		field = new String[] { "barCode", "applyNum"};
	    }

	    GoodsSelectImportVo<GoodsSelect> vo = goodsSelectImportComponent.importSelectGoods(fileName, is, field,
		    new OverdueFormImportVo(), branchId, user.getId(), type, "/form/overdue/download/error",
		    new GoodsSelectImportBusinessValid() {

			@Override
			public void businessValid(List<JSONObject> excelListSuccessData, String[] excelField) {
			    for (JSONObject obj : excelListSuccessData) {
				try {
				    String realNum = obj.getString("applyNum");
				    Double.parseDouble(realNum);
				} catch (Exception e) {
				    obj.element("applyNum", 0);
				}

			    }
			}

			/**
			 * (non-Javadoc)
			 * 
			 * @see com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid#formatter(java.util.List)
			 */
			@Override
			public void formatter(List<? extends GoodsSelect> list, List<JSONObject> excelListSuccessData,
				List<JSONObject> excelListErrorData) {
			}

			/**
			 * (non-Javadoc)
			 * 
			 * @see com.okdeer.jxc.common.goodselect.GoodsSelectImportBusinessValid#errorDataFormatter(java.util.List)
			 */
			@Override
			public void errorDataFormatter(List<JSONObject> list) {
			    for (JSONObject json : list) {
				LOG.info(json.toString());
			    }
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
    
    @RequestMapping(value = "/download/error")
	public void downloadErrorFile(String code, String type, HttpServletResponse response) {
		String reportFileName = "错误数据";
		String[] headers;
		String[] columns;
		if(StringUtils.equalsIgnoreCase(GoodsSelectImportHandle.TYPE_SKU_CODE, type)){
			headers = new String[] { "货号", "数量"};
			columns =  new String[] { "skuCode", "applyNum"};
		}else{
		    	headers = new String[] { "条码", "数量"};
			columns =  new String[] { "barCode", "applyNum"};
		}
		goodsSelectImportComponent.downloadErrorFile(code, reportFileName, headers, columns, response);
	}
    
    @Override
    protected Map<String, Object> getPrintReplace(String formNo) {
	return null;
    }

    @Override
    protected List<OverdueFormDto> getPrintDetail(String formNo) {
	return null;
    }

}
