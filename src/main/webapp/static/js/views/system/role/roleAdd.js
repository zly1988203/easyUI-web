$(function(){
	changeRoleType();
	
	//如果是总部
	if(sessionBranchType=='0'){
		changeIsCommonRole();
	}
});

function searchBranchInfo (){
	var branchType = $(':radio[name=branchType]:checked').val();
	if(!branchType){
		$_jxc.alert("请先选择角色类型！");
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
			$(':radio[name=isCommonRole][value=1]').removeAttr("checked"); //总部默认为机构角色，所属机构为总部
			$(':radio[name=isCommonRole][value=0]').prop('checked', true); //总部默认为机构角色，所属机构为总部
			$(':radio[name=isCommonRole]').attr("disabled", "disabled");
			$("#branchNameCodeMore").hide();
			$("#opBranchId").val(sessionBranchId);
		}else{
			$("#branchNameCode").val("");
			$("#branchNameCodeMore").show();
			$("#opBranchId").val(null);
			if(sessionBranchType=='0'){
				$(':radio[name=isCommonRole]').removeAttr("disabled");
			}
			
		}
		
	});
}

function changeIsCommonRole(){
	$(":radio[name=isCommonRole]").change(function(i){
		var isCommonRole = $(':radio[name=isCommonRole]:checked').val();
		
		//只针对于总部角色
		if(sessionBranchType!='0'){
			return;
		}
		if(isCommonRole==0){ //机构角色，需要选择所属机构
			$("#branchNameCode").val("").removeAttr("disabled");
			$("#branchNameCodeMore").show();
			
		}else{	//公共角色，所属机构为全部
			$("#branchNameCode").val("所有").attr("disabled", "disabled");
			$("#branchNameCodeMore").hide();
		}
		$("#opBranchId").val(null);
		
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
	var isCommonRole = $(':radio[name=isCommonRole]:checked').val();
	if(!branchType){
		$_jxc.alert("角色类型为空！");
		return;
	}
	
	if(isCommonRole==0 && !$("#opBranchId").val()){
		$_jxc.alert("所属机构为空！");
		return;
	}

	$_jxc.ajax({
        url:contextPath+"/system/role/addRole",
        data:reqObj
    },function(result){
    	if(result){
            $_jxc.alert(result.message,reloadDataGrid);
			initTreeRoles();
		}
    });
}
