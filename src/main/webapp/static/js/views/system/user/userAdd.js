$(function(){
	initCheck();
});


/**
 * 机构列表下拉选
 */
function searchBranchInfo (){
	new publicAgencyService(function(data){
		$("#addUserForm #opBranchCompleCode").val(data.branchCompleCode);
		$("#addUserForm #opBranchId").val(data.branchesId);
		$("#addUserForm #opBranchType").val(data.type);
		$("#addUserForm #branchCodeSpan").text("S"+data.branchCode);
		$("#addUserForm #opBranchCode").val(data.branchCode);
		$("#addUserForm #branchNameCode").val("["+data.branchCode+"]"+data.branchName);
	},"","");
}

/**
 * 机构列表下拉选
 */
function searchRole (){
	var opBranchCompleCode = $("#addUserForm #opBranchCompleCode").val();
	if(!opBranchCompleCode){
		successTip("请先选择机构！");
		return;
	}
	
	var opBranchType = $("#addUserForm #opBranchType").val();
	new publicRoleService(function(data){
		$("#addUserForm #opRoleId").val(data.id);
		$("#addUserForm #opRoleCode").val(data.roleCode);
		$("#addUserForm #roleCodeOrName").val(data.roleName);
		
		//只有门店角色可以编辑最大折扣率
		var branchType = data.branchType;
		if(branchType==3||branchType==4||branchType==5){
			$("#maxDiscountRadio").numberbox({readonly: false});
		}else{
			$("#maxDiscountRadio").numberbox("setValue",100);
			$("#maxDiscountRadio").numberbox({readonly: true});
		}
	}, opBranchCompleCode, opBranchType);
}

/**
 * 新增用户
 */
function addUser(){	
	
	var reqObj = $('#addUserForm').serializeObject();
	var isValid = $("#addUserForm").form('validate');
	if (!isValid) {
		return;
	}
	
	var priceGrantArray = new Array();
	$(':checkbox[name="priceGrants"]:checked').each(function(){    
		priceGrantArray.push($(this).val());    
	});  
	
	var priceGrantStr = priceGrantArray.join(",");
	reqObj.priceGrantStr = priceGrantStr;
	
	var url = contextPath + "/system/user/addUser";
	var param = reqObj;
	ajaxSubmit(url,param,function(result){
        if(result){
            alertTip(result.message, reloadDataGrid);
        }
	});
}

function initCheck() {
    // 进价
    $("#purchase_price").on("click", function() {
        if($("#purchase_price").is(":checked")){
            $("#cost_price").prop("checked","checked")
		}else {
            $("#cost_price").removeProp("checked")
		}

    });
    // 零售价
    $("#cost_price").on("click", function() {
        if($("#cost_price").is(":checked")){
            $("#purchase_price").prop("checked","checked")
        }else {
            $("#purchase_price").removeProp("checked")
        }
    });
}
