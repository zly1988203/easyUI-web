/**
 * Created by huangj02 on 2016/10/12.
 */

var gridHandel = new GridClass();

$(function(){
    initDatagridSupplierAreaList();
});
//初始化表格
function initDatagridSupplierAreaList(){
    $("#gridSupplierAreaList").datagrid({
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
            {field:'name',title:'名称',width:200,align:'left'},
        ]],
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
        }
    });
}

//交互方法========================================================================
var  addDalogTemp
var  editDalogTemp
/**
 * 新增
 */
function addHandel(){
    addDalogTemp = $('<div/>').dialog({
        href: contextPath+"/supplierArea/toAdd",
        width: 480,
        height: 320,
        title: "供应商区域-新增",
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
 * 修改
 */
function editHandel(id){
    editDalogTemp = $('<div/>').dialog({
        href: contextPath+"/supplierArea/toEdit?id="+id,
        width: 480,
        height: 320,
        title: "供应商区域-修改",
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