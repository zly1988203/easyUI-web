/**
 * Created by zhaoly on 2017/8/18.
 */
$(function () {
    initgridPosActivity();
    // 开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    $('#branchTemp').branchSelect();
})

var gridName = "gridPosActivity";
var gridPosActivityHandle = new GridClass();
function initgridPosActivity() {
    gridPosActivityHandle.setGridName(gridName);
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
            {field:'skuName',title:'活动编号',width:'200px',align:'left'},
            {field:'barCode',title:'活动名称',width:'200px',align:'left'},
            {field:'barCode',title:'活动类型',width:'100px',align:'right'},
            {field:'barCode',title:'开始时间',width:'150px',align:'left'},
            {field:'barCode',title:'结束时间',width:'100px',align:'right'},
            {field:'barCode',title:'奖品有效期',width:'150px',align:'left'},
            {field:'barCode',title:'活动状态',width:'200px',align:'left'},
            {field:'barCode',title:'制单人',width:'150px',align:'left'},
            {field:'barCode',title:'审核人',width:'150px',align:'left'},
            {field:'barCode',title:'审核日期',width:'150px',align:'left'},
        ]],
        onLoadSuccess:function(data){
            gridRecordHandle.setDatagridHeader("center");
        }
    })
}

function queryPosActivity() {
    var fromObjStr = $('#queryForm').serializeObject();
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid('options').url = contextPath +'/sale/activity/listData';
    $("#"+gridName).datagrid('load', fromObjStr);
}

function addPosActivity() {
    toAddTab("新增Pos客屏活动",contextPath + "/pos/wheelsurf/form/add");
}

function copyPosActivity() {
    var row =  $("#"+gridName).datagrid('getSelected');
    if(!row){
        $_jxc.alert("请选择一条数据");
        return;
    }



}

function delPosActivity() {
    var row =  $("#"+gridName).datagrid('getSelected');
    if(!row){
        $_jxc.alert("请选择一条数据");
        return;
    }
}