/**
 * Created by zhaoly on 2017/5/24.
 */



function noticeShops(){
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
        $("#shopIds").val(branchesId);// id
        $("#shopNames").val(branchName);
    },1);
}

function noticePersons() {
    publicOperatorService(function(data){
        //data.Id
        $("#personIds").val(data.id);
        $("#personNames").val("["+data.userCode+"]"+data.userName);
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