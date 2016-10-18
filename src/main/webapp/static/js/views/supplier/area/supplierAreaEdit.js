/**
 * Created by huangj02 on 2016/10/12.
 */
/**
 * 保存
 */
function initEditView(item){
    gFunUnSerialize(item);
}

function saveHandel(){
    //验证数据
    var isValid = $("#formEdit").form('validate');
	if (!isValid) {
		return;
	}
    var formData = $('#formEdit').serializeObject();
    $.ajax({
        type:"POST",
        url:contextPath+"/supplierArea/updateSupplierArea",
        data:formData,
        success:function(data){
            if(data.code == 0){
                reloadListHandel();
                $.messager.alert('提示',"保存成功");
            }else{
                $.messager.alert('提示',data.message);
            }
        },
        error:function(e){

        }
    })

}