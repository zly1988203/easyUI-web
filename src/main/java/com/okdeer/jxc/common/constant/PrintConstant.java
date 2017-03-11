
package com.okdeer.jxc.common.constant;

/**
 * ClassName: PrintConstant 
 * @Description: 打印常量
 * @author lijy02
 * @date 2016年9月2日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *	商业管理系统		2016.9.2			lijy02				打印常量
 */

public interface PrintConstant {

	/**
	 * @Fields TEMPLATE_DIR : 打印模板文件目录 /template/excel/print
	 */
	String TEMPLATE_PRINT_DIR = "/template/excel/print/";

	/**
	 * @Fields CASH_DAILY_REPORT : 收银日报模版
	 */
	String CASH_DAILY_REPORT = "CashDailyReport.jrxml";

	/**
	 * @Fields GOODS_UNSALE_REPORT : 收银日报模版
	 */
	String GOODS_UNSALE_REPORT = "goodsUnsaleReport.jrxml";
	/**
	 * @Fields CASH_FLOW_REPORT : 收银流水模版
	 */
	String CASH_FLOW_REPORT = "CashFlowReport.jrxml";

	/**
	 * @Fields CASH_CHECK_REPORT : 收银对账报表模版
	 */
	String CASH_CHECK_REPORT = "CashCheckReport.jrxml";

	/**
	 * @Fields CASH_FLOW_REPORT : 销售流水报表模版
	 */
	String SALE_FLOW_REPORT = "SaleFlowReport.jrxml";

	/**
	 * @Fields CASH_DAILY_PRINT_ERROR : 日结报表打印失败
	 */
	String CASH_DAILY_PRINT_ERROR = "日结报表打印失败{}";

	/**
	 * @Fields CASH_FLOW_PRINT_ERROR : 收银流水报表打印失败
	 */
	String CASH_FLOW_PRINT_ERROR = "收银流水报表打印失败{}";

	/**
	 * @Fields CASH_CHECK_PRINT_ERROR ：收银对账打印失败
	 */
	String CASH_CHECK_PRINT_ERROR = "收银对账报表打印失败{}";

	/**
	 * @Fields SALE_FLOW_PRINT_ERROR ：销售流水打印失败
	 */
	String SALE_FLOW_PRINT_ERROR = "销售流水报表打印失败{}";
	
	String GOODS_UNSALE_PRINT_ERROR = "商品滞销报表打印失败{}";

	/**
	 * @Fields PRINT_LABEL : 商品打印价签名
	 */
	String PRINT_LABEL = "ProductLabel";

	/**
	 * @Fields GOODS_REPORT : 商品报表
	 */
	String GOODS_REPORT = "GoodsReport.jrxml";

	/**
	 * @Fields goods_report_error : 上皮你报表打印失败
	 */
	String GOODS_REPORT_ERROR = "商品报表打印失败{}";

	/**
	 * @Fields PRINT_LIMIT : 打印限最大数量
	 */
	Integer PRINT_MAX_LIMIT = 10000;
	
	/**
	 * @Fields PRINT_MAX_ROW : 打印限最大数量
	 */
	Integer PRINT_MAX_ROW = 3000;

	/**
	 * @Fields MEMBER_ORDER_ALL_REPORT : 会员消费汇总模版
	 */
	String MEMBER_ORDER_ALL_REPORT = "MemberOrderAllReport.jrxml";

	/**
	 * @Fields MEMBER_ORDER_LIST_REPORT : 会员消费明细模版
	 */
	String MEMBER_ORDER_LIST_REPORT = "MemberOrderListReport.jrxml";

	/** 
	 * @Fields COST_ROTARATE_REPORT : 库存成本周转率
	 */
	String COST_ROTARATE_REPORT = "costRotaRateReport.jrxml";
	
	/**
	 * @Fields SALE_ROTARATE_REPORT : 库存销售周转率
	 */
	String SALE_ROTARATE_REPORT = "saleRotaRateReport.jrxml";
	
	/**
	 * @Fields ROTARATE_PRINT_ERROR ：库存周转率打印失败
	 */
	String ROTARATE_PRINT_ERROR = "库存周转率打印失败{}";
	
	/**
	 * @Fields OVERDUE_APPLY_REPORT : 调价订单申请打印
	 */
	String OVERDUE_APPLY_REPORT ="overdueApply.jrxml";
	
	String OVERDUE_APPROVED_REPORT ="overdueApproved.jrxml";
	
}
