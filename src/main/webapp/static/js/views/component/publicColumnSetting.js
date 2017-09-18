/**
 * Created by huangj02 on 2016/8/11.
 * 公共组件-列表设置
 */
$(function(){
//	initDatagridColumnSetting();
//    initColumnSetting();
});

function initColumnSetting(param) {
    
}

var columnCallback;

function initColumnCallback(row){
	columnCallback = row;
}

function colClickRow(rowIndex, rowData){
    if(columnCallback){
    	columnCallback(rowData);
    }
}

//初始化表格
var gridColSetting = new GridClass();
function initDatagridColumnSetting(){
    gridColSetting.setGridName("gridColumn");
    $("#gridColumn").datagrid({
        //title:'普通表单-用键盘操作',
//        method:'get',
        align:'center',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
//        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:false,
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
        ]],
        onLoadSuccess : function() {
            gridActHandel.setDatagridHeader("center");
        }

    });

}

function saveSetting() {
    $("#gridColumn").datagrid("endEdit",gridColSetting.getSelectRowIndex());
    var rows = gridColSetting.getRows();
}

function toCancel() {
    $('#columnSetting').panel('destroy');
}