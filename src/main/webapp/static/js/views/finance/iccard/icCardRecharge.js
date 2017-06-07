/**
 * Created by zhaoly on 2017/5/22.
 */

function initCardRecharge(data){
    $("#cardRecharge #branchName").val(data.branchName);
    $("#cardRecharge #branchId").val(data.branchId);
    $("#cardRecharge #oldBalance").val(data.ecardBalance);
}

function getShopInfo() {

}
function changeBalance() {
    var oldBalance = parseFloat($('#oldBalance').val());
    var addBalance = parseFloat($('#addBalance').numberbox('getValue'));
    if(addBalance <= 0.00){
        $_jxc.alert("充值金额要大于0");
        $("#saveBtn").prop("disabled","disabled");
        return;
    }else{
        $("#saveBtn").removeProp("disabled");
    }
    $("#cardRecharge #newBalance").numberbox("setValue",(oldBalance+addBalance));
}


function save() {
    var addBalance = $('#addBalance').numberbox('getValue');
    if(!addBalance||addBalance <= 0.00){
    	 $_jxc.alert("充值金额不能为空！");
         return;
    }
    $_jxc.confirm("本次充值金额"+addBalance+",是否继续",function (data) {
        if(data){
        	$.post("management/recharge", $('#cardRecharge').serialize(),
        			   function(datas){
			        		if(datas.message==="success"){
			        			$('#closeRecharge').trigger('click'); 
			        		}
        					$_jxc.alert(datas.data);
        					$("#gridCardAccount").datagrid('reload');
        			   }
        	, "json");
        }
    })
}
