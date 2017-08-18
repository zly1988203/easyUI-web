/**
 * Created by zhaoly on 2017/8/17.
 */
$(function () {
    
})
//编辑状态下 赋值
function initKeyGroupData(item) {
    
}

function saveGroup() {
    if(!$("#sort").val()){
        $_jxc.alert("请输入排序");
        return;
    }

    if(!$("#name").val()){
        $_jxc.alert("请输入分组名称");
        return;
    }

    var formObj = $("#groupAdd").serializeObject();

    $_jxc.ajax({
        url:contextPath+'/common/chargeSelect/getChargeComponentList',
        data:formObj,
    },function(result){
        if(result.code == 0){
            $_jxc.alert("添加分组成功",function () {
                closeCardDialog();
                getGroupList();
            })
        }else{
            $_jxc.alert(result['message']);
        }
    })
}

function updateGroup() {
    if(!$("#sort").val()){
        $_jxc.alert("请输入排序");
        return;
    }

    if(!$("#name").val()){
        $_jxc.alert("请输入分组名称");
        return;
    }

    var formObj = $("#groupEdit").serializeObject();

    $_jxc.ajax({
        url:contextPath+'/common/chargeSelect/getChargeComponentList',
        data:formObj,
    },function(result){
        if(result.code == 0){
            $_jxc.alert("添加分组成功",function () {
                closeCardDialog();
                getGroupList();
            })
        }else{
            $_jxc.alert(result['message']);
        }
    })
}