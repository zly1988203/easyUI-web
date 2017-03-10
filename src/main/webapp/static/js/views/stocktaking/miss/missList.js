$(function(){
	initDgTakeStockMiss();
});
//初始化表格
function initDgTakeStockMiss(){
	stockList = $("#missList").datagrid({
		method:'post',
		align:'center',
		singleSelect:false,  //单选  false多选
		rownumbers:true,    //序号
//		pagination:true,    //分页
		fitColumns:true,    //每列占满
		height:'100%',
		width:'100%',
		columns:[[
//			{field:'check',checkbox:true},
			{field: 'branchCode', title: '机构编号', width: 100, align: 'left'},
			{field: 'branchCode', title: '机构编号', width: 100, align: 'left'},
			{field: 'branchName', title: '机构名称', width: 180, align: 'left'},
			{field: 'categoryCode', title: '类别编号', width: 100, align: 'left'},
			{field: 'categoryName', title: '类别名称', width: 120, align: 'left'},
			{field: 'skuName', title: '商品名称', width: 180, align: 'left'},
			{field: 'barCode', title: '条码', width: 140, align: 'left'},
		]],

	});
}

//查询
function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	// 去除编码
    fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)

	$("#missList").datagrid("options").method = "post";
	$("#missList").datagrid('options').url = contextPath + '/stocktaking/diffSearch/getDiffSearchList';
	$("#missList").datagrid('load', fromObjStr);
}

function gFunRefresh(){
	$("#queryForm").form('clear');
}

/**
 * 导出
 */
function toExport(){
	var length = $("#missList").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	console.log(fromObjStr);
	$("#queryForm").form({
		success : function(data){
			if(data==null){
				$.messager.alert('提示',"导出数据成功！");
			}else{
				$.messager.alert('提示',JSON.parse(data).message);
			}
		}
	});
	$("#queryForm").attr("action",contextPath+"/stocktaking/diffSearch/exportDiffSearchList?"+fromObjStr);
	$("#queryForm").submit();
}

//打印
function toPrint(){
	
}

//盘点批号
function searchTakeStock(){
	var branchId = $('#branchId').val();
	var param = {
			branchId:branchId
	}
	new publicStocktakingDialog(param,function(data){
		console.log(data);
		$("#branchId").val(data.branchId);
		$("#branchName").val(data.branchName);
		$("#batchId").val(data.id);
		$("#batchNo").val(data.batchNo);
	})
}

/**
 * 机构名称
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchCode").val(data.branchCode);
		$("#branchName").val(data.branchName);
	},'BF','');
}

//选择商品
function selectGoods(){
	var branchId = $("#branchId").val();
	var sourceBranchId = branchId;
	var targetBranchId = branchId;
    if(branchId == ""){
        messager("请先选择机构");
        return;
    }
    
    var param = {
    		type:'',
    		key:"",
    		isRadio:'1',
    		branchId:branchId,
    		sourceBranchId:'',
    		targetBranchId:'',
    		supplierId:'',
    		flag:'0'
    }
    
    new publicGoodsServiceTem(param,function(data){
    	$('#skuId').val(data[0].skuId);
    	$('#skuName').val(data[0].skuName);
    });
}
