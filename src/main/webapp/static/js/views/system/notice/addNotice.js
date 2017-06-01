/**
 * Created by zhaoly on 2017/5/24.
 */



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
            receiveUserIds=k.branchesId+","+receiveUserIds;
            userName+="["+k.userCode+"]"+k.userName+",";
        })
        receiveUserIds = receiveUserIds.substring(0,receiveUserIds.length - 1);
        userName = userName.substring(0,userName.length - 1);

        $("#receiveUserIds").val(receiveUserIds);
        $("#userName").val(userName);
    },{type:1});
}

function saveNotice(){
    var url = contextPath+"/sys/notice/save";
    var formData = $('#formNoticeAdd').serializeObject();
    this.ajaxSubmit(url,formData,function (result) {
        if(result['code'] == 0){
            messager("发布成功");
        }else{
            messager(result['message']);
        }
    })
}