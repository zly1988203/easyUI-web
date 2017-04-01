/** 
 *@Project: okdeer-jxc-web 
 *@Author: zhengwj
 *@Date: 2017年3月28日 
 *@Copyright: ©2014-2020 www.okdeer.com Inc. All rights reserved. 
 */

package com.okdeer.jxc.controller.purchase;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.okdeer.jxc.branch.entity.Branches;
import com.okdeer.jxc.branch.service.BranchesServiceApi;
import com.okdeer.jxc.common.controller.BasePrintController;
import com.okdeer.jxc.common.enums.BranchTypeEnum;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.Disabled;
import com.okdeer.jxc.common.utils.OrderNoUtils;
import com.okdeer.jxc.common.utils.PageUtils;
import com.okdeer.jxc.common.utils.UUIDHexGenerator;
import com.okdeer.jxc.form.entity.PurchaseForm;
import com.okdeer.jxc.form.entity.PurchaseFormDetail;
import com.okdeer.jxc.form.enums.FormStatus;
import com.okdeer.jxc.form.enums.FormType;
import com.okdeer.jxc.form.purchase.qo.FormQueryQo;
import com.okdeer.jxc.form.purchase.qo.PurchaseFormDetailPO;
import com.okdeer.jxc.form.purchase.qo.PurchaseFormPO;
import com.okdeer.jxc.form.purchase.service.PurchaseFormServiceApi;
import com.okdeer.jxc.form.purchase.vo.PurchaseFormDetailVo;
import com.okdeer.jxc.form.purchase.vo.ReceiptFormVo;
import com.okdeer.jxc.goods.entity.GoodsBranchPriceVo;
import com.okdeer.jxc.goods.qo.GoodsBranchPriceQo;
import com.okdeer.jxc.goods.service.GoodsBranchPriceServiceApi;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;

/**
 * ClassName: DirectReceiptController 
 * @Description: 直送收货controller
 * @author zhengwj
 * @date 2017年3月28日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("directReceipt")
public class DirectReceiptController extends BasePrintController<DirectReceiptController, PurchaseFormDetailPO> {

	/**
	 * @Fields purchaseFormServiceApi : 收货单service
	 */
	@Reference(version = "1.0.0", check = false)
	private PurchaseFormServiceApi purchaseFormServiceApi;

	/**
	 * @Fields goodsBranchPriceService : 店铺商品价格service
	 */
	@Reference(version = "1.0.0", check = false)
	private GoodsBranchPriceServiceApi goodsBranchPriceService;

	/**
	 * @Fields branchesServiceApi : 机构service
	 */
	@Reference(version = "1.0.0", check = false)
	private BranchesServiceApi branchesServiceApi;

	/**
	 * @Fields orderNoUtils : 订单号工具
	 */
	@Autowired
	private OrderNoUtils orderNoUtils;

	/**
	 * @Description: 直送收货列表页面
	 * @author zhengwj
	 * @date 2017年3月30日
	 */
	@RequestMapping(value = "list")
	public String list() {
		return "form/purchase/directReceipt/directReceiptList";
	}

	/**
	 * @Description: 获取直送收货单列表
	 * @param qo 查询条件
	 * @author zhengwj
	 * @date 2017年3月30日
	 */
	@RequestMapping(value = "getList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<PurchaseFormPO> getList(FormQueryQo qo) {
		if (qo.getEndTime() != null) {
			// 结束日期加一天
			Calendar cal = Calendar.getInstance();
			cal.setTime(qo.getEndTime());
			cal.add(Calendar.DATE, 1);
			qo.setEndTime(cal.getTime());
		}
		// 直送收货单
		qo.setFormType(FormType.PM.toString());
		qo.setBranchCompleCode(getCurrBranchCompleCode());

		// 处理供应商
		String supplierName = qo.getSupplierName();
		if (StringUtils.isNotBlank(supplierName)) {
			supplierName = supplierName.substring(supplierName.lastIndexOf("]") + 1, supplierName.length());
			qo.setSupplierName(supplierName);
		}

		// 处理收货机构
		String branchName = qo.getBranchName();
		if (StringUtils.isNotBlank(branchName)) {
			branchName = branchName.substring(branchName.lastIndexOf("]") + 1, branchName.length());
			qo.setBranchName(branchName);
		}

		PageUtils<PurchaseFormPO> page = purchaseFormServiceApi.selectPage(qo);
		return page;
	}

	/**
	 * @Description: 新增直送收货列表页面
	 * @author zhengwj
	 * @date 2017年3月30日
	 */
	@RequiresPermissions("JxcDirectReceipt:add")
	@RequestMapping(value = "add")
	public String add() {
		return "form/purchase/directReceipt/directAdd";
	}

	/**
	 * @Description: 保存直送收货单
	 * @param jsonText 直送收货单
	 * @author zhengwj
	 * @date 2017年3月30日
	 */
	@RequestMapping(value = "save", method = RequestMethod.POST)
	@ResponseBody
	public RespJson save(@RequestBody String jsonText) {
		ReceiptFormVo formVo = JSON.parseObject(jsonText, ReceiptFormVo.class);

		// 验证商品
		List<String> skuIds = new ArrayList<String>();
		List<PurchaseFormDetailVo> detailList = formVo.getDetailList();
		for (PurchaseFormDetailVo detailVo : detailList) {
			skuIds.add(detailVo.getSkuId());
		}
		RespJson resp = saveValid(skuIds, formVo.getBranchId());
		if (!resp.isSuccess()) {
			return resp;
		}

		PurchaseForm form = new PurchaseForm();
		BeanUtils.copyProperties(formVo, form);

		String formId = UUIDHexGenerator.generate();
		SysUser user = UserUtil.getCurrentUser();
		String formNo = orderNoUtils.getOrderNoAll(FormType.PM.name() + user.getBranchCode(), 4);
		Date now = new Date();

		form.setId(formId);
		form.setFormType(FormType.PM);
		form.setFormNo(formNo);
		form.setIo(1);
		// 前端设置
		// branchId、supplierId、totalNum、amount、salesmanId、remark

		form.setCreaterBranchId(user.getBranchId());
		form.setStatus(FormStatus.WAIT_CHECK.getValue());
		form.setDealStatus(0);
		form.setDisabled(0);
		form.setCreateUserId(user.getId());
		form.setCreateTime(now);
		form.setUpdateUserId(user.getId());
		form.setUpdateTime(now);

		List<PurchaseFormDetail> list = new ArrayList<PurchaseFormDetail>();
		List<PurchaseFormDetailVo> listVo = formVo.getDetailList();
		for (PurchaseFormDetailVo purchaseFormDetailVo : listVo) {
			PurchaseFormDetail formDetail = new PurchaseFormDetail();
			BeanUtils.copyProperties(purchaseFormDetailVo, formDetail);
			formDetail.setId(UUIDHexGenerator.generate());
			formDetail.setFormId(formId);
			formDetail.setCreateTime(now);
			formDetail.setCreateUserId(user.getId());
			formDetail.setUpdateTime(now);
			formDetail.setUpdateUserId(user.getId());
			formDetail.setDisabled(0);
			list.add(formDetail);
		}

		// 保存订单
		RespJson respJson = purchaseFormServiceApi.save(form, list);
		if (respJson.isSuccess()) {
			respJson.put("formId", formId);
		}
		return respJson;
	}

	/**
	 * 
	 * @Description: 采购订单保存验证
	 * @return RespJson  
	 * @author zhangq
	 * @date 2017年3月16日
	 */
	public RespJson saveValid(List<String> skuIds, String branchId) {
		// 订单明细商品是否有停购或淘汰情况
		GoodsBranchPriceQo qo = new GoodsBranchPriceQo();
		// 所有商品ID
		qo.setGoodsStoreSkuIds(skuIds);
		// 机构ID
		qo.setBranchId(branchId);
		// 其他参数
		qo.setPage(1);
		qo.setRows(skuIds.size());
		// 查询商品信息
		PageUtils<GoodsBranchPriceVo> page = null;
		Branches branch = branchesServiceApi.getBranchInfoById(branchId);
		// 机构类型(0.总部、1.分公司、2.物流中心、3.自营店、4.加盟店B、5.加盟店C)
		if (BranchTypeEnum.SELF_STORE.getCode().equals(branch.getType())
				|| BranchTypeEnum.FRANCHISE_STORE_B.getCode().equals(branch.getType())
				|| BranchTypeEnum.FRANCHISE_STORE_C.getCode().equals(branch.getType())) {
			page = goodsBranchPriceService.queryBranchGoods(qo);
		} else {
			page = goodsBranchPriceService.queryBranchCompanyGoods(qo);
		}
		List<GoodsBranchPriceVo> list = page.getList();
		// 处理结果
		StringBuilder sb = new StringBuilder();
		for (GoodsBranchPriceVo branchGoodsVo : list) {
			// 停购
			if (branchGoodsVo.getStatus().equals("2")) {
				sb.append(branchGoodsVo.getSkuName() + "[" + branchGoodsVo.getSkuCode() + "]已停购；\n");
			}
			// 淘汰
			if (branchGoodsVo.getStatus().equals("3")) {
				sb.append(branchGoodsVo.getSkuName() + "[" + branchGoodsVo.getSkuCode() + "]已淘汰；\n");
			}
		}
		if (!sb.toString().equals("")) {
			return RespJson.error(sb.toString());
		}
		return RespJson.success();
	}

	/**
	 * @Description: 批量删除直送收货单
	 * @param formIds 单据id
	 * @author zhengwj
	 * @date 2017年3月30日
	 */
	@RequiresPermissions("JxcDirectReceipt:delete")
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public RespJson delete(@RequestParam(value = "formIds[]") List<String> formIds) {
		RespJson resp = new RespJson();
		if (!CollectionUtils.isEmpty(formIds)) {
			SysUser user = UserUtil.getCurrentUser();
			for (String formId : formIds) {
				resp = purchaseFormServiceApi.delete(formId, user.getId());
			}
		}
		return resp;
	}

	/**
	 * @Description: 编辑直送收货列表页面
	 * @author zhengwj
	 * @date 2017年3月30日
	 */
	@RequiresPermissions("JxcDirectReceipt:edit")
	@RequestMapping(value = "edit")
	public String edit(String formId, HttpServletRequest request) {
		PurchaseFormPO form = purchaseFormServiceApi.selectPOById(formId);
		if (form == null) {
			LOG.error("直送收货单数据为空：订单Id：{}", formId);
			return "/error/500";
		}
		// 如果已删除
		if (Disabled.INVALID.ordinal() == form.getDisabled().intValue()) {
			LOG.error("直送收货单已删除：订单Id：{}", formId);
			return "/error/500";
		}
		request.setAttribute("form", form);
		return "form/purchase/directReceipt/directEdit";
	}

	/**
	 * @Description: 获取订单详情列表
	 * @param formId 订单id
	 * @author zhengwj
	 * @date 2017年3月30日
	 */
	@RequestMapping(value = "getDetailList", method = RequestMethod.POST)
	@ResponseBody
	public PageUtils<PurchaseFormDetailPO> getDetailList(String formId) {
		PageUtils<PurchaseFormDetailPO> list = purchaseFormServiceApi.selectDetail(formId);
		return list;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.common.controller.BasePrintController#getPrintReplace(java.lang.String)
	 */
	@Override
	protected Map<String, Object> getPrintReplace(String formNo) {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * (non-Javadoc)
	 * @see com.okdeer.jxc.common.controller.BasePrintController#getPrintDetail(java.lang.String)
	 */
	@Override
	protected List<PurchaseFormDetailPO> getPrintDetail(String formNo) {
		// TODO Auto-generated method stub
		return null;
	}

}
