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
    var httpUrl = contextPath+"/archive/branch/getBranchAreaToTree";
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
        var treeObj = $.fn.zTree.getZTreeObj("treeBranchList");
        var nodes = treeObj.getNodes();
        if (nodes.length>0) {
            treeObj.expandNode(nodes[0], true, false, true);
        }
    });
}

//选择树节点
function zTreeOnClick(event, treeId, treeNode) {
    gVarBranchId = treeNode.id;
    queryBranch();
}

function initDatagridBranchList() {
    gridHandel.setGridName(gridName);
    $("#"+gridName).datagrid({
        method:'post',
        align:'center',
        url:contextPath+'/archive/branch/getBranchList',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        fit:true,
        columns:[[
            {field:'branchCode',title:'机构编码',width:100,align:'left',
                formatter: function(value,row,index){
                    return "<a href='#' onclick=\"editHandel('"+row.branchId+"','"+row.branchCode+"','"+row.branchName+"')\" class='ualine'>"+value+"</a>";

                }
            },
            {field:'branchName',title:'机构名称',width:200,align:'left'},
            {field:'branchTypeStr',title:'机构类型',width:100,align:'left'},
            {field:'parentBranchName',title:'所属机构',width:200,align:'left'},
            {field:'offlineStatusStr : String',title:'状态',width:100,align:'left'},
            {field:'contacts',title:'联系人',width:200,align:'left'},
            {field:'mobile',title:'联系电话',width:200,align:'left'},
            {field:'areaSize',title:'店铺面积(m*3)',width:100,align:'left'},
            {field:'costAvgYear',title:'费用均摊年数',width:200,align:'right'},
            {field:'createTime',title:'建店时间',width:200,align:'left',
            	formatter : function(value, rowData, rowIndex) {
            		return formatDate(value);
            	}
            },
        ]],
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
        }
    });
}

/**
 * 修改
 */
function editHandel(branchId,branchCode,branchName){
    var initData = {
        branchId:branchId,
        branchCode:branchCode,
        branchName:branchName,
    }
    openEditBranchDailog();
}

var dialogHeight = $(window).height()*(4/5);
var dialogWidth = $(window).width()*(5/9);
var dialogLeft = $(window).width()*(1/5);
var  editDialogTemp
function  openEditBranchDailog() {
    editDialogTemp = $('<div/>').dialog({
        href: contextPath+"/archive/branch/toEdit",
        width: dialogWidth,
        height: dialogHeight,
        left:dialogLeft,
        title: "修改机构信息",
        closable: true,
        resizable: true,
        onClose: function () {
            $(editDialogTemp).panel('destroy');
            editDialogTemp = null;
        },
        modal: true,
        onLoad: function () {
            initBranchInfo();
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
function queryBranch(){
    var formData = $('#formList').serializeObject();
    var postParams = $.extend(formData,{branchId:gVarBranchId})
    $("#"+gridName).datagrid("options").queryParams = postParams;
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url =contextPath+'/supplierArea/getSupplierAreaList',
    $("#"+gridName).datagrid('load');
}

function editBranch() {
    var row = $("#"+gridName).datagrid("getSelected");
    if(!row || row == null){
        messager("请选择一条数据!");
        return;
    }
    openEditBranchDailog();
}
