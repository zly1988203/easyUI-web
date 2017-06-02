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
            {field:'branchCode',title:'机构编码',width:80,align:'left'},
            {field:'branchName',title:'机构名称',width:180,align:'left'},
            {field:'createUserName',title:'操作人',width:120,align:'left'},
            {field:'funcName',title:'功能名称',width:180,align:'left'},
            {field:'createTime',title:'修改时间',width:120,align:'left',
                formatter : function(value, rowData, rowIndex) {
                    return formatDate(value);
                }
            },
            {field:'funcName',title:'修改类型',width:80,align:'left'},
            {field:'funcName',title:'修改值',width:120,align:'left'},
            {field:'remark',title:'操作描述',width:250,align:'left'},
        ]]
    })
}


/**
 * 机构名称
 */
function selectListBranches(){
    new publicAgencyService(function(data){
        $("#branchId").val(data.branchesId);
        $("#branchName").val(data.branchName);
        $("#oldBranchName").val(data.branchName);
    },'BF','');
}

function queryLogList() {
    var oldBranchName = $("#oldBranchName").val();
    var branchName = $("#branchName").val();
    if(oldBranchName && oldBranchName != branchName){
        $("#branchId").val('');
    }
    $("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url = contextPath+'/system/log/list';
    $("#"+gridName).datagrid("load");
}

function exportData(){
    var length = dg.datagrid('getData').rows.length;
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

function exportData(){
    var length = $('#'+gridName).datagrid('getData').total;
    if(length == 0){
        successTip("无数据可导");
        return;
    }
    var queryParams =  urlEncode($("#queryForm").serializeObject());
    window.location.href = contextPath + '/iccard/trading/exports?params='+queryParams;
}

var toPrint = function(){
    var length = $('#gridCardTrading').datagrid('getData').total;
    if(length == 0){
        successTip("无数据可打印");
        return;
    }
    var queryParams =  urlEncode($("#queryForm").serializeObject());
    parent.addTabPrint("reportPrint"+new Date().getTime(),"打印",contextPath+"/iccard/trading/report/print?params="+queryParams);
}
