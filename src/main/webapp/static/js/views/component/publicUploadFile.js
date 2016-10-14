/**
 * Created by huangj02 on 2016/10/13.
 * 公共组件-导入货号或条码
 */
var uploadFileParams;
var uploadFileCallBack ;
//初始化回调函数
function initUploadFileCallBack(cb,params){
    uploadFileParams = params;
    uploadFileCallBack = cb;
}
/**
 * 显示文件路径
 * @param event
 */
function fileUrlChange(event){
    var value=$("#file").val();
    $('#filelink').val(value);
}

/**
 * 开始上传
 */
function toUploadHandel(){
    var formData = new FormData();
    debugger;
    formData.append("file",$("#file")[0].files[0]);
    formData.append("branchId",uploadFileParams.branchId);
    formData.append("type",uploadFileParams.type);
    $.ajax({
        url : uploadFileParams.url,//uploadFileParams.url,
        type : 'POST',
        data : formData,
        processData : false,
        contentType : false,
        success : function(data) {
            debugger;
            if(data.code==0){
                console.log("成功");
            }else{
                console.log("失败");
            }
        },
        error : function(responseStr) {
            console.log("error");
        }
    });
}
/**
 * 取消
 */
function toCancel(){

}

/**
 * 下载模板文件
 */
function downExportFile(){
    if(uploadFileParams.type==0){//导入货号
        location.href=contextPath+'/form/purchase/exportTemp?type='+type;
    }else if(uploadFileParams.type==1){//导入条码
        location.href=contextPath+'/form/purchase/exportTemp?type='+type;
    }
}
