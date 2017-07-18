/** 
 *@Project: okdeer-jxc-web 
 *@Author: liwb
 *@Date: 2017年5月23日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.branch;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.qo.BranchGroupQo;
import com.okdeer.jxc.branch.service.BranchGroupServiceApi;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.StringUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: BranchController 
 * @Description: 机构资料Controller
 * @author liwb
 * @date 2017年5月23日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

@Controller
@RequestMapping("branch/branchGroupSelect")
public class BranchGroupSelectController extends BaseController<BranchGroupSelectController> {

	@Reference(version = "1.0.0", check = false)
	BranchGroupServiceApi branchGroupServiceApi;

	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesService;

	@RequestMapping(value = "view")
	public String view() {
		return "component/branchGroupSelect";
	}

	/**
	 * @Description: 查询机构分组列表
	 * @return   
	 * @return PageUtils<GoodsSku>  
	 * @throws
	 * @author yangyq02
	 * @date 2016年10月25日
	 */
	@RequestMapping(value = "queryList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<Branches> queryList(BranchGroupQo vo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		LOG.debug("查询机构参数:{}", vo.toString() + "pageNumber:" + pageNumber + "pageSize:" + pageSize);
		vo.setPageNumber(pageNumber);
		vo.setPageSize(pageSize);
		// 根据类型查询不同数据
		if (vo.getType()==1) {
			return branchGroupServiceApi.queryGroupAsBranchList(vo);
		} else {
			if (2==vo.getType()) {
				vo.setBranchType(BranchTypeEnum.SELF_STORE.getCode());
			} else if (3==vo.getType()) {
				vo.setBranchType(BranchTypeEnum.FRANCHISE_STORE_B.getCode());
			} else if (4==vo.getType()) {
				vo.setBranchType(BranchTypeEnum.FRANCHISE_STORE_C.getCode());
			}

			//兼容之前的机构选择的公共组件
			vo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
			/*vo.setType(UserUtil.getCurrBranchType());*/
			if (StringUtils.isEmpty(vo.getBranchId())) {
				vo.setBranchId(UserUtil.getCurrBranchId());
			}
			// 查询分公司、物流中心
			if ("DZ".equals(vo.getFormType())) {
				vo.setType(null);
			}
			// 查询总部、分公司
			if ("DV".equals(vo.getFormType())) {
				vo.setBranchId(UserUtil.getCurrBranchId());
			}

			// 3.自营店、4.加盟店B、5.加盟店C
			if ("DD".equals(vo.getFormType())) {
				// vo.setBranchId(UserUtil.getCurrBranchParentId());
				vo.setBranchType(null);
				vo.setBranchTypes(new int[] { 3, 4, 5 });
				String branchCompleCode = UserUtil.getCurrBranchCompleCode();
				if (org.apache.commons.lang3.StringUtils.isNoneEmpty(branchCompleCode) && branchCompleCode.length() > 5) {
					branchCompleCode = branchCompleCode.substring(0, branchCompleCode.length() - 5);
				}
				vo.setBranchCompleCode(branchCompleCode);
			}
			// 如果是仓库商品查询，则只能查询分公司及其物流中心
			if ("SR".equals(vo.getFormType())) {
				if (UserUtil.getCurrBranchType() == 0 || UserUtil.getCurrBranchType() == 1
						|| UserUtil.getCurrBranchType() == 1) {
					vo.setBranchCompleCode(UserUtil.getCurrBranchCompleCode());
				} else {
					String branchCompleCode = UserUtil.getCurrBranchCompleCode();
					vo.setBranchCompleCode(branchCompleCode.substring(0, branchCompleCode.length() - 5));
				}
				vo.setBranchType(null);
				vo.setBranchTypes(new int[] { 0, 1, 2 });
			}

			// 如果不为空，则设置多个机构条件
			if (( vo.getBranchType()==null)&&  (vo.getBranchTypes() == null || vo.getBranchTypes().length == 0)
					) {
				// 设置多个机构类型条件
				vo.setBranchTypes(strArrToIntArr(vo.getBranchTypesStr()));
			}

			PageUtils<Branches> suppliers = PageUtils.emptyPage();
			if (vo.getScope() != null && vo.getScope() == 1) {
				suppliers = branchesService.queryBranchAllLists(vo);
			} else {
				suppliers = branchesService.queryLists(vo);
			}
			LOG.debug("机构列表：{}", suppliers);
			return suppliers;

		}
	}

	/***
	 * 
	 * @Description: 数组类型转换
	 * @param branchTypesStr
	 * @return
	 * @author xuyq
	 * @date 2017年6月7日
	 */
	private int[] strArrToIntArr(String branchTypesStr) {
		int[] resultArr = null;
		if (StringUtils.isBlank(branchTypesStr)) {
			return resultArr;
		}
		String[] tempArr = branchTypesStr.split(",");
		if (tempArr == null || tempArr.length == 0) {
			return resultArr;
		}
		resultArr = new int[tempArr.length];
		for (int i = 0; i < tempArr.length; i++) {
			resultArr[i] = Integer.parseInt(tempArr[i]);
		}
		return resultArr;
	}

}
