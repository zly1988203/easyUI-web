var messageCallback = null;

function initMessageParam(param){
    $("#content").html(param.msg);
}

function initMessageCallBack(cb){
    messageCallback = cb;
}


function confirmValue(val){
    messageCallback(val);
}