/**
 * Created by zhaoly on 2017/5/24.
 */


var oldData = {

}
function selectBranch(){
    //初始化机构ID
    var branchId = sessionBranchId;

    publicBranchService(function(data){
        var branchesId="";
        var branchName="";
        $.each(data,function(i,k){
            branchesId=k.branchesId+","+branchesId;
            branchName+="["+k.branchCode+"]"+k.branchName+",";
        })
        branchesId = branchesId.substring(0,branchesId.length - 1);
        branchName = branchName.substring(0,branchName.length - 1);
        $("#receiveBranchIds").val(branchesId);// id
        $("#branchName").val(branchName);
    },1);
}

function selectUser() {
    new publicOperatorService(function(data){
        var receiveUserIds="";
        var userName="";
        $.each(data,function(i,k){
            receiveUserIds=k.id+","+receiveUserIds;
            userName+="["+k.userCode+"]"+k.userName+",";
        })
        receiveUserIds = receiveUserIds.substring(0,receiveUserIds.length - 1);
        userName = userName.substring(0,userName.length - 1);

        $("#receiveUserIds").val(receiveUserIds);
        $("#userName").val(userName);
    },{type:1});
}

function saveNotice(){
    var receiveBranchIds = $("#receiveBranchIds").val();
    var receiveUserIds = $("#receiveUserIds").val();
    var title = $("#title").val();
    var content = $("#content").val();

    if($_jxc.isStringNull(receiveBranchIds) && $_jxc.isStringNull(receiveUserIds)){
        $_jxc.alert("请选择收件门店或者收件人");
        return;
    }

    if($_jxc.isStringNull(title)){
        $_jxc.alert("请填写公告标题");
        return;
    }

    if($_jxc.isStringNull(content)){
        $_jxc.alert("请填写公告内容");
        return;
    }

    var url = contextPath+"/sys/notice/save";
    var formData = $('#formNoticeAdd').serializeObject();
    var param = {
        url:contextPath+"/sys/notice/save",
        data:formData,

    }
    $_jxc.ajax(param,function (result) {
        if(result['code'] == 0){
            $_jxc.alert("发布成功");
            closeDialogHandel();
            queryNoticeList();
        }else{
            $_jxc.alert(result['message']);
        }
    })
}