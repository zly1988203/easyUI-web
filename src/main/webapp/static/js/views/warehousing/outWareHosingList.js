/**
 * Created by beiwp on 2016/8/9.
 */
$(function(){
    initDatagridOrders();
});
//初始化表格
function initDatagridOrders(){
    $("#outWareHosingOrders").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        url:contextPath+'/form/purchase/listData',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        columns:[[
            {field:'check',checkbox:true},
            {field:'formNo',title:'单据编号',width:100,align:'center',formatter:function(value,row,index){
            	return "<a style='text-decoration: underline;' href='"+ contextPath +"/form/purchase/orderEdit?formId="+ row.id +"'>" + value + "</a>"
            }},
            {field:'status',title:'审核状态',width:100,align:'center',formatter:function(value,row,index){
            	if(value == '0'){
            		return '待审核';
            	}else if(value == '1'){
            		return '审核通过';
            	}else if(value == '2'){
            		return '审核失败';
            	}else{
            		return '未知类型：'+ value;
            	}
            }},
            {field:'dealStatus',title:'单据状态',width:100,align:'center',formatter:function(value,row,index){
            	if(value == '0'){
            		return '未处理';
            	}else if(value == '1'){
            		return '部分处理';
            	}else if(value == '2'){
            		return '处理完成';
            	}else if(value == '3'){
            		return '终止';
            	}else{
            		return '未知类型：'+ value;
            	}
            }},
            {field:'branchName',title:'调出仓库',width:100,align:'center'},
            {field:'amount',title:'单据金额',width:100,align:'center'},
            {field:'branchName',title:'收货分店',width:100,align:'center'},
            {field:'updateUserName',title:'操作员',width:100,align:'center'},
            {field:'createTime',title:'操作日期',width:100,align:'center', formatter: function (value, row, index) {
                if (value) {
                	return new Date(value).format('yyyy-MM-dd hh:mm:ss');
                }
                return "";
            }},
            {field:'validUserName',title:'审核人',width:100,align:'center'},
            {field:'remark',title:'备注',width:100,align:'center'}
        ]]
    });
}
function orderAdd(){
	location.href = contextPath + "/form/purchase/orderAdd";
}
function query(){
	$("#outWareHosingOrders").datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#outWareHosingOrders").datagrid("options").method = "post";
	$("#outWareHosingOrders").datagrid("load");
}
function orderDelete(){
	var dg = $("#outWareHosingOrders");
	var row = dg.datagrid("getSelected");
	if(rowIsNull(row)){
		return null;
	}
	$.messager.confirm('提示','是否要删除此条数据',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/form/purchase/delete",
		    	type:"POST",
		    	data:{
		    		formId:row.id
		    	},
		    	success:function(result){
		    		console.log(result);
		    		if(result['code'] == 0){
		    			successTip("删除成功");
		    		}else{
		    			successTip(result['message']);
		    		}
		    		dg.datagrid('reload');
		    	},
		    	error:function(result){
		    		successTip("请求发送失败或服务器处理失败");
		    	}
		    });
		}
	});
}

function selectSupplier(){
	new publicSupplierService(function(data){
		$("#supplierId").val(data.supplierId);
		$("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
	});
}
function selectOperator(){
	new publicOperatorService(function(data){
		$("#operateUserId").val(data.id);
		$("#operateUserName").val(data.userName);
	});
}

function selectBranchService(){
    /**
     * 分店列表  type = 0  |  1
    * 0 表示单选  1 表示多选
    */
    new publicBranchService(function(data){
    	$("#branchId").val(data.branchesId);//id
    	$("#branchName").val(data.branchName);
    },0);
}

//打印
function printDesign(){
     var dg = $("#outWareHosingOrders");
     var row = dg.datagrid("getSelected");
     if(rowIsNull(row)){
           return null;
     }
     //弹出打印页面
     parent.addTabPrint('PASheet' + row.id,row.formNo+'单据打印',contextPath + '/printdesign/design?page=PASheet&controller=/form/purchase&template=-1&sheetNo=' + row.id + '&gridFlag=PAGrid','');
}
