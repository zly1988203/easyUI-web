//区域机构 ，机构公共,字典组件公用jsp
// 2017-10-13 Reyn 修改
// 选择操作员功能以剥离，最新为publicPerson ，
// 2017-10-16 选择机构功能剥离,
/**
 * Created by huangj02 on 2016/8/11.
 * 公共组件
 */
$(function(){
    var type=$("#type").val();
    offlineStatus = $('input[type="radio"][name="offlineStatus"]:checked').val();
    if(type=="branchArea"){
        initDatagridBranchArea();
    }else if(type=="dict"){
        initDatagridDict();
    }
    gFunSetEnterKey(cx);
})

var branchAreaCallBack ;
var dictCallBack;

//初始化回调函数
function initBranchAreaCallBack(cb){
	branchAreaCallBack = cb;
}

//初始化回调函数
function initDictCallBack(cb){
	branchCallBack = cb;
}

//搜索
function cx(){
    $("#gridOperator").datagrid("options").queryParams = $("#formOperator").serializeObject();
    $("#gridOperator").datagrid("options").method = "post";
    $("#gridOperator").datagrid("load");
}
//选择单行
function operatorClickRow(rowIndex, rowData){
    if(operatorCallBack){
        operatorCallBack(rowData);
    }
}
//选择单行
function branchAreaClickRow(rowIndex, rowData){
    if(branchAreaCallBack){
    	branchAreaCallBack(rowData);
    }
}

//选择单行
function dictClickRow(rowIndex, rowData){
    if(dictClickRowCallBack){
    	dictCallBack(rowData);
    }
}

//初始化表格(区域机构)
function initDatagridBranchArea(){
    $("#gridOperator").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        url:contextPath+'/common/branchArea/getBranchAreaList',
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
            {field:'areaCode',title:'编码',width:100,align:'center'},
            {field:'areaName',title:'区域名称',width:100,align:'center'},
        ]],
        onClickRow:branchAreaClickRow,
    });
}

//初始化表格 字典
function initDatagridDict(){
	var dictType=$("#dictType").val();
    $("#gridOperator").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        url:contextPath+'/common/dict/getDictType/'+dictType,
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        height:'100%',
        width:'100%',

        columns:[[

            {field:'',title:'编码',width:100,align:'center'},
            {field:'label',title:'名称',width:100,align:'center'},
            {field:'remark',title:'备注',width:100,align:'center'},
        ]],
    });
}

function publicOperatorGetCheck(cb){
    var row =  $("#gridOperator").datagrid("getChecked");
    cb(row);
}

