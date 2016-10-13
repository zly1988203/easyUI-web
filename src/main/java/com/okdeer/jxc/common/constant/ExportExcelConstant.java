
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
	 * @Fields GOODS_PRICE_ADJUST_FORM_TEMPLE_SKUCODE : 调价单货号模板
	 */
	String GOODS_PRICE_ADJUST_FORM_TEMPLE_SKUCODE = "SkuCodeTemple.xlsx";

	/**
	 * @Fields GOODS_PRICE_ADJUST_FORM_TEMPLE_BARCODE : 调价单条形码模板
	 */
	String GOODS_PRICE_ADJUST_FORM_TEMPLE_BARCODE = "BarCodeTemple.xlsx";
	
	/**
	 * @Fields BARCODE_TEMPLE_TYPE : 条形码模板类型
	 */
	String BARCODE_TEMPLE_TYPE = "barCodeTemple";
	/**
	 * @Fields SKUCODE_TEMPLE_TYPE : 货号模板类型
	 */
	String SKUCODE_TEMPLE_TYPE = "skuCodeTemple";
	
	/**
	 * 商品档案导出模板
	 */
	String GOODS_EXPORT_EXCEL = "goodsExport.xlsx";

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
	
}
