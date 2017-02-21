$(function(){
	changeRoleType();
});

function searchBranchInfo (){
	var branchType = $(':radio[name=branchType]:checked').val();
	if(!branchType){
		successTip("请先选择角色类型！");
		return;
	}
	
	new publicAgencyService(function(data){
		$("#opBranchCompleCode").val(data.branchCompleCode);
		$("#opBranchId").val(data.branchesId);
		$("#opBranchType").val(data.type);
		$("#opBranchCode").val(data.branchCode);
		$("#branchNameCode").val("["+data.branchCode+"]"+data.branchName);
	},"","", branchType);
}

/**
 * 切换角色类型事件
 */
function changeRoleType(){
	$(":radio[name=branchType]").change(function(i){
		var branchType = $(':radio[name=branchType]:checked').val();
		
		//只针对于总部角色
		if(sessionBranchType!='0'){
			return;
		}
		if(branchType==0){ //总部
			$("#branchNameCode").val(sessionBranchCodeName).attr("disabled", "disabled");
			$("#branchNameCodeMore").hide();
			$("#opBranchCompleCode").val("");
			$("#opBranchId").val(sessionBranchCode);
			$("#opBranchType").val("");
			$("#opBranchCode").val("");
		}else{
			$("#branchNameCode").val("");
			$("#branchNameCodeMore").show();
		}
		
	});
}

/**
 * 新增用户
 */
function addRole(){	
	var reqObj=$('#addRoleForm').serializeObject();
	var isValid = $("#addRoleForm").form('validate');
	if(!isValid){
		return;
	}
	
	var branchType = $(':radio[name=branchType]:checked').val();
	if(!branchType){
		successTip("角色类型为空！");
		return;
	}
	
	if(!$("#opBranchId").val()){
		successTip("所属机构为空！");
		return;
	}

	$.ajax({
        url:contextPath+"/system/role/addRole",
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
