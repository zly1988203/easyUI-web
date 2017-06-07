/**
 * Created by zhaoly on 2017/6/7.
 */
/**
 * Created by zhaoly on 2017/5/22.
 */

function initCardTypeData(item){
    $("#cardTypeId").val(item.id);
    $("#cardType").val(item.ecardType);
    $("#ip").val(item.clearingCenterIp);
    $("#port").numberbox("setValue",item.clearingCenterPort);
    $("#code").val(item.operationDeptCode);
}


function saveSettingType() {

    var isValid = $("#cardTypeEdit").form('validate');
    if(!isValid){
        return;
    }

    var formData = $('#cardTypeAdd').serializeObject();
    var url = contextPath + "/iccard/setting/type/update";
    var param = formData;
    $.post(url,param,function(result){
        if(result.code===0){
            $('#closeCardType').trigger('click');
            $_jxc.alert(result.data);
        }else{
            $_jxc.alert(result.message);
        }

        $("#gridCardSetting").datagrid('reload');
    },"json")
}