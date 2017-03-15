$(function(){
	//$("#branchCode").val(sessionBranchCode);
	$("#branchName").val(sessionBranchName);
	$("#branchId").val(sessionBranchId);
	$("#branchCompleCode").val(sessionBranchCompleCode);
    //开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
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
        pageSize:50,
        // view:scrollview,
		height:'100%',
		width:'100%',
		columns:[[
			{field:'check',checkbox:true},
			{field: 'batchNo', title: '盘点批号', width: 100, align: 'left',formatter:function(value,row,index){
	        	var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'差异详情\',\''+contextPath +'/stocktaking/diffDispose/stocktakingBatchView?id='+row.id+'\')">' + value + '</a>';
	        	return strHtml;
				}},
			{field: 'status', title: '状态', width: 60, align: 'center',formatter:function(value,row,index){
            	if(value == '0'){
            		return '未审核';
            	}else if(value == '1'){
            		return '审核通过';
            	}else if(value == '2'){
            		return '审核失败';
            	}else{
            		return '未知类型：'+ value;
            	}
            }},
			{field: 'branchCode', title: '机构编号', width: 100, align: 'left'},
			{field: 'branchName', title: '机构名称', width: 150, align: 'left'},
			{field: 'createUserName', title: '制单员', width: 100, align: 'left'},
			{field: 'createTime', title: '操作日期', width: 180, align: 'left'},
			{field: 'validUserName', title: '审核人', width: 100, align: 'left'},
			{field: 'remark', title: '备注', width: 200, align: 'left'},
		]],

	});
	queryForm();
}

//查询
function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	// 去除编码
    fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)
    fromObjStr.createUserName = fromObjStr.createUserName.substring(fromObjStr.createUserName.lastIndexOf(']')+1)

	$("#diffDisposeList").datagrid("options").method = "post";
	$("#diffDisposeList").datagrid('options').url = contextPath + '/stocktaking/diffDispose/getDiffDisposeList';
	$("#diffDisposeList").datagrid('load', fromObjStr);
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
		$("#createUserId").val(data.id);
		$("#createUserName").val("["+data.userCode+"]"+data.userName);
	});
}

//删单
function deleteStocktakingBatch(){
	var rows = $("#diffDisposeList").datagrid('getChecked');
	console.log('rows',rows);
	if(rows.length <= 0){
		$.messager.alert('提示','没有单据可以删除，请选择一笔单据再删除？');
		return;
	}
	var tempIds = [];
	var flag = true;
	var shLength = 0;
	rows.forEach(function(data,index){
		var status = data.status;
    	if(status == 0){
    		tempIds.push(data.id);
	   		flag = false;
    	}
    	
	})
    
    if(flag){
    	messager('已经审核的单据不可以删除！');
    	return;
    }
	
    if(tempIds.length > 0){
        $.messager.confirm('提示','单据删除后将无法恢复，确认是否删除？',function(r){
            if (r){
            	//删除单据
            	gFunStartLoading();
            	$.ajax({
                    type: "POST",
                    url: contextPath+"/stocktaking/diffDispose/deleteStocktakingBatch",
                    data: {"ids":tempIds},
                    dataType: "json",
                    success: function(data){
                    	gFunEndLoading();
                    	if(data.code == 0){
                    		successTip(data['message']);
                    		queryForm();
                    	}
                    }
                });
            }
        });
    }
}
