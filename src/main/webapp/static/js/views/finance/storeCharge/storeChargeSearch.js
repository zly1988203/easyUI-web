/**
 * Created by zhaoly on 2017/5/25.
 */

var storeStatus = "0";
$(function () {
    initGridChargeSearchList();
    $("#startTime").val(dateUtil.getPreMonthDate().format("yyyy-MM"));
    changeStoreStatus();
})

function changeStoreStatus() {
    $(".radioItem").change(function () {
        storeStatus = $(this).val();
        initGridChargeSearchList();
    });
}

var gridName = "gridStoreChargeSearch";
var gridHandel = new GridClass();
var dg;
function initGridChargeSearchList() {
    gridHandel.setGridName(gridName);
    dg=$("#"+gridName).datagrid({
        align:'center',
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        showFooter:true,
        height:'100%',
        width:'100%',
        singleSelect:true,
        columns:getGridcolumns()
    })
}

function getGridcolumns(){
    if(storeStatus == "0"){
        return [[
            {field:'branchCode',title:'机构编码',width:80,align:'left'},
            {field:'branchName',title:'机构名称',width:180,align:'left'},
            {field:'branchName',title:'所属分公司',width:180,align:'left'},
            {field:'month',title:'月份',width:110,align:'left'},
            {field:'formAount',title:'金额',width:110,align:'right'},
        ]]
    }else{
        return [[
            {field:'orderCode',title:'单号',width:80,align:'left'},
            {field:'branchCode',title:'机构编码',width:80,align:'left'},
            {field:'branchName',title:'机构名称',width:180,align:'left'},
            {field:'branchName',title:'所属分公司',width:180,align:'left'},
            {field:'month',title:'月份',width:110,align:'left'},
            {field:'branchName',title:'费用项目',width:180,align:'left'},
            {field:'formAount',title:'金额',width:110,align:'right'},
            {field:'remark',title:'备注',width:180,align:'left'},
        ]]
    }
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

function queryCharge() {
    $("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url = contextPath+'/finance/storeChargeSearch/list';
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
