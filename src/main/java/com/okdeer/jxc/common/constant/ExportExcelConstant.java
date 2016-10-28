
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
	int EXPORT_MAX_SIZE = 10001;

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
	 * 商品销售汇总
	 */
	String 	GOODS_SALE_REPORT = "goodsSaleReport.xlsx";
	
	String CATEGORY_SALE_REPORT ="categorySaleReport.xlsx";
	
	String STORE_DAY_SALE_REPORT = "storeDaySaleReport.xlsx";
	
	String GOODS_OUT_IN_DETAIL_REPORT = "goodsOutInDetailReport.xlsx";
	
	String STOCK_ADJUST_SKU_TEMPLE = "StockAdjustSkuTemple.xlsx";
	
	String STOCK_ADJUST_BAR_TEMPLE = "StockAdjustBarTemple.xlsx";
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
	* @Fields CASHCHECKREPORT : 收银对账
	*/
	String CASHCHECKREPORT = "CashCheckReport.xlsx";

	/**
	 * @Fields PURCHASEFORM : 采购单 退货单 收货单
	 */
	String PURCHASEFORM = "purchaseForm.xlsx";

	/**
	 * @Fields PURCHASEFORMHH : 采购单 退货单 收货单 货号模版
	 */
	String PURCHASEFORMCODE = "purchaseFormCode.xlsx";

	/**
	 * @Fields PURCHASEFORM : DA 要货单 DO 出库单  DI入库单  DD 店间要货  DR退货申请
	 */
	String DELIVERFORM = "deliverForm.xlsx";

	/**
	 * @Fields DADOFORM : DADOform.xlsx
	 */
	String DADOFORM = "DADOForm.xlsx";
	/**
	 * 商品采购货号导入模板
	 */
	String PURCHASE_GOODS_SKUCODE_TEMPLE = "PurchaseGoodsSkuCodeTemple.xlsx";
	
	/**
	 * 商品采购条码导入模板
	 */
	String PURCHASE_GOODS_BARCODE_TEMPLE = "PurchaseGoodsBarCodeTemple.xlsx";
	
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
	String PUR_REPORT_TOTAL_SUPPLIER="PurReportTotalSupplier.xlsx";
	
	/**
	 * @Fields PUR_REPORT_TOTAL_SUPPLIER : 采购报表  汇总（商品）
	 */
	String PUR_REPORT_TOTAL_GOODS="PurReportTotalGoods.xlsx";
	
	/**
	 * @Fields PUR_REPORT_TOTAL_SUPPLIER : 采购报表  汇总（类别）
	 */
	String PUR_REPORT_TOTAL_CATEGORY="PurReportTotalCategory.xlsx";
	
	/**
	 * @Fields PUR_REPORT_TOTAL_SUPPLIER : 采购报表  汇总（单据）
	 */
	String PUR_REPORT_TOTAL_FORMNO="PurReportTotalFormNo.xlsx";

	/**
	 * @Fields PURCHASEFORM : 导出店铺销售排名列表
	 */
	String TRADE_ORDER_COUNT_REPORT = "TradeOrderCountReport.xlsx";
}
