$(function(){
    initCheck();
    
    initpriceGrantCheck();
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
	
	var priceGrantArray = new Array();
	$(':checkbox[name="priceGrants"]:checked').each(function(){    
		priceGrantArray.push($(this).val());    
	});  
	
	var priceGrantStr = priceGrantArray.join(",");
	reqObj.priceGrantStr = priceGrantStr;
	
	var url = contextPath + "/system/user/updateUser";
	var param = reqObj;
	ajaxSubmit(url,param,function(result){
        if(result){
            alertTip(result.message, reloadDataGrid);
        }
	});

}

function savePassword() {
    var reqObj = $('#passwordForm').serializeObject();
    var isValid = $("#passwordForm").form('validate');
    if (!isValid) {
        return;
    }

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

function initpriceGrantCheck(){
	var priceGrantStr = $("#priceGrantStr").val();
	if(!priceGrantStr){
		return;
	}
	
	var priceGrantArray = priceGrantStr.split(",");
	for(var i in priceGrantArray){
		if($("#"+priceGrantArray[i])){
			$("#"+priceGrantArray[i]).prop("checked", true);
		}
	}
}
