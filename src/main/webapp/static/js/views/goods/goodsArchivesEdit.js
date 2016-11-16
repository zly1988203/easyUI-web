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
	/*$('#salePrice').numberbox({
	 onChange:function(newValue,oldValue){
	 setGrossProfit();
	 }
	 });

	 $('#purchasePrice').numberbox({
	 onChange:function(newValue,oldValue){
	 setGrossProfit();
	 }
	 });*/
	//生成毛利值，毛利率
	$('#salePrice').on("input",function(){
		setGrossProfit();
	});
	$('#purchasePrice').on("input",function(){
		setGrossProfit();
	});
	//限制备注最大长度
}

//根据商品名称获取助记码
function getMemoryCode(){
	var reqObj = {"skuName":$("#skuName").val()};
	$.ajax({
		url:contextPath+"/common/goods/getMemoryCode",
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
		url:contextPath+"/common/goods/getSkuCode",
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
		url:contextPath+"/common/goods/getBarCode",
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
	new publicCategoryService(function(data){
		//console.log("商品分类==",data);
		$("#categoryId").val(data.goodsCategoryId);
		$("#categoryCode").val(data.categoryCode);
		$("#categoryName").val(data.categoryName);

		//商品自动生成货号
		getSkuCodeVal();
	},'goodsTotal');
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
		
		console.info("供应商==",data);
		$("#supplierId").val(data.id);
		$("#supplierName").val(data.supplierName);
		$("#saleWayName").val(data.saleWayName);
		//经营方式
		$("#saleWay").val(data.saleWay);
		if(data.saleWay=='A'){
			$('#supplierRate').textbox('disable'); 
		}else{
			$('supplierRate').removeAttr('disabled');
		}
		
	});
}

//毛利值 = 零售价-进货价
function setGrossProfit(){
	var salePrice = parseFloat($("#salePrice").val().trim() || 0);
	var purchasePrice = parseFloat($("#purchasePrice").val().trim() || 0);
	if(salePrice != "" && purchasePrice != ""){
		var grossProfit = salePrice - purchasePrice;
		//$("#grossProfit").val(grossProfit);
		$("#grossProfit").textbox("setValue",grossProfit.toFixed(2));
		setGrossProfitPercent();
	}
}

//毛利率 =（零售价-进货价）/零售价
function setGrossProfitPercent(){
	var salePrice = parseFloat($("#salePrice").val().trim());
	var purchasePrice = parseFloat($("#purchasePrice").val().trim());
	var grossProfitPercent = (salePrice - purchasePrice) / salePrice *100;
//	$("#grossProfitPercent").val(grossProfitPercent.toFixed(2)+"%");
	$("#grossProfitPercent").textbox("setValue",grossProfitPercent.toFixed(2)+"%");
}

//获取商品信息
function getGoodsArchivesDetail(id){
	var args = {}
	var httpUrl = contextPath+"/common/goods/getGoodsSkuById?id="+id;
	$.get(httpUrl, args,function(data){
		console.log("data="+data);
		updateSku = data["_data"];
		
		$.each(data["_data"],function(key,value){
			
			//普通的input
			if($("#"+key).prop("tagName") == "INPUT"){
				if($("#"+key).attr('type')=="checkbox"){
					if(value){ //传到前端checkbox选中的值是true
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
		//debugger;
		$("#saleWay").val(updateSku.saleWay);
		if(updateSku.saleWay=='A'){
			$('#supplierRate').textbox('disable'); 
		}else{
			$('supplierRate').removeAttr('disabled');
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
		url:contextPath+"/common/goods/checkBarCodeByOrdinary",
		type:"POST",
		asyn:false,
		data:reqObj,
		success:function(result){
			if(result.code == 0){ //条码不重复
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

	//校验商品条码是否重复
	var pricingType = $('#pricingType option:selected').val();
	var barCode = $("#barCode").val();
	if(pricingType == "ORDINARY"){// 普通商品需要校验条码是否重复
		var reqObj = reqObj = {"barCode":barCode, "id":$("#id").val()};

		$.ajax({
			url:contextPath+"/common/goods/checkBarCodeByOrdinary",
			type:"POST",
			data:reqObj,
			async:false, 
			success:function(result){
				if(result.code == 0){
					submitForm();
				}else{
					$('#updateGoodsArchives').removeAttr("disabled");
					$.messager.alert("提示",result.message);
				}
			},
			error:function(result){
				console.log(result);
			}
		});

	}else{
		submitForm();
	}


}

//提交表单
function submitForm(){
	var url = contextPath+'/common/goods/updateGoods';
	$('#formGoodsArchivesAdd').form("submit",{
		url:url,
		success:function(data){
			if(JSON.parse(data).code == 0){
				$.messager.alert("提示","保存成功");
				goodsSearch();
				closeDialog();
			}else{
				$('#updateGoodsArchives').removeAttr("disabled");
				$.messager.alert("提示",JSON.parse(data).message);
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
	openDialog(contextPath+"/common/goods/addGoodsView","新增商品档案","add","");
}

//复制新增
function copyAddGoodsView(){
	var selectionRow = ''+JSON.stringify(updateSku)+'';
	closeDialog();
	openDialog(contextPath+"/common/goods/addGoodsView","新增商品档案","copy",""+escape(selectionRow)+"");

//	setTimeout(function(){
//	var data = ''+JSON.stringify(updateSku)+'';
//	var newUrl = contextPath+"/common/goods/addGoodsView?data="+escape(data);
//	window.location.href = newUrl;
//	},10);
}
