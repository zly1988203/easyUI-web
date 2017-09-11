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
        disabledElement();
    }

})

function disabledElement(){
    $("#beginDate").prop("disabled",true);
    $("#overDate").prop("disabled",true);
    $("#beginTime").prop("disabled",true);
    $("#overTime").prop("disabled",true);
    $("input[name='weekcheckbox']").prop("disabled",true);
    $("#adName").prop("disabled",true);
    $("#branchName").prop("disabled",true);
    $("#remark").prop("disabled",true);
    $("#intervalTime").numberbox({disabled:true});
    $("img").removeAttr("onclick");
}

function adAdd() {
    toAddTab("新增客屏广告",contextPath + "/pos/ad/form/add");
}

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

    if(!validform())return;

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
    if(!validform())return;

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

function validform(){
    var branchId = $("#branchIds").val();
    if(!branchId){
        $_jxc.alert("请先选择活动机构");
        return false;
    }

    var adName = $("#adName").val();
    if($_jxc.isStringNull(adName)){
        $_jxc.alert("请先填写活动名称");
        return false;
    }

    if(compareDate($("#beginDate").val(),$("#overDate").val())){
        $_jxc.alert("展示结束时间不能在展示开始时间之前");
        return false;
    }

    var arrChk=$("input[name='weekcheckbox']:checked");
    if(arrChk.length <= 0){
        $_jxc.alert("请最少选中一个活动日");
        return; false;
    }

    var intervalTime = $("#intervalTime").numberbox("getValue")
    if(!intervalTime || null == intervalTime){
        $_jxc.alert("请填写展示时长");
        return false;
    }

    if($_jxc.isStringNull($("#mainImgVal").val())){
        $_jxc.alert("请上传活动主图");
        return false;
    }

   if($_jxc.isStringNull($("#img1Val").val())
        || $_jxc.isStringNull($("#img2Val").val())
        || $_jxc.isStringNull($("#img3Val").val())){
        $_jxc.alert("请上传完活动次图");
        return false;
    }


    return true
}

function checkAd() {
    $_jxc.confirm("确认审核通过？",function (res) {
        if(res){
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
    })


}

function overAd() {
    $_jxc.confirm("确认终止此广告？",function (res) {
        if(res){
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
        $("#"+id+"Val").val(data.filePath);
    });
}

function compareDate(startDate,endDate) {
    var d1 = new Date(startDate.replace(/\-/g, "\/"));
    var d2 = new Date(endDate.replace(/\-/g, "\/"));
    if(startDate!=""&&endDate!=""&&d1 > d2)
    {
        return true;
    }
    return false;
}