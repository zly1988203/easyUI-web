
package com.okdeer.jxc.controller.settle.supplier;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.constant.ExportExcelConstant;
import com.okdeer.jxc.common.constant.LogConstant;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.DateUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.controller.BaseController;
import com.okdeer.jxc.settle.supplier.qo.SupplierAccountCurrentQo;
import com.okdeer.jxc.settle.supplier.service.SupplierAccountCurrentService;
import com.okdeer.jxc.settle.supplier.vo.SupplierAccountCurrentVo;

/***
 * 
 *<p></p>
 * ClassName: SupplierAccountCurrentController 
 * @Description: 供应商往来账单
 * @author xuyq
 * @date 2017年5月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@RestController
@RequestMapping("/settle/supplierAccountCurrent")
public class SupplierAccountCurrentController extends BaseController<SupplierAccountCurrentController> {

	private static final Logger logger = LoggerFactory.getLogger(SupplierAccountCurrentController.class);

	/**
	 * SupplierAccountCurrentService
	 */
	@Reference(version = "1.0.0", check = false)
	private SupplierAccountCurrentService supplierAccountCurrentService;

	/**
	 * 
	 * @Description: 供应商往来账单列表页
	 * @param model model
	 * @return ModelAndView
	 * @author xuyq
	 * @date 2017年5月22日
	 */
	@RequestMapping(value = "accountCurrentList")
	public ModelAndView accountCurrentList(Model model) {
		return new ModelAndView("settle/supplier/account/accountList");
	}

	/**
	 * @Description: 查询列表
	 * @param qo 参数qo
	 * @param pageNumber 页码
	 * @param pageSize 页数
	 * @return PageUtils
	 * @author xuyq
	 * @date 2017年3月7日
	 */
	@RequestMapping(value = "getAccountCurrentList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<SupplierAccountCurrentVo> getAccountCurrentList(SupplierAccountCurrentQo qo,
			@RequestParam(value = "page", defaultValue = PAGE_NO) int pageNumber,
			@RequestParam(value = "rows", defaultValue = PAGE_SIZE) int pageSize) {
		try {
			qo.setPageNumber(pageNumber);
			qo.setPageSize(pageSize);
			LOG.debug(LogConstant.OUT_PARAM, qo);
			PageUtils<SupplierAccountCurrentVo> advanceList = supplierAccountCurrentService
					.getAccountCurrentPageList(qo, Boolean.TRUE);
			LOG.debug(LogConstant.PAGE, advanceList.toString());
			return advanceList;
		} catch (Exception e) {
			LOG.error("供应商往来账款列表信息异常:{}", e);
		}
		return PageUtils.emptyPage();
	}

	@RequestMapping(value = "/exportAccountCurrentList")
	public RespJson export(SupplierAccountCurrentQo qo, HttpServletRequest request, HttpServletResponse response) {
		try {
			Optional<SupplierAccountCurrentQo> optional = Optional.ofNullable(qo);
			qo = optional.orElse(new SupplierAccountCurrentQo());
			// String branchCompleCode = request.getParameter("branchCompleCode");
			PageUtils<SupplierAccountCurrentVo> suppliers = supplierAccountCurrentService.getAccountCurrentPageList(qo,
					Boolean.FALSE);
			List<SupplierAccountCurrentVo> list = suppliers.getList();
			if (!list.isEmpty() && list.size() > 0) {
				String fileName = null;
				String templateName = null;

				if (1 == qo.getRadioType()) {
					fileName = "到期账款" + "_" + DateUtils.getCurrSmallStr();
					templateName = ExportExcelConstant.EXPIRE_ACCOUNTS_PAYABLE;
				} else if (2 == qo.getRadioType()) {
					fileName = "历史往来账款" + "_" + DateUtils.getCurrSmallStr();
					templateName = ExportExcelConstant.DEALINGS_ACCOUNTS_PAYABLE;
				} else if (3 == qo.getRadioType()) {
					fileName = "未付款账款汇总" + "_" + DateUtils.getCurrSmallStr();
					templateName = ExportExcelConstant.UNPAID_ACCOUNTS_PAYABLE;
				} else if (4 == qo.getRadioType()) {
					fileName = "未付款账款明细" + "_" + DateUtils.getCurrSmallStr();
					templateName = ExportExcelConstant.UNPAID_ACCOUNTS_PAYABLE_DETAIL;
				} else if (5 == qo.getRadioType()) {
					fileName = "已付账款汇总" + "_" + DateUtils.getCurrSmallStr();
					templateName = ExportExcelConstant.PAID_ACCOUNTS_PAYABLE;
				} else if (6 == qo.getRadioType()) {
					fileName = "已付账款明细" + "_" + DateUtils.getCurrSmallStr();
					templateName = ExportExcelConstant.PAID_ACCOUNTS_PAYABLE_DETAIL;
				} else if (7 == qo.getRadioType()) {
					fileName = "预付账款明细" + "_" + DateUtils.getCurrSmallStr();
					templateName = ExportExcelConstant.ADVANCE_ACCOUNTS_PAYABLE_DETAIL;
				}

				exportListForXLSX(response, list, fileName, templateName);
			} else {
				return RespJson.error("无数据可导");
			}
		} catch (Exception e) {
			logger.error("一开通账户管理导出异常:", e);
			RespJson json = RespJson.error("导出失败");
			return json;
		}
		return null;
	}
}
