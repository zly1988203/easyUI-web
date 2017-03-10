/**
 * 打印项数据,详细类别： CGSheet：采购订单
 * 
 * FileName: defaultData.js
 * 
 * @Description: 打印项数据
 * @author zhangq
 * @date 2016年6月21日
 * 
 * =================================================================================================
 * Task ID Date Author Description
 * ----------------+----------------+-------------------+-------------------------------------------
 * 
 */

// 通用打印项
var commonItems = [ {
	type : "label",
	text : "页码："
}, {
	type : "holder",
	text : "_页码"
}, {
	type : "label",
	text : "打印人："
}, {
	type : "holder",
	text : "_打印人"
}, {
	type : "label",
	text : "打印时间："
}, {
	type : "holder",
	text : "_打印时间"
}, {
	type : "label",
	text : "打印次数："
}, {
	type : "holder",
	text : "_打印次数"
}, {
	type : "label",
	text : "店铺名称："
}, {
	type : "holder",
	text : "_店铺名称"
}, {
	type : "label",
	text : "电话："
}, {
	type : "holder",
	text : "_电话"
}, {
	type : "label",
	text : "送货地址："
}, {
	type : "holder",
	text : "_送货地址"
}, {
	type : "label",
	text : "联系人："
}, {
	type : "holder",
	text : "_联系人"
}, {
	type : "label",
	text : "备注："
}, {
	type : "holder",
	text : "_备注"
}, {
	type : "label",
	text : "自定义标签"
}, {
	type : "label",
	text : "单据编号："
}, {
	type : "holder",
	text : "_单据编号："
}, {
	type : "label",
	text : "制单人员："
}, {
	type : "holder",
	text : "_制单人员"
}, {
	type : "label",
	text : "制单日期："
}, {
	type : "holder",
	text : "_制单日期"
}, {
	type : "label",
	text : "审核人员："
}, {
	type : "holder",
	text : "_审核人员"
}, {
	type : "label",
	text : "审核日期："
}, {
	type : "holder",
	text : "_审核日期"
} ]

// 打印项数据
var defaultData = {
	// 采购订单
	PASheet : [ /*
				 * { group : "通用打印项", items : commonItems },
				 */{
		group : "单据打印项",
		items : [ {
			type : "label",
			text : "采购订单"
		}, {
			type : "label",
			text : "供应商名称："
		}, {
			type : "holder",
			text : "_供应商名称"
		}, {
			type : "label",
			text : "供应商电话号码："
		}, {
			type : "holder",
			text : "_供应商电话号码"
		}, {
			type : "label",
			text : "供应商手机号码："
		}, {
			type : "holder",
			text : "_供应商手机号码"
		}, {
			type : "label",
			text : "下单日期："
		}, {
			type : "holder",
			text : "_下单日期"
		}, {
			type : "label",
			text : "机构名称："
		}, {
			type : "holder",
			text : "_机构名称"
		}, {
			type : "label",
			text : "机构联系人："
		}, {
			type : "holder",
			text : "_机构联系人"
		}, {
			type : "label",
			text : "机构联系电话："
		}, {
			type : "holder",
			text : "_机构联系电话"
		}, {
			type : "label",
			text : "机构详细地址："
		}, {
			type : "holder",
			text : "_机构详细地址"
		}, {
			type : "label",
			text : "送货地址："
		}, {
			type : "holder",
			text : "_送货地址"
		}, {
			type : "label",
			text : "备注："
		}, {
			type : "holder",
			text : "_备注"
		}, {
			type : "label",
			text : "订单编号："
		}, {
			type : "holder",
			text : "_订单编号"
		}, {
			type : "label",
			text : "人民币总金额大写："
		}, {
			type : "holder",
			text : "_人民币总金额大写"
		}, {
			type : "label",
			text : "总金额："
		}, {
			type : "holder",
			text : "_总金额"
		}, {
			type : "label",
			text : "厂家回签："
		}, {
			type : "label",
			text : "核准："
		}, {
			type : "label",
			text : "审核："
		}, {
			type : "label",
			text : "采购："
		} ]
	} ],
	// 采购收货单
	PISheet : [ /*
				 * { group : "通用打印项", items : commonItems },
				 */{
		group : "单据打印项",
		items : [ {
			type : "label",
			text : "采购收货单"
		} ,{
			type : "label",
			text : "供应商名称："
		}, {
			type : "holder",
			text : "_供应商名称"
		}, {
			type : "label",
			text : "供应商电话号码："
		}, {
			type : "holder",
			text : "_供应商电话号码"
		}, {
			type : "label",
			text : "供应商手机号码："
		}, {
			type : "holder",
			text : "_供应商手机号码"
		}, {
			type : "label",
			text : "下单日期："
		}, {
			type : "holder",
			text : "_下单日期"
		}, {
			type : "label",
			text : "机构名称："
		}, {
			type : "holder",
			text : "_机构名称"
		}, {
			type : "label",
			text : "机构联系人："
		}, {
			type : "holder",
			text : "_机构联系人"
		}, {
			type : "label",
			text : "机构联系电话："
		}, {
			type : "holder",
			text : "_机构联系电话"
		}, {
			type : "label",
			text : "机构详细地址："
		}, {
			type : "holder",
			text : "_机构详细地址"
		}, {
			type : "label",
			text : "送货地址："
		}, {
			type : "holder",
			text : "_送货地址"
		}, {
			type : "label",
			text : "备注："
		}, {
			type : "holder",
			text : "_备注"
		}, {
			type : "label",
			text : "订单编号："
		}, {
			type : "holder",
			text : "_订单编号"
		},{
			type : "label",
			text : "原订单号："
		}, {
			type : "holder",
			text : "_原订单号"
		}, {
			type : "label",
			text : "人民币总金额大写："
		}, {
			type : "holder",
			text : "_人民币总金额大写"
		}, {
			type : "label",
			text : "总金额："
		}, {
			type : "holder",
			text : "_总金额"
		}, {
			type : "label",
			text : "厂家回签："
		}, {
			type : "label",
			text : "核准："
		}, {
			type : "label",
			text : "审核："
		}, {
			type : "label",
			text : "采购："
		} ]
	} ],
	// 采购退货单
	PRSheet : [ /*{
		group : "通用打印项",
		items : commonItems
	},*/ {
		group : "单据打印项",
		items : [ {
			type : "label",
			text : "采购退货单"
		},{
			type : "label",
			text : "供应商名称："
		}, {
			type : "holder",
			text : "_供应商名称"
		},{
			type : "label",
			text : "供应商电话号码："
		}, {
			type : "holder",
			text : "_供应商电话号码"
		},{
			type : "label",
			text : "供应商手机号码："
		}, {
			type : "holder",
			text : "_供应商手机号码"
		}, {
			type : "label",
			text : "下单日期："
		}, {
			type : "holder",
			text : "_下单日期"
		},{
			type : "label",
			text : "机构名称："
		},{
			type : "holder",
			text : "_机构名称"
		},{
			type : "label",
			text : "机构联系人："
		},{
			type : "holder",
			text : "_机构联系人"
		},{
			type : "label",
			text : "机构联系电话："
		},{
			type : "holder",
			text : "_机构联系电话"
		},{
			type : "label",
			text : "机构详细地址："
		},{
			type : "holder",
			text : "_机构详细地址"
		},{
			type : "label",
			text : "送货地址："
		},{
			type : "holder",
			text : "_送货地址"
		},{
			type : "label",
			text : "备注："
		},{
			type : "holder",
			text : "_备注"
		}, {
			type : "label",
			text : "订单编号："
		}, {
			type : "holder",
			text : "_订单编号"
		}, {
			type : "label",
			text : "人民币总金额大写："
		}, {
			type : "holder",
			text : "_人民币总金额大写"
		}, {
			type : "label",
			text : "总金额："
		}, {
			type : "holder",
			text : "_总金额"
		}, {
			type : "label",
			text : "厂家回签："
		}, {
			type : "label",
			text : "核准："
		}, {
			type : "label",
			text : "审核："
		}, {
			type : "label",
			text : "采购："
		} ]
	} ],
	// 调价单
	CASheet : [ {
		group : "通用打印项",
		items : commonItems
	}, {
		group : "单据打印项",
		items : [ {
			type : "label",
			text : "调价单："
		}, {
			type : "label",
			text : "单号："
		}, {
			type : "holder",
			text : "_单号"
		}, {
			type : "label",
			text : "区域："
		}, {
			type : "holder",
			text : "_区域"
		}, {
			type : "label",
			text : "生效日期："
		}, {
			type : "holder",
			text : "_生效日期"
		}, {
			type : "label",
			text : "分店列表："
		}, {
			type : "holder",
			text : "_分店列表"
		}, {
			type : "label",
			text : "调价设置："
		}, {
			type : "holder",
			text : "_调价设置"
		} ]
	} ],
	// 要货单
	DASheet : [ /*
				 * { group : "通用打印项", items : commonItems },
				 */{
		group : "单据打印项",
		items : [ {
			type : "label",
			text : "要货单"
		}, {
			type : "label",
			text : "单号"
		}, {
			type : "label",
			text : "_单号"
		}, {
			type : "label",
			text : "要货机构："
		}, {
			type : "holder",
			text : "_要货机构"
		}, {
			type : "label",
			text : "发货机构："
		}, {
			type : "holder",
			text : "_发货机构"
		}, {
			type : "label",
			text : "制单人员："
		}, {
			type : "holder",
			text : "_制单人员"
		}, {
			type : "label",
			text : "业务人员："
		}, {
			type : "holder",
			text : "_业务人员"
		}, {
			type : "label",
			text : "审核人员："
		}, {
			type : "holder",
			text : "_审核人员"
		}, {
			type : "label",
			text : "有效期限："
		}, {
			type : "holder",
			text : "_有效期限"
		}, {
			type : "label",
			text : "制单日期："
		}, {
			type : "holder",
			text : "_制单日期"
		}, {
			type : "label",
			text : "审核日期："
		}, {
			type : "holder",
			text : "_审核日期"
		}, {
			type : "label",
			text : "备注："
		}, {
			type : "holder",
			text : "_备注"
		}, {
			type : "label",
			text : "人民币大写总金额："
		}, {
			type : "holder",
			text : "_人民币大写总金额"
		}, {
			type : "label",
			text : "总金额："
		}, {
			type : "holder",
			text : "_总金额"
		}, {
			type : "label",
			text : "核准："
		}, {
			type : "label",
			text : "审核："
		} ]
	} ],
	// 入库单
	DISheet : [ /*
				 * { group : "通用打印项", items : commonItems },
				 */{
		group : "单据打印项",
		items : [ {
			type : "label",
			text : "配送入库单"
		}, {
			type : "label",
			text : "_单号"
		}, {
			type : "label",
			text : "要货机构："
		}, {
			type : "holder",
			text : "_要货机构"
		}, {
			type : "label",
			text : "发货机构："
		}, {
			type : "holder",
			text : "_发货机构"
		}, {
			type : "label",
			text : "制单人员："
		}, {
			type : "holder",
			text : "_制单人员"
		}, {
			type : "label",
			text : "业务人员："
		}, {
			type : "holder",
			text : "_业务人员"
		}, {
			type : "label",
			text : "联系人："
		}, {
			type : "holder",
			text : "_联系人"
		}, {
			type : "label",
			text : "联系电话："
		}, {
			type : "holder",
			text : "_联系电话"
		}, {
			type : "label",
			text : "审核人员："
		}, {
			type : "holder",
			text : "_审核人员"
		}, {
			type : "label",
			text : "有效期限："
		}, {
			type : "holder",
			text : "_有效期限"
		}, {
			type : "label",
			text : "制单日期："
		}, {
			type : "holder",
			text : "_制单日期"
		}, {
			type : "label",
			text : "审核日期："
		}, {
			type : "holder",
			text : "_审核日期"
		}, {
			type : "label",
			text : "备注："
		}, {
			type : "holder",
			text : "_备注"
		}, {
			type : "label",
			text : "人民币大写总金额："
		}, {
			type : "holder",
			text : "_人民币大写总金额"
		}, {
			type : "label",
			text : "总金额："
		}, {
			type : "holder",
			text : "_总金额"
		}, {
			type : "label",
			text : "核准："
		}, {
			type : "label",
			text : "审核："
		}, {
			type : "label",
			text : "有效期限："
		}, {
			type : "holder",
			text : "_有效期限"
		}, {
			type : "label",
			text : "返利："
		}, {
			type : "holder",
			text : "_返利"
		}, {
			type : "label",
			text : "折扣："
		}, {
			type : "holder",
			text : "_折扣"
		}, {
			type : "label",
			text : "客户："
		}, {
			type : "label",
			text : "司机："
		} ]
	} ],
	// 配送出库单
	DOSheet : [/*
				 * { group : "通用打印项", items : commonItems },
				 */{
		group : "单据打印项",
		items : [ {
			type : "label",
			text : "配送出库单"
		}, {
			type : "label",
			text : "_单号"
		}, {
			type : "label",
			text : "要货机构："
		}, {
			type : "holder",
			text : "_要货机构"
		}, {
			type : "label",
			text : "发货机构："
		}, {
			type : "holder",
			text : "_发货机构"
		}, {
			type : "label",
			text : "制单人员："
		}, {
			type : "holder",
			text : "_制单人员"
		}, {
			type : "label",
			text : "业务人员："
		}, {
			type : "holder",
			text : "_业务人员"
		}, {
			type : "label",
			text : "联系人："
		}, {
			type : "holder",
			text : "_联系人"
		}, {
			type : "label",
			text : "联系电话："
		}, {
			type : "holder",
			text : "_联系电话"
		}, {
			type : "label",
			text : "审核人员："
		}, {
			type : "holder",
			text : "_审核人员"
		}, {
			type : "label",
			text : "有效期限："
		}, {
			type : "holder",
			text : "_有效期限"
		}, {
			type : "label",
			text : "制单日期："
		}, {
			type : "holder",
			text : "_制单日期"
		}, {
			type : "label",
			text : "审核日期："
		}, {
			type : "holder",
			text : "_审核日期"
		}, {
			type : "label",
			text : "备注："
		}, {
			type : "holder",
			text : "_备注"
		}, {
			type : "label",
			text : "人民币大写总金额："
		}, {
			type : "holder",
			text : "_人民币大写总金额"
		}, {
			type : "label",
			text : "总金额："
		}, {
			type : "holder",
			text : "_总金额"
		}, {
			type : "label",
			text : "核准："
		}, {
			type : "label",
			text : "审核："
		}, {
			type : "label",
			text : "有效期限："
		}, {
			type : "holder",
			text : "_有效期限"
		}, {
			type : "label",
			text : "返利："
		}, {
			type : "holder",
			text : "_返利"
		}, {
			type : "label",
			text : "折扣："
		}, {
			type : "holder",
			text : "_折扣"
		}, {
			type : "label",
			text : "客户："
		}, {
			type : "label",
			text : "司机："
		} ]
	} ],
	//店间配送申请单
	DDSheet : [/*
				 * { group : "通用打印项", items : commonItems },
				 */{
		group : "单据打印项",
		items : [ {
			type : "label",
			text : "配送出库单"
		}, {
			type : "label",
			text : "_单号"
		}, {
			type : "label",
			text : "要货机构："
		}, {
			type : "holder",
			text : "_要货机构"
		}, {
			type : "label",
			text : "发货机构："
		}, {
			type : "holder",
			text : "_发货机构"
		}, {
			type : "label",
			text : "制单人员："
		}, {
			type : "holder",
			text : "_制单人员"
		}, {
			type : "label",
			text : "业务人员："
		}, {
			type : "holder",
			text : "_业务人员"
		}, {
			type : "label",
			text : "联系人："
		}, {
			type : "holder",
			text : "_联系人"
		}, {
			type : "label",
			text : "联系电话："
		}, {
			type : "holder",
			text : "_联系电话"
		}, {
			type : "label",
			text : "审核人员："
		}, {
			type : "holder",
			text : "_审核人员"
		}, {
			type : "label",
			text : "有效期限："
		}, {
			type : "holder",
			text : "_有效期限"
		}, {
			type : "label",
			text : "制单日期："
		}, {
			type : "holder",
			text : "_制单日期"
		}, {
			type : "label",
			text : "审核日期："
		}, {
			type : "holder",
			text : "_审核日期"
		}, {
			type : "label",
			text : "备注："
		}, {
			type : "holder",
			text : "_备注"
		}, {
			type : "label",
			text : "人民币大写总金额："
		}, {
			type : "holder",
			text : "_人民币大写总金额"
		}, {
			type : "label",
			text : "总金额："
		}, {
			type : "holder",
			text : "_总金额"
		}, {
			type : "label",
			text : "核准："
		}, {
			type : "label",
			text : "审核："
		}, {
			type : "label",
			text : "有效期限："
		}, {
			type : "holder",
			text : "_有效期限"
		}, {
			type : "label",
			text : "返利："
		}, {
			type : "holder",
			text : "_返利"
		}, {
			type : "label",
			text : "折扣："
		}, {
			type : "holder",
			text : "_折扣"
		}, {
			type : "label",
			text : "客户："
		}, {
			type : "label",
			text : "司机："
		} ]
	} ],
}
