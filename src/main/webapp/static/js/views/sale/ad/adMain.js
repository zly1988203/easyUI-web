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

    }else if ($("#pageStatue").val() == "copy"){
        StrweekCheckDay($("#displayDay").val());
    }else if($("#pageStatue").val() == "0"){
        StrweekCheckDay($("#displayDay").val());
    }else{
        StrweekCheckDay($("#displayDay").val());
    }

})

/**
* 星期拆分字符串赋值checkbox
*/
function StrweekCheckDay(weekstr){
    $(".ubcheckweek .radioItem").prop("checked",false);
    var arrWeek = weekstr.split("");
    $.each(arrWeek,function(i,val){
        $("#weekcheckbox"+val).prop("checked",true);
    })

}

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
    var branchId = $("#branchIds").val();
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
        url:contextPath+'/pos/ad/form/save',
        data:{
            formObj : JSON.stringify(formObj),
            mainImg : $("#mainImg").attr("src"),
            imgs : [$("#img1").attr("src"),$("#img2").attr("src"),$("#img3").attr("src")]
        }
    },function(result){
        if(result.code == 0){
            $_jxc.alert("保存成功",function (data) {
                window.location.href=contextPath+'/pos/ad/form/edit/'+result.data.id;
            })
        }else{
            $_jxc.alert(result['message']);
        }
    })
}

function checkAd() {
    $_jxc.ajax({
        url:contextPath+'/pos/ad/form/audit',
        data:{
            formId : $("#formId").val()
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
        url:contextPath+'/pos/ad/form/over',
        data:{
            formId : $("#formId").val(),
        },
    },function(result){
        if(result.code == 0){
            $_jxc.alert("终止成功",function () {
                gFunRefresh();
            });
        }else{
            $_jxc.alert(result['message']);
        }
    })
}

function imgUpload(event) {
    var branchId = $("#branchIds").val();
    if(!branchId){
        $_jxc.alert("请先选择活动机构");
        return;
    }
    var id = event.target.id;

    var param = {
        url:"/pos/wheelsurf/form/upload"
    }
    publicUploadImgService(param,function (data) {
        var data = data;
        $("#"+id).attr("src",data.filePath);
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