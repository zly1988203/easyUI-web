/**
 * Created by zhaoly on 2017/4/1.
 */
/**
* Created by huangj02 on 2016/10/13.
* 公共组件-上传数据模板
*/
var uploadTemplateParams;
var uploadTemplateCallBack ;
//初始化回调函数
function initUploadTemplateCallBack(cb,params){
    uploadTemplateParams = params;
    uploadTemplateCallBack = cb;
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
    if(!$("#file").val()){
        $.messager.alert('提示','请选择文件！');
        return;
    }
    var formData = new FormData();
    formData.append("file",$("#file")[0].files[0]);
    formData.append("formType",uploadTemplateParams.formType?uploadTemplateParams.formType:"unknown");

    gFunStartLoading('正在上传，请稍后...');
    $.ajax({
        url : uploadTemplateParams.url,//uploadFileParams.url,
        type : 'POST',
        data : formData,
        processData : false,
        contentType : false,
        success : function(data) {
            gFunEndLoading();
            if(data.code==0){
                $("#message").html(data.importInfo.message);
                console.log(data.importInfo);
                uploadTemplateCallBack(data.importInfo.list);
            }else{
                $("#message").html(data.message);

            }
        },
        error : function(responseStr) {
            gFunEndLoading();
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