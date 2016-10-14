/**
 * Created by huangj02 on 2016/10/12.
 */

var gridHandel = new GridClass();

$(function(){
    initTreeArchives();
    initDatagridsupplierList();
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
        $.fn.zTree.init($("#treeArchives"), setting, JSON.parse(data));
        var treeObj = $.fn.zTree.getZTreeObj("treeArchives");
        var nodes = treeObj.getNodes();
        if (nodes.length>0) {
            treeObj.expandNode(nodes[0], true, false, true);
        }
    });
}

//初始化表格
function initDatagridsupplierList(){
    $("#gridSupplierArchiveList").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        url:contextPath+'/supplier/getSupplierList',
        align:'center',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:10,
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'supplierCode',title:'编号',width:100,align:'left',
                formatter: function(value,row,index){
                    return "<a href='#' onclick=\"editHandel("+row.id+")\" class='ualine'>"+value+"</a>";
                }
            },
            {field:'supplierName',title:'名称',width:100,align:'left'},
            {field:'saleWay',title:'经营方式',width:100,align:'left'},
             {field:'status',title:'状态',width:100,align:'left'},
             {field:'contcat',title:'联系人',width:100,align:'left'},
             {field:'mobile',title:'手机号码',width:100,align:'left'},
             {field:'branchName',title:'所属机构',width:100,align:'left'},
             {field:'createUserName',title:'创建人',width:100,align:'left'},
             {field:'createTime',title:'创建时间',width:100,align:'left'},
        ]],
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
        }
    });
}


//交互方法========================================================================

var  addDalogTemp;
var  editDalogTemp;

var gVarBranchId;
var gVarSupplierAreaId;

//选择树节点
function zTreeOnClick(event, treeId, treeNode) {
    if(treeNode.type=="branch"){//选择机构
        gVarBranchId = treeNode.id;
        gVarSupplierAreaId = "";
    }else if(treeNode.type=="area"){//选择区域
        gVarBranchId = treeNode.pid
        gVarSupplierAreaId = treeNode.id;
    }
    searchHandel();
}
/**
 * 新增
 */
function addHandel(){
    addDalogTemp = $('<div/>').dialog({
        href: contextPath+"/supplier/toAdd",
        width: 1000,
        height: 680,
        title: "供应商档案-新增",
        closable: true,
        resizable: true,
        onClose: function () {
            $(addDalogTemp).panel('destroy');
        },
        modal: true,
        onLoad: function () {
        }
    })
}
/**
 * 复制
 */
function copyHandel(){
    if($("#gridArchives").datagrid("getSelections").length <= 0){
        $.messager.alert('提示','请选中一行进行复制新增商品！');
        return false;
    }else {
        var selectionRow = $("#gridArchives").datagrid("getSelections");
        addDalogTemp = $('<div/>').dialog({
            href: contextPath + "/supplier/toAdd",
            width: 1000,
            height: 680,
            title: "供应商档案-新增",
            closable: true,
            resizable: true,
            onClose: function () {
                $(addDalogTemp).panel('destroy');
            },
            modal: true,
            onLoad: function () {
                initCopyData(selectionRow);
            }
        })
    }
}
/**
 * 修改
 */
function editHandel(id){
    editDalogTemp = $('<div/>').dialog({
        href: contextPath+"/supplier/toEdit?id="+id,
        width: 1000,
        height: 680,
        title: "供应商档案-修改",
        closable: true,
        resizable: true,
        onClose: function () {
            $(editDalogTemp).panel('destroy');
        },
        modal: true,
        onLoad: function () {
        }
    })
}

/**
 * 导出
 */
function exportHandel(){

}

/**
 * 删除
 */
function delHandel(){

}
/**
 * 搜索
 */
function searchHandel(){
    var formData = $('#formList').serializeObject();
    var postParams = $.extend(formData,{branchId:gVarBranchId,supplierAreaId:gVarSupplierAreaId})
    $("#gridSupplierArchiveList").datagrid("options").queryParams = postParams;
    $("#gridSupplierArchiveList").datagrid("options").method = "post";
    $("#gridSupplierArchiveList").datagrid("options").url =contextPath+'/supplier/getSupplierList',
    $("#gridSupplierArchiveList").datagrid('load');
}
function reloadListHandel(){
    $("#gridSupplierArchiveList").datagrid('reload');
}
function closeDialogHandel(){
    if(addDalogTemp){
        $(addDalogTemp).panel('destroy');
    }
    if(editDalogTemp){
        $(editDalogTemp).panel('destroy');
    }
}