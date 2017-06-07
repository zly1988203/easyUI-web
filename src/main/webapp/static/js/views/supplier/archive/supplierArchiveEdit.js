/**
 * Created by huangj02 on 2016/10/12.
 */
$(function(){
	

});

function onChangeSaleWay() {
    var saleWay = 	$('#saleWay').combobox("getValue");
    if(saleWay != "C"){
        $("#minAmountDiv").addClass("unhide");
    }else {
        $("#minAmountDiv").removeClass("unhide");
	}
}

function updateSupplier() {
	var formObj = $('#formEdit').serializeObject();
	var isValid = $("#formEdit").form('validate');
	if (!isValid) {
		return;
	}

    if($('#supplierName').val().trim()===""){
        $_jxc.alert("请输入供应商名称");
        return;
    }

	$_jxc.ajax({
		url : contextPath + "/supplier/updateSupplier",
		data : formObj
	},function(result){
		if(result){
			alertTip(result.message, reloadListHandel);
		}
	});
}