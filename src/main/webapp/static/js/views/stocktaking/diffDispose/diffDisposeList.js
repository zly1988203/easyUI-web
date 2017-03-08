$(function(){
	initDgTakeStockDiffDispose();
});
//初始化表格
function initDgTakeStockDiffDispose(){
	stockList = $("#diffDisposeList").datagrid({
		method:'post',
		align:'center',
		singleSelect:false,  //单选  false多选
		rownumbers:true,    //序号
		pagination:true,    //分页
		fitColumns:true,    //每列占满
		height:'100%',
		width:'100%',
		columns:[[
			{field:'check',checkbox:true},
			{field: 'branchCode', title: '盘点号', width: 100, align: 'left'},
			{field: 'status', title: '状态', width: 180, align: 'left'},
			{field: 'branchCode', title: '机构编号', width: 100, align: 'left'},
			{field: 'branchName', title: '机构名称', width: 120, align: 'left'},
			{field: 'skuName', title: '盘点批号', width: 180, align: 'left'},
			{field: 'barCode', title: '制单人员', width: 140, align: 'left'},
			{field: 'skuName', title: '操作日期', width: 180, align: 'left'},
			{field: 'remark', title: '备注', width: 140, align: 'left'},
		]],

	});
}

//查询
function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	// 去除编码
    fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)
    fromObjStr.operateUserName = fromObjStr.operateUserName.substring(fromObjStr.operateUserName.lastIndexOf(']')+1)

	$("#diffDisposeList").datagrid("options").method = "post";
	$("#diffDisposeList").datagrid('options').url = contextPath + '/form/deliverForm/getDeliverForms';
	$("#diffDisposeList").datagrid('load', fromObjStr);
}

//重置
function gFunRefresh(){
	$("#queryForm").form('clear');
}


function toDelete(){
	var dg = $("#diffDisposeList");
	var row = dg.datagrid("getChecked");
	var ids = [];
	for(var i=0; i<row.length; i++){
		ids.push(row[i].deliverFormId);
	}
	if(rowIsNull(row)){
		return null;
	}
	$.messager.confirm('提示','是否要删除选中数据',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/form/deliverForm/deleteDeliverForm",
		    	type:"POST",
		    	contentType:"application/json",
		    	data:JSON.stringify(ids),
		    	success:function(result){
		    		if(result['code'] == 0){
		    			successTip("删除成功");
		    			dg.datagrid('reload');
		    		}else{
		    			successTip(result['message']);
		    		}
		    	},
		    	error:function(result){
		    		successTip("请求发送失败或服务器处理失败");
		    	}
		    });
		}
	});
}

//选择机构
function selectBranches(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	});
}

/**
 * 操作员
 */
function selectOperator(){
	new publicOperatorService(function(data){
//		$("#operateUserId").val(data.id);
		console.log(data.userCode)
		$("#operateUserName").val("["+data.userCode+"]"+data.userName);
	});
}


