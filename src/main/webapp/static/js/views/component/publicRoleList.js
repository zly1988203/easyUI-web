/**
 * Created by huangj02 on 2016/8/11.
 * 公共组件-角色选择
 */

var currBranchCompleCode;
var currBranchType;
function initRoleCommonView(branchCompleCode, branchType){
	currBranchCompleCode = branchCompleCode;
	currBranchType = branchType;
	initDatagridRole();
	gFunSetEnterKey(query);
}

var roleCallBack ;

//初始化回调函数
function initRoleCallBack(cb){
	roleCallBack = cb;
}

//搜索
function queryRoleListCommon(){
    $("#gridRole").datagrid("options").queryParams = $("#formRole").serializeObject();
    $("#gridRole").datagrid("options").method = "post";
    $("#gridRole").datagrid("load");
}

//选择单行
function roleClickRow(rowIndex, rowData){
    if(roleCallBack){
    	roleCallBack(rowData);
    }
}

//初始化表格 操作员
function initDatagridRole(){
	var branchCompleCode = $("#branchCompleCode")
    $("#gridRole").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        url:contextPath+'/role/common/getRoleComponentList',
        queryParams: {
        	branchCompleCode : currBranchCompleCode,
        	branchType : currBranchType
    	},
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        fit:true,
        width:'100%',
        columns:[[
            {field:'roleCode',title:'角色编号',width:100,align:'left'},
            {field:'roleName',title:'角色名称',width:100,align:'left'},
        ]],
        onLoadSuccess : function() {
        	$('.datagrid-header').find('div.datagrid-cell').css('text-align','center');
       },
        onClickRow:roleClickRow,
    });
}