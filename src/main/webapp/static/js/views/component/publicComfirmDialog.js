/**
 * created by zhaoly  2017-02-23
 * 生活是一片湿巾 越来越黑 越来越重
 */

var confirmDialogCallBack

function initConfirmDialogCallBack(cb){
	confirmDialogCallBack = cb;
}


function confirmValue(val){
	var param = {code:val}
	if(confirmDialogCallBack){
		confirmDialogCallBack(param);
	}
}


//初始化
function initConfirmDialog(param){
	$("#content").html(param.content);
}