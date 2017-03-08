
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
				alertTip(result.message, initDataGrid);
				closeDialogHandel();
			}else{
				$('#saveBtn').removeAttr("disabled");
				alertTip(result.message);
			}
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

/**
 * 类别选择
 */
function searchCategory(){
	var param = {
			categoryType:'',
			type:1
	}
	new publicCategoryService(function(data){
		$("#categoryId").val(data.categoryId);
		$("#categoryShows").val(data.categoryCode);
	},param);
}