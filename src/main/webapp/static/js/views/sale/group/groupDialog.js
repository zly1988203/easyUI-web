/**
 * Created by zhaoly on 2017/8/17.
 */
$(function () {
    
})
//编辑状态下 赋值
function initKeyGroupData(item) {
    $("#sortNo").numberbox("setValue",item.sortNo);
    $("#groupName").val(item.groupName);
    $("#groupNo").val(item.groupNo);
    $("#id").val(item.id);
}

function saveGroup() {
    if(!$("#sortNo").val()){
        $_jxc.alert("请输入排序");
        return;
    }

    if($_jxc.isStringNull($("#groupName").val())){
        $_jxc.alert("请输入分组名称");
        return;
    }

    var formObj = $("#groupAdd").serializeObject();

    $_jxc.ajax({
        url:contextPath+'/pos/group/key/save/group',
        data:formObj,
    },function(result){
        if(result.code == 0){
            closeCardDialog();
            $_jxc.alert("添加分组成功",function () {
                getGroupList();
            })
        }else{
            $_jxc.alert(result['message']);
        }
    })
}

function updateGroup() {
    if(!$("#sortNo").val()){
        $_jxc.alert("请输入排序");
        return;
    }

    if(!$("#groupName").val()){
        $_jxc.alert("请输入分组名称");
        return;
    }

    var formObj = $("#groupEdit").serializeObject();

    $_jxc.ajax({
        url:contextPath+'/pos/group/key/update/'+$("#branchId").val(),
        data:formObj,
    },function(result){
        if(result.code == 0){
            closeCardDialog();
            $_jxc.alert("添加分组成功",function () {
                getGroupList();
            })
        }else{
            $_jxc.alert(result['message']);
        }
    })
}