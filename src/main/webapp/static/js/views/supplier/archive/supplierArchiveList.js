/**
 * Created by huangj02 on 2016/10/12.
 */

var gridHandel = new GridClass();

$(function(){
    initTreeArchives();
    initDatagridSupplierArchiveList();
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
    $("#gridsupplierList").datagrid({
        //title:'普通表单-用键盘操作',
        method:'get',
        align:'center',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:10,
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'no',title:'编号',width:100,align:'left',
                formatter: function(value,row,index){
                    return "<a href='#' onclick=\"editHandel("+row.id+")\" class='ualine'>"+value+"</a>";
                }
            },
            {field:'name',title:'名称',width:100,align:'left'},
            {field:'jyfs',title:'经营方式',width:100,align:'left'},
             {field:'status',title:'状态',width:100,align:'left'},
             {field:'lxr',title:'联系人',width:100,align:'left'},
             {field:'phone',title:'手机号码',width:100,align:'left'},
             {field:'ssjg',title:'所属机构',width:100,align:'left'},
             {field:'cjr',title:'创建人',width:100,align:'left'},
             {field:'cjsj',title:'创建时间',width:100,align:'left'},
        ]],
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
        }
    });
}


//交互方法========================================================================

var  addDalogTemp
var  editDalogTemp

//选择树节点
function zTreeOnClick(event, treeId, treeNode) {

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

}
function reloadListHandel(){
    $("#gridSupplierAreaList").datagrid('reload');
}
function closeDialogHandel(){
    if(addDalogTemp){
        $(addDalogTemp).panel('destroy');
    }
    if(editDalogTemp){
        $(editDalogTemp).panel('destroy');
    }
}