var stockCallBack;
var branchId = "";
var branchCompleCode ;
var status = 0;

//$(function(){
//	initStocktaking();
//})

//初始化回调函数
function initStockCallBack(cb){
	stockCallBack = cb;
}


//搜索
function stocktSearch(){
	
    $("#gridStockDialog").datagrid("options").queryParams = {
		status:status,
		branchCompleCode:branchCompleCode,
		dlgSearchStr:$("#dlgSearchStr").val()
    };
   
    $("#gridStockDialog").datagrid("options").method = "post";
    $("#gridStockDialog").datagrid('options').url = contextPath + '/stocktaking/apply/getApplyList';
    $("#gridStockDialog").datagrid("load");
}

function initStocktaking(param){
    branchCompleCode = param.branchCompleCode;
    status = param.status;
	var url = contextPath+'/stocktaking/apply/getApplyList';
	
    $("#gridStockDialog").datagrid({
        //title:'普通表单-用键盘操作',
        url:url,
        queryParams:param,
        fit : true,
		fitColumns : false,
		border : false,
		idField : 'id',
		striped : true,
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        rownumbers : true,
		pageNumber : 1,
		pageSize : 20,
		pageList : [ 5, 10, 20, 50, 100 ],
		singleSelect : true,
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'id',hidden:true},
            {field:'branchId',hidden:true},
            {field:'branchCode',hidden:true},
            {field:'batchNo',title:'盘点批号',width:200,align:'left'},
            {field:'branchName',title:'盘点机构',width:200,align:'left'},
            {field:'scope',title:'盘点范围',width:100,align:'left',formatter:function(value,row,index){
                	if(value == '0'){
                		return '全场盘点';
                	}else if(value == '1'){
                		return '类别盘点';
                	}else{
                		return '未知类型：'+ value;
                	}
             }},
            {field:'categoryShowsStr',title:'类别',width:300,align:'left'},
        ]],
        onLoadSuccess:function(data){
       	 $('.datagrid-header').find('div.datagrid-cell').css('text-align','center');
       },
        onClickRow:stockClickRow,
    });
}

//选择单行
function stockClickRow(rowIndex, rowData){
    if(stockCallBack){
    	stockCallBack(rowData);
    }
}