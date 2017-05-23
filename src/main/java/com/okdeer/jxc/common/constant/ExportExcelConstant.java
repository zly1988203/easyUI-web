
package com.okdeer.jxc.common.constant;

/**
 * ClassName: ExportExcelConstant 
 * @Description: 导出Excel常量类
 * @author liwb
 * @date 2016年8月22日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 商业管理系统1.0.0	  2016年8月18日			 liwb			     导出Excel常量类
 */

public interface ExportExcelConstant {

	/**
	 * @Fields TEMPLATE_DIR : 导出模板文件目录 /template/excel/
	 */
	String TEMPLATE_EXPORT_DIR = "/template/excel/export/";

	/**
	 * @Fields EXPORT_MAX_SIZE : 导出最大记录数
	 */
	int EXPORT_MAX_SIZE = 20001;

	/**
	 * @Fields EXPORT_SHEET_PAGE_SIZE : 每页显示大小，1000
	 */
	int EXPORT_SHEET_PAGE_SIZE = 1000;

	/**
	 * @Fields USER_LIST : 用户列表模板文件名称“UserList.xlsx”
	 */
	String USER_LIST = "UserList.xlsx";

	/**
	 * @Fields GOODS_PRICE_ADJUST_FORM : 调价单模版名称“GoodsPriceAdjustForm.xlsx”
	 */
	String GOODS_PRICE_ADJUST_FORM = "GoodsPriceAdjustForm.xlsx";

	/**
	 * @Fields GOODS_BRANCH_PRICE_ADJUST_FORM : 调价单模版名称“GoodsBranchPriceAdjustForm.xlsx”
	 */
	String GOODS_BRANCH_PRICE_ADJUST_FORM = "GoodsBranchPriceAdjustForm.xlsx";

	/**
	 * @Fields GOODS_PRICE_ADJUST_FORM : 采购明细表
	 */
	String PURCHASE_DETAIL_REPORT = "PurchaseDetail.xlsx";

	/**
	 * @Fields GOODS_PRICE_ADJUST_FORM_TEMPLE_SKUCODE : 调价单货号导入模板
	 */
	String GOODS_PRICE_ADJUST_FORM_TEMPLE_SKUCODE = "priceAdjustSkuTemp.xlsx";

	/**
	 * @Fields GOODS_PRICE_ADJUST_FORM_TEMPLE_BARCODE : 调价单条形码模板
	 */
	String GOODS_PRICE_ADJUST_FORM_TEMPLE_BARCODE = "priceAdjustBarTemp.xlsx";

	/**
	     * @Fields GOODS_BRANCH_PRICE_ADJUST_TEMPLE_SKUCODE : 门店调价单货号导入模板
	 */
	String GOODS_BRANCH_PRICE_ADJUST_TEMPLE_SKUCODE = "branchPriceAdjustSkuTemp.xlsx";

	/**
	 * @Fields GOODS_BRANCH_PRICE_ADJUST_TEMPLE_BARCODE : 门店调价单货号导入模板
	 */
	String GOODS_BRANCH_PRICE_ADJUST_TEMPLE_BARCODE = "branchPriceAdjustBarTemp.xlsx";

	/**
	 * @Fields GOODS_PRICE_ADJUST_FORM_TEMPLE_SKUCODE : 成本调价单货号导入模板
	 */
	String COST_GOODS_PRICE_ADJUST_FORM_TEMPLE_SKUCODE = "costPriceAdjustSkuTemp.xlsx";

	/**
	 * @Fields GOODS_PRICE_ADJUST_FORM_TEMPLE_BARCODE : 调价单条形码模板
	 */
	String COST_GOODS_PRICE_ADJUST_FORM_TEMPLE_BARCODE = "costPriceAdjustBarTemp.xlsx";

	/**
	 * 库存调整
	 */
	String STOCKADJUST = "StockAdjust.xlsx";

	/**
	 * @Fields STOCK_LEAD_SKU_TEMPLE : 领用单货号导入模板
	 */
	String STOCK_LEAD_SKU_TEMPLE = "StockLeadSkuTemple.xlsx";

	/**
	 * @Fields STOCK_LEAD_BAR_TEMPLE : 领用单条码导入模板
	 */
	String STOCK_LEAD_BAR_TEMPLE = "StockLeadBarTemple.xlsx";

	/**
	 * @Fields STOCKLEAD : 领用单导出模板
	 */
	String STOCKLEAD = "StockLead.xlsx";

	/**
	 * @Fields STOCK_REIMBURSE_SKU_TEMPLE : 报损单货号导入模板
	 */
	String STOCK_REIMBURSE_SKU_TEMPLE = "StockReimburseSkuTemple.xlsx";

	/**
	 * @Fields STOCK_REIMBURSE_BAR_TEMPLE : 报损单条码导入模板
	 */
	String STOCK_REIMBURSE_BAR_TEMPLE = "StockReimburseBarTemple.xlsx";

	/**
	 * @Fields STOCKREIMBURSE : 报损单导出模板
	 */
	String STOCKREIMBURSE = "StockReimburse.xlsx";

	/**
	 * 商品销售汇总
	 */
	String GOODS_SALE_REPORT = "goodsSaleReport.xlsx";

	String CATEGORY_SALE_REPORT = "categorySaleReport.xlsx";

	String STORE_DAY_SALE_REPORT = "storeDaySaleReport.xlsx";

	String GOODS_SALE_AMOUNT_REPORT = "goodsSaleAmountReport.xlsx";

	String POOL_SALE_REPORT = "poolSaleReport.xlsx";

	String GOODS_UNSALE_REPORT = "goodsUnsaleReport.xlsx";

	String DAY_REPORT = "dayReport.xlsx";

	String POOL_SALE_DETAIL_REPORT = "poolSaleDetailReport.xlsx";

	String GOODS_SALE_NUM_REPORT = "goodsSaleNumReport.xlsx";

	String GOODS_SALE_PROFIT_REPORT = "goodsSaleProfitReport.xlsx";

	String GOODS_OUT_IN_DETAIL_REPORT = "goodsOutInDetailReport.xlsx";

	String STOCK_ADJUST_SKU_TEMPLE = "StockAdjustSkuTemple.xlsx";

	String STOCK_ADJUST_BAR_TEMPLE = "StockAdjustBarTemple.xlsx";

	String GOODS_STATUS_SKU_TEMPLE = "GoodsStatusSkuTemple.xlsx";

	String GOODS_STATUS_BAR_TEMPLE = "GoodsStatusBarTemple.xlsx";

	/**
	 * @Fields BARCODE_TEMPLE_TYPE : 条形码模板类型
	 */
	String BARCODE_TEMPLE_TYPE = "barCodeTemple";

	/**
	 * @Fields SKUCODE_TEMPLE_TYPE : 货号模板类型
	 */
	String SKUCODE_TEMPLE_TYPE = "skuCodeTemple";

	/**
	 * @Fields BARCODE_TEMPLE : 条码导出模板
	 */
	String BARCODE_TEMPLE = "barCodeTemp.xlsx";

	/**
	 * @Fields SKUCODE_TEMPLE : 货号导出模板
	 */
	String SKUCODE_TEMPLE = "skuCodeTemp.xlsx";

	/**
	 * 商品档案导出模板
	 */
	String GOODS_EXPORT_EXCEL = "goodsExport.xlsx";

	/** 
	 * 商品存量修改-导入货号模板
	 */
	String STOCK_INDEX_SKU_TEMPLE = "StockIndexSkuTemple.xlsx";

	/**
	 * 商品存量修改-导入条码模板
	 */
	String STOCK_INDEX_BAR_TEMPLE = "StockIndexBarTemple.xlsx";

	/**
	 * 商品档案导出模板
	 */
	String SUPPLIER_EXPORT_EXCEL = "supplierExport.xlsx";

	/**
	 * 成本调价单导出模板
	 */
	String COST_ADJUST_EXPORT_EXCEL = "costAdjustExport.xlsx";

	/**
	 * @Fields STOCKREPORT : 库存报表
	 */
	String STOCKREPORT = "StockReport.xlsx";
	
	/**
	 * @Fields STOCKREPORT : 仓库商品查询
	 */
	String STOREGOODSREPORT = "StoreGoodsReport.xlsx";

	/**
	* @Fields SALEFLOWREPORT : 销售流水
	*/
	String SALEFLOWREPORT = "SaleFlowReport.xlsx";

	/**
	* @Fields GOODSREPORT : 商品查询
	*/
	String GOODSREPORT = "GoodsReport.xlsx";

	/**
	* @Fields CASHFLOWREPORT : 收银流水
	*/
	String CASHFLOWREPORT = "CashFlowReport.xlsx";

	/**
	* @Fields CASHDAILYREPORT : 收银日报
	*/
	String CASHDAILYREPORT = "CashDailyReport.xlsx";
	
	/**
	* @Fields CASHDAILYREPORT : 收银日报
	*/
	String CASHDAILYREPORT_SYY = "CashDailyReport_SYY.xlsx";
	/**
	* @Fields CASHDAILYREPORT : 收银日报
	*/
	String CASHDAILYREPORT_MD = "CashDailyReport_MD.xlsx";
	/**
	* @Fields CASHDAILYREPORT : 收银日报
	*/
	String CASHDAILYREPORT_RQ = "CashDailyReport_RQ.xlsx";

	/**
	* @Fields CASHCHECKREPORT : 收银对账
	*/
	String CASHCHECKREPORT = "CashCheckReport.xlsx";

	/**
	 * @Fields PURCHASEFORM : 采购单 退货单 收货单
	 */
	String PURCHASEFORM = "purchaseForm.xlsx";

	/**
	 * @Fields DIRECTRECEIPTFORM : 直送收货单
	 */
	String DIRECTRECEIPTFORM = "DirectReceiptForm.xlsx";

	/**
	 * @Fields PURCHASEFORMHH : 采购单 退货单 收货单 货号模版
	 */
	String PURCHASEFORMCODE = "purchaseFormCode.xlsx";

	/**
	 * @Fields PURCHASEFORMHH :DA 要货单 DO 出库单  DI入库单  DD 店间要货  DR退货申请 导出模版
	 */
	String DELIVERFORM = "DeliverForm.xlsx";

	String DELIVERFORM_DO = "DeliverFormDO.xlsx";

	String DELIVERFORM_DI = "DeliverFormDI.xlsx";

	String DELIVERFORM_DY = "DeliverFormDY.xlsx";

	String DELIVERFORM_DD = "DeliverFormDD.xlsx";

	String DELIVERFORM_DR = "DeliverFormDR.xlsx";

	/**
	 * @Fields DADOFORM : DADOform.xlsx
	 */
	String DADOFORM = "DADOForm.xlsx";

	/**
	 * @Fields RETURN_FORM : ReturnForm.xlsx
	 */
	String RETURN_FORM = "ReturnForm.xlsx";

	/**
	 * 商品采购货号导入模板
	 */
	String PURCHASE_GOODS_SKUCODE_TEMPLE = "PurchaseGoodsSkuCodeTemple.xlsx";

	/**
	 * 商品采购条码导入模板
	 */
	String PURCHASE_GOODS_BARCODE_TEMPLE = "PurchaseGoodsBarCodeTemple.xlsx";

	/**
	 * 直送收货货号导入模板
	 */
	String DIRECT_RECEIPT_SKUCODE_TEMPLE = "DirectReceiptSkuCodeTemple.xlsx";

	/**
	 * 直送收货条码导入模板
	 */
	String DIRECT_RECEIPT_BARCODE_TEMPLE = "DirectReceiptBarCodeTemple.xlsx";

	/**
	 * 商品引入货号导入模板
	 */
	String GOODS_INTRODUCE_SKU_CODE_TEMPLE = "GoodsIntroduceSkuCodeTemple.xlsx";

	/**
	 * 商品引入条码导入模板
	 */
	String GOODS_INTRODUCE_BAR_CODE_TEMPLE = "GoodsIntroduceBarCodeTemple.xlsx";

	/**
	 * 配送要货单货号导入模板
	 */
	String DELIVER_GOODS_SKUCODE_TEMPLE = "DeliverGoodsSkuCodeTemple.xlsx";

	/**
	 * 配送要货单条码导入模板
	 */
	String DELIVER_GOODS_BARCODE_TEMPLE = "DeliverGoodsBarCodeTemple.xlsx";

	/**
	 * 配送出库单货号导入模板
	 */
	String DELIVER_GOODS_SKUCODE_REPORT = "DeliverGoodsSkuCodeReport.xlsx";

	/**
	 * 配送出库单条码导入模板
	 */
	String DELIVER_GOODS_BARCODE_REPORT = "DeliverGoodsBarCodeReport.xlsx";

	/**
	 * @Fields PURCHASEFORM : 采购单 退货单 收货单
	 */
	String DELIVER_REPORT = "DeliverReport.xlsx";

	/**
	* @Fields 按单采购到货率报表
	*/
	String ARRIVAL_RATE_FORMNO_REPORT = "ArrivalRateFormNoReport.xlsx";

	/**
	 * @Fields 按供应商采购到货率报表
	 */
	String ARRIVAL_RATE_SUPPLIER_REPORT = "ArrivalRateSupplierReport.xlsx";

	/**
	 * @Fields 按分类商采购到货率报表
	 */
	String ARRIVAL_RATE_CATEGORY_REPORT = "ArrivalRateCategoryReport.xlsx";

	/**
	 * @Fields 按商品商采购到货率报表
	 */
	String ARRIVAL_RATE_GOODS_REPORT = "ArrivalRateGoodsReport.xlsx";

	/**
	 * @Fields PURCHASEFORM : 配送明细
	 */
	String DELIVER_FORM_LIST_REPORT = "DeliverFormListReport.xlsx";

	/**
	 * @Fields PUR_REPORT_TOTAL_SUPPLIER : 采购报表  汇总（供应商）
	 */
	String PUR_REPORT_TOTAL_SUPPLIER = "PurReportTotalSupplier.xlsx";

	/**
	 * @Fields PUR_REPORT_TOTAL_SUPPLIER : 采购报表  汇总（商品）
	 */
	String PUR_REPORT_TOTAL_GOODS = "PurReportTotalGoods.xlsx";

	/**
	 * @Fields PUR_REPORT_TOTAL_SUPPLIER : 采购报表  汇总（类别）
	 */
	String PUR_REPORT_TOTAL_CATEGORY = "PurReportTotalCategory.xlsx";

	/**
	 * @Fields PUR_REPORT_TOTAL_SUPPLIER : 采购报表  汇总（单据）
	 */
	String PUR_REPORT_TOTAL_FORMNO = "PurReportTotalFormNo.xlsx";

	/**
	 * @Fields PURCHASEFORM : 导出店铺销售排名列表
	 */
	String TRADE_ORDER_COUNT_REPORT = "TradeOrderCountReport.xlsx";

	/**
	 * @Fields PURCHASEFORM : 导出调价查询列
	 */
	String PRICING_QUERY = "princingQuery.xlsx";

	/**
	 * @Fields PURCHASEFORM : 导出配送缺货率分析明细
	 */
	String DELIVERY_DETAIL = "deliveryDetail.xlsx";

	/**
	 * @Fields PURCHASEFORM : 导出配送缺货率分析汇总
	 */
	String DELIVERY_SUM = "deliverySum.xlsx";

	/**
	* @Fields 供应商机构商品关系报表
	*/
	String SUPPLIER_BRANCH_GOODS_REPORT = "SupplierBranchGoodsReport.xlsx";

	/**
	 * @Fields 促销活动商品查询报表
	 */
	String ACTIVITY_GOODS_REPORT = "ActivityGoodsReport.xlsx";

	/**
	* @Fields GiftExchangeRecode : 积分兑换记录
	*/
	String GIFT_EXCHANGE_RECODE = "GiftExchangeRecode.xlsx";

	/**
	 * @Fields PURCHASEFORM : BD业绩报表
	 */
	String DILIVER_REPORT = "DiLiverReport.xlsx";

	/**
	 * @Fields GOODS_BRAND_REPORT : 商品品牌报表
	 */
	String GOODS_BRAND_REPORT = "GoodsBrandReport.xlsx";

	/**
	 * @Fields GOODS_CATEGORY_REPORT : 商品类别报表
	 */
	String GOODS_CATEGORY_REPORT = "GoodsCategoryReport.xlsx";

	/**
	 * 时段客单
	 */
	String TIMESECTIONSALEREPORT = "timeSectionSellReport.xlsx";

	/**
	 * 库存异常查询
	 */
	String STOCKEXCEPTION = "stockException.xlsx";

	/**
	 * 库存销售周转率
	 */
	String SALEROTARATEREPORT = "saleRotaRateReport.xlsx";

	/**
	 * 库存成本周转率
	 */
	String COSTROTARATEREPORT = "costRotaRateReport.xlsx";

	/**
	 * 盘点差异查询-汇总
	 */
	String DIFFSEARCHSUMMARIZING = "diffSearchSummarizing.xlsx";

	/**
	 * 盘点差异查询-类别汇总
	 */
	String DIFFSEARCHCATEGORYSUM = "diffSearchCategorySummarizing.xlsx";
	/**
	 * 盘点差异查询-明细
	 */
	String DIFFSEARCHDETAIL = "diffSearchDetail.xlsx";

	/**
	 * @Fields STOCK_TAKING_MISS_GOODS : 漏盘商品查询
	 */
	String STOCK_TAKING_MISS_GOODS = "stockTakingMissGoods.xlsx";

	/**
	 * 新品申请导出模板
	 */
	String NEW_GOODS_APPLY_REPORT = "newGoodsApplyReport.xlsx";

	/**
	 *  @Fields NEW_GOODS_APPLY_TEMPLE : 新品申请导入模板
	 */
	String NEW_GOODS_APPLY_TEMPLE = "NewGoodsApplyTemple.xlsx";

	/**
	 * @Fields MEMBER_ORDER_ALL : 会员消费汇总报表
	 */
	String MEMBER_ORDER_ALL = "memberOrderAll.xlsx";

	/**
	 * @Fields MEMBER_ORDER_LIST : 会员消费明细
	 */
	String MEMBER_ORDER_LIST = "MemberOrderList.xlsx";

	/**
	 * 最大值数值
	 */
	double MAXNUM = 999999.99;

	/**
	 * 调价订单详情导出
	 */
	String OVERDUE_APPROVED_DETAIL = "overdueApprovedDetail.xlsx";

	/**
	 * 查看调价订单货号导入模板 SkuCode
	 */
	String OVERDUE_APPROVED_SKUCODE_TEMPLE = "overdueApprovedSkuCodeTemple.xlsx";

	/**
	 * 查看调价订单货号导入模板Barcode
	 */
	String OVERDUE_APPROVED_BARCODE_TEMPLE = "overdueApprovedBarCodeTemple.xlsx";

	/**
	 * @Fields PURCHASE_REPLENISH_ANALY_REPORT : 店铺补货分析报表导出模板
	 */
	String PURCHASE_REPLENISH_ANALY_REPORT = "purchaseReplenishAnalyReport.xlsx";

	/**
	 * @Fields OVER_SHORT_REPORT1 : 长短款导出模板   长短款日报表
	 */
	String OVER_SHORT_REPORT1 = "overShortReport1.xlsx";

	/**
	 * @Fields OVER_SHORT_REPORT2 : 长短款导出模板   长短款日报表（日汇总）
	 */
	String OVER_SHORT_REPORT2 = "overShortReport2.xlsx";

	/**
	 * @Fields OVER_SHORT_REPORT3 : 长短款导出模板   入袋记录报表
	 */
	String OVER_SHORT_REPORT3 = "overShortReport3.xlsx";

	/**
	 * @Fields DOSHEET1 : 出库单模板一
	 */
	String DOSHEET1 = "DOSheet1.xlsx";

	/**
	 * @Fields DOSHEET2 : 出库单模板二
	 */
	String DOSHEET2 = "DOSheet2.xlsx";

	/**
	 * @Fields NEW_GOODS_SALE_ANALYSIS_report : 新品销售分析
	 */
	String NEW_GOODS_SALE_ANALYSIS_REPORT = "newGoodsSaleAnalysis.xlsx";

	/**
	 * @Fields SUPPLIER_MONTHLY_REPORT : 供应商进销存月报表
	 */
	String SUPPLIER_MONTHLY_REPORT = "SupplierMonthlyReport.xlsx";
	
	/**
	 * @Fields MONTHLY_REPORT : 月进销存报表
	 */
	String MONTHLY_REPORT = "MonthlyReport.xlsx";

	/**
	 * @Fields ACTIVITY_DETAIL_QUERY_FOR_GOODS : 商品促销方案详情
	 */
	String ACTIVITY_DETAIL_QUERY_FOR_GOODS = "activityDetailQueryForGoods.xlsx";

	/**
	 * @Fields ACTIVITY_DETAIL_QUERY_FOR_CATEGORY : 类别促销方案详情
	 */
	String ACTIVITY_DETAIL_QUERY_FOR_CATEGORY = "activityDetailQueryForCategory.xlsx";

	/**
	 * @Fields ACTIVITY_DETAIL_QUERY_FOR_FULLREDUCTION : 满减促销方案详情
	 */
	String ACTIVITY_DETAIL_QUERY_FOR_FULLREDUCTION = "activityDetailQueryForFullReduction.xlsx";
	
	/**
	 * @Fields STOCK_TAKING_MISS_GOODS : 盘点明细
	 */
	String STOCKTAKING_PPDETAIL = "stockTakingPPDetail.xlsx";
	/**
	 * @Fields STOCK_TAKING_MISS_GOODS : 差异处理明细
	 */
	String STOCKTAKING_DIFFDETAIL = "stockTakingDiffDetail.xlsx";
	
	/*** 特价活动商品引入货号导入模板  */
	String ACTIVITY_SPECIAL_GOODS_SKUCODE_TEMPLATE = "activitySpecialGoodsSkuCodeTemplate.xlsx";

	/*** 特价活动商品引入条码导入模板  */
	String ACTIVITY_SPECIAL_GOODS_BARCODE_TEMPLATE = "activitySpecialGoodsBarCodeTemplate.xlsx";
	
	/*** 折扣活动商品引入货号导入模板  */
	String ACTIVITY_DISCOUNT_GOODS_SKUCODE_TEMPLATE = "activityDiscountGoodsSkuCodeTemplate.xlsx";
	
	/*** 折扣活动商品引入条码导入模板  */
	String ACTIVITY_DISCOUNT_GOODS_BARCODE_TEMPLATE = "activityDiscountGoodsBarCodeTemplate.xlsx";
	
	/*** 偶数特价活动商品引入货号导入模板  */
	String ACTIVITY_EVEN_GOODS_SKUCODE_TEMPLATE = "activityEvenGoodsSkuCodeTemplate.xlsx";
	
	/*** 偶数特价活动商品引入条码导入模板  */
	String ACTIVITY_EVEN_GOODS_BARCODE_TEMPLATE = "activityEvenGoodsBarCodeTemplate.xlsx";
	
	/**
	 * 一开通交易明细
	 */
	String ICC_CARD_TRADING_DETAIL = "iccCardTradingDetail.xlsx" ;
	/**
	 * 一卡通交易汇总
	 */
	String ICC_CARD_SUM_TRADING_DETAIL = "iccCardSumTradingDetail.xlsx";
}
