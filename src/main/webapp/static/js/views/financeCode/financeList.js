/**
 * Created by zhaoly on 2017/5/19.
 */

$(function () {
    initTreeFinance();
    initGridFinanceList();
})

var gridName = "gridfinanceList";
var gridHandel = new GridClass();

function initTreeFinance() {
    var args = {};
    var httpUrl = contextPath+"/supplier/getBranchSupplierAreaToTree";
    $.get(httpUrl, args,function(data){
        var setting = {
            data: {
                key:{
                    name:'codeText',
                },
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "pid",
                    rootPId: 0
                }
            },
            callback: {
                onClick: zTreeOnClick
            }
        };
        $.fn.zTree.init($("#treefinances"), setting, JSON.parse(data));
        var treeObj = $.fn.zTree.getZTreeObj("treefinances");
        var nodes = treeObj.getNodes();
        if (nodes.length>0) {
            treeObj.expandNode(nodes[0], true, false, true);
        }
    });
}

//选择树节点
function zTreeOnClick(event, treeId, treeNode) {
    gVarBranchId = treeNode.id;
    searchHandel();
}

function initGridFinanceList() {
    gridHandel.setGridName(gridName);
    $("#"+gridName).datagrid({
        method:'post',
        align:'center',
        url:contextPath+'/supplier/getSupplierList',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        fit:true,
        columns:[[
            {field:'financeCode',title:'编号',width:100,align:'left'},
            {field:'financeName',title:'名称',width:200,align:'left'},
            {field:'remark',title:'备注',width:200,align:'left'},
        ]]
    })
}