/**
 * Created by zhaoly on 2017/8/17.
 */
$(function () {
    
})

function saveGroup() {
    var formObj = $("groupEdit").serializeObject();

    $_jxc.ajax({
        url:contextPath+'/common/chargeSelect/getChargeComponentList',
        data:formObj,
    },function(result){
        if(result.code == 0){

        }else{
            $_jxc.alert(result['message']);
        }
    })
}