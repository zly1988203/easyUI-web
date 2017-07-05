/**
 * 新增用户
 */
function updateRole(){	
	var reqObj=$('#addRoleForm').serializeObject();
	var isValid = $("#addRoleForm").form('validate');
	if(!isValid){
		return;
	}
	
	$_jxc.ajax({
        url:contextPath+"/system/role/updateRole",
        data:reqObj
    },function(result){
    	if(result){
			alertTip(result.message, reloadDataGrid);
			initTreeRoles();
		}
    });
}
