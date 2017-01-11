$(function(){
	initDatagridBranchCheck();
    gFunSetEnterKey(cx);
})

var branchCallBack ;

//初始化回调函数
function initBranchCallBack(cb){
	branchCallBack = cb;
}

//搜索
function cx(){
    $("#gridOperator").datagrid("options").queryParams = $("#formOperator").serializeObject();
    $("#gridOperator").datagrid("options").method = "post";
    $("#gridOperator").datagrid("load");
}

//选择单行
function branchClickRow(rowIndex, rowData){
    if(branchCallBack){
    	branchCallBack(rowData);
    }
}

//初始化表格 
function initDatagridBranchCheck(){
  $("#gridOperator").datagrid({
      method:'post',
      align:'center',
      url:contextPath+'/common/branches/queryComponentList',
      singleSelect:false,  //单选  false多选
      rownumbers:true,    //序号
      pagination:true,    //分页
      fitColumns:true,    //每列占满
      showFooter:true,
      height:'100%',
      width:'100%',
      idField:'branchCode',
      columns:[[
          {field:'id',checkbox:true},
          {field:'branchCode',title:'编码',width:100,align:'center'},
          {field:'branchName',title:'名称',width:100,align:'center'},
      ]],
  });
}

function publicOperatorGetCheck(cb){
    var row =  $("#gridOperator").datagrid("getChecked");
    cb(row);
}