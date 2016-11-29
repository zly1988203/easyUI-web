/**
 * Created by huangj02 on 2016/8/9.
 */
$(function(){
	//初始化默认条件
    initConditionParams();
    
    initDatagridOrders();
    //单据状态切换
    changeStatus();
});

//单据状态切换
function changeStatus(){
	$(".radioItem").change(function(){
		query();
    });
}

//初始化默认条件
function initConditionParams(){
    
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    
}

var gridHandel = new GridClass();
//初始化表格
function initDatagridOrders(){
    $("#gridOrders").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        //url:contextPath+'/form/purchase/receiptListData',
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
            {field:'check',checkbox:true},
            {field:'formNo',title:'单据编号',width:'140px',align:'left',formatter:function(value,row,index){
            	var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看采购收货详细\',\''+contextPath+'/form/purchase/receiptEdit?formId='+row.id+'\')">' + value + '</a>';
            	return strHtml;
            
            }},
            {field:'branchName',title:'收货机构',width:'100px',align:'left'},
            {field:'status',title:'审核状态',width:'100px',align:'center',formatter:function(value,row,index){
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
            {field:'supplierCode',title:'供应商编号',width:'200px',align:'left'},
            {field:'supplierName',title:'供应商名称',width:'140px',align:'left'},
            {field:'amount',title:'总金额',width:'120px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
            {field:'updateUserName',title:'操作员',width:'130px',align:'left'},
            {field:'createTime',title:'操作时间',width:'150px',align:'center', formatter: function (value, row, index) {
                if (value) {
                	return new Date(value).format('yyyy-MM-dd hh:mm');
                }
                return "";
            }},
            {field:'validUserName',title:'审核人',width:'130px',align:'left'},
            {field:'remark',title:'备注',width:'200px',align:'left'}
        ]],
		onLoadSuccess : function() {
			gridHandel.setDatagridHeader("center");
		}
    });
    query();
}

function receiptAdd(){
	toAddTab("新增采购收货单",contextPath + "/form/purchase/receiptAdd");
}

function query(){
	$("#gridOrders").datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#gridOrders").datagrid("options").method = "post";
	$("#gridOrders").datagrid("options").url = contextPath+'/form/purchase/receiptListData';
	$("#gridOrders").datagrid("load");
}

function receiptDelete(){
	var dg = $("#gridOrders");
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
//		$("#supplierId").val(data.id);
		$("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
	});
}
function selectOperator(){
	new publicOperatorService(function(data){
//		$("#operateUserId").val(data.id);
		$("#operateUserName").val(data.userName);
	});
}
function selectBranch(){
	new publicBranchService(function(data){
//		$("#branchId").val(data.branchesId);
		$("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},0);
}

/**
 * 重置
 */
function resetForm(){
	 $("#queryForm").form('clear');
};


