/**
 * Created by zhaoly on 2017/5/22.
 */
$(function () {
    initGridCardAccount();
})

var gridName = "gridCardAccount";

var gridHandel = new GridClass();

function initGridCardAccount() {
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
            {field: 'branchCode', title: '店铺编号', width: 100, align: 'left'},
            {field: 'branchName', title: '店铺名称', width: 180, align: 'left'},
            {field: 'branchName', title: '店铺类型', width: 80, align: 'left'},
            {field: 'batchNo', title: '累计充值金额', width: 150, align: 'right'},
            {field: 'batchNo', title: '提取金额', width: 100, align: 'right'},
            {field: 'batchNo', title: '已用金额', width: 100, align: 'right'},
            {field: 'batchNo', title: '余额', width: 100, align: 'right'},

        ]]
    })
}

function query() {
    $("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url = contextPath+'/form/purchase/listData';
    $("#"+gridName).datagrid("load");
}

var rechargeDialog = null;
function recharge() {
    rechargeDialog = $('<div/>').dialog({
        href: contextPath+"/iccard/account/management/icCardRecharge",
        width:500,
        height:500,
        title: "一卡通账户充值",
        closable: true,
        resizable: true,
        onClose: function () {
            $(rechargeDialog).panel('destroy');
            rechargeDialog = null;
        },
        modal: true,
        onLoad: function () {
            initCardRecharge();

        }
    })
}

function closeRechargeDialog() {
    $(rechargeDialog).panel('destroy');
    rechargeDialog = null;
}

var extractedDialog = null;
function extracted() {
    extractedDialog = $('<div/>').dialog({
        href: contextPath+"/iccard/account/management/icCardExtracted",
        width:500,
        height:500,
        title: "一卡通账户余额提取",
        closable: true,
        resizable: true,
        onClose: function () {
            $(extractedDialog).panel('destroy');
            extractedDialog = null;
        },
        modal: true,
        onLoad: function () {
            initCardExtracted();
        }
    })
}

function closeExtractedDialog() {
    $(extractedDialog).panel('destroy');
    extractedDialog = null;
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