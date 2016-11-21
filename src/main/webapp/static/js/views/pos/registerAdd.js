var dolg=$('#regadd');
function setDolgObj(obj){
	dolg = obj;
}
/**
 * 新增pos 关闭
 */
function toClose(){
	$(dolg).panel('destroy');
}

/**
 * 店铺名称
 */
function searchBranch(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}

/**
 * posNo验证
 */
$(document).on('input','#posNo',function(){
		var val=$(this).val();
		var reg=/^\+?(0|[1-9][0-9]*)$/;
		if(val.length>2){
		  var newVal=val.substring(0,2);
		  $(this).val(newVal);
		}
		else{
			if(!val.replace(reg)){
				$(this).val("");
			}
		}
	})	

/**
 * 新增pos 保存
 */
function toSave(){
	var branchId=$("#branchId").val();
	if(!branchId){
		messager("请先选择店铺名称");
		return;
	}
    var posNo=$('#posNo').val();
	if(!posNo){
		messager("请输入POS机编号");
		return;	
	}
	$.ajax({
    	url:contextPath+"/pos/register/addRegister",
    	type:"POST",
    	data:{
    		"branchId" : branchId,
    		"posNo":posNo
    	},
    	success:function(result){
    		console.log(result);
    		if(result['code'] == 0){
    			successTip("保存成功");
    			$(dolg).panel('destroy');
    		}else{
    			successTip(result['message']);
    		}
    	},
    	error:function(result){
    		successTip("请求发送失败或服务器处理失败");
    	}
    });
}
