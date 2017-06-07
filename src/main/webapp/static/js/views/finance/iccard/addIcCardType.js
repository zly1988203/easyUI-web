/**
 * Created by zhaoly on 2017/5/22.
 */

function saveSettingType() {
	
	var isValid = $("#cardTypeAdd").form('validate');
	if(!isValid){
		return;
	}
	
    var formData = $('#cardTypeAdd').serializeObject();
    var url = contextPath + "/iccard/setting/type/save";
    var param = {
        url:contextPath + "/iccard/setting/type/save",
        data:formData
    };
    $_jxc.ajax(param,function (result) {
        if(result.code===0){
            closeCardDialog();
            $_jxc.alert(result.data);
        }else{
            $_jxc.alert(result.message);
        }
        initGridCardSetting();
    })

}