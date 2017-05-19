/**
 * Created by zhaoly on 2017/5/18.
 */

var gridName = "gridBranchList";
var gridHandel = new GridClass();
var gVarBranchId = "";
$(function(){
    initTreeArchives();
    initDatagridBranchList();
    
    $(document).on('click','.radioItem',function () {
        searchHandel();
    })
});

/**
 * 初始树
 */
function initTreeArchives(){
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
        $.fn.zTree.init($("#treeBranchList"), setting, JSON.parse(data));
        var treeObj = $.fn.zTree.getZTreeObj("treeArchives");
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

function initDatagridBranchList() {
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
            {field:'branchCode',title:'机构编号',width:100,align:'left',
                formatter: function(value,row,index){
                    return "<a href='#' onclick=\"editHandel('"+row.branchId+"','"+row.branchCode+"','"+row.branchName+"')\" class='ualine'>"+value+"</a>";

                }
            },
            {field:'branchName',title:'机构名称',width:200,align:'left'},
            {field:'branchType',title:'机构类型',width:100,align:'left'},
            {field:'branchName',title:'所属机构',width:200,align:'left'},
            {field:'branchName',title:'状态',width:100,align:'left'},
            {field:'branchName',title:'联系人',width:200,align:'left'},
            {field:'branchName',title:'联系电话',width:200,align:'left'},
            {field:'branchName',title:'固定电话',width:200,align:'left'},
            {field:'branchName',title:'店铺面积(m*3)',width:100,align:'left'},
            {field:'branchName',title:'费用均摊年数',width:200,align:'right'},
            {field:'branchName',title:'建店时间',width:200,align:'left'},
        ]]
    });
}

/**
 * 修改
 */
var  editDalogTemp
function editHandel(branchId,branchCode,branchName){
    var initData = {
        areaId:areaId,
        areaCode:areaCode,
        areaName:areaName,
    }
    editDalogTemp = $('<div/>').dialog({
        href: contextPath+"/branchManager/toEdit",
        width: 480,
        height: 320,
        title: "修改机构信息",
        closable: true,
        resizable: true,
        onClose: function () {
            $(editDalogTemp).panel('destroy');
            editDalogTemp = null;
        },
        modal: true,
        onLoad: function () {
            initEditView(initData);
        }
    })
}

/**
 * 搜索
 */
function searchHandel(){
    var formData = $('#formList').serializeObject();
    var postParams = $.extend(formData,{branchId:gVarBranchId})
    $("#"+gridName).datagrid("options").queryParams = postParams;
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url =contextPath+'/supplierArea/getSupplierAreaList',
    $("#"+gridName).datagrid('load');
}
