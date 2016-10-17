$(function(){
    //initDatagrid();
});


/**
 * 机构列表下拉选
 */
function searchBranchInfo (){
	new publicAgencyService(function(data){
		$("#opBranchCompleCode").val(data.branchCompleCode);
		$("#opBranchId").val(data.branchesId);
		$("#opBranchType").val(data.type);
		$("#branchCodeSpan").text("S"+data.branchCode);
		$("#opBranchCode").val(data.branchCode);
		$("#branchNameCode").val("["+data.branchCode+"]"+data.branchName);
	},"","");
}

/**
 * 机构列表下拉选
 */
function searchRole (){
	var opBranchCompleCode = $("#opBranchCompleCode").val();
	if(!opBranchCompleCode){
		$.messager.alert("提示", "请先选择机构！","warning");
		return;
	}
	var opBranchType = $("#opBranchType").val();
	new publicRoleService(function(data){
		$("#opRoleId").val(data.id);
		$("#opRoleCode").val(data.roleCode);
		$("#roleCodeOrName").val(data.roleName);
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


