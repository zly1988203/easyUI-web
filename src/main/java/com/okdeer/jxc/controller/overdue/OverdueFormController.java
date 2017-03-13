/**
 *@Copyright: Copyright ©2005-2020 http://www.okdeer.com/ Inc. All rights reserved
 *@Project: okdeer-jxc-web
 *@Package: com.okdeer.jxc.controller.overdue
 *@Author: songwj
 *@Date: 2017年3月8日 上午10:38:53
 *注意：本内容仅限于友门鹿公司内部传阅，禁止外泄以及用于其他的商业目的
 */
package com.okdeer.jxc.controller.overdue;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.TypeReference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.PrintConstant;
import com.okdeer.jxc.common.controller.BasePrintController;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.OrderNoUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.print.JasperHelper;
import com.okdeer.jxc.form.overdue.dto.OverdueFormDto;
import com.okdeer.jxc.form.overdue.entity.OverdueForm;
import com.okdeer.jxc.form.overdue.service.OverdueFormDetailService;
import com.okdeer.jxc.form.overdue.service.OverdueFormService;
import com.okdeer.jxc.form.overdue.vo.OverdueFormDetailVo;
import com.okdeer.jxc.form.overdue.vo.OverdueFormVo;
import com.okdeer.jxc.report.qo.CashCheckReportQo;
import com.okdeer.jxc.report.vo.CashCheckReportVo;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

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

    private static final String PREFIX = "BA";
    
    @Reference(version = "1.0.0", check = false)
    private OverdueFormService overdueFormService;
    
    @Reference(version = "1.0.0", check = false)
    private OverdueFormDetailService overdueFormDetailService;
    
    @Resource
    private OrderNoUtils orderNoUtils;
    
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
	Map<String, String> map = new HashMap<>();
	SysUser user = UserUtil.getCurrentUser();
	map.put("formNo", orderNoUtils.getExpireGoodsOrderNo(PREFIX, user.getBranchCode(), 4));
	return new ModelAndView("form/overdue/overdueAdd",map);
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
	    if(StringUtils.equalsIgnoreCase("1", vo.getStatus()+"")){
		modelAndView.setViewName("form/overdue/overdueView");
	    }else{
    	        modelAndView.setViewName("form/overdue/overdueEdit");
	    }
	    modelAndView.addObject("form", vo);
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
        	String detailListStr = ((JSONArray)mapType.get("detailList")).toJSONString();
        	List<Map<String,Object>> detailLists = JSON.parseObject(detailListStr,new TypeReference<List<Map<String,Object>>>(){});
        	return overdueFormDetailService.updateDetail(mapType.get("id").toString(),detailLists);
	}
	return RespJson.error();
    }
    
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public RespJson save(@RequestBody String jsonText) {
	if(StringUtils.isNotBlank(jsonText)){
	    Map<String,Object> mapType = JSON.parseObject(jsonText,new TypeReference<Map<String,Object>>(){}); 
	    //mapType.put("userId", UserUtil.getUser().getId());
	    //mapType.put("userName", UserUtil.getUser().getUserName());
    	    String detailListStr = ((JSONArray)mapType.get("detailList")).toJSONString();
    	    List<Map<String,Object>> detailLists = JSON.parseObject(detailListStr,new TypeReference<List<Map<String,Object>>>(){});
    	    if(!detailLists.isEmpty()&&detailLists.size()>0){
    		return overdueFormService.saveOverdue(mapType,detailLists);
    	    }
    	    return RespJson.error("调价详情列表为空,不能保存！");
	}
	return RespJson.error();
    }
    
    @RequestMapping(value = "/check", method = RequestMethod.POST)
    public RespJson check(String formId,Byte status){
	if(StringUtils.isNotBlank(formId)){
	    OverdueFormVo vo = new OverdueFormVo();
	    vo.setId(formId);
	    vo.setStatus(status);
	    vo.setUpdateTime(new Date());
	    vo.setValidUserId(UserUtil.getUser().getId());
	    vo.setValidUserName(UserUtil.getUser().getUserName());
	    overdueFormService.update(vo);
	    return RespJson.success();
	}
	return RespJson.error();
    }
    
    @RequestMapping(value = "/commit", method = RequestMethod.POST)
    public RespJson commit(@RequestBody String jsonText){
	/*if(StringUtils.isNotBlank(formId)){
	    OverdueFormVo vo = new OverdueFormVo();
	    vo.setId(formId);
	    vo.setStatus(status);
	    vo.setUpdateTime(new Date());
	    vo.setValidUserId(UserUtil.getUser().getId());
	    vo.setValidUserName(UserUtil.getUser().getUserName());
	    overdueFormService.update(vo);
	    return RespJson.success();
	}*/
	if(StringUtils.isNotBlank(jsonText)){
	    Map<String,Object> mapType = JSON.parseObject(jsonText,new TypeReference<Map<String,Object>>(){}); 
    	    String detailListStr = ((JSONArray)mapType.get("detailList")).toJSONString();
    	    List<Map<String,Object>> detailLists = JSON.parseObject(detailListStr,new TypeReference<List<Map<String,Object>>>(){});
    	    if(!detailLists.isEmpty()&&detailLists.size()>0){
    		 mapType.put("userId", UserUtil.getUser().getId());
    		 mapType.put("userName", UserUtil.getUser().getUserName());
    		return overdueFormService.commitOverdue(mapType,detailLists);
    	    }
    	    return RespJson.error("调价详情列表为空,不能保存！");
	}
	return RespJson.error();
    }
    
    @RequestMapping(value = "/report/print", method = RequestMethod.GET)
    public String printReport( OverdueFormVo vo, HttpServletResponse response, HttpServletRequest request){
	Optional<OverdueFormVo> optional = Optional.ofNullable(vo);
	vo = optional.orElse(new OverdueFormVo());
	vo.setPageNumber(Integer.valueOf(PAGE_NO));
	vo.setPageSize(PrintConstant.PRINT_MAX_LIMIT);
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
	map.put("endDate", DateUtils.formatDate(vo.getEndTime(), DateUtils.DATE_SMALL_STR_R));
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
	map.put("endDate", DateUtils.formatDate(vo.getEndTime(), DateUtils.DATE_SMALL_STR_R));
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
	String path = PrintConstant.OVERDUE_APPROVED_REPORT;
	Map<String, Object> map = new HashMap<String, Object>();
	map.put("endDate", DateUtils.formatDate(new Date(), DateUtils.DATE_SMALL_STR_R));
	map.put("printName", getCurrentUser().getUserName());
	JasperHelper.exportmain(request, response, map, JasperHelper.PDF_TYPE, path, list, "");
	return null;
    }
    
    @RequestMapping(value = "/exportList")
    public RespJson exportList(HttpServletResponse response) {
	try {
	    // qo = buildDefaultParams(qo);
	    /*List<CashCheckReportVo> exportList = cashCheckReportService.queryList(qo);
	    if (CollectionUtils.isNotEmpty(exportList)) {
		CashCheckReportVo vo = cashCheckReportService.queryListSum(qo);
		exportList.add(vo);
		String fileName = "收银对账" + "_" + DateUtils.getCurrSmallStr();
		String templateName = ExportExcelConstant.CASHCHECKREPORT;
		exportListForXLSX(response, exportList, fileName, templateName);
	    } else {
		RespJson json = RespJson.error("无数据可导");
		return json;
	    }*/
	} catch (Exception e) {
	    LOG.error("收银对账导出查询异常:", e);
	    RespJson json = RespJson.error("导出失败");
	    return json;
	}
	return null;
    }
    
    @Override
    protected Map<String, Object> getPrintReplace(String formNo) {
	if (logger.isDebugEnabled()) {
	    logger.debug("getPrintReplace(String) - start"); //$NON-NLS-1$
	}

	// TODO Auto-generated method stub

	if (logger.isDebugEnabled()) {
	    logger.debug("getPrintReplace(String) - end"); //$NON-NLS-1$
	}
	return null;
    }

    @Override
    protected List<OverdueFormDto> getPrintDetail(String formNo) {
	if (logger.isDebugEnabled()) {
	    logger.debug("getPrintDetail(String) - start"); //$NON-NLS-1$
	}

	// TODO Auto-generated method stub

	if (logger.isDebugEnabled()) {
	    logger.debug("getPrintDetail(String) - end"); //$NON-NLS-1$
	}
	return null;
    }

}
