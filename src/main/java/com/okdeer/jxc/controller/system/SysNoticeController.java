/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhengwj
 *@Date: 2017年5月19日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.system;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.github.pagehelper.PageHelper;
import com.okdeer.jxc.common.enums.DisabledEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.OrderNoUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.common.utils.UuidUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.form.enums.FormType;
import com.okdeer.jxc.system.service.SysNoticeService;
import com.okdeer.jxc.system.vo.SysNoticeVo;

/**
 * ClassName: NoticeController 
 * @Description: 系统公告
 * @author zhengwj
 * @date 2017年5月19日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("sys/notice")
public class SysNoticeController extends BaseController<SysNoticeController> {

	/**
	 * @Fields sysNoticeService : 系统公告service
	 */
	@Reference(version = "1.0.0", check = false)
	private SysNoticeService sysNoticeService;

	/**
	 * @Fields orderNoUtils : 单号生成工具
	 */
	@Autowired
	private OrderNoUtils orderNoUtils;

	/**
	 * @Description: 系统公告列表页面
	 * @author zhengwj
	 * @date 2017年5月19日
	 */
	@RequestMapping(value = "list")
	public ModelAndView list() {
		ModelAndView modelAndView = new ModelAndView("system/notice/noticeList");
		return modelAndView;
	}

	/**
	 * @Description: 获取系统公告列表
	 * @author zhengwj
	 * @date 2017年5月19日
	 */
	@RequestMapping(value = "getList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<SysNoticeVo> getList(SysNoticeVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			vo.setUserId(getCurrUserId());
			// 过滤查询条件
			if (StringUtils.isNotBlank(vo.getBranchId())) {
				vo.setPublishBranchName(null);
			} else if (StringUtils.isNotBlank(vo.getPublishBranchName())) {
				vo.setPublishBranchName(
						vo.getPublishBranchName().substring(vo.getPublishBranchName().indexOf("]") + 1));
			}
			if (StringUtils.isNotBlank(vo.getReceiveBranchId())) {
				vo.setReceiveBranchName(null);
			} else if (StringUtils.isNotBlank(vo.getReceiveBranchName())) {
				vo.setReceiveBranchName(
						vo.getReceiveBranchName().substring(vo.getReceiveBranchName().indexOf("]") + 1));
			}

			PageHelper.startPage(pageNumber, pageSize, true);
			List<SysNoticeVo> list = sysNoticeService.getNoticeList(vo);
			return new PageUtils<SysNoticeVo>(list);
		} catch (Exception e) {
			LOG.error("获取系统公告列表异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 系统公告新增页面
	 * @author zhengwj
	 * @date 2017年5月19日
	 */
	@RequestMapping(value = "addNotice")
	public ModelAndView add() {
		ModelAndView modelAndView = new ModelAndView("system/notice/addNotice");
		return modelAndView;
	}

	/**
	 * @Description: 保存系统公告
	 * @author zhengwj
	 * @date 2017年5月19日
	 */
	@RequestMapping(value = "save", method = RequestMethod.POST)
	@ResponseBody
	public RespJson save(SysNoticeVo vo) {
		RespJson respJson = RespJson.success();
		try {
			vo.setId(UuidUtils.getUuid());
			vo.setBranchId(getCurrBranchId());
			vo.setNoticeNo(orderNoUtils.getOrderNoAll(FormType.GZ.toString() + getCurrBranchCode(), 4));
			vo.setCreateUserId(getCurrUserId());
			vo.setCreateTime(new Date());
			vo.setDisabled(DisabledEnum.NO.getIndex());
			respJson = sysNoticeService.saveNotice(vo);
		} catch (Exception e) {
			LOG.error("保存系统公告异常:", e);
			respJson = RespJson.error("保存系统公告失败！");
		}
		return respJson;
	}

	/**
	 * @Description: 查看系统公告
	 * @param id 系统公告id
	 * @author zhengwj
	 * @date 2017年5月19日
	 */
	@RequestMapping(value = "noticeView")
	public ModelAndView view(String id, ModelAndView modelAndView) {
		SysNoticeVo vo = sysNoticeService.getNotice(id);
		// 查看详情，标记为已读
		if (vo != null) {
			sysNoticeService.updateRead(id, getCurrUserId());
		}
		modelAndView.addObject("notice", vo);
		modelAndView.setViewName("system/notice/noticeView");
		return modelAndView;
	}

	/**
	 * @Description: 删除系统公告
	 * @param ids 系统公告id
	 * @author zhengwj
	 * @date 2017年5月19日
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public RespJson delete(@RequestParam(value = "ids[]") List<String> ids) {
		RespJson respJson = RespJson.success();
		try {
			respJson = sysNoticeService.delNotice(ids, getCurrUserId());
		} catch (Exception e) {
			LOG.error("删除系统公告异常:", e);
			respJson = RespJson.error("删除系统公告失败！");
		}
		return respJson;
	}

}
