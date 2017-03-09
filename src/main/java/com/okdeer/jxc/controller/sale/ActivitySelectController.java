package com.okdeer.jxc.controller.sale;  

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.sale.activity.service.ActivitySelectServiceApi;
import com.okdeer.jxc.sale.activity.vo.ActivityListQueryVo;
import com.okdeer.jxc.sale.entity.ActivityMain;
import com.okdeer.jxc.sale.enums.ActivityStatus;
import com.okdeer.jxc.sale.enums.ActivityType;
import com.okdeer.jxc.utils.UserUtil;

@Controller
@RequestMapping("sale/activitySelect")
public class ActivitySelectController extends BaseController<ActivityMain>{

	@Reference(version = "1.0.0", check = false)
	private ActivitySelectServiceApi mainServiceApi;
	/**
	 * @Description: 制定调拨单选择页面
	 * @return   
	 * @return String  
	 * @throws
	 * @author yangyq02
	 * @date 2016年8月11日
	 */
	@RequestMapping(value = "view")
	public String view(String type, Model model) {
		LOG.info("制定调拨单选择页面参数:{}"+type);
		model.addAttribute("type", type);
		return "sale/activity/activitySelect";
	}

	/**
	 * @Description: 配送（调拨单）单据选择
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @return PageUtils<PurchaseSelect>  
	 * @throws
	 * @author yangyq02
	 * @date 2016年8月8日
	 */
	@RequestMapping(value = "activityList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<Map<String, Object>> activityList(ActivityListQueryVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
//			=new ActivityListQueryVo();
			vo.setPage(pageNumber);
			vo.setRows(pageSize);
			LOG.info("制定调拨单选择页面参数:{}"+vo.toString());
			LOG.info("vo:" + vo.toString());
			if(vo.getBranchId()==null){
				vo.setBranchId(UserUtil.getCurrBranchId());
			}
			vo.setActivityStatus(ActivityStatus.CHECK_SUCCESS.getValue());//只查询已审核的
			vo.setStartTime(new Date());//活动有效期大于当前时间
			vo.setActivityType(ActivityType.SALE_PRICE.getValue());
			PageUtils<Map<String, Object>>  map = mainServiceApi.listPage(vo);
			LOG.info("page" + map.toString());
			return map;
		} catch (Exception e) {
			LOG.error("调拨单订单选择查询数据出现异常:", e);
		}
		return null;
	}
	@RequestMapping(value = "getDetail", method = RequestMethod.GET)
	@ResponseBody
	public RespJson getDetail(String activityId){
		try {
			LOG.debug("查询活动详情：getDetail：{}",activityId);
			List<Map<String, Object>> activityDetail = mainServiceApi.getDetail(activityId);
			return RespJson.success( activityDetail);
		} catch (Exception e) {
			LOG.error("查询活动详情出现异常：",e);
			return null;
		}
	}
}
