/** 
 *@Project: okdeer-jxc-web 
 *@Author: yangyq02
 *@Date: 2016年8月23日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.scale;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSONObject;
import com.okdeer.jxc.common.utils.UUIDHexGenerator;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.scale.entity.ScaleConfig;
import com.okdeer.jxc.scale.entity.ScaleNotes;
import com.okdeer.jxc.scale.service.ScaleNotesApi;
import com.okdeer.jxc.scale.service.ScaleServiceApi;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: ScaleController 
 * @Description: 电子秤管理工具类
 * @author yangyq02
 * @date 2016年8月23日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *	进销存V2.0.0		2016年8月3日			       杨永钦  			电子秤Controller类
 */
@Controller
@RequestMapping("scale/scale")
public class ScaleController extends BaseController<ScaleController> {

	@Reference(version = "1.0.0", check = false)
	ScaleServiceApi scaleServiceApi;

	@Reference(version = "1.0.0", check = false)
	ScaleNotesApi scaleNotesApi;

	/**
	 * @Description: 根据机构查询机构电子秤
	 * @return List<ScaleVo>  
	 * @throws
	 * @author yangyq02
	 * @date 2016年8月23日
	 */
	@RequestMapping(value = "queryByBranchIdLists", method = RequestMethod.POST)
	@ResponseBody
	public Message queryByBranchIdLists() {
		try {
			if (UserUtil.getCurrentUser() == null) {
				return Message.getNotLogged();
			}
			// 根据当前用户机构ID查询
			List<ScaleConfig> suppliers = scaleServiceApi.queryScaleByBranchIdLists(UserUtil.getCurrBranchId());
			LOG.info("page" + suppliers.toString());
			return Message.getSuccessMsg(suppliers);
		} catch (Exception e) {
			LOG.error("查询电子秤接口失败:", e);
			return Message.getFailMsg("查询电子秤接口失败");
		}
	}

	/**
	 * @Description: 保存电子秤
	 * @param data
	 * @return String  
	 * @throws
	 * @author yangyq02
	 * @date 2016年9月1日
	 */
	@RequestMapping(value = "saveScale", method = RequestMethod.POST, produces = "text/html;charset=gbk")
	@ResponseBody
	public String saveScale(String data) {
		try {
			if (UserUtil.getCurrentUser() == null) {
				return Message.getNotLogged().toString();
			}
			List<ScaleConfig> list = JSONObject.parseArray(data, ScaleConfig.class);
			if (CollectionUtils.isEmpty(list)) {
				return Message.getSuccessMsg().toString();
			}
			for (int i = 0; i < list.size(); i++) {
				list.get(i).setId(UUIDHexGenerator.generate());
				list.get(i).setBranchId(UserUtil.getCurrBranchId());
			}
			scaleServiceApi.saveScale(UserUtil.getCurrBranchId(), list);
			// return suppliers;
			return Message.getSuccessMsg().toString();
		} catch (Exception e) {
			LOG.error("保存电子秤操作失败", e);
			return	Message.getFailMsg("保存电子秤操作失败").toString();
		}
	}

	/**
	 * @Description: 保存传称记录
	 * @param data
	 * @param notesName
	 * @return String  
	 * @throws
	 * @author yangyq02
	 * @date 2016年9月1日
	 */
	@RequestMapping(value = "saveNotes", method = RequestMethod.POST)
	@ResponseBody
	public Message saveNotes(String data, String notesName) {
		try {
			if (UserUtil.getCurrentUser() == null) {
				return Message.getNotLogged();
			}
			if (StringUtils.isEmpty(data)) {
				return Message.getSuccessMsg();
			}
			ScaleNotes notes = new ScaleNotes();
			notes.setBranchId(UserUtil.getCurrBranchId());
			notes.setOperateId(UserUtil.getCurrUserId());
			notes.setGoodsCount(data.split("//,").length);
			notes.setNoteTime(new Date());
			notes.setSkuCodes(data);
			notes.setNoteName(notesName);
			notes.setId(UUIDHexGenerator.generate());
			scaleNotesApi.insert(notes);
			return Message.getSuccessMsg();
		} catch (Exception e) {
			LOG.error("保存电子秤传称记录失败！", e);
			return	Message.getFailMsg("保存电子秤传称记录失败！");
		}
	}

	/**
	 * @Description: 删除传称记录
	 * @param data
	 * @param notesName
	 * @return String  
	 * @throws
	 * @author yangyq02
	 * @date 2016年9月1日
	 */
	@RequestMapping(value = "deleteNote", method = RequestMethod.POST)
	@ResponseBody
	public Message deleteNote(String id) {
		try {
			scaleNotesApi.deleteNoteById(id);
			return Message.getSuccessMsg();
		} catch (Exception e) {
			LOG.error("删除电子秤传称记录失败！", e);
			return	Message.getFailMsg("删除电子秤传称记录失败！");
		}
	}

	/**
	 * @Description: 根据机构查询机构电子秤
	 * @return List<ScaleVo>  
	 * @throws
	 * @author yangyq02
	 * @date 2016年8月23日
	 */
	@RequestMapping(value = "queryNotesByBranchId", method = RequestMethod.POST)
	@ResponseBody
	public Message queryNotesByBranchId() {
		try {
			if (UserUtil.getCurrentUser() == null) {
				return Message.getNotLogged();
			}
			// 根据当前用户机构ID查询
			List<ScaleNotes> list = scaleNotesApi.queryNotesByBranchId(UserUtil.getCurrBranchId());
			LOG.info("page" + list.toString());
			return Message.getSuccessMsg(list);
		} catch (Exception e) {
			LOG.error("保存电子秤传称记录失败！", e);
			return	Message.getFailMsg("保存电子秤传称记录失败！");
		}
	}
	@RequestMapping(value = "scaleDownView")
	public String scaleDownView(HttpServletRequest req, Model model) {
		return "scale/scaleDown";
	}
}
