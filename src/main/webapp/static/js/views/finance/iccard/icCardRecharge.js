/**
 * Created by zhaoly on 2017/5/22.
 */

function initCardRecharge(data){
    $("#cardRecharge #branchName").val(data.branchName)
    $("#cardRecharge #oldBalance").numberbox("setValue",data.oldBalance|0.00);
}

function getShopInfo() {

}
function changeBalance() {
    var oldBalance = $('#oldBalance').numberbox('getValue');
    var addBalance = $('#addBalance').numberbox('getValue');
    if(addBalance <= 0.00){
        messager("充值金额要大于0");
        $("#savebtn").prop("disabled","disabled");
        return;
    }else{
        $("#savebtn").removeProp("disabled");
    }
    $("#cardRecharge #newBalance").numberbox("setValue",(oldBalance+addBalance));
}


function save() {
    var addBalance = $('#addBalance').numberbox('getValue');
    $.messager.confirm("提示","本次充值金额"+addBalance+",是否继续",function (data) {
        if(data){

        }
    })
}
