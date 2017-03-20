package com.okdeer.jxc.controller.stock;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.stock.service.StocktakingApplyServiceApi;
import com.okdeer.jxc.stock.vo.StocktakingBatchVo;
import com.okdeer.jxc.system.entity.SysUser;

/**
 * <p></p>
 * ClassName: stocktakingApplyController 
 * @Description: 盘点申请
 * @author xuyq
 * @date 2017年3月7日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("/stocktaking/apply")
public class StocktakingApplyController extends BaseController<StocktakingApplyController> {

	/**
	 * @Fields stocktakingApplyServiceApi : stocktakingApplyServiceApi
	 */
	@Reference(version = "1.0.0", check = false)
	private StocktakingApplyServiceApi stocktakingApplyServiceApi;

	/**
	 * 
	 * @Description: 跳转列表页面
	 * @return String
	 * @author xuyq
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "/list")
	public String list() {
		return "/stocktaking/apply/applyList";
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
		return "/stocktaking/apply/applyAdd";
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
	@RequestMapping(value = "getApplyList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<StocktakingBatchVo> getApplyList(StocktakingBatchVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			// 结束日期延后一天
			if (vo.getEndTime() != null) {
				vo.setEndTime(DateUtils.getDayAfter(vo.getEndTime()));
			}
			LOG.info(LogConstant.OUT_PARAM, vo.toString());
			PageUtils<StocktakingBatchVo> stocktakingBatchList = stocktakingApplyServiceApi.getStocktakingBatchList(vo);
			LOG.info(LogConstant.PAGE, stocktakingBatchList.toString());
			return stocktakingBatchList;
		} catch (Exception e) {
			LOG.error("盘点申请查询列表信息异常:{}", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 保存
	 * @param vo 条件VO
	 * @param validate 验证结果
	 * @return RespJson
	 * @author xuyq
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "/saveStocktakingBatch", method = RequestMethod.POST)
	@ResponseBody
	public RespJson saveStocktakingBatch(@Valid StocktakingBatchVo vo, BindingResult validate) {
		// 1 校验是否必填
		if (validate.hasErrors()) {
			String errorMessage = validate.getFieldError().getDefaultMessage();
			LOG.info("validate errorMessage:{}", errorMessage);
			return RespJson.error(errorMessage);
		}
		SysUser user = getCurrentUser();
		RespJson respJson = RespJson.success();
		try {
			vo.setCreateUserId(user.getId());
			vo.setCreateUserName(user.getUserName());
			stocktakingApplyServiceApi.saveStocktakingBatch(vo);
		} catch (Exception e) {
			LOG.error("申请盘点批号异常：", e);
			respJson = RespJson.error("申请盘点批号异常!");
		}
		return respJson;
	}
}
