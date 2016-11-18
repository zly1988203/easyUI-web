package com.okdeer.jxc.controller.pos;  

import org.apache.poi.ss.formula.functions.T;
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
import com.okdeer.jxc.pos.entity.PosRegister;
import com.okdeer.jxc.pos.service.PosRegisterServiceApi;
import com.okdeer.jxc.pos.vo.PosRegisterVo;
import com.okdeer.jxc.utils.UserUtil;


/**
 * ClassName: PosBindController 
 * @Description: POS绑定Controller 
 * @author yangyq02
 * @date 2016年11月17日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@Controller
@RequestMapping("pos/register")
public class PosRegisterController extends BaseController<T>{
	
	@Reference(version = "1.0.0", check = false)
	private PosRegisterServiceApi posRegisterServiceApi;
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
	public String view(Model model) {
		return "pos/registerList";
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
	public String add( Model model) {
		return "pos/registerAdd";
	}
	@RequestMapping(value = "edit")
	public String edit( Model model) {
		return "pos/registeredit";
	}
	@RequestMapping(value = "queryList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<PosRegister> queryList(
			PosRegisterVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try{
			LOG.info("qo:" + vo.toString());
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
			PageUtils<PosRegister> page = posRegisterServiceApi.queryLists(vo);
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
	
	@RequestMapping(value = "addRegister", method = RequestMethod.POST)
	@ResponseBody
	public RespJson addPosBind(
			PosRegister posRegister) {
		try{
			posRegister.setUpdateUserId(UserUtil.getCurrUserId());
			return posRegisterServiceApi.addPosRegister(posRegister);
		}catch(RuntimeException e){
			LOG.error("添加POS登记失败！:{}",e);
			return null;
		}
		catch(Exception e){
			LOG.error("添加POS登记失败！:{}",e);
			return RespJson.error("添加POS登记失败！");
		}
	}
	@RequestMapping(value = "delPosRegister", method = RequestMethod.POST)
	@ResponseBody
	public RespJson delPosRegister(String id) {
		try{
			return posRegisterServiceApi.delPosRegister(id,UserUtil.getCurrUserId());
		}catch(RuntimeException e){
			LOG.error("删除成本调整单失败！:{}",e);
			return null;
		}
		catch(Exception e){
			LOG.error("删除POS机登记失败！:{}",e);
			return RespJson.error("解除绑定操作失败！");
		}
	}
	
	/**
	 * @Description: 解除POS机器绑定
	 * @param id
	 * @return   
	 * @return RespJson  
	 * @throws
	 * @author yangyq02
	 * @date 2016年11月17日
	 */
	@RequestMapping(value = "relieveBind", method = RequestMethod.POST)
	@ResponseBody
	public RespJson relieveBind(String id) {
		try{
			return posRegisterServiceApi.relieveBind(id,UserUtil.getCurrUserId());
		}catch(RuntimeException e){
			LOG.error("删除成本调整单失败！:{}",e);
			return RespJson.error(e.getMessage());
		}
		catch(Exception e){
			LOG.error("解除绑定操作失败！:{}",e);
			return RespJson.error("解除绑定操作失败！");
		}
	}
}
