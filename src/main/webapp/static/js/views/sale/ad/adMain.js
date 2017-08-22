/**
 * Created by zhaoly on 2017/8/21.
 */
$(function () {


    //机构选择初始化
    initBranchGroup();

    if($("#pageStatus").val() == "add"){
        $("#startTime").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
        $("#endTime").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
        $("#dailyStartTime").val("00:00:00");
        $("#dailyEndTime").val("23:59:59");

    }else if($("#pageStatus").val() == "0"){

    }else{

    }
})


function initBranchGroup(){
    $('#branchTemp').branchSelect({
        param:{
            selectType:1,  //多选
            view:'group', //分组
            formType:''
        },
        loadFilter:function(data){
            if(data && data.length >0 ){
                data.forEach(function(obj,index){
                    obj.branchIds = obj.branchId;
                })
            }
            return data;
        },
        onAfterRender:function(data){
            $('#branchName').attr('title',$('#branchName').val());
            if(data && data.length>0){
                var ids = [];
                data.forEach(function(obj,inx){
                    if(obj.type == -1){
                        ids.push(obj.branchId);
                    }
                })
                if(ids.length == 0) return;
                var param = {
                    "groupIds":ids.join(',')
                }
                //拉取分组详细
                publicGetBranchGroupDetail(param,function(result){
                    $('#branchIds').val(result&&result.branchId);
                    $('#branchName').attr('title',result&&result.branchName);
                    // $('#branchsFullName').val(result&&result.branchName);
                })
            }
        }
    });
}

function saveAd() {
    var branchId = $("#branchId").val();
    if(!branchId){
        $_jxc.alert("请先选择活动机构");
        return;
    }

    var isValid = $("#formAdd").form('validate');
    if (!isValid) {
        return;
    }
    var formObj = $("#formAdd").serializeObject();

    $_jxc.ajax({
        url:contextPath+'/pos/wheelsurf/form/save',
        data:{
            formObj : JSON.stringify(formObj),
        }
    },function(result){
        if(result.code == 0){
            $_jxc.alert("保存成功",function (data) {
                window.parent.frames[src]=contextPath+'/pos/wheelsurf/form/edit/'+data.id;
            })
        }else{
            $_jxc.alert(result['message']);
        }
    })
}

function checkAd() {
    $_jxc.ajax({
        url:contextPath+'/pos/wheelsurf/form/audit',
        data:{
            formId : $("#formId").val(),
        },
    },function(result){
        if(result.code == 0){
            $_jxc.alert("审核成功",function () {
                gFunRefresh();
            });
        }else{
            $_jxc.alert(result['message']);
        }
    })
}

function overAd() {
    $_jxc.ajax({
        url:contextPath+'/pos/wheelsurf/form/audit',
        data:{
            formId : $("#formId").val(),
        },
    },function(result){
        if(result.code == 0){
            $_jxc.alert("审核成功",function () {
                gFunRefresh();
            });
        }else{
            $_jxc.alert(result['message']);
        }
    })
}

function imgUpload(event) {
    var branchId = $("#branchId").val();
    if(!branchId){
        $_jxc.alert("请先选择活动机构");
        return;
    }
    var id = event.target.id;

    var param = {
        url:""
    }
    publicUploadImgService(param,function (data) {
        var data = data;
        $("#"+id).attr("src",getObjectURL(data.filePath))
    });
}

function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}