//采购向导 第三步


$(function(){
	initdgOrderList();
})


function initdgOrderList(){
	
	$("#dgGuideOrderList").datagrid({
        method:'post',
        align:'center',
        url:contextPath+'/form/purchaseGuide/getGoodsList',
        queryParams:formData,
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        //pagination:true,    //分页
        //pageSize:10,
        //fitColumns:true,    //每列占满
        fit:true,            //占满
        showFooter:true,
        columns:[[
			{field:'ck',checkbox:true},
        	{field:'supplierName',title:'订单单号',width:180,align:'left'},
            {field:'branchName',title:'状态',width:80,align:'left'},
            {field:'skuCode',title:'供应商',width:120,align:'left'},
            {field:'skuName',title:'收货机构',width:100,align:'center'},
            {field:'barCode',title:'单据金额',width:120,align:'left'},
            {field:'skuUnit',title:'制单时间',width:60,align:'left'},
            {field:'remark',title:'备注',width:120,align:'left',editor:"textbox"}
        ]],

        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
            
        }
    });
}

function chekData(){
	var deliverFormId = $("#formId").val();
	$.messager.confirm('提示','是否审核通过？',function(data){
		if(data){
			$.ajax({
		    	url : contextPath+"/form/deliverForm/check",
		    	type : "POST",
		    	data : {
		    		deliverFormId : $("#formId").val(),
		    		deliverType : 'DA'
		    	},
		    	success:function(result){
		    		if(result['code'] == 0){
		    			$.messager.alert("操作提示", "操作成功！", "info",function(){
		    				contextPath +"/form/deliverForm/deliverEdit?deliverFormId=" + deliverFormId;
		    			});
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


function delData(){
	var dg = $("#dgGuideOrderList");
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

function finish(){
	
}
