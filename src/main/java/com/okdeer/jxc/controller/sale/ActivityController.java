/** 
 *@Project: okdeer-jxc-web 
 *@Author: xiaoj02
 *@Date: 2016年11月10日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.sale;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.jfree.util.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.OrderNoUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.UUIDHexGenerator;
import com.okdeer.jxc.form.enums.FormType;
import com.okdeer.jxc.sale.activity.service.ActivityServiceApi;
import com.okdeer.jxc.sale.activity.vo.ActivityDetailVo;
import com.okdeer.jxc.sale.activity.vo.ActivityGradientVo;
import com.okdeer.jxc.sale.activity.vo.ActivityListQueryVo;
import com.okdeer.jxc.sale.activity.vo.ActivityVo;
import com.okdeer.jxc.sale.entity.ActivityBranch;
import com.okdeer.jxc.sale.entity.ActivityDetail;
import com.okdeer.jxc.sale.entity.ActivityGoodsGift;
import com.okdeer.jxc.sale.entity.ActivityMain;
import com.okdeer.jxc.sale.enums.ActivityStatus;
import com.okdeer.jxc.sale.enums.ActivityType;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: ActivityController 
 * @author xiaoj02
 * @date 2016年11月10日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("sale/activity")
public class ActivityController {

	protected final Logger logger = LoggerFactory.getLogger(getClass());

	@Reference(version = "1.0.0", check = false)
	private ActivityServiceApi mainServiceApi;

	@Autowired
	private OrderNoUtils orderNoUtils;

	/**
	 * 跳转到列表
	 */
	@RequestMapping(value = "list")
	public String viewList() {
		return "sale/activity/list";
	}

	/**
	 * 跳转到新增页面
	 */
	@RequestMapping(value = "add")
	public String viewAdd() {
		return "sale/activity/add";
	}

	/**
	 * 跳转到修改页面
	 */
	@RequestMapping(value = "edit")
	public String viewEdit(String activityId, HttpServletRequest request) {
		request.setAttribute("activityId", activityId);
		ActivityMain main = mainServiceApi.get(activityId);
		if (main == null) {
			return "error/404";
		}
		// 判断是否已审核
		if (main.getActivityStatus().equals(ActivityStatus.WAIT_CHECK.getValue())) {
			return "sale/activity/edit";
		} else {
			return "sale/activity/view";
		}
	}

	/**
	 * 保存活动
	 */
	@RequestMapping(value = "save", method = RequestMethod.POST)
	@ResponseBody
	public RespJson save(@RequestBody String jsonText) {
		RespJson resp = RespJson.success();
		try {
			logger.debug("保存促销活动参数信息:{}", jsonText);
			// 转换Json数据
			ActivityVo activityVo = JSON.parseObject(jsonText, ActivityVo.class);
			// 数据验证
			String validMsg = activityVo.validate();

			if (validMsg != null) {
				Log.warn(validMsg);
				return RespJson.businessError(validMsg);
			}

			// 构建活动ActivityMain
			ActivityMain main = new ActivityMain();
			BeanUtils.copyProperties(activityVo, main);
			SysUser user = UserUtil.getUser();
			Date now = new Date();

			main.setId(UUIDHexGenerator.generate());
			main.setActivityStatus(ActivityStatus.WAIT_CHECK.getValue());
			main.setCreateUserId(user.getId());
			main.setCreateTime(now);
			main.setUpdateUserId(user.getId());
			main.setUpdateTime(now);
			main.setDisabled(0);
			String activityCode = orderNoUtils.getOrderNo(FormType.PX + user.getBranchCode());
			main.setActivityCode(activityCode);

			// 构建活动详情列表ActivityDetail
			List<ActivityDetail> detailList = new ArrayList<ActivityDetail>();
			List<ActivityGoodsGift> goodsGiftList = new ArrayList<ActivityGoodsGift>();
			List<ActivityDetailVo> listVo = activityVo.getDetailList();

			// 买满送活动需要重新组装活动详情数据
			if (activityVo.getActivityType() == ActivityType.BUY_FULL_GIVE.getValue()) {
				List<ActivityGradientVo> gradientList = activityVo.getGradientList();
				
				// 全场活动
				if(activityVo.getActivityScope() == 2){
					ActivityDetailVo fullCourt = new ActivityDetailVo();
					listVo.clear();
					listVo.add(fullCourt);
				}

				// 将梯度数据排序
				sortGradientList(gradientList, activityVo.getActivityPattern());

				// 促销详情记录数 = 促销活动记录数 * 促销梯度记录数
				for (int i = 0; i < gradientList.size(); i++) {
					ActivityGradientVo gradientVo = gradientList.get(i);
					
					//梯度编号
					int groupNum = i + 1;

					// 构建买满送促销详情数据
					buildFullGiveDetailList(main, detailList, listVo, groupNum, gradientVo);

					// 构建买满送礼品信息数据
					buildGoodsGiftList(main.getId(), groupNum, gradientVo.getGoodsGiftList(), goodsGiftList);
				}

			} else {
				for (ActivityDetailVo activityDetailVo : listVo) {

					ActivityDetail activityDetail = new ActivityDetail();
					BeanUtils.copyProperties(activityDetailVo, activityDetail);

					String detailId = UUIDHexGenerator.generate();
					activityDetail.setId(detailId);
					activityDetail.setActivityId(main.getId());

					detailList.add(activityDetail);
				}
			}

			// 构建活动店铺列表ActivityBranch
			List<ActivityBranch> branchList = new ArrayList<ActivityBranch>();
			String[] branchArray = activityVo.getBranchIds().split(",");
			for (int i = 0; i < branchArray.length; i++) {
				String branchId = branchArray[i];
				ActivityBranch activityBranch = new ActivityBranch();
				activityBranch.setId(UUIDHexGenerator.generate());
				activityBranch.setActivityId(main.getId());
				activityBranch.setBranchId(branchId);
				branchList.add(activityBranch);
			}

			// 保存活动
			mainServiceApi.save(main, detailList, branchList, goodsGiftList);
			resp.put("activityId", main.getId());
		} catch (Exception e) {
			logger.error("保存活动出现异常：", e);
			return RespJson.error("保存活动出现异常");
		}
		return resp;
	}

	/**
	 * @Description: 构建买满送促销详情数据
	 * @param main
	 * @param detailList 保存到DB中的详情数据列表
	 * @param listVo 详情数据列表
	 * @param i 梯度编号
	 * @param gradientVo 梯度Vo
	 * @author liwb
	 * @date 2017年4月11日
	 */
	private void buildFullGiveDetailList(ActivityMain main, List<ActivityDetail> detailList,
			List<ActivityDetailVo> listVo, int i, ActivityGradientVo gradientVo) {
		// 重新构建活动详情记录
		for (ActivityDetailVo activityDetailVo : listVo) {

			ActivityDetail activityDetail = new ActivityDetail();
			BeanUtils.copyProperties(activityDetailVo, activityDetail);
			BeanUtils.copyProperties(gradientVo, activityDetail); // 复制买满金额/买满数量信息

			activityDetail.setId(UUIDHexGenerator.generate());
			activityDetail.setActivityId(main.getId());
			activityDetail.setGroupNum(i); // 梯度编号

			detailList.add(activityDetail);
		}
	}

	/**
	 * @Description: 将梯度数据排序
	 * @param gradientList
	 * @param activityPattern
	 * @author liwb
	 * @date 2017年4月11日
	 */
	private void sortGradientList(List<ActivityGradientVo> gradientList, int activityPattern) {
		// 按买满价格/买满金额 排序
		Collections.sort(gradientList, new Comparator<ActivityGradientVo>() {

			/**
			 * (non-Javadoc)
			 * @see java.util.Comparator#compare(java.lang.Object, java.lang.Object)
			 */
			@Override
			public int compare(ActivityGradientVo o1, ActivityGradientVo o2) {
				if (activityPattern == 0) {
					BigDecimal limitAmount = o1.getLimitAmount();
					BigDecimal otherimitAmount = o2.getLimitAmount();
					return limitAmount.compareTo(otherimitAmount);
				} else {
					BigDecimal limitCount = o1.getLimitCount();
					BigDecimal otherimitCount = o2.getLimitCount();
					return limitCount.compareTo(otherimitCount);
				}

			}
		});
	}

	/**
	 * @Description: 构建买满送礼品数据信息
	 * @param detailId
	 * @param giftVoList
	 * @param giftList
	 * @author liwb
	 * @date 2017年4月10日
	 */
	private void buildGoodsGiftList(String activityId, int groupNum, List<ActivityGoodsGift> giftVoList,
			List<ActivityGoodsGift> giftList) {
		for (ActivityGoodsGift goodsGift : giftVoList) {
			goodsGift.setId(UUIDHexGenerator.generate());
			goodsGift.setActivityId(activityId);
			goodsGift.setGroupNum(groupNum);
		}
		giftList.addAll(giftVoList);
	}

	/**
	 * 修改活动
	 */
	@RequestMapping(value = "update", method = RequestMethod.POST)
	@ResponseBody
	public RespJson update(@RequestBody String jsonText) {
		try {
			logger.debug("json:{}", jsonText);
			// 转换Json数据
			ActivityVo activityVo = JSON.parseObject(jsonText, ActivityVo.class);
			// 验证数据
			String validMsg = activityVo.validate();

			if (validMsg != null) {
				return RespJson.argumentError(validMsg);
			}

			if (activityVo.getId() == null) {
				return RespJson.argumentError("活动Id不能为空");
			}

			// 构建活动ActivityMain
			ActivityMain main = new ActivityMain();
			BeanUtils.copyProperties(activityVo, main);
			SysUser user = UserUtil.getUser();
			Date now = new Date();

			main.setUpdateUserId(user.getId());
			main.setUpdateTime(now);

			// 构建活动详情列表ActivityDetail
			List<ActivityDetail> detailList = new ArrayList<ActivityDetail>();
			List<ActivityGoodsGift> goodsGiftList = new ArrayList<ActivityGoodsGift>();
			List<ActivityDetailVo> listVo = activityVo.getDetailList();

			// 买满送活动需要重新组装活动详情数据
			if (activityVo.getActivityType() == ActivityType.BUY_FULL_GIVE.getValue()) {
				List<ActivityGradientVo> gradientList = activityVo.getGradientList();

				// 将梯度数据排序
				sortGradientList(gradientList, activityVo.getActivityPattern());

				// 促销详情记录数 = 促销活动记录数 * 促销梯度记录数
				for (int i = 1; i <= gradientList.size(); i++) {
					ActivityGradientVo gradientVo = gradientList.get(i);

					// 构建买满送促销详情数据
					buildFullGiveDetailList(main, detailList, listVo, i, gradientVo);

					// 构建买满送礼品信息数据
					buildGoodsGiftList(main.getId(), i, gradientVo.getGoodsGiftList(), goodsGiftList);
				}

			} else {
				for (ActivityDetailVo activityDetailVo : listVo) {

					ActivityDetail activityDetail = new ActivityDetail();
					BeanUtils.copyProperties(activityDetailVo, activityDetail);

					String detailId = UUIDHexGenerator.generate();

					activityDetail.setId(detailId);
					activityDetail.setActivityId(main.getId());

					detailList.add(activityDetail);
				}
			}

			// 构建活动店铺列表ActivityBranch
			List<ActivityBranch> branchList = new ArrayList<ActivityBranch>();
			String[] branchArray = activityVo.getBranchIds().split(",");
			for (int i = 0; i < branchArray.length; i++) {
				String branchId = branchArray[i];
				ActivityBranch activityBranch = new ActivityBranch();
				activityBranch.setId(UUIDHexGenerator.generate());
				activityBranch.setActivityId(main.getId());
				activityBranch.setBranchId(branchId);
				branchList.add(activityBranch);
			}

			// 保存活动
			return mainServiceApi.update(main, detailList, branchList, goodsGiftList);

		} catch (Exception e) {
			logger.error("保存活动出现异常：", e);
			return RespJson.error("保存活动出现异常");
		}
	}

	/**
	 * 审核活动
	 */
	@RequestMapping(value = "check", method = RequestMethod.POST)
	@ResponseBody
	public RespJson check(String activityId) {
		try {
			logger.debug("审核：activityId：{}", activityId);
			SysUser user = UserUtil.getUser();
			return mainServiceApi.check(activityId, user.getId());
		} catch (Exception e) {
			logger.error("审核活动出现异常：", e);
			return RespJson.error("审核活动出现异常");
		}
	}

	/**
	 * 终止活动
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public RespJson delete(String activityId) {
		try {
			logger.debug("删除：activityId：{}", activityId);
			SysUser user = UserUtil.getUser();
			return mainServiceApi.delete(activityId, user.getId());
		} catch (Exception e) {
			logger.error("删除活动出现异常：", e);
			return RespJson.error("删除活动出现异常");
		}
	}

	/**
	 * 终止活动
	 */
	@RequestMapping(value = "stop", method = RequestMethod.POST)
	@ResponseBody
	public RespJson stop(String activityId) {
		try {
			logger.debug("终止：activityId：{}", activityId);
			SysUser user = UserUtil.getUser();
			return mainServiceApi.stop(activityId, user.getId());
		} catch (Exception e) {
			logger.error("终止活动出现异常：", e);
			return RespJson.error("终止活动出现异常");
		}
	}

	/**
	 * 查询单个活动
	 */
	@RequestMapping(value = "get", method = RequestMethod.GET)
	@ResponseBody
	public RespJson get(String activityId) {
		RespJson resp = RespJson.success();
		try {
			logger.debug("查询单个活动：get：{}", activityId);
			Map<String, Object> activityMain = mainServiceApi.getMain(activityId);
			List<Map<String, Object>> activityBranch = mainServiceApi.getBranch(activityId);
			resp.put("obj", activityMain);
			resp.put("branch", activityBranch);
		} catch (Exception e) {
			logger.error("查询单个活动出现异常：", e);
			return RespJson.error("查询单个活动出现异常");
		}
		return resp;
	}

	/**
	 * 查询单个活动的详情
	 */
	@RequestMapping(value = "getDetail", method = RequestMethod.GET)
	@ResponseBody
	public PageUtils<Map<String, Object>> getDetail(ActivityListQueryVo activityListQueryVo) {
		try {
			logger.debug("查询活动详情：getDetail：{}", JSONObject.toJSONString(activityListQueryVo));
			PageUtils<Map<String, Object>> activityDetail = mainServiceApi.getDetail(activityListQueryVo);
			return activityDetail;
		} catch (Exception e) {
			logger.error("查询活动详情出现异常：", e);
			return null;
		}
	}

	/**
	 * 查询单个活动的详情(满减活动)
	 */
	@RequestMapping(value = "getDetailFullCut", method = RequestMethod.GET)
	@ResponseBody
	public PageUtils<Map<String, Object>> getDetailFullCut(ActivityListQueryVo activityListQueryVo) {
		try {
			logger.debug("查询活动详情(满减)：getDetailFullCut：{}", JSONObject.toJSONString(activityListQueryVo));
			PageUtils<Map<String, Object>> activityDetail = mainServiceApi.getDetailFullCut(activityListQueryVo);
			return activityDetail;
		} catch (Exception e) {
			logger.error("查询活动详情(满减)出现异常：", e);
			return null;
		}
	}

	/**
	 * 查询单个活动的满减优惠信息(满减活动)
	 */
	@RequestMapping(value = "getLimitAmountFullCut", method = RequestMethod.GET)
	@ResponseBody
	public PageUtils<Map<String, Object>> getLimitAmountFullCut(String activityId) {
		try {
			logger.debug("查询活动详情(满减优惠信息)：getLimitAmountFullCut：{}", activityId);
			PageUtils<Map<String, Object>> activityDetail = mainServiceApi.getLimitAmountFullCut(activityId);
			return activityDetail;
		} catch (Exception e) {
			logger.error("查询活动详情(满减优惠信息)出现异常：", e);
			return null;
		}
	}

	/**
	 * 查询单个活动的详情(买满送)
	 */
	@RequestMapping(value = "getDetailFullGive", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<Map<String, Object>> getDetailFullGive(ActivityListQueryVo activityListQueryVo) {
		try {
			logger.debug("查询活动详情(买满送)：getDetailFullGive：{}", JSONObject.toJSONString(activityListQueryVo));
			PageUtils<Map<String, Object>> activityDetail = mainServiceApi.getDetailFullGive(activityListQueryVo);
			return activityDetail;
		} catch (Exception e) {
			logger.error("查询活动详情(买满送)出现异常：", e);
			return null;
		}
	}

	/**
	 * 查询单个买满送活动的优惠梯度
	 */
	@RequestMapping(value = "getGradientForFullGive", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<ActivityGradientVo> getGradientForFullGive(String activityId) {
		try {
			logger.debug("查询活动详情(买满送)的优惠梯度，活动Id:{}", activityId);
			PageUtils<ActivityGradientVo> activityDetail = mainServiceApi.getGradientForFullGive(activityId);
			return activityDetail;
		} catch (Exception e) {
			logger.error("查询活动详情(买满送)的优惠梯度出现异常：", e);
			return null;
		}
	}

	/**
	 * 查询活动列表
	 */
	@RequestMapping(value = "listData", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<Map<String, Object>> listData(ActivityListQueryVo queryVo) {
		try {
			logger.debug("查询活动列表：listData：{}", queryVo);
			queryVo.setSourceBranchId(UserUtil.getCurrBranchId());
			PageUtils<Map<String, Object>> page = mainServiceApi.listPage(queryVo);
			return page;
		} catch (Exception e) {
			logger.error("查询活动列表出现异常：", e);
			return null;
		}
	}

}
