$(function(){

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
	var reqObj=$('#addUserForm').serializeObject();
	var isValid = $("#addUserForm").form('validate');
	if(!isValid){
		return;
	}

	$.ajax({
        url:contextPath+"/system/user/addUser",
        type:"POST",
        data:reqObj,
        success:function(result){
        	if(result){
				alertTip(result.message, reloadDataGrid);
			}
        },
        error:function(result){
            successTip("请求发送失败或服务器处理失败");
        }
    });
}


