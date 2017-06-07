/**
 * Created by bwp on 2017/03/29.
 * 无销售库存查询-列表
 */
$(function(){
	initDatagridWXKCML();
	
	$("#branchId").val(sessionBranchId);
	$("#branchName").val(sessionBranchCodeName);
	
});



var datagridId = "wxKCList"

var gridHandel = new GridClass();
var gridHandelDetail = new GridClass();

var gridWXKCML;
var hiddenType = false;//控制列表字段显示

//初始化表格
function initDatagridWXKCML(){
	gridWXKCML = $("#"+datagridId).datagrid({
		method:'post',
		align:'center',
		singleSelect:false,  //单选  false多选
		rownumbers:true,    //序号
		pagination:true,    //分页
		showFooter:true,
		fitColumns:false,    //每列占满
		height:'100%',
		width:'100%',
		columns:[[
			{field:'check',checkbox:true},
			{field: 'branchCode', title: '店铺编号', width: 140, align: 'left'},
			{field: 'branchName', title: '店铺名称', width: 140, align: 'left'},
			{field: 'skuCode', title: '货号', hidden:hiddenType,width: 100, align: 'left'},
			{field: 'skuName', title: '商品名称', hidden:hiddenType,width: 180, align: 'left'},
			{field: 'barCode', title: '条码', hidden:hiddenType,width: 140, align: 'left'},
			{field: 'skuUnit', title: '单位', width: 80, align: 'center'},
			{field: 'skuSpec', title: '规格', width: 80, align: 'left'},
			{field: 'categoryCode', title: '库存数量', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}	
			},
			{field: 'categoryName', title: '成本价', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuCode1', title: '库存金额', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuName1', title: '类别编号', width: 100, align: 'left'},
			{field: 'barCode1', title: '类别名称', width: 100, align: 'left'}
		]],

	});
}

//查询
function queryForm(){
	if($("#branchName").val()=="" && $("#skuCode").val()=="" ){
        $_jxc.alert("请选择机构或输入条码");
        return;
    } 
	var fromObjStr = $('#queryForm').serializeObject();
	$("#"+datagridId).datagrid("options").method = "post";
	$("#"+datagridId).datagrid('options').url = contextPath + '/stock/index/getStockIndexList';
	$("#"+datagridId).datagrid('load', fromObjStr);
}

/**
 * 商品类别
 */
function searchCategory(obj){
	if(!$(obj).prev('input[type="text"]').prop('disabled')){
		new publicCategoryService(function(data){
			$("#categoryId").val(data.goodsCategoryId);
			$("#categoryName").val(data.categoryName);
		});
	}

}

/**
 * 店铺名称
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#createBranchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
};