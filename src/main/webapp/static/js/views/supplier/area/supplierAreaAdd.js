/**
 * Created by huangj02 on 2016/10/12.
 */

/**
 * 保存
 */
function saveHandel(){
   //验证数据
    var isValid = $("#formAdd").form('validate');
	if (!isValid) {
		return;
	}
    if($('#areaName').val().trim()===""){
        $_jxc.alert("请输入名称");
        return;
    }

    var formData = $('#formAdd').serializeObject();
    $_jxc.ajax({
        url:contextPath+"/supplierArea/addSupplierArea",
        data:formData
    },function(data){
        if(data.code == 0){
            reloadListHandel();
            $_jxc.alert("保存成功");
        }else{
            $_jxc.alert(data.message);
        }
    })

}