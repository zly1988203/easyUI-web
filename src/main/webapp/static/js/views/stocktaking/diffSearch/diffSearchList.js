var rotaType =  1;
//初始化表格
$(function(){
	initDgTakeStockDiffSearch();
    $(".radioItem").on("change",function(){
    	rotaType = $(this).val();
    	$("#diffSearchList").datagrid('options').url = "";
    	initDatagridRequire();
    	$('#diffSearchList').datagrid({data:[]}); 
    })
});

function initDgTakeStockDiffSearch(){
	stockList = $("#diffSearchList").datagrid({
		method:'post',
		align:'center',
		singleSelect:false,  //单选  false多选
		rownumbers:true,    //序号
		pagination:true,    //分页
		fitColumns:true,    //每列占满
		height:'100%',
		width:'100%',
		columns:getFiledsList(),
		onLoadSuccess : function(data) {
			gridHandel.setDatagridHeader("center");
		}
	});
}
function getFiledsList(){
	if(rotaType == 1){
		return [ [
		          {field:'check',checkbox:true},
		          {field: 'branchCode', title: '机构编号', width: 100, align: 'left'},
		          {field: 'branchName', title: '机构名称', width: 120, align: 'left'},
		          {field: 'batchNo', title: '盘点批号', width: 180, align: 'left'},
		          {field: 'snapshootStockNum', title: '系统库存', width: 140, align: 'left'},
		          {field: 'stocktakingNum', title: '盘点数量', width: 180, align: 'left'},
		          {field: 'profitLossNum', title: '盈亏数量', width: 180, align: 'left'},
		          {field: 'profitLossCostAmount', title: '盈亏金额（成本价）', width: 140, align: 'left'},
		          {field: 'profitLossSaleAmount', title: '盈亏金额（售价）', width: 140, align: 'left'}
		          ] ]
	}else{
		return [ [
		          {field:'check',checkbox:true},
		          {field: 'branchCode', title: '机构编号', width: 100, align: 'left'},
		          {field: 'branchName', title: '机构名称', width: 120, align: 'left'},
		          {field: 'batchNo', title: '盘点批号', width: 180, align: 'left'},
		          {field: 'branchCode', title: '机构编号', width: 100, align: 'left'},
		          {field: 'branchName', title: '机构名称', width: 120, align: 'left'},
		          {field: 'batchNo', title: '盘点批号', width: 180, align: 'left'},
		          {field: 'validUserName', title: '审核人', width: 180, align: 'left'},
		          {field: 'skuCode', title: '货号', width: 180, align: 'left'},
		          {field: 'skuName', title: '商品名称', width: 180, align: 'left'},
		          {field: 'snapshootStockNum', title: '系统库存', width: 140, align: 'left'},
		          {field: 'stocktakingNum', title: '盘点数量', width: 180, align: 'left'},
		          {field: 'profitLossNum', title: '盈亏数量', width: 180, align: 'left'},
		          {field: 'handle', title: '是否处理', width: 180, align: 'left'},
		          {field: 'profitLossCostAmount', title: '盈亏金额（成本价）', width: 140, align: 'left'},
		          {field: 'profitLossSaleAmount', title: '盈亏金额（售价）', width: 140, align: 'left'},
		          {field: 'differenceReason', title: '差异原因', width: 140, align: 'left'},
		          {field: 'categoryCode', title: '类别编码', width: 140, align: 'left'},
		          {field: 'categoryName', title: '类别名称', width: 140, align: 'left'}
		          ] ]
	}
}

//查询
function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	// 去除编码
    fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)

	$("#diffSearchList").datagrid("options").method = "post";
	$("#diffSearchList").datagrid('options').url = contextPath + '/stocktaking/diffSearch/getDiffSearchList';
	$("#diffSearchList").datagrid('load', fromObjStr);
}

//重置
function gFunRefresh(){
	$("#queryForm").form('clear');
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
		$("#scope").val(data.scope==1 ? "类别盘点" : "全场盘点");
		$("#categoryShows").val(data.categoryShowsStr);
	})
}
//选择商品
function selectGoods(searchKey){
	var branchId = $("#branchId").val();
	var sourceBranchId = branchId;
	var targetBranchId = branchId;
    if(branchId == ""){
        messager("请先选择机构");
        return;
    }
    //控制弹框
	if(typeof(searchKey)=="undefined"){ 
		searchKey = "";
	}
    
    var param = {
    		type:'',
    		key:searchKey,
    		isRadio:'',
    		branchId:branchId,
    		sourceBranchId:'',
    		targetBranchId:'',
    		supplierId:'',
    		flag:'0'
    }
    
    new publicGoodsServiceTem(param,function(data){
    	if(searchKey){
	        $("#"+gridName).datagrid("deleteRow", gridHandel.getSelectRowIndex());
	        $("#"+gridName).datagrid("acceptChanges");
	    }
    	
    	 var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
         var addDefaultData  = gridHandel.addDefault(data,gridDefault);
         var keyNames = {
         		skuId:'goodsSkuId',
         		salePrice:'price'
         };
         var rows = gFunUpdateKey(addDefaultData,keyNames);
         var argWhere ={skuCode:1};  // 验证重复性
         var isCheck ={isGift:1 };   // 只要是赠品就可以重复
         var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);
         $("#"+gridName).datagrid("loadData",newRows);
    	
    	
        gridHandel.setLoadFocus();
        setTimeout(function(){
            gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
            gridHandel.setSelectFieldName("stocktakingNum");
            gridHandel.setFieldFocus(gridHandel.getFieldTarget('stocktakingNum'));
        },100)
    	
    });
    branchId = '';
}
