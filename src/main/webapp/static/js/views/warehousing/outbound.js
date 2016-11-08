/**
 * Created by huangj02 on 2016/8/10.
 */
$(function(){
    initDatagridOutbound();
});
//初始化表格
function initDatagridOutbound(){
    $("#gridOutbound").datagrid({
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
        columns:[[
            {field:'dh',title:'单号',width:135,align:'center'},
            {field:'shzt',title:'审核状态',width:100,align:'center'},
            {field:'qubm',title:'区域编码',width:100,align:'center'},
            {field:'qumc',title:'区域名称',width:100,align:'center'},
            {field:'czy',title:'操作员',width:100,align:'center'},
            {field:'czrq',title:'操作日期',width:100,align:'center'},
            {field:'shr',title:'审核人',width:100,align:'center'},
            {field:'bz',title:'备注',width:100,align:'center'},
            {field:'zdjg',title:'制单机构',width:100,align:'center'},
            {field:'zdjgmc',title:'制单机构名称',width:220,align:'center'},
        ]]
    });
}