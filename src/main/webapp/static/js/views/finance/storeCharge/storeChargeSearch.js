/**
 * Created by zhaoly on 2017/5/25.
 */

$(function () {
    initGridChargeSearchList();
    $("#month").val(dateUtil.getPreMonthDate().format("yyyy-MM"));
})

var gridName = "gridStoreChargeSearch";
var gridHandel = new GridClass();
var dg;
function initGridChargeSearchList() {
    gridHandel.setGridName(gridName);
    dg=$("#"+gridName).datagrid({
        align:'center',
        rownumbers:true,    //序号
        pagination:false,    //分页
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'branchCode',title:'机构编码',width:80,align:'left'},
            {field:'branchName',title:'机构名称',width:180,align:'left'},
            {field:'branchName',title:'所属分公司',width:180,align:'left'},
            {field:'month',title:'月份',width:110,align:'left'},
            {field:'amount',title:'金额',width:110,align:'right'},
        ]]
    })
}

/**
 * 机构名称
 */
function selectListBranches(){
    new publicAgencyService(function(data){
        $("#branchId").val(data.branchesId);
        $("#branchCompleCode").val(data.branchCompleCode);
        $("#branchName").val("["+data.branchCode+"]" + data.branchName);
    },'BF','');
}

function queryCharge() {
    $("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").method = "POST";
    $("#"+gridName).datagrid("options").url = contextPath+'/finance/storeChargeSearch/reportListPage';
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
