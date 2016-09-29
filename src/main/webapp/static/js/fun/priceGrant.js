/**
 * @Description: 价格权限公用方法
 * @author liwb
 */


//从session中获取用户价格权限
var hasSalePrice = false;
var hasVipPrice = false;
var hasPurchasePrice = false;
var hasWholesalePrice = false;
var hasLowestPrice = false;
var hasDistributionPrice = false;


//计算价格权限 sale_price,cost_price,vip_price,purchase_price,wholesale_price,lowest_price,distribution_price
$(function(){
	var priceGrantArray = [];
	
	//如果是空，则说明无权限要求
	if(priceGrantStr){
		priceGrantArray = priceGrantStr.split(",");
	}else{
		hasSalePrice = true;
		hasVipPrice = true;
		hasPurchasePrice = true;
		hasWholesalePrice = true;
		hasLowestPrice = true;
		hasDistributionPrice = true;
		return;
	}
	
	if(priceGrantArray && priceGrantArray.length > 0){
		$.each(priceGrantArray,function(i){
		    var currGrant = this+"";
		    switch (currGrant) {
		    case "sale_price": 	// 零售价
		    	hasSalePrice = true;
				break;
		    case "vip_price": // 会员价
		    	hasVipPrice = true;
				break;
		    case "purchase_price": // 采购价
		    	hasPurchasePrice = true;
				break;
		    case "wholesale_price": // 批发价
		    	hasWholesalePrice = true;
				break;
		    case "lowest_price": // 最低售价
		    	hasLowestPrice = true;
				break;
		    case "distribution_price": // 最低售价
		    	hasDistributionPrice = true;
				break;
		    default:
				break;
		    }
		});
	}
});


/**
 * @Description: 价格权限过滤公用方法
 * @author liwb
 */
var priceGrantUtil = {
	
	/**
	 * 过滤销售价，如果列名为空数组，则默认为salePrice列名
	 * @param datagridId
	 * @param fieldArr
	 */
	grantSalePrice : function(datagridId, fieldArr){
		if(isEmptyArray(fieldArr)){
			fieldArr = [ "salePrice" ];
		}
		if(hasSalePrice==false){
			datagridCommon.hideDataGridColumn(datagridId, fieldArr);
		}
	},
	
	/**
	 * 过滤会员价，如果列名为空数组，则默认为vipPrice列名
	 * @param datagridId
	 * @param fieldArr
	 */
	grantVipPrice : function(datagridId, fieldArr){
		if(isEmptyArray(fieldArr)){
			fieldArr = [ "vipPrice" ];
		}
		if(hasVipPrice==false){
			datagridCommon.hideDataGridColumn(datagridId, fieldArr);
		}
	},
	
	/**
	 * 过滤采购价，如果列名为空数组，则默认为purchasePrice列名
	 * @param datagridId
	 * @param fieldArr
	 */
	grantPurchasePrice : function(datagridId, fieldArr){
		if(isEmptyArray(fieldArr)){
			fieldArr = [ "purchasePrice" ];
		}
		if(hasPurchasePrice==false){
			datagridCommon.hideDataGridColumn(datagridId, fieldArr);
		}
	},
	
	/**
	 * 过滤批发价，如果列名为空数组，则默认为wholesalePrice列名
	 * @param datagridId
	 * @param fieldArr
	 */
	grantWholesalePrice : function(datagridId, fieldArr){
		if(isEmptyArray(fieldArr)){
			fieldArr = [ "wholesalePrice" ];
		}
		if(hasWholesalePrice==false){
			datagridCommon.hideDataGridColumn(datagridId, fieldArr);
		}
	},
	
	/**
	 * 过滤最低售价，如果列名为空数组，则默认为lowestPrice列名
	 * @param datagridId
	 * @param fieldArr
	 */
	grantLowestPrice : function(datagridId, fieldArr){
		if(isEmptyArray(fieldArr)){
			fieldArr = [ "lowestPrice" ];
		}
		if(hasLowestPrice==false){
			datagridCommon.hideDataGridColumn(datagridId, fieldArr);
		}
	},
	
	/**
	 * 过滤配送价，如果列名为空数组，则默认为distributionPrice列名
	 * @param datagridId
	 * @param fieldArr
	 */
	grantDistributionPrice : function(datagridId, fieldArr){
		if(isEmptyArray(fieldArr)){
			fieldArr = [ "distributionPrice" ];
		}
		if(hasDistributionPrice==false){
			datagridCommon.hideDataGridColumn(datagridId, fieldArr);
		}
	},
	
	/**
	 * 过滤所有价格权限，默认列名依次为 salePrice,vipPrice,purchasePrice,wholesalePrice,lowestPrice,distributionPrice
	 * @param datagridId 数据表格ID
	 */
	grantPrice : function(datagridId){
		var _this = this;
		_this.grantSalePrice(datagridId);
		_this.grantVipPrice(datagridId);
		_this.grantPurchasePrice(datagridId);
		_this.grantWholesalePrice(datagridId);
		_this.grantLowestPrice(datagridId);
		_this.grantDistributionPrice(datagridId);
	},
		
};