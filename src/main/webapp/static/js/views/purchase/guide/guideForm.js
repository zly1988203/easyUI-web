//采购向导 第一步

var formData;
$(function(){
	//获取数据对象 第二部返回到这一步 进行数据回显
	formData = $("#formData").val();
	
	if('undefined' != typeof(formData) && "" != formData){
		formData = $.parseJSON(formData);
		setFormValue(formData);
	}	
	
	$('.radioItem').change(function(){
		var _this = $(this);
		$('#guideType').val(_this.val());
		if(_this.val() === "1" || _this.val() === "2"){
			$('#startTime').prop('disabled','disabled');
			$('#startTime').addClass('uinp-no-more');
			$('#endTime').prop('disabled','disabled');
			$('#endTime').addClass('uinp-no-more');
			$('#ignore').prop('disabled','disabled');
		}else{
			$('#startTime').removeProp('disabled');
			$('#startTime').removeClass('uinp-no-more');
			$('#endTime').removeProp('disabled');
			$('#endTime').removeClass('uinp-no-more');
			$('#ignore').removeProp('disabled');
		}
	})
})

//为页面赋值
function setFormValue(formData){
	$("#branchId").val(formData.branchId);
	$("#branchCompleCode").val(formData.branchCompleCode);
	$("#branchCodeName").val(formData.branchCodeName);
	$("#branchType").val(formData.branchType);
	$("#supplierId").val(formData.supplierId);
	$("#supplierCodeName").val(formData.supplierCodeName);
	$("#categoryCode").val(formData.categoryCode);
	$("#categoryCodeName").val(formData.categoryCodeName);
	$('#startTime').val(formData.deliverStartDate);
	$('#endTime').val(formData.deliverEndDate);
	$(':radio[name=guideType]').eq(formData.guideType - 1).prop('checked', true);
	if(formData.ignore === '1'){
		$('#ignore').prop('checked','checked');
	}
	
}

/**
 * 机构名称
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchCode").val(data.branchCode);
		$("#branchCompleCode").val(data.branchCompleCode);
		$("#branchType").val(data.type);
		$("#branchCodeName").val("["+data.branchCode+"]"+data.branchName);
	},'BF','');
}

function selectSupplier(){
	new publicSupplierService(function(data){
		$("#supplierId").val(data.id);
		$("#supplierCodeName").val("["+data.supplierCode+"]"+data.supplierName);
	});
}
/**
 * 类别选择
 */
function searchCategory(){
	
	new publicCategoryService(function(data){
		$("#categoryCode").val(data.categoryCode);
		$("#categoryCodeName").val("["+data.categoryCode+"]"+data.categoryName);
	});
}

//下一步
function nextStep (){
	
	var branchType = $("#branchType").val();
	var branchId = $("#branchId").val();
	var branchCodeName = $("#branchCodeName").val();
	if(!branchCodeName|| !branchType || !branchId){
		successTip("机构信息为空");
		return;
	}
	
	if(branchType==0){
		successTip("不能选择总部类型的机构");
		return;
	}
	
	var ignore = 0;
	if($('#ignore').is(':checked')) {
		ignore = 1;
	 }
	
	var param = {
			branchId:branchId,
			branchCompleCode:$("#branchCompleCode").val(),
			branchType:branchType,
			branchCodeName:branchCodeName,
			supplierId:$("#supplierId").val(),
			supplierCodeName:$("#supplierCodeName").val(),
			categoryCode:$("#categoryCode").val(),
			categoryCodeName:$("#categoryCodeName").val(),
			deliverStartDate:$('#startTime').val(),
			deliverEndDate:$('#endTime').val(),
			guideType:$(':radio[name=guideType]:checked').val(),
			ignore:ignore
	}
	
	//提交参数并跳转到第二步
	$.StandardPost(contextPath+"/form/purchaseGuide/toGuideGoodsList", param);
	
}

