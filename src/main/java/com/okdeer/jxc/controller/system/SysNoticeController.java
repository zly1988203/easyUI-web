/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhengwj
 *@Date: 2017年5月19日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.system;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.github.pagehelper.PageHelper;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.system.entity.SysUser;
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
	 * @Description: 系统公告列表页面
	 * @author zhengwj
	 * @date 2017年5月19日
	 */
	@RequestMapping(value = "noticeList")
	public String list() {
		return "system/notice/noticeList";
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
			SysUser user = getCurrentUser();
			vo.setUserId(user.getId());
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
	public String add() {
		return "system/notice/addNotice";
	}

	/**
	 * @Description: 保存系统公告
	 * @author zhengwj
	 * @date 2017年5月19日
	 */
	@RequestMapping(value = "save", method = RequestMethod.POST)
	@ResponseBody
	public RespJson save(@RequestBody SysNoticeVo vo) {
		RespJson respJson = RespJson.success();
		try {
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
			SysUser user = getCurrentUser();
			sysNoticeService.updateRead(id, user.getId());
		}
		modelAndView.addObject("notice", vo);
		modelAndView.setViewName("system/notice/noticeView");
		return modelAndView;
	}

	/**
	 * @Description: 删除系统公告
	 * @param id 系统公告id
	 * @author zhengwj
	 * @date 2017年5月19日
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public RespJson delete(String id) {
		RespJson respJson = RespJson.success();
		try {
			SysUser user = getCurrentUser();
			respJson = sysNoticeService.delNotice(id, user.getId());
		} catch (Exception e) {
			LOG.error("删除系统公告异常:", e);
			respJson = RespJson.error("删除系统公告失败！");
		}
		return respJson;
	}

}
