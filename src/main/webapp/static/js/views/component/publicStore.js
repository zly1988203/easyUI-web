/**
 * Created by huangj02 on 2016/8/11.
 * 公共组件-机构选择
 */
$(function(){
    gFunSetEnterKey(storeSearch);
    initDatagridStore();
})
var storeCallBack ;
//初始化回调函数
function initStoreCallBack(cb){
    storeCallBack = cb;
}
//搜索
function storeSearch(){
    $("#gridStore").datagrid("options").queryParams = $("#formStore").serializeObject();
    $("#gridStore").datagrid("options").method = "post";
    $("#gridStore").datagrid("load");
}
//选择单行
function storeClickRow(rowIndex, rowData){
    if(storeCallBack){
        storeCallBack(rowData);
    }
}
//初始化表格
function initDatagridStore(){
    $("#gridStore").datagrid({
        //title:'普通表单-用键盘操作',
        method:'get',
        align:'center',
        url:'../../json/component.json',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'bh',title:'编号',width:100,align:'left'},
            {field:'mc',title:'名称',width:100,align:'left'},
            {field:'lxr',title:'联系人',width:100,align:'left'},
             {field:'dh',title:'电话',width:100,align:'left'},
        ]],
        onLoadSuccess : function() {
        	$('.datagrid-header').find('div.datagrid-cell').css('text-align','center');
        },
        onClickRow:storeClickRow,
    });
}