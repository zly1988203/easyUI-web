/**
 * Created by zhaoly on 2017/5/24.
 */

$(function(){

    $('#branchComponent').branchSelect({
        param:{
            type:'NOTREE',//左侧没有树
            selectType:1 //多选receiveBranchIds
        },
        loadFilter:function(data){
            data.forEach(function(obj,index){
                obj.receiveBranchIds = obj.branchesId;
            })
            return data;
        }
    });

    $('#operatorComponent').operatorSelect({
        param:{
          selectType:1 //多选
        },
        //数据过滤
        loadFilter:function(data){
            data.forEach(function(obj,index){
                obj.receiveUserIds = obj.id;
            })
            return data;
        }
    });
})

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