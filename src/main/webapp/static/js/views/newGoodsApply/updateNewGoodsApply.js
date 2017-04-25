/**
 * Created by huangj02 on 2016/8/11.
 * 编辑商品
 */
var updateSku;
function initGoodsEditView(id){
	//获取编辑商品的数据
	getGoodsArchivesDetail(id);

	//根据商品名称获取助记码
	$("#skuName").on("blur",function(){
		getMemoryCode();
	});

	//第一次进入页面，商品自动生成货号
	getSkuCodeVal();

	//计价方式
	$('#pricingType').on("change",function(){
		//商品自动生成货号
		getSkuCodeVal();
	});

	//生成毛利值，毛利率
	$('#salePrice').numberbox({
	 onChange:function(newValue,oldValue){
	 setGrossProfit();
	 }
	 });

	 $('#purchasePrice').numberbox({
	 onChange:function(newValue,oldValue){
	 setGrossProfit();
	 }
	 });

    //商品类型
    $('#type').change(function(){
        typeChange();
    });
}

function typeChange(){
    var pricingType = 	$('#type').val();
    //计件方式为“普通”，需要商品类别生成货号，其他不需要，直接生成货号，并且货号全部都是只可读
    if(pricingType == ""){
        return false;
    }else{
        //为捆绑商品 自动转换 联营商品时不管理库存
        if(pricingType == "BIND"||pricingType == "AUTOMATICTRANSFER"){
            $("#managerStock").removeAttr("checked");
            $("#managerStock").prop("disabled","disabled");
        }else{
            if( $("#saleWay").val() == "C"){
                $("#managerStock").removeAttr("checked");
                $("#managerStock").prop("disabled","disabled");
            }else{
                $("#managerStock").prop("checked","checked");
                $("#managerStock").removeProp("disabled");
            }
        }
    }
}

//根据商品名称获取助记码
function getMemoryCode(){
	var reqObj = {"skuName":$("#skuName").val()};
	$.ajax({
		url:contextPath+"/goods/newGoodsApply/getMemoryCode",
		type:"POST",
		data:reqObj,
		success:function(result){
			$("#memoryCode").val(result); //助记码
		},
		error:function(result){
			console.log(result);
		}
	});
}


//商品自动生成货号
function getSkuCodeVal(){
	var pricingType = $('#pricingType option:selected').val();
	var categoryCode = $("#categoryCode").val();
	if(pricingType == ""){
		return false;
	}else{
		//计件方式为“普通”
		if(pricingType == "ORDINARY"){
			$("#barCode").removeAttr("readonly");
		}else{ //“其他”计件方式
			$("#barCode").attr("readonly","readonly");
			$("#barCode").val($("#skuCode").val()); //货号
		}
//		if(pricingType == "ordinary"){
//			if(categoryCode == ""){
//				$("#skuCode").val("");
//				$("#barCode").removeAttr("readonly");
//				return false;
//			}else{
////				getSkuCode(pricingType,categoryCode);
//			}
//		}else{ //“其他”计件方式
////			getSkuCode(pricingType,categoryCode);
//		}

	}
}

/**
 * 商品自动生成货号
 * pricingType:计价方式
 * categoryCode:商品类别
 */
function getSkuCode(pricingType,categoryCode){
	var reqObj = {"pricingType":pricingType,"categoryCode":categoryCode};
	$.ajax({
		url:contextPath+"/goods/newGoodsApply/getSkuCode",
		type:"POST",
		data:reqObj,
		success:function(result){
			console.log("货号==",result);
			$("#skuCode").val(result); //货号

			//计价/计重商品自动生成条码
			getBarCodeVal(pricingType, result);
		},
		error:function(result){
			console.log(result);
		}
	});
}


//计价/计重商品自动生成条码
function getBarCodeVal(pricingType, skuCode){
	//var pricingType = $('#pricingType option:selected').val(); //计价方式
	//var skuCode = $("#skuCode").val(); //商品货号
	//计件方式为“普通”，手动输入条码，不自动生成条码
	if(pricingType == "" || skuCode == "" || pricingType == "ordinary"){
		$("#barCode").removeAttr("readonly");
		return false;
	}else{
		getBarCode(pricingType,skuCode);
	}
}

/**
 * 计价/计重商品自动生成条码
 * pricingType:计价方式
 * skuCode:商品货号
 */
function getBarCode(pricingType,skuCode){
	var reqObj = {"pricingType":pricingType,"SkuCode":skuCode};
	$.ajax({
		url:contextPath+"/goods/newGoodsApply/getBarCode",
		type:"POST",
		data:reqObj,
		success:function(result){
			console.log("条码==",result);
			$("#barCode").val(result).attr("readonly","readonly");  //条码
		},
		error:function(result){
			console.log(result);
		}
	});
}


//监听方法
//商品分类
function getGoodsType(){
	var param = {
			categoryType:'goodsTotal'
	}
	new publicCategoryService(function(data){
		//console.log("商品分类==",data);
		$("#categoryId").val(data.goodsCategoryId);
		$("#categoryCode").val(data.categoryCode);
		$("#categoryName").val(data.categoryName);

		//商品自动生成货号
		getSkuCodeVal();
	},param);
}

//品牌
function getGoodsBrand(){
	new publicBrandService(function(data){
		//console.log("品牌==",data);
		$("#brandId").val(data.id);
		$("#brandCode").val(data.brandCode);
		$("#brandName").val(data.brandName);
	});
}

//供应商公共组件
function getGoodsPupplier(){
	new publicSupplierService(function(data){
		$("#supplierId").val(data.id);
		$("#supplierName").val(data.supplierName);
		$("#saleWayName").val(data.saleWayName);
		//经营方式
		$("#saleWay").val(data.saleWay);
        var pricingType = 	$('#type').val();
		if(data.saleWay=='A'){
			$("#supplierRate").textbox("setValue","");
			$('#supplierRate').numberbox('disable');
            if(pricingType == "BIND"|| pricingType == "AUTOMATICTRANSFER"){
                $("#managerStock").removeProp("checked");
                $("#managerStock").prop("disabled","disabled");
            }else{
                $("#managerStock").prop("checked","checked");
                $("#managerStock").removeProp("disabled");
            }
		}else{
            if(data.saleWay=='C' || pricingType == "BIND"|| pricingType == "AUTOMATICTRANSFER"){
                $("#managerStock").removeProp("checked");
                $("#managerStock").prop("disabled","disabled");
            }else{
                $("#managerStock").prop("checked","checked");
                $("#managerStock").removeProp("disabled");
            }

            $('#supplierRate').numberbox('enable');
		}
	});
}

//毛利值 = 零售价-进货价
function setGrossProfit(newV,oldV){
	
	
	var salePrice = parseFloat($("#salePrice").val().trim() || 0);
	var purchasePrice = parseFloat($("#purchasePrice").val().trim() || 0);
	if(salePrice != "" && purchasePrice != ""){
		var grossProfit = salePrice - purchasePrice;
		$("#grossProfit").textbox("setValue",grossProfit.toFixed(2));
		setGrossProfitPercent();
	}
}

//毛利率 =（零售价-进货价）/零售价
function setGrossProfitPercent(){
	var salePrice = parseFloat($("#salePrice").val().trim());
	var purchasePrice = parseFloat($("#purchasePrice").val().trim());
	
	var grossProfitPercent = (salePrice - purchasePrice) / salePrice;
	$("#marginTax").numberbox("setValue",(grossProfitPercent*100).toFixed(2));
}

//获取商品信息
function getGoodsArchivesDetail(id){
	var args = {}
	var httpUrl = contextPath+"/goods/newGoodsApply/getGoodsSkuById?id="+id;
	$.get(httpUrl, args,function(data){
		updateSku = data["_data"];
		
		$.each(data["_data"],function(key,value){
			
			//普通的input
			if($("#"+key).prop("tagName") == "INPUT"){
				if($("#"+key).attr('type')=="checkbox"){
					if(value){
						$("#"+key).attr("checked","checked");
					}
				}else{
					//进项税、销项税、联营扣率要乘以100
					if($("#"+key).attr("id") == "outputTax" || $("#"+key).attr("id") == "inputTax" || $("#"+key).attr("id") == "supplierRate"){
						if(value){
							$("#"+key).textbox("setValue",parseFloat((value*100).toFixed(2)));
						}else{
							$("#"+key).textbox("setValue",0.00);
						}
					}else{
						if($("#"+key).hasClass('easyui-numberbox')){
							$("#"+key).numberbox('setValue', value);
						}else{
							$("#"+key).val(value);
						}
					}
				}
			}
			else if($("#"+key).prop("tagName") =="TEXTAREA"){ //普通的textarea
				$("#"+key).html(value);
			}
			else if($("#"+key).prop("tagName") == "SELECT"){
				if(value){
					$("#"+key+" option").each(function(i,n){
						if($(n).val() == value || $(n).val()==value.name){
							$(n).attr("selected",true);
						}
					});
					if(key=="unit"){
						$("#"+key).combobox("setValue",value);
					}
				}
			}
		});
		$("#saleWay").val(updateSku.saleWay);
		if(updateSku.saleWay=='A'){
			$('#supplierRate').numberbox('disable');
		}else{
			$('#supplierRate').numberbox('enable');
		}

        var pricingType = 	$('#type').val();
        if(updateSku.saleWay=='C' || pricingType == "BIND"|| pricingType == "AUTOMATICTRANSFER"){
            $("#managerStock").removeAttr("checked");
            $("#managerStock").prop("disabled","disabled");
        }

		if(updateSku.updateTime){
			var date = new Date(updateSku.updateTime);    
			$("#createTimeUpdate").val(date.format("yyyy-MM-dd hh:mm:ss"));
		}
		var createTime = new Date(updateSku.createTime);    
		$("#createTime").val(createTime.format("yyyy-MM-dd hh:mm:ss"));
		setGrossProfit();
	});


}

//判断普通商品条码是否重复
function checkBarCodeByOrdinary(){
	var result = false;
	var reqObj = {"barCode":$("#barCode").val(), "id":$("#id").val()};
	$.ajax({
		url:contextPath+"/goods/newGoodsApply/checkBarCodeByOrdinary",
		type:"POST",
		asyn:false,
		data:reqObj,
		success:function(result){
			if(result.code == 0){
				result = true;
			}
		},
		error:function(result){
			console.log(result);
		}
	});
	return result;
}

//商品保存
function saveGoodsArchives(){
	$('#updateGoodsArchives').attr("disabled","disabled");
	//校验表单
	var isValid = $("#formGoodsArchivesAdd").form('validate');
	
	if(!isValid){
		$('#updateGoodsArchives').removeAttr("disabled");
		return;
	}

    if($('#skuName').val().trim()===""){
        $('#updateGoodsArchives').removeAttr("disabled");
        messager("请输入商品名称");
        return;
    }
	
	var salePriceV = $("#salePrice").numberbox("getValue");
    var vipPrice = $("#vipPrice").numberbox("getValue");
	if(parseFloat(salePriceV || 0) <= 0){
		$('#saveGoodsArchives').removeAttr("disabled");
        messager("零售价必须大于0!");
		return;
	}
    if(parseFloat(vipPrice || 0) <= 0){
        $('#saveGoodsArchives').removeAttr("disabled");
        messager("会员价必须大于0!");
        return;
    }
	
	if($("#purchaseSpec").val()=== '0.00'){
		$('#updateGoodsArchives').removeAttr("disabled");
		messager("进货规格不能为0!");
		return;
	}
	
	if($("#distributionSpec").val()=== '0.00'){
		$('#updateGoodsArchives').removeAttr("disabled");
		messager("配送规格不能为0");
		return;
	}
	
	if(parseFloat($("#vipPrice").val()) > parseFloat($("#salePrice").val())){
		$('#updateGoodsArchives').removeAttr("disabled");
		messager("会员价不能大于零售价");
		return;
	}

	//校验商品条码是否重复
	var pricingType = $('#pricingType option:selected').val();
	var barCode = $("#barCode").val();
	var skuName = $("#skuName").val();
	// 普通商品需要校验条码是否重复
	var reqObj = {"barCode":barCode,"skuName":skuName, "id":$("#id").val()};
	$.ajax({
		url:contextPath+"/goods/newGoodsApply/checkBarCodeByOrdinary",
		type:"POST",
		data:reqObj,
		async:false, 
		success:function(result){
			if(result.code == 0){
				submitForm();
			}else{
				$('#updateGoodsArchives').removeAttr("disabled");
                messager(result.message);
			}
		},
		error:function(result){
			console.log(result);
		}
	});
}

//提交表单
function submitForm(){
	var url = contextPath+'/goods/newGoodsApply/updateGoods';
	$('#formGoodsArchivesAdd').form("submit",{
		url:url,
		success:function(data){
			if(JSON.parse(data).code == 0){
                messager("保存成功");
				goodsSearch();
				closeDialog();
			}else{
				$('#updateGoodsArchives').removeAttr("disabled");
                messager(JSON.parse(data).message);
			}
		}
	});
}
function onChangeUnit(newV,oldV){
	$("#unit").combobox("setValue",newV);
}


//复制商品
function copyArchives(type){
	var barCode = $("#barCode").val();
	getSkuCodeVal();
	if($("#pricingType").val()=="ordinary"){
		$("#barCode").val(barCode);
	}
	saveGoodsArchives(type);
}


//输入数字，保留两位小数
function checkSupplierRate(obj){
	obj.value =obj.value.replace(/[^0-9.]/g,'');
	if(obj.value.indexOf(".")>-1){
		if(obj.value.split(".").length-1>1){
			obj.value =obj.value.substring(0, obj.value.length-1);
		}else{
			if(obj.value.substr(obj.value.indexOf(".")+1).length > 2){
				obj.value =  obj.value.substring(0, obj.value.length-1);
			}
		}	  
	} 

	if(obj.value >= 100){
		obj.value =  obj.value.substring(0, obj.value.length-1);
	}
	return obj.value;
}
//新增
function goodsAddView(){
	closeDialog();
	openDialog(contextPath+"/goods/newGoodsApply/addGoodsView","新增商品档案","add","");
}

//复制新增
function copyAddGoodsView(){
	var selectionRow = ''+JSON.stringify(updateSku)+'';
	closeDialog();
	openDialog(contextPath+"/goods/newGoodsApply/addGoodsView","新增商品档案","copy",""+escape(selectionRow)+"");

//	setTimeout(function(){
//	var data = ''+JSON.stringify(updateSku)+'';
//	var newUrl = contextPath+"/goods/newGoodsApply/addGoodsView?data="+escape(data);
//	window.location.href = newUrl;
//	},10);
}
