//采购向导 第一步

var formData;
$(function(){
	//获取数据对象 第二部返回到这一步 进行数据回显
	formData = $("#formData").val();
	
	if('undefined' != typeof(formData) || null != formData){
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
	$("#branchId").val(formData.branchId)
	$("#branchCode").val(formData.branchCode)
	$("#branchName").val(formData.branchName)
	$("#supplierId").val(formData.supplierId)
	$("#supplierName").val(formData.supplierName)
	$("#categoryIds").val(formData.categoryIds)
	$("#categoryShows").val(formData.categoryShows)
	$('#startTime').val(formData.branchId)
	$('#endTime').val(formData.branchId)
	$('#guideType').val(formData.guideType)
	if(formData.ignore === '1'){
		$('#ignore').prop('checked','checked')
	}
	
}

/**
 * 机构名称
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchCode").val(data.branchCode);
		$("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},'BF','');
}

function selectSupplier(){
	new publicSupplierService(function(data){
		$("#supplierId").val(data.id);
		$("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
	});
}
/**
 * 类别选择
 */
function searchCategory(){
	var param = {
			categoryType:'',
			type:0
	}
	new publicCategoryService(function(data){
		var categoryIds = []
		var categorytxt=[];
		$.each(data,function(index,item){
			categoryIds.push(item.goodsCategoryId);
			categorytxt.push(item.categoryCode);
		})
		$("#categoryIds").val(categoryIds);
		$("#categoryShows").val(categorytxt) ;
		
	},param);
}

//下一步
function nextStep (){
	var ignore = 0;
	if($('#ignore').is(':checked')) {
		ignore = 1;
	 }
	
	var param = {
			brancheId:$("#branchId").val(),
			branchCode:$("#branchCode").val(),
			branchName:$("#branchName").val(),
			supplierId:$("#supplierId").val(),
			supplierName:$("#supplierName").val(),
			categoryId:$("#categoryIds").val(),
			categoryShows:$("#categoryShows").val(),
			deliverStartDate:$('#startTime').val(),
			deliverEndDate:$('#endTime').val(),
			guideType:$('#guideType').val(),
			ignore:ignore
	}
	
    $.ajax({
        url:contextPath+"/form/deliverForm/insertDeliverForm",
        type:"POST",
        contentType:"application/json",
        data:JSON.stringify(param),
        success:function(result){
            if(result['code'] == 0){
                    location.href = contextPath +"/form/deliverForm/deliverEdit?deliverFormId=" + result["formId"];
            }else{
                successTip(result['message'] +","+strResult);
            }
        },
        error:function(result){
            successTip("请求发送失败或服务器处理失败");
        }
    });
	
}

