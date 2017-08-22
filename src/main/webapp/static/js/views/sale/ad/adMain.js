/**
 * Created by zhaoly on 2017/8/21.
 */
$(function () {
    $("#dailyStartTime").val("00:00:00");
    $("#dailyEndTime").val("23:59:59");
    //机构选择初始化 发货机构
    $('#branchTemp').branchSelect();
})

function saveAd() {
    
}

function checkAd() {
    
}

function overAd() {
    
}

function imgUpload() {
    var branchId = $("#branchId").val();
    if(!branchId){
        event.stopPropagation();
        $_jxc.alert("请先选择活动机构");
        return;
    }

    var param = {
        url:""
    }
    publicUploadImgService(param,function () {

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