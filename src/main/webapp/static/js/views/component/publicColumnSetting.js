/**
 * Created by huangj02 on 2016/8/11.
 * 公共组件-列表设置
 */
$(function(){
    initDatagridColumn();
});
//初始化表格
function initDatagridColumn(){
    $("#gridColumn").datagrid({
        //title:'普通表单-用键盘操作',
        method:'get',
        align:'center',
        url:'../../json/component.json',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        height:'100%',
        columns:[[
            {field:'xs',title:'显示',   formatter : function(value, row,index) {
                var str = "<input type='checkbox' class='uw-16 uh-16' checked='checked' >";
                return str;
            }},
            {field:'dy',title:'打印', formatter : function(value, row,index) {
                var str = "<input type='checkbox' class='uw-16 uh-16' checked='checked' >";
                return str;
            }},
            {field:'mrwb',title:'默认文本',width:100,align:'center'},
             {field:'zdywb',title:'自定义文本',width:100,align:'center'},
             {field:'kd',title:'宽度',width:100,align:'center'},
             {field:'cz',title:'操作',width:100,align:'center',
                 formatter : function(value, row,index) {
                     var str =  '<span name="rowUp" class="row-up" data-index="'+index+'" onclick="addLineHandel(event)" "></span>&nbsp;&nbsp;' +
                         '&nbsp;&nbsp;<span name="rowDown" class="row-down" data-index="'+index+'" onclick="delLineHandel(event)" ></span>';
                     return str;
                 },
             },
        ]]
    });
}