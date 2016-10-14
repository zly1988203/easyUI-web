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
        method:'post',
        url:contextPath+"/supplierArea/getSupplierAreaList",
        align:'center',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:10,
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'areaCode',title:'编号',width:100,align:'left',
                formatter: function(value,row,index){
                    return "<a href='#' onclick=\"editHandel('"+row.areaId+"','"+row.areaCode+"','"+row.areaName+"')\" class='ualine'>"+value+"</a>";

                }
            },
            {field:'areaName',title:'名称',width:200,align:'left'},
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
function editHandel(areaId,areaCode,areaName){
    var initData = {
        areaId:areaId,
        areaCode:areaCode,
        areaName:areaName
    }
    editDalogTemp = $('<div/>').dialog({
        href: contextPath+"/supplierArea/toEdit",
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
            initEditView(initData);
        }
    })
}
/**
 * 删除
 */
function delHandel(){
    if($("#gridSupplierAreaList").datagrid("getSelections").length <= 0){
        $.messager.alert('提示','请选中一行进行删除！');
    }else {
        debugger;
        var row = $("#gridSupplierAreaList").datagrid("getSelections");
        var formData = {areaId:row[0].areaId};
        $.ajax({
            type:"POST",
            url:contextPath+"/supplierArea/deleteSupplierArea",
            data:formData,
            success:function(data){
                if(data.code == 0){
                    $("#gridSupplierAreaList").datagrid('reload');
                    $.messager.alert('提示',"删除成功");
                }else{
                    $.messager.alert('提示',data.message);
                }
            },
            error:function(e){

            }
        })
    }

}
/**
 * 搜索
 */
function searchHandel(){
    var formData = $('#formList').serializeObject();
    $("#gridSupplierAreaList").datagrid("options").queryParams = formData;
    $("#gridSupplierAreaList").datagrid("options").method = "post";
    $("#gridSupplierAreaList").datagrid("options").url =contextPath+'/supplierArea/getSupplierAreaList',
    $("#gridSupplierAreaList").datagrid('load');
}
function reloadListHandel(){
    closeDialogHandel();
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