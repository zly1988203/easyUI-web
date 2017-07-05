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
        $("#cbDiv").css("display","none");
	}
    $("#dictTypeId").val(param.dictTypeId);
}

function saveFinanceCode() {
    //校验表单
    if($_jxc.isStringNull($("#value").val())){
        $_jxc.alert("编号不能为空");
        return;
    }

    if($("#value").val().trim().length < 4){
        $_jxc.alert("编号为4位数字");
        return;
    }


    if($_jxc.isStringNull($("#label").val())){
        $_jxc.alert("名称不能为空");
        return;
    }

	var addUrl = contextPath+'/archive/financeCode/addFinanceCode'; 
	var updateUrl = contextPath+'/archive/financeCode/updateFinanceCode';
	var data = {
        dictTypeId:$("#dictTypeId").val(),
        value:$("#value").val(),
        label:$("#label").val().trim(),
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
            queryFinanceCode();
            $_jxc.alert("保存成功");
            if(type === "add"){
                if($("#ckbSave").is(":checked")){
                    cleanForm();
                }else {
                    closeFinanceDialog();
                }
            }else{
                closeFinanceDialog();
            }


        }else{
            $_jxc.alert(result['message']);
        }
    },function (e) {

    })
}

//清空表单
function cleanForm(){
    $("#value").val('');
    $("#label").val('');
    $("#remark").val('');
}

