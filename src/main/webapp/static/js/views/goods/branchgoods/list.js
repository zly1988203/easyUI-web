/**
 * Created by huangj02 on 2016/8/9.
 */
$(function(){
	 //初始化机构ID，机构名称
    $("#branchId").val(sessionBranchId);
	$("#branchName").val(sessionBranchCodeName);
	
    initDatagridOrders();
    
    //商品过滤单选框
    changeStatus();

});

function changeStatus(){
	$(".radioItem").change(function(){
    	query();
    	
    	var a = $(this).val();
    	
    	//如果是机构未引入商品，则隐藏 机构名称、机构编码两列
    	var fieldArr = [ "branchCode" , "branchName" ];
    	if(a==1){
    		datagridCommon.hideDataGridColumn("gridOrders", fieldArr);
    	}else{
    		datagridCommon.showDataGridColumn("gridOrders", fieldArr);
    	}
    });
}

var gridHandel = new GridClass();
//初始化表格
function initDatagridOrders(){
	gridHandel.setGridName("gridOrders");
    $("#gridOrders").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        url:contextPath+'/branch/goods/listData',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        pageSize:20,
		height:'100%',
        columns:[[
            {field:'check',checkbox:true},
            {field:'branchId',title:'机构ID',width:0,align:'left',hidden:true},
            {field:'id',title:'店铺商品ID',width:0,align:'left',hidden:true},
            {field:'skuId',title:'标准商品ID',width:0,align:'left',hidden:true},
        	{field:'branchName',title:'机构名称',width:100,align:'left'},
        	{field:'branchCode',title:'机构编码',width:100,align:'left'},
            {field:'skuCode',title:'货号',width:100,align:'left'},
            {field:'skuName',title:'商品名称',width:100,align:'left'},
            {field:'barCode',title:'条码',width:100,align:'left'},
            {field:'status',title:'商品状态',width:100,align:'left',formatter:function(value,row,index){
            	if(value == '0'){
            		return '正常';
            	}else if(value == '1'){
            		return '停售';
            	}else if(value == '2'){
            		return '停购';
            	}else if(value == '3'){
            		return '淘汰';
            	}else if(!value){
            		return '未引入';
            	}else{
            		return '未知类型：'+ value;
            	}
            }},
            {field:'salePrice',title:'零售价',width:100,align:'right', formatter:function(value,row,index){
            		return formatTwoDecimal(value);
            }},
            {field:'actual',title:'实际库存',width:100,align:'right', formatter:function(value,row,index){
            		return formatTwoDecimal(value);
            }}
        ]],
        onLoadSuccess : function() {
			gridHandel.setDatagridHeader("center");
		}
    });
}

function query(){
	$("#gridOrders").datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#gridOrders").datagrid("options").method = "post";
	$("#gridOrders").datagrid("load");
}

function selectBranch(){
    new publicBranchService(function(data){
        $("#branchId").val(data.branchesId);
        $("#branchName").val("["+data.branchCode+"]"+data.branchName);
        
        query();
        
    },0);
}

function enable(){
	var dg = $("#gridOrders");
	var rows = dg.datagrid("getSelections");
	if(!rows || rows.length == 0){
		messager("未选择商品");
		return ;
	}
	var skuIds = '';
	var branchId =  $("#branchId").val();
	
	if(rows.length == 1){
		var row = rows[0];
		skuIds += row.skuId;
		
		if(row.status != null){
			$.messager.confirm('提示','该商品已经引入，是否需要强制引入？',function(data){
				if(!data){
					return ;
				}else{
					enableAjax(skuIds,branchId,contextPath+"/branch/goods/enableOne");
				}
			});
		}else{
			enableAjax(skuIds,branchId,contextPath+"/branch/goods/enableOne");
		}
	}else{
		for(var i in rows){
			var row = rows[i];
			if(row.status != null){
				messager("选择的商品店铺已经在店铺中引入了，如需强制引入商品，请选择单条商品。");
				return ;
			}
			skuIds += row.skuId + ',';
		}
		
		$.messager.confirm('提示','是否要启用已选择的商品',function(data){
			if(data){
				enableAjax(skuIds,branchId,contextPath+"/branch/goods/enable");
			}
		});
	}
}

function enableAjax(skuIds,branchId,url){
	$.ajax({
    	url:url,
    	type:"POST",
    	data:{
    		skuIds:skuIds,
    		branchId:branchId
    	},
    	success:function(result){
    		if(result['code'] == 0){
    			messager("启用成功");
    		}else{
    			messager(result['message']);
    		}
    		var dg = $("#gridOrders");
    		dg.datagrid('reload');
    	},
    	error:function(result){
    		messager("请求发送失败或服务器处理失败");
    	}
    });
}

//批量淘汰商品
function eliminate(){
	var dg = $("#gridOrders");
	var rows = dg.datagrid("getSelections");
	if(!rows || rows.length == 0){
		messager("未选择商品");
		return ;
	}
	var goodsStoreSkuIds = '';
	var branchName =  $("#branchName").val();
	for(var i in rows){
		var row = rows[i];
		if(row.actual != 0){
			messager(branchName+"机构的"+row.skuName+"商品库存不为0,不能进行淘汰操作");
			return ;
		}
		goodsStoreSkuIds += row.id + ',';
	}
	var branchId =  $("#branchId").val();
	$.messager.confirm('提示','是否要淘汰该商品',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/branch/goods/eliminateGoodsStoreSku",
		    	type:"POST",
		    	data:{
		    		goodsStoreSkuIds:goodsStoreSkuIds,
		    		branchId:branchId
		    	},
		    	success:function(result){
		    		console.log(result);
		    		if(result['code'] == 0){
		    			messager("淘汰商品成功");
		    		}else{
		    			messager(result['message']);
		    		}
		    		dg.datagrid('reload');
		    	},
		    	error:function(result){
		    		messager("请求发送失败或服务器处理失败");
		    	}
		    });
		}
	});
}

//批量恢复商品
function recovery(){
	var dg = $("#gridOrders");
	var rows = dg.datagrid("getSelections");
	if(!rows || rows.length == 0){
		messager("未选择商品");
		return ;
	}
	var params = '';
	for(var i in rows){
		var row = rows[i];
		if(row.actual == null){
			messager(row.branchName+"机构的"+row.skuName+"商品库存不存在,不能进行恢复操作");
			return ;
		}
		params += row.id+","+row.skuId + ','+row.branchId+"|";
	}
	$.messager.confirm('提示','是否要恢复该商品',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/branch/goods/recoveryGoodsStoreSku",
		    	type:"POST",
		    	data:{
		    		skuObjs:params
		    	},
		    	success:function(result){
		    		if(result['code'] == 0){
		    			messager("恢复商品成功");
		    		}else{
		    			messager(result['message']);
		    		}
		    		dg.datagrid('reload');
		    	},
		    	error:function(result){
		    		messager("请求发送失败或服务器处理失败");
		    	}
		    });
		}
	});
}

/**
 * 重置
 */
function resetForm(){
	 $("#queryForm").form('clear');
	 $('#status_0').click();
};
/**
 * 调用导入功能 0导入货号 1导入明细
 * @param type
 */
/*function toImportproduct(type){
	var branchId = $("#branchId").val();
	if(!branchId){
		messager("请先选择收货机构");
		return;
	}
	if(type==0){
		importproduct();
	}else{
		importproductAll();
	}
}*/
/**
 * 获取导入的数据
 * @param data
 */
/*function getImportData(data){
    $.each(data,function(i,val){
        
    });
    var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
    var argWhere ={skuCode:1};  //验证重复性
    var newRows = gridHandel.checkDatagrid(nowRows,data,argWhere,{});

    $("#"+gridHandel.getGridName()).datagrid("loadData",newRows);
    messager("导入成功");
}*/
var uploadFormType;
function importShow(type){
	$('#excelFile').val("");
	$('#filename').val("");
	$('.uatk').show();
	uploadFormType = type;
}
$(document).on('change','#excelFile', function(){
	var value=$(this).val();
	$('#filename').val(value);
});
function importListHandel(){
	var branchId = $("#branchId").val();
	if(!branchId){
		messager("请先选择机构");
		return;
	}
	$("#uploadFormType").val(uploadFormType);
	$("#uploadFormBranchId").val(branchId);
	$("#uploadForm").attr("action",contextPath+"/branch/goods/importListEnable");
	gFunStartLoading();
	$("#uploadForm").form({
		onSubmit : function(){
			return true;
		},
		success : function(data){
			gFunEndLoading();
			importClose();
			var rows = JSON.parse(data).rows;
			$("#gridOrders").datagrid("loadData",rows);
			messager("导入成功");

		},
		error:function(e){
			gFunEndLoading();
			messager("导入失败");
		}
	});
}

function importClose(){
	$('#excelFile').val("");
	$('#filename').val("");
	$('.uatk').hide();
}

//隐藏显示引入、淘汰、恢复按钮
$(document).on('change',"input[name='status']",function(){
  var check=$(this).prop('checked');
   var value=$(this).val();
  if(value == 0){
	 $('#important_div').addClass('hide');
	 $('#eliminate_div').removeClass('hide');
	 $('#recovery_div').removeClass('hide');
  }else{
	  $('#important_div').removeClass('hide');
	  $('#eliminate_div').addClass('hide');
	  $('#recovery_div').addClass('hide');
  }
})

