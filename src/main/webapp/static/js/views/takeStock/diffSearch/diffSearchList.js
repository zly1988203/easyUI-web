$(function(){
	initDgTakeStockDiffSearch();
});
//初始化表格
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
		columns:[[
			{field:'check',checkbox:true},
			{field: 'branchCode', title: '机构编号', width: 100, align: 'left'},
			{field: 'branchName', title: '机构名称', width: 180, align: 'left'},
			{field: 'categoryCode', title: '类别编号', width: 100, align: 'left'},
			{field: 'categoryName', title: '类别名称', width: 120, align: 'left'},
			{field: 'skuName', title: '商品名称', width: 180, align: 'left'},
			{field: 'barCode', title: '条码', width: 140, align: 'left'},
		]],

	});
}
function queryForm(){
}
function gFunRefresh(){
}
function toClose(){
}
function toPrint(){
}
function toExport(){
}