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
    formData.append("file",$("#file")[0].files[0]);
    if (typeof(uploadFileParams.branchId)=="undefined") {
    	formData.append("targetBranchId",uploadFileParams.targetBranchId);
    	formData.append("sourceBranchId",uploadFileParams.sourceBranchId);
    } else {
    	formData.append("branchId",uploadFileParams.branchId);
    }
    formData.append("type",uploadFileParams.type);
    $.ajax({
        url : uploadFileParams.url,//uploadFileParams.url,
        type : 'POST',
        data : formData,
        processData : false,
        contentType : false,
        success : function(data) {
            if(data.code==0){
                $("#message").html(data.importInfo.message);
                uploadFileCallBack(data.importInfo.list);
                if(data.importInfo.errorFileUrl){
                    $("#errorUrl").html("<a href='"+contextPath+data.importInfo.errorFileUrl+"' target='_blank'>下载查看失败数据</a>");
                }
            }else{
                $("#message").html(data.message);

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
	$('#uploadFile').panel('destroy');
}

/**
 * 下载模板文件
 */
function downExportFile(){
    if(uploadFileParams.type==0){//导入货号
        location.href=uploadFileParams.tempUrl+"?type="+uploadFileParams.type;
    }else if(uploadFileParams.type==1){//导入条码
    	location.href=uploadFileParams.tempUrl+"?type="+uploadFileParams.type;
    }
}
