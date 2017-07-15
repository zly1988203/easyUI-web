/**
 * Created by Jason on 2017/7/15.
 */
$(function(){
    //$("#branchCode").val(sessionBranchCode);
    $("#branchName").val(sessionBranchName);
    $("#branchId").val(sessionBranchId);
    $("#branchCompleCode").val(sessionBranchCompleCode);
    $("#oldBranchName").val(sessionBranchName);
    //开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    initDgTakeStockOperate();
});
//初始化表格
function initDgTakeStockOperate(){
    stockList = $("#operateList").datagrid({
        method:'post',
        align:'center',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        fitColumns:true,    //每列占满
        height:'100%',
        width:'100%',
        columns:[[
            {field:'check',checkbox:true},
            {field: 'formNo', title: '盘点单', width: 180, align: 'left',formatter:function(value,row,index){
                var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'盘点单未知商品详情\',\''+contextPath +'/stocktaking/unknown/sku/stocktakingFormView?id='+row.id+'\')">' + value + '</a>';
                return strHtml;
            }},
            {field: 'status', title: '状态', width: 100, align: 'center',formatter:function(value,row,index){
                if(value == '0'){
                    return '未审核';
                }else if(value == '1'){
                    return '审核通过';
                }else if(value == '2'){
                    return '审核失败';
                }else{
                    return '未知类型：'+ value;
                }
            }},
            {field:'skuNum',title: '品项数', width: 100, align: 'center'},
            {field: 'branchCode', title: '机构编码', width: 100, align: 'left'},
            {field: 'branchName', title: '机构名称', width: 120, align: 'left'},
            {field: 'batchNo', title: '盘点批号', width: 180, align: 'left'},
            {field: 'createUserName', title: '制单人员', width: 140, align: 'left'},
            {field: 'createTime', title: '操作日期', width: 140, align: 'left'},
            {field: 'remark', title: '备注', width: 140, align: 'left'},
        ]]
    });
    queryForm();
}

// 查询
function queryForm(){
    var oldBranchName = $("#oldBranchName").val();
    var branchName = $("#branchName").val();
    if(oldBranchName && oldBranchName != branchName){
        $("#branchId").val('');
        $("#branchCompleCode").val('');
    }
    var oldCreateUserName = $("#oldCreateUserName").val();
    var createUserName = $("#createUserName").val();
    if(oldCreateUserName && oldCreateUserName != createUserName){
        $("#createUserId").val('');
    }
    var fromObjStr = $('#queryForm').serializeObject();
    // 去除编码
    fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)
    fromObjStr.createUserName = fromObjStr.createUserName.substring(fromObjStr.createUserName.lastIndexOf(']')+1)

    $("#operateList").datagrid("options").method = "post";
    $("#operateList").datagrid('options').url = contextPath + '/stocktaking/unknown/sku/getStocktakingFormList';
    $("#operateList").datagrid('load', fromObjStr);
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
 * 操作员
 */
function selectOperator(){
    new publicOperatorService(function(data){
        $("#createUserId").val(data.id);
        $("#createUserName").val(data.userName);
        $("#oldCreateUserName").val(data.userName);
    });
}
