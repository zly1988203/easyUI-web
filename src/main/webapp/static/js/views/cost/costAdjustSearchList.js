$(function(){
    initdefaultElement();
	initDatagrid();
	// 单据状态切换
	changeStatus();
	
	//机构组件初始化
	$('#branchSelect').branchSelect({
		loadFilter:function(data){
			return data;
		}
	});
});

function initdefaultElement() {
    // 开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	$("#formNo").prop("disabled",true);
	$("#auditUserName").prop("disabled",true);
}

//单据状态切换
function changeStatus() {
	$(".radioItem").change(function() {
		var reportType = $('input[type="radio"][name="reportType"]:checked').val();
		if(reportType == "1"){
			$("#formNo").prop("disabled",true);
			$("#formNo").val("");
        	$("#auditUserName").prop("disabled",true);
        	$("#auditUserName").val("");
		}else if(reportType == "2"){
			$("#formNo").prop("disabled",false);
			$("#auditUserName").prop("disabled",false);
		}
		initDatagrid();
	});
}


var datagridId = "costAdjustSearchList"

var gridHandel = new GridClass();
var gridHandelDetail = new GridClass();

var gridList;

//初始化表格
function initDatagrid(){
	var reportType = $('input[type="radio"][name="reportType"]:checked').val();
	var defaultColumns;

	switch (reportType) {
		case '1':
			defaultColumns = eval("(" + JSON.parse($("#columnsArr").val()).columns1 + ")");
			break;
		case '2':
			defaultColumns = eval("(" + JSON.parse($("#columnsArr").val()).columns2 + ")");
			break;
		default:
			return;
	}

	if(gridList){
		$("#"+datagridId).datagrid('options').url = '';
	}
	gridList = $("#"+datagridId).datagrid({
		method:'post',
		align:'center',
		singleSelect:false,  //单选  false多选
		rownumbers:true,    //序号
		pagination:true,    //分页
		showFooter:true,
		fitColumns:false,    //每列占满
		height:'100%',
		width:'100%',
		pageSize:50,
		columns:[defaultColumns], 
		onLoadSuccess:function(data){
			/* if($("#createBranchId").val()&&data.total<=0)
				$_jxc.alert("该机构可能未月结,请先月结!"); */
		}
	});
    $("#"+datagridId).datagrid('loadData',[]);
    $("#"+datagridId).datagrid('reloadFooter',[]);
}

//查询
function queryForm(){
	if($("#branchName").val()=="" && $("#skuCodeOrBarCode").val()=="" ){
        $_jxc.alert("请选择机构或输入条码");
        return;
    } 
	var fromObjStr = $('#queryForm').serializeObject();
	$("#"+datagridId).datagrid("options").method = "post";
	$("#"+datagridId).datagrid('options').url = contextPath + '/cost/costAdjustSearch/list';
	$("#"+datagridId).datagrid('load', fromObjStr);
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
};

/**
 * 导出
 */
function exportData(){

	var length = $("#"+datagridId).datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("无数据可导");
		return;
	}
    var param = {
        datagridId:datagridId,
        formObj:$("#queryForm").serializeObject(),
        url:contextPath+"/cost/costAdjustSearch/export"
    }
    publicExprotService(param);
}