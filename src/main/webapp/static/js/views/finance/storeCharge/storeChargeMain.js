/**
 * Created by zhaoly on 2017/5/25.
 */

$(function () {
    initGridStoreCharge();
})

var gridName = "gridStoreCharge";
var gridHandel = new GridClass();

function initGridStoreCharge() {
    gridHandel.setGridName(gridName);
    $("#"+gridName).datagrid({
        align:'center',
        rownumbers:true,    //序号
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'branchCode',title:'费用代码',width:120,align:'left'},
            {field:'branchCode',title:'费用名称',width:180,align:'left'},
            {field:'formAount',title:'费用金额',width:110,align:'right'},
            {field:'contacts',title:'备注',width:180,align:'left'},
        ]]
    })
}

function storeChargeAdd() {
    toAddTab("新增门店费用",contextPath + "/finance/storeCharge/toAdd");
}

function saveStoreCharge() {
    
}

function selectFinanceCode() {
    
}

function toImportStoreCharge() {
    
}