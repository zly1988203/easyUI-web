/**
 * Created by zhaoly on 2017/5/19.
 */

$(function () {
    initTreeFinance();
    initGridFinanceList();
})

var gVarBranchId = "";
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
    queryFinanceCode();
}

function initGridFinanceList() {
    gridHandel.setGridName(gridName);
    $("#"+gridName).datagrid({
        method:'post',
        align:'center',
        url:contextPath+'/supplier/getSupplierList',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        fit:true,
        columns:[[
            {field:'check',checkbox:true},
            {field:'financeCode',title:'编号',width:100,align:'left'},
            {field:'financeName',title:'名称',width:200,align:'left'},
            {field:'remark',title:'备注',width:200,align:'left'},
        ]]
    })
}
var editDialogTemp = null;
function addFinanceCode() {
    editDialogTemp = $('<div/>').dialog({
        href: contextPath+"/archive/financeCode/toEdit",
        width: 400,
        height: 400,
        title: "财务代码新增",
        closable: true,
        resizable: true,
        onClose: function () {
            $(editDialogTemp).panel('destroy');
            editDialogTemp = null;
        },
        modal: true,
        onLoad: function () {

        }
    })
}

function closeDialogHandel() {
    $(editDialogTemp).panel('destroy');
    editDialogTemp = null;
}

/**
 * 搜索
 */
function queryFinanceCode(){
    var formData = $('#formFinanceList').serializeObject();
    var postParams = $.extend(formData,{branchId:gVarBranchId})
    $("#"+gridName).datagrid("options").queryParams = postParams;
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url =contextPath+'/supplierArea/getSupplierAreaList',
        $("#"+gridName).datagrid('load');
}


function delFinanceCode() {
    var rows = $("#"+gridName).datagrid("getChecked");
    if(rows.length <= 0){
        messager('请勾选数据！');
        return;
    }

    var formIds='';
    $.each(rows,function(i,v){
        formIds+=v.id+",";
    });

    $.messager.confirm('提示','是否要删除选中数据',function(data){
        if(data){
            gFunStartLoading();
            $.ajax({
                url:contextPath+"/form/purchase/delete",
                type:"POST",
                data:{
                    formIds:formIds
                },
                success:function(result){
                    gFunEndLoading();
                    if(result['code'] == 0){
                        successTip("删除成功");
                    }else{
                        successTip(result['message']);
                    }
                    $("#"+gridName).datagrid('reload');
                },
                error:function(result){
                    gFunEndLoading();
                    successTip("请求发送失败或服务器处理失败");
                }
            });
        }
    });

}