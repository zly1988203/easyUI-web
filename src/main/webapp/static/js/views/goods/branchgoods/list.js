/**
 * Created by huangj02 on 2016/8/9.
 */
function goodsArchives(){
    this.selectTypeName = "categoryCode"
    //tree的提交参数
    this.treeParam = {
        categoryCode:'',
        supplierId:'',
        brandId:'',
        level:'',
    }
    //获取当前选中的树相关参数
    this.currSelectTreeParam = {
		categoryId:'',
		categoryCode:'',
		categoryName:''
    }
    //树的请求地址
    this.treeUrls = [
        {
            name:'categoryCode',
            url:contextPath+'/common/category/getGoodsCategoryToTree'
        },
        {
            name:'brandId',
            url:contextPath+'/common/brand/getBrandToTree'
        },
        {
            name:'supplierId',
            url:contextPath+'/common/supplier/getSupplierToTree'
        }
   ];
    this.getTreeUrl = function(name){
        var httpUrl = ""
        $.each(this.treeUrls,function(i,v){
            if(v.name==name){
                httpUrl = v.url;
                return false
            }
        });
        return httpUrl
    }
}
var goodsClass = new goodsArchives();

$(function(){
	initView();
	initTreeArchives();
	 //初始化机构ID，机构名称
    $("#branchId").val(sessionBranchId);
	$("#branchName").val(sessionBranchCodeName);
	
    initDatagridOrders();
    
    //商品过滤单选框
    changeStatus();

});

function initView(){
    $('#goodsType').combobox({
        valueField:'id',
        textField:'text',
        data: [{
            id: 'categoryCode',
            text: '类别',
            selected:true,
        },{
            id: 'brandId',
            text: '品牌'
        },{
            id: 'supplierId',
            text: '供应商'
        }],
        onSelect: function(record){
            goodsClass.selectTypeName = record.id;
            initTreeArchives();
        },
    });
}

//初始树
function initTreeArchives(){
    var args = { }
    var httpUrl = goodsClass.getTreeUrl(goodsClass.selectTypeName);
    $.get(httpUrl, args,function(data){
        var setting = {
            data: {
                key:{
                    name:'codeText',
                }
            },
            callback: {
                onClick: zTreeOnClick
            }
        };
        $.fn.zTree.init($("#treeArchives"), setting, JSON.parse(data));
        var treeObj = $.fn.zTree.getZTreeObj("treeArchives");
        var nodes = treeObj.getNodes();
        if (nodes.length>0) {
            treeObj.expandNode(nodes[0], true, false, true);
        }
    });
}
//选择树节点
function zTreeOnClick(event, treeId, treeNode) {
    if(goodsClass.selectTypeName=="categoryCode"){
    	//获取当前选中的”类别“相关参数
    	goodsClass.currSelectTreeParam = {
    		categoryId:treeNode.id,
    		categoryCode:treeNode.code,
    		categoryName:treeNode.text
        }
        goodsClass.treeParam[goodsClass.selectTypeName] = treeNode.code;
        //将选中树参数值传入表单
        $("#categoryCode").val(treeNode.code);
        $("#brandId").val('');
        $("#supplierId").val('');
    }else if(goodsClass.selectTypeName=="brandId"){
        goodsClass.treeParam[goodsClass.selectTypeName] = treeNode.id;
        
        //将选中树参数值传入表单
        $("#categoryCode").val('');
        $("#brandId").val(treeNode.id);
        $("#supplierId").val('');
    }else{
    	 goodsClass.treeParam[goodsClass.selectTypeName] = treeNode.id;
         //将选中树参数值传入表单
    	 $("#categoryCode").val('');
    	 $("#brandId").val('');
         $("#supplierId").val(treeNode.id);
    }
    gridReload("gridOrders",goodsClass.treeParam,goodsClass.selectTypeName);
};

function gridReload(gridName,httpParams,selectTypeName){
	switch (selectTypeName){ 
		case "categoryCode":  //类别
			httpParams.supplierId = "";
			httpParams.brandId = "";
			break;
		case "brandId":  //品牌
			httpParams.categoryCode = "";
			httpParams.supplierId = "";
			break;
		case "supplierId":  //供应商
			httpParams.categoryCode = "";
			httpParams.brandId = "";
			break;
	}
	$("#"+gridName).datagrid("options").url = contextPath+'/branch/goods/listData';
	$("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("load");
}


function changeStatus(){
	$(".radioItem").change(function(){
    	query();
    	
    	var a = $(this).val();
    	//导入有用
    	$("#status_3").val(a);
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
        url:'',
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
        	{field:'branchName',title:'机构名称',width:220,align:'left'},
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

//搜索导出清除左侧条件
function cleanLeftParam(){
	 $("#categoryCode").val('');
	 $("#brandId").val('');
	 $("#supplierId").val('');
}

function query(){
	//去除左侧选中值
	cleanLeftParam();
	//去除左侧选中样式
	$('.zTreeDemoBackground a').removeClass('curSelectedNode');
	$("#gridOrders").datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#gridOrders").datagrid("options").url = contextPath+'/branch/goods/listData';
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
	
	for(var i in rows){
		var row = rows[i];
		skuIds += row.skuId + ',';
	}
	$.messager.confirm('提示','是否要启用已选择的商品',function(data){
		if(data){
			enableAjax(skuIds,branchId,contextPath+"/branch/goods/enable");
		}
	});
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
		if(row.actual !=null &&row.actual != 0){
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

var uploadFormType;
function importShow(type){
	$('#excelFile').val("");
	$('#filename').val("");
	$('.uatk').show();
	uploadFormType = type;
	$("#temple").val(type);
	if(type==0){
		$("#temple").text("货号模板下载");
	}else{
		$("#temple").text("条码模板下载");
	}
}

//模板导出
function exportTemp(){
	var type = $("#temple").val();
	if(type==0){
		location.href=contextPath+'/form/purchase/exportTemp?type=2';
	}else if(type==1){
		location.href=contextPath+'/form/purchase/exportTemp?type=3';
	}
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
//	 $('#important_div').addClass('hide');
	 $('#eliminate_div').removeClass('hide');
	 $('#recovery_div').removeClass('hide');
  }else{
//	  $('#important_div').removeClass('hide');
	  $('#eliminate_div').addClass('hide');
	  $('#recovery_div').addClass('hide');
  }
})

