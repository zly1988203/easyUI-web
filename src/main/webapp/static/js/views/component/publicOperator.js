//操作员，区域机构 ，机构公共,字典组件公用jsp  
/**
 * Created by huangj02 on 2016/8/11.
 * 公共组件-操作员选择
 */
$(function(){
    var type=$("#type").val();
    var check=$("#hiddenCheck").val();
    if(type=="operate"){
        initDatagridOperator();
    }else if(type=="branchArea"){
        initDatagridBranchArea();
    }else if(type=="branch"&&check==0){
        initDatagridBranch();
    }else if(type=="dict"){
        initDatagridDict();
    }else if(type=="branch"&&check==1){
        initDatagridBranchCheck();
    }
    gFunSetEnterKey(cx);
})

var operatorCallBack ;
var branchAreaCallBack ;
var branchCallBack ;
var dictCallBack;

//初始化回调函数
function initOperatorCallBack(cb){
    operatorCallBack = cb;
}

//0708 bwp 初始化操作员参数
function initOperatorView(param){
//	console.log('初始化操作员参数 param',param);
}

//初始化回调函数
function initBranchAreaCallBack(cb){
	branchAreaCallBack = cb;
}
//初始化回调函数
function initBranchCallBack(cb){
	branchCallBack = cb;
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
function branchClickRow(rowIndex, rowData){
    if(branchCallBack){
    	branchCallBack(rowData);
    }
}
//选择单行
function dictClickRow(rowIndex, rowData){
    if(dictClickRowCallBack){
    	dictCallBack(rowData);
    }
}
//初始化表格 操作员
function initDatagridOperator(){
    $("#gridOperator").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        url:contextPath+'/system/user/getOperator',
        //toolbar: '#tb',     //工具栏 id为tb
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
            {field:'id',checkbox:true},
            {field:'userCode',title:'操作员编号',width:100,align:'left'},
            {field:'userName',title:'操作员名称',width:100,align:'left'},
        ]],
        onLoadSuccess : function() {
        	$('.datagrid-header').find('div.datagrid-cell').css('text-align','center');
       },
        onClickRow:operatorClickRow,
    });
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


//初始化表格(机构)
function initDatagridBranch(){
  var isOpenStock=$("#isOpenStock").val();
  var formType=$("#formType").val();
  $("#gridOperator").datagrid({

      //title:'普通表单-用键盘操作',
      method:'post',
      align:'center',
      url:contextPath+'/common/branches/getComponentList',
      queryParams:{
    	  isOpenStock:isOpenStock,
    	  formType:formType
      },
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
          {field:'branchCode',title:'编码',width:100,align:'center'},
          {field:'branchName',title:'机构名称',width:220,align:'center'},
      ]],
      onClickRow:branchClickRow,
  });
}

//初始化表格 
function initDatagridBranchCheck(){
  var isOpenStock=$("#isOpenStock").val();
  var formType=$("#formType").val();
  $("#gridOperator").datagrid({
      //title:'普通表单-用键盘操作',
      method:'post',
      align:'center',
      url:contextPath+'/common/branches/getComponentList',
      queryParams:{
    	  isOpenStock:isOpenStock,
    	  formType:formType
      },
      //toolbar: '#tb',     //工具栏 id为tb
      singleSelect:false,  //单选  false多选
      rownumbers:true,    //序号
      pagination:true,    //分页
      fitColumns:true,    //每列占满
      //fit:true,            //占满
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