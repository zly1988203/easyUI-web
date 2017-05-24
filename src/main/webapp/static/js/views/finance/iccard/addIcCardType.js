/**
 * Created by zhaoly on 2017/5/22.
 */

function saveSetting() {
    var formData = $('#cardTypeAdd').serializeObject();
    var url = contextPath + "/common/brand/saveBrand";
    var param = formData;
    this.ajaxSubmit(url,param,function(result){
        if(result.code == 0){

        }else{

        }
    })
}