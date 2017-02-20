/**
 * Created by zhangqin on 2017/2/17
 * 编辑商品
 */
var updateGoods;
function initGoodsInfo(skuId,branchId){
	var args = {}
	var httpUrl = contextPath+"/goods/report/getGoodsInfo?skuId="+skuId+"&branchId="+branchId;
	$.get(httpUrl, args,function(data){
		updateGoods = data["_data"];
		$.each(data["_data"],function(key,value){
			var element = "#formEdit #"+key;
			//普通的input
			if($(element).prop("tagName") == "INPUT"){
				if($(element).attr('type')=="checkbox"){
					if(value){ //传到前端checkbox选中的值是true
						$(element).attr("checked","checked");
					}
				}else{
					//进项税、销项税、联营扣率要乘以100
					if($(element).attr("id") == "outputTax" || $(element).attr("id") == "inputTax" || $(element).attr("id") == "supplierRate"){
						if(value){
							$(element).textbox("setValue",parseFloat((value*100).toFixed(2)));
						}else{
							$(element).textbox("setValue",0.00);
						}
					}else{
						if($(element).hasClass('easyui-numberbox')){
							$(element).numberbox('setValue', value);
						}else{
							$(element).val(value);
						}
					}
				}
			}
			else if($(element).prop("tagName") =="TEXTAREA"){ //普通的textarea
				$(element).html(value);
			}
			else if($(element).prop("tagName") == "SELECT"){
				if(value){
					$(element+" option").each(function(i,n){
						if($(n).val() == value || $(n).val()==value.name){
							$(n).attr("selected",true);
						}
					});
					if(key=="unit"){
						$(element).combobox("setValue",value);
					}
				}
			}
		});
		//门店禁止编辑配送规格、采购规格、
		var isStore=data['isStore'];
		if(isStore){
			$("#purchaseSpec").parent().find(".textbox-text,.validatebox-text").attr("readonly","readonly").addClass("uinp-no-more");
			$("#distributionSpec").parent().find(".textbox-text,.validatebox-text").attr("readonly","readonly").addClass("uinp-no-more");
			$("#formEdit #fastDeliver").attr("disabled","disabled");
		}
		
		//$("#saleWay").val(updateGoods.saleWay);
		if(updateGoods.saleWay=='A'){
			$("#supplierRate").parent().find(".textbox-text,.validatebox-text").attr("readonly","readonly").addClass("uinp-no-more");
		}else{
			$("#supplierRate").parent().find(".textbox-text,.validatebox-text,.textbox-prompt").removeAttr('readonly').removeClass("uinp-no-more");
		}
		if(updateGoods.updateTime){
			var date = new Date(updateGoods.updateTime);    
			$("#createTimeUpdate").val(date.format("yyyy-MM-dd hh:mm:ss"));
		}
		var createTime = new Date(updateGoods.createTime);    
		$("#createTime").val(createTime.format("yyyy-MM-dd hh:mm:ss"));
		setGrossProfit();
	});
}

//毛利值 = 零售价-进货价
function setGrossProfit(){
	var salePrice = parseFloat($("#salePrice").val().trim() || 0);
	var purchasePrice = parseFloat($("#purchasePrice").val().trim() || 0);
	if(salePrice != "" && purchasePrice != ""){
		var grossProfit = salePrice - purchasePrice;
		$("#grossProfit").val(grossProfit);
		$("#grossProfit").textbox("setValue",grossProfit.toFixed(2));
		setGrossProfitPercent();
	}
}

//毛利率 =（零售价-进货价）/零售价
function setGrossProfitPercent(){
	var salePrice = parseFloat($("#salePrice").val().trim());
	var purchasePrice = parseFloat($("#purchasePrice").val().trim());
	var grossProfitPercent = (salePrice - purchasePrice) / salePrice *100;
	$("#grossProfitPercent").val(grossProfitPercent.toFixed(2)+"%");
	$("#grossProfitPercent").textbox("setValue",grossProfitPercent.toFixed(2)+"%");
}

//供应商公共组件
function getGoodsPupplier(){
	new publicSupplierService(function(data){
		$("#supplierId").val(data.id);
		$("#supplier").val(data.supplierName);
		$("#saleWayName").val(data.saleWayName);
		//经营方式
		if(data.saleWayName=='购销'){
			$("#supplierRate").textbox("setValue","");
			$("#supplierRate").parent().find(".textbox-text,.validatebox-text").attr("readonly","readonly").addClass("uinp-no-more");
		}else{
			$("#supplierRate").parent().find(".textbox-text,.validatebox-text,.textbox-prompt").removeAttr('readonly').removeClass("uinp-no-more");
		}
	});
}

//保存
function saveProp() {
	$('#btnSave').attr("disabled","disabled");
	var isValid = $("#formEdit").form('validate');
	if (!isValid) {
		$('#btnSave').removeAttr("disabled");
		return;
	}
	
	if($('#purchaseSpec').val()=="0.00"){
		$('#btnSave').removeAttr("disabled");
		messager("进货规格不能为0!");
		return;
	}
	if($('#distributionSpec').val()=="0.00"){
		$('#btnSave').removeAttr("disabled");
		messager("配送规格不能为0!");
		return;
	}
	
	if($("#supplierId").val()!==updateGoods.supplierId){
		$.messager.confirm('提示',"是否更新下属机构相同供应商的主供应商?",function(data){
    		if(data){
    			submitForm();
    		}
    	});
	}else{
		submitForm();
	}
}

function submitForm(){
	var formObj = $('#formEdit').serializeObject();
	$.ajax({
		url : contextPath + "/branch/goods/branchGoodsPropSave",
		type : "POST",
		data : formObj,
		success : function(result) {
			if(result){
				successTip("保存成功");
			}else{
				$('#btnSave').removeAttr("disabled");
				successTip("保存失败");
			}
		},
		error : function(result) {
			successTip("请求发送失败或服务器处理失败");
		}
	});
}