/**
 * Created by zhaoly on 2017/5/26.
 */

var costTitle = '开店成本(月均摊)';
$(function () {
    initGridMonthAnalysis();
    $("#txtStartDate").val(dateUtil.getPreMonthDate().format("yyyy-MM"));
    $("#txtEndDate").val(dateUtil.getPreMonthDate().format("yyyy-MM"));

    changeStatus();
})

//单据状态切换
function changeStatus(){
    $(".radioItem").change(function(){
        if($(this).val() === "0"){
            costTitle = '开店成本(月均摊)';
        }else{
            costTitle = '开店成本(月均摊不含折旧)';
        }
        initGridMonthAnalysis();
    });
}

var gridName = "gridMonthAnalysis";
var gridHandel = new GridClass();
var dg = null;
function initGridMonthAnalysis() {
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
            {field:'branchCode',title:'机构编码',width:"80px",align:'left'},
            {field:'branchName',title:'机构名称',width:"120px",align:'left'},
            {field:'branchName',title:'所属分公司',width:"120px",align:'left'},
            {field:'month',title:'月份',width:"120px",align:'left'},
            {field:'d',title:'开店成本',width:"120px",align:'right'},
            {field:'forfmAount',title:'费用均摊年数',width:"180px",align:'right'},
            {field:'fordmAount',title:costTitle,width:"200px",align:'right'},
            {field:'forsmAount',title:'每月固定开支',width:"180px",align:'right'},
            {field:'formAeount',title:'上月销售额',width:"180px",align:'right'},
            {field:'formxAount',title:'上月毛利率',width:"180px",align:'right'},
            {field:'formAcount',title:'月盈亏平衡点',width:"180px",align:'right'},
            {field:'formAount',title:'日盈亏平衡点',width:"180px",align:'right'},
        ]],
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
        }
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


function queryMonthAnalysis() {
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
