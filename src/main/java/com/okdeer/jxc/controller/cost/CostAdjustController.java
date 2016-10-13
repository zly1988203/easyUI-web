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
	public String edit(String type, Model model) {
		model.addAttribute("type", type);
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
			StockCostFormAll stockCostFormAl=JSON.parseObject(jsonData, StockCostFormAll.class);
			stockCostFormAl.getStockCostForm().setCreateUserId(UserUtil.getCurrUserId());
			LOG.info("qo:" + stockCostFormAl);
			stockCostFormServiceApi.insertCostForm(stockCostFormAl);
		}catch(RuntimeException e){
			LOG.error("删除成本调整单失败！:{}",e);
			return RespJson.error(e.getMessage());
		}
		catch(Exception e){
			LOG.error("删除成本调整单失败！:{}",e);
			return RespJson.error("删除成本调整单失败！");
		}
		return RespJson.success();
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
			StockCostFormAll stockCostFormAl=JSON.parseObject(jsonData, StockCostFormAll.class);
			LOG.info("qo:" + stockCostFormAl);
			stockCostFormServiceApi.updateCostForm(stockCostFormAl);
		}catch(RuntimeException e){
			LOG.error("删除成本调整单失败！:{}",e);
			return RespJson.error(e.getMessage());
		}
		catch(Exception e){
			LOG.error("删除成本调整单失败！:{}",e);
			return RespJson.error("删除成本调整单失败！");
		}
		return RespJson.success();
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
			String id,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try{
			stockCostFormServiceApi.deleteCostFormById(id);
			return RespJson.success();
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
	@RequestMapping(value = "queryCostFormDetailList", method = RequestMethod.POST)
	@ResponseBody
	public List<StockCostFormDetail> queryCostFormDetailList(
			String id) {
		try{
			return stockCostFormServiceApi.queryCostFormDetailList(id);
		}catch(RuntimeException e){
			LOG.error("查看成本调整单明细！:{}",e);
			
		}
		
		catch(Exception e){
			LOG.error("删除成本调整单失败！:{}",e);
		}
		return null;
	}

}
