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
    var param = formData;
    $.post(url,param,function(result){
    	if(result.code===0){
			$('#closeCardType').trigger('click');
			$_jxc.alert(result.data);
		}else{
			$_jxc.alert(result.message);
		}
		
		$("#gridCardSetting").datagrid('reload');
    },"json")
}