/**
 * Created by zhaoly on 2017/5/22.
 */


function initCardExtracted(data){
    $("#cardExtracted #branchName").val(data.branchName);
    $("#cardExtracted #branchId").val(data.branchId);
    $("#cardExtracted #oldBalance").val(data.ecardBalance);
}

function setData(data) {

}

function changeBalance() {
    var oldBalance = parseFloat($('#oldBalance').val());
    var extractBalance = parseFloat($('#extractBalance').numberbox('getValue'));

    if(extractBalance > oldBalance){
        $_jxc.alert("提取金额不能大于余额");
        $("#saveBtn").prop("disabled","disabled");
        return;
    }else{
        $("#saveBtn").removeProp("disabled");
    }
    $("#cardExtracted #newBalance").numberbox("setValue",(oldBalance-extractBalance));
}

function save() {
    var extractBalance = $('#extractBalance').numberbox('getValue');
    if(!extractBalance||extractBalance <= 0.00){
   	 	$_jxc.alert("提取金额不能为空！");
        return;
    }
    $_jxc.confirm("本次提取金额"+extractBalance+",是否继续",function (data) {
        if(data){
            var param = {
                url:contextPath + "/iccard/account/management/extracted",
                data:$('#cardExtracted').serializeObject(),
            }
            $_jxc.ajax(param,function (datas) {
                if(datas.message==="success"){
                    $('#closeExtracted').trigger('click');
                }
                $_jxc.alert(datas.data);
                $("#gridCardAccount").datagrid('reload');
            })

        }
    })
}
