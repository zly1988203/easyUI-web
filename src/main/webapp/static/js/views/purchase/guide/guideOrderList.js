//采购向导 第三步


$(function(){
	initdgOrderList();
})


function initdgOrderList(){
	var guideNo = $("#guideNo").val();
	if(!guideNo){
		successTip("数据异常！");
		return;
	}
	
	$("#dgGuideOrderList").datagrid({
        method:'post',
        align:'center',
        url:contextPath+'/form/purchaseGuide/getOrderList',
        queryParams:{
        	guideNo:guideNo
        },
//        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        //pagination:true,    //分页
        //pageSize:10,
        //fitColumns:true,    //每列占满
        fit:true,            //占满
        showFooter:true,
        columns:[[
			{field:'ck',checkbox:true},
        	{field:'formNo',title:'订单单号',width:180,align:'left',
				formatter:function(value,row,index){
	            	if(updatePermission){
	            		var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看采购详细\',\''+ contextPath +'/okdeerjxc/form/purchase/orderEdit?formNo='+ row.formNo +'\')">' + value + '</a>';
	            		return strHtml;
	            	}else{
	            		return value;
	            	}
	            }
        	},
            {field:'statusStr',title:'状态',width:80,align:'left'},
            {field:'supplierName',title:'供应商',width:150,align:'left'},
            {field:'branchName',title:'收货机构',width:150,align:'center'},
            {field:'amount',title:'单据金额',width:120,align:'left'},
            {field:'createTime',title:'制单时间',width:150,align:'left',
            	formatter : function(value, rowData, rowIndex) {
            		return formatDate(value);
            	}
            },
            {field:'remark',title:'备注',width:120,align:'left',editor:"textbox"}
        ]],

        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
            
        }
    });
}

function chekData(){
	var rows =$("#dgGuideOrderList").datagrid("getChecked");
	if(rows.length==0){
		successTip("请选择行数据！");
		return null;
	}
	var formIds='';
    $.each(rows,function(i,v){
    	formIds+=v.formId+",";
    });
    
    $.messager.confirm('提示','确认审核所有所选数据？',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/form/purchase/batchCheck",
		    	type:"POST",
		    	data:{
		    		formIds:formIds,
		    		status : 1
		    	},
		    	success:function(result){
		    		successTip(result.message, $("#dgGuideOrderList"));
		    	},
		    	error:function(result){
		    		successTip("请求发送失败或服务器处理失败");
		    	}
		    });
		}
	});
    
}


function delData(){
	var rows =$("#dgGuideOrderList").datagrid("getChecked");
	if(rows.length==0){
		successTip("请选择行数据！");
		return null;
	}
	var formIds='';
    $.each(rows,function(i,v){
    	formIds+=v.formId+",";
    });
	
	$.messager.confirm('提示','是否要删除选中数据',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/form/purchase/delete",
		    	type:"POST",
		    	data:{
		    		formIds:formIds
		    	},
		    	success:function(result){
		    		successTip(result.message, $("#dgGuideOrderList"));
		    	},
		    	error:function(result){
		    		successTip("请求发送失败或服务器处理失败");
		    	}
		    });
		}
	});
}

function finish(){
	window.location = contextPath+'/form/purchaseGuide/toGuideForm';
}
