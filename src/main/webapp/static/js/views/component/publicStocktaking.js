

var stockCallBack;



//$(function(){
//	initStocktaking();
//})

//初始化回调函数
function initStockCallBack(cb){
	stockCallBack = cb;
}


//搜索
function brandSearch(){
    $("#gridStock").datagrid("options").queryParams = $("#formStock").serializeObject();
    $("#gridStock").datagrid("options").method = "post";
    $("#gridStock").datagrid("load");
}

function initStocktaking(param){
    $("#gridStock").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        url:contextPath+'/common/brand/getComponentList',
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
            {field:'brandCode',title:'盘点批号',width:100,align:'left'},
            {field:'brandName',title:'盘点机构',width:100,align:'left'},
            {field:'brandCode',title:'盘点范围',width:100,align:'left'},
            {field:'brandName',title:'类别',width:100,align:'left'},
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