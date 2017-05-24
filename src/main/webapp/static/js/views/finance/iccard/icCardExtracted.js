/**
 * Created by zhaoly on 2017/5/22.
 */


function initCardExtracted(data){
    $("#cardExtracted #branchName").val(data.branchName)
    $("#cardExtracted #oldBalance").numberbox("setValue",data.oldBalance|0.00);
}

function setData(data) {

}

function changeBalance() {
    var oldBalance = parseFloat($('#oldBalance').numberbox('getValue'));
    var extractBalance = parseFloat($('#extractBalance').numberbox('getValue'));

    if(extractBalance > oldBalance){
        messager("提取金额不能大于余额");
        $("#saveBtn").prop("disabled","disabled");
        return;
    }else{
        $("#saveBtn").removeProp("disabled");
    }
    $("#cardExtracted #newBalance").numberbox("setValue",(oldBalance-extractBalance));
}

function save() {
    var extractBalance = $('#extractBalance').numberbox('getValue');
    $.messager.confirm("提示","本次提取金额"+extractBalance+",是否继续",function (data) {
        if(data){

        }
    })
}
