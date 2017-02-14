/**
 * Created by huangj02 on 2016/8/11.
 * 公共组件-列表设置
 */
$(function(){
//	initDatagridColumnSetting();
//    initColumnSetting();
});

function initColumnSetting(){
    var  dalogTemp = $('#coldialog').dialog({
//    	href:"publicColumnSetting.jsp",
        width:500,
        height:580,
        title:"设置列",
        closable:true,
        resizable:true,
        closed: true,
        onClose:function(){
        	$(dalogTemp).panel('destroy');
        },
        modal:true,
        onLoad:function(){
        	initDatagridColumnSetting();
        	initColumnCallback(callBackHandel)
        },
    });
    function callBackHandel(data){
        callback(data);
        $(dalogTemp).panel('destroy');
    }
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
function initDatagridColumnSetting(){
    $("#gridColumn").datagrid({
        //title:'普通表单-用键盘操作',
//        method:'get',
        align:'center',
//        url:'component.json',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
//        rownumbers:true,    //序号
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
//        onClickRow:colClickRow,
    });
    
    var jsonArr = '{"total":28,"rows":[{ "hh":"2016727154924","mrwb":"略","zdywb":"略","kd":"略"},{"hh":"2016727154924","mrwb":"略","zdywb":"略","kd":"略"}]}'

    var data = $.parseJSON(jsonArr);  
    
    $('#gridColumn').datagrid('loadData', data); //将数据绑定到datagrid   
}