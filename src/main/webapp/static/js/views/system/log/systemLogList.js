/**
 * Created by zhaoly on 2017/6/2.
 */

$(function () {
    initGridLogList();
    $("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
})

var gridName = "gridLogList";
var gridHandel = new GridClass();
var dg;
function initGridLogList() {
    gridHandel.setGridName(gridName);
    dg =  $("#"+gridName).datagrid({
        align:'center',
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        showFooter:true,
        height:'100%',
        width:'100%',
        fitColumns:true,    //每列占满
        columns:[[
            {field:'branchCode',title:'机构编码',width:60,align:'left'},
            {field:'branchName',title:'机构名称',width:120,align:'left'},
            {field:'createUserName',title:'操作员',width:100,align:'left'},
            {field:'operateName',title:'功能名称',width:80,align:'left'},
            {field:'createTimeStr',title:'修改时间',width:100,align:'left'},
            {field:'operateTypeStr',title:'修改类型',width:60,align:'left'},
            {field:'title',title:'修改值',width:120,align:'left'},
            {field:'content',title:'操作描述',width:300,align:'left'}
        ]]
    })
}


/**
 * 机构名称
 */
function selectListBranches(){
    new publicAgencyService(function(data){
        $("#branchCompleCode").val(data.branchCompleCode);
        $("#branchName").val("["+data.branchCode+"]" + data.branchName);
    },'BF','');
}

function queryLogList() {
	$("#startCount").val('');
	$("#endCount").val('');
    $("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url = contextPath+'/system/log/getOpLogList';
    $("#"+gridName).datagrid("load");
}

/**
 * 导出
 */
function exportData(){
	var length = $("#"+gridName).datagrid('getData').rows.length;
	if(length == 0){
		successTip("无数据可导");
		return;
	}
	$('#exportWin').window({
		top:($(window).height()-300) * 0.5,   
	    left:($(window).width()-500) * 0.5
	});
	$("#exportWin").show();
	$("#totalRows").html(dg.datagrid('getData').total);
	$("#exportWin").window("open");
}
// 调用导出方法
function exportExcel(){
	$("#exportWin").hide();
	$("#exportWin").window("close");
	$("#queryForm").form({
		success : function(result){
			
		}
	});
	$("#queryForm").attr("action",contextPath+"/system/log/exportHandel");
	$("#queryForm").submit();
}