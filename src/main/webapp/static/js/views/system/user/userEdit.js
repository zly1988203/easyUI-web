$(function(){
    initCheck();
});


/**
 * 机构列表下拉选
 */
function searchBranchInfo (){
	new publicAgencyService(function(data){
		$("#editUserForm #opBranchCompleCode").val(data.branchCompleCode);
		$("#editUserForm #opBranchId").val(data.branchesId);
		$("#editUserForm #opBranchType").val(data.type);
		$("#editUserForm #branchNameCode").val("["+data.branchCode+"]"+data.branchName);
	},"","");
}

/**
 * 角色列表下拉选
 */
function searchRole (){
	var opBranchCompleCode = $("#editUserForm #opBranchCompleCode").val();
	if(!opBranchCompleCode){
		$.messager.alert("提示", "请先选择机构！","warning");
		return;
	}
	var opBranchType = $("#editUserForm #opBranchType").val();
	new publicRoleService(function(data){
		$("#editUserForm #opRoleId").val(data.id);
		$("#editUserForm #opRoleCode").val(data.roleCode);
		$("#editUserForm #roleCodeOrName").val(data.roleName);
		
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
 * 编辑用户
 */
function editUser(){	
	var reqObj = $('#editUserForm').serializeObject();
	var isValid = $("#editUserForm").form('validate');
	if (!isValid) {
		return;
	}
	var url = contextPath + "/system/user/updateUser";
	var param = reqObj;
	ajaxSubmit(url,param,function(result){
        if(result){
            alertTip(result.message, reloadDataGrid);
        }
	})

}

function savePassword() {
    var url = contextPath + "/system/user/updateUser";
    var param = null
    ajaxSubmit(url,param,function(result){
        if(result){
            alertTip(result.message, reloadDataGrid);
        }
    })
}

function initPassword() {
    $.messager.confirm('提示','是否进行密码初始化',function(data){
    	$("#userPwd").val("123456");
	})
}

function initCheck() {
    // 进价
    $("#purchasePrice").on("click", function() {
        if($("#purchasePrice").is(":checked")){
            $("#costPrice").prop("checked","checked")
		}else {
            $("#costPrice").removeProp("checked")
		}

    });
    // 零售价
    $("#costPrice").on("click", function() {
        if($("#costPrice").is(":checked")){
            $("#purchasePrice").prop("checked","checked")
        }else {
            $("#purchasePrice").removeProp("checked")
        }
    });
}
