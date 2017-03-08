
var applyAddcallback;
function initAddData(){
	$('#categoryDiv').css('display','none');
}

function initCallback(cb){
	applyAddcallback = cb;
}

function save() {
	$('#saveBtn').attr("disabled","disabled");
	var isValid = $("#formAdd").form('validate');
	if (!isValid) {
		$('#saveBtn').removeAttr("disabled");
		return;
	}
	var formObj = $('#formAdd').serializeObject();
	console.log('保存盘点批次申请单',formObj);
	$.ajax({
		url : contextPath + "/stocktaking/apply/saveStocktakingBatch",
		type : "POST",
		data : formObj,
		success : function(result) {
			if(result.code == 0){
				alertTip(result.message);
				closeDialogHandel();
			}else{
				$('#saveBtn').removeAttr("disabled");
				alertTip(result.message);
			}
			applyAddcallback();
		},
		error : function(result) {
			successTip("请求发送失败或服务器处理失败");
		}
	});
}

//清空表单
function cleanForm(){
	$("#brandCode").val('');
	$("#brandName").val('');
	$("#remark").val('');
}

//关闭属性编辑窗口
function closeDialogHandel(){
    if(addDalogTemp){
        $(addDalogTemp).panel('destroy');
    }
}

/**
 * 机构名称
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#addbranchId").val(data.branchesId);
		$("#addbranchCode").val(data.branchCode);
		$("#addbranchName").val(data.branchName);
	},'BF','');
}

function scopeChange(){
	var val = $("#formAdd #scope").combobox('getValue');
	if(val != ""){
		$('#categoryDiv').css('display','block');
	}else{
		$('#categoryDiv').css('display','none');
	}
}

/**
 * 类别选择
 */
function searchCategory(){
	var param = {
			categoryType:'',
			type:1
	}
	new publicCategoryService(function(data){
		var categoryIds = []
		var categorytxt="";
		$.each(data,function(index,item){
			categoryIds.push(item.goodsCategoryId);
			categorytxt = categorytxt +"["+item.categoryCode+"]"+item.categoryName +",";
		})
		$("#categoryIds").val(categoryIds);
		$("#categoryShows").val(categorytxt) ;
		
	},param);
}