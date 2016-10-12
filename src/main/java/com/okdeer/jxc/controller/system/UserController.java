
package com.okdeer.jxc.controller.system;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.ImportExcelConstant;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.EasyUiUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.goods.entity.GoodsSku;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.system.service.SysUserServiceApi;
import com.okdeer.jxc.system.vo.SysUserVo;

/**
 * ClassName: UserController 
 * @Description: 用户Controller
 * @author liwb
 * @date 2016年8月18日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 商业管理系统1.0.0	  2016年8月18日			 liwb			    用户Controller
 */

@Controller
@RequestMapping("system/user")
public class UserController extends BaseController<UserController> {

	@Reference(version = "1.0.0", check = false)
	private SysUserServiceApi sysUserService;

	/**
	 * 默认页面
	 */
	@RequestMapping(method = RequestMethod.GET)
	public String list() {
		return "system/userList";
	}

	/**
	 * @Description: 获取用户json
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return
	 * @author liwb
	 * @date 2016年8月20日
	 */
	@RequestMapping(value = "/json")
	@ResponseBody
	public PageUtils<SysUser> getData(
			SysUserVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {

			GoodsSku goods = new GoodsSku();

			goods.setSalePrice(BigDecimal.TEN);
			goods.setVipPrice(BigDecimal.TEN);
			goods.setPurchasePrice(BigDecimal.TEN);
			goods.setDistributionPrice(BigDecimal.TEN);
			goods.setWholesalePrice(BigDecimal.TEN);
			goods.setLowestPrice(BigDecimal.TEN);

			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			return sysUserService.queryLists(vo);
		} catch (Exception e) {
			LOG.error("查询用户信息异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 公共选择采购员,区域，机构页面， 区域有选择的checkBranch
	 * @return   
	 * @author zhangchm lijy02
	 * @date 2016年7月21日 2016年8月18日
	 */
	@RequestMapping(value = "views")
	public String views(String type, String check, Model model) {
		if (StringUtils.isNotEmpty(check)) {
			model.addAttribute("check", check);
		}
		model.addAttribute("type", type);
		return "component/publicOperator";
	}

	/**
	 * @Description: 根据登录用户关联店铺查询该店铺下所有人员
	 * @param vo
	 * @param pageNumber
	 * @param pageSize
	 * @return   
	 * @author zhangchm
	 * @date 2016年7月28日
	 */
	@RequestMapping(value = "getOperator")
	@ResponseBody
	public PageUtils<SysUser> getOperator(
			SysUserVo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.debug("获取操作员查询参数:{}" , vo);
		try {
			vo.setPageNumber(pageNumber);
			vo.setPageSize(pageSize);
			vo.setBranchId(super.getCurrBranchId());
			return sysUserService.queryLists(vo);
		} catch (Exception e) {
			LOG.error("查询操作员异常:", e);
		}
		return PageUtils.emptyPage();
	}

	/**
	 * @Description: 导出用户信息列表
	 * @param request
	 * @param response
	 * @param vo
	 * @return
	 * @author liwb
	 * @date 2016年8月20日
	 */
	@RequestMapping(value = "/exportList")
	@ResponseBody
	public String exportList(
			HttpServletResponse response, SysUserVo vo) {

		LOG.info("用户导出接口参数 vo=" + vo);
		try {
			// 数据集合
			List<SysUser> exportList = sysUserService.getUserList(vo);

			// 导出文件名称，不包括后缀名
			String fileName = "用户信息列表" + "_" + DateUtils.getCurrSmallStr();

			// 模板名称，包括后缀名
			String templateName = ExportExcelConstant.USER_LIST;

			// 导出Excel
			exportListForXLSX(response, exportList, fileName, templateName);
		} catch (Exception e) {
			LOG.error("用户导出异常:", e);
		}
		return null;
	}

	@RequestMapping(value = "/importList", method = RequestMethod.POST)
	@ResponseBody
	public String importList(@RequestParam("file") MultipartFile file) {

		try {
			if (file.isEmpty()) {
				LOG.info("file is empty");
				return EasyUiUtils.FAILURE;
			}

			// 用户信息导入字段名信息
			String[] fields = ImportExcelConstant.USER_LIST_FIELDS;

			// 文件流
			InputStream is = file.getInputStream();

			// 获取文件名
			String fileName = file.getOriginalFilename();

			// 解析Excel
			List<SysUser> userList = parseExcel(fileName, is, fields,
					new SysUser());

			for (SysUser user : userList) {
				LOG.info("user:" + user);
			}
			return EasyUiUtils.SUCCESS;
		} catch (IOException e) {
			LOG.error("读取Excel流异常:", e);
		} catch (Exception e) {
			LOG.error("用户导入异常:", e);
		}
		return EasyUiUtils.FAILURE;
	}

}
