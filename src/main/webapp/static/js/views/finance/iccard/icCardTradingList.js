/**
 * Created by zhaoly on 2017/5/22.
 */

$(function () {
    initGridCardTrading();
    changeStatus();
    initConditionParams();

})

//单据状态切换
function changeStatus(){
    $(".radioItem").change(function(){
        var type = $(this).val();
        $('#queryType').val(type);
        $("#"+gridName).datagrid("options").url = "";
        initGridCardTrading();
        $('#'+gridName).datagrid('loadData',[]);
    });
}

//初始化默认条件
function initConditionParams(){
    $("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
}

function getFiledList() {
    if($('#queryType').val() === "1"){
        return [[
            {field: 'branchCode', title: '店铺编号', width: 100, align: 'left'},
            {field: 'branchName', title: '店铺编号', width: 180, align: 'left'},
            {field: 'batchNo', title: '业务单号', width: 180, align: 'left'},
            {field: 'batchNo', title: '卡号', width: 180, align: 'left'},
            {field: 'batchNo', title: '业务类型', width: 80, align: 'left'},
            {field: 'batchNo', title: '金额', width: 100, align: 'right'},
            {field: 'batchNo', title: '时间', width: 180, align: 'left'},
            {field: 'batchNo', title: '收银员', width: 80, align: 'left'},
        ]]
    }else{
        return [[
            {field: 'branchCode', title: '店铺编号', width: 100, align: 'left'},
            {field: 'branchName', title: '店铺编号', width: 180, align: 'left'},
            {field: 'batchNo', title: '售卡合计', width: 120, align: 'right'},
            {field: 'batchNo', title: '充值合计', width: 120, align: 'right'},
            {field: 'batchNo', title: '消费合计', width: 120, align: 'right'},
            {field: 'batchNo', title: '退货合计', width: 120, align: 'right'},
            {field: 'batchNo', title: '合计', width: 120, align: 'right'},
        ]]
    }
}




var gridName = "gridCardTrading";

var gridHandel = new GridClass();

function initGridCardTrading() {
    gridHandel.setGridName("gridCardTrading");
    $("#"+gridName).datagrid({
        align:'center',
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:getFiledList()
    })

}

function query() {
    $("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url = contextPath+'/form/purchase/listData';
    $("#"+gridName).datagrid("load");
}

/**
 * 机构名称
 */
function selectListBranches(){
    new publicAgencyService(function(data){
        $("#branchId").val(data.branchesId);
        $("#branchName").val(data.branchName);
        $("#branchCompleCode").val(data.branchCompleCode);
        $("#oldBranchName").val(data.branchName);
    },'BF','');
}

/**
 * 收银员
 */
function selectOperator(){
    new publicOperatorService(function(data){
        $("#salesmanId").val(data.id);
        $("#salesmanName").val(data.userName);
    });
}