/**
 * Created by zhaoly on 2017/5/24.
 */


function saveNotice(){
    var url = contextPath+"/form/purchase/save";
    var formData = $('#formNoticeAdd').serializeObject();
    this.ajaxSubmit(url,formData,function (result) {
        if(result['code'] == 0){
            messager("发布成功");
        }else{
            messager(result['message']);
        }
    })
}