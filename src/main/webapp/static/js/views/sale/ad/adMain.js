/**
 * Created by zhaoly on 2017/8/21.
 */
$(function () {
    //机构选择初始化
    initBranchGroup();

    if($("#pageStatus").val() == "add"){
        $("#beginDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
        $("#overDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
        $("#beginTime").val("00:00:00");
        $("#overTime").val("23:59:59");

    }else if ($("#pageStatus").val() == "copy"){
        StrweekCheckDay($("#displayDay").val());
    }else if($("#pageStatus").val() == "0"){
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
            branchTypesStr:$_jxc.branchTypeEnum.FRANCHISE_STORE_B + ',' + $_jxc.branchTypeEnum.FRANCHISE_STORE_C+','+ $_jxc.branchTypeEnum.OWN_STORES
        },
        loadFilter:function(data){
            if(data && data.length >0 ){
                data.forEach(function(obj,index){
                    obj.branchIds = obj.branchId;
                })
            }
            return data;
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

var updateAd = function(){
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
        url:contextPath+'/pos/ad/form/update',
        data:{
            formObj : JSON.stringify(formObj),
            mainImg : $("#mainImg").attr("src"),
            imgs : [$("#img1").attr("src"),$("#img2").attr("src"),$("#img3").attr("src")]
        }
    },function(result){
        if(result.code == 0){
            $_jxc.alert("保存成功",function () {
                gFunRefresh();
            })
        }else{
            $_jxc.alert(result['message']);
        }
    })
};

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

    if(id === "mainImg"){
        var width = 800;
            var height = 586;
    }else {
        var width = 270;
        var height = 170;
    }

    var param = {
        url:"/pos/wheelsurf/form/upload",
        size:250,
        imgWidth:width,
        imgHeight:height,
    }
    publicUploadImgService(param,function (data) {
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