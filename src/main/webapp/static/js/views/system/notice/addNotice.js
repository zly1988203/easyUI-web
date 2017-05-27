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
    publicOperatorService(function(data){
        //data.Id
        $("#receiveUserIds").val(data.id);
        $("#userName").val("["+data.userCode+"]"+data.userName);
    });
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