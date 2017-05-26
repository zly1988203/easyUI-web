/**
 * Created by zhaoly on 2017/5/25.
 */

$(function () {
    initGridBranchCostList();
    $("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
})

var gridName = "gridStoreChargeList";
var gridHandel = new GridClass();

function initGridBranchCostList() {
    gridHandel.setGridName(gridName);
    $("#"+gridName).datagrid({
        align:'center',
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'orderCode',title:'单号',width:80,align:'left',
                formatter: function(value,row,index){
                    return "<a href='#' onclick=\"editHandel('"+row.orderCode+"')\" class='ualine'>"+value+"</a>";
                }
            },
            {field:'branchCode',title:'审核状态',width:80,align:'left'},
            {field:'branchCode',title:'机构编码',width:80,align:'left'},
            {field:'branchName',title:'机构名称',width:180,align:'left'},
            {field:'formAount',title:'单据金额',width:110,align:'right'},
            {field:'month',title:'费用月份',width:110,align:'right'},
            {field:'contacts',title:'操作人',width:120,align:'left'},
            {field:'contacts',title:'操作时间',width:120,align:'left'},
            {field:'contacts',title:'审核人',width:120,align:'left'},
            {field:'contacts',title:'备注',width:120,align:'left'},
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

/**
 * 操作员列表下拉选
 */
function selectOperator(){
    new publicOperatorService(function(data){
        //data.Id
        $("#operateUserId").val(data.id);
        $("#operateUserName").val("["+data.userCode+"]"+data.userName);
    });
}

function queryStoreCharge() {
    $("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url = contextPath+'/finance/storeCharge/list';
    $("#"+gridName).datagrid("load");
}

function storeChargeAdd() {
    toAddTab("新增门店费用",contextPath + "/finance/storeCharge/toAdd");
}

function editHandel(orderCode) {
    toAddTab("门店费用详情",contextPath + "/finance/storeCharge/toEdit?formId="+orderCode);
}
