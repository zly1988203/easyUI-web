/**
 * Created by zhaoly on 2017/5/26.
 */

var  costTitle = '开店成本(含折旧)';
$(function () {
    initGridDayAnalysis();
    $("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    changeStatus();
})

//单据状态切换
function changeStatus(){
    $(".radioItem").change(function(){
        if($(this).val() === "0"){
            costTitle = '开店成本(含折旧)';
        }else{
            costTitle = '开店成本(不含折旧)';
        }
        initGridDayAnalysis();
    });
}

var gridName = "gridDayAnalysis";
var gridHandel = new GridClass();
var dg = null;
function initGridDayAnalysis() {
    gridHandel.setGridName(gridName);
    dg = $("#"+gridName).datagrid({
        align:'center',
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        showFooter:true,
        height:'100%',
        width:'100%',
        fitColumns:true,    //每列占满
        columns:[[
            {field:'date',title:'日期',width:"120px",align:'left'},
            {field:'branchCode',title:'机构编码',width:"80px",align:'left'},
            {field:'branchName',title:'机构名称',width:"120px",align:'left'},
            {field:'branchName',title:'所属分公司',width:"120px",align:'left'},
            {field:'formAount',title:'店铺面积(m*2)',width:"180px",align:'right'},
            {field:'year',title:'费用均摊年数',width:"180px",align:'right'},
            {field:'costing',title:costTitle,width:"180px",align:'right'},
            {field:'day',title:'日盈亏平衡点',width:"120px",align:'right'},
            {field:'formAount',title:'销售额',width:"120px",align:'right'},
            {field:'count',title:'客单数',width:"120px",align:'right'},
            {field:'price',title:'客单价',width:"120px",align:'right'},

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


function queryDayAnalysis() {
    $("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url = contextPath+'/finance/storeCharge/list';
    $("#"+gridName).datagrid("load");
}

function exportData(){
    var length = dg.datagrid('getData').rows.length;
    if(length == 0){
        messager("无数据可导");
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
