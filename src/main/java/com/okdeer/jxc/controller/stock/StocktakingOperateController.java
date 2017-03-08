package com.okdeer.jxc.controller.stock;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.stock.service.StocktakingOperateServiceApi;
import com.okdeer.jxc.stock.vo.StocktakingFormVo;
import com.okdeer.jxc.utils.UserUtil;

/**
 * <p></p>
 * ClassName: StocktakingOperateController 
 * @Description: 存货盘点
 * @author xuyq
 * @date 2017年3月7日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/stocktaking/operate")
public class StocktakingOperateController extends BaseController<StocktakingOperateController> {

	@Reference(version = "1.0.0", check = false)
	private StocktakingOperateServiceApi stocktakingOperateServiceApi;
	
	/**
	 * 
	 * @Description: 跳转列表页面
	 * @return String
	 * @author xuyq
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "/list")
	public String list() {
		return "/stocktaking/operate/operateList";
	}
	/**
	 * 
	 * @Description: 跳转新增页面
	 * @return String
	 * @author xuyq
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "/add")
	public String add() {
		return "/stocktaking/operate/operateAdd";
	}
	
	/**
	 * 
	 * @Description: 跳转弹框页面
	 * @return String
	 * @author xuyq
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "/publicStocktaking")
	public String publicStocktaking() {
		return "/component/publicStocktaking";
	}
	
	/**
	 * @Description: 查询列表
	 * @param vo 参数VO
	 * @param pageNumber 页码
	 * @param pageSize 页数
	 * @return PageUtils
	 * @author xuyq
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "/getStocktakingFormList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<StocktakingFormVo> getStocktakingFormList(StocktakingFormVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			if (StringUtils.isBlank(vo.getBranchCompleCode())) {
				vo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
			}
			LOG.info(LogConstant.OUT_PARAM, vo.toString());
			PageUtils<StocktakingFormVo> stocktakingBatchList = stocktakingOperateServiceApi.getStocktakingFormList(vo);
			LOG.info(LogConstant.PAGE, stocktakingBatchList.toString());
			return stocktakingBatchList;
		} catch (Exception e) {
			LOG.error("盘点申请查询列表信息异常:{}", e);
		}
		return null;
	}
}
