//日期控件 
function updateWdatePicker(){
        WdatePicker(
            {
                onpicked:function(dp){
                    $("input:radio[name='dateradio']").attr("checked",false);
                }
            })
}

function chechVal(){
   var num = $("#num").val();
   if(!num){
	   $_jxc.alert("兑换数量为空");
	   return false;
   }
   var integral = $("#integral").val();
   if(!integral){
	   $_jxc.alert("对应积分为空");
	   return false;
   }
   var startTime = $("#startTime").val();
   if(!startTime){
	   $_jxc.alert("开始时间为空");
	   return false;
   }
   var endTime = $("#endTime").val();
   if(!endTime){
	   $_jxc.alert("结束时间为空");
	   return false;
   }
	return true;
}

//保存
function saveArchives(){
	//校验参数
	var flag = chechVal();
	if(!flag){
		return;
	}
   var id = $("#id").val();
   var skuId = $("#skuId").val();
   var skuCode = $("#skuCode").val();
   var skuName = $("#skuName").val();
   var barCode = $("#barCode").val();
   var branchName = $("#branchName").val();
   var branchId = $("#branchId").val();
   var num = $("#num").val();
   var integral = $("#integral").val();
   var startTime = $("#startTime").val();
   var endTime = $("#endTime").val();
   
   var reqObj = {
		   id:id,
		   skuId:skuId,
		   skuCode:skuCode,
		   skuName:skuName,
		   barCode:barCode,
		   branchName:branchName,
		   branchId:branchId,
		   num:num,
		   integral:integral,
		   startTime:startTime,
		   endTime:endTime+" 23:59:59"
    };
   var req = JSON.stringify(reqObj);
    $.ajax({
        url:contextPath+"/integral/giftManager/updateGiftManager",
        type:"POST",
        contentType:'application/json',
        data:req,
        success:function(result){
            if(result['code'] == 0){
            	$(dalogTemp).panel('destroy');
            	$("#dataListGrid").datagrid('reload');
            }else{
                successTip(result['message']);
            }
        },
        error:function(result){
            successTip("请求发送失败或服务器处理失败");
        }
    });

}
