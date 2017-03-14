
var applyAddcallback;
function initAddData(){
	$('#categoryDiv').css('display','none');
}

function initCallback(cb){
	applyAddcallback = cb;
}

function save(){
    $('#saveBtn').attr("disabled","disabled");
    var isValid = $("#formAdd").form('validate');
    if (!isValid) {
        $('#saveBtn').removeAttr("disabled");
        return;
    }

    $.messager.confirm('系统提示',"<p>盘点前务必补录遗漏的单据，审核未审核的业务单据（如：收货单、调出/入单、盘点差异单库存调整单等）。</p>" +
		"<div class='uc umar-l40 umar-b20'>暂停出入库业务，是否继续保存？</div>",function(r){
        if (r){
            saveDataHandel();
        }
    });
}

function saveDataHandel() {
    var formObj = $('#formAdd').serializeObject();
    console.log('保存盘点批次申请单',formObj);

	$.ajax({
		url : contextPath + "/stocktaking/apply/saveStocktakingBatch",
		type : "POST",
		data : formObj,
		success : function(result) {
			if(result.code == 0){
				alertTip(result.message, queryForm);
				applyAddcallback();
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

/**
 * 机构名称
 */
function selecAddtBranches(){
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
			type:1,
        	amount:30
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

//重置
function gFunRefresh(){
    $("#formAdd").form('clear');
}