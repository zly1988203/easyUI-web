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
    
    $(".radioItem").change(function () {
        queryRecord();
    })

})

var gridName = "gridRecordList";
var gridRecordHandle = new GridClass();
var dg;
function initgridRecord() {
    gridRecordHandle.setGridName(gridName);
    dg = $("#"+gridName).datagrid({
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
            {field:'mobile',title:'会员号',width:'200px',align:'left'},
            {field:'prizeName',title:'奖品名称',width:'200px',align:'left'},
            {field:'prizeNum',title:'中奖数量',width:'100px',align:'right',
                formatter:function(value,row,index){
                    return  '<b>'+parseFloat(value||0).toFixed(0)+'</b>';
                }},
            {field:'statusStr',title:'奖品状态',width:'150px',align:'left'},
            {field:'formType',title:'活动类型',width:'100px',align:'right',formatter:function(value,row,index){
                if(value == '1'){
                    return '抽奖';
                }else{
                    return '未知类型：'+ value;
                }
            }},
            {field:'branchCode',title:'机构编码',width:'150px',align:'left'},
            {field:'branchName',title:'活动机构',width:'200px',align:'left'},
            {field:'winTimeStr',title:'中奖时间',width:'150px',align:'left'},
        ]],
        onLoadSuccess:function(data){
            gridRecordHandle.setDatagridHeader("center");
        }
    })
    queryRecord();
}

function queryRecord() {
    var fromObjStr = $('#queryForm').serializeObject();
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid('options').url = contextPath +'/pos/prize/record/load/list';
    $("#"+gridName).datagrid('load', fromObjStr);
    $("#startCount").attr("value",null);
    $("#endCount").attr("value",null);
}

/**
 * 导出
 */
function exportData(){
    var length = $("#"+gridName).datagrid('getData').rows.length;
    if(length == 0){
        $_jxc.alert("无数据可导");
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

function exportExcel(){
    $("#exportWin").hide();
    $("#exportWin").window("close");

    $("#queryForm").attr("action",contextPath+"/pos/prize/record/exports");
    $("#queryForm").submit();
}