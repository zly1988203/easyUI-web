/**
 * Created by zhaoly on 2017/10/13.
 */

var operatorCallBack ;

$(function () {
    initDatagridPerson();
    gFunSetEnterKey(cx);
})

//初始化回调函数
function initPersonCallBack(cb){
    operatorCallBack = cb;
}

//0708 bwp 初始化操作员参数
var _ope_selectType = null;
function initPersonView(param){

    if(param.nameOrCode){
        $("#formOperator :text[name=nameOrCode]").val(param.nameOrCode);
    }
    _ope_selectType = param.selectType;
    initDatagridPerson();
}

//初始化表格 操作员
function initDatagridPerson(){
    var ope_datagridObj = {
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        url:contextPath+'/system/user/getOperator',
        queryParams:{
            nameOrCode:$("#formOperator :text[name=nameOrCode]").val()
        },
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        height:'100%',
        width:'100%',
        idField:'userCode',
        columns:[[
            {field:'id',checkbox:true,hidden:_ope_selectType==1?false:true},
            {field:'userCode',title:'操作员编号',width:100,align:'left'},
            {field:'userName',title:'操作员名称',width:100,align:'left'},
        ]],
        onLoadSuccess : function() {
            $('.datagrid-header').find('div.datagrid-cell').css('text-align','center');
        }
    }

    //单选 兼容就方法
    if(_ope_selectType != 1){
        ope_datagridObj['singleSelect'] = true;
        ope_datagridObj['onClickRow'] = operatorClickRow;
    }else{
        //多选
        ope_datagridObj['singleSelect'] = false;
        delete ope_datagridObj.onClickRow;
    }


    var _opeDatagridObj = $("#gridPerson").datagrid(ope_datagridObj);

    //多选
    if(_ope_selectType == 1){
        console.log($(_opeDatagridObj).datagrid('options'));
        $(_opeDatagridObj).datagrid('options').onClickRow = function(){}
        $(_opeDatagridObj).datagrid('options').singleSelect = false;
    }
}


//搜索
function cx(){
    $("#gridPerson").datagrid("options").queryParams = $("#formOperator").serializeObject();
    $("#gridPerson").datagrid("options").method = "post";
    $("#gridPerson").datagrid("load");
}
//选择单行
function operatorClickRow(rowIndex, rowData){
    if(operatorCallBack){
        operatorCallBack(rowData);
    }
}

function publicPersonGetCheck(cb){
    var row =  $("#gridPerson").datagrid("getChecked");
    cb(row);
}
