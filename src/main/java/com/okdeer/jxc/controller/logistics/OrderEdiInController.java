package com.okdeer.jxc.controller.logistics;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.dubbo.config.annotation.Reference;
import com.okdeer.jxc.common.enums.DeliverAuditStatusEnum;
import com.okdeer.jxc.common.enums.DeliverStatusEnum;
import com.okdeer.jxc.common.enums.FormSourcesEnum;
import com.okdeer.jxc.common.enums.IsReference;
import com.okdeer.jxc.common.result.RespJson;
import com.okdeer.jxc.common.utils.OrderNoUtils;
import com.okdeer.jxc.common.utils.UUIDHexGenerator;
import com.okdeer.jxc.form.deliver.entity.DeliverForm;
import com.okdeer.jxc.form.deliver.entity.DeliverFormList;
import com.okdeer.jxc.form.deliver.service.DeliverFormServiceApi;
import com.okdeer.jxc.form.deliver.service.QueryDeliverFormListServiceApi;
import com.okdeer.jxc.form.deliver.vo.DeliverFormListVo;
import com.okdeer.jxc.form.deliver.vo.DeliverFormVo;
import com.okdeer.jxc.form.entity.PurchaseForm;
import com.okdeer.jxc.form.entity.PurchaseFormDetail;
import com.okdeer.jxc.form.enums.FormStatus;
import com.okdeer.jxc.form.enums.FormType;
import com.okdeer.jxc.form.purchase.qo.PurchaseFormDetailPO;
import com.okdeer.jxc.form.purchase.qo.PurchaseFormPO;
import com.okdeer.jxc.form.purchase.service.PurchaseFormServiceApi;
import com.okdeer.jxc.system.entity.SysUser;
import com.okdeer.jxc.utils.UserUtil;
import com.okdeer.jxc.utils.poi.ExcelReaderUtil;

/**
 * 
 * ClassName: OrderEdiController 
 * @Description: 物流订单EDI导入
 * @author zhangq
 * @date 2017年8月21日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */
@Controller
@RequestMapping("logistic/ediIn")
public class OrderEdiInController {

	@Reference(version = "1.0.0", check = false)
	private PurchaseFormServiceApi purchaseFormServiceApi;

	@Reference(version = "1.0.0", check = false)
	private DeliverFormServiceApi deliverFormServiceApi;

	@Reference(version = "1.0.0", check = false)
	private QueryDeliverFormListServiceApi queryDeliverFormListServiceApi;

	@Autowired
	private OrderNoUtils orderNoUtils;

	/**
	 * 
	 * @Description: 跳转页面
	 * @return String  
	 * @author zhangq
	 * @date 2017年8月21日
	 */
	@RequestMapping
	public String index() {
		return "logistics/ediImport";
	}

	/**
	 * 
	 * @Description: 导入   
	 * @return void  
	 * @author zhangq
	 * @date 2017年8月21日
	 */
	@RequestMapping(value = "importList")
	@ResponseBody
	public RespJson importExcel(@RequestParam("file") MultipartFile[] files) {
		RespJson respJson = RespJson.success("导入成功");
		Set<String> successForm = new HashSet<String>();
		try {
			for (MultipartFile file : files) {
				if (!file.isEmpty()) {
					String fileName = file.getOriginalFilename();
					if (fileName.contains("采购单")) {
						savePiForm(file, successForm);
					} else if (fileName.contains("销售单")) {
						saveDoForm(file, successForm);
					} else if (fileName.contains("配送点退货单")) {

					} else if (fileName.contains("供应商退货单")) {

					}
				}
			}
		} catch (IOException e) {
			if (successForm.isEmpty()) {
				respJson = RespJson.error("导入失败");
			} else {
				respJson = RespJson.success("导入部分成功，成功单据为：" + successForm);
			}
		}
		return respJson;
	}

	/**
	 * 
	 * @Description: 保存采购入库单
	 * @param file
	 * @throws IOException   
	 * @return void  
	 * @author zhangq
	 * @date 2017年8月23日
	 */
	private void savePiForm(MultipartFile file, Set<String> successForm) throws IOException {
		// 当前用户
		SysUser user = UserUtil.getCurrentUser();

		// 文件流
		InputStream is = file.getInputStream();

		// 表头
		int[] cellNums = new int[] { 5, 13, 16, 25, 26 };
		String[] fields = new String[] { "formNo", "skuCode", "barCode", "giftNum", "num" };

		// 解析Excel
		List<ImportEntity> xlsList = ExcelReaderUtil.readXls(is, 3, 1, cellNums, fields, new ImportEntity());

		// 按订单分类，Key：单据号，Value：解析值
		Map<String, Map<String, ImportEntity>> formMap = convertToMap(xlsList);

		// 遍历
		for (Map.Entry<String, Map<String, ImportEntity>> entry : formMap.entrySet()) {
			// 单号
			String formNo = entry.getKey();

			// 查询采购申请单
			PurchaseFormPO paForm = purchaseFormServiceApi.selectPOByFormNo(formNo);
			// 查询采购申请单明细
			List<PurchaseFormDetailPO> paDetailList = purchaseFormServiceApi.selectDetailByFormNo(formNo);

			// 采购申请单明细按“货号_是否赠品”转换为map，方便查询
			Map<String, PurchaseFormDetailPO> paDetailMap = new HashMap<String, PurchaseFormDetailPO>();
			for (PurchaseFormDetailPO detail : paDetailList) {
				// 货号
				String skuCode = detail.getSkuCode();
				// 是否赠品
				Integer isGift = detail.getIsGift();
				// KEY：货号_是否赠品，VALUE：采购申请单明细
				paDetailMap.put(skuCode + "_" + isGift, detail);
			}

			// 采购入库单
			PurchaseForm piForm = createPi(paForm);
			// 采购收货单明细
			int rowNo = 0;
			BigDecimal totalNum = BigDecimal.ZERO;
			BigDecimal amount = BigDecimal.ZERO;
			List<PurchaseFormDetail> piDetailList = new ArrayList<PurchaseFormDetail>();
			Map<String, ImportEntity> importList = formMap.get(formNo);
			for (Map.Entry<String, ImportEntity> entryEntity : importList.entrySet()) {
				String skuCode = entryEntity.getKey();
				ImportEntity entity = entryEntity.getValue();
				entity.setNum(entity.getNum().subtract(entity.getGiftNum()));
				// 采购入库正常商品明细
				if (entity.getNum().compareTo(BigDecimal.ZERO) > 0) {
					PurchaseFormDetailPO paDetail = paDetailMap.get(skuCode + "_" + "0");
					if (null != paDetail) {
						// 采购入库单明细
						PurchaseFormDetail formDetail = createPiDetail(piForm.getId(), paDetail, entity, 0, ++rowNo,
								user.getId());
						// 添加到列表
						piDetailList.add(formDetail);

						totalNum = totalNum.add(formDetail.getDealNum());
						amount = amount.add(formDetail.getAmount());
					}
				}

				// 采购入库赠品明细
				if (entity.getGiftNum().compareTo(BigDecimal.ZERO) > 0) {
					PurchaseFormDetailPO paDetail = paDetailMap.get(skuCode + "_" + "1");
					if (null != paDetail) {
						// 采购入库单明细
						PurchaseFormDetail formDetail = createPiDetail(piForm.getId(), paDetail, entity, 1, ++rowNo,
								user.getId());
						// 添加到列表
						piDetailList.add(formDetail);

						totalNum = totalNum.add(formDetail.getDealNum());
						amount = amount.add(formDetail.getAmount());
					}
				}
			}
			piForm.setTotalNum(totalNum);
			piForm.setAmount(amount);
			purchaseFormServiceApi.save(piForm, piDetailList);
			successForm.add(piForm.getFormNo());
		}
	}

	/**
	 * 
	 * @Description: 保存配送出库单（物流销售出库单）
	 * @param file   
	 * @return void  
	 * @author zhangq
	 * @throws IOException 
	 * @date 2017年8月23日
	 */
	private void saveDoForm(MultipartFile file, Set<String> successForm) throws IOException {
		// 当前用户
		SysUser user = UserUtil.getCurrentUser();

		// 文件流
		InputStream is = file.getInputStream();

		// 表头
		int[] cellNums = new int[] { 13, 29, 33, 39, 40 };
		String[] fields = new String[] { "formNo", "skuCode", "barCode", "giftNum", "num" };

		// 解析Excel
		List<ImportEntity> list = ExcelReaderUtil.readXls(is, 3, 1, cellNums, fields, new ImportEntity());

		// 按订单分类，Key：采购申请单单号，Value：解析的值
		Map<String, Map<String, ImportEntity>> formMap = convertToMap(list);

		// 遍历
		for (Map.Entry<String, Map<String, ImportEntity>> entry : formMap.entrySet()) {
			// 要说申请单单号
			String daFormNo = entry.getKey();
			// 要货申请单
			DeliverForm daForm = deliverFormServiceApi.queryDeliverFormByFormNo(daFormNo);
			// 要货申请单明细
			List<DeliverFormList> daDetailList = queryDeliverFormListServiceApi.getDeliverListByFormNo(daFormNo);

			// 要货申请单明细按“货号_是否赠品”转换为map，方便查询
			Map<String, DeliverFormList> daDetailMap = new HashMap<String, DeliverFormList>();
			for (DeliverFormList detail : daDetailList) {
				// 货号
				String skuCode = detail.getSkuCode();
				// 是否赠品
				Integer isGift = Integer.valueOf(detail.getIsGift());
				// KEY：货号_是否赠品，VALUE：采购申请单明细
				daDetailMap.put(skuCode + "_" + isGift, detail);
			}

			// 配送出库单
			DeliverFormVo doForm = createDo(daForm);

			// 配送出库单明细
			int rowNo = 0;
			BigDecimal totalNum = BigDecimal.ZERO;
			BigDecimal amount = BigDecimal.ZERO;
			List<DeliverFormListVo> detailList = new ArrayList<DeliverFormListVo>();
			for (Map.Entry<String, ImportEntity> entryEntity : entry.getValue().entrySet()) {
				// 货号
				String skuCode = entryEntity.getKey();
				// 导入实体类
				ImportEntity entity = entryEntity.getValue();
				entity.setNum(entity.getNum().subtract(entity.getGiftNum()));
				
				// 采购入库正常商品明细
				if (entity.getNum().compareTo(BigDecimal.ZERO) > 0) {
					DeliverFormList daDetail = daDetailMap.get(skuCode + "_" + "0");
					if (null != daDetail) {
						// 采购入库单明细
						DeliverFormListVo formDetail = createDoDetail(doForm, daDetail, entity, 0, ++rowNo,
								user.getId());
						// 添加到列表
						detailList.add(formDetail);

						totalNum = totalNum.add(formDetail.getDealNum());
						amount = amount.add(formDetail.getAmount());
					}
				}

				// 采购入库赠品明细
				if (entity.getGiftNum().compareTo(BigDecimal.ZERO) > 0) {
					DeliverFormList daDetail = daDetailMap.get(skuCode + "_" + "1");
					if (null != daDetail) {
						// 采购入库单明细
						DeliverFormListVo formDetail = createDoDetail(doForm, daDetail, entity, 1, ++rowNo,
								user.getId());
						// 添加到列表
						detailList.add(formDetail);

						totalNum = totalNum.add(formDetail.getDealNum());
						amount = amount.add(formDetail.getAmount());
					}
				}
			}

			doForm.setTotalNum(totalNum);
			doForm.setAmount(amount);
			doForm.setDeliverFormListVo(detailList);

			deliverFormServiceApi.insertForm(doForm);
			successForm.add(doForm.getFormNo());
		}
	}

	/**
	 * 
	 * @Description: 创建采购入库单对象
	 * @param paForm
	 * @return PurchaseForm  
	 * @author zhangq
	 * @date 2017年8月24日
	 */
	private PurchaseForm createPi(PurchaseFormPO paForm) {
		// 当前用户
		SysUser user = UserUtil.getCurrentUser();
		// 当前时间
		Date now = new Date();
		// 入库单ID
		String formId = UUIDHexGenerator.generate();
		// 入库单单号
		String piFormNo = orderNoUtils.getOrderNo(FormType.PI.name() + user.getBranchCode());

		// 采购入库单
		PurchaseForm form = new PurchaseForm();
		form.setId(formId); // 入库单ID
		form.setRefFormNo(paForm.getFormNo()); // 引用单号
		form.setIsRef(0); // 是否引入
		form.setFormType(FormType.PI); // 单据类型：采购入库单
		form.setFormNo(piFormNo); // 入库单单号
		form.setIo(1); // 库存增加
		form.setBranchId(paForm.getBranchId()); // 机构ID
		form.setSupplierId(paForm.getSupplierId()); // 供应商ID
		form.setRemark("物流系统导入。");
		form.setCreaterBranchId(user.getBranchId()); // 创建机构ID：当前操作人机构ID
		form.setStatus(FormStatus.WAIT_CHECK.getValue()); // 审核状态：待审核
		form.setDealStatus(0); // 处理状态：未处理
		form.setDisabled(0); // 删除状态：未删除
		form.setCreateUserId(user.getId()); // 创建人ID
		form.setCreateTime(now); // 创建时间：当前时间
		form.setUpdateUserId(user.getId()); // 更新人ID
		form.setUpdateTime(now); // 更新时间：当前时间

		return form;
	}

	/**
	 * 
	 * @Description: 创建采购入库单明细对象
	 * @param piFormId
	 * @param paDetail
	 * @param importEntity
	 * @param isGift
	 * @param rowNo
	 * @param userId
	 * @return PurchaseFormDetail  
	 * @author zhangq
	 * @date 2017年8月24日
	 */
	private PurchaseFormDetail createPiDetail(String piFormId, PurchaseFormDetailPO paDetail, ImportEntity importEntity,
			Integer isGift, int rowNo, String userId) {
		// 数量
		BigDecimal num = BigDecimal.ZERO;
		if (isGift == 0) {
			num = importEntity.getNum();
		} else {
			num = importEntity.getGiftNum();
		}
		// 采购入库单明细
		PurchaseFormDetail formDetail = new PurchaseFormDetail();
		formDetail.setId(UUIDHexGenerator.generate()); // 明细ID
		formDetail.setFormId(piFormId); // 入库单ID
		formDetail.setSkuId(paDetail.getSkuId()); // 商品ID
		formDetail.setSkuCode(paDetail.getSkuCode()); // 商品货号
		formDetail.setBarCode(paDetail.getBarCode()); // 商品条码
		formDetail.setRowNo(rowNo); // 行号
		formDetail.setDealNum(num); // 已处理数量（被引用后处理的数量）
		formDetail.setLargeNum(num.divide(paDetail.getPurchaseSpec(), 4,RoundingMode.HALF_UP)); // 箱数
		formDetail.setRealNum(num); // 数量
		formDetail.setOriginalPrice(paDetail.getOriginalPrice()); // 原价
		formDetail.setPrice(paDetail.getPrice()); // 单价
		formDetail.setPriceBack(paDetail.getPriceBack()); // 单价备份
		formDetail.setSalePrice(paDetail.getSalePrice()); // 销售价
		formDetail.setAmount(num.multiply(paDetail.getPrice())); // 金额
		formDetail.setTax(paDetail.getTax()); // 税率
		formDetail.setIsGift(isGift); // 是否赠品
		formDetail.setRemark(paDetail.getRemark()); // 备注

		formDetail.setCreateTime(new Date()); // 创建时间：当前时间
		formDetail.setCreateUserId(userId); // 创建人ID
		formDetail.setUpdateTime(new Date()); // 更新时间
		formDetail.setUpdateUserId(userId); // 更新人ID
		formDetail.setDisabled(0); // 删除状态：未删除

		return formDetail;
	}

	/**
	 * 
	 * @Description: 创建配送出库单对象
	 * @param daForm
	 * @return DeliverFormVo  
	 * @author zhangq
	 * @date 2017年8月24日
	 */
	private DeliverFormVo createDo(DeliverForm daForm) {
		// 当前用户
		SysUser user = UserUtil.getCurrentUser();
		// 当前时间
		Date now = new Date();
		// 配送出库单ID
		String formId = UUIDHexGenerator.generate();
		// 配送出库单单号
		String doFormNo = orderNoUtils.getOrderNo(FormType.DO.name() + user.getBranchCode());

		// 配送出库单
		DeliverFormVo doForm = new DeliverFormVo();
		doForm.setId(formId);
		doForm.setDeliverFormId(formId); // 单据ID
		doForm.setFormNo(doFormNo); // 单据编号
		doForm.setFormType(FormType.DO.name()); // 单据类型：配送出库单
		doForm.setIo("0"); // 库存减少
		doForm.setStatus(DeliverAuditStatusEnum.WAIT_CHECK.getIndex()); // 状态：待审核
		doForm.setDealStatus(DeliverStatusEnum.PENDING.getIndex()); // 处理状态：待处理
		doForm.setIsReference(IsReference.NO.getIndex());
		doForm.setCreaterBranchId(UserUtil.getCurrBranchId());
		doForm.setValue(user.getId(), user.getId(), null, null);
		doForm.setFormSources(FormSourcesEnum.SYSTEM.getKey());
		doForm.setReferenceId(daForm.getDeliverFormId()); // 引用单ID
		doForm.setReferenceNo(daForm.getFormNo()); // 引用单编号
		doForm.setCreateUserId(user.getId()); // 创建用户ID
		doForm.setCreateTime(now); // 创建用户时间
		doForm.setUpdateUserId(user.getId()); // 修改用户ID
		doForm.setUpdateTime(now); // 修改时间
		doForm.setDisabled(0); // 删除状态：未删除
		doForm.setSourceBranchId(daForm.getSourceBranchId());
		doForm.setTargetBranchId(daForm.getTargetBranchId());
		return doForm;
	}

	/**
	 * 
	 * @Description: 创建配送出库明细对象
	 * @param piFormId
	 * @param daDetail
	 * @param importEntity
	 * @param isGift
	 * @param rowNo
	 * @param userId
	 * @return DeliverFormListVo 
	 * @author zhangq
	 * @date 2017年8月24日
	 */
	private DeliverFormListVo createDoDetail(DeliverFormVo doForm, DeliverFormList daDetail, ImportEntity importEntity,
			Integer isGift, int rowNo, String userId) {
		// 数量
		BigDecimal num = BigDecimal.ZERO;
		if (isGift == 0) {
			num = importEntity.getNum();
		} else {
			num = importEntity.getGiftNum();
		}

		// 配送出库单明细
		DeliverFormListVo formDetail = new DeliverFormListVo();
		formDetail.setDeliverFormListId(UUIDHexGenerator.generate()); // 明细ID
		formDetail.setFormId(doForm.getId()); // 出库单ID
		formDetail.setFormNo(doForm.getFormNo()); // 出库单单号
		formDetail.setSkuId(daDetail.getSkuId()); // 商品ID
		formDetail.setSkuName(daDetail.getSkuName()); // 商品名称
		formDetail.setSpec(daDetail.getSpec());
		formDetail.setSkuCode(daDetail.getSkuCode()); // 商品货号
		formDetail.setBarCode(daDetail.getBarCode()); // 商品条码
		formDetail.setRowNo(rowNo); // 行号
		formDetail.setDealNum(num); // 已处理数量（被引用后处理的数量）
		formDetail.setLargeNum(num.divide(daDetail.getDistributionSpec(), 4,RoundingMode.HALF_UP)); // 箱数
		formDetail.setRealNum(num); // 数量
		formDetail.setOriginalPrice(daDetail.getOriginalPrice()); // 原价
		formDetail.setPrice(daDetail.getPrice()); // 单价
		formDetail.setPriceBack(daDetail.getPriceBack()); // 单价备份
		formDetail.setSalePrice(daDetail.getSalePrice()); // 销售价
		formDetail.setAmount(num.multiply(daDetail.getPrice())); // 金额
		formDetail.setIsGift(isGift.toString()); // 是否赠品
		formDetail.setRemark(daDetail.getRemark()); // 备注
		formDetail.setApplyNum(daDetail.getApplyNum()); // 申请储量
		formDetail.setInputTax(daDetail.getInputTax()); // 税率
		formDetail.setDistributionSpec(daDetail.getDistributionSpec()); // 配送规格

		return formDetail;
	}

	private Map<String, Map<String, ImportEntity>> convertToMap(List<ImportEntity> list) {
		// 按订单分类，Key：单据号，Value：解析值
		Map<String, Map<String, ImportEntity>> formMap = new HashMap<String, Map<String, ImportEntity>>();
		for (ImportEntity entity : list) {
			String formNo = entity.getFormNo();
			if (!formMap.containsKey(formNo)) {
				Map<String, ImportEntity> map = new HashMap<String, ImportEntity>();
				formMap.put(formNo, map);
			}

			// 根据货号汇总数据，零售不关注一品多码，需要将物流的一品多码汇总
			String skuCode = entity.getSkuCode();
			if (formMap.get(formNo).containsKey(skuCode)) {
				ImportEntity already = formMap.get(formNo).get(skuCode);
				already.setNum(already.getNum().add(entity.getNum()));
				already.setGiftNum(already.getGiftNum().add(entity.getGiftNum()));
				formMap.get(formNo).put(skuCode, already);
			} else {
				formMap.get(formNo).put(skuCode, entity);
			}
		}
		return formMap;
	}
}
