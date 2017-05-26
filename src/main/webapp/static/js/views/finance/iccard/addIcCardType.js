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
			messager(result.data);
		}else{
			messager(result.message);
		}
		
		$("#gridCardSetting").datagrid('reload');
    },"json")
}