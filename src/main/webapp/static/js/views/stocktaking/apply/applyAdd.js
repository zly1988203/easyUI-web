
var applyAddcallback;
$(function(){
    initAddData();
	//$("#branchCompleCode").val(sessionBranchCompleCode);
});
function initAddData(){
    $("#addbranchCode").val(sessionBranchCode);
    $("#addbranchName").val(sessionBranchName);
    $("#addbranchId").val(sessionBranchId);
}

function initCallback(cb){
	applyAddcallback = cb;
}

function save(){
    $('#saveBtn').attr("disabled","disabled");
    var isValid = true;

    if($('#addbranchName').val()===""){
        messager("请选择机构");
        isValid = false;
	}

    if($("#formAdd #scope").combobox('getValue')===''){
        messager("请选择盘点范围");
        isValid = false;
    }else if($("#formAdd #scope").combobox('getValue')==='1' && $('#formAdd #categoryShows').val()===""){
        messager("请选择类别");
        isValid = false;
	}

    if (!isValid) {
        $('#saveBtn').removeAttr("disabled");
        return;
    }

    $.messager.confirm('系统提示',"<p>盘点前务必补录遗漏的单据，审核未审核的业务单据（如：收货单、调出/入单、盘点差异单库存调整单等）。</p>" +
		"<div class='uc umar-l40 umar-b20'>暂停出入库业务，是否继续保存？</div>",function(r){
        if (r){
            saveDataHandel();
        }else{
            $('#saveBtn').removeAttr("disabled");
            return;
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
		$("#addbranchName").val("["+data.branchCode+"]"+data.branchName);
	},'BF','');
}

function scopeChange(){
	var val = $("#formAdd #scope").combobox('getValue');
	$('#categoryIds').val();
    $("#categoryShows").val('');
    // $("#categoryShows").textbox("setValue","");
	if(val === "1"){
		$('#categoryShows').removeClass('uinp-no-more');
		$('#categoryDiv').css('display','block');
	}else{
        $('#categoryShows').addClass('uinp-no-more')
		$('#categoryDiv').css('display','none');
	}
	categoryIds = [];
    categorytxt = [];

}

/**
 * 类别选择
 */
var categoryIds = [];
var categorytxt = [];
function searchCategory(){
    if(categoryIds.length == 30){
        alertTip('类型已选30个，不可再选');
        return;
    }

	var param = {
			categoryType:'',
			type:1,
        	amount:30
	}
	new publicCategoryService(function(data){
		var idsStrs = $("#categoryIds").val();
		var txtStrs = $("#categoryShows").val();
		$.each(data,function(index,item){
            if(idsStrs.indexOf(item.goodsCategoryId)=== -1){
                categoryIds.push(item.goodsCategoryId);
            }
            if(txtStrs.indexOf(item.categoryCode)=== -1){
                categorytxt.push(item.categoryCode);
            }
		})

		$("#categoryIds").val(categoryIds);
		$("#categoryShows").val(categorytxt) ;
		
	},param);
}

//重置
function gFunRefresh(){
    $("#formAdd").form('clear');
    initAddData();
}

function closeDialog() {
    $(addDalogTemp).panel('destroy');
}