/**
 * Created by huangj02 on 2016/10/13.
 * 公共组件-导入货号或条码
 */
var uploadFileParams;
var uploadFileCallBack ;
var maxRows = 1000; //最大能导入的数量
var maxRowsed; //已导入数量 
//初始化回调函数
function initUploadFileCallBack(cb,params){
    if(params.isBtnTemple == false){
        $('#btnTemple').hide();
    }
    uploadFileParams = params;
    uploadFileCallBack = cb;
}
/**
 * 显示文件路径
 * @param event
 */
function fileUrlChange(event){
	//2.7.0_P01 加入导入最大数量限制校验
	if(!getOriginTableRows())return;
	
    var value=$("#file").val();
    $('#filelink').val(value);
}

/**
 * 获取导入页已有数量
 */
function getOriginTableRows(){
	var _tableDom = $('#uploadFile').closest('body').find('table[class="datagrid-f"]');
	if(_tableDom && _tableDom.length < 1)return true;
	var datagridId = $('#uploadFile').closest('body').find('table[class="datagrid-f"]').attr('id');
	if(!datagridId)return true;
	maxRowsed = $('#'+datagridId).datagrid('getRows').length;
	if(maxRowsed > maxRows){
		$_jxc.alert('已有'+maxRowsed+'条数据，超过最大导入数' + maxRows +'，请先保存');
		return false;
	}
	return true;
}

/**
 * 开始上传
 */
function toUploadHandel(){
	if(!$("#file").val()){
        $_jxc.alert('请选择文件！');
		return;
	}
    var formData = new FormData();
    formData.append("file",$("#file")[0].files[0]);
    if (typeof(uploadFileParams.branchId)=="undefined") {
    	formData.append("targetBranchId",uploadFileParams.targetBranchId);
    	formData.append("sourceBranchId",uploadFileParams.sourceBranchId);
    } else {
    	formData.append("branchId",uploadFileParams.branchId);
    }
    if (typeof(uploadFileParams.status)!="undefined") {
    	formData.append("status",uploadFileParams.status);
    } 
    if (typeof(uploadFileParams.formType)!="undefined") {
    	formData.append("formType",uploadFileParams.formType);
    }
    if (typeof(uploadFileParams.batchId)!="undefined") {
    	formData.append("batchId",uploadFileParams.batchId);
    }
    if (typeof(uploadFileParams.branchIds)!="undefined") {
    	formData.append("branchIds",uploadFileParams.branchIds);
    }
    if (typeof(uploadFileParams.activityType)!="undefined") {
    	formData.append("activityType",uploadFileParams.activityType);
    }
    
    
    formData.append("type",uploadFileParams.type);
    
    gFunStartLoading('正在导入，请稍后...');
    $.ajax({
        url : uploadFileParams.url,//uploadFileParams.url,
        type : 'POST',
        data : formData,
        processData : false,
        contentType : false,
        success : function(data) {
        	gFunEndLoading();
            if(data.code==0){
				var dbLength = data.importInfo.list.length;
				if (dbLength + maxRowsed > maxRows) {
					$_jxc.alert('已有' + maxRowsed + '条数据，导入' + dbLength + '条数据，超过最大导入数' + maxRows +'，请先保存');
					return;
				}
                $("#message").html(data.importInfo.message);
                uploadFileCallBack(data.importInfo.list);
                if(data.importInfo.errorFileUrl){
                    $("#errorUrl").html("<a href='"+contextPath+data.importInfo.errorFileUrl+"' target='_blank'>下载查看失败数据</a>");
                }else{
                	$("#errorUrl").html("");
                }
            }else{
                $("#message").html(data.message);

            }
        },
        error : function(responseStr) {
        	gFunEndLoading();
            console.log("error");
        }
    });
}
/**
 * 取消
 */
function toCancel(){
	$('#uploadFile').panel('destroy');
}

/**
 * 下载模板文件
 */
function downExportFile(){
	if(uploadFileParams.activityType){
		location.href=uploadFileParams.tempUrl;
		return;
	}
    if(uploadFileParams.type==0){//导入货号
        location.href=uploadFileParams.tempUrl+"?type="+uploadFileParams.type;
    }else if(uploadFileParams.type==1){//导入条码
    	location.href=uploadFileParams.tempUrl+"?type="+uploadFileParams.type;
    }else{
    	location.href=uploadFileParams.tempUrl;
    }
}
