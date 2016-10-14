package com.okdeer.jxc.controller.cost;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.cost.entity.StockCostForm;
import com.okdeer.jxc.cost.entity.StockCostFormAll;
import com.okdeer.jxc.cost.entity.StockCostFormDetail;
import com.okdeer.jxc.cost.service.StockCostFormServiceApi;
import com.okdeer.jxc.cost.vo.StockCostFormVo;
import com.okdeer.jxc.form.entity.PurchaseForm;
import com.okdeer.jxc.utils.UserUtil;

@Controller
@RequestMapping("cost/costAdjust")
public class CostAdjustController extends BaseController<PurchaseForm>{

	@Reference(version = "1.0.0", check = false)
	private StockCostFormServiceApi stockCostFormServiceApi;

	/**
	 * @Description: 显示列表页面
	 * @param type
	 * @param model
	 * @return   
	 * @return String  
	 * @throws
	 * @author yangyq02
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "view")
	public String view(String type, Model model) {
		model.addAttribute("type", type);
		return "cost/costAdjustList";
	}
	/**
	 * @Description: 跳转到添加页面
	 * @param type
	 * @param model
	 * @return   
	 * @return String  
	 * @throws
	 * @author yangyq02
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "add")
	public String add(String type, Model model) {
		model.addAttribute("type", type);
		return "cost/costAdjustAdd";
	}
	/**
	 * @Description: 跳转到修改页面
	 * @param type
	 * @param model
	 * @return   
	 * @return String  
	 * @throws
	 * @author yangyq02
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "edit")
	public String edit(String id, Model model) {
		StockCostForm costForm = stockCostFormServiceApi.queryCostFormDetail(id);
		model.addAttribute("data",costForm );
		return "cost/costAdjustEdit";
	}

	/**
	 * @Description: 查询列表集合
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @return PageUtils<StockCostForm>  
	 * @throws
	 * @author yangyq02
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "queryList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<StockCostForm> queryList(
			StockCostFormVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try{
			LOG.info("qo:" + vo.toString());
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			PageUtils<StockCostForm> page = stockCostFormServiceApi.queryLists(vo);
			LOG.info("page" + page.toString());
			return page;
		}catch(RuntimeException e){
			LOG.error("删除成本调整单失败！:{}",e);
			return null;
		}
		catch(Exception e){
			LOG.error("删除成本调整单失败！:{}",e);
			return null;
		}
	}
	/**
	 * @Description: 添加成本调整
	 * @param jsonData
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author yangyq02
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "addCostForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson addCostForm(
			String jsonData) {
		try{
			if(jsonData==null){
				RespJson.error("json数据不允许为空！");
			}
			StockCostFormAll stockCostFormAl=JSON.parseObject(jsonData, StockCostFormAll.class);
			stockCostFormAl.getStockCostForm().setCreateUserId(UserUtil.getCurrUserId());
			stockCostFormAl.setBranchCode(UserUtil.getCurrBranchCode());
			LOG.info("qo:" + stockCostFormAl);
			return	stockCostFormServiceApi.insertCostForm(stockCostFormAl);
		}catch(RuntimeException e){
			LOG.error("新增成本调整单失败！:{}",e);
			return RespJson.error(e.getMessage());
		}
		catch(Exception e){
			LOG.error("新增成本调整单失败！:{}",e);
			return RespJson.error("新增成本调整单失败！");
		}
	}
	/**
	 * @Description: 修改成调整
	 * @param jsonData
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author yangyq02
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "updateCostForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson updateCostForm(
			String jsonData) {
		try{
			if(jsonData==null){
				RespJson.error("json数据不允许为空！");
			}
			StockCostFormAll stockCostFormAl=JSON.parseObject(jsonData, StockCostFormAll.class);
			stockCostFormAl.getStockCostForm().setUpdateUserId(UserUtil.getCurrBranchCode());
			LOG.info("qo:" + stockCostFormAl);
			return stockCostFormServiceApi.updateCostForm(stockCostFormAl);
		}catch(RuntimeException e){
			LOG.error("删除成本调整单失败！:{}",e);
			return RespJson.error(e.getMessage());
		}
		catch(Exception e){
			LOG.error("删除成本调整单失败！:{}",e);
			return RespJson.error("删除成本调整单失败！");
		}
	}
	/**
	 * @Description: 删除成本调整
	 * @param id
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author yangyq02
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "deleteCostForm", method = RequestMethod.POST)
	@ResponseBody
	public RespJson deleteCostForm(
			String id) {
		try{
			if(id==null){
				return	RespJson.error("id不允许为空！");
			}
			return stockCostFormServiceApi.deleteCostFormById(id);
		}catch(RuntimeException e){
			LOG.error("删除成本调整单失败！:{}",e);
			return RespJson.error(e.getMessage());
		}
		catch(Exception e){
			LOG.error("删除成本调整单失败！:{}",e);
			return RespJson.error("删除成本调整单失败！");
		}
	}

	/**
	 * @Description: 查看详情
	 * @param id
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author yangyq02
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "queryCostFormDetail", method = RequestMethod.POST)
	@ResponseBody
	public StockCostForm queryCostFormDetail(
			String id) {
		try{
			return stockCostFormServiceApi.queryCostFormDetail(id);
		}catch(RuntimeException e){
			LOG.error("查看成本调整单明细！:{}",e);
		}
		catch(Exception e){
			LOG.error("删除成本调整单失败！:{}",e);
		}
		return null;
	}


	/**
	 * @Description: 查看明细列表详细
	 * @param id
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author yangyq02
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "queryCostFormDetailList", method = RequestMethod.POST)
	@ResponseBody
	public List<StockCostFormDetail> queryCostFormDetailList(
			String id) {
		try{
			List<StockCostFormDetail>  list= stockCostFormServiceApi.queryCostFormDetailList(id);
			return list;
		}catch(RuntimeException e){
			LOG.error("查看成本调整单明细！:{}",e);
		}
		catch(Exception e){
			LOG.error("删除成本调整单失败！:{}",e);
		}
		return null;
	}

	/**
	 * @Description: 审核
	 * @param id
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author yangyq02
	 * @date 2016年10月13日
	 */
	@RequestMapping(value = "check", method = RequestMethod.POST)
	@ResponseBody
	public RespJson check(
			String id) {
		try{
			if(id==null){
				return	RespJson.error("id不允许为空！");
			}
			RespJson json = stockCostFormServiceApi.check(id, UserUtil.getCurrUserId());
			return json;
		}catch(RuntimeException e){
			LOG.error("删除成本调整单失败！:{}",e);
			return RespJson.error(e.getMessage());
		}
		catch(Exception e){
			LOG.error("删除成本调整单失败！:{}",e);
			return RespJson.error("删除成本调整单失败！");
		}
	}


}
