/**
 * 新增用户
 */
function updateRole(){	
	var reqObj=$('#addRoleForm').serializeObject();
	var isValid = $("#addRoleForm").form('validate');
	if(!isValid){
		return;
	}
	
	$.ajax({
        url:contextPath+"/system/role/updateRole",
        type:"POST",
        data:reqObj,
        success:function(result){
        	if(result){
				alertTip(result.message, reloadDataGrid);
				initTreeRoles();
			}
        },
        error:function(result){
            successTip("请求发送失败或服务器处理失败");
        }
    });
}
