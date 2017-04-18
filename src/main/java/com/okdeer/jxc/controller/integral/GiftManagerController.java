/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhongy
 *@Date: 2016年12月30日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.integral;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.okdeer.base.common.utils.UuidUtils;
import com.okdeer.ca.common.mapper.JsonMapper;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.branch.vo.BranchesVo;
import com.okdeer.jxc.common.constant.Constant;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.enums.GiftManagerEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.goods.entity.GoodsBranchPrice;
import com.okdeer.jxc.goods.service.GoodsBranchPriceServiceApi;
import com.okdeer.jxc.integral.gift.dto.GiftManagerDto;
import com.okdeer.jxc.integral.gift.entity.GiftManager;
import com.okdeer.jxc.integral.gift.qo.GiftManagerQo;
import com.okdeer.jxc.integral.gift.service.GiftManagerServiceApi;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: GiftManagerController 
 * @Description: 积分礼品管理
 * @author zhongy
 * @date 2016年12月30日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *   进销存2.1.0	
 */
@Controller
@RequestMapping("integral/giftManager")
public class GiftManagerController extends BaseController<GiftManagerController> {

	@Reference(version = "1.0.0", check = false)
	private GiftManagerServiceApi giftManagerServiceApi;

	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesService;
	
	@Reference(version = "1.0.0", check = false)
	private GoodsBranchPriceServiceApi goodsBranchPriceService;
	
	/**
	 * @Description: 积分礼品管理跳转页面
	 * @return
	 * @author zhongy
	 * @date 2016年12月30日
	 */
	@RequestMapping(value = "view")
	public String view(Model model) {
		Integer branchType = getCurrBranchType();
		model.addAttribute("branchType", branchType);
		return "integral/list";
	}

	/**
	 * @Description: 积分礼品管理查询
	 * @param qo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author zhongy
	 * @date 2016年12月30日
	 */
	@RequestMapping(value = "getList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<GiftManager> getList(GiftManagerQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			LOG.debug("积分礼品管理查询参数：{}", qo);
			// 当前机构
			qo.setBranchCompleCode(getCurrBranchCompleCode());
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			PageUtils<GiftManager> pageList = giftManagerServiceApi.queryPageByParams(qo);
			return pageList;
		} catch (Exception e) {
			LOG.error("积分礼品管理查询异常:", e);
		}
		return PageUtils.emptyPage();
	}

	
	/**
	 * 删除
	 * @param ids
	 * @return
	 * @author zhongy
	 * @date 2016年12月31日
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public RespJson delete(String ids) {
		try {
			if(StringUtils.isNotBlank(ids)){
				String[] arr = ids.split(",");
				giftManagerServiceApi.deleteByIds(Arrays.asList(arr));
				return RespJson.success();
			}
		} catch (Exception e) {
			LOG.error("积分礼品删除异常:", e);
			return RespJson.error("删除失败");
		}
		return RespJson.error();
	}
	
	
	/**
	 * @Description: 修改页跳转
	 * @param model
	 * @param request
	 * @return
	 * @author zhongy
	 * @date 2016年12月31日
	 */
	@RequestMapping(value = "updateView")
	public String updateView(Model model, String id) {
		try {
			if(StringUtils.isNotBlank(id)){
				GiftManager giftManager = giftManagerServiceApi.queryGiftManagerById(id);
				model.addAttribute("data", giftManager);
				model.addAttribute("startTime", DateUtils.formatDate(giftManager.getStartTime(), DateUtils.DATE_SMALL_STR_R));
				model.addAttribute("endTime", DateUtils.formatDate(giftManager.getEndTime(), DateUtils.DATE_SMALL_STR_R));
				model.addAttribute("status", giftManager.getStatus());
				return "integral/update";
			}
		} catch (Exception e) {
			LOG.error("修改礼品管理查询删除异常:", e);
		}
		return null;
	}

	/**
	 * @Description: 修改商品
	 * @param sku
	 * @return
	 * @author taomm
	 * @date 2016年8月3日
	 */
	@RequestMapping(value = "updateGiftManager", method = RequestMethod.POST)
	@ResponseBody
		public RespJson updateGiftManager(@RequestBody String jsonText) {
			GiftManager giftManager = JSON.parseObject(jsonText, GiftManager.class);
		try {
			//1、校验信息
			String msg = checkEditParam(giftManager);
			if(StringUtils.isNotBlank(msg)){
				return RespJson.error(msg);
			}
			
			Date nowTime = new Date();
			Date startTime = giftManager.getStartTime();
			Date endTime = giftManager.getEndTime();
			if(nowTime.getTime() < startTime.getTime()){
				giftManager.setStatus(GiftManagerEnum.INEFFECTIVE.getCode());
			}
			if(nowTime.getTime() > startTime.getTime() && nowTime.getTime() < endTime.getTime()){
				giftManager.setStatus(GiftManagerEnum.EXCHANGE.getCode());
			}
			if(nowTime.getTime() >= endTime.getTime()){
				giftManager.setStatus(GiftManagerEnum.EXPIRED.getCode());
			}
			giftManagerServiceApi.updateGiftManager(giftManager);
			return RespJson.success();
		} catch (Exception e) {
			LOG.error("修改商品异常:", e);
			return RespJson.error(e.toString());
		}
	}
	
	
	//1 检查信息
	private String checkEditParam(GiftManager giftManager){
		List<String> skuIds = new ArrayList<String>();
		List<String> storeIds = new ArrayList<String>();
		skuIds.add(giftManager.getSkuId());
		storeIds.add(giftManager.getBranchId());
		Date startTime = giftManager.getStartTime();
		Date endTime = giftManager.getEndTime();
		//机构类型(0.总部、1.分公司、2.物流中心、3.自营店、4.加盟店B、5.加盟店C)
		Branches branches = branchesService.getBranchInfoById(giftManager.getBranchId());
		Integer count = 0;
		StringBuffer sb = new StringBuffer();
		//1、分公司
	    if(BranchTypeEnum.BRANCH_OFFICE.getCode().equals(branches.getType())){
		   //1.1、校验分公司时间是否重叠
		   String parentId = branches.getBranchesId();
		   List<String> branchIds = new ArrayList<String>();
		   branchIds.add(parentId);
		   count = giftManagerServiceApi.selectCountByParams(giftManager.getId(),skuIds, branchIds, startTime, endTime);
		   if(count>0){
			   sb.append("【"+branches.getBranchName()+"】存在时间冲突礼品,请检查!");
			   return sb.toString();
		   }
		   
		   //1.2、校验分公司下属机构时间是否重叠
		   BranchesVo vo = new BranchesVo();
		   vo.setBranchId(parentId);
		   vo.setPageSize(Integer.MAX_VALUE);
		   vo.setPageNumber( Constant.ONE);
		   PageUtils<Branches> pageList =  branchesService.queryBranchByParam(vo);
		   List<Branches> childrenBranches = pageList.getList();
		   for(Branches branche:childrenBranches){
				List<String> storeIds1 = new ArrayList<String>();
				storeIds1.add(branche.getBranchesId());
				count = giftManagerServiceApi.selectCountByParams("",skuIds, storeIds1, startTime, endTime);
				if(count>0){
					sb.append("【"+branche.getBranchName()+"】存在时间冲突礼品,请检查!");
					 return sb.toString();
				}
			}
	   }
	   //2、校验店铺时间是否重叠
	   count = giftManagerServiceApi.selectCountByParams(giftManager.getId(),skuIds, storeIds, startTime, endTime);
	   if(count>0){
		   sb.append("【"+branches.getBranchName()+"】存在时间冲突礼品,请检查!");
		   return sb.toString();
	   }
	   
	   //3、校验分公司时间是否重叠
	   List<String> parentBranchIds = new ArrayList<String>();
	   parentBranchIds.add(branches.getParentId());
	   count = giftManagerServiceApi.selectCountByParams("",skuIds, parentBranchIds, startTime, endTime);
	   if(count>0){
		   Branches branche = branchesService.getBranchInfoById(branches.getParentId());
		   sb.append("【"+branche.getBranchName()+"】存在时间冲突礼品,请检查!");
		   return sb.toString();
	   }
		return sb.toString();
	}
	
	
	/**
	 * @Description: 新增页跳转
	 * @param model
	 * @param request
	 * @return
	 * @author zhongy
	 * @date 2016年12月31日
	 */
	@RequestMapping(value = "addView")
	public String addView(Model model) {
		String branchIds = UserUtil.getCurrBranchId();
		model.addAttribute("branchIds", branchIds);
		return "integral/add";
	}
	
	/**
	 * 
	 * @Description: 新增礼品信息
	 * @param sku
	 * @return
	 * @author zhongy
	 * @date 2016年8月3日
	 */
	@RequestMapping(value = "addGiftManager", method = RequestMethod.POST)
	@ResponseBody
	public RespJson addGiftManager(HttpServletRequest req) {
		String json = req.getParameter("skuReq");
		LOG.info("新增礼品信息请求参数,json={}", json);
		GiftManagerDto dto = null;
		try {
			dto = JsonMapper.nonDefaultMapper().fromJson(json, GiftManagerDto.class);
			//1、校验请求数据
			String msg = checkAddParam(dto);
			if(StringUtils.isNotBlank(msg)){
				return RespJson.error(msg);
			}
			//2、封装请求参数
			List<GiftManager> list = getGiftManagers(dto);
			giftManagerServiceApi.batchInsert(list);
			return RespJson.success();
		} catch (Exception e) {
			LOG.error("新增礼品异常:", e);
			return RespJson.error(e.toString());
		}
	}
	
	//校验请求参数
	private String checkAddParam(GiftManagerDto dto){
		StringBuffer sb = new StringBuffer();
		if(dto!=null){
			String startTime1 = dto.getStartTime();
			String endTime1 = dto.getEndTime();
			Date startTime = DateUtils.parse(startTime1, DateUtils.DATE_FULL_STR);
			Date endTime = DateUtils.parse(endTime1, DateUtils.DATE_FULL_STR);
			List<GiftManager> list = dto.getDetailList();
			List<String> skuIds = getSkuIds(list);
			List<String> branchIds = dto.getBranchIds();
			
		   //1、判断机构是分公司还是机构店铺
		   Integer count = 0;
		   if(branchIds.size()==1){
			   Branches branches = branchesService.getBranchInfoById(branchIds.get(0));
			   //机构类型(0.总部、1.分公司、2.物流中心、3.自营店、4.加盟店B、5.加盟店C)
			   if(BranchTypeEnum.BRANCH_OFFICE.getCode().equals(branches.getType())){
				   //1.1、校验分公司时间是否重叠
				   count = giftManagerServiceApi.selectCountByParams("",skuIds, branchIds, startTime, endTime);
				   if(count>0){
					   sb.append("【"+branches.getBranchName()+"】存在时间冲突礼品,请检查!");
					   return sb.toString();
				   }
				   
				   //1.2、校验分公司下属机构时间是否重叠
				   String parentId = branches.getBranchesId();
				   BranchesVo vo = new BranchesVo();
				   vo.setBranchId(parentId);
				   vo.setPageSize(Integer.MAX_VALUE);
				   vo.setPageNumber( Constant.ONE);
				   PageUtils<Branches> pageList =  branchesService.queryBranchByParam(vo);
				   List<Branches> childrenBranches = pageList.getList();
				   for(Branches branche:childrenBranches){
						List<String> storeIds = new ArrayList<String>();
						storeIds.add(branche.getBranchesId());
						count = giftManagerServiceApi.selectCountByParams("",skuIds, storeIds, startTime, endTime);
						if(count>0){
							sb.append("【"+branche.getBranchName()+"】存在时间冲突礼品,请检查!");
							 return sb.toString();
						}
					}
			   }
		   }
		   
		   //2、校验分公司下属机构时间是否重叠
		   for(String brancheId:branchIds){
			   count = giftManagerServiceApi.selectCountByParams("",skuIds, branchIds, startTime, endTime);
			   if(count>0){
				   Branches branche = branchesService.getBranchInfoById(brancheId);
				   sb.append("【"+branche.getBranchName()+"】存在时间冲突礼品,请检查!");
				   return sb.toString();
			   }
		   }
		   
		   //3、校验分公司时间是否重叠
		   Branches branche = branchesService.getBranchInfoById(branchIds.get(0));
		   List<String> parentBranchIds = new ArrayList<String>();
		   parentBranchIds.add(branche.getParentId());
		   count = giftManagerServiceApi.selectCountByParams("",skuIds, parentBranchIds, startTime, endTime);
		   if(count>0){
			   Branches branche1 = branchesService.getBranchInfoById(branche.getParentId());
			   sb.append("【"+branche1.getBranchName()+"】存在时间冲突礼品,请检查!");
			   return sb.toString();
		   }
		}
		return sb.toString();
	}
	
	
	//获取商品skuId
	private List<String> getSkuIds(List<GiftManager> list){
		List<String> skuIds = new ArrayList<String>();
		for(GiftManager giftManager :list){
			skuIds.add(giftManager.getSkuId());
		}
		return skuIds;
	}
	
	
	private List<GiftManager> getGiftManagers(GiftManagerDto dto){
		List<GiftManager> giftManagers = new ArrayList<GiftManager>();
		String startTime1 = dto.getStartTime();
		String endTime1 = dto.getEndTime();
		Date startTime = DateUtils.parse(startTime1, DateUtils.DATE_FULL_STR);
		Date endTime = DateUtils.parse(endTime1, DateUtils.DATE_FULL_STR);
		Date nowTime = new Date();
		String status = GiftManagerEnum.INEFFECTIVE.getCode();
		if(nowTime.getTime() >= startTime.getTime() && nowTime.getTime() < endTime.getTime()){
			status = GiftManagerEnum.EXCHANGE.getCode();
		}
		List<GiftManager> skuList = dto.getDetailList();
		List<String> branchIds = dto.getBranchIds();
		for(String branchId : branchIds){
        	for(GiftManager sku : skuList){
        		GoodsBranchPrice price = goodsBranchPriceService.queryBySkuIdAndBranchId(branchId,sku.getSkuId());
        		if(price!=null){
        			GiftManager giftManager = new GiftManager();	
        			giftManager.setId(UuidUtils.getUuid());
        			giftManager.setSkuId(sku.getSkuId());
        			giftManager.setBranchId(branchId);
        			giftManager.setNum(sku.getNum());
        			giftManager.setIntegral(sku.getIntegral());
        			giftManager.setStatus(status);
        			giftManager.setStartTime(startTime);
        			giftManager.setEndTime(endTime);
        			giftManager.setCreateTime(new Date());
        			giftManager.setCreateUserId(getCurrBranchId());
        			giftManagers.add(giftManager);
        		}
        	}
        }		
		return giftManagers;
	}
	
}
