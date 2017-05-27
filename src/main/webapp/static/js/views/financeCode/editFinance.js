/**
 * Created by zhaoly on 2017/5/23.
 */
$(function () {
    
})
var type = "add";
function initFinanceDialog(param) {
    type = param.type;
	if(param.type === "edit"){
		$("#id").val(param.id);
        $("#value").val(param.value);
        $("#value").addClass("uinp-no-more")
        $("#value").prop("readOnly","readOnly");
        $("#label").val(param.label);
        $("#remark").val(param.remark);
	}
    $("#dictTypeId").val(param.dictTypeId);
}

function saveFinanceCode() {
	var addUrl = contextPath+'/archive/financeCode/addFinanceCode'; 
	var updateUrl = contextPath+'/archive/financeCode/updateFinanceCode';
	var data = {
        dictTypeId:$("#dictTypeId").val(),
        value:$("#value").val(),
        label:$("#label").val(),
        remark:$("#remark").val()
    }
    if(type === "edit"){
        data.id = $("#id").val();
    }
	var param = {
		url:type === "add"?addUrl:updateUrl,
		data:data
	}
	$_jxc.ajax(param,function (result) {
        if(result['code'] == 0){
            successTip("保存成功");
        }else{
            successTip(result['message']);
        }
    },function (e) {

    })
}

