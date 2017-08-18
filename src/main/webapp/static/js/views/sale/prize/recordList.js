/**
 * Created by zhaoly on 2017/8/17.
 */
$(function () {
    initgridRecord();
    // 开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    //机构选择初始化 发货机构
    $('#branchTemp').branchSelect();

})

var gridName = "gridRecordList";
var gridRecordHandle = new GridClass();

function initgridRecord() {
    gridRecordHandle.setGridName(gridName);
    $("#"+gridName).datagrid({
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        height:'100%',
        width:'100%',
        pageSize:50,
        columns:[[
            {field:'skuName',title:'会员号',width:'200px',align:'left'},
            {field:'barCode',title:'奖品名称',width:'200px',align:'left'},
            {field:'barCode',title:'中奖数量',width:'100px',align:'right'},
            {field:'barCode',title:'奖品状态',width:'150px',align:'left'},
            {field:'barCode',title:'数量',width:'100px',align:'right'},
            {field:'barCode',title:'机构编码',width:'150px',align:'left'},
            {field:'barCode',title:'活动机构',width:'200px',align:'left'},
            {field:'barCode',title:'中奖时间',width:'150px',align:'left'},
        ]],
        onLoadSuccess:function(data){
            gridRecordHandle.setDatagridHeader("center");
        }
    })
}

function queryRecord() {
    var fromObjStr = $('#queryForm').serializeObject();
    $("#gridRecordList").datagrid("options").method = "post";
    $("#gridRecordList").datagrid('options').url = contextPath +'/sale/activity/listData';
    $("#gridRecordList").datagrid('load', fromObjStr);
}

/**
 * 导出
 */
function exportData(){
    var length = $('#gridRecordList').datagrid('getData').rows.length;
    if(length == 0){
        $_jxc.alert("无数据可导");
        return;
    }
    $('#exportWin').window({
        top:($(window).height()-300) * 0.5,
        left:($(window).width()-500) * 0.5
    });
    $("#exportWin").show();
    $("#totalRows").html($('#gridRecordList').datagrid('getData').total);
    $("#exportWin").window("open");
}

function exportExcel(){
    $("#exportWin").hide();
    $("#exportWin").window("close");

    $("#queryForm").attr("action",contextPath+"/stock/report/exportList");
    $("#queryForm").submit();
}