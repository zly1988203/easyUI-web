/**
 * Created by zhangq on 2017/03/17.
 * 公共组件-错误提示窗
 */
var dialogTemp;
//初始化
function initErrorDialog(dialog,param){
	dialogTemp=dialog;
	//错误信息
	$("#content").html(param.error);
}

//复制弹窗信息
function copyErrorData(){
	var clip = new ZeroClipboard($("content").val());
}

//关闭弹窗
function closeErrorDialog(){
	$(dialogTemp).panel('destroy');
}