/**
 * Created by zhaoly on 2017/8/22.
 */

$(function () {
    
})
var uploadParam = null;
function initUploadImgParam(param) {
    if(param){
        uploadParam = param;
    }
}

var uploadImgCallback
function initUploadImgCallBack(cb) {
    uploadImgCallback = cb;
}

function imgUrlChange(event) {
    $("#btnUploadImg").removeClass("uhide");
    var img = $("#file")[0].files[0];
    $("#filelink").val($("#file").val());
    var imgName = img.name.toLowerCase();
    // 判断图片格式
    if(!(img.type.indexOf('image')==0 && img.type && /\.(?:jpg|png|gif)$/.test(imgName)) ){
        $_jxc.alert('图片格式只能是jpg,gif,png');
        $("#btnUploadImg").addClass("uhide");
        return;
    }

    var imgSize = img.size;
    if(imgSize>250*1024){
        $_jxc.alert('上传的图片的大于250KB,请重新选择');
        $("#btnUploadImg").addClass("uhide");
        return;
    }
}

function toUploadImgHandel() {
    var formData = new FormData();
    formData.append("file",$("#file")[0].files[0]);
    gFunStartLoading('正在上传，请稍后...');

    $.ajax({
        url : contextPath+uploadParam.url,
        type : 'POST',
        data : formData,
        processData : false,
        contentType : false,
        success : function(data) {
            gFunEndLoading();
            if(data.code==0){
                uploadImgCallback(data)
                $_jxc.alert("文件上传成功");
            }else{
                $_jxc.alert(data.message);
            }
        },
        error : function(responseStr) {
            gFunEndLoading();
            uploadImgCallback(data)
        }
    });
}

/**
 * 取消
 */
function toCancel(){
    $('#uploadImg').panel('destroy');
}