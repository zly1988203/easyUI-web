/**
 * Created by zhangq on 2016/12/30
 */
function saveProp() {
	$('#btnSave').attr("disabled","disabled");
	var isValid = $("#formEdit").form('validate');
	if (!isValid) {
		$('#btnSave').removeAttr("disabled");
		return;
	}
	
	if($('#purchaseSpec').val()=="0.00"){
		$('#btnSave').removeAttr("disabled");
		$_jxc.alert("进货规格不能为0!");
		return;
	}
	if($('#distributionSpec').val()=="0.00"){
		$('#btnSave').removeAttr("disabled");
		$_jxc.alert("配送规格不能为0!");
		return;
	}
	
	var formObj = $('#formEdit').serializeObject();
	$_jxc.ajax({
		url : contextPath + "/branch/operateGoods/branchGoodsPropSave",
		data : formObj
	},function(result){
		if(result){
			$_jxc.alert("保存成功");
			query();
			closeDialogHandel();
		}else{
			$('#btnSave').removeAttr("disabled");
			$_jxc.alert("保存失败");
		}
	});
}